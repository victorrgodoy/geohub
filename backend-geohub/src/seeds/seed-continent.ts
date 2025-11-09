import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PrismaService } from '../database/prisma.service';
import { continents } from './data/data-continent-manual';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const prisma = appContext.get(PrismaService);

  for (const continentData of continents) {
    await prisma.continent.upsert({
      where: { con_name: continentData.name },
      update: {},
      create: {
        con_name: continentData.name,
        con_description: continentData.description,
      },
    });
  }
  console.log(`\nSeed continent completed!`);
  await appContext.close();
}

bootstrap().catch(console.error);
