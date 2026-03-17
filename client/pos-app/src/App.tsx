import { useState } from 'react';
import { LoginForm } from './modules/auth/components/login-form';
import { useAuthStore } from './modules/auth/store/auth.store';
import { ShiftOpenForm } from './modules/business/components/shift-open-form';
import { ShiftRestoredBanner } from './modules/business/components/shift-restored-banner';
import { ShiftWorkspace } from './modules/business/components/shift-workspace';
import { useShiftStore } from './modules/business/store/shift.store';
import { CatalogPanel } from './modules/catalog/components/catalog-panel';
import { OrdersWorkspace } from './modules/orders/components/orders-workspace';
import { PosSalesColumn } from './modules/pos/components/pos-sales-column';
import { ToastBanner } from './shared/ui/feedback/toast-banner';
import { ComingSoonPanel } from './shared/ui/feedback/coming-soon-panel';
import { AppLayout } from './shared/ui/layout/app-layout';
import { CompactOperationalStrip } from './shared/ui/layout/compact-operational-strip';
import { PosContentGrid } from './shared/ui/layout/pos-content-grid';
import { PosWorkspace } from './shared/ui/layout/pos-workspace';
import { AppCard } from './shared/ui/primitives/app-card';

export function App() {
  const user = useAuthStore((state) => state.user);
  const activeShift = useShiftStore((state) => state.activeShift);
  const [activeView, setActiveView] = useState('pos');

  const renderWorkspace = () => {
    if (!user) {
      return (
        <AppCard title="Login" subtitle="Authenticate to begin operating the POS">
          <LoginForm />
        </AppCard>
      );
    }

    if (!activeShift) {
      return (
        <AppCard
          title="Open Shift"
          subtitle="Select your operating context before selling"
        >
          <ShiftOpenForm />
        </AppCard>
      );
    }

    if (activeView === 'orders') {
      return <OrdersWorkspace />;
    }

    if (activeView === 'shift') {
      return <ShiftWorkspace />;
    }

    if (activeView === 'catalog') {
      return <CatalogPanel />;
    }

    if (activeView === 'settings') {
      return (
        <ComingSoonPanel
          title="Settings"
          description="Business preferences, users, devices and configuration will appear here."
        />
      );
    }

    return <PosContentGrid left={<CatalogPanel />} right={<PosSalesColumn />} />;
  };

  return (
    <AppLayout activeView={activeView} onChangeView={setActiveView}>
      <PosWorkspace>
        <ToastBanner />
        <ShiftRestoredBanner />
        <CompactOperationalStrip />

        {renderWorkspace()}
      </PosWorkspace>
    </AppLayout>
  );
}
