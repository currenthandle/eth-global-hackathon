import { userData } from './queries';
import { UserUpdate, UserUpdateKeys } from './../../utils/types';
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

export const updateUser = async (_: undefined, args: any, ctx: Context) => {
  authRequest(ctx);
  // console.log('args', args);
  const { userUpdate, hackerProfile } = args;
  // type ReduceInput = typeof userUpdate.userUpdate;
  console.log('here', userUpdate);
  const updates = Object.entries(userUpdate).reduce<{
    [key: string]: string;
  }>((acc, [key, value]: [UserUpdateKeys, string]) => {
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});
  // console.log('here!', ctx);
  const user = await ctx.prisma.user.update({
    where: {
      id: ctx.auth.userId,
      // email: "c@c/com"
    },
    data: updates,
  });
  const hackerUpdate = Object.entries(hackerProfile).reduce<{
    [key: string]: string;
  }>((acc, [key, value]: [any, string]) => {
    if (value || value === 0) {
      acc[key] = value;
    }
    return acc;
  }, {});

  console.log('hackerProfile', hackerProfile);
  const _hackerProfile = await ctx.prisma.hackerProfile.update({
    where: {
      userId: ctx.auth.userId,
    },
    // data: {
    //   github: hackerProfile.github,
    //   linkedin: hackerProfile.linkedin,
    //   website: hackerProfile.website,
    // },
    data: hackerUpdate,
  });
  // console.log('user', user);
  console.log('_hackerProfile', _hackerProfile);
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

    if (role === 'hacker') {
      const hackerProfile = await ctx.prisma.hackerProfile.create({
        data: {
          userId: user.id,
        },
      });
    }
    // else if (role === 'mentor') {
    //   const mentorProfile = await ctx.prisma.mentorProfile.create({
    //     data: {
    //       userId: user.id,
    //     },
    //   });
    // } else if (role === 'sponsor') {
    //   const sponsorProfile = await ctx.prisma.sponsorProfile.create({
    //     data: {
    //       userId: user.id,
    //     },
    //   });
    // }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    const resp = {
      __typename: 'UserWithToken',
      user,
      token,
    };
    return resp;
  }
};
