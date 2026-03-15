import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBusinesses } from '../api/get-businesses';
import { useShiftStore } from '../store/shift.store';

export function useActiveBusiness() {
  const activeShift = useShiftStore((state) => state.activeShift);

  const businessesQuery = useQuery({
    queryKey: ['businesses'],
    queryFn: getBusinesses,
    enabled: Boolean(activeShift?.businessId)
  });

  const activeBusiness = useMemo(() => {
    if (!activeShift || !businessesQuery.data) {
      return null;
    }

    return (
      businessesQuery.data.find((business) => business.id === activeShift.businessId) ??
      null
    );
  }, [activeShift, businessesQuery.data]);

  return {
    activeBusiness,
    isLoading: businessesQuery.isPending,
    isError: businessesQuery.isError
  };
}
