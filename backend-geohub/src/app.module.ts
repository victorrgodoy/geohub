import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { ContinentModule } from './continent/continent.module';
import { CountryModule } from './country/country.module';
import { CityModule } from './city/city.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ContinentModule,
    CountryModule,
    CityModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
