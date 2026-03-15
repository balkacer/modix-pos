import { Injectable } from '@nestjs/common';
import { OrderResponseDto, OrderStatus } from '@modix/pkgs/contracts';
import { CancelOrderDto } from '../dto/cancel-order.dto';
import { OrderStatusTransitionService } from '../../domain/services/order-status-transition.service';
import { MockSalesRepository } from '../../infrastructure/repositories/mock-sales.repository';

@Injectable()
export class CancelOrderUseCase {
  constructor(
    private readonly mockSalesRepository: MockSalesRepository,
    private readonly orderStatusTransitionService: OrderStatusTransitionService
  ) {}

  execute(orderId: string, payload: CancelOrderDto): OrderResponseDto {
    const currentOrder = this.mockSalesRepository.getOrderById(orderId);

    this.orderStatusTransitionService.validateTransition(
      currentOrder.status,
      OrderStatus.CANCELLED
    );

    return this.mockSalesRepository.cancelOrder(orderId, payload);
  }
}
