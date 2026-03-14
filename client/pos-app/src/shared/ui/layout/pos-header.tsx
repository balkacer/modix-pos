import { useAuthStore } from '../../../modules/auth/store/auth.store';
import { useShiftStore } from '../../../modules/business/store/shift.store';

export function PosHeader() {
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);
  const clearActiveShift = useShiftStore((state) => state.clearActiveShift);

  const handleLogout = (): void => {
    clearActiveShift();
    clearSession();
  };

  return (
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
        <div style={{ color: '#6b7280', fontSize: 14 }}>Frekao · Quick Service POS</div>
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
      </div>
    </header>
  );
}