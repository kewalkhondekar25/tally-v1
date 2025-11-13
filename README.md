<p align="center">
  <h3 align="center">Formiq</h3>

  <p align="center">
    Formiq (tally) - The simplest way to create forms
    <br />
    <a href="https://formiq.kewalkhondekar.dev">Website</a>
    ·
    <a href="https://scalloped-anise-dc9.notion.site/Formiq-28752ef0c8b6801baa99e0ce2ff5951b">Document</a>
  </p>
</p>
<br/>

# Formiq (tally) – Dynamic form builder and Integrations
Formiq formally tally, is a flexible, extensible dynamic form builder using notion inspired typing blocks that lets users create forms, share them publicly, collect responses, and analyze submissions in real time. It includes authentication, form builder UI, responses dashboard, shareable public forms, Google spreadsheets and Notion integrations, and more.

## Monorepo Structure (Turborepo)
 ```sh
     apps/
     ├── client/   # React app (UI)
     └── server/   # Backend API

     docker/
     ├── Dockerfile.client
     └── Dockerfile.server

     packages/
     ├── ui/           # Shared UI components
     ├── common/       # Shared types and validations
     ├── config/       # Shared config/env helpers
     └── db/           # Shared database
   ```

## Prerequisites
You need:

- Node.js 18+
- pnpm (recommended)
- Docker (no docker-compose)
- PostgreSQL database
- Google API Keys
- Notion Integration Keys

## 📥 Clone the Repository

```bash
git clone https://github.com/kewalkhondekar25/tally-v1
cd apps
```
  
## Environment Variables

Each app has its own .env file:

apps/client/.env
```sh
VITE_API_URL=
VITE_ENV_PROD=
VITE_DEV_DOMAIN=
VITE_PROD_DOMAIN=
VITE_GOOGLE_CLIENT_ID=
VITE_GOOGLE_LOGIN_URL=
VITE_GOOGLE_SHEET_LOGIN_URL=
VITE_NOTION_LOGIN_URL=
```

apps/server/.env
```sh
PORT=8080
CORS_ORIGIN=
DOMAIN=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_SHEET_CLIENT_ID=
GOOGLE_SHEET_CLIENT_SECRET=
GOOGLE_SHEET_REDIRECT_URI=
NOTION_CLIENT_ID=
NOTION_CLIENT_SECRET=
NOTION_AUTH_URL=
NOTION_REDIRECT_URI=
```
packages/db/.env
```sh
DATABASE_URL=
```

## Install Dependencies
```sh
pnpm install
```

## Running Locally (Without Docker)

Client (React)

```sh
cd apps/client
pnpm run dev
```

Server

```sh
cd apps/server
pnpm run dev
```

## Running With Docker

1. Build Images
   
  Client (React)
  ```sh
    docker build -f ./docker/Dockerfile.client -t formiq-client .
  ```
  Server
   ```sh
    docker build -f ./docker/Dockerfile.server -t formiq-server .
   ```
  
2. Run Containers

  Client (React)
  ```sh
    docker run -d -p 3000:3000 --env-file apps/client/.env formiq-client
  ```
  Consumer
  ```sh
    docker run -d -p 3000:3000 --env-file apps/server/.env formiq-server
  ```


## Useful Turborepo Commands

Run everything:
```sh
pnpm run dev
```

Build:
```sh
pnpm run build
```

Clean:
```sh
pnpm run clean
```
