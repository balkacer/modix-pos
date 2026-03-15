import { create } from 'zustand';
import { ProductResponseDto } from '@modix/pkgs/contracts';

export interface CurrentOrderItem {
  productId: string;
  productCode: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

interface OrderState {
  items: CurrentOrderItem[];
  notes: string;
  addProduct: (product: ProductResponseDto) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  setNotes: (value: string) => void;
  hydrateFromDraftOrder: (payload: { items: CurrentOrderItem[]; notes?: string }) => void;
  clearOrder: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  items: [],
  notes: '',

  addProduct: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.productId === product.id);

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.unitPrice
              }
            : item
        );

        return { items: updatedItems };
      }

      return {
        items: [
          ...state.items,
          {
            productId: product.id,
            productCode: product.code,
            productName: product.name,
            unitPrice: product.price,
            quantity: 1,
            subtotal: product.price
          }
        ]
      };
    }),

  increaseQuantity: (productId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: (item.quantity + 1) * item.unitPrice
            }
          : item
      )
    })),

  decreaseQuantity: (productId) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.productId === productId);

      if (!existingItem) {
        return state;
      }

      if (existingItem.quantity === 1) {
        return {
          items: state.items.filter((item) => item.productId !== productId)
        };
      }

      return {
        items: state.items.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
                subtotal: (item.quantity - 1) * item.unitPrice
              }
            : item
        )
      };
    }),

  setNotes: (value) => set({ notes: value }),

  hydrateFromDraftOrder: (payload) =>
    set({
      items: payload.items,
      notes: payload.notes ?? ''
    }),

  clearOrder: () =>
    set({
      items: [],
      notes: ''
    })
}));
