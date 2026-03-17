import { CSSProperties } from 'react';
import { tokens } from '../../../app/theme/tokens';

interface StatusPillProps {
  value: string;
}

const getStatusStyles = (value: string): CSSProperties => {
  switch (value) {
    case 'paid':
    case 'ready':
    case 'delivered':
    case 'open':
      return {
        background: tokens.colors.successBg,
        color: tokens.colors.successText
      };
    case 'pending_payment':
    case 'packing':
      return {
        background: tokens.colors.warningBg,
        color: tokens.colors.warningText
      };
    case 'rejected':
    case 'cancelled':
      return {
        background: tokens.colors.dangerBg,
        color: tokens.colors.dangerText
      };
    default:
      return {
        background: tokens.colors.surfaceAlt,
        color: tokens.colors.text
      };
  }
};

export function StatusPill({ value }: StatusPillProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 10px',
        borderRadius: tokens.radius.pill,
        fontSize: tokens.typography.caption,
        fontWeight: 800,
        textTransform: 'capitalize',
        ...getStatusStyles(value)
      }}
    >
      {value.replaceAll('_', ' ')}
    </span>
  );
}
