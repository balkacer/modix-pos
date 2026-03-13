import { CategoryResponseDto, ProductResponseDto } from '@modix/pkgs/contracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MockCatalogRepository {
  private readonly categories: CategoryResponseDto[] = [
    {
      id: 'cat_001',
      businessId: 'biz_001',
      code: 'helados_fundita',
      name: 'Helados de Fundita',
      isActive: true
    },
    {
      id: 'cat_002',
      businessId: 'biz_001',
      code: 'packs',
      name: 'Packs',
      isActive: true
    },
    {
      id: 'cat_003',
      businessId: 'biz_001',
      code: 'bebidas',
      name: 'Bebidas',
      isActive: true
    }
  ];

  private readonly products: ProductResponseDto[] = [
    {
      id: 'prd_001',
      businessId: 'biz_001',
      categoryId: 'cat_001',
      code: 'helado_fundita_oreo',
      name: 'Helado de Fundita Oreo',
      price: 150,
      isActive: true
    },
    {
      id: 'prd_002',
      businessId: 'biz_001',
      categoryId: 'cat_001',
      code: 'helado_fundita_chinola',
      name: 'Helado de Fundita Chinola',
      price: 150,
      isActive: true
    },
    {
      id: 'prd_003',
      businessId: 'biz_001',
      categoryId: 'cat_001',
      code: 'helado_fundita_vainilla',
      name: 'Helado de Fundita Vainilla',
      price: 150,
      isActive: true
    },
    {
      id: 'prd_004',
      businessId: 'biz_001',
      categoryId: 'cat_001',
      code: 'helado_fundita_fresa',
      name: 'Helado de Fundita Fresa',
      price: 150,
      isActive: true
    },
    {
      id: 'prd_005',
      businessId: 'biz_001',
      categoryId: 'cat_001',
      code: 'helado_fundita_mango',
      name: 'Helado de Fundita Mango',
      price: 150,
      isActive: true
    },
    {
      id: 'prd_006',
      businessId: 'biz_001',
      categoryId: 'cat_002',
      code: 'pack_3_funditas',
      name: 'Pack 3 Funditas',
      price: 400,
      isActive: true
    },
    {
      id: 'prd_007',
      businessId: 'biz_001',
      categoryId: 'cat_002',
      code: 'pack_6_funditas',
      name: 'Pack 6 Funditas',
      price: 780,
      isActive: true
    },
    {
      id: 'prd_008',
      businessId: 'biz_001',
      categoryId: 'cat_003',
      code: 'agua_500ml',
      name: 'Agua 500ml',
      price: 50,
      isActive: false
    }
  ];

  getCategories(): CategoryResponseDto[] {
    return this.categories.filter((category) => category.isActive);
  }

  getProducts(): ProductResponseDto[] {
    return this.products;
  }

  getActiveProducts(): ProductResponseDto[] {
    return this.products.filter((product) => product.isActive);
  }

  getProductsByCategoryId(categoryId: string): ProductResponseDto[] {
    return this.products.filter(
      (product) => product.categoryId === categoryId && product.isActive
    );
  }
}