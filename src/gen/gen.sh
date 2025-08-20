#!/usr/bin/env bash

set -euo pipefail

# Change to the script's directory
cd $(dirname "$0")

# Run the query and save the output to functions.json
psql -h localhost -p 1234 -U postgres -t -A -F '' <<'SQL' | jq . > functions.json
WITH reserved_words AS (
  SELECT word, TRUE as is_reserved
  FROM pg_get_keywords()
),
func_info AS (
  SELECT
    n.nspname,
    p.proname,
    rt.typname AS ret_type,
    rt.oid AS ret_type_oid,
    (
      SELECT coalesce(array_agg(t.typname ORDER BY p.ord), '{}')
      FROM unnest(p.proargtypes) WITH ORDINALITY as p(arg_type, ord)
      JOIN pg_type t ON t.oid = arg_type
    ) AS arg_types,
    (
      SELECT coalesce(array_agg(t.oid ORDER BY p.ord), '{}')
      FROM unnest(p.proargtypes) WITH ORDINALITY as p(arg_type, ord)
      JOIN pg_type t ON t.oid = arg_type
    ) AS arg_type_oids,
    p.proretset as retset,
     (SELECT coalesce(array_agg(unnest_type.oid ORDER BY unnest_type.ord), '{}')
     FROM unnest(p.proallargtypes) WITH ORDINALITY AS unnest_type(oid, ord)
     JOIN unnest(p.proargmodes) WITH ORDINALITY AS unnest_mode(mode, ord) ON unnest_type.ord = unnest_mode.ord
     WHERE unnest_mode.mode = ANY (ARRAY['o', 't', 'b'])) AS output_oids, -- 'o' for OUT, 't' for TABLE, 'b' for INOUT
    (SELECT coalesce(array_agg(t.typname ORDER BY unnest_type.ord), '{}')
     FROM unnest(p.proallargtypes) WITH ORDINALITY AS unnest_type(oid, ord)
     JOIN unnest(p.proargmodes) WITH ORDINALITY AS unnest_mode(mode, ord) ON unnest_type.ord = unnest_mode.ord
     JOIN pg_type t ON t.oid = unnest_type.oid
     WHERE unnest_mode.mode = ANY (ARRAY['o', 't', 'b'])) AS output_column_types, -- 'o' for OUT, 't' for TABLE, 'b' for INOUT
    (SELECT coalesce(array_agg(argname ORDER BY arg.ord), '{}')
     FROM unnest(p.proargnames) WITH ORDINALITY AS arg(argname, ord)
     JOIN unnest(p.proargmodes) WITH ORDINALITY AS mode_arg(mode, ord) ON arg.ord = mode_arg.ord
     WHERE mode_arg.mode = ANY (ARRAY['o', 't', 'b'])) AS output_column_names,
    a.aggfnoid IS NOT NULL AS is_agg,
    op.oprname AS operator_name,
    COALESCE(rw.is_reserved, FALSE) AS is_reserved,
    p.provariadic != 0 AS is_variadic
  FROM pg_proc p
  JOIN pg_namespace n ON n.oid = p.pronamespace
  JOIN pg_type rt ON rt.oid = p.prorettype
  LEFT JOIN pg_aggregate a ON a.aggfnoid = p.oid
  LEFT JOIN pg_operator op ON op.oprcode = p.oid -- Joined with pg_operator
  LEFT JOIN reserved_words rw ON UPPER(p.proname) = UPPER(rw.word)
  WHERE n.nspname = 'pg_catalog'
),
grouped_funcs AS (
  SELECT
    nspname,
    proname,
    json_agg(json_build_object(
      'ret', ret_type,
      'ret_oid', ret_type_oid,
      'args', arg_types,
      'arg_oids', arg_type_oids,
      'is_retset', retset,
      'retset', output_column_types,
      'retset_names', output_column_names,
      'retset_oids', output_oids,
      'is_agg', is_agg,
      'operator_name', operator_name,
      'is_reserved', is_reserved,
      'is_variadic', is_variadic
    ) ORDER BY ret_type, arg_types) AS overloads
  FROM func_info
  GROUP BY nspname, proname
),
final_json AS (
  SELECT
    nspname,
    json_object_agg(proname, overloads ORDER BY proname) AS funcs
  FROM grouped_funcs
  GROUP BY nspname
)
SELECT json_object_agg(nspname, funcs ORDER BY nspname) FROM final_json;
SQL

tsx gen.ts