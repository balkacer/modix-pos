import { PropsWithChildren, ReactNode } from 'react';
import { tokens } from '../../../app/theme/tokens';

interface TicketPanelProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  rightSlot?: ReactNode;
}

export function TicketPanel({ title, subtitle, rightSlot, children }: TicketPanelProps) {
  return (
    <section
      style={{
        background: tokens.colors.surface,
        border: `1px solid ${tokens.colors.border}`,
        borderRadius: tokens.radius.lg,
        boxShadow: tokens.shadows.md,
        overflow: 'hidden',
        height: '100%',
        minHeight: 0,
        display: 'grid',
        gridTemplateRows: 'auto 1fr'
      }}
    >
      <div
        style={{
          padding: tokens.spacing.lg,
          borderBottom: `1px solid ${tokens.colors.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          gap: tokens.spacing.md
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: tokens.typography.section,
              color: tokens.colors.text
            }}
          >
            {title}
          </h2>

          {subtitle ? (
            <p
              style={{
                margin: '6px 0 0',
                color: tokens.colors.textMuted,
                fontSize: tokens.typography.subtitle
              }}
            >
              {subtitle}
            </p>
          ) : null}
        </div>

        {rightSlot}
      </div>

      <div
        style={{
          padding: tokens.spacing.lg,
          minHeight: 0,
          overflowY: 'auto'
        }}
      >
        {children}
      </div>
    </section>
  );
}
