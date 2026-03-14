import { OrderResponseDto } from '@modix/pkgs/contracts';
import { apiClient } from '../../../services/http/api-client';

export const getOrders = async (): Promise<OrderResponseDto[]> => {
  const response = await apiClient.get<OrderResponseDto[]>('/sales/orders');
  return response.data;
};