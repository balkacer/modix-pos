import { BusinessResponseDto } from '@modix/pkgs/contracts';
import { Injectable } from '@nestjs/common';
import { MockBusinessRepository } from '../../infrastructure/repositories/mock-business.repository';

@Injectable()
export class GetBusinessesUseCase {
  constructor(private readonly mockBusinessRepository: MockBusinessRepository) {}

  execute(): BusinessResponseDto[] {
    return this.mockBusinessRepository.getBusinesses();
  }
}