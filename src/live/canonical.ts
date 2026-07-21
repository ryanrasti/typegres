import { Cast, type DialectName, sql, type Sql } from "../builder/sql";

// Canonical text rendering for live predicate matching — the contract
// shared by the extractor's UNION and each dialect's change capture (pg
// jsonb images via the equivalent `::text`; sqlite json_object images).
// All sites for one dialect must agree, or the matcher's string
// comparison silently misses.
//
// pg: plain CAST(x AS text) — typed params already bind at the column's
// canonical type.
//
// sqlite: drivers bind every JS number as REAL while integer-affinity
// columns store INTEGER, so a naive cast renders the anchor `1` as '1.0'
// but the stored value as '1'. Collapse integral reals to INTEGER before
// the text cast; non-integral reals ('1.5') and other storage classes
// pass through. (CAST(x AS numeric) can't do this — it's a no-op on REAL.)
export const canonicalText = (expr: Sql, dialect: DialectName): Sql =>
  dialect === "sqlite"
    ? sql`CASE WHEN typeof(${expr}) = 'real' AND ${expr} = CAST(${expr} AS integer) THEN CAST(CAST(${expr} AS integer) AS text) ELSE CAST(${expr} AS text) END`
    : new Cast(expr, sql`text`, dialect);
