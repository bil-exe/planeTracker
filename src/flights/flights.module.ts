import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FlightServices } from './flights.service';
import { FlightsController } from './flights.controller';
import { OpenskyModule } from '../opensky/opensky.module';

@Module({
  imports: [HttpModule, OpenskyModule],
  controllers: [FlightsController],
  providers: [FlightServices],
})
export class FlightModule {}
