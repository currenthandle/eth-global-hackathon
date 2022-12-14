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
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    student?: boolean;
    school?: string;
    country?: string;
    company?: string;
    website?: string;
    github?: string;
    twitter?: string;
    telegram?: string;
    linkedin?: string;
  };
}
