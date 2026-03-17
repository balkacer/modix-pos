import { PropsWithChildren } from 'react';
import { tokens } from '../../../app/theme/tokens';
import { PosHeader } from './pos-header';

export function WorkspaceContainer({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        minHeight: '100vh',
        background: tokens.colors.bg
      }}
    >
      <PosHeader />

      <main
        style={{
          padding: tokens.spacing.xl,
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacing.xl,
          minWidth: 0,
          flex: 1
        }}
      >
        {children}
      </main>
    </div>
  );
}
