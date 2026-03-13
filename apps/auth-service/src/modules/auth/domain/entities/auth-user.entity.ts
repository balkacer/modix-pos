export class AuthUserEntity {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly role: string,
    public readonly isActive: boolean
  ) {}
}