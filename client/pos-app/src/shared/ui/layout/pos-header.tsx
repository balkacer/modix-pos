import { useState } from 'react';
import { useAuthStore } from '../../../modules/auth/store/auth.store';
import { useShiftStore } from '../../../modules/business/store/shift.store';
import { useActiveBusiness } from '../../../modules/business/hooks/use-active-business';
import { useActiveBranch } from '../../../modules/business/hooks/use-active-branch';
import { useSalesStore } from '../../../modules/sales/store/sales.store';
import { ConfirmDialog } from '../feedback/confirm-dialog';

export function PosHeader() {
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);

  const activeShift = useShiftStore((state) => state.activeShift);
  const clearActiveShift = useShiftStore((state) => state.clearActiveShift);

  const clearActiveOrder = useSalesStore((state) => state.clearActiveOrder);

  const { activeBusiness, isLoading: isBusinessLoading } = useActiveBusiness();
  const { activeBranch } = useActiveBranch();

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const executeLogout = (): void => {
    clearActiveOrder();
    clearActiveShift();
    clearSession();
    setLogoutDialogOpen(false);
  };

  const handleLogout = (): void => {
    if (activeShift) {
      setLogoutDialogOpen(true);
      return;
    }

    executeLogout();
  };

  const hasOperationalContext = Boolean(user && activeShift);

  const businessLabel = !hasOperationalContext
    ? 'MODIX POS'
    : isBusinessLoading
      ? 'Loading business...'
      : (activeBusiness?.name ?? 'MODIX POS');

  const branchLabel =
    hasOperationalContext && activeBranch?.name ? ` · ${activeBranch.name}` : '';

  return (
    <>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderBottom: '1px solid #e5e7eb',
          background: '#ffffff',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}
      >
        <div>
          <strong style={{ fontSize: 20 }}>MODIX POS</strong>
          <div style={{ color: '#6b7280', fontSize: 14 }}>
            {businessLabel}
            {branchLabel}
            {hasOperationalContext ? ' · Quick Service POS' : ''}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {user ? (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 600 }}>
                {user.firstName} {user.lastName}
              </div>
              <div style={{ fontSize: 13, color: '#6b7280' }}>{user.role}</div>
            </div>
          ) : null}

          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              style={{
                padding: '10px 14px',
                borderRadius: 12,
                border: '1px solid #d1d5db',
                background: '#fff'
              }}
            >
              Logout
            </button>
          ) : null}
        </div>
      </header>

      <ConfirmDialog
        open={logoutDialogOpen}
        title="Logout with open shift?"
        description="Your shift will remain open in the system and will be restored when you log back in."
        confirmLabel="Logout and keep shift open"
        cancelLabel="Stay logged in"
        confirmVariant="danger"
        onConfirm={executeLogout}
        onCancel={() => setLogoutDialogOpen(false)}
      />
    </>
  );
}
