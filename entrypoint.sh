#!/usr/bin/env sh
# Ne JAMAIS casser si une variable manque : pas de -u
set -e

PORT="${PORT:-8080}"  # fallback sûr si Railway n’injecte pas PORT
echo "[entrypoint] Starting API on PORT=${PORT}"

if [ -n "${DATABASE_URL:-}" ]; then
  echo "[entrypoint] Alembic migrations (best effort)..."
  alembic upgrade head || echo "[entrypoint] WARN: migrations not applied (DB not ready?)"
else
  echo "[entrypoint] DATABASE_URL not set → skipping migrations"
fi

echo "[entrypoint] Launching Uvicorn..."
exec python -m uvicorn app:app --host 0.0.0.0 --port "${PORT}"
