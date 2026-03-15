import { Injectable } from '@nestjs/common';
import { OrderResponseDto } from '@modix/pkgs/contracts';
import { MockSalesRepository } from '../../infrastructure/repositories/mock-sales.repository';

@Injectable()
export class GetOrderByIdUseCase {
  constructor(private readonly mockSalesRepository: MockSalesRepository) {}

  execute(orderId: string): OrderResponseDto {
    return this.mockSalesRepository.getOrderById(orderId);
  }
}
