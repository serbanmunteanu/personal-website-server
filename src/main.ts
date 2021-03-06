import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const validationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
    stopAtFirstError: true,
  });

  app.useGlobalPipes(validationPipe);
  app.enableCors({
    origin: '*',
  });

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Marketing site - Serban Munteanu - REST COMPONENT')
    .setDescription('API Documentation Rest')
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/docs', app, swaggerDocument);
  await app.listen(5000);
}
bootstrap();
