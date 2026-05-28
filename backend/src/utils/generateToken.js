import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const generateToken = (userId) => {
  if (!env.jwtSecret) {
    throw new Error('JWT_SECRET is required');
  }

  return jwt.sign({ id: userId }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });
};
