# models.py
from typing import Optional
from sqlmodel import SQLModel, Field

# --- Users ---
class UserBase(SQLModel):
    email: str

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int

class UserLogin(SQLModel):
    email: str
    password: str

# --- Todos ---
class TodoBase(SQLModel):
    title: str
    done: bool = False

class Todo(TodoBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    owner_id: int = Field(foreign_key="user.id")  # ✅ liaison au User

class TodoCreate(TodoBase):
    pass

class TodoRead(TodoBase):
    id: int

class TodoUpdate(SQLModel):
    title: Optional[str] = None
    done: Optional[bool] = None
