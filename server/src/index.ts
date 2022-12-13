import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';
import getUserId from './utils/getUserId.js';
// import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bodyParser from 'body-parser';
const { json } = bodyParser;
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';

import express from 'express';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename).split('/').slice(0, -2).join('/');
import * as dotenv from 'dotenv';
const env = dotenv.config({ path: __dirname + '/.env' });
// console.log('env', env);
// console.log('env', process.env.DATABASE_URL);
// console.log('env', process.env.JWT_SECRET);

// consider putting prismabjecon context
const prisma = new PrismaClient();

const app = express();
const httpServer = http.createServer(app);

interface AppContext {
  // userService: UserService;
  res: any;
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  formatError: (formattedError, error) => {
    // unwrapResolverError removes the outer GraphQLError wrapping from
    // errors thrown in resolvers, enabling us to check the instance of
    // the original error
    return { message: formattedError.message };
  },
});

await server.start();

app.use(
  '/',
  cors<cors.CorsRequest>({
    origin: [
      'http://localhost:3000',
      'https://www.your-app.example',
      'https://studio.apollographql.com',
    ],
    credentials: true,
  }),
  json(),
  expressMiddleware(server)
);
await new Promise<void>((resolve) =>
  httpServer.listen({ port: 3001 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:3001`);

// const { url } = await startStandaloneServer(server, {
//   listen: { port: 3001 },
//   context: async ({ req, res }) => {
//     console.log('req', req);
//     return {
//       ...req,
//       userId:
//         req && req.headers && req.headers.authorization ? getUserId(req) : null,
//     };
//   },
// });

// console.log(`🚀  Server ready at: ${url}`);
