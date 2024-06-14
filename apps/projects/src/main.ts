import { NestFactory } from '@nestjs/core';
import { ProjectsModule } from './projects.module';
import * as dotenv from 'dotenv';


dotenv.config(); // Load environment variables

async function bootstrap() {
  const app = await NestFactory.create(ProjectsModule);
  app.enableCors(); // to fix cors issue
  const port = process.env.PROJECTS_PORT || 3000; 
  await app.listen(port);
}
bootstrap();
