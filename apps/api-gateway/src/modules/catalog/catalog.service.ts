import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { CategoryResponseDto, ProductResponseDto } from '@modix/pkgs/contracts';
import { appConfig } from '../../config/app.config';
import { mapAxiosErrorToHttpException } from '../../shared/http/http-exception.mapper';
import { HttpService } from '../../shared/http/http.service';

@Injectable()
export class CatalogService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>
  ) {}

  async getCategories(): Promise<CategoryResponseDto[]> {
    try {
      const response = await this.httpService.get<CategoryResponseDto[]>(
        `${this.config.services.catalogServiceBaseUrl}/categories`
      );

      return response.data;
    } catch (error: unknown) {
      throw mapAxiosErrorToHttpException(error);
    }
  }

  async getProducts(activeOnly?: boolean): Promise<ProductResponseDto[]> {
    try {
      const query = activeOnly ? '?activeOnly=true' : '';

      const response = await this.httpService.get<ProductResponseDto[]>(
        `${this.config.services.catalogServiceBaseUrl}/products${query}`
      );

      return response.data;
    } catch (error: unknown) {
      throw mapAxiosErrorToHttpException(error);
    }
  }

  async getProductsByCategoryId(categoryId: string): Promise<ProductResponseDto[]> {
    try {
      const response = await this.httpService.get<ProductResponseDto[]>(
        `${this.config.services.catalogServiceBaseUrl}/categories/${categoryId}/products`
      );

      return response.data;
    } catch (error: unknown) {
      throw mapAxiosErrorToHttpException(error);
    }
  }
}
