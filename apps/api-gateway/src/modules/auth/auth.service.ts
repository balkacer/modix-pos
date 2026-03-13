import {
  Inject,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import axios from 'axios';
import { LoginRequestDto, LoginResponseDto } from '@modix/pkgs/contracts';
import { appConfig } from '../../config/app.config';
import { HttpService } from '../../shared/http/http.service';
import { mapAxiosErrorToHttpException } from '../../shared/http/http-exception.mapper';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>
  ) { }

  async login(payload: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      const response = await this.httpService.post<LoginResponseDto, LoginRequestDto>(
        `${this.config.services.authServiceBaseUrl}/auth/login`,
        payload
      );

      return response.data;
    } catch (error: unknown) {
      throw mapAxiosErrorToHttpException(error);
    }
  }
}