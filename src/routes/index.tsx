import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/api/products";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const {
    data: products,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isPending) {
    return <p className="text-muted-foreground">Loading products...</p>;
  }

  if (isError) {
    return <p className="text-destructive">Error: {error.message}</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Products</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            to="/products/$productId"
            params={{ productId: String(product.id) }}
          >
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader className="p-4">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-48 w-full rounded object-contain"
                />
              </CardHeader>
              <CardContent className="flex-1 p-4 pt-0">
                <CardTitle className="text-sm">{product.title}</CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">
                  {product.category}
                </p>
              </CardContent>
              <CardFooter className="py-2 px-4">
                <p className="font-semibold">${product.price.toFixed(2)}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
