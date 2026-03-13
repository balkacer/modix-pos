import { ConsumptionType } from '../enums/consumption-type.enum';
import { OrderSource } from '../enums/order-source.enum';
import { OrderStatus } from '../enums/order-status.enum';

export interface OrderResponseItemDto {
  id: string;
  productId: string;
  productCodeSnapshot: string;
  productNameSnapshot: string;
  unitPriceSnapshot: number;
  quantity: number;
  subtotal: number;
}

export interface OrderResponseDto {
  id: string;
  orderNumber: string;
  consumptionType: ConsumptionType;
  source: OrderSource;
  externalReference?: string;
  status: OrderStatus;
  subtotal: number;
  total: number;
  items: OrderResponseItemDto[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}