import { ReactNode } from 'react';
import { tokens } from '../../../app/theme/tokens';

interface PosContentGridProps {
  left: ReactNode;
  right: ReactNode;
}

export function PosContentGrid({ left, right }: PosContentGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.6fr) minmax(360px, 0.95fr)',
        gap: tokens.spacing.xl,
        alignItems: 'stretch',
        minHeight: 0,
        height: 'calc(100vh - 220px)'
      }}
    >
      <div
        style={{
          minWidth: 0,
          minHeight: 0,
          height: '100%'
        }}
      >
        {left}
      </div>

      <div
        style={{
          display: 'grid',
          gap: tokens.spacing.xl,
          alignContent: 'start',
          minHeight: 0,
          height: '100%'
        }}
      >
        {right}
      </div>
    </div>
  );
}
