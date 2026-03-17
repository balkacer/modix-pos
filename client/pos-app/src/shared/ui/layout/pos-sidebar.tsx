import {
  ShoppingCart,
  Receipt,
  Wallet,
  Package,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut
} from 'lucide-react';
import { tokens } from '../../../app/theme/tokens';
import { useAuthStore } from '../../../modules/auth/store/auth.store';
import { useShiftStore } from '../../../modules/business/store/shift.store';
import { useSalesStore } from '../../../modules/sales/store/sales.store';

interface PosSidebarProps {
  collapsed: boolean;
  toggle: () => void;
  activeView: string;
  onChangeView: (view: string) => void;
}

const items = [
  { key: 'pos', label: 'POS', icon: ShoppingCart },
  { key: 'orders', label: 'Orders', icon: Receipt },
  { key: 'shift', label: 'Shift', icon: Wallet },
  { key: 'catalog', label: 'Catalog', icon: Package },
  { key: 'settings', label: 'Settings', icon: Settings }
];

export function PosSidebar({
  collapsed,
  toggle,
  activeView,
  onChangeView
}: PosSidebarProps) {
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);
  const clearActiveShift = useShiftStore((state) => state.clearActiveShift);
  const clearActiveOrder = useSalesStore((state) => state.clearActiveOrder);

  const handleLogout = (): void => {
    clearActiveOrder();
    clearActiveShift();
    clearSession();
  };

  return (
    <aside
      style={{
        background: tokens.colors.primary,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        padding: tokens.spacing.lg,
        minHeight: '100vh',
        borderRight: `1px solid ${tokens.colors.border}`
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'space-between',
          alignItems: 'center',
          marginBottom: tokens.spacing.xl
        }}
      >
        {!collapsed && (
          <div
            style={{
              fontWeight: 800,
              fontSize: tokens.typography.section
            }}
          >
            MODIX
          </div>
        )}

        <button
          onClick={toggle}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>
      </div>

      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacing.sm
        }}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onChangeView(item.key)}
              title={collapsed ? item.label : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                gap: tokens.spacing.md,
                padding: '12px 14px',
                borderRadius: tokens.radius.md,
                border: 'none',
                background: isActive ? tokens.colors.primaryHover : 'transparent',
                color: '#e5e7eb',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              <Icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', display: 'grid', gap: tokens.spacing.md }}>
        {user ? (
          <button
            type="button"
            onClick={handleLogout}
            title={collapsed ? 'Logout' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: tokens.spacing.md,
              padding: '12px 14px',
              borderRadius: tokens.radius.md,
              border: 'none',
              background: 'transparent',
              color: '#fca5a5',
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        ) : null}
      </div>
    </aside>
  );
}
