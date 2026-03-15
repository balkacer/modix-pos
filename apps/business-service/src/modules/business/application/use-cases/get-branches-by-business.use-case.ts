import { BranchResponseDto } from '@modix/pkgs/contracts';
import { Injectable } from '@nestjs/common';
import { MockBusinessRepository } from '../../infrastructure/repositories/mock-business.repository';

@Injectable()
export class GetBranchesByBusinessUseCase {
  constructor(private readonly mockBusinessRepository: MockBusinessRepository) {}

  execute(businessId: string): BranchResponseDto[] {
    return this.mockBusinessRepository.getBranchesByBusinessId(businessId);
  }
}
