import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { CartProvider } from "@/providers/cart-provider";
import { CartLink } from "@/components/cart-link";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link to="/" className="text-xl font-bold">
              eStore
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-foreground [&.active]:text-foreground"
              >
                Products
              </Link>
              <CartLink />
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">
          <Outlet />
        </main>
      </div>
    </CartProvider>
  );
}
