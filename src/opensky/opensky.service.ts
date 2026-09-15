import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { URLSearchParams } from 'url';
import { ConfigService } from '@nestjs/config';

export interface Token {
    access_token: string;
    refresh_expires_in: number;
    expires_in: number;
    expiresAt: number;
    token_type: string;
    scope: string;
}

@Injectable()
//Modification a faire le if n'as pas l'air de fonctionner 
export class OpenSkyService {
    constructor(readonly httpService: HttpService, private readonly configService: ConfigService) { }
    private token: Token | undefined = undefined;
    private test: any = 29 * 1000
    // private tokenExpires: number = 0;

    async getToken(): Promise<string> {
        // const client = this.configService.get('OPENSKY_CLIENT_ID')
        // const client_secret = this.configService.get('OPENSKY_CLIENT_SECRET')
        // console.log('client : ', client)
        // console.log('client secret : ', client_secret)
        try {

            // si token existe et valide + 30 sec 
            if (this.token && this.token.expiresAt - Date.now() > 30 * 1000) {
                console.log('Token encore valide');
                return this.token.access_token
            }


            // Sinon ça veut dire soit Token bientot expiré soit pas de token  donc on en créé un 
            const response: AxiosResponse = await firstValueFrom(
                this.httpService.post(
                    'https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token',
                    new URLSearchParams({
                        grant_type: 'client_credentials',
                        client_id: process.env.OPENSKY_CLIENT_ID!,
                        client_secret: process.env.OPENSKY_CLIENT_SECRET!,
                    }),
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    },
                ),
            );

            this.token = {
                access_token: response.data.access_token,
                refresh_expires_in: response.data.refresh_expires_in,
                expires_in: response.data.expires_in,
                token_type: response.data.token_type,
                scope: response.data.scope,
                // * 1000 pour transformer en millisecondes pour pouvoir comparer a Date.now
                expiresAt: Date.now() + response.data.expires_in * 1000
            }
            console.log('token : ', this.token);
            console.log('expire in : ', this.token.expires_in);
            console.log('expire At : ', new Date(this.token.expiresAt));
            console.log('un nouveau token à été créé')

            return this.token.access_token;

        } catch (err) {
            console.error('Problème Opensky service : ', err);
            throw new Error;
        }
    }

}
