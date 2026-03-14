import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface AppButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const getVariantStyles = (variant: ButtonVariant): React.CSSProperties => {
  switch (variant) {
    case 'secondary':
      return {
        background: '#ffffff',
        color: '#111827',
        border: '1px solid #d1d5db'
      };
    case 'danger':
      return {
        background: '#b91c1c',
        color: '#ffffff',
        border: '1px solid #991b1b'
      };
    case 'primary':
    default:
      return {
        background: '#111827',
        color: '#ffffff',
        border: '1px solid #111827'
      };
  }
};

export function AppButton({
  children,
  variant = 'primary',
  fullWidth = false,
  style,
  ...props
}: AppButtonProps) {
  return (
    <button
      {...props}
      style={{
        padding: '12px 14px',
        borderRadius: 12,
        fontWeight: 600,
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        width: fullWidth ? '100%' : undefined,
        opacity: props.disabled ? 0.6 : 1,
        ...getVariantStyles(variant),
        ...style
      }}
    >
      {children}
    </button>
  );
}