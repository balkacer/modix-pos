import { useEffect } from 'react';
import { useAuthStore } from '../../modules/auth/store/auth.store';
import { useShiftStore } from '../../modules/business/store/shift.store';
import { useSalesStore } from '../../modules/sales/store/sales.store';

export function SessionHydrator() {
  const hydrateSession = useAuthStore((state) => state.hydrateSession);
  const hydrateActiveShift = useShiftStore((state) => state.hydrateActiveShift);
  const hydrateActiveOrder = useSalesStore((state) => state.hydrateActiveOrder);

  useEffect(() => {
    hydrateSession();
    hydrateActiveShift();
    hydrateActiveOrder();
  }, [hydrateSession, hydrateActiveShift, hydrateActiveOrder]);

  return null;
}