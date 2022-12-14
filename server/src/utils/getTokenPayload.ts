import jwt, { JwtPayload } from 'jsonwebtoken';

type TokenPayload = { userId: string } & JwtPayload;

function getTokenPayload(token: string): TokenPayload {
  return jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
}

export default getTokenPayload;
