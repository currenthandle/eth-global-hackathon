import { z } from 'zod';
import jwt from 'jsonwebtoken';

import { Context } from '../../utils/types';
import authRequest from '../../utils/authRequest.js';

const emailValidator = z.string().email();

export const emailIsAvailable = async (
  _: undefined,
  { email }: { email: string },
  ctx: Context
) => {
  if (!emailValidator.parse(email)) {
    throw new Error('Invalid email input');
  }
  const user = await ctx.prisma.user.findUnique({
    where: {
      email,
    },
  });
  return !user;
};

export const userData = async (_: undefined, __: {}, ctx: Context) => {
  authRequest(ctx);

  const user = await ctx.prisma.user.findUnique({
    where: {
      id: ctx.auth.userId,
      // email: 'c@c.com',
    },
  });
  console.log('user on server', user);
  if (user.role === 'hacker') {
    const hackerProfile = await ctx.prisma.hackerProfile.findUnique({
      where: {
        userId: ctx.auth.userId,
      },
    });
    return {
      ...user,
      ...hackerProfile,
    };
  }
  if (user.role === 'partner') {
    const partnerProfile = await ctx.prisma.partnerProfile.findUnique({
      where: {
        userId: ctx.auth.userId,
      },
    });
    return {
      ...user,
      ...partnerProfile,
    };
  }
  if (user.role === 'mentor') {
    const mentorProfile = await ctx.prisma.mentorProfile.findUnique({
      where: {
        userId: ctx.auth.userId,
      },
    });
    return {
      ...user,
      ...mentorProfile,
    };
  }
};
export const validateUser = async (
  _: undefined,
  { email }: { email: string },
  ctx: Context
) => {
  if (!emailValidator.parse(email)) {
    throw new Error('Invalid email input');
  }
  const user = await ctx.prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return {
      __typename: 'Error',
      message: 'Invalid user',
    };
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  return {
    __typename: 'UserWithToken',
    user,
    token,
  };
};

export const allUsers = async (_: undefined, __: {}, ctx: Context) => {
  const users = await ctx.prisma.user.findMany();
  return users;
};
