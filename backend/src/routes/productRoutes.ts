import { Router, Request, Response } from 'express';
import { products } from '../data/products';

const router = Router();

// GET /api/products — list all products with optional query filters
router.get('/', (req: Request, res: Response) => {
  const { category, subcategory, search, sort } = req.query;

  let result = [...products];

  if (category && typeof category === 'string') {
    result = result.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (subcategory && typeof subcategory === 'string') {
    result = result.filter(
      (p) => p.subcategory.toLowerCase() === subcategory.toLowerCase()
    );
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.details.description.toLowerCase().includes(q)
    );
  }

  if (sort && typeof sort === 'string') {
    switch (sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'best-selling':
        result.sort((a, b) => b.sold - a.sold);
        break;
      default:
        break;
    }
  }

  res.json(result);
});

// GET /api/products/best-sellers — top products by sold count
router.get('/best-sellers', (_req: Request, res: Response) => {
  const bestSellers = [...products]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 10);
  res.json(bestSellers);
});

// GET /api/products/new-arrivals — newest products by createdAt
router.get('/new-arrivals', (_req: Request, res: Response) => {
  const newArrivals = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);
  res.json(newArrivals);
});

// GET /api/products/categories — list all categories with counts
router.get('/categories', (_req: Request, res: Response) => {
  const categoryMap = new Map<string, { count: number; image: string; subcategories: Map<string, number> }>();

  products.forEach((p) => {
    const existing = categoryMap.get(p.category);
    if (existing) {
      existing.count++;
      const subCount = existing.subcategories.get(p.subcategory) || 0;
      existing.subcategories.set(p.subcategory, subCount + 1);
    } else {
      const subMap = new Map<string, number>();
      subMap.set(p.subcategory, 1);
      categoryMap.set(p.category, {
        count: 1,
        image: p.image,
        subcategories: subMap,
      });
    }
  });

  const categories = Array.from(categoryMap.entries())
    .map(([name, { count, image, subcategories }]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count,
      image,
      subcategories: Array.from(subcategories.entries()).map(([subName, subCount]) => ({
        name: subName,
        slug: subName.toLowerCase().replace(/\s+/g, '-'),
        count: subCount,
      })),
    }))
    .sort((a, b) => b.count - a.count);

  res.json(categories);
});

// GET /api/products/:id — single product by ID
router.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid product ID' });
    return;
  }

  const product = products.find((p) => p.id === id);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  res.json({ product, related });
});

export default router;
