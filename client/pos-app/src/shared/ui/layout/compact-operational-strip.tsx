import { tokens } from '../../../app/theme/tokens';
import { useAuthStore } from '../../../modules/auth/store/auth.store';
import { useOperationalContext } from '../../../modules/business/hooks/use-operational-context';

export function CompactOperationalStrip() {
  const user = useAuthStore((state) => state.user);
  const { activeShift, activeCashRegister } = useOperationalContext();

  if (!user || !activeShift) {
    return null;
  }

  const items = [
    { label: 'Shift', value: activeShift.id },
    { label: 'Register', value: activeCashRegister?.name ?? activeShift.cashRegisterId },
    { label: 'Operator', value: `${user.firstName} ${user.lastName}` }
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: tokens.spacing.md,
        alignItems: 'center',
        padding: '8px 0',
        color: tokens.colors.textMuted,
        fontSize: tokens.typography.caption
      }}
    >
      {items.map((item, index) => (
        <div
          key={item.label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <span>{item.label}:</span>
          <strong style={{ color: tokens.colors.text }}>{item.value}</strong>

          {index < items.length - 1 ? <span>•</span> : null}
        </div>
      ))}
    </div>
  );
}