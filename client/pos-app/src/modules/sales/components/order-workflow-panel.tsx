import { useMutation } from '@tanstack/react-query';
import { OrderStatus } from '@modix/pkgs/contracts';
import { cancelOrder } from '../api/cancel-order';
import { updateOrderStatus } from '../api/update-order-status';
import { useSalesStore } from '../store/sales.store';
import { AppButton } from '../../../shared/ui/primitives/app-button';
import { AppCard } from '../../../shared/ui/primitives/app-card';
import { StatusPill } from '../../../shared/ui/primitives/status-pill';

export function OrderWorkflowPanel() {
  const activeOrder = useSalesStore((state) => state.activeOrder);
  const setActiveOrder = useSalesStore((state) => state.setActiveOrder);
  const clearActiveOrder = useSalesStore((state) => state.clearActiveOrder);

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: OrderStatus }) =>
      updateOrderStatus(orderId, status),
    onSuccess: (updatedOrder) => {
      setActiveOrder(updatedOrder);
    }
  });

  const cancelOrderMutation = useMutation({
    mutationFn: ({ orderId }: { orderId: string }) =>
      cancelOrder(orderId, {
        cancellationReason: 'manual_cancellation',
        cancellationNote: 'Cancelled from POS'
      }),
    onSuccess: (updatedOrder) => {
      setActiveOrder(updatedOrder);
    }
  });

  if (!activeOrder) {
    return null;
  }

  const handleAdvance = (status: OrderStatus): void => {
    updateStatusMutation.mutate({
      orderId: activeOrder.id,
      status
    });
  };

  const canMoveToPacking = activeOrder.status === OrderStatus.PAID;
  const canMoveToReady = activeOrder.status === OrderStatus.PACKING;
  const canMoveToDelivered = activeOrder.status === OrderStatus.READY;
  const isCompleted = activeOrder.status === OrderStatus.DELIVERED;

  const canCancel = [
    OrderStatus.DRAFT,
    OrderStatus.PENDING_PAYMENT,
    OrderStatus.PAID,
    OrderStatus.PACKING,
    OrderStatus.READY
  ].includes(activeOrder.status);

  return (
    <AppCard title="Order Workflow" subtitle="Advance or cancel the active order">
      <div style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong>{activeOrder.orderNumber}</strong>
          <StatusPill value={activeOrder.status} />
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {canMoveToPacking ? (
            <AppButton
              type="button"
              onClick={() => handleAdvance(OrderStatus.PACKING)}
              disabled={updateStatusMutation.isPending}
            >
              Move to packing
            </AppButton>
          ) : null}

          {canMoveToReady ? (
            <AppButton
              type="button"
              onClick={() => handleAdvance(OrderStatus.READY)}
              disabled={updateStatusMutation.isPending}
            >
              Move to ready
            </AppButton>
          ) : null}

          {canMoveToDelivered ? (
            <AppButton
              type="button"
              onClick={() => handleAdvance(OrderStatus.DELIVERED)}
              disabled={updateStatusMutation.isPending}
            >
              Mark as delivered
            </AppButton>
          ) : null}

          {canCancel ? (
            <AppButton
              type="button"
              variant="danger"
              onClick={() => cancelOrderMutation.mutate({ orderId: activeOrder.id })}
              disabled={cancelOrderMutation.isPending}
            >
              Cancel order
            </AppButton>
          ) : null}

          {isCompleted ? (
            <AppButton type="button" variant="secondary" onClick={clearActiveOrder}>
              Clear completed order
            </AppButton>
          ) : null}
        </div>

        {updateStatusMutation.isError ? (
          <p style={{ color: 'crimson' }}>Could not update order status.</p>
        ) : null}

        {cancelOrderMutation.isError ? (
          <p style={{ color: 'crimson' }}>Could not cancel order.</p>
        ) : null}
      </div>
    </AppCard>
  );
}