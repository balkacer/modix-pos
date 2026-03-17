import { InputHTMLAttributes } from 'react';
import { componentStyles } from '../../../app/theme/component-styles';
import { tokens } from '../../../app/theme/tokens';

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function AppInput({ label, id, style, ...props }: AppInputProps) {
  return (
    <div style={{ display: 'grid', gap: tokens.spacing.sm }}>
      <label htmlFor={id} style={componentStyles.label}>
        {label}
      </label>

      <input id={id} {...props} style={{ ...componentStyles.input, ...style }} />
    </div>
  );
}
