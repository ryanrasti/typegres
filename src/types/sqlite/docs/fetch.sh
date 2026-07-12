#!/usr/bin/env bash
# Vendor the SQLite doc pages that drive signatures.json (the
# function/operator definition pipeline — see plan.md).
#
# sqlite.org serves current-release docs only; we stamp VERSION with
# the sqlite_version() the definitions target so the verifier can
# flag drift between the docs snapshot and the SQLite that
# better-sqlite3 actually embeds.
set -euo pipefail
cd "$(dirname "$0")"

PAGES=(
  lang_corefunc.html   # core scalar functions
  lang_mathfunc.html   # math functions
  lang_datefunc.html   # date/time functions + modifier mini-language
  lang_aggfunc.html    # aggregate functions
  windowfunctions.html # window functions
  json1.html           # JSON functions + -> / ->> operators
  lang_expr.html       # expressions: full operator precedence table, LIKE/GLOB/BETWEEN/IS
  datatype3.html       # type affinity + comparison coercion rules
  printf.html          # format()/printf() format-string language
  percentile.html      # median()/percentile() aggregate extension
)

for page in "${PAGES[@]}"; do
  echo "fetching $page"
  curl -fsSL "https://www.sqlite.org/$page" -o "$page"
done

# Record what we fetched and the SQLite version the definitions target.
{
  echo "fetched_at: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "source: https://www.sqlite.org/ (current release docs)"
  node -e 'import("better-sqlite3").then(m => {
    const db = new m.default(":memory:");
    console.log("target_sqlite_version: " + db.prepare("SELECT sqlite_version() v").get().v);
    db.close();
  })' 2>/dev/null || echo "target_sqlite_version: unknown (better-sqlite3 not resolvable)"
} > VERSION

echo "done — $(ls -1 *.html | wc -l) pages, see VERSION"
