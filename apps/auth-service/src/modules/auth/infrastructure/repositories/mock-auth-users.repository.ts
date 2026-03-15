import { Injectable } from '@nestjs/common';
import { Permission, UserRole } from '@modix/pkgs/contracts';
import { AuthUserEntity } from '../../domain/entities/auth-user.entity';

@Injectable()
export class MockAuthUsersRepository {
  private readonly ownerPermissions: Permission[] = [
    'auth.login',
    'business.read',
    'business.shift.open',
    'business.shift.close',
    'catalog.read',
    'catalog.manage',
    'sales.read',
    'sales.create',
    'sales.draft.update',
    'sales.cancel',
    'sales.status.update',
    'payments.create'
  ];

  private readonly adminPermissions: Permission[] = [
    'auth.login',
    'business.read',
    'business.shift.open',
    'business.shift.close',
    'catalog.read',
    'sales.read',
    'sales.create',
    'sales.draft.update',
    'sales.cancel',
    'sales.status.update',
    'payments.create'
  ];

  private readonly cashierPermissions: Permission[] = [
    'auth.login',
    'business.read',
    'business.shift.open',
    'catalog.read',
    'sales.read',
    'sales.create',
    'sales.draft.update',
    'sales.status.update',
    'payments.create'
  ];

  private readonly users: AuthUserEntity[] = [
    new AuthUserEntity(
      'usr_001',
      'owner@frekao.com',
      'Password123',
      'Enmanuel',
      'Owner',
      UserRole.OWNER,
      this.ownerPermissions,
      true
    ),
    new AuthUserEntity(
      'usr_002',
      'admin@frekao.com',
      'Password123',
      'Genesis',
      'Admin',
      UserRole.ADMIN,
      this.adminPermissions,
      true
    ),
    new AuthUserEntity(
      'usr_003',
      'cashier@frekao.com',
      'Password123',
      'Caja',
      'Frekao',
      UserRole.CASHIER,
      this.cashierPermissions,
      true
    )
  ];

  findByEmail(email: string): AuthUserEntity | null {
    return this.users.find((user) => user.email === email) ?? null;
  }
}
