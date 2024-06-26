# Bariendo assignment

This is a Bariendo's assignment to create a full stack web application to create doctor's appointments. [read more](./Assignment.md)

## Setup for development

### Database

Start database instance with docker

```sh
docker-compose up -d postgres
```

### API Server (NestJS)

Go to [/server](/server)

- Environment variables: Create file `.env` in [/server](/server) directory using example from [.env.example](/server/.env.example)
- Install dependencies with pnpm: `pnpm i`
- Database migration: `pnpm db:migrate:deploy`
- Database seed data: `pnpm db:seed`
- Start dev server: `pnpm start` or watch mode `pnpm start:dev`

### UI (NextJS)

Go to [/client](/client)

- Environment variables: Create file `.env` in [/client](/client) directory using example from [.env.example](/client/.env.example)
- Install dependencies with pnpm: `pnpm i`
- Start dev server: `pnpm dev`

## Seed data

I added seed data which are organizations, super admin and organization admin and users for testing as below.
| orgs | role | email | password |
|-------|------------|-------------------------|-----------|
| - | SuperAdmin | superadmin@bariendo.com | P@ssw0rd! |
| Org A | Admin | admin@orga.com | P@ssw0rd! |
| Org B | Admin | admin@orgb.com | P@ssw0rd! |
| Org C | Admin | admin@orgc.com | P@ssw0rd! |
| Org A | Patient | usera@orga.com | password |
| Org A | Doctor | userb@orga.com | password |

## Deployment with Docker compose

- Set up `.env` files for server and client like on development _(for `DATABASE_URL` of server need to change `localhost` to be service name which is `postgres`)_

- Start docker compose with this command

  ```sh
  docker-compose up
  ```

- For client if you update env configs, it needs to rebuild with command

  ```sh
  docker-compose build ui --no-cache
  ```
