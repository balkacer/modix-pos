import { Permission } from '@modix/pkgs/contracts';

export const hasPermission = (
  permissions: Permission[] | undefined,
  requiredPermission: Permission
): boolean => {
  return permissions?.includes(requiredPermission) ?? false;
};
