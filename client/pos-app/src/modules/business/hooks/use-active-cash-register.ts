import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCashRegistersByBranchId } from '../api/get-cash-registers-by-branch-id';
import { useShiftStore } from '../store/shift.store';

export function useActiveCashRegister() {
  const activeShift = useShiftStore((state) => state.activeShift);

  const cashRegistersQuery = useQuery({
    queryKey: ['cash-registers', activeShift?.branchId],
    queryFn: () => getCashRegistersByBranchId(activeShift!.branchId),
    enabled: Boolean(activeShift?.branchId)
  });

  const activeCashRegister = useMemo(() => {
    if (!activeShift || !cashRegistersQuery.data) {
      return null;
    }

    return (
      cashRegistersQuery.data.find(
        (cashRegister) => cashRegister.id === activeShift.cashRegisterId
      ) ?? null
    );
  }, [activeShift, cashRegistersQuery.data]);

  return {
    activeCashRegister,
    isLoading: cashRegistersQuery.isPending,
    isError: cashRegistersQuery.isError
  };
}
