export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  subcategory: string;
  image: string;
  sold: number;
  createdAt: string;
  details: {
    size: string;
    condition: string;
    description: string;
  };
}

export interface CategoryGroup {
  name: string;
  slug: string;
  count: number;
  image: string;
  subcategories: {
    name: string;
    slug: string;
    count: number;
  }[];
}

export async function fetchProducts(params?: {
  category?: string;
  subcategory?: string;
  search?: string;
  sort?: string;
}): Promise<Product[]> {
  const url = new URL(`${API_URL}/api/products`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
    });
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProductById(id: number): Promise<{ product: Product; related: Product[] }> {
  const res = await fetch(`${API_URL}/api/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
}

export async function fetchBestSellers(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/products/best-sellers`);
  if (!res.ok) throw new Error('Failed to fetch best sellers');
  return res.json();
}

export async function fetchNewArrivals(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/products/new-arrivals`);
  if (!res.ok) throw new Error('Failed to fetch new arrivals');
  return res.json();
}

export async function fetchCategories(): Promise<CategoryGroup[]> {
  const res = await fetch(`${API_URL}/api/products/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export function categoriesToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export function slugToCategory(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function getCategories(products: Product[]): CategoryGroup[] {
  const groupMap = new Map<string, { count: number; image: string }>();
  products.forEach((p) => {
    const existing = groupMap.get(p.category);
    if (existing) {
      existing.count++;
    } else {
      groupMap.set(p.category, { count: 1, image: p.image });
    }
  });
  return Array.from(groupMap.entries())
    .map(([name, { count, image }]) => ({
      name,
      slug: categoriesToSlug(name),
      count,
      image,
      subcategories: [],
    }))
    .sort((a, b) => b.count - a.count);
}
