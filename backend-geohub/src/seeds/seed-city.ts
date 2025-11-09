import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PrismaService } from '../database/prisma.service';
import { cities } from './data/data-city-manual';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const prisma = appContext.get(PrismaService);

  console.log(`Starting to import ${cities.length} cities...\n`);

  for (const cityData of cities) {
    try {
      const country = await prisma.country.findFirst({
        where: { cou_name: cityData.countryName },
      });

      if (!country) {
        console.warn(
          `Country "${cityData.countryName}" not found for ${cityData.name}`,
        );
      }

      const cityName = `${cityData.name}, ${cityData.countryName}`;

      await prisma.city.upsert({
        where: { cit_name: cityName },
        update: {},
        create: {
          cit_name: cityName,
          cit_population: cityData.population,
          cit_latitude: cityData.latitude,
          cit_longitude: cityData.longitude,
          cou_id: country!.cou_id,
        },
      });
    } catch {
      console.error(` Error importing ${cityData.name}:`);
    }
  }

  console.log(`\nSeed city completed!`);
  await appContext.close();
}

bootstrap().catch(console.error);
