import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata"
import { initializeTransactionalContext, addTransactionalDataSource  } from 'typeorm-transactional';
import { AppDataSource } from './db/config/datasource.config';

async function bootstrap() {
   initializeTransactionalContext();

  await AppDataSource.initialize();
  addTransactionalDataSource(AppDataSource);

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

