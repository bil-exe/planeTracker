import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      // Example: If DTO has {email, name} but request has {email, name, hack}
      // → 'hack' is automatically removed

      forbidNonWhitelisted: true, // refuse la requete au lieu de simplement supprimer les données non voulues
      transform: true //  // Auto-transform payloads to DTO instances
      // Converts plain JavaScript objects to class instances
    })
  )

  // créé un préfixe pour toutes les routes 
  //mtn les routes sont '/api/v1/users' par exemple 
  app.setGlobalPrefix('api/v1');
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Serveur démarré : http://localhost:${port}/api/v1`)
  console.log(`Toutes les routes commencent par : /api/v1`);

}
bootstrap();
