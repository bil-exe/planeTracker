import { Controller, Get, Param, Query } from '@nestjs/common';
import { AirportsService } from './airports.service';
import { AxiosResponse } from 'axios';
import { error } from 'console';

@Controller('airports')
export class AiportsController {
    constructor(private readonly airportService: AirportsService) { };
    @Get('arrivals')
    // @Query pour les parametre de requete : après un ? et
    // exemple de parametre : icao = EDDF begin = 1517227200 end = 1517230800
    getArrivals(@Query('icao') icao: string, @Query('begin') begin: number, @Query('end') end: number): Promise<AxiosResponse> {
        console.log('Query Parameter from get Arrival : ', icao, begin, end);
        return this.airportService.getArrivalsByAirport(icao, begin, end);
    }

    @Get('departures')
    getDepartures(@Query('icao') icao: string, @Query('begin') begin: number, @Query('end') end: number): Promise<AxiosResponse> {
        try {

            console.log('Query parameter from get departure : ', icao, begin, end);
            return this.airportService.getDepartureByAirport(icao, begin, end);

        } catch (err: any) {

            throw new error('Problem in controller Get departures : ', err)
        }
    }
}
