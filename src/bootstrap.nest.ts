import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { AppModule } from './app.module';
import type {
  CorsConfig,
  SwaggerConfig,
} from 'src/common/configs/config.interface';
import * as fs from 'fs';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestExpressApplication } from '@nestjs/platform-express';

export const bootstrap = async (): Promise<NestExpressApplication> => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const configService = app.get(ConfigService);
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  // console.log('swaggerConfig', swaggerConfig);
  // Swagger Api
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'VitaHealth API')
      .setDescription(swaggerConfig.description || 'mobile and admin api')
      .setVersion(swaggerConfig.version || '1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    console.log('env?', process.env.NODE_ENV);
    if (process.env.NODE_ENV !== 'production') {
      fs.writeFileSync(
        './swagger-spec.json',
        JSON.stringify(document, null, 2)
      );
    }

    SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
  }

  // Cors
  if (corsConfig.enabled) {
    app.enableCors();
  }

  return app;
};

export const bootstrapServerless = async () => {
  const app = await bootstrap();
  const globalPrefix = '.netlify/functions/main';
  app.setGlobalPrefix(globalPrefix);

  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
};
