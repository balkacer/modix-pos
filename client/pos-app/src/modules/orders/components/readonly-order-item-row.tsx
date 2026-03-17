import { OrderResponseItemDto } from '@modix/pkgs/contracts';
import { tokens } from '../../../app/theme/tokens';

interface ReadonlyOrderItemRowProps {
  item: OrderResponseItemDto;
}

export function ReadonlyOrderItemRow({ item }: ReadonlyOrderItemRowProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: tokens.spacing.sm,
        paddingBottom: tokens.spacing.sm,
        borderBottom: `1px dashed ${tokens.colors.border}`
      }}
    >
      <div>
        <div
          style={{
            fontWeight: 700,
            color: tokens.colors.text,
            lineHeight: 1.2
          }}
        >
          {item.productNameSnapshot}
        </div>

        <div
          style={{
            marginTop: 4,
            color: tokens.colors.textMuted,
            fontSize: tokens.typography.caption
          }}
        >
          {item.quantity} x RD$ {item.unitPriceSnapshot.toFixed(2)}
        </div>
      </div>

      <strong
        style={{
          color: tokens.colors.text,
          alignSelf: 'start'
        }}
      >
        RD$ {item.subtotal.toFixed(2)}
      </strong>
    </div>
  );
}
