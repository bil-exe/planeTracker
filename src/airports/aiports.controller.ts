import { Controller, Get, Param, Query } from '@nestjs/common';
import { get } from 'axios';
import { AirportsService } from './airports.service';
import e from 'express';

@Controller('airports')
export class AiportsController {
    constructor(private readonly airportService: AirportsService) {};
    @Get('arrivals')
    // @Query pour les parametre de requete : après un ? 
    getArrivals(@Query('icao') icao:string, @Query('begin') begin:number, @Query('end') end:number){
        console.log('Query Parameter from get Arrival : ', icao,begin,end);
        return this.airportService.getArrivalsByAirport(icao,begin,end);
    }


}
