import { Injectable } from '@nestjs/common';
import { PaymentResponseDto } from '@modix/pkgs/contracts';
import { MockPaymentsRepository } from '../../infrastructure/repositories/mock-payments.repository';

@Injectable()
export class GetPaymentsByOrderIdUseCase {
  constructor(private readonly mockPaymentsRepository: MockPaymentsRepository) {}

  execute(orderId: string): PaymentResponseDto[] {
    return this.mockPaymentsRepository.getPaymentsByOrderId(orderId);
  }
}