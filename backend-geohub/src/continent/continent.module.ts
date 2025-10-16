import { Module } from '@nestjs/common';
import { ContinentRepository } from './repositories/continent-repository';
import { PrismaContinentRepository } from './prisma/prisma-continent-repository';
import { ContinentService } from './service/continent.service';
import { ContinentController } from './controller/continent.controller';

@Module({
  controllers: [ContinentController],
  providers: [
    ContinentService,
    { provide: ContinentRepository, useClass: PrismaContinentRepository },
  ],
})
export class ContinentModule {}
