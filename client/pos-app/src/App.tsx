import { useQuery } from '@tanstack/react-query';
import { LoginForm } from './modules/auth/components/login-form';
import { useAuthStore } from './modules/auth/store/auth.store';
import { PosContextBar } from './modules/business/components/pos-context-bar';
import { ShiftOpenForm } from './modules/business/components/shift-open-form';
import { useShiftStore } from './modules/business/store/shift.store';
import { CatalogPanel } from './modules/catalog/components/catalog-panel';
import { getHealth } from './modules/health/api/get-health';
import { OrderContextPanel } from './modules/orders/components/order-context-panel';
import { CurrentOrderPanel } from './modules/orders/components/current-order-panel';
import { PaymentPanel } from './modules/payments/components/payment-panel';
import { OrderWorkflowPanel } from './modules/sales/components/order-workflow-panel';
import { PosShell } from './shared/ui/layout/pos-shell';
import { AppCard } from './shared/ui/primitives/app-card';
import { StatBadge } from './shared/ui/primitives/stat-badge';
import { ActiveOrdersPanel } from './modules/sales/components/active-orders-panel';

export function App() {
  const user = useAuthStore((state) => state.user);
  const activeShift = useShiftStore((state) => state.activeShift);

  const healthQuery = useQuery({
    queryKey: ['gateway-health'],
    queryFn: getHealth
  });

  return (
    <PosShell>
      <div style={{ display: 'grid', gap: 24 }}>
        <AppCard title="System Status" subtitle="Current platform and session health">
          {healthQuery.isPending ? <p>Checking gateway...</p> : null}
          {healthQuery.isError ? (
            <p style={{ color: 'crimson' }}>Could not reach API Gateway.</p>
          ) : null}
          {healthQuery.data ? (
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <StatBadge label="Gateway" value={healthQuery.data.data.status} />
              <StatBadge label="Service" value={healthQuery.data.data.service} />
              <StatBadge label="Session" value={user ? 'Active' : 'Guest'} />
              <StatBadge label="Shift" value={activeShift ? activeShift.status : 'Closed'} />
            </div>
          ) : null}
        </AppCard>

        {!user ? (
          <AppCard title="Login" subtitle="Authenticate to begin operating the POS">
            <LoginForm />
          </AppCard>
        ) : !activeShift ? (
          <AppCard title="Open Shift" subtitle="Select your operating context before selling">
            <ShiftOpenForm />
          </AppCard>
        ) : (
          <>
            <PosContextBar />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.5fr 1fr',
                gap: 24,
                alignItems: 'start'
              }}
            >
              <div>
                <CatalogPanel />
              </div>

              <div style={{ display: 'grid', gap: 24 }}>
                <OrderContextPanel />
                <ActiveOrdersPanel />
                <CurrentOrderPanel />
                <PaymentPanel />
                <OrderWorkflowPanel />
              </div>
            </div>
          </>
        )}
      </div>
    </PosShell>
  );
}