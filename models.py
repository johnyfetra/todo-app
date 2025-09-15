# models.py
from typing import Optional
from sqlmodel import SQLModel, Field

class TodoBase(SQLModel):
    title: str
    done: bool = False

class Todo(TodoBase, table=True):         # Pourquoi: table=True => table SQL
    id: Optional[int] = Field(default=None, primary_key=True)

class TodoCreate(TodoBase):
    pass

class TodoRead(TodoBase):
    id: int

class TodoUpdate(SQLModel):
    title: Optional[str] = None
    done: Optional[bool] = None
