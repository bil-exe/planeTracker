"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenSkyService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const url_1 = require("url");
const config_1 = require("@nestjs/config");
let OpenSkyService = class OpenSkyService {
    httpService;
    configService;
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
    }
    token = undefined;
    test = 29 * 1000;
    async getToken() {
        try {
            if (this.token && this.token.expiresAt - Date.now() > 30 * 1000) {
                console.log('Token encore valide');
                return this.token.access_token;
            }
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token', new url_1.URLSearchParams({
                grant_type: 'client_credentials',
                client_id: process.env.OPENSKY_CLIENT_ID,
                client_secret: process.env.OPENSKY_CLIENT_SECRET,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }));
            this.token = {
                access_token: response.data.access_token,
                refresh_expires_in: response.data.refresh_expires_in,
                expires_in: response.data.expires_in,
                token_type: response.data.token_type,
                scope: response.data.scope,
                expiresAt: Date.now() + response.data.expires_in * 1000
            };
            console.log('token : ', this.token);
            console.log('expire in : ', this.token.expires_in);
            console.log('expire At : ', new Date(this.token.expiresAt));
            console.log('un nouveau token à été créé');
            return this.token.access_token;
        }
        catch (err) {
            console.error('Problème Opensky service : ', err);
            throw new Error;
        }
    }
};
exports.OpenSkyService = OpenSkyService;
exports.OpenSkyService = OpenSkyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService, config_1.ConfigService])
], OpenSkyService);
//# sourceMappingURL=opensky.service.js.map