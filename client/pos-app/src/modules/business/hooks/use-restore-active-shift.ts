import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOpenCashShifts } from '../api/get-open-cash-shifts';
import { useAuthStore } from '../../auth/store/auth.store';
import { useShiftStore } from '../store/shift.store';
import { useShiftUiStore } from '../store/shift-ui.store';

export function useRestoreActiveShift() {
  const user = useAuthStore((state) => state.user);
  const activeShift = useShiftStore((state) => state.activeShift);
  const setActiveShift = useShiftStore((state) => state.setActiveShift);

  const showShiftRestoredMessage = useShiftUiStore(
    (state) => state.showShiftRestoredMessage
  );

  const openCashShiftsQuery = useQuery({
    queryKey: ['open-cash-shifts', user?.id],
    queryFn: getOpenCashShifts,
    enabled: Boolean(user?.id) && !activeShift,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (!user || activeShift || !openCashShiftsQuery.data) {
      return;
    }

    const userOpenShift =
      openCashShiftsQuery.data.find((shift) => shift.openedByUserId === user.id) ?? null;

    if (userOpenShift) {
      setActiveShift(userOpenShift);
      showShiftRestoredMessage();
    }
  }, [
    user,
    activeShift,
    openCashShiftsQuery.data,
    setActiveShift,
    showShiftRestoredMessage
  ]);

  return {
    isLoading: openCashShiftsQuery.isPending,
    isError: openCashShiftsQuery.isError
  };
}
