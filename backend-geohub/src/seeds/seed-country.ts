import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PrismaService } from '../database/prisma.service';
import axios from 'axios';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const prisma = appContext.get(PrismaService);

  const { data: countriesData } = await axios.get(
    'https://restcountries.com/v3.1/all?fields=name,flags,region,languages,currencies,population,subregion'
  );

  for (const c of countriesData) {
    const continent = await prisma.continent.findFirst({
      where: { con_name: c.region },
    });

    if (!continent) {
      console.warn(`Continent not found for ${c.name.common}!`);
      continue;
    }


    await prisma.country.upsert({
      where: { cou_name: c.name.common }, 
      update: {},
      create: {
        cou_name: c.name.common,
        cou_population: c.population,
        cou_official_language: String(Object.values(c.languages || {})[0] || ''),
        cou_currency: Object.keys(c.currencies || {})[0] || '',
        con_id: continent.con_id,
      },
    });
  }

  console.log('Imported countries successfully!');
  await appContext.close();
}

bootstrap().catch(console.error);