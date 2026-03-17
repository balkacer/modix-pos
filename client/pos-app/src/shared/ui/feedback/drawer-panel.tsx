import { PropsWithChildren, ReactNode } from 'react';
import { X } from 'lucide-react';
import { tokens } from '../../../app/theme/tokens';

interface DrawerPanelProps extends PropsWithChildren {
  open: boolean;
  title: string;
  subtitle?: string;
  width?: number;
  onClose: () => void;
  rightSlot?: ReactNode;
}

export function DrawerPanel({
  open,
  title,
  subtitle,
  width = 460,
  onClose,
  rightSlot,
  children
}: DrawerPanelProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        background: 'rgba(17, 24, 39, 0.35)',
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={onClose}
    >
      <aside
        style={{
          width,
          maxWidth: '100%',
          height: '100%',
          background: tokens.colors.surface,
          boxShadow: tokens.shadows.lg,
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          borderLeft: `1px solid ${tokens.colors.border}`
        }}
        onClick={(event) => event.stopPropagation()}
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

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: tokens.spacing.sm
            }}
          >
            {rightSlot}

            <button
              type="button"
              onClick={onClose}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: tokens.colors.textMuted
              }}
              aria-label="Close drawer"
              title="Close drawer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div
          style={{
            overflowY: 'auto',
            padding: tokens.spacing.lg,
            display: 'grid',
            gap: tokens.spacing.lg
          }}
        >
          {children}
        </div>
      </aside>
    </div>
  );
}
