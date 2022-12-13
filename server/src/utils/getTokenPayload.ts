import jwt from 'jsonwebtoken';

function getTokenPayload(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export default getTokenPayload;
