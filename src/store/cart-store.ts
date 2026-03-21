import { createStore } from "@tanstack/store";
import type { Product } from "@/api/types";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const STORAGE_KEY = "shopping-cart";

function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const cartStore = createStore<CartState>({ items: loadCart() });

export function addToCart(product: Product) {
  cartStore.setState((state) => {
    const existing = state.items.find((item) => item.product.id === product.id);
    if (existing) {
      const items = state.items.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      saveCart(items);
      return { items };
    }
    const items = [...state.items, { product, quantity: 1 }];
    saveCart(items);
    return { items };
  });
}

export function removeFromCart(productId: number) {
  cartStore.setState((state) => {
    const items = state.items.filter((item) => item.product.id !== productId);
    saveCart(items);
    return { items };
  });
}

export function updateQuantity(productId: number, quantity: number) {
  cartStore.setState((state) => {
    const items =
      quantity <= 0
        ? state.items.filter((item) => item.product.id !== productId)
        : state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item,
          );
    saveCart(items);
    return { items };
  });
}

export function clearCart() {
  cartStore.setState(() => {
    const items: CartItem[] = [];
    saveCart(items);
    return { items };
  });
}
