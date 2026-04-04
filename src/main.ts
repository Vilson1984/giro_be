import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos extras
      forbidNonWhitelisted: true, // bloqueia campos desconhecidos
    }),
  );
  // await app.listen(3000);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
