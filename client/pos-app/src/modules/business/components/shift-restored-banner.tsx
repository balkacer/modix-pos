import { useEffect } from 'react';
import { useShiftUiStore } from '../store/shift-ui.store';
import { AppCard } from '../../../shared/ui/primitives/app-card';

export function ShiftRestoredBanner() {
  const shiftRestoredMessageVisible = useShiftUiStore(
    (state) => state.shiftRestoredMessageVisible
  );
  const hideShiftRestoredMessage = useShiftUiStore(
    (state) => state.hideShiftRestoredMessage
  );

  useEffect(() => {
    if (!shiftRestoredMessageVisible) {
      return;
    }

    const timer = window.setTimeout(() => {
      hideShiftRestoredMessage();
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [shiftRestoredMessageVisible, hideShiftRestoredMessage]);

  if (!shiftRestoredMessageVisible) {
    return null;
  }

  return (
    <AppCard>
      <div
        style={{
          color: '#166534',
          fontWeight: 600
        }}
      >
        An open shift was restored for your session.
      </div>
    </AppCard>
  );
}
