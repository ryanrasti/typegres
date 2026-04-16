# Live Queries

## Overview

`.live()` on a query returns a reactive result that updates when the underlying data changes. No WAL, no logical replication, no external CDC. Pure SQL + in-memory invalidation.

## How It Works

### 1. Subscription Setup

When `.live()` is called:
- Execute the query, return results to client
- Run a second query (same transaction, same snapshot) that extracts the **dependency set**: for each table in the query, the FK column values that scope it

```typescript
// User's query:
Dogs.from().join(Owners, ...).where(({ dogs }) => dogs.owner_id["="](5)).live()

// Dependency extraction query (auto-generated from AST):
SELECT d.owner_id, o.id AS owner_id
FROM dogs d JOIN owners o ON o.id = d.owner_id
WHERE d.owner_id = $1
GROUP BY d.owner_id, o.id
```

Result: `{ dogs: { owner_id: Set([5]) }, owners: { id: Set([5]) } }`

### 2. Mutation Tracking

Every mutation (insert/update/delete) extracts the affected FK values via RETURNING:
- INSERT: `RETURNING fk_columns` → new values
- DELETE: `RETURNING fk_columns` → deleted values  
- UPDATE: CTE with same WHERE to capture old values + `RETURNING` for new values

These FK values are emitted as **live events**.

### 3. Invalidation Matching

In-memory inverted index: `Map<table, Map<column, Map<value, Set<subscription>>>>`.

On mutation event:
- Look up table in index
- For each FK column in the event, look up value → get candidate subscriptions
- Re-run matched subscriptions, update dependency sets

### 4. Event Store

Abstracted as a simple interface:
```typescript
interface LiveEventStore {
  append(event: { table: string; oldFks: {}; newFks: {} }): Promise<void>;
  poll(cursor: bigint): Promise<{ id: bigint; event: ... }[]>;
}
```

Implementations:
- **In-process**: array (single node, v0)
- **pg**: shadow table + LISTEN/NOTIFY for instant wakeup
- **sqlite**: in-memory + update_hook

## Constraints

- All tables in a `.live()` query must have **simple equality predicates** (`col = col` or `col = literal`). No ranges, no LIKE, no computed predicates. Throws if not met — likely user error.
- Dependency extraction runs as a separate query in the same transaction (same snapshot guarantee).
- For UPDATE old values: CTE replays the WHERE clause to capture pre-mutation FK values.

## Design Rationale

- **No WAL**: works on any pg hosting (Supabase, Neon, RDS), any database (sqlite). No replication slots, no pgoutput.
- **No query rewriting**: the user's query runs untouched. Dependency extraction is a separate, simple query.
- **In-memory matching**: O(columns_in_mutation) Map lookups per event. Scales to 10k+ concurrent subscriptions on a single node.
- **DB-agnostic core**: the event store interface is swappable. Only LISTEN/NOTIFY is pg-specific (optimization, not requirement).

## Scaling

- 1 node: 10k live subs, 1k mutations/sec — comfortable
- Multi-node: pg shadow table coordinates events across nodes, each node matches its own subscriptions
- Debounce: 50-100ms window collapses mutation bursts
