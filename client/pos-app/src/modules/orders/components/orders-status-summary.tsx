import { OrderResponseDto, OrderStatus } from '@modix/pkgs/contracts';
import { tokens } from '../../../app/theme/tokens';
import { useOrdersWorkspaceStore } from '../store/orders-workspace.store';

const statusCards: Array<{ label: string; value: OrderStatus | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'Draft', value: OrderStatus.DRAFT },
  { label: 'Pending Payment', value: OrderStatus.PENDING_PAYMENT },
  { label: 'Paid', value: OrderStatus.PAID },
  { label: 'Packing', value: OrderStatus.PACKING },
  { label: 'Ready', value: OrderStatus.READY },
  { label: 'Delivered', value: OrderStatus.DELIVERED },
  { label: 'Cancelled', value: OrderStatus.CANCELLED },
  { label: 'Rejected', value: OrderStatus.REJECTED }
];

interface OrdersStatusSummaryProps {
  orders: OrderResponseDto[];
}

export function OrdersStatusSummary({ orders }: OrdersStatusSummaryProps) {
  const selectedStatus = useOrdersWorkspaceStore((state) => state.selectedStatus);
  const setSelectedStatus = useOrdersWorkspaceStore((state) => state.setSelectedStatus);

  const getCount = (status: OrderStatus | 'all'): number => {
    if (status === 'all') {
      return orders.length;
    }

    return orders.filter((order) => order.status === status).length;
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: tokens.spacing.md
      }}
    >
      {statusCards.map((statusCard) => {
        const isActive = selectedStatus === statusCard.value;

        return (
          <button
            key={statusCard.value}
            type="button"
            onClick={() => setSelectedStatus(statusCard.value)}
            style={{
              padding: tokens.spacing.md,
              borderRadius: tokens.radius.lg,
              border: `1px solid ${
                isActive ? tokens.colors.primary : tokens.colors.border
              }`,
              background: isActive ? tokens.colors.primary : tokens.colors.surface,
              color: isActive ? '#ffffff' : tokens.colors.text,
              textAlign: 'left',
              cursor: 'pointer',
              display: 'grid',
              gap: 6
            }}
          >
            <span
              style={{
                fontSize: tokens.typography.caption,
                opacity: isActive ? 0.85 : 0.7
              }}
            >
              {statusCard.label}
            </span>

            <strong style={{ fontSize: 22 }}>{getCount(statusCard.value)}</strong>
          </button>
        );
      })}
    </div>
  );
}
