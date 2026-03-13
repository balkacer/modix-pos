import { BranchResponseDto } from '@modix/pkgs/contracts';
import { apiClient } from '../../../services/http/api-client';

export const getBranchesByBusinessId = async (
  businessId: string
): Promise<BranchResponseDto[]> => {
  const response = await apiClient.get<BranchResponseDto[]>(
    `/business/businesses/${businessId}/branches`
  );

  return response.data;
};