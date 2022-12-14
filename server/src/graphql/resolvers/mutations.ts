import { UserUpdate } from './../../utils/types';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

import { Context } from '../../utils/types';
import authRequest from '../../utils/authRequest.js';
type Role = 'hacker' | 'mentor' | 'sponsor';

const emailValidator = z.string().email();
const passwordValidator = z.string().min(2);
const roleValidator = z.union([
  z.literal('hacker'),
  z.literal('mentor'),
  z.literal('sponsor'),
]);

export const updateUser = async (
  _: undefined,
  userUpdate: UserUpdate,
  ctx: Context
) => {
  authRequest(ctx);
  console.log('userUpdate', userUpdate);
  const user = await ctx.prisma.user.update({
    where: {
      id: ctx.auth.userId,
      // email: "c@c/com"
    },
    data: userUpdate.userUpdate,
  });
  return user;
};

export const signUpUser = async (
  _: undefined,
  { email, password, role }: { email: string; password: string; role: Role },
  ctx: Context
) => {
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
  const user = await ctx.prisma.user.findUnique({
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
    const user = await ctx.prisma.user.create({
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
    return resp;
  }
};
