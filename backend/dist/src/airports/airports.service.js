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
exports.AirportsService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const opensky_service_1 = require("../opensky/opensky.service");
const console_1 = require("console");
let AirportsService = class AirportsService {
    httpService;
    openSkyService;
    constructor(httpService, openSkyService) {
        this.httpService = httpService;
        this.openSkyService = openSkyService;
    }
    ;
    async getArrivalsByAirport(icao, begin, end) {
        try {
            const token = await this.openSkyService.getToken();
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`
                https://opensky-network.org/api/flights/arrival?airport=${icao}&begin=${begin}&end=${end}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }));
            console.log('icao :', icao);
            console.log('begin :', begin);
            console.log('end :', end);
            return response.data;
        }
        catch (err) {
            throw new console_1.error('Error GetArrivalsByAirports : ', err);
        }
    }
    async getDepartureByAirport(icao, begin, end) {
        const token = await this.openSkyService.getToken();
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://opensky-network.org/api/flights/departure?airport=${icao}&begin=${begin}&end=${end}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }));
            console.log('Query Parameter : ', icao, begin, end);
            return response.data;
        }
        catch (err) {
            throw new console_1.error('Problem in getDepartureByAirport : ', err);
        }
    }
};
exports.AirportsService = AirportsService;
exports.AirportsService = AirportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService, opensky_service_1.OpenSkyService])
], AirportsService);
//# sourceMappingURL=airports.service.js.map