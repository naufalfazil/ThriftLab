'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#f5f0e8]/95 backdrop-blur-md border-b border-thrift-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="relative z-10">
            <span className="text-lg lg:text-xl font-bold tracking-[-0.03em] uppercase text-thrift-cream">
              Thrift<span className="text-thrift-accent">Lab</span>
            </span>
          </Link>

          <DesktopNav />

          <div className="hidden lg:flex items-center">
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-3 border border-thrift-border-light text-thrift-cream hover:bg-thrift-accent hover:text-white hover:border-thrift-accent transition-all duration-300"
            >
              Shop Now
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-10 p-2 text-thrift-cream"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
