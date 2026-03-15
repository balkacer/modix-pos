import { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { closeCashShift } from '../api/close-cash-shift';
import { useShiftStore } from '../store/shift.store';
import { useAuthStore } from '../../auth/store/auth.store';
import { useSalesStore } from '../../sales/store/sales.store';
import { getOrders } from '../../sales/api/get-orders';
import { isBlockingOrderStatus } from '../../sales/utils/is-blocking-order-status';
import { AppButton } from '../../../shared/ui/primitives/app-button';
import { AppCard } from '../../../shared/ui/primitives/app-card';
import { AppInput } from '../../../shared/ui/primitives/app-input';
import { StatusPill } from '../../../shared/ui/primitives/status-pill';
import { usePermission } from '../../auth/hooks/use-permission';
import { AccessDenied } from '../../../shared/ui/feedback/access-denied';
import { ConfirmDialog } from '../../../shared/ui/feedback/confirm-dialog';

export function ShiftClosePanel() {
  const user = useAuthStore((state) => state.user);
  const activeShift = useShiftStore((state) => state.activeShift);
  const clearActiveShift = useShiftStore((state) => state.clearActiveShift);

  const clearActiveOrder = useSalesStore((state) => state.clearActiveOrder);
  const setEditingDraftOrderId = useSalesStore((state) => state.setEditingDraftOrderId);

  const canCloseShift = usePermission('business.shift.close');

  const [closingAmount, setClosingAmount] = useState('');
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);

  const ordersQuery = useQuery({
    queryKey: ['sales-orders-for-shift-close'],
    queryFn: getOrders,
    enabled: Boolean(activeShift),
    refetchInterval: 5000
  });

  const blockingOrdersForShift = useMemo(() => {
    if (!activeShift || !ordersQuery.data) {
      return [];
    }

    return ordersQuery.data.filter((order) => {
      return order.cashShiftId === activeShift.id && isBlockingOrderStatus(order.status);
    });
  }, [activeShift, ordersQuery.data]);

  const hasBlockingOrders = blockingOrdersForShift.length > 0;

  const closeShiftMutation = useMutation({
    mutationFn: ({
      cashShiftId,
      closingAmount,
      closedByUserId
    }: {
      cashShiftId: string;
      closingAmount: number;
      closedByUserId: string;
    }) =>
      closeCashShift(cashShiftId, {
        closingAmount,
        closedByUserId
      }),
    onSuccess: () => {
      clearActiveOrder();
      clearActiveShift();
      setEditingDraftOrderId(null);
      setClosingAmount('');
      setCloseDialogOpen(false);
    }
  });

  if (!user || !activeShift) {
    return null;
  }

  if (!canCloseShift) {
    return (
      <AccessDenied
        title="Close Shift"
        subtitle="Shift closing is restricted for your current role"
        description="Your user role does not allow closing shifts."
      />
    );
  }

  const handleCloseShift = (): void => {
    if (!closingAmount || hasBlockingOrders) {
      return;
    }

    setCloseDialogOpen(true);
  };

  const confirmCloseShift = (): void => {
    closeShiftMutation.mutate({
      cashShiftId: activeShift.id,
      closingAmount: Number(closingAmount),
      closedByUserId: user.id
    });
  };

  return (
    <>
      <AppCard
        title="Close Shift"
        subtitle="Close the active register shift when operations are complete"
      >
        <div style={{ display: 'grid', gap: 12 }}>
          <p>
            <strong>Shift:</strong> {activeShift.id}
          </p>

          {ordersQuery.isPending ? <p>Checking shift orders...</p> : null}

          {ordersQuery.isError ? (
            <div
              style={{
                padding: 12,
                borderRadius: 12,
                background: '#fef2f2',
                color: '#991b1b',
                border: '1px solid #fecaca'
              }}
            >
              Could not validate active orders for this shift. Please try again before
              closing.
            </div>
          ) : null}

          {hasBlockingOrders ? (
            <div
              style={{
                padding: 12,
                borderRadius: 12,
                background: '#fef2f2',
                color: '#991b1b',
                border: '1px solid #fecaca'
              }}
            >
              <strong>Shift cannot be closed yet.</strong>
              <div style={{ marginTop: 8 }}>
                There are {blockingOrdersForShift.length} active order(s) still in
                progress.
              </div>
            </div>
          ) : null}

          {hasBlockingOrders ? (
            <div style={{ display: 'grid', gap: 10 }}>
              {blockingOrdersForShift.map((order) => (
                <div
                  key={order.id}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 12,
                    padding: 12,
                    background: '#fff'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 12
                    }}
                  >
                    <div>
                      <strong>{order.orderNumber}</strong>
                      <div style={{ color: '#6b7280', fontSize: 13 }}>
                        {order.items.length} item(s) · RD$ {order.total.toFixed(2)}
                      </div>
                    </div>

                    <StatusPill value={order.status} />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <AppInput
            id="closingAmount"
            label="Closing amount"
            type="number"
            min="0"
            value={closingAmount}
            onChange={(event) => setClosingAmount(event.target.value)}
          />

          <AppButton
            type="button"
            variant="danger"
            onClick={handleCloseShift}
            disabled={
              ordersQuery.isPending ||
              ordersQuery.isError ||
              hasBlockingOrders ||
              !closingAmount ||
              closeShiftMutation.isPending
            }
          >
            {closeShiftMutation.isPending ? 'Closing shift...' : 'Close shift'}
          </AppButton>

          {closeShiftMutation.isError ? (
            <p style={{ color: 'crimson' }}>Could not close shift.</p>
          ) : null}
        </div>
      </AppCard>
      <ConfirmDialog
        open={closeDialogOpen}
        title="Close active shift?"
        description="This will close the current register shift for this operator."
        confirmLabel="Close shift"
        cancelLabel="Keep shift open"
        confirmVariant="danger"
        isLoading={closeShiftMutation.isPending}
        onConfirm={confirmCloseShift}
        onCancel={() => setCloseDialogOpen(false)}
      >
        <div
          style={{
            padding: 12,
            borderRadius: 12,
            background: '#f9fafb',
            border: '1px solid #e5e7eb'
          }}
        >
          <div>
            <strong>Shift:</strong> {activeShift.id}
          </div>
          <div>
            <strong>Closing amount:</strong> RD$ {Number(closingAmount || 0).toFixed(2)}
          </div>
        </div>
      </ConfirmDialog>
    </>
  );
}
