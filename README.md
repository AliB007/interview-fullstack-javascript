# 🌆 City Search App

Ein Fullstack-Projekt mit React + TypeScript im Frontend, Express + Prisma im Backend und PostgreSQL mit Docker Compose.

---

## 🐳 Voraussetzungen

- [Node.js](https://nodejs.org/) installiert
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- `npm` oder `yarn`

---

## 🛠️ 1. Datenbank starten mit Docker

```bash
# .env vorbereiten
📄 .env Beispiel

# PostgreSQL Settings
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=citydb
POSTGRES_PORT=5432

# Prisma
DATABASE_URL="postgresql://admin:admin@localhost:5432/citydb"
# Server
PORT=8000

# PostgreSQL starten
docker-compose up -d
📦 Die Datenbank läuft dann unter localhost:5432 mit den ENV-Werten aus .env.



# Abhängigkeiten installieren
npm install

🧩 2. Backend starten

cd backend
npx ts-node src/index.ts

# Prisma generieren & Datenbank migrieren
npx prisma generate
npx prisma migrate dev --name init

# Seed (fakultativ)
npm run seed

🧩 2. Frontend starten
# Abhängigkeiten installieren
npm install
npm run dev



✅ ToDo 

    Validierung verbessern

    UI

    Unit-Tests & e2e-Tests
