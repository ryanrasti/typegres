# Demo PRD (v0)

## Goal

A small, in-browser demo that makes typegres's pitch *viscerally* legible: **the backend doesn't change as the frontend invents new query shapes**. Visitors see a query reshape under their cursor, see the typegres expression mutate live, and see a static "BE: 105 LOC" counter that doesn't move.

## Where it lives

`site/app/demo/page.tsx` — new route on the existing typegres site. Reuses the site's PGlite, Tailwind, dark mode, and syntax-highlighting infrastructure. Linked from the landing page CTA ("See it in action →").

## What it is NOT

- Not a separate deployed server (no Hono, no Fly, no Neon)
- Not a Widget Builder (was wrong shape — "BI tool form")
- Not a Prompt-to-Widget bonus (AI angle is overstated for OLTP)
- Not a multi-page dashboard (Orders / Inventory / Shipments tabs cut)
- Not live queries (punted; needs events table + per-table transformer)
- Not a saved-layouts / drilldown / sidebar app
- Not a SQL editor (capability-bounded; expressions only)

## What it is

**Two pages, two widgets, one visceral moment.**

### Page 1: Login

- Operator picker (dropdown or three buttons)
  - Alice — BrightShip ops_lead
  - Bob — BrightShip inventory_control
  - Dave — Atlas ops_lead
- Switching operators is a visible action — emphasizes the scope boundary.
- "Backend: 105 LOC" badge always visible.

### Page 2: Dashboard

Two widgets, each with controls and a live expression panel.

#### Widget A: Orders at risk

Non-trivial query: orders + customer relation traversal + ship_by filter + group/aggregate.

- **Controls:** status filter, group by (none/carrier/customer), late-only toggle
- **Result:** rows or aggregate counts depending on groupBy
- **Expression panel:** the typegres expression that just ran, syntax-highlighted, updates live as controls change.

#### Widget B: Inventory pressure

Non-trivial query: inventory_positions + correlated subquery against order_lines + threshold filter.

- **Controls:** location filter, on-hand threshold slider
- **Result:** SKUs at/below threshold with open-order counts
- **Expression panel:** live typegres expression including the cross-table correlation

### The visceral moments

1. **Click a control → expression mutates → data updates → BE LOC stays at 105.** Direct proof of "FE composes shape, BE doesn't change."
2. **Switch operator from Alice (BrightShip) to Dave (Atlas) → same expression, different data.** Capability-bounded scope is structural.

## Architecture

- **Frontend**: React + Tailwind, part of the existing Next site. Static.
- **Backend**: there isn't one. The "API" runs in the visitor's browser via PGlite + `inMemoryChannel`. Same code path the test suite uses.
- **Data**: `examples/ops-demo`'s schema + seed run on first page load. Each visitor gets their own state; reload = reset.
- **Source of truth**: `examples/ops-demo` is canonical. Site's `/demo` imports `Api`, `OperatorRoot`, schema classes from there.

## Out of scope (v0)

- Live queries — needs events table + per-table transformer + bus
- Mutations from the UI — read story is the message
- A third widget — diminishing returns
- Saved configurations, layout toggle, drilldowns — polish, not pitch

## Success criteria

A visitor lands at `/demo`, picks an operator, plays with controls, switches operators, and walks away thinking *"the backend would be the same code regardless of what I clicked."*

## Implementation order

1. **Scaffold**: `/demo` route boots PGlite, seeds it, exposes RPC client. `npm run dev` → visit `/demo` → see "ready".
2. **Login page**: operator picker, stores token, routes to dashboard.
3. **Widget A** end-to-end: controls + result + expression panel.
4. **Widget B**: same shape, different query.
5. **Polish**: layout, BE LOC badge, copy, dark mode.

Stop at any step that lands the visceral moment.
