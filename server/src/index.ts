import jwt from 'jsonwebtoken';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// import { unwrapResolverError } from '@apollo/server/errors';

import { PrismaClient } from '@prisma/client';
// import { GraphQLResolveInfo, validate } from 'graphql';
// import { userInfo } from 'os';
import { z } from 'zod';

type Role = 'hacker' | 'mentor' | 'sponsor';

const prisma = new PrismaClient();

const typeDefs = `#graphql
  type User {
    email: String!
    password: String!
    id: ID!
    role: String!
    firstName: String
    lastName: String
    student: Boolean
    school: String
    country: String
    company: String
    website: String
    github: String
    twitter: String
    telegram: String
    linkedin: String
  }

  type UserWithToken {
    user: User!
    token: String!
  }

  type Error {
    message: String!
  }

  union UserOrError = UserWithToken | Error

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
    async userByEmail(_: undefined, { email }: { email: string }) {
      if (!emailValidator.parse(email)) {
        throw new Error('Invalid email input');
      }
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    },
    async validateUser(
      _: undefined,
      { email, password }: { email: string; password: string }
    ) {
      console.log('in validateUser');
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
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      console.log('token', token);
      return {
        __typename: 'UserWithToken',
        user,
        token,
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
      }: { email: string; password: string; role: Role },
      ctx
    ) {
      // console.log('ctx', Object.keys(ctx));
      // console.log(ctx.userId);
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
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        const resp = {
          __typename: 'UserWithToken',
          user,
          token,
        };
        console.log('resp', resp);
        return resp;
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
