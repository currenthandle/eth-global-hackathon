import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { unwrapResolverError } from '@apollo/server/errors';

import { PrismaClient } from '@prisma/client';
// import { GraphQLResolveInfo, validate } from 'graphql';
// import { userInfo } from 'os';
import { z } from 'zod';

const prisma = new PrismaClient();

const typeDefs = `#graphql
  type User {
    email: String!
    password: String!
    id: ID!
    role: String!
  }

  type Error {
    message: String!
  }

  union UserOrError = User | Error

  type Query {
    allUsers: [User!]!
    userByEmail(email: String!): User!
    validateUser(email: String!, password: String!): UserOrError!
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
    signUpUser(email: String!, password: String!, role: String!): UserOrError!
    login(email: String!, password: String!): User!
  }
`;

const emailValidator = z.string().email();
const passwordValidator = z.string().min(2);
const roleValidator = z.union([
  z.literal('hacker'),
  z.literal('mentor'),
  z.literal('sponsor'),
]);

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
  Query: {
    async validateUser(
      _: undefined,
      { email, password }: { email: string; password: string }
    ) {
      if (!emailValidator.parse(email)) {
        throw new Error('Invalid email input');
      }
      if (!passwordValidator.parse(password)) {
        throw new Error('Invalid password input');
      }
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user || user.password !== password) {
        return {
          __typename: 'Error',
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
  },
  Mutation: {
    async signUpUser(
      _: undefined,
      {
        email,
        password,
        role,
      }: { email: string; password: string; role: string }
    ) {
      if (!emailValidator.parse(email)) {
        throw new Error('Invalid email input');
      }
      if (!passwordValidator.parse(password)) {
        throw new Error('Invalid password input');
      }
      if (!roleValidator.parse(role)) {
        throw new Error('Invalid role input');
      }
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
          __typename: 'Error',
          message: 'Email already registered',
        };
      }
      // if the user doesn't exist, create the user and return the user
      else {
        // console.log('role', role);
        const user = await prisma.user.create({
          data: {
            email,
            password,
            role,
          },
        });
        return {
          __typename: 'User',
          ...user,
        };
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
    return { message: formattedError.message };
  },
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3001 },
  // context: async ({ req, res }) => ({}),
});

console.log(`🚀  Server ready at: ${url}`);
