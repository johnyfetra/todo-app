#!/usr/bin/env sh
set -eu
URL="${1:-http://localhost:8000}"
echo "Smoke → $URL/health"
curl -fsS "$URL/health" | grep -q '"ok"' && echo "OK" || (echo "KO"; exit 1)
