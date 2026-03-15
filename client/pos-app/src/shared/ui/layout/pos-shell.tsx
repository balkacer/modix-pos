import { PropsWithChildren } from 'react';
import { PosHeader } from './pos-header';

export function PosShell({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f3f4f6',
        color: '#111827'
      }}
    >
      <PosHeader />
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  );
}
