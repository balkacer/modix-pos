import { CreatePaymentRequestDto, PaymentResponseDto } from '@modix/pkgs/contracts';
import { apiClient } from '../../../services/http/api-client';

export const createPayment = async (
  payload: CreatePaymentRequestDto
): Promise<PaymentResponseDto> => {
  const response = await apiClient.post<PaymentResponseDto>('/payments', payload);
  return response.data;
};
