import { AirportsService } from './airports.service';
import { AxiosResponse } from 'axios';
export declare class AiportsController {
    private readonly airportService;
    constructor(airportService: AirportsService);
    getArrivals(icao: string, begin: number, end: number): Promise<AxiosResponse>;
    getDepartures(icao: string, begin: number, end: number): Promise<AxiosResponse>;
}
