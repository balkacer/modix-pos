import { Injectable } from '@nestjs/common';
import { OrderResponseDto } from '@modix/pkgs/contracts';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import { OrderStatusTransitionService } from '../../domain/services/order-status-transition.service';
import { MockSalesRepository } from '../../infrastructure/repositories/mock-sales.repository';

@Injectable()
export class UpdateOrderStatusUseCase {
  constructor(
    private readonly mockSalesRepository: MockSalesRepository,
    private readonly orderStatusTransitionService: OrderStatusTransitionService
  ) {}

  execute(orderId: string, payload: UpdateOrderStatusDto): OrderResponseDto {
    const currentOrder = this.mockSalesRepository.getOrderById(orderId);

    this.orderStatusTransitionService.validateTransition(
      currentOrder.status,
      payload.status
    );

    return this.mockSalesRepository.updateOrderStatus(orderId, payload.status);
  }
}
