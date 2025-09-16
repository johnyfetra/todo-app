# Todo API

## Prérequis

- Python 3.12 ou supérieur
- `pip`
- (Optionnel) [virtualenv](https://docs.python.org/3/library/venv.html)

## Installation

1. **Clone le dépôt et place-toi dans le dossier du projet :**
   ```bash
   cd ~/Documents/PROJECTS/Todo/todo-api
   ```

2. **Crée et active un environnement virtuel :**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. **Installe les dépendances :**
   ```bash
   pip install fastapi "uvicorn[standard]" sqlmodel sqlalchemy "psycopg[binary]" python-dotenv --break-system-packages
   ```

## Lancement de l’API

1. **Active l’environnement virtuel si besoin :**
   ```bash
   source .venv/bin/activate
   ```

2. **Lance le serveur :**
   ```bash
   uvicorn app:app --reload
   ```

3. **Accède à la documentation interactive :**
   - [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

**Astuce :**  
Si tu rencontres des problèmes d’installation de paquets, ajoute toujours `--break-system-packages` à la commande `pip install`.