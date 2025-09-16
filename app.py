from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer

from db import init_db
from core.config import CORS_ORIGINS
from routers import auth, todos

app = FastAPI(
    title="Todo API",
    version="0.5.0",
    description="API Todo avec JWT Auth"
)

security = HTTPBearer()

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(auth.router)
app.include_router(todos.router)

@app.get("/health")
def health():
    return {"status": "ok"}
