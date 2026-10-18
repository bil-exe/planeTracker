import { Module } from '@nestjs/common';
import { AirportsService } from './airports.service';
import { AiportsController } from './aiports.controller';
import { HttpModule } from '@nestjs/axios';
import { OpenskyModule } from '../opensky/opensky.module';
import { OpenSkyService } from '../opensky/opensky.service';

@Module({
  imports: [HttpModule],
  controllers: [AiportsController],
  // Tjr importer OpenskyService pour le token 
  providers: [AirportsService,OpenSkyService]
})
export class AirportsModule {}
