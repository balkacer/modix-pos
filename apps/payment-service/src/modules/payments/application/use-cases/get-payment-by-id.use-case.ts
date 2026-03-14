import { Injectable } from '@nestjs/common';
import { PaymentResponseDto } from '@modix/pkgs/contracts';
import { MockPaymentsRepository } from '../../infrastructure/repositories/mock-payments.repository';

@Injectable()
export class GetPaymentByIdUseCase {
  constructor(private readonly mockPaymentsRepository: MockPaymentsRepository) {}

  execute(paymentId: string): PaymentResponseDto {
    return this.mockPaymentsRepository.getPaymentById(paymentId);
  }
}