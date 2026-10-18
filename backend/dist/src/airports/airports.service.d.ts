import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { OpenSkyService } from '../opensky/opensky.service';
export declare class AirportsService {
    private readonly httpService;
    private readonly openSkyService;
    constructor(httpService: HttpService, openSkyService: OpenSkyService);
    getArrivalsByAirport(icao: string, begin: number, end: number): Promise<AxiosResponse>;
    getDepartureByAirport(icao: string, begin: number, end: number): Promise<AxiosResponse>;
}
