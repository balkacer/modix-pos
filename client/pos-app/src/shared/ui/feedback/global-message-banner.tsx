import { useEffect } from 'react';
import { useAppUiStore } from '../../store/app-ui.store';
import { AppCard } from '../primitives/app-card';

export function GlobalMessageBanner() {
  const globalMessage = useAppUiStore((state) => state.globalMessage);
  const clearGlobalMessage = useAppUiStore((state) => state.clearGlobalMessage);

  useEffect(() => {
    if (!globalMessage) {
      return;
    }

    const timer = window.setTimeout(() => {
      clearGlobalMessage();
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [globalMessage, clearGlobalMessage]);

  if (!globalMessage) {
    return null;
  }

  return (
    <AppCard>
      <div style={{ color: '#92400e', fontWeight: 600 }}>{globalMessage}</div>
    </AppCard>
  );
}
