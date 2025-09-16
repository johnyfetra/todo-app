## Setup local et Docker

### Cloner le dépôt

```bash
git clone https://gitlab.com/PhiArmy/todo-app.git
cd todo-app
```

### Variables d'environnement

Copier l'exemple puis ajuster si besoin :

```bash
cp .env.example .env
```

### Lancer en local (sans Docker)

- API (FastAPI):

```bash
cd todo-api
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt --break-system-packages
export DATABASE_URL="postgresql+psycopg://todo_user:todo_password@localhost:5432/todo_db"
uvicorn app:app --reload
```

- Front (Angular):

```bash
cd todo-front
npm install
npm run start
```

### Lancer avec Docker (recommandé)

```bash
# Dev (hot reload)
make up
# ou
# docker compose -f docker-compose.yml -f docker-compose.override.yml up --build
```

- Front (dev): http://localhost:4200
- API: http://localhost:8000
- Swagger: http://localhost:8000/docs

### Arrêter

```bash
docker compose down
# ou
make down
```
