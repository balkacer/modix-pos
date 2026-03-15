import { Module } from '@nestjs/common';
import { CreatePaymentUseCase } from './application/use-cases/create-payment.use-case';
import { GetPaymentByIdUseCase } from './application/use-cases/get-payment-by-id.use-case';
import { GetPaymentsByOrderIdUseCase } from './application/use-cases/get-payments-by-order-id.use-case';
import { GetPaymentsUseCase } from './application/use-cases/get-payments.use-case';
import { PaymentsController } from './infrastructure/controllers/payments.controller';
import { MockPaymentsRepository } from './infrastructure/repositories/mock-payments.repository';

@Module({
  controllers: [PaymentsController],
  providers: [
    MockPaymentsRepository,
    GetPaymentsUseCase,
    GetPaymentByIdUseCase,
    GetPaymentsByOrderIdUseCase,
    CreatePaymentUseCase
  ]
})
export class PaymentsModule {}
