import { CashRegisterResponseDto } from '@modix/pkgs/contracts';
import { Injectable } from '@nestjs/common';
import { MockBusinessRepository } from '../../infrastructure/repositories/mock-business.repository';

@Injectable()
export class GetCashRegistersByBranchUseCase {
  constructor(private readonly mockBusinessRepository: MockBusinessRepository) {}

  execute(branchId: string): CashRegisterResponseDto[] {
    return this.mockBusinessRepository.getCashRegistersByBranchId(branchId);
  }
}