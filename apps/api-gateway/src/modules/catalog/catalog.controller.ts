import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CategoryResponseDto, ProductResponseDto } from '@modix/pkgs/contracts';
import { CatalogService } from './catalog.service';

@ApiTags('Catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('categories')
  @ApiOkResponse()
  async getCategories(): Promise<CategoryResponseDto[]> {
    return this.catalogService.getCategories();
  }

  @Get('products')
  @ApiOkResponse()
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    example: 'true'
  })
  async getProducts(@Query('activeOnly') activeOnly?: string): Promise<ProductResponseDto[]> {
    return this.catalogService.getProducts(activeOnly === 'true');
  }

  @Get('categories/:categoryId/products')
  @ApiOkResponse()
  async getProductsByCategoryId(
    @Param('categoryId') categoryId: string
  ): Promise<ProductResponseDto[]> {
    return this.catalogService.getProductsByCategoryId(categoryId);
  }
}