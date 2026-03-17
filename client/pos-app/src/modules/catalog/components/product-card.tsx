import { ProductResponseDto } from '@modix/pkgs/contracts';
import { tokens } from '../../../app/theme/tokens';

interface ProductCardProps {
  product: ProductResponseDto;
  disabled?: boolean;
  onClick: () => void;
}

export function ProductCard({
  product,
  disabled = false,
  onClick
}: ProductCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        textAlign: 'left',
        padding: tokens.spacing.lg,
        borderRadius: tokens.radius.lg,
        border: `1px solid ${tokens.colors.border}`,
        background: tokens.colors.surface,
        cursor: disabled ? 'not-allowed' : 'pointer',
        minHeight: 148,
        opacity: disabled ? 0.6 : 1,
        boxShadow: tokens.shadows.sm,
        display: 'grid',
        gap: tokens.spacing.sm,
        position: 'relative',
        transition: 'transform 120ms ease, box-shadow 120ms ease'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          borderRadius: tokens.radius.md,
          position: 'absolute',
          right: 0
        }}
      >
        <div style={{
          background: tokens.colors.successBg,
          padding: '4px',
          borderRadius: tokens.radius.md,
        }}></div>
      </div>

      <div
        style={{
          fontWeight: 800,
          fontSize: 16,
          color: tokens.colors.text,
          lineHeight: 1.25,
          textOverflow: 'ellipsis',
        }}
      >
        {product.name}
      </div>

      <div
        style={{
          color: tokens.colors.textMuted,
          fontSize: tokens.typography.caption,
          fontStyle: 'italic'
        }}
      >
        {product.code}
      </div>

      <div
        style={{
          marginTop: 'auto',
          color: tokens.colors.successText,
          fontWeight: 800,
          fontSize: 16
        }}
      >
        RD$ {product.price.toFixed(2)}
      </div>
    </button>
  );
}