import { OrderResponseDto, UpdateDraftOrderRequestDto } from '@modix/pkgs/contracts';
import { apiClient } from '../../../services/http/api-client';

export const updateDraftOrder = async (
  orderId: string,
  payload: UpdateDraftOrderRequestDto
): Promise<OrderResponseDto> => {
  const response = await apiClient.patch<OrderResponseDto>(
    `/sales/orders/${orderId}/draft`,
    payload
  );

  return response.data;
};
