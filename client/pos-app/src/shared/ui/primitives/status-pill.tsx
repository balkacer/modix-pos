interface StatusPillProps {
  value: string;
}

const getStatusStyles = (value: string): React.CSSProperties => {
  switch (value) {
    case 'paid':
    case 'ready':
    case 'delivered':
    case 'open':
      return { background: '#dcfce7', color: '#166534' };
    case 'pending_payment':
    case 'packing':
      return { background: '#fef3c7', color: '#92400e' };
    case 'rejected':
    case 'cancelled':
      return { background: '#fee2e2', color: '#991b1b' };
    default:
      return { background: '#e5e7eb', color: '#374151' };
  }
};

export function StatusPill({ value }: StatusPillProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 10px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        textTransform: 'capitalize',
        ...getStatusStyles(value)
      }}
    >
      {value.replaceAll('_', ' ')}
    </span>
  );
}