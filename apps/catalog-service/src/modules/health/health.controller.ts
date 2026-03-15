import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOkResponse({
    schema: {
      example: {
        success: true,
        message: 'Catalog service is healthy',
        data: {
          status: 'ok',
          service: 'catalog-service'
        }
      }
    }
  })
  check() {
    return {
      success: true,
      message: 'Catalog service is healthy',
      data: {
        status: 'ok',
        service: 'catalog-service'
      }
    };
  }
}
