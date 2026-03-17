import { tokens } from '../../../app/theme/tokens';
import { OrderContextPanel } from '../../orders/components/order-context-panel';
import { ActiveOrdersPanel } from '../../sales/components/active-orders-panel';
import { CurrentOrderPanel } from '../../orders/components/current-order-panel';
import { PaymentPanel } from '../../payments/components/payment-panel';
import { OrderWorkflowPanel } from '../../sales/components/order-workflow-panel';
import { ShiftClosePanel } from '../../business/components/shift-close-panel';

export function PosRightColumn() {
  return (
    <div
      style={{
        display: 'grid',
        gap: tokens.spacing.xl,
        alignContent: 'start'
      }}
    >
      <OrderContextPanel />
      <ActiveOrdersPanel />
      <CurrentOrderPanel />
      <PaymentPanel />
      <OrderWorkflowPanel />
      <ShiftClosePanel />
    </div>
  );
}