import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';
import getUserId from './utils/getUserId.js';
// import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
// .split('/')
// .slice(0, -1)
// .join('/');
console.log('filename', __filename);
const __dirname = path.dirname(__filename).split('/').slice(0, -2).join('/');
console.log('directory-name 👉️', __dirname);
import * as dotenv from 'dotenv';
const env = dotenv.config({ path: __dirname + '/.env' });
console.log('env', env);
// dotenv.config();
// console.log('env', Object.keys(process.env));
console.log('env', process.env.DATABASE_URL);
console.log('env', process.env.JWT_SECRET);

// consider putting prismabjecon context
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
