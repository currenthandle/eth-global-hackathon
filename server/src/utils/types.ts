import { JwtPayload } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

export interface Context {
  prisma: PrismaClient;
  userId: string | null;
  req: Request;
  res: Response;
}

export type TokenPayload = string | JwtPayload;
