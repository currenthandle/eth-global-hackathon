import { IncomingMessage } from 'http';
import getTokenPayload from './getTokenPayload.js';

function getUserId(req: IncomingMessage) {
  const cookie = req.headers?.cookie;
  let serverAuthToken = null;
  if (cookie) {
    const cookies = cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const [key, value] = cookie.split('=');
      if (key === 'server-auth-token') {
        serverAuthToken = value;
        return getTokenPayload(serverAuthToken);
      }
    }
  }

  throw new Error('Not authenticated');
}

export default getUserId;
