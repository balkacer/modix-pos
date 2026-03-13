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
        message: 'Business service is healthy',
        data: {
          status: 'ok',
          service: 'business-service'
        }
      }
    }
  })
  check() {
    return {
      success: true,
      message: 'Business service is healthy',
      data: {
        status: 'ok',
        service: 'business-service'
      }
    };
  }
}