import { CashShiftResponseDto } from '@modix/pkgs/contracts';
import { apiClient } from '../../../services/http/api-client';

export const getOpenCashShiftByCashRegisterId = async (
  cashRegisterId: string
): Promise<CashShiftResponseDto> => {
  const response = await apiClient.get<CashShiftResponseDto>(
    `/business/cash-shifts/open/by-cash-register/${cashRegisterId}`
  );

  return response.data;
};
