import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { OpenSkyService } from '../opensky/opensky.service';

@Injectable()
export class AirportsService {
    constructor(private readonly httpService: HttpService, private readonly openSkyService: OpenSkyService) { };
    async getArrivalsByAirport(icao: string, begin: number, end: number): Promise<any> {
        try {
            const token: string =  await this.openSkyService.getToken();
            const response = await firstValueFrom(
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
            console.log('token in airport service ', token);
            return response.data;
        } catch (err: any) {
            console.error('Error GetArrivalsByAirports : ', err);
        }

    }
}
