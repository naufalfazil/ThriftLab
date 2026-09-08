'use client';

import { useState } from 'react';
import PageLoader from '@/components/PageLoader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Showcase from '@/components/Showcase';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import About from '@/components/About';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="bg-[#faf8f5] min-h-screen text-thrift-text selection:bg-thrift-accent selection:text-white">
      {loading && <PageLoader onComplete={() => setLoading(false)} />}
      <Navbar />
      <Hero ready={!loading} />
      <Marquee />
      <Showcase />
      <FeaturedProducts />
      <Categories />
      <About />
      <CTA />
      <Footer />
    </main>
  );
}
