import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  CreatePaymentRequestDto,
  PaymentResponseDto
} from '@modix/pkgs/contracts';
import { appConfig } from '../../config/app.config';
import { mapAxiosErrorToHttpException } from '../../shared/http/http-exception.mapper';
import { HttpService } from '../../shared/http/http.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>
  ) {}

  async createPayment(payload: CreatePaymentRequestDto): Promise<PaymentResponseDto> {
    try {
      const response = await this.httpService.post<
        PaymentResponseDto,
        CreatePaymentRequestDto
      >(`${this.config.services.paymentServiceBaseUrl}/payments`, payload);

      return response.data;
    } catch (error: unknown) {
      throw mapAxiosErrorToHttpException(error);
    }
  }
}