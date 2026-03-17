import { useActiveBusiness } from './use-active-business';
import { useActiveBranch } from './use-active-branch';
import { useActiveCashRegister } from './use-active-cash-register';
import { useShiftStore } from '../store/shift.store';

export function useOperationalContext() {
  const activeShift = useShiftStore((state) => state.activeShift);

  const { activeBusiness, isLoading: isBusinessLoading } = useActiveBusiness();
  const { activeBranch, isLoading: isBranchLoading } = useActiveBranch();
  const { activeCashRegister, isLoading: isCashRegisterLoading } =
    useActiveCashRegister();

  return {
    activeShift,
    activeBusiness,
    activeBranch,
    activeCashRegister,
    isLoading:
      isBusinessLoading || isBranchLoading || isCashRegisterLoading
  };
}