import { ApiResponse } from '@modix/pkgs/contracts';
import { apiClient } from '../../../services/http/api-client';

interface HealthData {
  status: string;
  service: string;
}

export const getHealth = async (): Promise<ApiResponse<HealthData>> => {
  const response = await apiClient.get<ApiResponse<HealthData>>('/health');
  return response.data;
};