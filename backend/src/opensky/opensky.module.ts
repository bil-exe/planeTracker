import { Module } from '@nestjs/common';
import { OpenSkyService } from './opensky.service';
import { OpenSkyController } from './opensky.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [OpenSkyController],
  providers: [OpenSkyService],
})
export class OpenskyModule {}
