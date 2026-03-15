import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderResponseDto, OrderStatus } from '@modix/pkgs/contracts';
import { MockSalesRepository } from '../../infrastructure/repositories/mock-sales.repository';
import { UpdateDraftOrderDto } from '../dto/update-draft-order.dto';

@Injectable()
export class UpdateDraftOrderUseCase {
  constructor(private readonly mockSalesRepository: MockSalesRepository) {}

  execute(orderId: string, payload: UpdateDraftOrderDto): OrderResponseDto {
    const currentOrder = this.mockSalesRepository.getOrderById(orderId);

    if (currentOrder.status !== OrderStatus.DRAFT) {
      throw new BadRequestException('Only draft orders can be edited');
    }

    return this.mockSalesRepository.updateDraftOrder(orderId, payload);
  }
}
