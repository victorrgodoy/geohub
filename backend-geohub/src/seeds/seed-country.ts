import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PrismaService } from '../database/prisma.service';
import { fetchCountriesData } from './data/data-country-api';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const prisma = appContext.get(PrismaService);
  const countries = await fetchCountriesData();

  for (const countryData of countries) {
    const continent = await prisma.continent.findFirst({
      where: { con_name: countryData.region },
    });

    if (!continent) {
      console.warn(`Continent not found for ${countryData.name.common}!`);
      continue;
    }

    await prisma.country.upsert({
      where: { cou_name: countryData.name.common },
      update: {},
      create: {
        cou_name: countryData.name.common,
        cou_population: countryData.population,
        cou_official_language: String(
          Object.values(countryData.languages || {})[0] || '',
        ),
        cou_currency: Object.keys(countryData.currencies || {})[0] || '',
        con_id: continent.con_id,
      },
    });
  }
  console.log('Imported countries successfully!');
  await appContext.close();
}

bootstrap().catch(console.error);
