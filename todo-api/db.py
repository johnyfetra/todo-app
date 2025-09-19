# db.py
import os
from dotenv import load_dotenv
from sqlmodel import create_engine, SQLModel, Session

load_dotenv()

# Construit l'URL depuis POSTGRES_* si disponible (prioritaire en container)
postgres_host = os.getenv("POSTGRES_HOST")
postgres_user = os.getenv("POSTGRES_USER")
postgres_password = os.getenv("POSTGRES_PASSWORD")
postgres_db = os.getenv("POSTGRES_DB")
postgres_port = os.getenv("POSTGRES_PORT", "5432")

if postgres_host and postgres_user and postgres_password and postgres_db:
    DATABASE_URL = (
        f"postgresql+psycopg://{postgres_user}:{postgres_password}"
        f"@{postgres_host}:{postgres_port}/{postgres_db}"
    )
else:
    DATABASE_URL = os.getenv("DATABASE_URL")  # ex: postgresql+psycopg://todo_user:.../todo_db

engine = create_engine(DATABASE_URL, echo=True)  # echo=True: affiche SQL (debug)

def init_db() -> None:
    SQLModel.metadata.create_all(engine)  # dev: crée les tables si absentes

def get_session():
    with Session(engine) as session:
        yield session
