'use client';

import { useState } from 'react';
import PageLoader from '@/components/PageLoader';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Showcase from '@/components/Showcase';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import About from '@/components/About';
import CTA from '@/components/CTA';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <PageLoader onComplete={() => setLoading(false)} />}
      <Hero ready={!loading} />
      <Marquee />
      <Showcase />
      <FeaturedProducts />
      <Categories />
      <About />
      <CTA />
    </>
  );
}
