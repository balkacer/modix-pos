import { MarkOrderPaidRequestDto, OrderResponseDto } from '@modix/pkgs/contracts';
import { apiClient } from '../../../services/http/api-client';

export const markOrderPaid = async (
  orderId: string,
  payload: MarkOrderPaidRequestDto
): Promise<OrderResponseDto> => {
  const response = await apiClient.patch<OrderResponseDto>(
    `/sales/orders/${orderId}/mark-paid`,
    payload
  );

  return response.data;
};