import { useAuthStore } from '../../auth/store/auth.store';
import { useShiftStore } from '../store/shift.store';
import { useActiveBusiness } from '../hooks/use-active-business';
import { useActiveBranch } from '../hooks/use-active-branch';
import { useActiveCashRegister } from '../hooks/use-active-cash-register';
import { AppCard } from '../../../shared/ui/primitives/app-card';
import { StatBadge } from '../../../shared/ui/primitives/stat-badge';

export function PosContextBar() {
  const user = useAuthStore((state) => state.user);
  const activeShift = useShiftStore((state) => state.activeShift);

  const { activeBusiness } = useActiveBusiness();
  const { activeBranch } = useActiveBranch();
  const { activeCashRegister } = useActiveCashRegister();

  if (!user || !activeShift) {
    return null;
  }

  return (
    <AppCard title="Active Context" subtitle="Current operator and shift context">
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <StatBadge label="User" value={`${user.firstName} ${user.lastName}`} />
        <StatBadge label="Role" value={user.role} />
        <StatBadge
          label="Business"
          value={activeBusiness?.name ?? activeShift.businessId}
        />
        <StatBadge label="Branch" value={activeBranch?.name ?? activeShift.branchId} />
        <StatBadge
          label="Register"
          value={activeCashRegister?.name ?? activeShift.cashRegisterId}
        />
        <StatBadge label="Shift" value={activeShift.id} />
      </div>
    </AppCard>
  );
}
