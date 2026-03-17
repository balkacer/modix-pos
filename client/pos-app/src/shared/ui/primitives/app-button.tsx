import { ButtonHTMLAttributes, CSSProperties, PropsWithChildren } from 'react';
import { componentStyles } from '../../../app/theme/component-styles';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface AppButtonProps extends PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const getVariantStyles = (variant: ButtonVariant): CSSProperties => {
  switch (variant) {
    case 'secondary':
      return componentStyles.buttonSecondary;
    case 'danger':
      return componentStyles.buttonDanger;
    case 'primary':
    default:
      return componentStyles.buttonPrimary;
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
        ...componentStyles.buttonBase,
        ...getVariantStyles(variant),
        width: fullWidth ? '100%' : undefined,
        opacity: props.disabled ? 0.6 : 1,
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        ...style
      }}
    >
      {children}
    </button>
  );
}
