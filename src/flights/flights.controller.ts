import { Controller, Get, Injectable } from "@nestjs/common";
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

}