import type { JwtPayload } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

export type TokenPayload = { userId: string } & JwtPayload;
export interface Context {
  prisma: PrismaClient;
  auth: TokenPayload;
  req: Request;
  res: Response;
}

export interface UserUpdate {
  userUpdate: {
    // [key: string]: string | boolean | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    student?: boolean | undefined;
    school?: string | undefined;
    country?: string | undefined;
    company?: string | undefined;
    website?: string | undefined;
    github?: string | undefined;
    twitter?: string | undefined;
    telegram?: string | undefined;
    linkedin?: string | undefined;
  };
}

export type UserUpdateKeys = keyof UserUpdate['userUpdate'];
