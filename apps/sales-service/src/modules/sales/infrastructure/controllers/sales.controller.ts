import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrderResponseDto } from '@modix/pkgs/contracts';
import { CancelOrderDto } from '../../application/dto/cancel-order.dto';
import { CreateOrderDto } from '../../application/dto/create-order.dto';
import { MarkOrderPaidDto } from '../../application/dto/mark-order-paid.dto';
import { UpdateOrderStatusDto } from '../../application/dto/update-order-status.dto';
import { CancelOrderUseCase } from '../../application/use-cases/cancel-order.use-case';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';
import { GetOrderByIdUseCase } from '../../application/use-cases/get-order-by-id.use-case';
import { GetOrdersUseCase } from '../../application/use-cases/get-orders.use-case';
import { MarkOrderPaidUseCase } from '../../application/use-cases/mark-order-paid.use-case';
import { UpdateOrderStatusUseCase } from '../../application/use-cases/update-order-status.use-case';

@ApiTags('Sales')
@Controller()
export class SalesController {
  constructor(
    private readonly getOrdersUseCase: GetOrdersUseCase,
    private readonly getOrderByIdUseCase: GetOrderByIdUseCase,
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly updateOrderStatusUseCase: UpdateOrderStatusUseCase,
    private readonly markOrderPaidUseCase: MarkOrderPaidUseCase,
    private readonly cancelOrderUseCase: CancelOrderUseCase
  ) {}

  @Get('orders')
  @ApiOkResponse()
  getOrders(): OrderResponseDto[] {
    return this.getOrdersUseCase.execute();
  }

  @Get('orders/:orderId')
  @ApiOkResponse()
  getOrderById(@Param('orderId') orderId: string): OrderResponseDto {
    return this.getOrderByIdUseCase.execute(orderId);
  }

  @Post('orders')
  @ApiOkResponse()
  createOrder(@Body() payload: CreateOrderDto): OrderResponseDto {
    return this.createOrderUseCase.execute(payload);
  }

  @Patch('orders/:orderId/status')
  @ApiOkResponse()
  updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body() payload: UpdateOrderStatusDto
  ): OrderResponseDto {
    return this.updateOrderStatusUseCase.execute(orderId, payload);
  }

  @Patch('orders/:orderId/mark-paid')
  @ApiOkResponse()
  markOrderPaid(
    @Param('orderId') orderId: string,
    @Body() payload: MarkOrderPaidDto
  ): OrderResponseDto {
    return this.markOrderPaidUseCase.execute(orderId, payload);
  }

  @Patch('orders/:orderId/cancel')
  @ApiOkResponse()
  cancelOrder(
    @Param('orderId') orderId: string,
    @Body() payload: CancelOrderDto
  ): OrderResponseDto {
    return this.cancelOrderUseCase.execute(orderId, payload);
  }
}