from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

# >>> AJOUTS
import os
from dotenv import load_dotenv
from sqlmodel import SQLModel
from models import *  # importe tes modèles pour que SQLModel.metadata les voie

# Cette config Alembic
config = context.config

# Logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# >>> AJOUTS
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
config.set_main_option("sqlalchemy.url", DATABASE_URL)  # Pourquoi: lire l'URL depuis .env

target_metadata = SQLModel.metadata  # Pourquoi: dire à Alembic quel "metadata" scanner

def run_migrations_offline():
    context.configure(
        url=DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True,   # utile si tu changes un type de colonne
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
        context.configure(connection=connection,
                          target_metadata=target_metadata,
                          compare_type=True)
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
