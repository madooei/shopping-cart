import type { Product } from "./types";

const BASE_URL = "https://dummyjson.com";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(
    `${BASE_URL}/products?limit=12&select=id,title,price,category,rating,thumbnail,images,description`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.products as Product[];
}

export async function fetchProduct(id: number): Promise<Product> {
  const res = await fetch(
    `${BASE_URL}/products/${id}?select=id,title,price,category,rating,thumbnail,images,description`,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id}`);
  }

  return (await res.json()) as Product;
}
