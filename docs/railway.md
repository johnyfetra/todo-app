# Déploiement Railway - API Todo

## Variables requises (Service API)
- `DATABASE_URL` (format: `postgresql+psycopg://user:pass@host:port/db`)
- `SECRET_KEY`
- `ACCESS_TOKEN_EXPIRE_MINUTES` = 60

## Commandes utiles
```bash
# Déploiement
railway up

# Logs
railway logs -s api

# Variables
railway variables -s api

# Migrations à la demande
railway run -s api -- alembic upgrade head
```

## Dépannage
- Vérifier que `PORT` est injecté par Railway (pas besoin de le définir).
- `app:app` suppose que `/app/app.py` existe (c'est le cas).
- `/health` ne dépend pas de la DB. Si la sonde échoue, vérifier si l'app crash au démarrage.
- Si la DB n'est pas prête, l'entrypoint ne doit pas échouer; consulter logs pour messages `[entrypoint]`.
