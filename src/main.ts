import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const num = config.get('server');

  const port = num.port;
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
