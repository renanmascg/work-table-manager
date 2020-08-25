import { NestFactory } from '@nestjs/core';
import cors from 'cors';
import AppModule from './app.module';
import handleError from '../middlewares/handleError';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());
  app.use(handleError);
  await app.listen(8080);
}
bootstrap();
