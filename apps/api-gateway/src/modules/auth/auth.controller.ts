import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from '@modix/pkgs/contracts';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({
    schema: {
      example: {
        accessToken: 'mock-jwt-token',
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
  async login(@Body() payload: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(payload);
  }
}