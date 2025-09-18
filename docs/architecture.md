## Architecture du monorepo

```
.
├── README.md
├── docker-compose.yml
├── docker-compose.override.yml
├── Makefile
├── docs/
│   ├── setup.md
│   ├── docker.md
│   └── architecture.md
├── todo-api/
│   ├── app.py
│   ├── db.py
│   ├── core/
│   ├── routers/
│   ├── models.py
│   ├── requirements.txt
│   └── Dockerfile
└── todo-front/
    ├── Dockerfile
    ├── docker/
    │   └── nginx.conf
    └── src/
        ├── index.html
        ├── main.ts
        ├── styles.scss
        ├── environments/
        │   ├── environment.ts
        │   └── environment.prod.ts
        ├── theme/
        │   └── material-theme.scss           # Thème Material (importé dans styles.scss)
        └── app/
            ├── app.config.ts                 # providers root (router, http, interceptor)
            ├── app.routes.ts                 # routes racine → lazy features
            ├── core/                         # cross-cutting (pas de dépendance vers features)
            │   ├── interceptors/
            │   │   └── http-auth.interceptor.ts
            │   ├── guards/
            │   │   └── auth.guard.ts
            │   ├── services/
            │   │   ├── token-storage.service.ts
            │   │   └── http-error.service.ts
            │   └── models/
            │       └── auth.model.ts
            ├── shared/
            │   ├── ui/
            │   │   ├── navbar/
            │   │   │   ├── navbar.component.ts
            │   │   │   ├── navbar.component.html
            │   │   │   ├── navbar.component.scss
            │   │   │   └── navbar.component.spec.ts
            │   │   └── progress-bar/
            │   │       ├── progress-bar.component.ts
            │   │       ├── progress-bar.component.html
            │   │       ├── progress-bar.component.scss
            │   │       └── progress-bar.component.spec.ts
            │   └── utils/
            │       └── validators.ts
            └── features/
                ├── auth/
                │   ├── data-access/
                │   │   ├── auth.service.ts
                │   │   └── auth.api.ts
                │   └── ui/
                │       ├── login-dialog/
                │       │   ├── login-dialog.component.ts
                │       │   ├── login-dialog.component.html
                │       │   ├── login-dialog.component.scss
                │       │   └── login-dialog.component.spec.ts
                │       └── register-dialog/
                │           ├── register-dialog.component.ts
                │           ├── register-dialog.component.html
                │           ├── register-dialog.component.scss
                │           └── register-dialog.component.spec.ts
                └── todos/
                    ├── data-access/
                    │   ├── todo.model.ts
                    │   ├── todo.api.ts
                    │   └── todo.service.ts            # state via Signals
                    ├── pages/
                    │   └── home/
                    │       ├── home.component.ts
                    │       ├── home.component.html
                    │       ├── home.component.scss
                    │       └── home.component.spec.ts
                    ├── ui/
                    │   ├── todo-input/
                    │   │   ├── todo-input.component.ts
                    │   │   ├── todo-input.component.html
                    │   │   ├── todo-input.component.scss
                    │   │   └── todo-input.component.spec.ts
                    │   ├── todo-card/
                    │   │   ├── todo-card.component.ts
                    │   │   ├── todo-card.component.html
                    │   │   ├── todo-card.component.scss
                    │   │   └── todo-card.component.spec.ts
                    │   └── todo-list/
                    │       ├── todo-list.component.ts
                    │       ├── todo-list.component.html
                    │       ├── todo-list.component.scss
                    │       └── todo-list.component.spec.ts
                    └── todos.routes.ts               # lazy feature routes
```

### Services

- `api`: FastAPI (Uvicorn) exposé sur `8000`
- `front`: Angular
  - dev: `ng serve` sur `4200`
  - prod: Nginx servant le build sur `8080`
- `db`: PostgreSQL 16, volume `db_data`

### Réseaux et dépendances

- `api` dépend de `db` (healthcheck Postgres)
- `front` peut appeler `api` via `http://localhost:8000` depuis l'hôte

### Environnements

- Dev: volumes montés, reload activé
- Prod: images optimisées, pas de volumes, Nginx pour le front
