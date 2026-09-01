import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { OpenSkyService } from '../opensky/opensky.service';
import { error } from 'console';

@Injectable()
export class AirportsService {
    constructor(private readonly httpService: HttpService, private readonly openSkyService: OpenSkyService) { };
    async getArrivalsByAirport(icao: string, begin: number, end: number): Promise<AxiosResponse> {
        try {
            const token: string = await this.openSkyService.getToken();
            const response: AxiosResponse = await firstValueFrom(
                this.httpService.get(`
                https://opensky-network.org/api/flights/arrival?airport=${icao}&begin=${begin}&end=${end}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }

                )
            )

            console.log('icao :', icao)
            console.log('begin :', begin)
            console.log('end :', end)
            // console.log('token in airport service ', token);
            return response.data;
        } catch (err: any) {
            throw new error('Error GetArrivalsByAirports : ', err);
        }

    }
    async getDepartureByAirport(icao: string, begin: number, end: number): Promise<AxiosResponse> {
        const token: string = await this.openSkyService.getToken();
        try {
            const response: AxiosResponse = await firstValueFrom(
                this.httpService.get(
                    `https://opensky-network.org/api/flights/departure?airport=${icao}&begin=${begin}&end=${end}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
            )
            console.log('Query Parameter : ', icao, begin, end);
            return response.data;

        } catch (err: any) {
            throw new error('Problem in getDepartureByAirport : ', err);
        }

    }
}
