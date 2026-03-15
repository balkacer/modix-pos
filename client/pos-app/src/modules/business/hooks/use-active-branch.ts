import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBranchesByBusinessId } from '../api/get-branches-by-business-id';
import { useShiftStore } from '../store/shift.store';

export function useActiveBranch() {
  const activeShift = useShiftStore((state) => state.activeShift);

  const branchesQuery = useQuery({
    queryKey: ['branches', activeShift?.businessId],
    queryFn: () => getBranchesByBusinessId(activeShift!.businessId),
    enabled: Boolean(activeShift?.businessId)
  });

  const activeBranch = useMemo(() => {
    if (!activeShift || !branchesQuery.data) {
      return null;
    }

    return (
      branchesQuery.data.find((branch) => branch.id === activeShift.branchId) ?? null
    );
  }, [activeShift, branchesQuery.data]);

  return {
    activeBranch,
    isLoading: branchesQuery.isPending,
    isError: branchesQuery.isError
  };
}
