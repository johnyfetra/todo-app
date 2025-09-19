## Guide: Ajouter un champ, générer la migration, lancer l'app

Ce guide explique comment ajouter un nouveau champ (ex: `due_date`) au modèle `Todo`, générer et appliquer la migration Alembic, puis lancer l'application, en local et via Docker.

### 1) Modifier le modèle

- Fichier: `todo-api/models.py`
- Exemple d'ajout (avec mise à jour du schéma de mise à jour):

```python
from typing import Optional
from datetime import date

class TodoBase(SQLModel):
    title: str
    done: bool = False
    description: Optional[str] = None
    due_date: Optional[date] = None  # nouveau champ

class TodoUpdate(SQLModel):
    title: Optional[str] = None
    done: Optional[bool] = None
    description: Optional[str] = None
    due_date: Optional[date] = None
```

### 2) Générer la migration Alembic

Assurez-vous que `todo-api/migrations/env.py` définit `target_metadata = SQLModel.metadata`.

- En local (venv):
```bash
cd todo-api
source .venv/bin/activate
python -m alembic revision --autogenerate -m "add due_date to todo"
```

- Si l'autogénération n'ajoute rien, complétez manuellement la migration créée dans `todo-api/migrations/versions/*.py`:
```python
def upgrade():
    op.add_column('todo', sa.Column('due_date', sa.Date(), nullable=True))

def downgrade():
    op.drop_column('todo', 'due_date')
```

### 3) Appliquer la migration

#### Local (SQLite)
- Si `DATABASE_URL` est absent, `env.py` peut basculer sur SQLite `sqlite:///./todo.db`.
```bash
cd todo-api
DATABASE_URL=sqlite:///./todo.db python -m alembic upgrade head
```

#### PostgreSQL hors Docker (host)
```bash
export DATABASE_URL="postgresql+psycopg://todo_user:VOTRE_MDP@127.0.0.1:5432/todo_db2"
python -m alembic upgrade head
```

#### Docker / Docker Compose

- L'API peut recevoir soit `DATABASE_URL`, soit des variables `POSTGRES_*`. Le code `todo-api/db.py` construit l'URL à partir de `POSTGRES_*` si elles existent (recommandé en container):
  - `POSTGRES_HOST=db`
  - `POSTGRES_USER=todo_user`
  - `POSTGRES_PASSWORD=...`
  - `POSTGRES_DB=todo_db2`

- Redémarrer:
```bash
docker compose -f docker-compose.yml -f docker-compose.override.yml up -d --build
```

- (Optionnel) Exécuter Alembic dans le conteneur API:
```bash
docker exec -it todo_api bash -lc "python -m alembic upgrade head"
```

### 4) Lancer et vérifier l'app

- Local:
```bash
uvicorn app:app --host 0.0.0.0 --port 8000
```

- Docker:
```bash
docker compose -f docker-compose.yml -f docker-compose.override.yml up -d --build
```

- Vérifications:
```bash
curl http://localhost:8000/health
# Docs: http://localhost:8000/docs
```

### Dépannage (erreurs courantes)

- "database X does not exist":
  - Créer la DB dans le conteneur Postgres:
```bash
docker exec -i todo_db psql -U todo_user -d postgres -c "CREATE DATABASE todo_db2;"
```

- Connexion depuis container vers 127.0.0.1 refuse:
  - En container, n'utilisez pas 127.0.0.1 pour joindre Postgres, utilisez `db` (service Compose) via `POSTGRES_HOST=db`.

- DuplicateTable/DuplicateColumn:
  - La DB contient déjà des objets mais Alembic pense partir de zéro. Alignez l'état:
```bash
python -m alembic stamp <revision_id_existant>
python -m alembic upgrade head
```

- Autogenerate vide:
  - Vérifier `target_metadata = SQLModel.metadata` dans `migrations/env.py`.
  - Écrire l'opération `op.add_column(...)` à la main.

### Références de fichiers

- `todo-api/models.py` : modèles SQLModel.
- `todo-api/db.py` : construction de l'engine (priorité à `POSTGRES_*`).
- `todo-api/migrations/env.py` : config Alembic / metadata.
- `todo-api/migrations/versions/*.py` : scripts de migration.
- `docker-compose.yml` / `docker-compose.override.yml` : services et env.


