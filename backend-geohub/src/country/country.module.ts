import { Module } from '@nestjs/common';
import { CountryRepository } from './repositories/country-repository';
import { PrismaCountryRepository } from './prisma/prisma-country-repository';
import { CountryService } from './service/country.service';
import { CountryController } from './controller/country.controller';

@Module({
  controllers: [CountryController],
  providers: [
    CountryService,
    { provide: CountryRepository, useClass: PrismaCountryRepository },
  ],
})
export class CountryModule {}
