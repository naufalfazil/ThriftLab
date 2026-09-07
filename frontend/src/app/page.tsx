'use client';

import { useState } from 'react';
import PageLoader from '@/components/PageLoader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-[#f5f5f0] selection:bg-[#ff3b00] selection:text-[#f5f5f0]">
      {loading && <PageLoader onComplete={() => setLoading(false)} />}
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <Categories />
      <About />
      <Footer />
    </main>
  );
}