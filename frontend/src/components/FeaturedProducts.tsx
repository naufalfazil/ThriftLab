'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Tag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Product {
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

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch from backend API, fallback to mock data if backend isn't running locally
    fetch('http://localhost:3001/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.slice(0, 8)); // Display 8 featured products
        setLoading(false);
      })
      .catch(() => {
        // Fallback fallback data if backend offline
        setProducts([
          {
            id: 1,
            name: 'Vintage Flannel Dickies',
            price: 150000,
            category: 'Flannel',
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
            details: { size: 'L (72x55 cm)', condition: '9/10 (No minus)', description: 'Flannel vintage warna merah hitam.' }
          },
          {
            id: 2,
            name: 'Retro Denim Jacket Levis',
            price: 250000,
            category: 'Denim',
            image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop',
            details: { size: 'XL (75x60 cm)', condition: '8.5/10', description: 'Jaket denim klasik washed blue.' }
          },
          {
            id: 3,
            name: 'Vintage Graphic Tee Band',
            price: 120000,
            category: 'T-Shirt',
            image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop',
            details: { size: 'M (68x50 cm)', condition: '9/10', description: 'Kaos band vintage bahan katun.' }
          },
          {
            id: 4,
            name: 'Carhartt Active Hoodie Brown',
            price: 350000,
            category: 'Hoodie',
            image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop',
            details: { size: 'L (74x58 cm)', condition: '8/10', description: 'Hoodie kanvas Carhartt original.' }
          }
        ]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, [loading]);

  return (
    <section id="shop" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <p className="text-xs font-mono uppercase text-[#ff3b00] tracking-widest mb-3">
              // Curated Stock
            </p>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">
              Trending Drops
            </h2>
          </div>
          <p className="text-sm text-[#888888] max-w-sm mt-4 md:mt-0">
            Limited stock items. Once they are gone, they enter the permanent archive. Grab yours before someone else does.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-96 bg-[#171717] animate-pulse rounded-none" />
            ))}
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-[#171717] border border-[#222222] overflow-hidden flex flex-col justify-between hover:border-[#ff3b00] transition-colors"
              >
                <div className="relative h-80 overflow-hidden bg-[#222222]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#0a0a0a]/80 backdrop-blur-sm text-[10px] font-mono uppercase text-[#f5f5f0] border border-[#333333]">
                    {product.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#888888] mb-2 font-mono">
                      <span>Size: {product.details.size}</span>
                      <span className="text-[#ff3b00]">{product.details.condition}</span>
                    </div>
                    <h3 className="text-lg font-bold uppercase tracking-tight text-[#f5f5f0] mb-2 group-hover:text-[#ff3b00] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#a3a3a3] line-clamp-2 mb-4">
                      {product.details.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#222222] flex items-center justify-between">
                    <span className="text-base font-bold font-mono text-[#f5f5f0]">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                    <button className="p-2 bg-[#222222] text-[#f5f5f0] group-hover:bg-[#ff3b00] transition-colors">
                      <Tag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}