import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { OrderResponseDto, OrderStatus } from '@modix/pkgs/contracts';
import { getOrders } from '../api/get-orders';
import { useSalesStore } from '../store/sales.store';
import { useOrderStore } from '../../orders/store/order.store';
import { useOrderMetaStore } from '../../orders/store/order-meta.store';
import { AppButton } from '../../../shared/ui/primitives/app-button';
import { AppCard } from '../../../shared/ui/primitives/app-card';
import { EmptyState } from '../../../shared/ui/primitives/empty-state';
import { StatusPill } from '../../../shared/ui/primitives/status-pill';

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
  const clearOrder = useOrderStore((state) => state.clearOrder);
  const hydrateFromDraftOrder = useOrderStore((state) => state.hydrateFromDraftOrder);
  const setConsumptionType = useOrderMetaStore((state) => state.setConsumptionType);
  const setEditingDraftOrderId = useSalesStore((state) => state.setEditingDraftOrderId);

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

  return (
    <AppCard
      title="Active Orders"
      subtitle="Resume and monitor orders currently in progress"
    >
      {ordersQuery.isPending ? <p>Loading active orders...</p> : null}

      {ordersQuery.isError ? (
        <EmptyState
          title="Could not load active orders"
          description="Please verify the sales API connection."
        />
      ) : null}

      {!ordersQuery.isPending && !ordersQuery.isError && activeOrders.length === 0 ? (
        <EmptyState
          title="No active orders"
          description="Orders in draft, pending payment, paid, packing or ready will appear here."
        />
      ) : null}

      <div style={{ display: 'grid', gap: 12 }}>
        {activeOrders.map((order) => (
          <ActiveOrderRow
            key={order.id}
            order={order}
            onSelect={() => handleLoadOrder(order)}
          />
        ))}
      </div>
    </AppCard>
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
        border: '1px solid #e5e7eb',
        borderRadius: 14,
        padding: 14,
        display: 'grid',
        gap: 10,
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
            {order.consumptionType.replaceAll('_', ' ')}
          </div>
        </div>

        <StatusPill value={order.status} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ color: '#374151' }}>{order.items.length} item(s)</span>
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
