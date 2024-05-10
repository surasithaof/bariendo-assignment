import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httPrefix = process.env.HTTP_PREFIX;
  app.setGlobalPrefix(httPrefix);

  const config = new DocumentBuilder()
    .setTitle('Bariendo appointment API')
    .setDescription('The Bariendo appointment API description')
    .setVersion('1.0')
    .addTag('appointment')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(httPrefix + '/swagger', app, document);

  const httpPort = process.env.HTTP_PORT || 3001;
  await app.listen(httpPort, () => {
    console.log(`Server is running on http://localhost:${httpPort}`);
  });
}
bootstrap();
