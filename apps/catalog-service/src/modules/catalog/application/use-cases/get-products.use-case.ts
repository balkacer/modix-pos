import { ProductResponseDto } from '@modix/pkgs/contracts';
import { Injectable } from '@nestjs/common';
import { MockCatalogRepository } from '../../infrastructure/repositories/mock-catalog.repository';

@Injectable()
export class GetProductsUseCase {
  constructor(private readonly mockCatalogRepository: MockCatalogRepository) {}

  execute(): ProductResponseDto[] {
    return this.mockCatalogRepository.getProducts();
  }
}
