interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div
      style={{
        padding: 24,
        border: '1px dashed #d1d5db',
        borderRadius: 16,
        textAlign: 'center',
        background: '#fafafa'
      }}
    >
      <strong style={{ display: 'block', marginBottom: 8 }}>{title}</strong>
      {description ? <p style={{ margin: 0, color: '#6b7280' }}>{description}</p> : null}
    </div>
  );
}
