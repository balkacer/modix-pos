import { OrderResponseDto, OrderStatus } from '@modix/pkgs/contracts';
import { tokens } from '../../../app/theme/tokens';
import { AppButton } from '../../../shared/ui/primitives/app-button';
import { StatusPill } from '../../../shared/ui/primitives/status-pill';

interface OrdersListItemProps {
  order: OrderResponseDto;
  onOpen: () => void;
}

export function OrdersListItem({ order, onOpen }: OrdersListItemProps) {
  const actionLabel = order.status === OrderStatus.DRAFT ? 'Edit draft' : 'Open order';

  return (
    <div
      style={{
        display: 'grid',
        gap: tokens.spacing.md,
        padding: tokens.spacing.lg,
        background: tokens.colors.surface,
        border: `1px solid ${tokens.colors.border}`,
        borderRadius: tokens.radius.lg,
        boxShadow: tokens.shadows.sm
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: tokens.spacing.md,
          alignItems: 'start',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'grid', gap: 6 }}>
          <strong
            style={{
              fontSize: 16,
              color: tokens.colors.text
            }}
          >
            {order.orderNumber}
          </strong>

          <div
            style={{
              display: 'flex',
              gap: tokens.spacing.md,
              flexWrap: 'wrap',
              color: tokens.colors.textMuted,
              fontSize: tokens.typography.caption
            }}
          >
            <span style={{ textTransform: 'capitalize' }}>
              {order.consumptionType.replaceAll('_', ' ')}
            </span>
            <span>{order.items.length} item(s)</span>
            <span>RD$ {order.total.toFixed(2)}</span>
          </div>
        </div>

        <StatusPill value={order.status} />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: tokens.spacing.md,
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        <div
          style={{
            color: tokens.colors.textMuted,
            fontSize: tokens.typography.caption
          }}
        >
          Shift: {order.cashShiftId}
        </div>

        <AppButton type="button" variant="secondary" onClick={onOpen}>
          {actionLabel}
        </AppButton>
      </div>
    </div>
  );
}
