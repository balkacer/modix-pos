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
        message: 'Payment service is healthy',
        data: {
          status: 'ok',
          service: 'payment-service'
        }
      }
    }
  })
  check() {
    return {
      success: true,
      message: 'Payment service is healthy',
      data: {
        status: 'ok',
        service: 'payment-service'
      }
    };
  }
}