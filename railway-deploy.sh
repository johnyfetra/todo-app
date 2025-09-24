#!/bin/bash

# Script de déploiement Railway pour Todo-app
# Usage: ./railway-deploy.sh

echo "🚀 Déploiement Todo-app sur Railway"
echo "=================================="

# Vérification des prérequis
echo "📋 Vérification des prérequis..."

# Vérifier si Railway CLI est installé
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI n'est pas installé"
    echo "📦 Installation de Railway CLI..."
    npm install -g @railway/cli
fi

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé"
    echo "Veuillez installer Docker avant de continuer"
    exit 1
fi

echo "✅ Prérequis vérifiés"

# Connexion à Railway
echo "🔐 Connexion à Railway..."
railway login

# Création du projet
echo "🏗️  Création du projet Railway..."
railway init

# Configuration des variables d'environnement
echo "⚙️  Configuration des variables d'environnement..."

# Variables pour l'API
railway variables set SECRET_KEY="railway_super_secret_key_2024_$(date +%s)"
railway variables set ACCESS_TOKEN_EXPIRE_MINUTES="60"
railway variables set PORT="8000"

# Variables pour le frontend
railway variables set API_URL="https://your-app-name.railway.app/api"

echo "✅ Variables configurées"

# Déploiement
echo "🚀 Déploiement en cours..."
railway up

echo "🎉 Déploiement terminé!"
echo "🌐 Votre application est disponible sur: https://your-app-name.railway.app"
