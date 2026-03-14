import { OrderStatus } from '../enums/order-status.enum';

export interface UpdateOrderStatusRequestDto {
  status: OrderStatus;
}