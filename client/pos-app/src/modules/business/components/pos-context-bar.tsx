import { useShiftStore } from '../store/shift.store';
import { useActiveCashRegister } from '../hooks/use-active-cash-register';
import { AppCard } from '../../../shared/ui/primitives/app-card';
import { StatBadge } from '../../../shared/ui/primitives/stat-badge';

export function PosContextBar() {
  const activeShift = useShiftStore((state) => state.activeShift);
  const { activeCashRegister } = useActiveCashRegister();

  if (!activeShift) {
    return null;
  }

  return (
    <AppCard title="Active Session" subtitle="Current operational context">
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <StatBadge label="Register" value={activeCashRegister?.name ?? activeShift.cashRegisterId} />
        <StatBadge label="Shift" value={activeShift.id} />
      </div>
    </AppCard>
  );
}