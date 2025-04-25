import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { envConfig, Environment } from './infraestructure/config/main.config';
import { GlobalExceptionFilter } from './application/middlewares/global-exception-filter.middleware';

export async function initApplication(): Promise<[INestApplication, any]> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('RIMAC Challenge')
    .setDescription('Documentación de la API')
    .setVersion('1.0')
    .addServer(
      envConfig.NODE_ENV === Environment.local ? '' : `/${envConfig.NODE_ENV}`,
    )
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();

  return [app, expressApp];
}
