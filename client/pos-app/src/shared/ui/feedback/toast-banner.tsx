import { useEffect } from 'react';
import { useAppUiStore } from '../../store/app-ui.store';

export function ToastBanner() {
  const globalMessage = useAppUiStore((state) => state.globalMessage);
  const clearGlobalMessage = useAppUiStore((state) => state.clearGlobalMessage);

  useEffect(() => {
    if (!globalMessage) {
      return;
    }

    const timer = window.setTimeout(() => {
      clearGlobalMessage();
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [globalMessage, clearGlobalMessage]);

  if (!globalMessage) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        right: 20,
        bottom: 20,
        zIndex: 1100,
        maxWidth: 420,
        background: '#111827',
        color: '#fff',
        padding: '14px 16px',
        borderRadius: 14,
        boxShadow: '0 20px 40px rgba(0,0,0,0.25)'
      }}
    >
      <strong style={{ display: 'block', marginBottom: 4 }}>Notice</strong>
      <div style={{ fontSize: 14, color: '#e5e7eb' }}>{globalMessage}</div>
    </div>
  );
}
