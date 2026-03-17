import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ConsumptionType, OrderSource } from '@modix/pkgs/contracts';
import { tokens } from '../../../app/theme/tokens';
import { ConfirmDialog } from '../../../shared/ui/feedback/confirm-dialog';
import { AppButton } from '../../../shared/ui/primitives/app-button';
import { AppInput } from '../../../shared/ui/primitives/app-input';
import { EmptyState } from '../../../shared/ui/primitives/empty-state';
import { StatusPill } from '../../../shared/ui/primitives/status-pill';
import { TicketPanel } from '../../../shared/ui/patterns/ticket-panel';
import { useAuthStore } from '../../auth/store/auth.store';
import { useShiftStore } from '../../business/store/shift.store';
import { PaymentDialog } from '../../payments/components/payment-dialog';
import { deleteDraftOrder } from '../../sales/api/delete-draft-order';
import { createOrder } from '../../sales/api/create-order';
import { updateDraftOrder } from '../../sales/api/update-draft-order';
import { useSalesStore } from '../../sales/store/sales.store';
import { CurrentOrderActions } from './current-order-actions';
import { EditableOrderItemRow } from './editable-order-item-row';
import { ReadonlyOrderItemRow } from './readonly-order-item-row';
import { useOrderMetaStore } from '../store/order-meta.store';
import { useOrderStore } from '../store/order.store';
import { AppSelect } from '../../../shared/ui/primitives/app-select';

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
  const setConsumptionType = useOrderMetaStore((state) => state.setConsumptionType);

  const [deleteDraftDialogOpen, setDeleteDraftDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

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

  const isEditingDraft = Boolean(editingDraftOrderId);

  return (
    <>
      <div style={{ height: '100%', minHeight: 0 }}>
        <TicketPanel
          title="Current Order"
          subtitle={
            isEditingDraft
              ? `Editing draft ${editingDraftOrderId}`
              : activeOrder
                ? activeOrder.orderNumber
                : 'Build the current ticket'
          }
          rightSlot={activeOrder ? <StatusPill value={activeOrder.status} /> : undefined}
        >
          {activeOrder ? (
            <div style={{ display: 'grid', gap: tokens.spacing.lg }}>
              <TicketMetaRow
                leftLabel="Consumption"
                leftValue={activeOrder.consumptionType.replaceAll('_', ' ')}
                rightLabel="Items"
                rightValue={String(activeOrder.items.length)}
              />

              <div style={{ display: 'grid', gap: tokens.spacing.sm }}>
                {activeOrder.items.map((item) => (
                  <ReadonlyOrderItemRow key={item.id} item={item} />
                ))}
              </div>

              <TicketTotalRow total={activeOrder.total} />

              {activeOrder.notes ? <TicketInfoLine label="Notes" value={activeOrder.notes} /> : null}

              {activeOrder.lastPaymentMethod ? (
                <TicketInfoLine
                  label="Payment"
                  value={
                    activeOrder.lastPaymentReference
                      ? `${activeOrder.lastPaymentMethod} · Ref: ${activeOrder.lastPaymentReference}`
                      : activeOrder.lastPaymentMethod
                  }
                />
              ) : null}

              <CurrentOrderActions
                activeOrder={activeOrder}
                onOpenPayment={() => setPaymentDialogOpen(true)}
              />
            </div>
          ) : items.length === 0 ? (
            <EmptyState
              title="No products added yet"
              description="Select products from the catalog to build the order."
            />
          ) : (
            <div style={{ display: 'grid', gap: tokens.spacing.lg }}>
              <div
                style={{
                  display: 'grid',
                  gap: tokens.spacing.md,
                  paddingBottom: tokens.spacing.sm,
                  borderBottom: `1px solid ${tokens.colors.border}`
                }}
              >
                <AppSelect
                  id="consumptionType"
                  label="Consumption type"
                  value={consumptionType}
                  onChange={(event) => setConsumptionType(event.target.value as ConsumptionType)}
                >
                  <option value={ConsumptionType.PICKUP}>Pickup</option>
                  <option value={ConsumptionType.TAKEAWAY}>Takeaway</option>
                  <option value={ConsumptionType.DINE_IN}>Dine in</option>
                  <option value={ConsumptionType.DELIVERY}>Delivery</option>
                </AppSelect>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.md
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: tokens.typography.caption,
                        color: tokens.colors.textMuted
                      }}
                    >
                      Items
                    </div>
                    <div style={{ fontWeight: 700 }}>{items.length}</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gap: tokens.spacing.sm }}>
                {items.map((item) => (
                  <EditableOrderItemRow
                    key={item.productId}
                    item={item}
                    onDecrease={() => decreaseQuantity(item.productId)}
                    onIncrease={() => increaseQuantity(item.productId)}
                  />
                ))}
              </div>

              <AppInput
                id="orderNotes"
                label="Order notes"
                placeholder="Special instructions, internal notes, etc."
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />

              <TicketTotalRow total={total} />

              <div style={{ display: 'flex', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
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
                <p style={{ color: tokens.colors.dangerText }}>Could not create order.</p>
              ) : null}

              {updateDraftOrderMutation.isError ? (
                <p style={{ color: tokens.colors.dangerText }}>
                  Could not save draft changes.
                </p>
              ) : null}

              {deleteDraftOrderMutation.isError ? (
                <p style={{ color: tokens.colors.dangerText }}>Could not delete draft.</p>
              ) : null}
            </div>
          )}
        </TicketPanel>
      </div>

      <ConfirmDialog
        open={deleteDraftDialogOpen}
        title="Delete this draft?"
        description="This draft will be permanently removed from the current workflow."
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

      <PaymentDialog open={paymentDialogOpen} onClose={() => setPaymentDialogOpen(false)} />
    </>
  );
}

function TicketMetaRow({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue
}: {
  leftLabel: string;
  leftValue: string;
  rightLabel: string;
  rightValue: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: tokens.spacing.md,
        paddingBottom: tokens.spacing.sm,
        borderBottom: `1px solid ${tokens.colors.border}`
      }}
    >
      <div>
        <div style={{ fontSize: tokens.typography.caption, color: tokens.colors.textMuted }}>
          {leftLabel}
        </div>
        <div style={{ fontWeight: 700, textTransform: 'capitalize' }}>{leftValue}</div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: tokens.typography.caption, color: tokens.colors.textMuted }}>
          {rightLabel}
        </div>
        <div style={{ fontWeight: 700 }}>{rightValue}</div>
      </div>
    </div>
  );
}

function TicketTotalRow({ total }: { total: number }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: tokens.spacing.sm,
        borderTop: `2px solid ${tokens.colors.borderStrong}`
      }}
    >
      <strong style={{ fontSize: 16 }}>Total</strong>
      <strong style={{ fontSize: 22, color: tokens.colors.text }}>
        RD$ {total.toFixed(2)}
      </strong>
    </div>
  );
}

function TicketInfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        padding: tokens.spacing.sm,
        borderRadius: tokens.radius.sm,
        background: tokens.colors.surfaceAlt,
        fontSize: tokens.typography.caption,
        color: tokens.colors.text
      }}
    >
      <strong>{label}:</strong> {value}
    </div>
  );
}