# ETH Global Hackathon Signup and Profile Management System

## Server Setup

1. Make sure you're using the latest Node.js LTS version (v18.12.1 or higher).
2. Install Postgres locally (or use you preferred postgres service).
3. If you're using a local Postgres service make sure you have `psql` installed. Then run `psql` to open the postgres shell.
4. Create a database named `hackathon` by running `CREATE DATABASE hackathon;` from the `psql` shell. You can use any name you want but you'll need to set the `DATABASE_URL` accordingly in the in the `.env` file. See step 7 below.
5. Create an `.env` file in `<project-root>/server`.
6. Add a `JWT_SECRET` in `.env` and set it to a string. Any string will work but it's a good idea to use a long random string.
   Example: `JWT_SECRET=41CD39FB323A6DBF371336BC9CC55`.
7. Next, add a `DATABASE_URL` to the same `.env` and set it to the connection URL for your postgres database, using the following format `postgres://{user}:{password}@{host}:{port}/{db_name}?sslmode=require`
   Example: `DATABASE_URL=postgresql://{user}:{password}@]{hostname}:{port}/{dbname}{?param1=value1&...}`
   Your`.env`should look like this (no postgres password in this example):
   `.env`:

```
DATABASE_URL=postgresql://steve@localhost:5432/hackathon?schema=public
JWT_SECRET=41CD39FB323A6DBF371336BC9CC55
```

7. Run `npm install` in the server directory
8. Run `npx prisma generate` in the server directory to connect to the database
9. Run `npx prisma migrate dev --name init` in the server directory to create the database tables
10. Run `npm run dev` in the server directory to start the GraphQL server
11. Leave the dev server running and open a new terminal window for the client

## Client Setup

1. In the new terminal window, make sure you're in the project root
2. `cd client`
3. `npm install`
4. `npm run dev` to start the client
5. Open your browser to `http://localhost:3000`
