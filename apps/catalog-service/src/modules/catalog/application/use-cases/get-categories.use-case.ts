import { CategoryResponseDto } from '@modix/pkgs/contracts';
import { Injectable } from '@nestjs/common';
import { MockCatalogRepository } from '../../infrastructure/repositories/mock-catalog.repository';

@Injectable()
export class GetCategoriesUseCase {
  constructor(private readonly mockCatalogRepository: MockCatalogRepository) {}

  execute(): CategoryResponseDto[] {
    return this.mockCatalogRepository.getCategories();
  }
}