# Bariendo assignment

This is a Bariendo's assignment to create a full stack web application to create doctor's appointments.

## Setup for development

### Database

Start database instance with docker

```sh
docker-compose up -d postgres
```

### API Server

Go to [/server](/server)

- Environment variables: Create file `.env` in [/server](/server) directory using example from [.env.example](/server/.env.example)
- Install dependencies with pnpm: `pnpm i`
- Database migration: `pnpm db:migrate:deploy`
- Database seed data: `pnpm db:seed`
- Start dev server: `pnpm start`

### UI

Go to [/client](/client)

- Environment variables: Create file `.env` in [/client](/client) directory using example from [.env.example](/client/.env.example)
- Install dependencies with pnpm: `pnpm i`
- Start dev server: `pnpm dev`
