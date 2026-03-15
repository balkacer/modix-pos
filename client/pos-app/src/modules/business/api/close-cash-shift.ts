import { CashShiftResponseDto, CloseCashShiftRequestDto } from '@modix/pkgs/contracts';
import { apiClient } from '../../../services/http/api-client';

export const closeCashShift = async (
  cashShiftId: string,
  payload: CloseCashShiftRequestDto
): Promise<CashShiftResponseDto> => {
  const response = await apiClient.patch<CashShiftResponseDto>(
    `/business/cash-shifts/${cashShiftId}/close`,
    payload
  );

  return response.data;
};
