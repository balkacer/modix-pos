import { CreateOrderRequestDto, OrderResponseDto } from '@modix/pkgs/contracts';
import { apiClient } from '../../../services/http/api-client';

export const createOrder = async (
  payload: CreateOrderRequestDto
): Promise<OrderResponseDto> => {
  const response = await apiClient.post<OrderResponseDto>('/sales/orders', payload);
  return response.data;
};
