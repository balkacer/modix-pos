import { Injectable } from '@nestjs/common';
import { OrderResponseDto, OrderStatus } from '@modix/pkgs/contracts';
import { OrderStatusTransitionService } from '../../domain/services/order-status-transition.service';
import { MockSalesRepository } from '../../infrastructure/repositories/mock-sales.repository';
import { MarkOrderPaidDto } from '../dto/mark-order-paid.dto';

@Injectable()
export class MarkOrderPaidUseCase {
  constructor(
    private readonly mockSalesRepository: MockSalesRepository,
    private readonly orderStatusTransitionService: OrderStatusTransitionService
  ) {}

  execute(orderId: string, payload: MarkOrderPaidDto): OrderResponseDto {
    const currentOrder = this.mockSalesRepository.getOrderById(orderId);

    this.orderStatusTransitionService.validateTransition(
      currentOrder.status,
      OrderStatus.PAID
    );

    return this.mockSalesRepository.markOrderPaid(orderId, payload);
  }
}