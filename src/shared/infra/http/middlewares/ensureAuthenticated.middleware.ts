import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '../error/appError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Response | void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.secret);

    const { sub } = decoded as TokenPayload;

    request.user = { id: sub };

    return next();
  } catch (e) {
    return response.status(401).json({ error: 'Invalid JWT Tokent' });
  }
}
