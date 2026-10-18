import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export interface Token {
    access_token: string;
    refresh_expires_in: number;
    expires_in: number;
    expiresAt: number;
    token_type: string;
    scope: string;
}
export declare class OpenSkyService {
    readonly httpService: HttpService;
    private readonly configService;
    constructor(httpService: HttpService, configService: ConfigService);
    private token;
    private test;
    getToken(): Promise<string>;
}
