# 🚀 Guide de Déploiement Railway - Todo-app

## 📋 Prérequis

- Compte Railway (gratuit) : [railway.app](https://railway.app)
- Docker installé sur votre machine
- Git configuré
- Node.js installé (pour Railway CLI)

## 🔧 Installation Railway CLI

```bash
# Installation globale
npm install -g @railway/cli

# Vérification
railway --version
```

## 🚀 Déploiement Étape par Étape

### 1. Connexion à Railway

```bash
# Se connecter à Railway
railway login

# Vérifier la connexion
railway whoami
```

### 2. Initialisation du Projet

```bash
# Dans le dossier de votre projet
cd /home/fetra/Documents/PROJECTS/Todo-app

# Initialiser Railway
railway init

# Choisir "New Project" et donner un nom (ex: todo-app)
```

### 3. Configuration de la Base de Données

```bash
# Ajouter PostgreSQL
railway add postgresql

# Récupérer l'URL de la base de données
railway variables
```

### 4. Configuration des Variables d'Environnement

```bash
# Variables pour l'API
railway variables set SECRET_KEY="your_super_secret_key_here"
railway variables set ACCESS_TOKEN_EXPIRE_MINUTES="60"
railway variables set PORT="8000"

# Variables pour le frontend
railway variables set API_URL="https://your-app-name.railway.app/api"
```

### 5. Déploiement

```bash
# Déploiement automatique
railway up

# Ou déploiement manuel
railway deploy
```

## 🏗️ Architecture Railway

Votre application sera déployée avec cette architecture :

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   PostgreSQL    │
│   (Angular)     │◄──►│   (FastAPI)     │◄──►│   Database      │
│   Port: 8080    │    │   Port: 8000    │    │   Railway DB    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Fichiers Créés pour Railway

- `railway.json` - Configuration Railway
- `Dockerfile.railway` - Dockerfile optimisé
- `railway-docker-compose.yml` - Docker Compose pour Railway
- `railway-deploy.sh` - Script de déploiement automatique
- `railway.env` - Variables d'environnement

## 🔧 Configuration Post-Déploiement

### 1. Récupérer l'URL de votre application

```bash
# Afficher les services
railway status

# Récupérer l'URL
railway domain
```

### 2. Mettre à jour les variables d'environnement

```bash
# Mettre à jour l'URL de l'API dans le frontend
railway variables set API_URL="https://votre-app.railway.app/api"
```

### 3. Vérifier les logs

```bash
# Logs en temps réel
railway logs

# Logs d'un service spécifique
railway logs --service api
```

## 🐛 Dépannage

### Problème de connexion à la base de données

```bash
# Vérifier les variables
railway variables

# Redémarrer le service
railway restart
```

### Problème de build

```bash
# Vérifier les logs de build
railway logs --service build

# Rebuild manuel
railway redeploy
```

### Problème de CORS

Vérifiez que les CORS_ORIGINS incluent votre domaine Railway :

```python
task-dialog._ORIGINS = [
    "https://votre-app.railway.app",
    "https://votre-app.up.railway.app"
]
```

## 📊 Monitoring

Railway fournit un dashboard avec :
- Métriques de performance
- Logs en temps réel
- Statut des services
- Utilisation des ressources

## 💰 Coûts

- **Plan gratuit** : 500h/mois
- **Base de données** : 1GB gratuit
- **Bande passante** : 100GB/mois gratuit

## 🔄 Mise à Jour

```bash
# Mise à jour automatique depuis Git
git push origin main

# Ou déploiement manuel
railway up
```

## 📞 Support

- Documentation Railway : [docs.railway.app](https://docs.railway.app)
- Discord Railway : [discord.gg/railway](https://discord.gg/railway)
- GitHub Issues : [github.com/railwayapp/cli](https://github.com/railwayapp/cli)

---

🎉 **Félicitations !** Votre Todo-app est maintenant déployée sur Railway !
