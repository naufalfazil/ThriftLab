'use client';

import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16 md:py-20">
          <div className="md:col-span-5">
            <a href="#home" className="inline-block">
              <span className="text-xl font-bold tracking-[-0.03em] uppercase">
                Thrift<span className="text-[#ff3b00]">Lab</span>
              </span>
            </a>
            <p className="text-sm text-[#666] max-w-xs mt-4 leading-relaxed">
              Curated second-hand apparel and vintage streetwear archives for
              the conscious generation.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#888] mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Shop', href: '#shop' },
                { label: 'Categories', href: '#categories' },
                { label: 'About', href: '#about' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#777] hover:text-[#f5f5f0] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#888] mb-5">
              Stay Updated
            </h4>
            <p className="text-sm text-[#666] mb-4">
              Get notified on our weekly drop schedule.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-[#111] border border-[#222] px-4 py-3 text-sm text-[#f5f5f0] placeholder:text-[#555] focus:outline-none focus:border-[#ff3b00] transition-colors w-full"
              />
              <button className="bg-[#ff3b00] px-5 text-[10px] font-bold uppercase tracking-widest text-[#f5f5f0] hover:bg-[#e63400] transition-colors flex items-center gap-1">
                Join
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#555]">
          <p>© {new Date().getFullYear()} ThriftLab. All rights reserved.</p>
          <p className="font-mono uppercase tracking-widest">
            SMK Taruna Bhakti — Student Project
          </p>
        </div>
      </div>
    </footer>
  );
}
