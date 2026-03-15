import { UserRole } from '../enums/user-role.enum';
import { Permission } from '../types/permission.type';

export interface LoginResponseDto {
  accessToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    permissions: Permission[];
  };
}
