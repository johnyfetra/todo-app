## Docker & Docker Compose

### Images

- API: multi-stage Python 3.12, `prod` et `dev` (reload)
- Front: build Angular puis Nginx en prod, `dev` avec `ng serve`
- DB: Postgres 16

### Fichiers

- `docker-compose.yml`: configuration par défaut (prod-like)
- `docker-compose.override.yml`: overrides dev (volumes, reload, ports dev)

### Variables (.env)

- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_PORT`
- `DATABASE_URL` (utilisé par l'API)
- `API_PORT`, `FRONT_DEV_PORT`, `FRONT_PROD_PORT`
- `SECRET_KEY`, `ACCESS_TOKEN_EXPIRE_MINUTES`

Exemple:

```env
POSTGRES_USER=todo_user
POSTGRES_PASSWORD=todo_password
POSTGRES_DB=todo_db
POSTGRES_PORT=5432
POSTGRES_HOST=db
DATABASE_URL=postgresql+psycopg://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB
API_PORT=8000
FRONT_DEV_PORT=4200
FRONT_PROD_PORT=8080
SECRET_KEY=change-me
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

### Commandes utiles

```bash
make up        # dev
make down
make logs
make sh-api
make sh-front
make sh-db
```

### Production

```bash
# build et lancer en détaché
make up-prod
# ou
# docker compose up -d --build
```

- Front: `http://localhost:8080`
- API: `http://localhost:8000`

### Volumes

- `db_data` persiste les données Postgres
