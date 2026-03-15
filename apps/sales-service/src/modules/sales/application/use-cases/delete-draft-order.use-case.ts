import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderResponseDto, OrderStatus } from '@modix/pkgs/contracts';
import { MockSalesRepository } from '../../infrastructure/repositories/mock-sales.repository';

@Injectable()
export class DeleteDraftOrderUseCase {
  constructor(private readonly mockSalesRepository: MockSalesRepository) {}

  execute(orderId: string): OrderResponseDto {
    const currentOrder = this.mockSalesRepository.getOrderById(orderId);

    if (currentOrder.status !== OrderStatus.DRAFT) {
      throw new BadRequestException('Only draft orders can be deleted');
    }

    return this.mockSalesRepository.deleteDraftOrder(orderId);
  }
}
