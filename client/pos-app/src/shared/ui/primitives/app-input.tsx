import { InputHTMLAttributes } from 'react';

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function AppInput({ label, id, style, ...props }: AppInputProps) {
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <label htmlFor={id} style={{ fontWeight: 500 }}>
        {label}
      </label>
      <input
        id={id}
        {...props}
        style={{
          width: '100%',
          padding: 12,
          borderRadius: 12,
          border: '1px solid #d1d5db',
          outline: 'none',
          ...style
        }}
      />
    </div>
  );
}
