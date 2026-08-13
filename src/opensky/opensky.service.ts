import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { URLSearchParams } from 'url';
import { ConfigService } from '@nestjs/config';

export interface Token {
    accessToken: string;
    expiration: number;
    tokenType: string;
}
@Injectable()
export class OpenSkyService {
    constructor(readonly httpService: HttpService, private readonly configService: ConfigService) { }

    async getToken(): Promise<Token> {
        // const client = this.configService.get('OPENSKY_CLIENT_ID')
        // const client_secret = this.configService.get('OPENSKY_CLIENT_SECRET')
        // console.log('client : ', client)
        // console.log('client secret : ', client_secret)

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

        console.log('response from op service : ', response.data);
        const Token: Token = response.data;

        return Token;
    }
}
