import { Module } from '@nestjs/common';
import { CancelOrderUseCase } from './application/use-cases/cancel-order.use-case';
import { CreateOrderUseCase } from './application/use-cases/create-order.use-case';
import { DeleteDraftOrderUseCase } from './application/use-cases/delete-draft-order.use-case';
import { GetOrderByIdUseCase } from './application/use-cases/get-order-by-id.use-case';
import { GetOrdersUseCase } from './application/use-cases/get-orders.use-case';
import { MarkOrderPaidUseCase } from './application/use-cases/mark-order-paid.use-case';
import { UpdateDraftOrderUseCase } from './application/use-cases/update-draft-order.use-case';
import { UpdateOrderStatusUseCase } from './application/use-cases/update-order-status.use-case';
import { OrderStatusTransitionService } from './domain/services/order-status-transition.service';
import { SalesController } from './infrastructure/controllers/sales.controller';
import { MockSalesRepository } from './infrastructure/repositories/mock-sales.repository';

@Module({
  controllers: [SalesController],
  providers: [
    MockSalesRepository,
    OrderStatusTransitionService,
    GetOrdersUseCase,
    GetOrderByIdUseCase,
    CreateOrderUseCase,
    UpdateDraftOrderUseCase,
    UpdateOrderStatusUseCase,
    MarkOrderPaidUseCase,
    CancelOrderUseCase,
    DeleteDraftOrderUseCase
  ]
})
export class SalesModule {}
