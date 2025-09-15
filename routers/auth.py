# routers/auth.py
from fastapi import APIRouter, Depends, HTTPException, Header
from jose import jwt, JWTError
from sqlmodel import select, Session
from db import get_session
from models import User, UserCreate, UserRead, UserLogin
from core.security import get_password_hash, verify_password, create_access_token
from core.config import ALGORITHM, SECRET_KEY

router = APIRouter(prefix="/auth", tags=["auth"])

def get_user_by_email(session: Session, email: str) -> User | None:
    return session.exec(select(User).where(User.email == email)).first()

@router.post("/register", response_model=UserRead, status_code=201)
def register(payload: UserCreate, session: Session = Depends(get_session)):
    if get_user_by_email(session, payload.email):
        raise HTTPException(400, "Email déjà utilisé")
    user = User(email=payload.email, hashed_password=get_password_hash(payload.password))
    session.add(user)
    session.commit()
    session.refresh(user)
    return UserRead(id=user.id, email=user.email)

@router.post("/login")
def login(credentials: UserLogin, session: Session = Depends(get_session)):
    user = get_user_by_email(session, credentials.email)
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(400, "Identifiants invalides")
    token = create_access_token(subject=str(user.id))
    return {"access_token": token, "token_type": "bearer"}

# --- Dépendances pour lire le JWT du header Authorization ---
def bearer_token(authorization: str = Header(None)) -> str:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(401, "Missing Bearer token")
    return authorization.split()[1]

def get_current_user(
    token: str = Depends(bearer_token),
    session: Session = Depends(get_session),
) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        sub: str | None = payload.get("sub")
        if sub is None:
            raise HTTPException(401, "Invalid token")
    except JWTError:
        raise HTTPException(401, "Invalid token")
    user = session.get(User, int(sub))
    if not user:
        raise HTTPException(401, "User not found")
    return user

@router.get("/me", response_model=UserRead)
def me(current: User = Depends(get_current_user)):
    return UserRead(id=current.id, email=current.email)
