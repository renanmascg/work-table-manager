import { Request, Response, NextFunction } from 'express';
import AppError from '../error/appError';

export default function handleError(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  try {
    const status = err.status || 400;
    const message = err.message || 'Something went wrong';

    return res.status(status).send({ message });
  } catch (e) {
    return res.status(400).json({ message: 'Bad Request' });
  }
}
