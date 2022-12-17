import { userData } from './queries';
import { UserUpdate, UserUpdateKeys } from './../../utils/types';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

import { Context } from '../../utils/types';
import authRequest from '../../utils/authRequest.js';
import {
  type UpdateUserInput,
  type UpdateMentorInput,
  type UpdatePartnerInput,
  type UpdateHackerInput,
  updateUserValidator,
} from '../../utils/validators.js';
type Role = 'hacker' | 'mentor' | 'partner';

const emailValidator = z.string().email();
const roleValidator = z.union([
  z.literal('hacker'),
  z.literal('mentor'),
  z.literal('partner'),
]);

export const updateUser = async (
  _: undefined,
  args: UpdateUserInput,
  ctx: Context
) => {
  console.log('before validation');
  console.log('parsed=', updateUserValidator.parse(args));
  if (!updateUserValidator.parse(args)) {
    // throw new Error('Invalid input');
    console.error('error, invalid');
  } else {
    console.log('valid input');
  }
  authRequest(ctx);
  const { userUpdate } = args;

  const user = await ctx.prisma.user.update({
    where: {
      id: ctx.auth?.userId,
    },
    data: userUpdate,
  });
  if (user.role === 'hacker' && 'hackerProfile' in args) {
    const { hackerProfile } = args;
    const { ethExp, ...rest } = hackerProfile;
    const _hackerProfile = await ctx.prisma.hackerProfile.update({
      where: {
        userId: ctx.auth?.userId,
      },
      data: hackerProfile as any,
    });
  } else if (user.role === 'partner' && 'partnerProfile' in args) {
    const { partnerProfile } = args;
    const _partnerProfile = await ctx.prisma.partnerProfile.update({
      where: {
        userId: ctx.auth?.userId,
      },
      data: partnerProfile,
    });
  } else if (user.role === 'mentor' && 'mentorProfile' in args) {
    const { mentorProfile } = args;
    const _mentorProfile = await ctx.prisma.mentorProfile.update({
      where: {
        userId: ctx.auth?.userId,
      },
      data: mentorProfile as any,
    });
  }
  return user;
};

export const signUpUser = async (
  _: undefined,
  { email, role }: { email: string; role: Role },
  ctx: Context
) => {
  if (!emailValidator.parse(email)) {
    throw new Error('Invalid email input');
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

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string
    );
    const resp = {
      __typename: 'UserWithToken',
      user,
      token,
    };
    return resp;
  }
};
