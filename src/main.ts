import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

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

  await app.listen(3000);
}
bootstrap();
