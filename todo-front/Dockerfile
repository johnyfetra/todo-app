# syntax=docker/dockerfile:1.7-labs

# --- Dev target (usage local uniquement) ---
FROM node:22-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4200
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]

# --- Builder (Angular prod build) ---
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Build Angular en mode production
RUN npm run build -- --configuration production

# --- Runtime (Nginx prod) ---
FROM nginx:1.27-alpine AS prod
RUN apk add --no-cache gettext

# Template Nginx qui utilise ${PORT}
COPY docker/nginx.conf /etc/nginx/templates/default.conf.template

# ⚠️ Copie les fichiers générés (dans le sous-dossier browser)
COPY --from=builder /app/dist/todo-front/browser/ /usr/share/nginx/html

# Entrypoint qui injecte $PORT dans la conf et lance Nginx
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080
CMD ["/entrypoint.sh"]
