import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class FlightServices {
    constructor(private readonly httpService: HttpService) {};

    //récupère les données de tous les appareils en actuellement en vol 
    async getStatus(): Promise<any> {
        const response: any = await firstValueFrom(

            this.httpService.get('https://opensky-network.org/api/states/all')
        )
        // console.log('status of planes: ', response);
        return response.data;
    }
    // recupère les données des appareils en vol sur une plage horaire d'une heure
    async getCurrentFlights(): Promise<any> {
        // now est divisé par 1000 pour transformer les millisecondes en secondes 
        const now: number = Math.floor(Date.now() / 1000);
        const end: number = now;
        //begin est égal à 1 heures de moins que now donc 3600 secondes / 60 minutes * 60 secondes
        //Pour plus tard si modifier l'heure de calcul il faut simplemnet rajouter les heures donc : 2 * 60 *60  / 2 heures * 60 minutes * 60 secondes

        const begin: number = end - (60 * 60)
        console.log('Date :', now);
        const response: any = await firstValueFrom(
            this.httpService.get(`https://opensky-network.org/api/flights/all?begin=${begin}&end=${now}`)
        )
        return response.data;
    }

    // selectionner les vols selon l'heure souhaité à partir de l'heure actuelle
    async getCurrentFlightFromNow(hour: number): Promise<any> {
        const now: number = Math.floor(Date.now() / 1000);
        //hour =. nbre heure dans le @Params et ensuite 60 * 60 pour transformer en secondes
        const begin: number = now - (hour * 60 * 60)
        console.log('begin in unix and hour :', begin, hour);
        const response: any = await firstValueFrom(
            this.httpService.get(`https://opensky-network.org/api/flights/all?begin=${begin}&end=${now}`)
        )
        return response.data;
    }
}
