import { PropsWithChildren } from 'react';
import { tokens } from '../../../app/theme/tokens';

export function PosWorkspace({ children }: PropsWithChildren) {
  return (
    <section
      style={{
        display: 'grid',
        gap: tokens.spacing.xl,
        minWidth: 0
      }}
    >
      {children}
    </section>
  );
}