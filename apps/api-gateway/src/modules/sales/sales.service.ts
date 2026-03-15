import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  CancelOrderRequestDto,
  CreateOrderRequestDto,
  MarkOrderPaidRequestDto,
  OrderResponseDto,
  UpdateDraftOrderRequestDto,
  UpdateOrderStatusRequestDto
} from '@modix/pkgs/contracts';
import { appConfig } from '../../config/app.config';
import { mapAxiosErrorToHttpException } from '../../shared/http/http-exception.mapper';
import { HttpService } from '../../shared/http/http.service';

@Injectable()
export class SalesService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>
  ) {}

  async getOrders(): Promise<OrderResponseDto[]> {
    try {
      const response = await this.httpService.get<OrderResponseDto[]>(
        `${this.config.services.salesServiceBaseUrl}/orders`
      );

      return response.data;
    } catch (error: unknown) {
      throw mapAxiosErrorToHttpException(error);
    }
  }

  async getOrderById(orderId: string): Promise<OrderResponseDto> {
    try {
      const response = await this.httpService.get<OrderResponseDto>(
        `${this.config.services.salesServiceBaseUrl}/orders/${orderId}`
      );

      return response.data;
    } catch (error: unknown) {
      throw mapAxiosErrorToHttpException(error);
    }
  }

  async createOrder(payload: CreateOrderRequestDto): Promise<OrderResponseDto> {
    try {
      const response = await this.httpService.post<
        OrderResponseDto,
        CreateOrderRequestDto
      >(`${this.config.services.salesServiceBaseUrl}/orders`, payload);

      return response.data;
    } catch (error: unknown) {
      throw mapAxiosErrorToHttpException(error);
    }
  }

  async updateDraftOrder(
    orderId: string,
    payload: UpdateDraftOrderRequestDto
  ): Promise<OrderResponseDto> {
    try {
      const response = await this.httpService.patch<
        OrderResponseDto,
        UpdateDraftOrderRequestDto
      >(`${this.config.services.salesServiceBaseUrl}/orders/${orderId}/draft`, payload);

      return response.data;
    } catch (error: unknown) {
      throw mapAxiosErrorToHttpException(error);
    }
  }

  async updateOrderStatus(
    orderId: string,
    payload: UpdateOrderStatusRequestDto
  ): Promise<OrderResponseDto> {
    try {
      const response = await this.httpService.patch<
        OrderResponseDto,
        UpdateOrderStatusRequestDto
      >(`${this.config.services.salesServiceBaseUrl}/orders/${orderId}/status`, payload);

      return response.data;
    } catch (error: unknown) {
      throw mapAxiosErrorToHttpException(error);
    }
  }

  async markOrderPaid(
    orderId: string,
    payload: MarkOrderPaidRequestDto
  ): Promise<OrderResponseDto> {
    try {
      const response = await this.httpService.patch<
        OrderResponseDto,
        MarkOrderPaidRequestDto
      >(
        `${this.config.services.salesServiceBaseUrl}/orders/${orderId}/mark-paid`,
        payload
      );

      return response.data;
    } catch (error: unknown) {
      throw mapAxiosErrorToHttpException(error);
    }
  }

  async cancelOrder(
    orderId: string,
    payload: CancelOrderRequestDto
  ): Promise<OrderResponseDto> {
    try {
      const response = await this.httpService.patch<
        OrderResponseDto,
        CancelOrderRequestDto
      >(`${this.config.services.salesServiceBaseUrl}/orders/${orderId}/cancel`, payload);

      return response.data;
    } catch (error: unknown) {
      throw mapAxiosErrorToHttpException(error);
    }
  }

  async deleteDraftOrder(orderId: string): Promise<OrderResponseDto> {
    try {
      const response = await this.httpService.delete<OrderResponseDto>(
        `${this.config.services.salesServiceBaseUrl}/orders/${orderId}/draft`
      );

      return response.data;
    } catch (error: unknown) {
      throw mapAxiosErrorToHttpException(error);
    }
  }
}
