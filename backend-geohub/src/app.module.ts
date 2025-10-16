import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { ContinentModule } from './continent/continent.module';
import { CountryModule } from './country/country.module';
import { CityModule } from './city/city.module';

@Module({ imports: [PrismaModule, ContinentModule, CountryModule, CityModule] })
export class AppModule {}
