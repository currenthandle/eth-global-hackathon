import { userData } from './queries';
import { UserUpdate, UserUpdateKeys } from './../../utils/types';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

import { Context } from '../../utils/types';
import authRequest from '../../utils/authRequest.js';
type Role = 'hacker' | 'mentor' | 'partner';

const emailValidator = z.string().email();
const passwordValidator = z.string().min(2);
const roleValidator = z.union([
  z.literal('hacker'),
  z.literal('mentor'),
  z.literal('partner'),
]);

export const updateUser = async (_: undefined, args: any, ctx: Context) => {
  authRequest(ctx);
  const { userUpdate, hackerProfile, partnerProfile, mentorProfile } = args;
  console.log('args', args);
  console.log('here', userUpdate);

  const user = await ctx.prisma.user.update({
    where: {
      id: ctx.auth.userId,
      // email: "c@c/com"
    },
    data: userUpdate,
  });
  if (user.role === 'hacker') {
    console.log('hackerProfile', hackerProfile);
    if (hackerProfile.ethExp === '') {
      delete hackerProfile.ethExp;
    }
    const _hackerProfile = await ctx.prisma.hackerProfile.update({
      where: {
        userId: ctx.auth.userId,
      },
      data: hackerProfile,
    });
    console.log('_hackerProfile', _hackerProfile);
  } else if (user.role === 'partner') {
    console.log('partnerProfile', partnerProfile);
    console.log('before');
    const _partnerProfile = await ctx.prisma.partnerProfile.update({
      where: {
        userId: ctx.auth.userId,
      },
      data: partnerProfile,
    });
    console.log('after');
    console.log('_partnerProfile', _partnerProfile);
  } else if (user.role === 'mentor') {
    if (mentorProfile.ethExp === '') {
      delete mentorProfile.ethExp;
    }
    console.log('mentorProfile', mentorProfile);
    const _mentorProfile = await ctx.prisma.mentorProfile.update({
      where: {
        userId: ctx.auth.userId,
      },
      data: mentorProfile,
    });

    console.log('_mentorProfile', _mentorProfile);
  }
  // console.log('user', user);
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
    } else if (role === 'partner') {
      const partnerProfile = await ctx.prisma.partnerProfile.create({
        data: {
          userId: user.id,
        },
      });
    } else if (role === 'mentor') {
      const mentorProfile = await ctx.prisma.mentorProfile.create({
        data: {
          userId: user.id,
        },
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    const resp = {
      __typename: 'UserWithToken',
      user,
      token,
    };
    return resp;
  }
};
