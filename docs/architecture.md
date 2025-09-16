## Architecture du monorepo

```
.
├── README.md
├── docker-compose.yml
├── docker-compose.override.yml
├── Makefile
├── docs/
│   ├── setup.md
│   ├── docker.md
│   └── architecture.md
├── todo-api/
│   ├── app.py
│   ├── db.py
│   ├── core/
│   ├── routers/
│   ├── models.py
│   ├── requirements.txt
│   └── Dockerfile
└── todo-front/
    ├── Dockerfile
    ├── docker/nginx.conf
    └── src/
```

### Services

- `api`: FastAPI (Uvicorn) exposé sur `8000`
- `front`: Angular
  - dev: `ng serve` sur `4200`
  - prod: Nginx servant le build sur `8080`
- `db`: PostgreSQL 16, volume `db_data`

### Réseaux et dépendances

- `api` dépend de `db` (healthcheck Postgres)
- `front` peut appeler `api` via `http://localhost:8000` depuis l'hôte

### Environnements

- Dev: volumes montés, reload activé
- Prod: images optimisées, pas de volumes, Nginx pour le front
