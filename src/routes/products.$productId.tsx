import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "@/api/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { addToCart } from "@/store/cart-store";

export const Route = createFileRoute("/products/$productId")({
  component: ProductPage,
});

function ProductPage() {
  const { productId } = Route.useParams();
  const parsedProductId = Number(productId);
  const isInvalidProductId = Number.isNaN(parsedProductId);

  const {
    data: product,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(parsedProductId),
    enabled: !isInvalidProductId,
  });

  if (isInvalidProductId) {
    return <p className="text-destructive">Invalid product ID.</p>;
  }

  if (isPending) {
    return <p className="text-muted-foreground">Loading product...</p>;
  }

  if (isError) {
    return <p className="text-destructive">Error: {error.message}</p>;
  }

  return (
    <div>
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <img
          src={product.images[0] ?? product.thumbnail}
          alt={product.title}
          className="w-full rounded-lg object-contain"
        />

        <div>
          <Badge variant="secondary">{product.category}</Badge>
          <h1 className="mt-2 text-3xl font-bold">{product.title}</h1>
          <p className="mt-2 text-2xl font-semibold">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Rating: {product.rating} / 5
          </p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>
          <Button className="mt-6" size="lg" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
