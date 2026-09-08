'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { fetchProducts, slugToCategory, type Product } from '@/lib/api';
import { ArrowUpRight } from 'lucide-react';

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/collection/${product.id}`} className="group flex flex-col">
      <div className="relative overflow-hidden bg-thrift-border aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute top-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-sm text-[9px] font-mono uppercase tracking-wider text-white">
          {product.details.condition}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="pt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-thrift-text-muted mb-1">
            {product.subcategory} &middot; {product.details.size}
          </p>
          <h3 className="text-sm font-semibold uppercase tracking-tight text-thrift-text truncate">
            {product.name}
          </h3>
        </div>
        <span className="shrink-0 text-sm font-bold font-mono text-thrift-cream">
          Rp {product.price.toLocaleString('id-ID')}
        </span>
      </div>
      <span className="mt-3 block h-px w-full bg-thrift-border relative overflow-hidden">
        <span className="absolute inset-0 bg-thrift-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
      </span>
    </Link>
  );
}

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const categoryName = slugToCategory(slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchProducts({ category: categoryName })
      .then((data) => {
        if (data.length > 0) {
          setProducts(data);
        } else {
          setNotFound(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [slug, categoryName]);

  return (
    <section className="pt-28 pb-24 sm:pt-32 sm:pb-32 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        <nav className="mb-8 text-[10px] font-mono uppercase tracking-[0.2em] text-thrift-text-muted">
          <Link href="/" className="hover:text-thrift-cream transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/categories" className="hover:text-thrift-cream transition-colors">
            Kategori
          </Link>
          <span className="mx-2">/</span>
          <span className="text-thrift-cream">{categoryName}</span>
        </nav>

        <div className="mb-14">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-thrift-accent mb-4">
            {'// Kategori'}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[-0.03em] text-thrift-cream mb-4">
            {categoryName}
          </h1>
          {!loading && !notFound && (
            <p className="text-sm text-thrift-text-muted">
              {products.length} {products.length === 1 ? 'produk' : 'produk'} ditemukan.
            </p>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-thrift-border/40 animate-pulse" />
            ))}
          </div>
        ) : notFound ? (
          <div className="text-center py-24 border border-thrift-border bg-thrift-surface">
            <p className="text-sm text-thrift-text-muted font-mono mb-2">
              Kategori &ldquo;{categoryName}&rdquo; tidak ditemukan.
            </p>
            <Link
              href="/categories"
              className="text-xs uppercase tracking-widest text-thrift-accent hover:underline mt-2 inline-block"
            >
              Lihat Semua Kategori
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 lg:gap-y-16">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
