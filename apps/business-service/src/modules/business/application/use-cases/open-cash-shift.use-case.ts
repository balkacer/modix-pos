import { CashShiftResponseDto } from '@modix/pkgs/contracts';
import { Injectable } from '@nestjs/common';
import { OpenCashShiftDto } from '../dto/open-cash-shift.dto';
import { MockBusinessRepository } from '../../infrastructure/repositories/mock-business.repository';

@Injectable()
export class OpenCashShiftUseCase {
  constructor(private readonly mockBusinessRepository: MockBusinessRepository) {}

  execute(payload: OpenCashShiftDto): CashShiftResponseDto {
    return this.mockBusinessRepository.openCashShift(payload);
  }
}