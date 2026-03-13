import { ConsumptionType } from '../enums/consumption-type.enum';
import { OrderSource } from '../enums/order-source.enum';

export interface CreateOrderRequestItemDto {
  productId: string;
  quantity: number;
}

export interface CreateOrderRequestDto {
  consumptionType: ConsumptionType;
  source: OrderSource;
  externalReference?: string;
  notes?: string;
  items: CreateOrderRequestItemDto[];
}