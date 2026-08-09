import { Controller, Get, Param } from "@nestjs/common";
import { FlightServices } from "./flights.service";

@Controller()
export class FlightsController {
    constructor(private readonly flightServices: FlightServices) { };

    @Get('/planes')
    getPlaneStatus(): any{
        return this.flightServices.getStatus();
    }
    @Get('/planes/current')
    getCurrentFlights():any {
        return this.flightServices.getCurrentFlights();
    }

    @Get('planes/current/:hour')
    getCurrentFlightFromNow(@Param('hour') hour): any{
    console.log('parameter hour: ', hour);
    return this.flightServices.getCurrentFlightFromNow(hour);
  };
}