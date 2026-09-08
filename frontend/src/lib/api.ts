export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
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
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
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
    }))
    .sort((a, b) => b.count - a.count);
}
