import { Permission } from '@modix/pkgs/contracts';
import { useAuthStore } from '../store/auth.store';
import { hasPermission } from '../utils/has-permission';

export function usePermission(permission: Permission): boolean {
  const user = useAuthStore((state) => state.user);

  return hasPermission(user?.permissions, permission);
}
