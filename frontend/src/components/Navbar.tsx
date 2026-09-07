'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#shop' },
  { label: 'Categories', href: '#categories' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      if (mobileMenuRef.current) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
        gsap.fromTo(
          mobileLinksRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
        );
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#222]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
          <a href="#home" className="relative z-10">
            <span className="text-lg lg:text-xl font-bold tracking-[-0.03em] uppercase">
              Thrift<span className="text-[#ff3b00]">Lab</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#999] hover:text-[#f5f5f0] transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#ff3b00] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <a
              href="#shop"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-3 border border-[#333] text-[#f5f5f0] hover:bg-[#ff3b00] hover:border-[#ff3b00] transition-all duration-300"
            >
              Shop Now
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-10 p-2 text-[#f5f5f0]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-30 bg-[#0a0a0a] flex flex-col justify-center px-8 ${
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{ opacity: mobileOpen ? 1 : 0 }}
      >
        <nav className="flex flex-col gap-6">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              ref={(el) => { mobileLinksRef.current[i] = el; }}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-4xl font-bold uppercase tracking-tight text-[#f5f5f0] hover:text-[#ff3b00] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#shop"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#ff3b00] mt-4"
          >
            Shop Now <ArrowUpRight className="w-4 h-4" />
          </a>
        </nav>
      </div>
    </>
  );
}
