import { createStore } from "@tanstack/store";
import type { Product } from "@/api/types";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

export const cartStore = createStore<CartState>({ items: [] });

export function addToCart(product: Product) {
  cartStore.setState((state) => {
    const existing = state.items.find((item) => item.product.id === product.id);
    if (existing) {
      return {
        items: state.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    }
    return {
      items: [...state.items, { product, quantity: 1 }],
    };
  });
}

export function removeFromCart(productId: number) {
  cartStore.setState((state) => ({
    items: state.items.filter((item) => item.product.id !== productId),
  }));
}

export function updateQuantity(productId: number, quantity: number) {
  cartStore.setState((state) => ({
    items:
      quantity <= 0
        ? state.items.filter((item) => item.product.id !== productId)
        : state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item,
          ),
  }));
}

export function clearCart() {
  cartStore.setState(() => ({ items: [] }));
}
