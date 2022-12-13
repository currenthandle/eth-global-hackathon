import jwt from 'jsonwebtoken';

function getTokenPayload(token: string) {
  const resp = jwt.verify(token, process.env.JWT_SECRET);
  console.log('resp', resp);
  return resp;
}

export default getTokenPayload;
