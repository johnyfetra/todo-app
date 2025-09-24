# core/config.py
import os

SECRET_KEY = os.getenv("SECRET_KEY", "fetrajohny-api")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))

CORS_ORIGINS = [
    "http://localhost:4200",
    "http://127.0.0.1:4200",
    os.getenv("FRONTEND_ORIGIN", ""),
    os.getenv("RAILWAY_PUBLIC_DOMAIN", ""),
]
