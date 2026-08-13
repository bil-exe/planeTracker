import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
