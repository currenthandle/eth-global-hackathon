import { z } from 'zod';
import jwt from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client';
import { Context } from '../../utils/types';
import authRequest from '../../utils/authRequest.js';

const prisma = new PrismaClient();

const emailValidator = z.string().email();
const passwordValidator = z.string().min(2);

export const userData = async (_: undefined, args: any, ctx: Context) => {
  authRequest(ctx);
  console.log('args', args);

  const user = await prisma.user.findUnique({
    where: {
      id: ctx.auth.userId,
    },
  });
  return user;
};
export const validateUser = async (
  _: undefined,
  { email, password }: { email: string; password: string }
) => {
  console.log('inside validateUser');
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
  return {
    __typename: 'UserWithToken',
    user,
    token,
  };
};

export const allUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};
