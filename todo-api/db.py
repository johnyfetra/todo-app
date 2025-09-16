# db.py
import os
from dotenv import load_dotenv
from sqlmodel import create_engine, SQLModel, Session

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")  # ex: postgresql+psycopg://todo_user:.../todo_db

engine = create_engine(DATABASE_URL, echo=True)  # echo=True: affiche SQL (debug)

def init_db() -> None:
    SQLModel.metadata.create_all(engine)  # dev: crée les tables si absentes

def get_session():
    with Session(engine) as session:
        yield session
