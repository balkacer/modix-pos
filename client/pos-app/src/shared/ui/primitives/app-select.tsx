import { SelectHTMLAttributes } from 'react';
import { componentStyles } from '../../../app/theme/component-styles';
import { tokens } from '../../../app/theme/tokens';

interface AppSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export function AppSelect({
  label,
  id,
  children,
  style,
  ...props
}: AppSelectProps) {
  const selectId = id ?? `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div style={{ display: 'grid', gap: tokens.spacing.sm }}>
      <label htmlFor={selectId} style={componentStyles.label}>
        {label}
      </label>

      <select
        id={selectId}
        aria-label={label}
        title={label}
        {...props}
        style={{
          ...componentStyles.input,
          background: '#fff',
          ...style
        }}
      >
        {children}
      </select>
    </div>
  );
}