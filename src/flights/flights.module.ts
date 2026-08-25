import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FlightServices } from './flights.service';
import { FlightsController } from './flights.controller';
import { OpenskyModule } from '../opensky/opensky.module';
import { OpenSkyService } from '../opensky/opensky.service';

@Module({
  imports: [HttpModule, OpenskyModule],
  controllers: [FlightsController],
  providers: [FlightServices, OpenSkyService],
})
export class FlightModule {}
