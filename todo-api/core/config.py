# core/config.py
import os

SECRET_KEY = os.getenv("SECRET_KEY", "fetrajohny-api")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))

def _clean(origins: list[str]) -> list[str]:
    return [o.rstrip('/') for o in origins if o]

# Autoriser local dev et domaine front en production
CORS_ORIGINS = _clean([
    "http://localhost:4200",
    "http://127.0.0.1:4200",
    os.getenv("FRONTEND_ORIGIN", "https://frontend-production-2377.up.railway.app"),
])
