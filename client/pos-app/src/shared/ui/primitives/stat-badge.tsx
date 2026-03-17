import { tokens } from '../../../app/theme/tokens';

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
        gap: tokens.spacing.xs,
        padding: '10px 12px',
        borderRadius: tokens.radius.md,
        border: `1px solid ${tokens.colors.border}`,
        background: tokens.colors.surfaceAlt,
        minWidth: 120
      }}
    >
      <span
        style={{
          fontSize: tokens.typography.caption,
          color: tokens.colors.textMuted
        }}
      >
        {label}
      </span>

      <strong style={{ fontSize: tokens.typography.body }}>{value}</strong>
    </div>
  );
}
