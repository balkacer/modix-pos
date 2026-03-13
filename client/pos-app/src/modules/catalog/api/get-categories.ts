import { CategoryResponseDto } from '@modix/pkgs/contracts';
import { apiClient } from '../../../services/http/api-client';

export const getCategories = async (): Promise<CategoryResponseDto[]> => {
  const response = await apiClient.get<CategoryResponseDto[]>('/catalog/categories');
  return response.data;
};