import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { ExceptionInterceptor } from '@infrastructure/util/interceptors/exception.interceptor';
import { SERVER_PORT } from '@infrastructure/config/server.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('DDD Microservice Sample')
    .setDescription('The DDD microservice sample description')
    .setVersion('1.0')
    .addTag('DDD Microservice Sample')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalInterceptors(new ExceptionInterceptor());

  app.enableShutdownHooks();
  app.use(bodyParser.json({ limit: '500mb' }));
  app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

  await app.listen(SERVER_PORT);
}

bootstrap();
