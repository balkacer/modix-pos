import { CashRegisterResponseDto } from '@modix/pkgs/contracts';
import { apiClient } from '../../../services/http/api-client';

export const getCashRegistersByBranchId = async (
  branchId: string
): Promise<CashRegisterResponseDto[]> => {
  const response = await apiClient.get<CashRegisterResponseDto[]>(
    `/business/branches/${branchId}/cash-registers`
  );

  return response.data;
};