'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tag } from 'lucide-react';

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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [loading, setLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = ['Semua', 'Flannel', 'Denim', 'Hoodie', 'T-Shirt', 'Crewneck', 'Varsity', 'Jacket'];

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory === 'Semua') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase()));
    }
  }, [selectedCategory, products]);

  useEffect(() => {
    if (!loading && gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power4.out',
        }
      );
    }
  }, [filteredProducts, loading]);

  return (
    <section id="belanja" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-xs font-mono uppercase text-[#ff3b00] tracking-widest mb-3">
              Katalog Kurasi
            </p>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">
              Rilis Terbaru
            </h2>
          </div>
          <p className="text-sm text-[#888888] max-w-sm mt-4 md:mt-0">
            Pilih kategori di bawah untuk menelusuri arsip produk spesifik yang tersedia secara langsung.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-12 border-b border-[#222222] pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all border ${
                selectedCategory === cat
                  ? 'bg-[#ff3b00] text-[#f5f5f0] border-[#ff3b00]'
                  : 'bg-[#171717] text-[#a3a3a3] border-[#222222] hover:border-[#444444] hover:text-[#f5f5f0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-96 bg-[#171717] animate-pulse rounded-none" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-[#888888] font-mono">
            Produk pada kategori ini belum tersedia.
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-[#171717] border border-[#222222] overflow-hidden flex flex-col justify-between hover:border-[#ff3b00] transition-colors"
              >
                <div className="relative h-80 overflow-hidden bg-[#222222]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#0a0a0a]/90 backdrop-blur-md text-[10px] font-mono uppercase text-[#f5f5f0] border border-[#333333]">
                    {product.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#888888] mb-2 font-mono">
                      <span>Ukuran: {product.details.size}</span>
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