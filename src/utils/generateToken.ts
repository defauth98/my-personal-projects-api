import * as jwt from 'jsonwebtoken';

export function generateToken(id: number) {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: 86400,
  });
}
