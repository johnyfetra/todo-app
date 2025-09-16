# routers/todos.py
from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import select, Session
from db import get_session
from models import Todo, TodoCreate, TodoRead, TodoUpdate, User
from routers.auth import get_current_user
from fastapi.security import HTTPBearer


router = APIRouter(
    prefix="/todos",
    tags=["todos"],
    dependencies=[Depends(HTTPBearer())]   # 🔑 ajoute la sécurité Bearer
)

@router.get("", response_model=List[TodoRead])
def list_todos(
    done: bool | None = Query(default=None),
    session: Session = Depends(get_session),
    current: User = Depends(get_current_user)
):
    stmt = select(Todo).where(Todo.owner_id == current.id).order_by(Todo.id.desc())
    if done is not None:
        stmt = stmt.where(Todo.done == done)
    return session.exec(stmt).all()

@router.post("", response_model=TodoRead, status_code=201)
def create_todo(
    data: TodoCreate,
    session: Session = Depends(get_session),
    current: User = Depends(get_current_user)
):
    todo = Todo(owner_id=current.id, **data.model_dump())
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return TodoRead(id=todo.id, title=todo.title, done=todo.done)

@router.get("/{todo_id}", response_model=TodoRead)
def get_todo(
    todo_id: int,
    session: Session = Depends(get_session),
    current: User = Depends(get_current_user)
):
    todo = session.get(Todo, todo_id)
    if not todo or todo.owner_id != current.id:
        raise HTTPException(404, "Todo not found")
    return TodoRead(id=todo.id, title=todo.title, done=todo.done)

@router.patch("/{todo_id}", response_model=TodoRead)
def update_todo(
    todo_id: int,
    data: TodoUpdate,
    session: Session = Depends(get_session),
    current: User = Depends(get_current_user)
):
    todo = session.get(Todo, todo_id)
    if not todo or todo.owner_id != current.id:
        raise HTTPException(404, "Todo not found")
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(todo, k, v)
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return TodoRead(id=todo.id, title=todo.title, done=todo.done)

@router.delete("/{todo_id}", status_code=204)
def delete_todo(
    todo_id: int,
    session: Session = Depends(get_session),
    current: User = Depends(get_current_user)
):
    todo = session.get(Todo, todo_id)
    if not todo or todo.owner_id != current.id:
        raise HTTPException(404, "Todo not found")
    session.delete(todo)
    session.commit()
    return
