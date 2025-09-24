from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db import init_db
from core.config import CORS_ORIGINS
from routers import auth, todos

app = FastAPI(
    title="Todo API",
    version="0.5.0",
    description="API Todo avec JWT Auth"
)

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialisation DB au démarrage
@app.on_event("startup")
def on_startup():
    init_db()

# Routers
app.include_router(auth.router)
app.include_router(todos.router)

# Route racine pour 200 OK
@app.get("/", include_in_schema=False)
def root_get():
    return {"name": "Todo API", "status": "ok"}

@app.head("/", include_in_schema=False)
def root_head():
    return {"status": "ok"}

# Route santé
@app.get("/health")
def health():
    return {"status": "ok"}
