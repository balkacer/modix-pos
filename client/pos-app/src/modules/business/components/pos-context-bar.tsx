import { useAuthStore } from '../../auth/store/auth.store';
import { useShiftStore } from '../store/shift.store';
import { AppCard } from '../../../shared/ui/primitives/app-card';
import { StatBadge } from '../../../shared/ui/primitives/stat-badge';

export function PosContextBar() {
  const user = useAuthStore((state) => state.user);
  const activeShift = useShiftStore((state) => state.activeShift);

  if (!user || !activeShift) {
    return null;
  }

  return (
    <AppCard title="Active Context" subtitle="Current operator and shift context">
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <StatBadge label="User" value={`${user.firstName} ${user.lastName}`} />
        <StatBadge label="Role" value={user.role} />
        <StatBadge label="Shift" value={activeShift.id} />
        <StatBadge label="Register" value={activeShift.cashRegisterId} />
        <StatBadge label="Branch" value={activeShift.branchId} />
      </div>
    </AppCard>
  );
}