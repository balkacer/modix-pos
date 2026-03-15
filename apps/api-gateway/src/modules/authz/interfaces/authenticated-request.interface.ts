import { Request } from 'express';
import { Permission, UserRole } from '@modix/pkgs/contracts';

export interface AuthenticatedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  permissions: Permission[];
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}
