import { NestFactory } from '@nestjs/core';
import { AccountsModule } from './accounts.module';
import * as dotenv from 'dotenv';


dotenv.config(); // Load environment variables


async function bootstrap() {

  const app = await NestFactory.create(AccountsModule);
  app.enableCors(); // to fix browser cors issues
  const port = process.env.AUTH_PORT || 3000; 

  await app.listen(port);

}
bootstrap();
