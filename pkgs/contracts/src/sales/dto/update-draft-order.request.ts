import { ConsumptionType } from '../enums/consumption-type.enum';

export interface UpdateDraftOrderItemDto {
  productId: string;
  productCodeSnapshot: string;
  productNameSnapshot: string;
  unitPriceSnapshot: number;
  quantity: number;
  subtotal: number;
}

export interface UpdateDraftOrderRequestDto {
  consumptionType: ConsumptionType;
  notes?: string;
  items: UpdateDraftOrderItemDto[];
}
