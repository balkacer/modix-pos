interface StatBadgeProps {
  label: string;
  value: string;
}

export function StatBadge({ label, value }: StatBadgeProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 4,
        padding: '10px 12px',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        background: '#f9fafb',
        minWidth: 110
      }}
    >
      <span style={{ fontSize: 12, color: '#6b7280' }}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
