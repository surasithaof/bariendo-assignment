import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpPort = process.env.HTTP_PORT || 3001;
  await app.listen(httpPort, () => {
    console.log(`Server is running on http://localhost:${httpPort}`);
  });
}
bootstrap();
