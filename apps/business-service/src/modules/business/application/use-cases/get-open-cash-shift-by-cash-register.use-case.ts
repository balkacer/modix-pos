import { Injectable, NotFoundException } from '@nestjs/common';
import { CashShiftResponseDto, CashShiftStatus } from '@modix/pkgs/contracts';
import { MockBusinessRepository } from '../../infrastructure/repositories/mock-business.repository';

@Injectable()
export class GetOpenCashShiftByCashRegisterUseCase {
  constructor(private readonly mockBusinessRepository: MockBusinessRepository) {}

  execute(cashRegisterId: string): CashShiftResponseDto {
    const openShift = this.mockBusinessRepository
      .getOpenCashShifts()
      .find(
        (cashShift) =>
          cashShift.cashRegisterId === cashRegisterId &&
          cashShift.status === CashShiftStatus.OPEN
      );

    if (!openShift) {
      throw new NotFoundException('Open cash shift not found for this cash register');
    }

    return openShift;
  }
}
