import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CategoryResponseDto, ProductResponseDto } from '@modix/pkgs/contracts';
import { GetActiveProductsUseCase } from '../../application/use-cases/get-active-products.use-case';
import { GetCategoriesUseCase } from '../../application/use-cases/get-categories.use-case';
import { GetProductsByCategoryUseCase } from '../../application/use-cases/get-products-by-category.use-case';
import { GetProductsUseCase } from '../../application/use-cases/get-products.use-case';

@ApiTags('Catalog')
@Controller()
export class CatalogController {
  constructor(
    private readonly getCategoriesUseCase: GetCategoriesUseCase,
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly getActiveProductsUseCase: GetActiveProductsUseCase,
    private readonly getProductsByCategoryUseCase: GetProductsByCategoryUseCase
  ) {}

  @Get('categories')
  @ApiOkResponse()
  getCategories(): CategoryResponseDto[] {
    return this.getCategoriesUseCase.execute();
  }

  @Get('products')
  @ApiOkResponse()
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    example: 'true'
  })
  getProducts(@Query('activeOnly') activeOnly?: string): ProductResponseDto[] {
    if (activeOnly === 'true') {
      return this.getActiveProductsUseCase.execute();
    }

    return this.getProductsUseCase.execute();
  }

  @Get('categories/:categoryId/products')
  @ApiOkResponse()
  getProductsByCategory(@Param('categoryId') categoryId: string): ProductResponseDto[] {
    return this.getProductsByCategoryUseCase.execute(categoryId);
  }
}