import { ApolloServer } from '@apollo/server';
import { PrismaClient } from '@prisma/client';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';
import getAuth from './utils/getAuth.js';
import cors from 'cors';
import bodyParser from 'body-parser';
const { json } = bodyParser;
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import { Context } from './utils/types.js';

import express from 'express';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

const prisma = new PrismaClient();

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  formatError: (formattedError) => {
    return { message: formattedError.message };
  },
});
await server.start();

app.use(
  cors<cors.CorsRequest>({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  }),
  json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return {
        req,
        res,
        prisma,
        auth: req && req.headers && req.headers.cookie ? getAuth(req) : null,
      };
    },
  })
);
await new Promise<void>((resolve) =>
  httpServer.listen({ port: 3001 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:3001`);
