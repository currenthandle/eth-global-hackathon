import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';
import getUserId from './utils/getUserId.js';

const prisma = new PrismaClient();

interface AppContext {
  // userService: UserService;
  res: any;
}

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

const { url } = await startStandaloneServer(server, {
  listen: { port: 3001 },
  context: async ({ req, res }) => ({
    ...req,
    userId:
      req && req.headers && req.headers.authorization ? getUserId(req) : null,
  }),
});

console.log(`🚀  Server ready at: ${url}`);
