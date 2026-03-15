import { create } from 'zustand';

interface CatalogState {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  clearSearchTerm: () => void;
}

export const useCatalogStore = create<CatalogState>((set) => ({
  searchTerm: '',
  setSearchTerm: (value) => set({ searchTerm: value }),
  clearSearchTerm: () => set({ searchTerm: '' })
}));
