import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Badge } from "@/components/ui/badge";

export function CartLink() {
  const { totalItems } = useCart();

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
