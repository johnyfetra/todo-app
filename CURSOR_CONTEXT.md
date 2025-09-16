# Cursor Context: Todo Monorepo

## Overview
- todo-front: Angular v19 standalone components + Angular Material.
- todo-api: Python FastAPI backend.

## Frontend Standards
- Styling: Angular Material prebuilt indigo-pink + local SCSS.
- Forms: Reactive Forms only.
- HTTP: services under src/app/api.
- Auth: JWT token stored in localStorage as access_token.
- Guards: AuthGuard protects root route '/'.

## UX Components
- Toasts via NotifyService wrapping MatSnackBar.
- Global LoaderService controlling a LoaderComponent overlay.
- Confirmation via MatDialog.

## Todos Page
- Reactive add form, linear progress, filter (all/active/done), list with checkbox + delete.

## Backend
- FastAPI app in todo-api/app.py with routers for auth and todos.

## Conventions
- Keep components standalone; share utilities in src/app/core.
- Prefer clear names, small functions, early returns.
