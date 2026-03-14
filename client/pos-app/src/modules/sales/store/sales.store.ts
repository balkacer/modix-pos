import { create } from 'zustand';
import { OrderResponseDto } from '@modix/pkgs/contracts';
import { sessionStorageService } from '../../../shared/storage/session-storage.service';

interface SalesState {
  activeOrder: OrderResponseDto | null;
  setActiveOrder: (order: OrderResponseDto) => void;
  hydrateActiveOrder: () => void;
  clearActiveOrder: () => void;
}

export const useSalesStore = create<SalesState>((set) => ({
  activeOrder: sessionStorageService.getActiveOrder(),

  setActiveOrder: (order) => {
    sessionStorageService.setActiveOrder(order);
    set({ activeOrder: order });
  },

  hydrateActiveOrder: () => {
    set({
      activeOrder: sessionStorageService.getActiveOrder()
    });
  },

  clearActiveOrder: () => {
    sessionStorageService.clearActiveOrder();
    set({ activeOrder: null });
  }
}));