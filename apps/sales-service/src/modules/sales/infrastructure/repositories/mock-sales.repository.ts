import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CancelOrderRequestDto,
  CreateOrderRequestDto,
  MarkOrderPaidRequestDto,
  OrderResponseDto,
  OrderStatus
} from '@modix/pkgs/contracts';

@Injectable()
export class MockSalesRepository {
  private readonly orders: OrderResponseDto[] = [];

  getOrders(): OrderResponseDto[] {
    return this.orders;
  }

  getOrderById(orderId: string): OrderResponseDto {
    const order = this.orders.find((item) => item.id === orderId);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  createOrder(payload: CreateOrderRequestDto): OrderResponseDto {
    const subtotal = payload.items.reduce((acc, item) => acc + item.subtotal, 0);

    const order: OrderResponseDto = {
      id: `ord_${String(this.orders.length + 1).padStart(3, '0')}`,
      orderNumber: `MODIX-${String(this.orders.length + 1).padStart(6, '0')}`,
      businessId: payload.businessId,
      branchId: payload.branchId,
      cashRegisterId: payload.cashRegisterId,
      cashShiftId: payload.cashShiftId,
      createdByUserId: payload.createdByUserId,
      consumptionType: payload.consumptionType,
      source: payload.source,
      externalReference: payload.externalReference,
      status: OrderStatus.DRAFT,
      subtotal,
      total: subtotal,
      items: payload.items.map((item, index) => ({
        id: `item_${String(index + 1).padStart(3, '0')}`,
        productId: item.productId,
        productCodeSnapshot: item.productCodeSnapshot,
        productNameSnapshot: item.productNameSnapshot,
        unitPriceSnapshot: item.unitPriceSnapshot,
        quantity: item.quantity,
        subtotal: item.subtotal
      })),
      notes: payload.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.orders.push(order);

    return order;
  }

  updateOrderStatus(orderId: string, status: OrderStatus): OrderResponseDto {
    const order = this.getOrderById(orderId);

    order.status = status;
    order.updatedAt = new Date().toISOString();

    return order;
  }

  markOrderPaid(orderId: string, payload: MarkOrderPaidRequestDto): OrderResponseDto {
    const order = this.getOrderById(orderId);

    order.status = OrderStatus.PAID;
    order.lastPaymentId = payload.paymentId;
    order.lastPaymentMethod = payload.paymentMethod;
    order.lastPaymentReference = payload.paymentReference;
    order.updatedAt = new Date().toISOString();

    return order;
  }

  cancelOrder(orderId: string, payload: CancelOrderRequestDto): OrderResponseDto {
    const order = this.getOrderById(orderId);

    order.status = OrderStatus.CANCELLED;
    order.cancellationReason = payload.cancellationReason;
    order.cancellationNote = payload.cancellationNote;
    order.updatedAt = new Date().toISOString();

    return order;
  }
}