import type { JwtPayload } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

export type TokenPayload = { userId: string } & JwtPayload;
export interface Context {
  prisma: PrismaClient;
  userId: TokenPayload;
  req: Request;
  res: Response;
}
