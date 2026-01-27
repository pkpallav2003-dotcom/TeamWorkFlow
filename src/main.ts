import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

      // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('TeamFlow API')
    .setDescription('Task + Approval Workflow Backend')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);



  console.log('MONGO_URI:', process.env.MONGO_URI);

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Connected to MongoDB at: ${process.env.MONGO_URI}`);

}
bootstrap();
