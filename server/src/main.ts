import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CrudConfigService } from '@nestjsx/crud';

CrudConfigService.load({
  auth: {
    property: 'USER_REQUEST_KEY',
  },
  routes: {
  },
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug']
  });

  app.setGlobalPrefix('/api');

  const options = new DocumentBuilder()
    .addBearerAuth({
      type: 'http',
      bearerFormat: 'JWT',
      scheme: 'bearer',
    }, 'jwt')
    .setTitle('Yaslit')
    .setDescription('Api yaslit')
    .setVersion('1.0')
    .addTag('yaslit', 'Toutes les données')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/doc', app, document);

  await app.listen(8081);
}
bootstrap();
