import { Injectable } from '@nestjs/common';
import { PaymentResponseDto } from '@modix/pkgs/contracts';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { MockPaymentsRepository } from '../../infrastructure/repositories/mock-payments.repository';

@Injectable()
export class CreatePaymentUseCase {
  constructor(private readonly mockPaymentsRepository: MockPaymentsRepository) {}

  execute(payload: CreatePaymentDto): PaymentResponseDto {
    return this.mockPaymentsRepository.createPayment(payload);
  }
}