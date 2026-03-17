import { create } from 'zustand';
import { OrderStatus } from '@modix/pkgs/contracts';

interface OrdersWorkspaceState {
  searchTerm: string;
  selectedStatus: OrderStatus | 'all';
  onlyCurrentShift: boolean;
  setSearchTerm: (value: string) => void;
  setSelectedStatus: (value: OrderStatus | 'all') => void;
  setOnlyCurrentShift: (value: boolean) => void;
  clearFilters: () => void;
}

export const useOrdersWorkspaceStore = create<OrdersWorkspaceState>((set) => ({
  searchTerm: '',
  selectedStatus: 'all',
  onlyCurrentShift: true,
  setSearchTerm: (value) => set({ searchTerm: value }),
  setSelectedStatus: (value) => set({ selectedStatus: value }),
  setOnlyCurrentShift: (value) => set({ onlyCurrentShift: value }),
  clearFilters: () =>
    set({
      searchTerm: '',
      selectedStatus: 'all',
      onlyCurrentShift: true
    })
}));
