export interface OpenCashShiftRequestDto {
  businessId: string;
  branchId: string;
  cashRegisterId: string;
  openedByUserId: string;
  openingAmount: number;
}
