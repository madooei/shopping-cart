import type { Product } from "@/api/types";

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type CartAction =
  | { type: "added"; product: Product }
  | { type: "removed"; productId: number }
  | { type: "quantity_updated"; productId: number; quantity: number }
  | { type: "cleared" };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "added": {
      const existing = state.items.find(
        (item) => item.product.id === action.product.id,
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return {
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }
    case "removed":
      return {
        items: state.items.filter(
          (item) => item.product.id !== action.productId,
        ),
      };
    case "quantity_updated":
      if (action.quantity <= 0) {
        return {
          items: state.items.filter(
            (item) => item.product.id !== action.productId,
          ),
        };
      }
      return {
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item,
        ),
      };
    case "cleared":
      return { items: [] };
  }
}
