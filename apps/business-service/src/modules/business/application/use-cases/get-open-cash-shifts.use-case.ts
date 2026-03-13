import { CashShiftResponseDto } from '@modix/pkgs/contracts';
import { Injectable } from '@nestjs/common';
import { MockBusinessRepository } from '../../infrastructure/repositories/mock-business.repository';

@Injectable()
export class GetOpenCashShiftsUseCase {
  constructor(private readonly mockBusinessRepository: MockBusinessRepository) {}

  execute(): CashShiftResponseDto[] {
    return this.mockBusinessRepository.getOpenCashShifts();
  }
}