## Todo App Monorepo

Monorepo contenant:

- `todo-api/` — API FastAPI (Python, PostgreSQL)
- `todo-front/` — Frontend Angular

Cette base est prête pour Docker/Docker Compose en dev et en prod.

### Prérequis

- Docker + Docker Compose v2
- Make (optionnel mais recommandé)

### Démarrage rapide (Docker)

1. Copier les variables d'environnement:

```bash
cp .env.example .env
```

2. Lancer en mode dev (hot reload API + Angular):

```bash
docker compose -f docker-compose.yml -f docker-compose.override.yml up --build
# ou
make up
```

3. Accéder aux services:

- Front (dev): http://localhost:4200
- API: http://localhost:8000
- Swagger: http://localhost:8000/docs

4. Arrêter:

```bash
docker compose down
# ou
make down
```

### Production (build optimisé)

```bash
docker compose up --build -d
```

- Front (prod): http://localhost:8080
- API (prod): http://localhost:8000

### Utiles

```bash
make logs      # logs de tous les services
make sh-api    # shell dans le conteneur API
make sh-front  # shell dans le conteneur Front
make sh-db     # psql dans la DB
```

### Documentation détaillée

- `docs/setup.md` — Installation locale et commande de base
- `docs/docker.md` — Détails Docker/Docker Compose
- `docs/architecture.md` — Organisation du monorepo et images


