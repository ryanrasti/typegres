#!/usr/bin/env bash

set -euo pipefail

cd $(dirname "$0")

psql postgres://postgres:postgres@localhost:1234/test -t -A -F '' <<'SQL' | jq . > tables.json
SELECT json_object_agg(schema_name, tables) AS result
FROM (
  SELECT
    n.nspname AS schema_name,
    json_object_agg(c.relname, columns) AS tables
  FROM pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
  JOIN (
    SELECT
      attrelid,
      json_object_agg(attname, json_build_object(
        'type', t.typname,
        'not_null', a.attnotnull
      )) AS columns
    FROM pg_attribute a
    JOIN pg_type t ON a.atttypid = t.oid
    WHERE a.attnum > 0 AND NOT a.attisdropped
    GROUP BY attrelid
  ) cols ON cols.attrelid = c.oid
  WHERE c.relkind = 'r' AND n.nspname = 'public'
  GROUP BY n.nspname
) per_schema;

SQL

echo "Generated tables.json:" >&2
cat tables.json >&2
echo "Generating TypeScript types..." >&2

tsx table-gen.ts