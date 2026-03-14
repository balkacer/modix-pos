import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaymentResponseDto } from '@modix/pkgs/contracts';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsService } from './payments.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOkResponse()
  async createPayment(@Body() payload: CreatePaymentDto): Promise<PaymentResponseDto> {
    return this.paymentsService.createPayment(payload);
  }
}