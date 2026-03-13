import { Module } from '@nestjs/common';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { MockAuthUsersRepository } from './infrastructure/repositories/mock-auth-users.repository';

@Module({
  controllers: [AuthController],
  providers: [MockAuthUsersRepository, LoginUseCase]
})
export class AuthModule {}