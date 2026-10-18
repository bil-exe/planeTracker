import { HttpService } from '@nestjs/axios';
import { OpenSkyService } from '../opensky/opensky.service';
export declare class FlightServices {
    private readonly httpService;
    private readonly openskyService;
    constructor(httpService: HttpService, openskyService: OpenSkyService);
    getStatus(): Promise<any>;
    getSeenFlights(): Promise<any>;
    getSeenFlightFromNow(hour: number): Promise<any>;
    getHistoricalFlights(): Promise<any>;
}
