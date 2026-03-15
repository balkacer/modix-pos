import { BusinessResponseDto } from '@modix/pkgs/contracts';
import { apiClient } from '../../../services/http/api-client';

export const getBusinesses = async (): Promise<BusinessResponseDto[]> => {
  const response = await apiClient.get<BusinessResponseDto[]>('/business/businesses');
  return response.data;
};
