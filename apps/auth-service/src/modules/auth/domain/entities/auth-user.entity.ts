import { Permission, UserRole } from '@modix/pkgs/contracts';

export class AuthUserEntity {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly role: UserRole,
    public readonly permissions: Permission[],
    public readonly isActive: boolean
  ) {}
}
