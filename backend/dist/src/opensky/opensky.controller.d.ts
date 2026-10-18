import { OpenSkyService } from './opensky.service';
export declare class OpenSkyController {
    private readonly validToken;
    constructor(validToken: OpenSkyService);
    NewToken(): Promise<string>;
}
