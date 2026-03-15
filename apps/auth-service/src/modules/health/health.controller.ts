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
        message: 'Auth service is healthy',
        data: {
          status: 'ok',
          service: 'auth-service'
        }
      }
    }
  })
  check(): {
    success: boolean;
    message: string;
    data: { status: string; service: string };
  } {
    return {
      success: true,
      message: 'Auth service is healthy',
      data: {
        status: 'ok',
        service: 'auth-service'
      }
    };
  }
}
