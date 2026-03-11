import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">Shopping Cart</h1>
        <p className="mb-4 text-muted-foreground">Your cart is empty.</p>
        <Link to="/">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <Button variant="outline" size="sm" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>

      <div className="space-y-4">
        {items.map(({ product, quantity }) => (
          <div key={product.id}>
            <div className="flex items-center gap-4">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-20 w-20 rounded object-contain"
              />
              <div className="flex-1">
                <Link
                  to="/products/$productId"
                  params={{ productId: String(product.id) }}
                  className="font-medium hover:underline"
                >
                  {product.title}
                </Link>
                <p className="text-sm text-muted-foreground">
                  ${product.price.toFixed(2)} each
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon-xs"
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon-xs"
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <p className="w-24 text-right font-semibold">
                ${(product.price * quantity).toFixed(2)}
              </p>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => removeFromCart(product.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Separator className="mt-4" />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <div className="text-right">
          <p className="text-lg font-semibold">
            Total: ${totalPrice.toFixed(2)}
          </p>
          <Button className="mt-4" size="lg">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
