import { CancelOrderRequestDto, OrderResponseDto } from '@modix/pkgs/contracts';
import { apiClient } from '../../../services/http/api-client';

export const cancelOrder = async (
  orderId: string,
  payload: CancelOrderRequestDto
): Promise<OrderResponseDto> => {
  const response = await apiClient.patch<OrderResponseDto>(
    `/sales/orders/${orderId}/cancel`,
    payload
  );

  return response.data;
};
