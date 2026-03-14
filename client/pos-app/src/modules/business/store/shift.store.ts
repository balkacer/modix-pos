import { create } from 'zustand';
import { CashShiftResponseDto } from '@modix/pkgs/contracts';
import { sessionStorageService } from '../../../shared/storage/session-storage.service';

interface ShiftState {
  activeShift: CashShiftResponseDto | null;
  setActiveShift: (shift: CashShiftResponseDto) => void;
  hydrateActiveShift: () => void;
  clearActiveShift: () => void;
}

export const useShiftStore = create<ShiftState>((set) => ({
  activeShift: sessionStorageService.getActiveShift(),

  setActiveShift: (shift) => {
    sessionStorageService.setActiveShift(shift);
    set({ activeShift: shift });
  },

  hydrateActiveShift: () => {
    set({
      activeShift: sessionStorageService.getActiveShift()
    });
  },

  clearActiveShift: () => {
    sessionStorageService.clearActiveShift();
    set({ activeShift: null });
  }
}));