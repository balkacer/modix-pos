import { CashRegisterStatus } from '@modix/pkgs/contracts';

export class CashRegisterEntity {
  constructor(
    public readonly id: string,
    public readonly businessId: string,
    public readonly branchId: string,
    public readonly code: string,
    public readonly name: string,
    public readonly status: CashRegisterStatus
  ) {}
}
