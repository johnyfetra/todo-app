# migrations/env.py
from logging.config import fileConfig
from alembic import context
from sqlalchemy import engine_from_config, pool

import os
import sys
from pathlib import Path 

# Rendre importable le code de l'API (todo-api/) quand Alembic s'exécute
PROJECT_ROOT = Path(__file__).resolve().parents[1] 
sys.path.append(str(PROJECT_ROOT))

# Charger le .env à la racine du monorepo: .../todo-app/.env
from dotenv import load_dotenv
load_dotenv(PROJECT_ROOT.parent / ".env")

from sqlmodel import SQLModel
from models import *  # importe tes modèles (User, Todo, etc.)

# ----- Config de base Alembic
config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    # Utilise SQLite par défaut pour les migrations si DATABASE_URL n'est pas défini
    DATABASE_URL = "sqlite:///./todo.db"
    print(f"⚠️  DATABASE_URL non trouvé, utilisation de SQLite par défaut: {DATABASE_URL}")

# Injecte l'URL vers Alembic
config.set_main_option("sqlalchemy.url", DATABASE_URL)

# Metadata cible pour l'autogénération
target_metadata = SQLModel.metadata

def run_migrations_offline():
    context.configure(
        url=DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True,
        compare_server_default=True,
    )
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
            compare_server_default=True,
        )
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
