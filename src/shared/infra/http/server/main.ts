import { NestFactory } from '@nestjs/core';
import cors from 'cors';
import 'reflect-metadata';
import handleError from '../middlewares/handleError';
import AppModule from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());
  app.use(handleError);
  await app.listen(8080);
}
bootstrap();
