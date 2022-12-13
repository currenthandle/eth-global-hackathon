import jwt from 'jsonwebtoken';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// import { unwrapResolverError } from '@apollo/server/errors';

import { PrismaClient } from '@prisma/client';
// import { GraphQLResolveInfo, validate } from 'graphql';
// import { userInfo } from 'os';
// import { z } from 'zod';
import typeDefs from './graphql/typeDefs';
// const typeDefs = require('./graphql/typeDefs');

import * as queries from './graphql/resolvers/queries';
import * as mutations from './graphql/resolvers/mutations';

// console.log('queries', queries);

const prisma = new PrismaClient();

// type CreateUserArgs = {
//   email: string;
//   password: string;
// };
// interface UserService {
//   createUser(email: string, password: string): boolean;
// }
interface AppContext {
  // userService: UserService;
  res: any;
}

const resolvers = {
  Query: queries,
  Mutation: mutations,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (formattedError, error) => {
    // unwrapResolverError removes the outer GraphQLError wrapping from
    // errors thrown in resolvers, enabling us to check the instance of
    // the original error
    return { message: formattedError.message };
  },
});

function getTokenPayload(token) {
  // const payload = Buffer.from(token.split('.')[1], 'base64').toString();
  // return JSON.parse(payload);
  return jwt.verify(token, process.env.JWT_SECRET);
}

function getUserId(req, authToken?) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (!token) {
        throw new Error('No token found');
      }
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error('Not authenticated');
}

const { url } = await startStandaloneServer(server, {
  listen: { port: 3001 },
  context: async ({ req, res }) => ({
    ...req,
    userId:
      req && req.headers && req.headers.authorization ? getUserId(req) : null,
  }),
});

console.log(`🚀  Server ready at: ${url}`);
