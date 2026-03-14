import {
  ConsumptionType,
  OrderResponseItemDto,
  OrderSource,
  OrderStatus,
  PaymentMethod
} from '@modix/pkgs/contracts';

export class OrderEntity {
  constructor(
    public readonly id: string,
    public readonly orderNumber: string,
    public readonly businessId: string,
    public readonly branchId: string,
    public readonly cashRegisterId: string,
    public readonly cashShiftId: string,
    public readonly createdByUserId: string,
    public readonly consumptionType: ConsumptionType,
    public readonly source: OrderSource,
    public readonly items: OrderResponseItemDto[],
    public status: OrderStatus,
    public readonly subtotal: number,
    public total: number,
    public readonly externalReference?: string,
    public readonly notes?: string,
    public cancellationReason?: string,
    public cancellationNote?: string,
    public lastPaymentId?: string,
    public lastPaymentMethod?: PaymentMethod,
    public lastPaymentReference?: string,
    public readonly createdAt: string = new Date().toISOString(),
    public updatedAt: string = new Date().toISOString()
  ) {}
}