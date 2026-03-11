import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$productId")({
  component: ProductPage,
});

function ProductPage() {
  const { productId } = Route.useParams();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Product {productId}</h1>
      <p className="text-muted-foreground">Product details will go here.</p>
    </div>
  );
}
