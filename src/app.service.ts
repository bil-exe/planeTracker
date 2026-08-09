import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // constructor(private readonly httpService: HttpService) {}
  // async findPlane(): Promise<Observable<AxiosResponse>>{
  //   const response:any = await firstValueFrom(
  //     this.httpService.get("https://opensky-network.org/api/states/all")
  //   )
  //   // console.log('findPlane :',response.data);
  //   return response.data;
  // }

}
