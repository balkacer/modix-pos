import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginResponseDto } from '@modix/pkgs/contracts';
import { LoginDto } from '../../application/dto/login.dto';
import { LoginUseCase } from '../../application/use-cases/login.use-case';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @ApiOkResponse({
    schema: {
      example: {
        accessToken: 'mock-token-usr_001',
        user: {
          id: 'usr_001',
          email: 'admin@frekao.com',
          firstName: 'Enmanuel',
          lastName: 'Balcacer',
          role: 'owner'
        }
      }
    }
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        statusCode: 401,
        message: 'Invalid credentials',
        error: 'Unauthorized'
      }
    }
  })
  async login(@Body() payload: LoginDto): Promise<LoginResponseDto> {
    return this.loginUseCase.execute(payload);
  }
}
