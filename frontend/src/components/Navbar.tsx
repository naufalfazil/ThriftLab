'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#222222] py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-black tracking-tighter uppercase">
          Thrift<span className="text-[#ff3b00]">Lab</span>
        </a>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-wider text-[#a3a3a3]">
          <a href="#home" className="hover:text-[#f5f5f0] transition-colors">Home</a>
          <a href="#shop" className="hover:text-[#f5f5f0] transition-colors">Shop</a>
          <a href="#categories" className="hover:text-[#f5f5f0] transition-colors">Categories</a>
          <a href="#about" className="hover:text-[#f5f5f0] transition-colors">About</a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <a
            href="#shop"
            className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest px-5 py-2.5 bg-[#f5f5f0] text-[#0a0a0a] hover:bg-[#ff3b00] hover:text-[#f5f5f0] transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explore Drops</span>
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#f5f5f0] focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-[#222222] py-6 px-6 flex flex-col space-y-4 md:hidden">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-bold uppercase text-[#f5f5f0]"
          >
            Home
          </a>
          <a
            href="#shop"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-bold uppercase text-[#f5f5f0]"
          >
            Shop
          </a>
          <a
            href="#categories"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-bold uppercase text-[#f5f5f0]"
          >
            Categories
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-bold uppercase text-[#f5f5f0]"
          >
            About
          </a>
        </div>
      )}
    </header>
  );
}