import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { OrderResponseDto, OrderStatus } from '@modix/pkgs/contracts';
import { tokens } from '../../../app/theme/tokens';
import { ConfirmDialog } from '../../../shared/ui/feedback/confirm-dialog';
import { AppButton } from '../../../shared/ui/primitives/app-button';
import { cancelOrder } from '../../sales/api/cancel-order';
import { updateOrderStatus } from '../../sales/api/update-order-status';
import { useSalesStore } from '../../sales/store/sales.store';

interface CurrentOrderActionsProps {
  activeOrder: OrderResponseDto;
  onOpenPayment: () => void;
}

export function CurrentOrderActions({
  activeOrder,
  onOpenPayment
}: CurrentOrderActionsProps) {
  const setActiveOrder = useSalesStore((state) => state.setActiveOrder);
  const clearActiveOrder = useSalesStore((state) => state.clearActiveOrder);

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

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
      setCancelDialogOpen(false);
    }
  });

  const handleAdvance = (status: OrderStatus): void => {
    updateStatusMutation.mutate({
      orderId: activeOrder.id,
      status
    });
  };

  const canCancel = [
    OrderStatus.DRAFT,
    OrderStatus.PENDING_PAYMENT,
    OrderStatus.PAID,
    OrderStatus.PACKING,
    OrderStatus.READY
  ].includes(activeOrder.status);

  const isResolved = [
    OrderStatus.DELIVERED,
    OrderStatus.CANCELLED,
    OrderStatus.REJECTED
  ].includes(activeOrder.status);

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: tokens.spacing.sm,
          flexWrap: 'wrap'
        }}
      >
        {activeOrder.status === OrderStatus.DRAFT ? (
          <AppButton
            type="button"
            onClick={() => handleAdvance(OrderStatus.PENDING_PAYMENT)}
            disabled={updateStatusMutation.isPending}
          >
            {updateStatusMutation.isPending ? 'Updating...' : 'Move to pending payment'}
          </AppButton>
        ) : null}

        {activeOrder.status === OrderStatus.PENDING_PAYMENT ? (
          <AppButton type="button" onClick={onOpenPayment}>
            Open payment
          </AppButton>
        ) : null}

        {activeOrder.status === OrderStatus.PAID ? (
          <AppButton
            type="button"
            onClick={() => handleAdvance(OrderStatus.PACKING)}
            disabled={updateStatusMutation.isPending}
          >
            {updateStatusMutation.isPending ? 'Updating...' : 'Move to packing'}
          </AppButton>
        ) : null}

        {activeOrder.status === OrderStatus.PACKING ? (
          <AppButton
            type="button"
            onClick={() => handleAdvance(OrderStatus.READY)}
            disabled={updateStatusMutation.isPending}
          >
            {updateStatusMutation.isPending ? 'Updating...' : 'Move to ready'}
          </AppButton>
        ) : null}

        {activeOrder.status === OrderStatus.READY ? (
          <AppButton
            type="button"
            onClick={() => handleAdvance(OrderStatus.DELIVERED)}
            disabled={updateStatusMutation.isPending}
          >
            {updateStatusMutation.isPending ? 'Updating...' : 'Mark as delivered'}
          </AppButton>
        ) : null}

        {canCancel ? (
          <AppButton
            type="button"
            variant="danger"
            onClick={() => setCancelDialogOpen(true)}
            disabled={cancelOrderMutation.isPending}
          >
            {cancelOrderMutation.isPending ? 'Cancelling...' : 'Cancel order'}
          </AppButton>
        ) : null}

        {isResolved ? (
          <AppButton type="button" variant="secondary" onClick={clearActiveOrder}>
            Clear active order view
          </AppButton>
        ) : null}

        {!isResolved && activeOrder.status !== OrderStatus.PENDING_PAYMENT ? (
          <AppButton type="button" variant="secondary" onClick={clearActiveOrder}>
            Clear active order view
          </AppButton>
        ) : null}
      </div>

      <ConfirmDialog
        open={cancelDialogOpen}
        title="Cancel this order?"
        description="This action will mark the order as cancelled and stop the current flow."
        confirmLabel="Cancel order"
        cancelLabel="Keep order"
        confirmVariant="danger"
        isLoading={cancelOrderMutation.isPending}
        onConfirm={() => cancelOrderMutation.mutate({ orderId: activeOrder.id })}
        onCancel={() => setCancelDialogOpen(false)}
      />
    </>
  );
}
