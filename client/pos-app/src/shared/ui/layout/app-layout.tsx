import { PropsWithChildren, useState } from 'react';
import { tokens } from '../../../app/theme/tokens';
import { PosSidebar } from './pos-sidebar';
import { WorkspaceContainer } from './workspace-container';

interface AppLayoutProps extends PropsWithChildren {
  activeView: string;
  onChangeView: (view: string) => void;
}

export function AppLayout({
  children,
  activeView,
  onChangeView
}: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: collapsed ? '76px 1fr' : '240px 1fr',
        minHeight: '100vh',
        background: tokens.colors.bg
      }}
    >
      <PosSidebar
        collapsed={collapsed}
        toggle={() => setCollapsed(!collapsed)}
        activeView={activeView}
        onChangeView={onChangeView}
      />

      <WorkspaceContainer>{children}</WorkspaceContainer>
    </div>
  );
}