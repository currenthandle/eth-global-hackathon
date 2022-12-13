import { setContext } from '@apollo/client/link/context';
import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
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

import express, { Request, Response } from 'express';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename).split('/').slice(0, -2).join('/');
import * as dotenv from 'dotenv';
const env = dotenv.config({ path: __dirname + '/.env' });

// consider putting prismabjecon context
const prisma = new PrismaClient();

const app = express();
const httpServer = http.createServer(app);
interface Context {
  prisma: PrismaClient;
  userId: string | null;
  req: Request;
  res: Response;
}

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  formatError: (formattedError /*, error*/) => {
    return { message: formattedError.message };
  },
});
await server.start();

app.use(
  '/',
  cors<cors.CorsRequest>({
    origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
    credentials: true,
  }),
  json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return {
        req,
        res,
        prisma,
        userId:
          req && req.headers && req.headers.authorization
            ? getUserId(req)
            : null,
      };
    },
  })
);
await new Promise<void>((resolve) =>
  httpServer.listen({ port: 3001 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:3001`);
