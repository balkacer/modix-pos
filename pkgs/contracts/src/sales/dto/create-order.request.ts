import { ConsumptionType } from '../enums/consumption-type.enum';
import { OrderSource } from '../enums/order-source.enum';

export interface CreateOrderRequestItemDto {
  productId: string;
  productCodeSnapshot: string;
  productNameSnapshot: string;
  unitPriceSnapshot: number;
  quantity: number;
  subtotal: number;
}

export interface CreateOrderRequestDto {
  businessId: string;
  branchId: string;
  cashRegisterId: string;
  cashShiftId: string;
  createdByUserId: string;
  consumptionType: ConsumptionType;
  source: OrderSource;
  externalReference?: string;
  notes?: string;
  items: CreateOrderRequestItemDto[];
}
