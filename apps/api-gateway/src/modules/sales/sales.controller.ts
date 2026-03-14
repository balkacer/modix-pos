import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrderResponseDto } from '@modix/pkgs/contracts';
import { CancelOrderDto } from './dto/cancel-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { MarkOrderPaidDto } from './dto/mark-order-paid.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { SalesService } from './sales.service';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get('orders')
  @ApiOkResponse()
  async getOrders(): Promise<OrderResponseDto[]> {
    return this.salesService.getOrders();
  }

  @Get('orders/:orderId')
  @ApiOkResponse()
  async getOrderById(@Param('orderId') orderId: string): Promise<OrderResponseDto> {
    return this.salesService.getOrderById(orderId);
  }

  @Post('orders')
  @ApiOkResponse()
  async createOrder(@Body() payload: CreateOrderDto): Promise<OrderResponseDto> {
    return this.salesService.createOrder(payload);
  }

  @Patch('orders/:orderId/status')
  @ApiOkResponse()
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body() payload: UpdateOrderStatusDto
  ): Promise<OrderResponseDto> {
    return this.salesService.updateOrderStatus(orderId, payload);
  }

  @Patch('orders/:orderId/mark-paid')
  @ApiOkResponse()
  async markOrderPaid(
    @Param('orderId') orderId: string,
    @Body() payload: MarkOrderPaidDto
  ): Promise<OrderResponseDto> {
    return this.salesService.markOrderPaid(orderId, payload);
  }

  @Patch('orders/:orderId/cancel')
  @ApiOkResponse()
  async cancelOrder(
    @Param('orderId') orderId: string,
    @Body() payload: CancelOrderDto
  ): Promise<OrderResponseDto> {
    return this.salesService.cancelOrder(orderId, payload);
  }
}