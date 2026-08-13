import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightModule } from './flights/flights.module';
import { OpenskyModule } from './opensky/opensky.module';
import { ConfigModule } from '@nestjs/config';
// isGlobal permet a configModule d'etre utilise dans tous les modules sans l'importer a chaque fois 
@Module({
  imports: [FlightModule, OpenskyModule,
    ConfigModule.forRoot({
    isGlobal:true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
