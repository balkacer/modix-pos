import { Module } from '@nestjs/common';
import { GetActiveProductsUseCase } from './application/use-cases/get-active-products.use-case';
import { GetCategoriesUseCase } from './application/use-cases/get-categories.use-case';
import { GetProductsByCategoryUseCase } from './application/use-cases/get-products-by-category.use-case';
import { GetProductsUseCase } from './application/use-cases/get-products.use-case';
import { CatalogController } from './infrastructure/controllers/catalog.controller';
import { MockCatalogRepository } from './infrastructure/repositories/mock-catalog.repository';

@Module({
  controllers: [CatalogController],
  providers: [
    MockCatalogRepository,
    GetCategoriesUseCase,
    GetProductsUseCase,
    GetActiveProductsUseCase,
    GetProductsByCategoryUseCase
  ]
})
export class CatalogModule {}