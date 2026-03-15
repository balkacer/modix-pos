import { Injectable } from '@nestjs/common';
import { Permission, UserRole } from '@modix/pkgs/contracts';
import { AuthenticatedUser } from '../interfaces/authenticated-request.interface';

@Injectable()
export class AuthzIdentityService {
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

  private readonly users: AuthenticatedUser[] = [
    {
      id: 'usr_001',
      email: 'owner@frekao.com',
      firstName: 'Enmanuel',
      lastName: 'Owner',
      role: UserRole.OWNER,
      permissions: this.ownerPermissions
    },
    {
      id: 'usr_002',
      email: 'admin@frekao.com',
      firstName: 'Genesis',
      lastName: 'Admin',
      role: UserRole.ADMIN,
      permissions: this.adminPermissions
    },
    {
      id: 'usr_003',
      email: 'cashier@frekao.com',
      firstName: 'Caja',
      lastName: 'Frekao',
      role: UserRole.CASHIER,
      permissions: this.cashierPermissions
    }
  ];

  findById(userId: string): AuthenticatedUser | null {
    return this.users.find((user) => user.id === userId) ?? null;
  }

  parseMockToken(accessToken: string): string | null {
    if (!accessToken.startsWith('mock-token-')) {
      return null;
    }

    return accessToken.replace('mock-token-', '');
  }
}
