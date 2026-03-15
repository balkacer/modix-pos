import { CashRegisterStatus } from '../enums/cash-register-status.enum';

export interface CashRegisterResponseDto {
  id: string;
  businessId: string;
  branchId: string;
  code: string;
  name: string;
  status: CashRegisterStatus;
}
