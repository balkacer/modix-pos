import { tokens } from '../../../app/theme/tokens';
import { useAuthStore } from '../../../modules/auth/store/auth.store';
import { useOperationalContext } from '../../../modules/business/hooks/use-operational-context';

export function PosHeader() {
  const user = useAuthStore((state) => state.user);
  const { activeShift, activeBusiness, activeBranch, activeCashRegister, isLoading } =
    useOperationalContext();

  const hasOperationalContext = Boolean(user && activeShift);

  const businessLabel = !hasOperationalContext
    ? 'MODIX POS'
    : isLoading
      ? 'Loading context...'
      : activeBusiness?.name ?? 'MODIX POS';

  const branchLabel = hasOperationalContext
    ? activeBranch?.name ?? activeShift?.branchId ?? '-'
    : '-';

  const registerLabel = hasOperationalContext
    ? activeCashRegister?.name ?? activeShift?.cashRegisterId ?? '-'
    : '-';

  return (
    <header
      style={{
        height: 80,
        borderBottom: `1px solid ${tokens.colors.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        background: tokens.colors.surface,
        gap: tokens.spacing.lg
      }}
    >
      <div style={{ display: 'grid', gap: 4 }}>
        <div
          style={{
            fontWeight: 800,
            fontSize: 20,
            color: tokens.colors.text
          }}
        >
          {businessLabel}
        </div>

        <div
          style={{
            display: 'flex',
            gap: tokens.spacing.md,
            flexWrap: 'wrap',
            alignItems: 'center',
            color: tokens.colors.textMuted,
            fontSize: tokens.typography.caption
          }}
        >
          <span>Branch: {branchLabel}</span>
          <span>Register: {registerLabel}</span>
        </div>
      </div>

      {user ? (
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              fontWeight: 700,
              color: tokens.colors.text
            }}
          >
            {user.firstName} {user.lastName}
          </div>
          <div
            style={{
              fontSize: tokens.typography.caption,
              color: tokens.colors.textMuted,
              textTransform: 'capitalize'
            }}
          >
            {user.role}
          </div>
        </div>
      ) : null}
    </header>
  );
}