import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins and methods
  app.enableCors({
    origin: true,  
    methods: '*', 
    allowedHeaders: '*',  
    credentials: true,
  });

  // Increase the limit for request bodies to 50MB
  app.use(express.json({ limit: '50mb' }));

  await app.listen(3000);
}
bootstrap();
