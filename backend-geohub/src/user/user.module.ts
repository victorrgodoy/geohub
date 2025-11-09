import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserRepository } from './repositories/user-repository';
import { PrismaUserRepository } from './prisma/prisma-user-repository';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
