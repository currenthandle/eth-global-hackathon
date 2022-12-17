# ETH Global Hackathon: Create and Manage Applications

## Server Setup (GraphQL API)

1. Make sure you're using the latest Node.js LTS version (v18.12.1 or higher).
2. Install Postgres locally (or use you preferred postgres service).
3. If you're using a local Postgres service make sure you have `psql` installed. Then run `psql` to open the postgres shell.
4. Create a database named `hackathon` by running `CREATE DATABASE hackathon;` from the `psql` shell. You can use any name you want but you'll need to set the `DATABASE_URL` accordingly in the in the `.env` file. See step 7 below.
5. Create an `.env` file in `<project-root>/server`.
6. Add a `JWT_SECRET` in `.env` and set it to a string. Any string will work but it's a good idea to use a long random string.
   Example: `JWT_SECRET=41CD39FB323A6DBF371336BC9CC55`.
7. Next, add a `DATABASE_URL` to the same `.env` and set it to the connection URL for your postgres database, using the following format: `DATABASE_URL=postgresql://{user}:{password}@]{hostname}:{port}/{dbname}{?param1=value1&...}`
   Your`.env`should look like this (no postgres password in this example):

   `<project-root>/server/.env`:

```
DATABASE_URL=postgresql://steve@localhost:5432/hackathon?schema=public
JWT_SECRET=41CD39FB323A6DBF371336BC9CC55
```

8. Run `npm install` in the server directory.
9. Run `npx prisma generate` in the server directory to connect to the database.
10. Run `npx prisma migrate dev --name init` in the server directory to create the database tables.
11. To run the dev server you first need to run `npm run compile` or `npm start` for the first time from the server directory.
12. After that you can run `npm run dev` in the server directory to start the GraphQL server in development mode.
    To run the server in production mode run `npm start` straight away.
13. Leave the dev server running and open a new terminal window for the client.

## Client Setup (Next.js App)

1. In the new terminal window, make sure you're in the project root.
2. `cd client`
3. `npm install`
4. `npm run dev` to start the client in development mode.
   To run the client in production mode run `npm run build` and then `npm start` instead.
5. Open your browser to `http://localhost:3000`
6. The app will reroute you to `http://localhost:3000/login`.
7. Click the `Sign Up` button to create a new user and application with your email address.
8. From there you will be able to update your application profile and view your application status.

### Note:

1. If you have any issues clear the browser cache and cookies and try again.
2. To multiselet multiple options hold the `Cmd` key on Mac when clicking more than one option.
