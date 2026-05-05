// Widget definitions live here. Each widget is a self-contained
// component: its own filter state, its own code generator, its own
// stamp regex pinned to its own widget file. PlayPage renders all
// widgets unconditionally — they all stay "alive" — but only the
// active one's controls strip is visible. Adding a third widget
// means adding another component here and registering it; PlayPage
// itself doesn't change shape.

import { useEffect, useState, type ReactNode } from "react";
import * as monaco from "monaco-editor";
import { client } from "@/demo/server/api";

const rpc = client.run.bind(client);

export const ORDERS_PATH = "widgets/orders.ts";
export const INVENTORY_PATH = "widgets/inventory.ts";

const ORDERS_URI = monaco.Uri.parse(`file:///${ORDERS_PATH}`);
const INVENTORY_URI = monaco.Uri.parse(`file:///${INVENTORY_PATH}`);

export type WidgetProps = {
  modelsReady: boolean;
  running: boolean;
  restart: () => void;
  live: boolean;
  onLive: (v: boolean) => void;
  visible: boolean;
};

// --- Shared bits ---

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-wide">
    <span>{label}</span>
    {children}
  </label>
);

const ControlsStrip = ({ children }: { children: ReactNode }) => (
  <div className="border-b border-gray-800 bg-gray-900/60 px-3 py-2 flex flex-wrap items-center gap-x-4 gap-y-2 shrink-0">
    {children}
  </div>
);

const LiveToggle = ({ live, onLive }: { live: boolean; onLive: (v: boolean) => void }) => (
  <Field label="live">
    <button
      type="button"
      onClick={() => onLive(!live)}
      className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
        live
          ? "bg-green-600 border-green-500 text-white"
          : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600"
      }`}
    >
      {live ? "● on" : "○ off"}
    </button>
  </Field>
);

// Generic on/off toggle with optional error badge. The error tooltip
// appears on hover; the badge pulls the eye without taking over the
// output panel. Used for per-widget auto-cycle actions.
const ToggleButton = ({
  active,
  onClick,
  title,
  error,
  children,
}: {
  active: boolean;
  onClick: () => void;
  title?: string;
  error?: string | null;
  children: ReactNode;
}) => (
  <button
    onClick={onClick}
    title={error ?? title}
    className={`relative text-[11px] normal-case px-2 py-0.5 rounded border transition-colors ${
      error
        ? "border-red-500 bg-red-600/20 text-red-200"
        : active
          ? "border-blue-500 bg-blue-600/30 text-white"
          : "border-gray-700 text-gray-500 hover:border-gray-600 hover:text-gray-300"
    }`}
  >
    {children}
    {error && (
      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 text-white text-[8px] leading-3 text-center font-bold">
        !
      </span>
    )}
  </button>
);

// Self-rescheduling auto-cycle. Each tick fires `action()` after a
// random delay in [minMs, maxMs]; ON by default. Pauses when the
// gate is off OR when the widget isn't visible (no point firing
// orders mutations while the user's looking at inventory). The
// error returned by action() is reported via setError so the
// triggering button can show a tooltip.
const useAutoCycle = (
  enabled: boolean,
  initialDelayMs: [number, number],
  cycleDelayMs: [number, number],
  action: () => Promise<string | null>,
  setError: (s: string | null) => void,
) => {
  useEffect(() => {
    if (!enabled) return;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const tick = async () => {
      if (stopped) return;
      const err = await action();
      if (stopped) return;
      setError(err);
      timer = setTimeout(tick, cycleDelayMs[0] + Math.random() * (cycleDelayMs[1] - cycleDelayMs[0]));
    };
    timer = setTimeout(tick, initialDelayMs[0] + Math.random() * (initialDelayMs[1] - initialDelayMs[0]));
    return () => {
      stopped = true;
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
};

// Replace the canonical `const result = client.run(async (api) => ...);
// output(result);` block with a freshly generated one. Anchored at
// column 0 to avoid any backticked occurrence inside doc comments.
const stampBlock = (src: string, next: string): string => {
  const re = /^const result = client\.run\(async \(api\)[\s\S]*?^output\(result\);?/m;
  if (!re.test(src)) return src;
  return src.replace(re, next);
};

const useWidgetStamp = (
  uri: monaco.Uri,
  modelsReady: boolean,
  running: boolean,
  restart: () => void,
  next: string,
) => {
  useEffect(() => {
    if (!modelsReady) return;
    const model = monaco.editor.getModel(uri);
    if (!model) return;
    const cur = model.getValue();
    const stamped = stampBlock(cur, next);
    if (stamped === cur) return;
    model.setValue(stamped);
    if (running) restart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next, modelsReady]);
};

// --- Orders widget ---

const STATUSES = ["draft", "confirmed", "picking", "packed", "shipped", "delivered"] as const;
type Status = (typeof STATUSES)[number];

const GROUP_BY_COLS = ["none", "status", "priority"] as const;
type GroupByCol = (typeof GROUP_BY_COLS)[number];

const ORDER_BY_COLS = ["none", "id", "status", "priority", "created_at"] as const;
type OrderByCol = (typeof ORDER_BY_COLS)[number];

const ORDER_DIRS = ["asc", "desc"] as const;
type OrderDir = (typeof ORDER_DIRS)[number];

function generateOrdersBlock(opts: {
  statusFilter: readonly Status[];
  groupBy: GroupByCol;
  orderBy: OrderByCol;
  orderDir: OrderDir;
  live: boolean;
}): string {
  const { statusFilter, groupBy, orderBy, orderDir, live } = opts;
  const statusLine =
    statusFilter.length === 0
      ? ""
      : `\n    .where(({ orders }) => orders.status.in(${statusFilter
          .map((s) => JSON.stringify(s))
          .join(", ")}))`;
  const selectBody =
    groupBy === "none"
      ? `{
      id: orders.id,
      status: orders.status,
      customer: orders.customer().select(({ customers }) => ({ name: customers.name })).scalar(),
    }`
      : `{
      ${groupBy}: orders.${groupBy},
      count: orders.id.count(),
    }`;
  const groupByLine =
    groupBy === "none" ? "" : `\n    .groupBy(({ orders }) => [orders.${groupBy}])`;
  const orderByEntry =
    orderBy === "none"
      ? null
      : groupBy !== "none" && orderBy !== groupBy
        ? null
        : orderDir === "asc"
          ? `orders.${orderBy}`
          : `[orders.${orderBy}, "desc"]`;
  const orderByLine = orderByEntry ? `\n    .orderBy(({ orders }) => ${orderByEntry})` : "";
  const terminator = live ? "live" : "execute";
  return `const result = client.run(async (api) => {
  // This code is serialized and then (safely) run over RPC.

  // \`user\` is whoever's selected in the dropdown on the right.
  //  it scopes all operations to the current user.
  const user = await api.currentUser();
  //  ... e.g. user.orders() automatically has a
  //          \`where organization_id = ?\` inserted into it
  //           so it is scoped to the current user.
  return user.orders()${statusLine}${groupByLine}${orderByLine}
    .select(({ orders }) => (${selectBody}))
    .${terminator}(api.db);
});

// Render the result in the table on the right:
output(result);`;
}

export const OrdersWidget = (props: WidgetProps) => {
  const [statusFilter, setStatusFilter] = useState<readonly Status[]>([]);
  const [groupBy, setGroupBy] = useState<GroupByCol>("status");
  const [orderBy, setOrderBy] = useState<OrderByCol>("status");
  const [orderDir, setOrderDir] = useState<OrderDir>("asc");
  // Per-widget auto-cycle. Insert + advance are orders-specific —
  // they fire `OperatorRoot.insertDraftOrder` / `.advanceRandom`,
  // which are role-gated to ops_lead. The default user (Alice) is
  // ops_lead; switching to Bob trips the gate and the error
  // surfaces as a tooltip on the offending toggle.
  const [autoInsert, setAutoInsert] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [insertError, setInsertError] = useState<string | null>(null);
  const [advanceError, setAdvanceError] = useState<string | null>(null);

  useAutoCycle(
    autoInsert && props.visible,
    [3000, 7000],
    [7500, 22500],
    async () => {
      try {
        await rpc(async (api) => (await api.currentUser()).insertDraftOrder(api.db));
        return null;
      } catch (e) {
        return e instanceof Error ? e.message : String(e);
      }
    },
    setInsertError,
  );
  useAutoCycle(
    autoAdvance && props.visible,
    [7000, 11000],
    [7500, 22500],
    async () => {
      try {
        await rpc(async (api) => (await api.currentUser()).advanceRandom(api.db));
        return null;
      } catch (e) {
        return e instanceof Error ? e.message : String(e);
      }
    },
    setAdvanceError,
  );

  const next = generateOrdersBlock({ statusFilter, groupBy, orderBy, orderDir, live: props.live });
  useWidgetStamp(ORDERS_URI, props.modelsReady, props.running, props.restart, next);

  if (!props.visible) return null;

  const toggleStatus = (s: Status) => {
    setStatusFilter(statusFilter.includes(s) ? statusFilter.filter((x) => x !== s) : [...statusFilter, s]);
  };
  return (
    <ControlsStrip>
      <Field label="status in">
        <div className="flex flex-wrap gap-1">
          {STATUSES.map((s) => {
            const active = statusFilter.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleStatus(s)}
                className={`text-[11px] px-1.5 py-0.5 rounded border transition-colors ${
                  active
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Field>
      <Field label="group by">
        <select
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value as GroupByCol)}
          className="bg-gray-800 text-gray-200 text-xs rounded px-2 py-1 border border-gray-700 focus:outline-none focus:border-blue-500"
        >
          {GROUP_BY_COLS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </Field>
      <Field label="order by">
        <select
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value as OrderByCol)}
          className="bg-gray-800 text-gray-200 text-xs rounded px-2 py-1 border border-gray-700 focus:outline-none focus:border-blue-500"
        >
          {ORDER_BY_COLS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={orderDir}
          onChange={(e) => setOrderDir(e.target.value as OrderDir)}
          disabled={orderBy === "none"}
          className="bg-gray-800 text-gray-200 text-xs rounded px-2 py-1 border border-gray-700 focus:outline-none focus:border-blue-500 disabled:opacity-40"
        >
          {ORDER_DIRS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </Field>
      <LiveToggle live={props.live} onLive={props.onLive} />
      <div className="ml-auto flex items-center gap-2">
        <ToggleButton
          active={autoInsert}
          onClick={() => setAutoInsert((v) => !v)}
          title="Auto-insert a draft order every few seconds. Click to pause."
          error={insertError}
        >
          + auto-insert
        </ToggleButton>
        <ToggleButton
          active={autoAdvance}
          onClick={() => setAutoAdvance((v) => !v)}
          title="Auto-advance a random non-delivered order every few seconds. Click to pause."
          error={advanceError}
        >
          ↻ auto-advance
        </ToggleButton>
      </div>
    </ControlsStrip>
  );
};

// --- Inventory widget ---

function generateInventoryBlock(opts: { threshold: number; live: boolean }): string {
  const { threshold, live } = opts;
  const terminator = live ? "live" : "execute";
  return `const result = client.run(async (api) => {
  // Different widget, same backend. The Api class hasn't grown — this
  // composes against the existing schemas.

  const user = await api.currentUser();
  // Inventory pressure: stock at or below the threshold, joined to
  // each position's location for display.
  return user.inventory()
    .where(({ inventory_positions: p }) => p.on_hand["<="](${JSON.stringify(String(threshold))}))
    .select(({ inventory_positions: p }) => ({
      sku: p.sku,
      on_hand: p.on_hand,
      reserved: p.reserved,
      location: p.location().select(({ locations }) => ({ name: locations.name })).scalar(),
    }))
    .orderBy(({ inventory_positions: p }) => p.on_hand)
    .${terminator}(api.db);
});

// Render the result in the table on the right:
output(result);`;
}

export const InventoryWidget = (props: WidgetProps) => {
  const [threshold, setThreshold] = useState<number>(10);

  const next = generateInventoryBlock({ threshold, live: props.live });
  useWidgetStamp(INVENTORY_URI, props.modelsReady, props.running, props.restart, next);

  if (!props.visible) return null;

  return (
    <ControlsStrip>
      <Field label="on_hand ≤">
        <input
          type="range"
          min={0}
          max={50}
          step={1}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="w-32 accent-blue-500"
        />
        <span className="text-xs text-gray-300 tabular-nums w-6 text-right">{threshold}</span>
      </Field>
      <LiveToggle live={props.live} onLive={props.onLive} />
    </ControlsStrip>
  );
};

// --- User picker (header-level — not bound to a specific widget) ---

export const USER_TOKENS = [
  { value: "user_brightship_alice", label: "Alice — Brightship (ops_lead)" },
  { value: "user_brightship_bob",   label: "Bob — Brightship (inventory_control)" },
  { value: "user_atlas_dave",       label: "Dave — Atlas (ops_lead)" },
] as const;
export type UserToken = (typeof USER_TOKENS)[number]["value"];

export const UserPicker = ({
  userToken,
  onUserToken,
}: {
  userToken: UserToken;
  onUserToken: (v: UserToken) => void;
}) => (
  <Field label="user">
    <select
      value={userToken}
      onChange={(e) => onUserToken(e.target.value as UserToken)}
      className="bg-gray-800 text-gray-200 text-xs rounded px-2 py-1 border border-gray-700 focus:outline-none focus:border-blue-500"
    >
      {USER_TOKENS.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </Field>
);
