import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { OrderResponseDto, OrderStatus } from '@modix/pkgs/contracts';
import { tokens } from '../../../app/theme/tokens';
import { AppButton } from '../../../shared/ui/primitives/app-button';
import { EmptyState } from '../../../shared/ui/primitives/empty-state';
import { StatusPill } from '../../../shared/ui/primitives/status-pill';
import { useOrderMetaStore } from '../../orders/store/order-meta.store';
import { useOrderStore } from '../../orders/store/order.store';
import { getOrders } from '../api/get-orders';
import { useSalesStore } from '../store/sales.store';

const ACTIVE_ORDER_STATUSES: OrderStatus[] = [
  OrderStatus.DRAFT,
  OrderStatus.PENDING_PAYMENT,
  OrderStatus.PAID,
  OrderStatus.PACKING,
  OrderStatus.READY
];

export function ActiveOrdersPanel() {
  const setActiveOrder = useSalesStore((state) => state.setActiveOrder);
  const clearActiveOrder = useSalesStore((state) => state.clearActiveOrder);
  const setEditingDraftOrderId = useSalesStore((state) => state.setEditingDraftOrderId);

  const clearOrder = useOrderStore((state) => state.clearOrder);
  const hydrateFromDraftOrder = useOrderStore((state) => state.hydrateFromDraftOrder);
  const setConsumptionType = useOrderMetaStore((state) => state.setConsumptionType);

  const ordersQuery = useQuery({
    queryKey: ['sales-orders'],
    queryFn: getOrders,
    refetchInterval: 5000
  });

  const activeOrders = useMemo(() => {
    return (ordersQuery.data ?? []).filter((order) =>
      ACTIVE_ORDER_STATUSES.includes(order.status)
    );
  }, [ordersQuery.data]);

  const handleLoadOrder = (order: OrderResponseDto): void => {
    if (order.status === OrderStatus.DRAFT) {
      clearActiveOrder();
      setEditingDraftOrderId(order.id);
      hydrateFromDraftOrder({
        items: order.items.map((item) => ({
          productId: item.productId,
          productCode: item.productCodeSnapshot,
          productName: item.productNameSnapshot,
          unitPrice: item.unitPriceSnapshot,
          quantity: item.quantity,
          subtotal: item.subtotal
        })),
        notes: order.notes
      });
      setConsumptionType(order.consumptionType);
      return;
    }

    setEditingDraftOrderId(null);
    clearOrder();
    setActiveOrder(order);
  };

  if (ordersQuery.isPending) {
    return <p>Loading active orders...</p>;
  }

  if (ordersQuery.isError) {
    return (
      <EmptyState
        title="Could not load active orders"
        description="Please verify the sales API connection."
      />
    );
  }

  if (activeOrders.length === 0) {
    return (
      <EmptyState
        title="No active orders"
        description="Orders in draft, pending payment, paid, packing or ready will appear here."
      />
    );
  }

  return (
    <div style={{ display: 'grid', gap: tokens.spacing.md }}>
      {activeOrders.map((order) => (
        <ActiveOrderRow
          key={order.id}
          order={order}
          onSelect={() => handleLoadOrder(order)}
        />
      ))}
    </div>
  );
}

interface ActiveOrderRowProps {
  order: OrderResponseDto;
  onSelect: () => void;
}

function ActiveOrderRow({ order, onSelect }: ActiveOrderRowProps) {
  return (
    <div
      style={{
        border: `1px solid ${tokens.colors.border}`,
        borderRadius: tokens.radius.md,
        padding: tokens.spacing.md,
        display: 'grid',
        gap: tokens.spacing.sm,
        background: tokens.colors.surfaceAlt
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          gap: tokens.spacing.md
        }}
      >
        <div>
          <strong>{order.orderNumber}</strong>
          <div
            style={{
              color: tokens.colors.textMuted,
              fontSize: tokens.typography.caption,
              marginTop: 4,
              textTransform: 'capitalize'
            }}
          >
            {order.consumptionType.replaceAll('_', ' ')}
          </div>
        </div>

        <StatusPill value={order.status} />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: tokens.spacing.md,
          color: tokens.colors.text
        }}
      >
        <span>{order.items.length} item(s)</span>
        <strong>RD$ {order.total.toFixed(2)}</strong>
      </div>

      <div>
        <AppButton type="button" variant="secondary" onClick={onSelect}>
          {order.status === OrderStatus.DRAFT ? 'Edit draft' : 'Load order'}
        </AppButton>
      </div>
    </div>
  );
}
