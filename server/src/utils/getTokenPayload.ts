import jwt from 'jsonwebtoken';
import { TokenPayload } from './types';

function getTokenPayload(token: string): TokenPayload {
  return jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
}

export default getTokenPayload;
