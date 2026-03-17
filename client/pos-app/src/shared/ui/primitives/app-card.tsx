import { PropsWithChildren } from 'react';
import { componentStyles } from '../../../app/theme/component-styles';
import { tokens } from '../../../app/theme/tokens';

interface AppCardProps extends PropsWithChildren {
  title?: string;
  subtitle?: string;
}

export function AppCard({ title, subtitle, children }: AppCardProps) {
  return (
    <section style={componentStyles.card}>
      {title ? (
        <div style={{ marginBottom: tokens.spacing.lg }}>
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
      ) : null}

      {children}
    </section>
  );
}
