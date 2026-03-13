import { CashShiftStatus } from '../enums/cash-shift-status.enum';

export interface CashShiftResponseDto {
  id: string;
  businessId: string;
  branchId: string;
  cashRegisterId: string;
  openedByUserId: string;
  closedByUserId?: string;
  openingAmount: number;
  closingAmount?: number;
  openedAt: string;
  closedAt?: string;
  status: CashShiftStatus;
}