import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { FlightServices } from "./flights.service";
import { FlightsController } from "./flights.controller";

@Module({
    imports: [HttpModule],
    controllers: [FlightsController],
    providers:[FlightServices]
})

export class FlightModule {};