import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaymentResponseDto } from '@modix/pkgs/contracts';
import { CreatePaymentDto } from '../../application/dto/create-payment.dto';
import { CreatePaymentUseCase } from '../../application/use-cases/create-payment.use-case';
import { GetPaymentByIdUseCase } from '../../application/use-cases/get-payment-by-id.use-case';
import { GetPaymentsByOrderIdUseCase } from '../../application/use-cases/get-payments-by-order-id.use-case';
import { GetPaymentsUseCase } from '../../application/use-cases/get-payments.use-case';

@ApiTags('Payments')
@Controller()
export class PaymentsController {
  constructor(
    private readonly getPaymentsUseCase: GetPaymentsUseCase,
    private readonly getPaymentByIdUseCase: GetPaymentByIdUseCase,
    private readonly getPaymentsByOrderIdUseCase: GetPaymentsByOrderIdUseCase,
    private readonly createPaymentUseCase: CreatePaymentUseCase
  ) {}

  @Get('payments')
  @ApiOkResponse()
  getPayments(): PaymentResponseDto[] {
    return this.getPaymentsUseCase.execute();
  }

  @Get('payments/:paymentId')
  @ApiOkResponse()
  getPaymentById(@Param('paymentId') paymentId: string): PaymentResponseDto {
    return this.getPaymentByIdUseCase.execute(paymentId);
  }

  @Get('orders/:orderId/payments')
  @ApiOkResponse()
  getPaymentsByOrderId(@Param('orderId') orderId: string): PaymentResponseDto[] {
    return this.getPaymentsByOrderIdUseCase.execute(orderId);
  }

  @Post('payments')
  @ApiOkResponse()
  createPayment(@Body() payload: CreatePaymentDto): PaymentResponseDto {
    return this.createPaymentUseCase.execute(payload);
  }
}
