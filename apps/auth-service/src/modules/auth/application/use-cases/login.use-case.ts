import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginResponseDto } from '@modix/pkgs/contracts';
import { LoginDto } from '../dto/login.dto';
import { MockAuthUsersRepository } from '../../infrastructure/repositories/mock-auth-users.repository';

@Injectable()
export class LoginUseCase {
  constructor(private readonly mockAuthUsersRepository: MockAuthUsersRepository) {}

  async execute(payload: LoginDto): Promise<LoginResponseDto> {
    const user = this.mockAuthUsersRepository.findByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User is inactive');
    }

    if (user.password !== payload.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: `mock-token-${user.id}`,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        permissions: user.permissions
      }
    };
  }
}
