import { FlightServices } from './flights.service';
export declare class FlightsController {
    private readonly flightServices;
    constructor(flightServices: FlightServices);
    getPlaneStatus(): any;
    getCurrentFlights(): any;
    getCurrentFlightFromNow(hour: any): Promise<number>;
    getBirthdayflights(): any;
}
