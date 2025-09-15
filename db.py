# db.py
import os
from dotenv import load_dotenv
from sqlmodel import create_engine, SQLModel, Session

load_dotenv()  # Pourquoi: charge .env pour récupérer DATABASE_URL
DATABASE_URL = os.getenv("DATABASE_URL")

# echo=True pour voir les SQL dans la console (utile en debug)
engine = create_engine(DATABASE_URL, echo=True)

def init_db() -> None:
    # Pourquoi: crée les tables d'après les modèles 'table=True' si absentes (dev)
    SQLModel.metadata.create_all(engine)

def get_session():
    # Pourquoi: fournit une session DB pour chaque requête FastAPI
    with Session(engine) as session:
        yield session
