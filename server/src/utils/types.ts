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
    firstName?: string | undefined;
    lastName?: string | undefined;
    website?: string | undefined;
    github?: string | undefined;
    linkedin?: string | undefined;
  };
}

export type UserUpdateKeys = keyof UserUpdate['userUpdate'];
