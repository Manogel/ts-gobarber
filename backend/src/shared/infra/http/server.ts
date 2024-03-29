import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import cors from 'cors';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';
import rateLimiter from './middlewares/rateLimiter';
import '@shared/infra/typeorm';
import '@shared/container';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter)
app.use(routes);
app.use(errors());
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: err,
  });
});

app.listen(3333, () => {
  console.log('🚀Server running on port 3333');
});
