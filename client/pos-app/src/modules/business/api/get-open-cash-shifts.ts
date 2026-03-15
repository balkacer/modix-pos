import { CashShiftResponseDto } from '@modix/pkgs/contracts';
import { apiClient } from '../../../services/http/api-client';

export const getOpenCashShifts = async (): Promise<CashShiftResponseDto[]> => {
  const response = await apiClient.get<CashShiftResponseDto[]>(
    '/business/cash-shifts/open'
  );
  return response.data;
};
