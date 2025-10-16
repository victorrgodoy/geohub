import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { ContinentRepository } from './continent/repositories/continent-repository';
import { PrismaContinentRepository } from './continent/prisma/prisma-continent-repository';
import { ContinentController } from './continent/controller/continent.controller';
import { ContinentService } from './continent/service/continent.service';

@Module({
  imports: [],
  controllers: [ContinentController],
  providers: [
    PrismaService,
    ContinentService,
    { provide: ContinentRepository, useClass: PrismaContinentRepository },
  ],
})
export class AppModule {}
