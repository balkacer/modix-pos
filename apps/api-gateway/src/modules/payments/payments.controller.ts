import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaymentResponseDto } from '@modix/pkgs/contracts';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsService } from './payments.service';
import { PermissionsGuard } from '../authz/guards/permissions.guard';
import { AuthGuard } from '../authz/guards/auth.guard';
import { RequirePermissions } from '../authz/decorators/require-permissions.decorator';

@ApiTags('Payments')
@UseGuards(AuthGuard, PermissionsGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @RequirePermissions('payments.create')
  @ApiOkResponse()
  async createPayment(@Body() payload: CreatePaymentDto): Promise<PaymentResponseDto> {
    return this.paymentsService.createPayment(payload);
  }
}
