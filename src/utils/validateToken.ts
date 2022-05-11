import * as jwt from 'jsonwebtoken';

export function validateToken(jwtToken: string) {
  if (jwtToken) {
    const [, token] = jwtToken.split(' ');

    const payload = jwt.verify(token, process.env.SECRET);

    if (payload) {
      return payload;
    }
  }

  return false;
}
