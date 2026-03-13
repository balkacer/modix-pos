import { ProductResponseDto } from '@modix/pkgs/contracts';
import { apiClient } from '../../../services/http/api-client';

export const getProducts = async (activeOnly = true): Promise<ProductResponseDto[]> => {
  const response = await apiClient.get<ProductResponseDto[]>('/catalog/products', {
    params: {
      activeOnly: activeOnly ? 'true' : undefined
    }
  });

  return response.data;
};