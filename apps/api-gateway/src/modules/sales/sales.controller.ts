import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrderResponseDto } from '@modix/pkgs/contracts';
import { CancelOrderDto } from './dto/cancel-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { MarkOrderPaidDto } from './dto/mark-order-paid.dto';
import { UpdateDraftOrderDto } from './dto/update-draft-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { SalesService } from './sales.service';
import { AuthGuard } from '../authz/guards/auth.guard';
import { PermissionsGuard } from '../authz/guards/permissions.guard';
import { RequirePermissions } from '../authz/decorators/require-permissions.decorator';

@ApiTags('Sales')
@UseGuards(AuthGuard, PermissionsGuard)
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get('orders')
  @RequirePermissions('sales.read')
  @ApiOkResponse()
  async getOrders(): Promise<OrderResponseDto[]> {
    return this.salesService.getOrders();
  }

  @Get('orders/:orderId')
  @RequirePermissions('sales.read')
  @ApiOkResponse()
  async getOrderById(@Param('orderId') orderId: string): Promise<OrderResponseDto> {
    return this.salesService.getOrderById(orderId);
  }

  @Post('orders')
  @RequirePermissions('sales.create')
  @ApiOkResponse()
  async createOrder(@Body() payload: CreateOrderDto): Promise<OrderResponseDto> {
    return this.salesService.createOrder(payload);
  }

  @Patch('orders/:orderId/draft')
  @RequirePermissions('sales.draft.update')
  @ApiOkResponse()
  async updateDraftOrder(
    @Param('orderId') orderId: string,
    @Body() payload: UpdateDraftOrderDto
  ): Promise<OrderResponseDto> {
    return this.salesService.updateDraftOrder(orderId, payload);
  }

  @Patch('orders/:orderId/status')
  @RequirePermissions('sales.status.update')
  @ApiOkResponse()
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body() payload: UpdateOrderStatusDto
  ): Promise<OrderResponseDto> {
    return this.salesService.updateOrderStatus(orderId, payload);
  }

  @Patch('orders/:orderId/mark-paid')
  @RequirePermissions('sales.status.update')
  @ApiOkResponse()
  async markOrderPaid(
    @Param('orderId') orderId: string,
    @Body() payload: MarkOrderPaidDto
  ): Promise<OrderResponseDto> {
    return this.salesService.markOrderPaid(orderId, payload);
  }

  @Patch('orders/:orderId/cancel')
  @RequirePermissions('sales.cancel')
  @ApiOkResponse()
  async cancelOrder(
    @Param('orderId') orderId: string,
    @Body() payload: CancelOrderDto
  ): Promise<OrderResponseDto> {
    return this.salesService.cancelOrder(orderId, payload);
  }

  @Delete('orders/:orderId/draft')
  @RequirePermissions('sales.draft.update')
  @ApiOkResponse()
  async deleteDraftOrder(@Param('orderId') orderId: string): Promise<OrderResponseDto> {
    return this.salesService.deleteDraftOrder(orderId);
  }
}
