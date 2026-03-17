import { tokens } from '../../../app/theme/tokens';
import { AppButton } from '../../../shared/ui/primitives/app-button';
import { CurrentOrderItem } from '../store/order.store';

interface EditableOrderItemRowProps {
  item: CurrentOrderItem;
  onIncrease: () => void;
  onDecrease: () => void;
}

export function EditableOrderItemRow({
  item,
  onIncrease,
  onDecrease
}: EditableOrderItemRowProps) {
  return (
    <div
      style={{
        display: 'grid',
        gap: tokens.spacing.sm,
        paddingBottom: tokens.spacing.md,
        borderBottom: `1px dashed ${tokens.colors.border}`
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: tokens.spacing.md,
          alignItems: 'start'
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
            {item.productName}
          </div>

          <div
            style={{
              marginTop: 4,
              color: tokens.colors.textMuted,
              fontSize: tokens.typography.caption
            }}
          >
            RD$ {item.unitPrice.toFixed(2)} each
          </div>
        </div>

        <strong
          style={{
            minWidth: 92,
            textAlign: 'right',
            color: tokens.colors.text
          }}
        >
          RD$ {item.subtotal.toFixed(2)}
        </strong>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: tokens.spacing.sm
        }}
      >
        <AppButton type="button" variant="secondary" onClick={onDecrease}>
          -
        </AppButton>

        <div
          style={{
            minWidth: 36,
            textAlign: 'center',
            fontWeight: 800
          }}
        >
          {item.quantity}
        </div>

        <AppButton type="button" variant="secondary" onClick={onIncrease}>
          +
        </AppButton>
      </div>
    </div>
  );
}
