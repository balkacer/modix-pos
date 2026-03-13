import { CashShiftResponseDto } from '@modix/pkgs/contracts';
import { Injectable } from '@nestjs/common';
import { CloseCashShiftDto } from '../dto/close-cash-shift.dto';
import { MockBusinessRepository } from '../../infrastructure/repositories/mock-business.repository';

@Injectable()
export class CloseCashShiftUseCase {
  constructor(private readonly mockBusinessRepository: MockBusinessRepository) {}

  execute(cashShiftId: string, payload: CloseCashShiftDto): CashShiftResponseDto {
    return this.mockBusinessRepository.closeCashShift(cashShiftId, payload);
  }
}