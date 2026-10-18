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
exports.FlightsController = void 0;
const common_1 = require("@nestjs/common");
const flights_service_1 = require("./flights.service");
let FlightsController = class FlightsController {
    flightServices;
    constructor(flightServices) {
        this.flightServices = flightServices;
    }
    getPlaneStatus() {
        return this.flightServices.getStatus();
    }
    getCurrentFlights() {
        return this.flightServices.getSeenFlights();
    }
    getCurrentFlightFromNow(hour) {
        console.log('parameter hour: ', hour);
        return this.flightServices.getSeenFlightFromNow(hour);
    }
    getBirthdayflights() {
        return this.flightServices.getHistoricalFlights();
    }
};
exports.FlightsController = FlightsController;
__decorate([
    (0, common_1.Get)('/planes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], FlightsController.prototype, "getPlaneStatus", null);
__decorate([
    (0, common_1.Get)('/planes/current'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], FlightsController.prototype, "getCurrentFlights", null);
__decorate([
    (0, common_1.Get)('planes/current/:hour'),
    __param(0, (0, common_1.Param)('hour')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FlightsController.prototype, "getCurrentFlightFromNow", null);
__decorate([
    (0, common_1.Get)('planes/testToken'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], FlightsController.prototype, "getBirthdayflights", null);
exports.FlightsController = FlightsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [flights_service_1.FlightServices])
], FlightsController);
//# sourceMappingURL=flights.controller.js.map