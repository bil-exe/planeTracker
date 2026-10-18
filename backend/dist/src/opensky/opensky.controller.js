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
exports.OpenSkyController = void 0;
const common_1 = require("@nestjs/common");
const opensky_service_1 = require("./opensky.service");
let OpenSkyController = class OpenSkyController {
    validToken;
    constructor(validToken) {
        this.validToken = validToken;
    }
    NewToken() {
        return this.validToken.getToken();
    }
};
exports.OpenSkyController = OpenSkyController;
__decorate([
    (0, common_1.Get)('token'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpenSkyController.prototype, "NewToken", null);
exports.OpenSkyController = OpenSkyController = __decorate([
    (0, common_1.Controller)('opensky'),
    __metadata("design:paramtypes", [opensky_service_1.OpenSkyService])
], OpenSkyController);
//# sourceMappingURL=opensky.controller.js.map