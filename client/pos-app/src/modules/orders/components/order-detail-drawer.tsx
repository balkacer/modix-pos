import { OrderStatus } from '@modix/pkgs/contracts';
import { tokens } from '../../../app/theme/tokens';
import { DrawerPanel } from '../../../shared/ui/feedback/drawer-panel';
import { AppButton } from '../../../shared/ui/primitives/app-button';
import { StatusPill } from '../../../shared/ui/primitives/status-pill';
import { useOrderMetaStore } from '../store/order-meta.store';
import { useOrderStore } from '../store/order.store';
import { useOrderDetailDrawerStore } from '../store/order-detail-drawer.store';
import { useSalesStore } from '../../sales/store/sales.store';

export function OrderDetailDrawer() {
  const selectedOrder = useOrderDetailDrawerStore((state) => state.selectedOrder);
  const closeOrderDetail = useOrderDetailDrawerStore((state) => state.closeOrderDetail);

  const setActiveOrder = useSalesStore((state) => state.setActiveOrder);
  const clearActiveOrder = useSalesStore((state) => state.clearActiveOrder);
  const setEditingDraftOrderId = useSalesStore((state) => state.setEditingDraftOrderId);

  const clearOrder = useOrderStore((state) => state.clearOrder);
  const hydrateFromDraftOrder = useOrderStore((state) => state.hydrateFromDraftOrder);
  const setConsumptionType = useOrderMetaStore((state) => state.setConsumptionType);

  if (!selectedOrder) {
    return null;
  }

  const handleOpenInWorkspace = (): void => {
    if (selectedOrder.status === OrderStatus.DRAFT) {
      clearActiveOrder();
      setEditingDraftOrderId(selectedOrder.id);
      hydrateFromDraftOrder({
        items: selectedOrder.items.map((item) => ({
          productId: item.productId,
          productCode: item.productCodeSnapshot,
          productName: item.productNameSnapshot,
          unitPrice: item.unitPriceSnapshot,
          quantity: item.quantity,
          subtotal: item.subtotal
        })),
        notes: selectedOrder.notes
      });
      setConsumptionType(selectedOrder.consumptionType);
      closeOrderDetail();
      return;
    }

    setEditingDraftOrderId(null);
    clearOrder();
    setActiveOrder(selectedOrder);
    closeOrderDetail();
  };

  return (
    <DrawerPanel
      open={Boolean(selectedOrder)}
      onClose={closeOrderDetail}
      title={selectedOrder.orderNumber}
      subtitle="Order detail"
      rightSlot={<StatusPill value={selectedOrder.status} />}
    >
      <SectionCard>
        <MetaRow
          label="Consumption"
          value={selectedOrder.consumptionType.replaceAll('_', ' ')}
        />
        <MetaRow label="Shift" value={selectedOrder.cashShiftId} />
        <MetaRow label="Register" value={selectedOrder.cashRegisterId} />
        <MetaRow label="Items" value={String(selectedOrder.items.length)} />
      </SectionCard>

      <SectionCard title="Items">
        <div style={{ display: 'grid', gap: tokens.spacing.sm }}>
          {selectedOrder.items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: tokens.spacing.sm,
                paddingBottom: tokens.spacing.sm,
                borderBottom: `1px dashed ${tokens.colors.border}`
              }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>{item.productNameSnapshot}</div>
                <div
                  style={{
                    color: tokens.colors.textMuted,
                    fontSize: tokens.typography.caption
                  }}
                >
                  {item.quantity} x RD$ {item.unitPriceSnapshot.toFixed(2)}
                </div>
              </div>

              <strong>RD$ {item.subtotal.toFixed(2)}</strong>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Summary">
        <MetaRow label="Subtotal" value={`RD$ ${selectedOrder.subtotal.toFixed(2)}`} />
        <MetaRow label="Total" value={`RD$ ${selectedOrder.total.toFixed(2)}`} />
      </SectionCard>

      {selectedOrder.notes ? (
        <SectionCard title="Notes">
          <div style={{ color: tokens.colors.text }}>{selectedOrder.notes}</div>
        </SectionCard>
      ) : null}

      {selectedOrder.lastPaymentMethod ? (
        <SectionCard title="Payment">
          <MetaRow label="Method" value={selectedOrder.lastPaymentMethod} />
          {selectedOrder.lastPaymentReference ? (
            <MetaRow label="Reference" value={selectedOrder.lastPaymentReference} />
          ) : null}
        </SectionCard>
      ) : null}

      <div style={{ display: 'flex', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
        <AppButton type="button" onClick={handleOpenInWorkspace}>
          {selectedOrder.status === OrderStatus.DRAFT
            ? 'Edit draft in POS'
            : 'Open in POS'}
        </AppButton>

        <AppButton type="button" variant="secondary" onClick={closeOrderDetail}>
          Close
        </AppButton>
      </div>
    </DrawerPanel>
  );
}

function SectionCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: tokens.spacing.md,
        background: tokens.colors.surfaceAlt,
        border: `1px solid ${tokens.colors.border}`,
        borderRadius: tokens.radius.md,
        display: 'grid',
        gap: tokens.spacing.sm
      }}
    >
      {title ? (
        <div style={{ fontWeight: 800, color: tokens.colors.text }}>{title}</div>
      ) : null}

      {children}
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: tokens.spacing.md,
        color: tokens.colors.text
      }}
    >
      <span style={{ color: tokens.colors.textMuted }}>{label}</span>
      <strong style={{ textTransform: 'capitalize' }}>{value}</strong>
    </div>
  );
}
