import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { unwrapResolverError } from '@apollo/server/errors';

import { PrismaClient } from '@prisma/client';
import { GraphQLResolveInfo, validate } from 'graphql';
import { userInfo } from 'os';
const prisma = new PrismaClient();

const typeDefs = `#graphql
  type User {
    email: String!
    password: String
    id: ID!
  }

  type UserNotFoundError {
    message: String!
  }

  union UserOrError = User | UserNotFoundError

  type Query {
    allUsers: [User!]!
    userByEmail(email: String!): User!
    validateUser(email: String!, password: String!): UserOrError!
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
    signUpUser(email: String!, password: String!): User!
    login(email: String!, password: String!): User!
  }
`;

type CreateUserArgs = {
  email: string;
  password: string;
};
interface UserService {
  createUser(email: string, password: string): boolean;
}
interface AppContext {
  // userService: UserService;
  res: any;
}
console.log('resolvers!');

const resolvers = {
  Query: {
    async validateUser(
      _: undefined,
      { email, password }: { email: string; password: string }
    ) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user || user.password !== password) {
        return {
          __typename: 'UserNotFoundError',
          message: 'Invalid user or password',
        };
      }
      return {
        __typename: 'User',
        ...user,
      };
    },
    allUsers: async () => {
      const users = await prisma.user.findMany();
      return users;
    },
    userByEmail: async (parent: undefined, { email }: { email: string }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      return user;
    },
  },
  Mutation: {
    async signUpUser(
      _: undefined,
      { email, password }: { email: string; password: string }
    ) {
      // check prisma db to see if the user already exists
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      // if the user exists, return an error
      if (user) {
        // throw new Error('User already exists');
        return {
          __typename: 'UserAlreadyExistsError',
          message: 'Email already registered',
        };
      }
      // if the user doesn't exist, create the user and return the user
      else {
        const user = await prisma.user.create({
          data: {
            email,
            password,
          },
        });
        return {
          __typename: 'User',
          ...user,
        };
      }
    },
    // a mutation resolver that creates a new user and adds it to the database
    async createUser(
      parent: undefined,
      args: CreateUserArgs
      // context: AppContext,
      // info: GraphQLResolveInfo
    ) {
      const { email, password } = args;

      const user = await prisma.user.create({
        data: {
          password,
          email,
        },
      });
      return user;
    },
    async login(
      parent: undefined,
      args: CreateUserArgs,
      context: AppContext
      // info: GraphQLResolveInfo
    ) {
      // console.log('context', context);
      const { email, password } = args;

      try {
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          throw new Error('Invalid email or password');
        }
        if (user.password !== password) {
          throw new Error('Invalid email or password');
        }
        // context.res.cookie('user', user, {
        //   httpOnly: true,
        //   maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
        // });
        // context.res.stausCode = 200;
        // context.res.end(user);
        return user;
      } catch (err) {
        throw new Error('Invalid email or password');
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (formattedError, error) => {
    // unwrapResolverError removes the outer GraphQLError wrapping from
    // errors thrown in resolvers, enabling us to check the instance of
    // the original error
    return { message: 'Internal server error' };
  },
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3001 },
  context: async ({ req, res }) => ({ res }),
});

console.log(`🚀  Server ready at: ${url}`);
