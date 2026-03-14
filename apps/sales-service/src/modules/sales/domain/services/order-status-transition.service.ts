import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderStatus } from '@modix/pkgs/contracts';

@Injectable()
export class OrderStatusTransitionService {
  private readonly allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
    [OrderStatus.DRAFT]: [OrderStatus.PENDING_PAYMENT, OrderStatus.CANCELLED],
    [OrderStatus.PENDING_PAYMENT]: [
      OrderStatus.PAID,
      OrderStatus.REJECTED,
      OrderStatus.CANCELLED
    ],
    [OrderStatus.PAID]: [OrderStatus.PACKING, OrderStatus.CANCELLED],
    [OrderStatus.REJECTED]: [],
    [OrderStatus.PACKING]: [OrderStatus.READY, OrderStatus.CANCELLED],
    [OrderStatus.READY]: [OrderStatus.DELIVERED, OrderStatus.CANCELLED],
    [OrderStatus.DELIVERED]: [],
    [OrderStatus.CANCELLED]: []
  };

  validateTransition(currentStatus: OrderStatus, nextStatus: OrderStatus): void {
    const allowedNextStatuses = this.allowedTransitions[currentStatus];

    if (!allowedNextStatuses.includes(nextStatus)) {
      throw new BadRequestException(
        `Invalid order status transition from "${currentStatus}" to "${nextStatus}"`
      );
    }
  }
}