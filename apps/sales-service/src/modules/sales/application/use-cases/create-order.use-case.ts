import { Injectable } from '@nestjs/common';
import { OrderResponseDto } from '@modix/pkgs/contracts';
import { CreateOrderDto } from '../dto/create-order.dto';
import { MockSalesRepository } from '../../infrastructure/repositories/mock-sales.repository';

@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly mockSalesRepository: MockSalesRepository) {}

  execute(payload: CreateOrderDto): OrderResponseDto {
    return this.mockSalesRepository.createOrder(payload);
  }
}
