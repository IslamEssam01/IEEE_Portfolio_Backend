import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ResponseInterceptor } from './interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        exposeDefaultValues: true,
      },
    }),
  );
  app.use(cookieParser());
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3001',
      'http://localhost:5173',
      'http://localhost:5174',
    ],
    credentials: true,
  });

  // response interceptor
  app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector)));

  // for swagger
  const config = new DocumentBuilder()
    .setTitle('IEEE Backend API')
    .setDescription(
      'IEEE Documentation presented by backend team with lots of kisses for you 😘',
    )
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    });

  const swagger_server_url = process.env.BACKEND_URL;
  if (swagger_server_url) {
    config.addServer(swagger_server_url);
  }
  const config_document = config.build();

  const document = SwaggerModule.createDocument(app, config_document);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api-docs`);
}
bootstrap();
