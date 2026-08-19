#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
if [ -f "$HERE/.env" ]; then
  set -a
  # shellcheck source=/dev/null
  source "$HERE/.env"
  set +a
fi

: "${FLY_APP:?Set FLY_APP in examples/oracle-notes/.env}"
: "${FLY_ORACLE_APP:?Set FLY_ORACLE_APP in examples/oracle-notes/.env}"
: "${FLY_REGION:?Set FLY_REGION in examples/oracle-notes/.env}"
: "${NOTES_DOMAIN:?Set NOTES_DOMAIN in examples/oracle-notes/.env}"
: "${ORACLE_SYS_PASSWORD:?Set ORACLE_SYS_PASSWORD in examples/oracle-notes/.env}"
: "${ORACLE_APP_PASSWORD:?Set ORACLE_APP_PASSWORD in examples/oracle-notes/.env}"
if [[ ! "$FLY_REGION" =~ ^[a-z0-9]+$ ]]; then
  echo "FLY_REGION must contain only lowercase letters and digits" >&2
  exit 1
fi

ensure_app() {
  flyctl status --app "$1" >/dev/null 2>&1 || flyctl apps create "$1"
}
ensure_app "$FLY_ORACLE_APP"
ensure_app "$FLY_APP"

if ! flyctl volumes list --app "$FLY_ORACLE_APP" | grep -q 'oracle_data'; then
  flyctl volumes create oracle_data --app "$FLY_ORACLE_APP" --region "$FLY_REGION" --size 20 --yes
fi

flyctl secrets set --app "$FLY_ORACLE_APP" \
  ORACLE_PASSWORD="$ORACLE_SYS_PASSWORD" \
  APP_USER_PASSWORD="$ORACLE_APP_PASSWORD"
flyctl deploy --app "$FLY_ORACLE_APP" --config "$HERE/fly.oracle.toml"

echo "Waiting for Oracle Database to accept connections..."
oracle_deadline=$((SECONDS + 900))
until flyctl ssh console --app "$FLY_ORACLE_APP" \
  --command "/opt/oracle/healthcheck.sh" >/dev/null 2>&1; do
  if (( SECONDS >= oracle_deadline )); then
    echo "Oracle Database did not become ready within 15 minutes." >&2
    exit 1
  fi
  sleep 10
done

encoded_password="$(node -e 'process.stdout.write(encodeURIComponent(process.argv[1]))' "$ORACLE_APP_PASSWORD")"
oracle_url="oracle://typegres_notes:${encoded_password}@${FLY_ORACLE_APP}.internal:1521/FREEPDB1"
flyctl secrets set --app "$FLY_APP" ORACLE_URL="$oracle_url"
(cd "$ROOT" && flyctl deploy --app "$FLY_APP" --config "$HERE/fly.app.toml")
flyctl certs add "$NOTES_DOMAIN" --app "$FLY_APP" || true

echo
printf 'Deployment complete. Configure the DNS records shown by:\n  flyctl certs show %q --app %q\n' "$NOTES_DOMAIN" "$FLY_APP"
