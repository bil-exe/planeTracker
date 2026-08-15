import { Controller, Get } from '@nestjs/common';
import { OpenSkyService, type Token } from './opensky.service';

@Controller('opensky')
export class OpenSkyController {
  constructor(private readonly validToken: OpenSkyService) {}
  @Get('token')
  NewToken(): Promise<string> {
    return this.validToken.getToken();
  }
}
// import { Controller, Get } from '@nestjs/common';
// // import { OpenSkyService } from './opensky.service';

// @Controller('opensky')
// export class OpenSkyController {
//   constructor(private readonly openSkyService: OpenSkyService) {}

//   @Get('token')
//   async getToken() {
//     return this.openSkyService.getToken();
//   }
// }
