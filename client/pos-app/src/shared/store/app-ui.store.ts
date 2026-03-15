import { create } from 'zustand';

interface AppUiState {
  globalMessage: string | null;
  setGlobalMessage: (message: string) => void;
  clearGlobalMessage: () => void;
}

export const useAppUiStore = create<AppUiState>((set) => ({
  globalMessage: null,
  setGlobalMessage: (message) => set({ globalMessage: message }),
  clearGlobalMessage: () => set({ globalMessage: null })
}));
