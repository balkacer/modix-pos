import { create } from 'zustand';
import { OrderResponseDto } from '@modix/pkgs/contracts';
import { sessionStorageService } from '../../../shared/storage/session-storage.service';

interface SalesState {
  activeOrder: OrderResponseDto | null;
  editingDraftOrderId: string | null;
  setActiveOrder: (order: OrderResponseDto) => void;
  setEditingDraftOrderId: (orderId: string | null) => void;
  hydrateActiveOrder: () => void;
  clearActiveOrder: () => void;
}

export const useSalesStore = create<SalesState>((set) => ({
  activeOrder: sessionStorageService.getActiveOrder(),
  editingDraftOrderId: null,

  setActiveOrder: (order) => {
    sessionStorageService.setActiveOrder(order);
    set({ activeOrder: order });
  },

  setEditingDraftOrderId: (orderId) => {
    set({ editingDraftOrderId: orderId });
  },

  hydrateActiveOrder: () => {
    set({
      activeOrder: sessionStorageService.getActiveOrder()
    });
  },

  clearActiveOrder: () => {
    sessionStorageService.clearActiveOrder();
    set({
      activeOrder: null,
      editingDraftOrderId: null
    });
  }
}));
