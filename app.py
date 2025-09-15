# app.py
from typing import List
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import select, Session

from db import init_db, get_session
from models import Todo, TodoCreate, TodoRead, TodoUpdate

app = FastAPI(title="Todo API", version="0.3.0")

# Pourquoi: autoriser ton Angular en dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://127.0.0.1:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()   # Pourquoi: crée la/les tables si elles n'existent pas (dev)

@app.get("/todos", response_model=List[TodoRead])
def list_todos(
    done: bool | None = Query(default=None),             # Pourquoi: filtre optionnel ?done=true/false
    session: Session = Depends(get_session)              # Pourquoi: injecter Session DB
):
    stmt = select(Todo).order_by(Todo.id.desc())
    if done is not None:
        stmt = stmt.where(Todo.done == done)
    return session.exec(stmt).all()

@app.post("/todos", response_model=TodoRead, status_code=201)
def create_todo(data: TodoCreate, session: Session = Depends(get_session)):
    todo = Todo(**data.model_dump())      # Pourquoi: transformer DTO → modèle SQL
    session.add(todo)
    session.commit()                      # Pourquoi: persister en base
    session.refresh(todo)                 # Pourquoi: recharger les valeurs (id auto)
    return todo

@app.get("/todos/{todo_id}", response_model=TodoRead)
def get_todo(todo_id: int, session: Session = Depends(get_session)):
    todo = session.get(Todo, todo_id)     # Pourquoi: lookup par PK
    if not todo:
        raise HTTPException(404, "Todo not found")
    return todo

@app.patch("/todos/{todo_id}", response_model=TodoRead)
def update_todo(todo_id: int, data: TodoUpdate, session: Session = Depends(get_session)):
    todo = session.get(Todo, todo_id)
    if not todo:
        raise HTTPException(404, "Todo not found")
    updates = data.model_dump(exclude_unset=True)    # Pourquoi: ne prendre que les champs envoyés
    for k, v in updates.items():
        setattr(todo, k, v)
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo

@app.delete("/todos/{todo_id}", status_code=204)
def delete_todo(todo_id: int, session: Session = Depends(get_session)):
    todo = session.get(Todo, todo_id)
    if not todo:
        raise HTTPException(404, "Todo not found")
    session.delete(todo)
    session.commit()
    return
