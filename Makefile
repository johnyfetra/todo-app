SHELL := /usr/bin/bash

.DEFAULT_GOAL := help

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?##' $(MAKEFILE_LIST) | awk 'BEGIN {FS := ":.*?## "} {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

up: ## Start stack (dev override enabled)
	docker compose -f docker-compose.yml -f docker-compose.override.yml up --build

down: ## Stop stack and remove containers
	docker compose down

logs: ## Show logs
	docker compose logs -f --tail=200

ps: ## Show containers
	docker compose ps

sh-api: ## Shell into API container
	docker compose exec api bash || docker compose exec api sh

sh-front: ## Shell into Front container
	docker compose exec front sh

sh-db: ## Connect to Postgres via psql
	docker compose exec db psql -U $$POSTGRES_USER -d $$POSTGRES_DB

build-prod: ## Build production images only
	docker compose build

up-prod: ## Up in detached prod mode
	docker compose up -d --build
