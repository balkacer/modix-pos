import {
  OrderResponseDto,
  OrderStatus,
  UpdateOrderStatusRequestDto
} from '@modix/pkgs/contracts';
import { apiClient } from '../../../services/http/api-client';

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus
): Promise<OrderResponseDto> => {
  const payload: UpdateOrderStatusRequestDto = { status };

  const response = await apiClient.patch<OrderResponseDto>(
    `/sales/orders/${orderId}/status`,
    payload
  );

  return response.data;
};