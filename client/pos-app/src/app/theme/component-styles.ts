import { CSSProperties } from 'react';
import { tokens } from './tokens';

export const componentStyles = {
  card: {
    background: tokens.colors.surface,
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: tokens.radius.lg,
    boxShadow: tokens.shadows.md,
    padding: tokens.spacing.lg
  } satisfies CSSProperties,

  input: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: tokens.radius.md,
    border: `1px solid ${tokens.colors.borderStrong}`,
    background: tokens.colors.surface,
    color: tokens.colors.text,
    outline: 'none',
    fontSize: tokens.typography.body
  } satisfies CSSProperties,

  label: {
    fontWeight: 600,
    fontSize: tokens.typography.label,
    color: tokens.colors.text
  } satisfies CSSProperties,

  buttonBase: {
    padding: '12px 14px',
    borderRadius: tokens.radius.md,
    fontWeight: 700,
    fontSize: tokens.typography.body,
    cursor: 'pointer',
    transition: 'all 120ms ease'
  } satisfies CSSProperties,

  buttonPrimary: {
    background: tokens.colors.primary,
    color: '#ffffff',
    border: `1px solid ${tokens.colors.primary}`
  } satisfies CSSProperties,

  buttonSecondary: {
    background: tokens.colors.surface,
    color: tokens.colors.text,
    border: `1px solid ${tokens.colors.borderStrong}`
  } satisfies CSSProperties,

  buttonDanger: {
    background: tokens.colors.dangerSolid,
    color: '#ffffff',
    border: `1px solid ${tokens.colors.dangerSolid}`
  } satisfies CSSProperties
};
