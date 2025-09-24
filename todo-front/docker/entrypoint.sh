#!/usr/bin/env sh
set -e

: "${PORT:=8080}"
echo "[front] Using PORT=${PORT}"

envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

echo "[front] --- generated nginx conf ---"
head -n 40 /etc/nginx/conf.d/default.conf || true
echo "[front] ----------------------------"

echo "[front] --- check built files inside container ---"
echo "[front] ls -la /usr/share/nginx/html"
ls -la /usr/share/nginx/html || true
echo "[front] head -n 20 /usr/share/nginx/html/index.html"
head -n 20 /usr/share/nginx/html/index.html || true
echo "[front] ------------------------------------------"

exec nginx -g 'daemon off;'
