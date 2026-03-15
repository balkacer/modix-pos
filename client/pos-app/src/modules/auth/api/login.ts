import { LoginRequestDto, LoginResponseDto } from '@modix/pkgs/contracts';
import { apiClient } from '../../../services/http/api-client';

export const login = async (payload: LoginRequestDto): Promise<LoginResponseDto> => {
  const response = await apiClient.post<LoginResponseDto>('/auth/login', payload);
  return response.data;
};
