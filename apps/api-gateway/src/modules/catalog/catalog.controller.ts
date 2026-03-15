import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CategoryResponseDto, ProductResponseDto } from '@modix/pkgs/contracts';
import { CatalogService } from './catalog.service';
import { PermissionsGuard } from '../authz/guards/permissions.guard';
import { AuthGuard } from '../authz/guards/auth.guard';
import { RequirePermissions } from '../authz/decorators/require-permissions.decorator';

@ApiTags('Catalog')
@UseGuards(AuthGuard, PermissionsGuard)
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('categories')
  @RequirePermissions('catalog.read')
  @ApiOkResponse()
  async getCategories(): Promise<CategoryResponseDto[]> {
    return this.catalogService.getCategories();
  }

  @Get('products')
  @RequirePermissions('catalog.read')
  @ApiOkResponse()
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    example: 'true'
  })
  async getProducts(
    @Query('activeOnly') activeOnly?: string
  ): Promise<ProductResponseDto[]> {
    return this.catalogService.getProducts(activeOnly === 'true');
  }

  @Get('categories/:categoryId/products')
  @RequirePermissions('catalog.read')
  @ApiOkResponse()
  async getProductsByCategoryId(
    @Param('categoryId') categoryId: string
  ): Promise<ProductResponseDto[]> {
    return this.catalogService.getProductsByCategoryId(categoryId);
  }
}
