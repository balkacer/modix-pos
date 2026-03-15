import { OrderResponseDto } from '@modix/pkgs/contracts';
import { apiClient } from '../../../services/http/api-client';

export const deleteDraftOrder = async (orderId: string): Promise<OrderResponseDto> => {
  const response = await apiClient.delete<OrderResponseDto>(
    `/sales/orders/${orderId}/draft`
  );
  return response.data;
};
