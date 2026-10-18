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
exports.FlightServices = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const axios_1 = require("@nestjs/axios");
const opensky_service_1 = require("../opensky/opensky.service");
let FlightServices = class FlightServices {
    httpService;
    openskyService;
    constructor(httpService, openskyService) {
        this.httpService = httpService;
        this.openskyService = openskyService;
    }
    async getStatus() {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://opensky-network.org/api/states/all'));
        return response.data;
    }
    async getSeenFlights() {
        const now = Math.floor(Date.now() / 1000);
        const end = now;
        const begin = end - 60 * 60;
        console.log('Date :', now);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://opensky-network.org/api/flights/all?begin=${begin}&end=${now}`));
        return response.data;
    }
    async getSeenFlightFromNow(hour) {
        const now = Math.floor(Date.now() / 1000);
        const begin = now - hour * 60 * 60;
        console.log('begin in unix and hour :', begin, hour);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://opensky-network.org/api/flights/all?begin=${begin}&end=${now}`));
        return response.data;
    }
    async getHistoricalFlights() {
        const begin = 1517227200;
        const end = 1517230800;
        const token = await this.openskyService.getToken();
        console.log('token in getHistoricalFlights:', token);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://opensky-network.org/api/flights/all?begin=${begin}&end=${end}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }));
        return response.data;
    }
};
exports.FlightServices = FlightServices;
exports.FlightServices = FlightServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService, opensky_service_1.OpenSkyService])
], FlightServices);
//# sourceMappingURL=flights.service.js.map