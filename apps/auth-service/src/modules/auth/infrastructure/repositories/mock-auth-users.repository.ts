import { Injectable } from '@nestjs/common';
import { AuthUserEntity } from '../../domain/entities/auth-user.entity';

@Injectable()
export class MockAuthUsersRepository {
  private readonly users: AuthUserEntity[] = [
    new AuthUserEntity(
      'usr_001',
      'admin@frekao.com',
      'Password123',
      'Enmanuel',
      'Balcacer',
      'owner',
      true
    ),
    new AuthUserEntity(
      'usr_002',
      'cashier@frekao.com',
      'Password123',
      'Caja',
      'Frekao',
      'cashier',
      true
    )
  ];

  findByEmail(email: string): AuthUserEntity | null {
    return this.users.find((user) => user.email === email) ?? null;
  }
}