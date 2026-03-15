import { CashShiftResponseDto, OpenCashShiftRequestDto } from '@modix/pkgs/contracts';
import { apiClient } from '../../../services/http/api-client';

export const openCashShift = async (
  payload: OpenCashShiftRequestDto
): Promise<CashShiftResponseDto> => {
  const response = await apiClient.post<CashShiftResponseDto>(
    '/business/cash-shifts/open',
    payload
  );

  return response.data;
};
