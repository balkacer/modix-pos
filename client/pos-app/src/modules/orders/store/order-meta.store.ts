import { create } from 'zustand';
import { ConsumptionType } from '@modix/pkgs/contracts';

interface OrderMetaState {
  consumptionType: ConsumptionType;
  setConsumptionType: (value: ConsumptionType) => void;
}

export const useOrderMetaStore = create<OrderMetaState>((set) => ({
  consumptionType: ConsumptionType.TAKEAWAY,
  setConsumptionType: (value) => set({ consumptionType: value })
}));
