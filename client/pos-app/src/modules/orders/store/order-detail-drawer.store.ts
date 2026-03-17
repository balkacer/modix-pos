import { create } from 'zustand';
import { OrderResponseDto } from '@modix/pkgs/contracts';

interface OrderDetailDrawerState {
  selectedOrder: OrderResponseDto | null;
  openOrderDetail: (order: OrderResponseDto) => void;
  closeOrderDetail: () => void;
}

export const useOrderDetailDrawerStore = create<OrderDetailDrawerState>((set) => ({
  selectedOrder: null,
  openOrderDetail: (order) => set({ selectedOrder: order }),
  closeOrderDetail: () => set({ selectedOrder: null })
}));
