import { PropsWithChildren } from 'react';

interface AppCardProps extends PropsWithChildren {
  title?: string;
  subtitle?: string;
}

export function AppCard({ title, subtitle, children }: AppCardProps) {
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
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 18 }}>{title}</h2>
          {subtitle ? (
            <p style={{ margin: '6px 0 0', color: '#6b7280' }}>{subtitle}</p>
          ) : null}
        </div>
      ) : null}

      {children}
    </section>
  );
}
