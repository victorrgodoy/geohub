import { Module } from '@nestjs/common';
import { CityRepository } from './repositories/city-repository';
import { PrismaCityRepository } from './prisma/prisma-city-repository';
import { CityService } from './service/city.service';
import { CityController } from './controller/city.controller';

@Module({
  controllers: [CityController],
  providers: [
    CityService,
    { provide: CityRepository, useClass: PrismaCityRepository },
  ],
})
export class CityModule {}
