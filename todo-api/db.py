import os
import logging
from typing import Optional

from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError
from sqlmodel import SQLModel, Session

load_dotenv()

log = logging.getLogger("db")
_engine = None

def _build_database_url_from_env() -> Optional[str]:
    postgres_host = os.getenv("POSTGRES_HOST")
    postgres_user = os.getenv("POSTGRES_USER")
    postgres_password = os.getenv("POSTGRES_PASSWORD")
    postgres_db = os.getenv("POSTGRES_DB")
    postgres_port = os.getenv("POSTGRES_PORT", "5432")

    if postgres_host and postgres_user and postgres_password and postgres_db:
        return (
            f"postgresql+psycopg://{postgres_user}:{postgres_password}"
            f"@{postgres_host}:{postgres_port}/{postgres_db}"
        )
    return os.getenv("DATABASE_URL")

def get_engine():
    global _engine
    if _engine is not None:
        return _engine

    database_url = _build_database_url_from_env()
    if not database_url:
        log.warning("DATABASE_URL non défini. Base de données désactivée pour le moment.")
        return None

    try:
        _engine = create_engine(database_url, pool_pre_ping=True)
        return _engine
    except Exception as exc:  # garde-fou: ne jamais bloquer le démarrage
        log.error("Impossible de créer l'engine DB: %s", exc)
        _engine = None
        return None

def init_db() -> None:
    engine = get_engine()
    if engine is None:
        return
    try:
        # Vérifie que la DB répond, sans bloquer le démarrage si KO
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        # En dev: crée les tables si absentes (si vous utilisez Alembic en prod,
        # cette ligne peut être retirée)
        SQLModel.metadata.create_all(engine)
        log.info("Connexion DB OK et métadonnées vérifiées.")
    except OperationalError as exc:
        log.error("DB indisponible au startup: %s", exc)
        # Ne pas raise → l'app continue de démarrer
    except Exception as exc:
        log.error("Erreur lors de l'initialisation DB: %s", exc)
        # Ne pas raise → l'app continue de démarrer

def get_session():
    engine = get_engine()
    if engine is None:
        # Optionnel: lever un RuntimeError si une route critique requiert la DB
        raise RuntimeError("La base de données n'est pas configurée.")
    with Session(engine) as session:
        yield session
