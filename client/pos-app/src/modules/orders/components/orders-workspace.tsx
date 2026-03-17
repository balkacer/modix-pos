import { useQuery } from '@tanstack/react-query';
import { tokens } from '../../../app/theme/tokens';
import { WorkspaceSection } from '../../../shared/ui/patterns/workspace-section';
import { EmptyState } from '../../../shared/ui/primitives/empty-state';
import { getOrders } from '../../sales/api/get-orders';
import { OrderDetailDrawer } from './order-detail-drawer';
import { OrdersFiltersBar } from './orders-filters-bar';
import { OrdersList } from './orders-list';
import { OrdersStatusSummary } from './orders-status-summary';

export function OrdersWorkspace() {
  const ordersQuery = useQuery({
    queryKey: ['orders-workspace-summary'],
    queryFn: getOrders,
    refetchInterval: 5000
  });

  return (
    <>
      <div
        style={{
          display: 'grid',
          gap: tokens.spacing.xl
        }}
      >
        <WorkspaceSection
          title="Orders"
          subtitle="Search, filter and inspect operational orders"
        >
          <div
            style={{
              display: 'grid',
              gap: tokens.spacing.xl
            }}
          >
            {ordersQuery.isPending ? <p>Loading order summary...</p> : null}

            {ordersQuery.isError ? (
              <EmptyState
                title="Could not load order summary"
                description="Please verify the sales API connection."
              />
            ) : null}

            {ordersQuery.data ? <OrdersStatusSummary orders={ordersQuery.data} /> : null}

            <OrdersFiltersBar />
            <OrdersList />
          </div>
        </WorkspaceSection>
      </div>

      <OrderDetailDrawer />
    </>
  );
}
