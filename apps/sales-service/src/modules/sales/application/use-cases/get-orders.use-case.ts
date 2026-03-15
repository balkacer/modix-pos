import { Injectable } from '@nestjs/common';
import { OrderResponseDto } from '@modix/pkgs/contracts';
import { MockSalesRepository } from '../../infrastructure/repositories/mock-sales.repository';

@Injectable()
export class GetOrdersUseCase {
  constructor(private readonly mockSalesRepository: MockSalesRepository) {}

  execute(): OrderResponseDto[] {
    return this.mockSalesRepository.getOrders();
  }
}
