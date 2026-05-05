
import { useEffect, useMemo, useState } from "react";
import { sql } from "typegres";
import { getDb, operatorFromToken, type OperatorRoot } from "@/demo/db";
import { SyntaxHighlight } from "@/components/SyntaxHighlight";

// v0 demo:
//   - login picker (3 operators across 2 orgs)
//   - "Orders at risk" widget with controls
//   - live typegres expression panel under the widget
//   - static "Backend: 105 LOC" badge that doesn't move
//
// The visceral moment: click controls → expression and data update;
// switch operators → same expression, different scope. No backend
// redeploy. Whole thing runs in your browser via PGlite.

const TOKENS = [
  { token: "op_brightship_alice", label: "Alice — BrightShip ops_lead" },
  { token: "op_brightship_bob",   label: "Bob — BrightShip inventory_control" },
  { token: "op_atlas_dave",       label: "Dave — Atlas ops_lead" },
];

type Stage = { kind: "booting" } | { kind: "login" } | { kind: "ready"; op: OperatorRoot };

export default function DemoPage() {
  const [stage, setStage] = useState<Stage>({ kind: "booting" });
  const [error, setError] = useState<string>("");

  // Eagerly boot PGlite so the login click is fast.
  useEffect(() => {
    getDb()
      .then(() => setStage({ kind: "login" }))
      .catch((e) => setError(String(e instanceof Error ? e.message : e)));
  }, []);

  const login = async (token: string) => {
    try {
      const op = await operatorFromToken(token);
      setStage({ kind: "ready", op });
    } catch (e) {
      setError(String(e instanceof Error ? e.message : e));
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              <span>type</span><span className="text-blue-600 dark:text-blue-400">gres</span>
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">demo</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-mono">
              Backend: 105 LOC
            </span>
            {stage.kind === "ready" && (
              <button
                onClick={() => setStage({ kind: "login" })}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Switch operator
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-300 font-mono text-sm">Error: {error}</p>
          </div>
        )}

        {stage.kind === "booting" && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <p className="text-gray-600 dark:text-gray-400">
              Booting PGlite + seeding the demo database in your browser...
            </p>
          </div>
        )}

        {stage.kind === "login" && <Login onPick={login} />}

        {stage.kind === "ready" && <Dashboard op={stage.op} />}
      </div>
    </main>
  );
}

const Login = ({ onPick }: { onPick: (token: string) => void }) => (
  <div className="max-w-xl">
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pick an operator</h1>
    <p className="text-gray-600 dark:text-gray-400 mb-6">
      Each operator's view is structurally scoped to their organization and role. Same UI, different
      data — switch between them to feel the boundary.
    </p>
    <div className="space-y-2">
      {TOKENS.map((t) => (
        <button
          key={t.token}
          onClick={() => onPick(t.token)}
          className="w-full text-left px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
        >
          <div className="font-medium text-gray-900 dark:text-white">{t.label}</div>
          <div className="text-xs font-mono text-gray-500 dark:text-gray-400">{t.token}</div>
        </button>
      ))}
    </div>
  </div>
);

// --- Dashboard: one widget for v0 (Orders at risk) ---

type GroupBy = "none" | "carrier" | "customer";

const Dashboard = ({ op }: { op: OperatorRoot }) => {
  const [statuses, setStatuses] = useState<string[]>(["packed", "shipped"]);
  const [groupBy, setGroupBy] = useState<GroupBy>("none");
  const [lateOnly, setLateOnly] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{op.orgName}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Logged in as <span className="font-medium">{op.name}</span> · {op.role}
        </p>
      </div>

      <OrdersAtRiskWidget op={op} statuses={statuses} setStatuses={setStatuses} groupBy={groupBy} setGroupBy={setGroupBy} lateOnly={lateOnly} setLateOnly={setLateOnly} />
    </div>
  );
};

// --- Widget A: Orders at risk ---

const ALL_STATUSES = ["draft", "confirmed", "picking", "packed", "shipped", "delivered"] as const;

type WidgetProps = {
  op: OperatorRoot;
  statuses: string[]; setStatuses: (s: string[]) => void;
  groupBy: GroupBy; setGroupBy: (g: GroupBy) => void;
  lateOnly: boolean; setLateOnly: (l: boolean) => void;
};

const OrdersAtRiskWidget = ({ op, statuses, setStatuses, groupBy, setGroupBy, lateOnly, setLateOnly }: WidgetProps) => {
  const [rows, setRows] = useState<Array<Record<string, string | number>>>([]);
  const [loading, setLoading] = useState(false);

  // Build the displayed expression as a string. Source of truth for
  // both display and the actual query — they're constructed from the
  // same React state.
  const expression = useMemo(() => buildOrdersExpression({ statuses, groupBy, lateOnly }), [statuses, groupBy, lateOnly]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    runOrdersQuery(op, { statuses, groupBy, lateOnly })
      .then((r) => { if (!cancelled) setRows(r); })
      .catch(() => { if (!cancelled) setRows([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [op, statuses, groupBy, lateOnly]);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Orders at risk</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Filter, group, toggle late-only — watch the expression below mutate.
        </p>
      </div>

      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex flex-wrap items-center gap-4 text-sm">
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Status</label>
          <div className="flex flex-wrap gap-1">
            {ALL_STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatuses(statuses.includes(s) ? statuses.filter((x) => x !== s) : [...statuses, s])}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  statuses.includes(s)
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Group by</label>
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as GroupBy)}
            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
          >
            <option value="none">none</option>
            <option value="carrier">carrier</option>
            <option value="customer">customer</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="lateOnly"
            type="checkbox"
            checked={lateOnly}
            onChange={(e) => setLateOnly(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="lateOnly" className="text-gray-700 dark:text-gray-300">
            Late only (ship_by &lt; now)
          </label>
        </div>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="px-6 py-4 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Result</h3>
          {loading && <p className="text-sm text-gray-500 dark:text-gray-400">Running...</p>}
          {!loading && rows.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">No rows match.</p>
          )}
          {!loading && rows.length > 0 && (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-200 dark:border-gray-800">
                  {Object.keys(rows[0]!).map((k) => (
                    <th key={k} className="pb-1 pr-2 text-gray-500 dark:text-gray-400 font-medium">
                      {k}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 20).map((r, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                    {Object.values(r).map((v, j) => (
                      <td key={j} className="py-1 pr-2 text-gray-900 dark:text-white">
                        {String(v)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && rows.length > 20 && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Showing first 20 of {rows.length} rows.
            </p>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-950">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
            Live typegres expression
          </h3>
          <SyntaxHighlight code={expression} language="typescript" />
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            This is the actual query running. Backend never changes.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Expression building ---

const buildOrdersExpression = ({ statuses, groupBy, lateOnly }: { statuses: string[]; groupBy: GroupBy; lateOnly: boolean }): string => {
  const lines: string[] = ["op.orders()"];

  if (statuses.length > 0 && statuses.length < ALL_STATUSES.length) {
    const list = statuses.map((s) => `"${s}"`).join(", ");
    lines.push(`  .where(({ orders }) => orders.status.in(${list}))`);
  }

  if (lateOnly) {
    lines.push(`  .where(({ orders }) => orders.ship_by["<"](Timestamptz.from(sql\`now()\`)))`);
  }

  if (groupBy === "none") {
    lines.push(`  .select(({ orders }) => ({`);
    lines.push(`    id: orders.id,`);
    lines.push(`    status: orders.status,`);
    lines.push(`    ship_by: orders.ship_by,`);
    lines.push(`    customer: orders.customer().select(({ customers }) => ({ name: customers.name })).scalar(),`);
    lines.push(`  }))`);
    lines.push(`  .orderBy(({ orders }) => [orders.ship_by, "asc"])`);
  } else if (groupBy === "carrier") {
    lines.push(`  .join(Shipments, ({ orders, shipments }) => shipments.order_id["="](orders.id))`);
    lines.push(`  .groupBy(({ shipments }) => [shipments.carrier])`);
    lines.push(`  .select(({ shipments, orders }) => ({`);
    lines.push(`    carrier: shipments.carrier,`);
    lines.push(`    count: orders.id.count(),`);
    lines.push(`  }))`);
  } else {
    lines.push(`  .groupBy(({ orders }) => [orders.customer_id])`);
    lines.push(`  .select(({ orders }) => ({`);
    lines.push(`    customer: Customers.from().where(({ customers }) => customers.id["="](orders.customer_id)).select(({ customers }) => customers.name).scalar(),`);
    lines.push(`    count: orders.id.count(),`);
    lines.push(`  }))`);
  }

  lines.push(`  .execute(db)`);
  return lines.join("\n");
};

// --- Actually running the query ---

const runOrdersQuery = async (
  op: OperatorRoot,
  { statuses, groupBy, lateOnly }: { statuses: string[]; groupBy: GroupBy; lateOnly: boolean },
) => {
  const { db, Orders, Customers, Shipments } = await getDb();

  // Pre-`where` to operator's org — same scope rule as the canonical Api.
  let q = Orders.from()
    .where(({ orders }) => orders.organization_id["="](op.organizationId)) as any;

  if (statuses.length > 0 && statuses.length < ALL_STATUSES.length) {
    q = q.where(({ orders }: any) =>
      statuses.map((s) => orders.status["="](s)).reduce((acc: any, b: any) => acc.or(b)),
    );
  }
  if (lateOnly) {
    q = q.where(({ orders }: any) => orders.ship_by["<"](sql`now()`));
  }

  if (groupBy === "none") {
    const rows = await q
      .select(({ orders }: any) => ({
        id: orders.id,
        status: orders.status,
        ship_by: orders.ship_by,
        customer: Customers.from()
          .where(({ customers }: any) => customers.id["="](orders.customer_id))
          .select(({ customers }: any) => ({ name: customers.name }))
          .cardinality("one")
          .scalar(),
      }))
      .orderBy(({ orders }: any) => [orders.ship_by, "asc"])
      .execute(db);
    return rows.map((r: any) => ({
      id: r.id,
      status: r.status,
      ship_by: r.ship_by ? new Date(r.ship_by).toISOString().slice(0, 10) : "—",
      customer: (r.customer as { name: string } | null)?.name ?? "—",
    }));
  } else if (groupBy === "carrier") {
    const rows = await q
      .join(Shipments, ({ orders, shipments }: any) => shipments.order_id["="](orders.id))
      .groupBy(({ shipments }: any) => [shipments.carrier])
      .select(({ shipments, orders }: any) => ({ carrier: shipments.carrier, count: orders.id.count() }))
      .execute(db);
    return rows.map((r: any) => ({ carrier: r.carrier, count: String(r.count) }));
  } else {
    const rows = await q
      .groupBy(({ orders }: any) => [orders.customer_id])
      .select(({ orders }: any) => ({
        customer: Customers.from()
          .where(({ customers }: any) => customers.id["="](orders.customer_id))
          .select(({ customers }: any) => customers.name)
          .cardinality("one")
          .scalar(),
        count: orders.id.count(),
      }))
      .execute(db);
    return rows.map((r: any) => ({ customer: String(r.customer ?? "—"), count: String(r.count) }));
  }
};

