import { Link } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { ShoppingCart } from "lucide-react";
import { cartStore } from "@/store/cart-store";
import { Badge } from "@/components/ui/badge";

export function CartLink() {
  const totalItems = useStore(cartStore, (state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <Link
      to="/cart"
      className="relative text-muted-foreground hover:text-foreground [&.active]:text-foreground"
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <Badge className="absolute -top-2 -right-3 h-5 min-w-5 justify-center px-1 text-xs">
          {totalItems}
        </Badge>
      )}
    </Link>
  );
}
