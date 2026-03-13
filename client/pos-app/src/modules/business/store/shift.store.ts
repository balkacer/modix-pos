import { create } from 'zustand';
import { CashShiftResponseDto } from '@modix/pkgs/contracts';

interface ShiftState {
  activeShift: CashShiftResponseDto | null;
  setActiveShift: (shift: CashShiftResponseDto) => void;
  clearActiveShift: () => void;
}

export const useShiftStore = create<ShiftState>((set) => ({
  activeShift: null,
  setActiveShift: (shift) => set({ activeShift: shift }),
  clearActiveShift: () => set({ activeShift: null })
}));