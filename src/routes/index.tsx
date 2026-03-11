import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Products</h1>
      <p className="text-muted-foreground">Products will go here.</p>
    </div>
  );
}
