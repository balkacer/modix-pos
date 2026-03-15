import { create } from 'zustand';

interface ShiftUiState {
  shiftRestoredMessageVisible: boolean;
  showShiftRestoredMessage: () => void;
  hideShiftRestoredMessage: () => void;
}

export const useShiftUiStore = create<ShiftUiState>((set) => ({
  shiftRestoredMessageVisible: false,
  showShiftRestoredMessage: () => set({ shiftRestoredMessageVisible: true }),
  hideShiftRestoredMessage: () => set({ shiftRestoredMessageVisible: false })
}));
