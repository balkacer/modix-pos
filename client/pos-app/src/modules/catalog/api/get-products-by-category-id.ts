import { ProductResponseDto } from '@modix/pkgs/contracts';
import { apiClient } from '../../../services/http/api-client';

export const getProductsByCategoryId = async (
  categoryId: string
): Promise<ProductResponseDto[]> => {
  const response = await apiClient.get<ProductResponseDto[]>(
    `/catalog/categories/${categoryId}/products`
  );

  return response.data;
};