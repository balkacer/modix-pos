import { ProductResponseDto } from '@modix/pkgs/contracts';
import { Injectable } from '@nestjs/common';
import { MockCatalogRepository } from '../../infrastructure/repositories/mock-catalog.repository';

@Injectable()
export class GetProductsByCategoryUseCase {
  constructor(private readonly mockCatalogRepository: MockCatalogRepository) {}

  execute(categoryId: string): ProductResponseDto[] {
    return this.mockCatalogRepository.getProductsByCategoryId(categoryId);
  }
}