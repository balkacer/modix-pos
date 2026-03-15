import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { OrderStatus, OrderSource } from '@modix/pkgs/contracts';
import { useOrderStore } from '../store/order.store';
import { useOrderMetaStore } from '../store/order-meta.store';
import { useAuthStore } from '../../auth/store/auth.store';
import { useShiftStore } from '../../business/store/shift.store';
import { createOrder } from '../../sales/api/create-order';
import { deleteDraftOrder } from '../../sales/api/delete-draft-order';
import { updateDraftOrder } from '../../sales/api/update-draft-order';
import { updateOrderStatus } from '../../sales/api/update-order-status';
import { useSalesStore } from '../../sales/store/sales.store';
import { AppButton } from '../../../shared/ui/primitives/app-button';
import { AppCard } from '../../../shared/ui/primitives/app-card';
import { AppInput } from '../../../shared/ui/primitives/app-input';
import { EmptyState } from '../../../shared/ui/primitives/empty-state';
import { StatusPill } from '../../../shared/ui/primitives/status-pill';
import { ConfirmDialog } from '../../../shared/ui/feedback/confirm-dialog';

export function CurrentOrderPanel() {
  const items = useOrderStore((state) => state.items);
  const notes = useOrderStore((state) => state.notes);
  const increaseQuantity = useOrderStore((state) => state.increaseQuantity);
  const decreaseQuantity = useOrderStore((state) => state.decreaseQuantity);
  const setNotes = useOrderStore((state) => state.setNotes);
  const clearOrder = useOrderStore((state) => state.clearOrder);

  const consumptionType = useOrderMetaStore((state) => state.consumptionType);

  const user = useAuthStore((state) => state.user);
  const activeShift = useShiftStore((state) => state.activeShift);

  const activeOrder = useSalesStore((state) => state.activeOrder);
  const editingDraftOrderId = useSalesStore((state) => state.editingDraftOrderId);
  const setActiveOrder = useSalesStore((state) => state.setActiveOrder);
  const setEditingDraftOrderId = useSalesStore((state) => state.setEditingDraftOrderId);
  const clearActiveOrder = useSalesStore((state) => state.clearActiveOrder);

  const [deleteDraftDialogOpen, setDeleteDraftDialogOpen] = useState(false);

  const total = useMemo(
    () => items.reduce((accumulator, item) => accumulator + item.subtotal, 0),
    [items]
  );

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (createdOrder) => {
      setActiveOrder(createdOrder);
      clearOrder();
      setEditingDraftOrderId(null);
    }
  });

  const updateDraftOrderMutation = useMutation({
    mutationFn: ({
      orderId,
      payload
    }: {
      orderId: string;
      payload: {
        consumptionType: typeof consumptionType;
        notes?: string;
        items: {
          productId: string;
          productCodeSnapshot: string;
          productNameSnapshot: string;
          unitPriceSnapshot: number;
          quantity: number;
          subtotal: number;
        }[];
      };
    }) => updateDraftOrder(orderId, payload),
    onSuccess: (updatedOrder) => {
      setActiveOrder(updatedOrder);
      clearOrder();
      setEditingDraftOrderId(null);
    }
  });

  const deleteDraftOrderMutation = useMutation({
    mutationFn: deleteDraftOrder,
    onSuccess: () => {
      clearOrder();
      clearActiveOrder();
      setEditingDraftOrderId(null);
      setDeleteDraftDialogOpen(false);
    }
  });

  const moveToPendingPaymentMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: OrderStatus }) =>
      updateOrderStatus(orderId, status),
    onSuccess: (updatedOrder) => {
      setActiveOrder(updatedOrder);
    }
  });

  const handlePersistOrder = (): void => {
    if (!user || !activeShift || items.length === 0) {
      return;
    }

    const payload = {
      consumptionType,
      notes: notes || undefined,
      items: items.map((item) => ({
        productId: item.productId,
        productCodeSnapshot: item.productCode,
        productNameSnapshot: item.productName,
        unitPriceSnapshot: item.unitPrice,
        quantity: item.quantity,
        subtotal: item.subtotal
      }))
    };

    if (editingDraftOrderId) {
      updateDraftOrderMutation.mutate({
        orderId: editingDraftOrderId,
        payload
      });
      return;
    }

    createOrderMutation.mutate({
      businessId: activeShift.businessId,
      branchId: activeShift.branchId,
      cashRegisterId: activeShift.cashRegisterId,
      cashShiftId: activeShift.id,
      createdByUserId: user.id,
      consumptionType,
      source: OrderSource.POS,
      notes: notes || undefined,
      items: payload.items
    });
  };

  const handleMoveToPendingPayment = (): void => {
    if (!activeOrder) {
      return;
    }

    moveToPendingPaymentMutation.mutate({
      orderId: activeOrder.id,
      status: OrderStatus.PENDING_PAYMENT
    });
  };

  const isEditingDraft = Boolean(editingDraftOrderId);

  return (
    <>
      <AppCard
        title="Current Order"
        subtitle={
          isEditingDraft
            ? `Editing draft ${editingDraftOrderId}`
            : 'Review and manage the current ticket'
        }
      >
        {activeOrder ? (
          <div style={{ display: 'grid', gap: 12 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <strong>{activeOrder.orderNumber}</strong>
                <div style={{ color: '#6b7280', marginTop: 4 }}>
                  {activeOrder.consumptionType.replaceAll('_', ' ')}
                </div>
              </div>

              <StatusPill value={activeOrder.status} />
            </div>

            <div style={{ display: 'grid', gap: 10 }}>
              {activeOrder.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #f0f0f0',
                    paddingBottom: 8
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.productNameSnapshot}</div>
                    <div style={{ color: '#6b7280', fontSize: 13 }}>
                      {item.quantity} x RD$ {item.unitPriceSnapshot.toFixed(2)}
                    </div>
                  </div>

                  <strong>RD$ {item.subtotal.toFixed(2)}</strong>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>Total</strong>
              <strong>RD$ {activeOrder.total.toFixed(2)}</strong>
            </div>

            {activeOrder.notes ? (
              <div style={{ color: '#374151' }}>
                <strong>Notes:</strong> {activeOrder.notes}
              </div>
            ) : null}

            {activeOrder.lastPaymentMethod ? (
              <div style={{ color: '#374151' }}>
                Payment: {activeOrder.lastPaymentMethod}
                {activeOrder.lastPaymentReference
                  ? ` · Ref: ${activeOrder.lastPaymentReference}`
                  : ''}
              </div>
            ) : null}

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {activeOrder.status === OrderStatus.DRAFT ? (
                <AppButton
                  type="button"
                  onClick={handleMoveToPendingPayment}
                  disabled={moveToPendingPaymentMutation.isPending}
                >
                  {moveToPendingPaymentMutation.isPending
                    ? 'Updating...'
                    : 'Move to pending payment'}
                </AppButton>
              ) : null}

              <AppButton type="button" variant="secondary" onClick={clearActiveOrder}>
                Clear active order view
              </AppButton>
            </div>
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            title="No products added yet"
            description="Select products from the catalog to build the order."
          />
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ color: '#374151' }}>
              <strong>Consumption:</strong> {consumptionType.replaceAll('_', ' ')}
            </div>

            <div style={{ display: 'grid', gap: 12 }}>
              {items.map((item) => (
                <div
                  key={item.productId}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 12,
                    borderBottom: '1px solid #f0f0f0',
                    paddingBottom: 10
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700 }}>{item.productName}</div>
                    <div style={{ color: '#6b7280' }}>
                      RD$ {item.unitPrice.toFixed(2)} each
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <AppButton
                      type="button"
                      variant="secondary"
                      onClick={() => decreaseQuantity(item.productId)}
                    >
                      -
                    </AppButton>

                    <strong style={{ minWidth: 24, textAlign: 'center' }}>
                      {item.quantity}
                    </strong>

                    <AppButton
                      type="button"
                      variant="secondary"
                      onClick={() => increaseQuantity(item.productId)}
                    >
                      +
                    </AppButton>

                    <strong style={{ minWidth: 90, textAlign: 'right' }}>
                      RD$ {item.subtotal.toFixed(2)}
                    </strong>
                  </div>
                </div>
              ))}
            </div>

            <AppInput
              id="orderNotes"
              label="Order notes"
              placeholder="Special instructions, internal note, etc."
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>Total</strong>
              <strong>RD$ {total.toFixed(2)}</strong>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <AppButton
                type="button"
                onClick={handlePersistOrder}
                disabled={
                  !user ||
                  !activeShift ||
                  createOrderMutation.isPending ||
                  updateDraftOrderMutation.isPending
                }
              >
                {isEditingDraft
                  ? updateDraftOrderMutation.isPending
                    ? 'Saving draft...'
                    : 'Save draft changes'
                  : createOrderMutation.isPending
                    ? 'Creating order...'
                    : 'Create order'}
              </AppButton>

              {isEditingDraft ? (
                <AppButton
                  type="button"
                  variant="danger"
                  onClick={() => setDeleteDraftDialogOpen(true)}
                  disabled={deleteDraftOrderMutation.isPending}
                >
                  {deleteDraftOrderMutation.isPending ? 'Deleting...' : 'Delete draft'}
                </AppButton>
              ) : null}

              <AppButton type="button" variant="secondary" onClick={clearOrder}>
                Clear cart
              </AppButton>
            </div>

            {createOrderMutation.isError ? (
              <p style={{ color: 'crimson', marginTop: 12 }}>Could not create order.</p>
            ) : null}

            {updateDraftOrderMutation.isError ? (
              <p style={{ color: 'crimson', marginTop: 12 }}>
                Could not save draft changes.
              </p>
            ) : null}

            {deleteDraftOrderMutation.isError ? (
              <p style={{ color: 'crimson', marginTop: 12 }}>Could not delete draft.</p>
            ) : null}
          </div>
        )}
      </AppCard>
      <ConfirmDialog
        open={deleteDraftDialogOpen}
        title="Delete this draft?"
        description="This draft will be permanently removed from the current mock workflow."
        confirmLabel="Delete draft"
        cancelLabel="Keep draft"
        confirmVariant="danger"
        isLoading={deleteDraftOrderMutation.isPending}
        onConfirm={() => {
          if (editingDraftOrderId) {
            deleteDraftOrderMutation.mutate(editingDraftOrderId);
          }
        }}
        onCancel={() => setDeleteDraftDialogOpen(false)}
      />
    </>
  );
}
