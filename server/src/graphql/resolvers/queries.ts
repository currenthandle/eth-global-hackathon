import { z } from 'zod';
import jwt from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client';
import { Context } from '../../utils/types';

const prisma = new PrismaClient();

const emailValidator = z.string().email();
const passwordValidator = z.string().min(2);

export const userByEmail = async (
  _: undefined,
  { email }: { email: string },
  ctx: Context
) => {
  if (!ctx.auth || !ctx.auth.userId) {
    throw new Error('Unauthorized');
  }
  if (!emailValidator.parse(email)) {
    throw new Error('Invalid email input');
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
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
