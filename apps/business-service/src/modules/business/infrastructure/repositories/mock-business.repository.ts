import {
  BranchResponseDto,
  BusinessResponseDto,
  CashRegisterResponseDto,
  CashRegisterStatus,
  CashShiftResponseDto,
  CashShiftStatus
} from '@modix/pkgs/contracts';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class MockBusinessRepository {
  private readonly businesses: BusinessResponseDto[] = [
    {
      id: 'biz_001',
      code: 'frekao',
      name: 'Frekao'
    }
  ];

  private readonly branches: BranchResponseDto[] = [
    {
      id: 'br_001',
      businessId: 'biz_001',
      code: 'santo-domingo-central',
      name: 'Frekao Santo Domingo Central'
    }
  ];

  private readonly cashRegisters: CashRegisterResponseDto[] = [
    {
      id: 'cr_001',
      businessId: 'biz_001',
      branchId: 'br_001',
      code: 'caja-1',
      name: 'Caja 1',
      status: CashRegisterStatus.ACTIVE
    }
  ];

  private readonly cashShifts: CashShiftResponseDto[] = [];

  getBusinesses(): BusinessResponseDto[] {
    return this.businesses;
  }

  getBranchesByBusinessId(businessId: string): BranchResponseDto[] {
    return this.branches.filter((branch) => branch.businessId === businessId);
  }

  getCashRegistersByBranchId(branchId: string): CashRegisterResponseDto[] {
    return this.cashRegisters.filter((cashRegister) => cashRegister.branchId === branchId);
  }

  getOpenCashShifts(): CashShiftResponseDto[] {
    return this.cashShifts.filter((cashShift) => cashShift.status === CashShiftStatus.OPEN);
  }

  openCashShift(payload: {
    businessId: string;
    branchId: string;
    cashRegisterId: string;
    openedByUserId: string;
    openingAmount: number;
  }): CashShiftResponseDto {
    const cashRegister = this.cashRegisters.find(
      (register) => register.id === payload.cashRegisterId
    );

    if (!cashRegister) {
      throw new NotFoundException('Cash register not found');
    }

    const openShift = this.cashShifts.find(
      (shift) =>
        shift.cashRegisterId === payload.cashRegisterId &&
        shift.status === CashShiftStatus.OPEN
    );

    if (openShift) {
      throw new ConflictException('There is already an open shift for this cash register');
    }

    const createdShift: CashShiftResponseDto = {
      id: `shift_${String(this.cashShifts.length + 1).padStart(3, '0')}`,
      businessId: payload.businessId,
      branchId: payload.branchId,
      cashRegisterId: payload.cashRegisterId,
      openedByUserId: payload.openedByUserId,
      openingAmount: payload.openingAmount,
      openedAt: new Date().toISOString(),
      status: CashShiftStatus.OPEN
    };

    this.cashShifts.push(createdShift);

    return createdShift;
  }

  closeCashShift(
    cashShiftId: string,
    payload: {
      closedByUserId: string;
      closingAmount: number;
    }
  ): CashShiftResponseDto {
    const shift = this.cashShifts.find((cashShift) => cashShift.id === cashShiftId);

    if (!shift) {
      throw new NotFoundException('Cash shift not found');
    }

    if (shift.status !== CashShiftStatus.OPEN) {
      throw new ConflictException('Cash shift is already closed');
    }

    shift.closedByUserId = payload.closedByUserId;
    shift.closingAmount = payload.closingAmount;
    shift.closedAt = new Date().toISOString();
    shift.status = CashShiftStatus.CLOSED;

    return shift;
  }
}