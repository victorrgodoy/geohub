import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PrismaService } from '../database/prisma.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const prisma = appContext.get(PrismaService);

  const continents = [
    {
      con_name: 'Africa',
      con_description:
        'Africa is the second largest continent, known for its diverse cultures and wildlife.',
    },
    {
      con_name: 'Americas',
      con_description:
        'The Americas include North, Central, and South America, with diverse geography and cultures.',
    },
    {
      con_name: 'Asia',
      con_description:
        'Asia is the largest continent, rich in history, technology, and cultural diversity.',
    },
    {
      con_name: 'Europe',
      con_description:
        'Europe is known for its historical landmarks, art, and cultural heritage.',
    },
    {
      con_name: 'Oceania',
      con_description:
        'Oceania comprises islands and countries like Australia, New Zealand, and the Pacific Islands.',
    },
    {
      con_name: 'Antarctic',
      con_description:
        'Antarctica is a frozen continent, largely uninhabited except for research stations.',
    },
  ];

  for (const { con_name, con_description } of continents) {
    await prisma.continent.upsert({
      where: { con_name },
      update: {},
      create: { con_name, con_description },
    });
  }

  await appContext.close();
}

bootstrap().catch(console.error);
