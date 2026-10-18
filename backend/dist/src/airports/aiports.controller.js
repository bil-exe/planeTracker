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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiportsController = void 0;
const common_1 = require("@nestjs/common");
const airports_service_1 = require("./airports.service");
const console_1 = require("console");
let AiportsController = class AiportsController {
    airportService;
    constructor(airportService) {
        this.airportService = airportService;
    }
    ;
    getArrivals(icao, begin, end) {
        console.log('Query Parameter from get Arrival : ', icao, begin, end);
        return this.airportService.getArrivalsByAirport(icao, begin, end);
    }
    getDepartures(icao, begin, end) {
        try {
            console.log('Query parameter from get departure : ', icao, begin, end);
            return this.airportService.getDepartureByAirport(icao, begin, end);
        }
        catch (err) {
            throw new console_1.error('Problem in controller Get departures : ', err);
        }
    }
};
exports.AiportsController = AiportsController;
__decorate([
    (0, common_1.Get)('arrivals'),
    __param(0, (0, common_1.Query)('icao')),
    __param(1, (0, common_1.Query)('begin')),
    __param(2, (0, common_1.Query)('end')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], AiportsController.prototype, "getArrivals", null);
__decorate([
    (0, common_1.Get)('departures'),
    __param(0, (0, common_1.Query)('icao')),
    __param(1, (0, common_1.Query)('begin')),
    __param(2, (0, common_1.Query)('end')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], AiportsController.prototype, "getDepartures", null);
exports.AiportsController = AiportsController = __decorate([
    (0, common_1.Controller)('airports'),
    __metadata("design:paramtypes", [airports_service_1.AirportsService])
], AiportsController);
//# sourceMappingURL=aiports.controller.js.map