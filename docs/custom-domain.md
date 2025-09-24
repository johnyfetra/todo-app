# Custom Domain & HTTPS on Railway

## API Service
1. Go to your API service in Railway Dashboard.
2. Domains → Add Custom Domain → enter `api.yourdomain.com`.
3. Railway shows DNS records. Create them at your DNS provider:
   - CNAME to Railway domain (or A/AAAA if provided).
4. Wait for DNS propagation. Railway will auto-provision HTTPS via Let's Encrypt.

## Frontend Service
1. Open your frontend service.
2. Domains → Add Custom Domain → `app.yourdomain.com`.
3. Create DNS records as instructed.
4. HTTPS is automatic.

## CORS
- Update API env var `FRONTEND_ORIGIN` with `https://app.yourdomain.com`.
- Optional: `RAILWAY_PUBLIC_DOMAIN` to the same.

## Tips
- Use `railway domain -s <service>` to list current public domains.
- Keep root domain (`@`) for a landing page if needed.
