# CI with GitHub Actions & Railway

## Prerequisites
- Generate Railway token: `railway login` → `railway tokens create`
- In GitHub repo: Settings → Secrets and variables → Actions → New repository secret:
  - `RAILWAY_TOKEN` = your token

## Workflows
- `.github/workflows/deploy-api.yml` → deploys API when backend files change on `main`.
- `.github/workflows/deploy-frontend.yml` → deploys Angular when `todo-front/**` changes on `main`.

## Notes
- The workflows use `railway up --yes`.
- API workflow runs at repo root (Dockerfile + railway.toml).
- Frontend workflow runs inside `todo-front/`.

## Manual Triggers
- You can trigger via GitHub Actions UI → Run workflow.
- Or deploy locally with CLI using the same token: `RAILWAY_TOKEN=... railway up`.
