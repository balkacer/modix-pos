import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { tokens } from '../../../app/theme/tokens';
import { EmptyState } from '../../../shared/ui/primitives/empty-state';
import { useShiftStore } from '../../business/store/shift.store';
import { useOrdersWorkspaceStore } from '../store/orders-workspace.store';
import { useOrderDetailDrawerStore } from '../store/order-detail-drawer.store';
import { getOrders } from '../../sales/api/get-orders';
import { OrdersListItem } from './orders-list-item';

export function OrdersList() {
  const activeShift = useShiftStore((state) => state.activeShift);
  const openOrderDetail = useOrderDetailDrawerStore((state) => state.openOrderDetail);

  const searchTerm = useOrdersWorkspaceStore((state) => state.searchTerm);
  const selectedStatus = useOrdersWorkspaceStore((state) => state.selectedStatus);
  const onlyCurrentShift = useOrdersWorkspaceStore((state) => state.onlyCurrentShift);

  const ordersQuery = useQuery({
    queryKey: ['orders-workspace-list'],
    queryFn: getOrders,
    refetchInterval: 5000
  });

  const filteredOrders = useMemo(() => {
    const orders = ordersQuery.data ?? [];
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus =
        selectedStatus === 'all' ? true : order.status === selectedStatus;

      const matchesSearch = normalizedSearch
        ? order.orderNumber.toLowerCase().includes(normalizedSearch)
        : true;

      const matchesShift = onlyCurrentShift ? order.cashShiftId === activeShift?.id : true;

      return matchesStatus && matchesSearch && matchesShift;
    });
  }, [ordersQuery.data, searchTerm, selectedStatus, onlyCurrentShift, activeShift?.id]);

  if (ordersQuery.isPending) {
    return <p>Loading orders...</p>;
  }

  if (ordersQuery.isError) {
    return (
      <EmptyState
        title="Could not load orders"
        description="Please verify the sales API connection."
      />
    );
  }

  if (filteredOrders.length === 0) {
    return (
      <EmptyState
        title="No matching orders"
        description="Try another search term or status filter."
      />
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gap: tokens.spacing.md
      }}
    >
      {filteredOrders.map((order) => (
        <OrdersListItem
          key={order.id}
          order={order}
          onOpen={() => openOrderDetail(order)}
        />
      ))}
    </div>
  );
}