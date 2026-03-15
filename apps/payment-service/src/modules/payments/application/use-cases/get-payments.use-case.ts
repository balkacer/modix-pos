import { Injectable } from '@nestjs/common';
import { PaymentResponseDto } from '@modix/pkgs/contracts';
import { MockPaymentsRepository } from '../../infrastructure/repositories/mock-payments.repository';

@Injectable()
export class GetPaymentsUseCase {
  constructor(private readonly mockPaymentsRepository: MockPaymentsRepository) {}

  execute(): PaymentResponseDto[] {
    return this.mockPaymentsRepository.getPayments();
  }
}
