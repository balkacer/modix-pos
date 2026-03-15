import { PropsWithChildren } from 'react';

interface PanelProps extends PropsWithChildren {
  title?: string;
}

export function Panel({ title, children }: PanelProps) {
  return (
    <section
      style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 16,
        padding: 16,
        boxShadow: '0 6px 20px rgba(0,0,0,0.05)'
      }}
    >
      {title ? (
        <h2
          style={{
            marginTop: 0,
            marginBottom: 16,
            fontSize: 18
          }}
        >
          {title}
        </h2>
      ) : null}

      {children}
    </section>
  );
}
