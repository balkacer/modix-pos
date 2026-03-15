import { CashShiftStatus } from '@modix/pkgs/contracts';

export class CashShiftEntity {
  constructor(
    public readonly id: string,
    public readonly businessId: string,
    public readonly branchId: string,
    public readonly cashRegisterId: string,
    public readonly openedByUserId: string,
    public closedByUserId: string | undefined,
    public readonly openingAmount: number,
    public closingAmount: number | undefined,
    public readonly openedAt: Date,
    public closedAt: Date | undefined,
    public status: CashShiftStatus
  ) {}
}
