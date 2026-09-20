import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightModule } from './flights/flights.module';
import { OpenskyModule } from './opensky/opensky.module';
import { ConfigModule } from '@nestjs/config';
import { AirportsModule } from './airports/airports.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
// isGlobal permet a configModule d'etre utilise dans tous les modules sans l'importer a chaque fois 
@Module({
  imports: [FlightModule, OpenskyModule,AirportsModule,PrismaModule,
    ConfigModule.forRoot({
    isGlobal:true,
  }),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
