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
  addProduct: (product: ProductResponseDto) => void;
  removeProduct: (productId: string) => void;
  clearOrder: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  items: [],
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
  removeProduct: (productId) =>
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
  clearOrder: () => set({ items: [] })
}));