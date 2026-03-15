import { SelectHTMLAttributes } from 'react';

interface AppSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export function AppSelect({ label, id, children, style, ...props }: AppSelectProps) {
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <label htmlFor={id} style={{ fontWeight: 500 }}>
        {label}
      </label>
      <select
        id={id}
        {...props}
        style={{
          width: '100%',
          padding: 12,
          borderRadius: 12,
          border: '1px solid #d1d5db',
          outline: 'none',
          background: '#fff',
          ...style
        }}
      >
        {children}
      </select>
    </div>
  );
}
