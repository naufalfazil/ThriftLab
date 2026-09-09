'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { navItems, type NavItem } from '@/lib/nav-data';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    onClose();
    setOpenSubmenu(null);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      if (menuRef.current) {
        gsap.fromTo(
          menuRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
        gsap.fromTo(
          linksRef.current.filter(Boolean),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.06,
            ease: 'power3.out',
            delay: 0.15,
          }
        );
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <div
      ref={menuRef}
      className={`fixed inset-0 z-30 bg-[#f5f0e8] flex flex-col overflow-y-auto ${
        open ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{ opacity: open ? 1 : 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="flex flex-col min-h-screen pt-24 pb-12 px-8">
        <nav className="flex flex-col gap-2" role="navigation" aria-label="Mobile menu">
          {navItems.map((item: NavItem, i: number) => (
            <div
              key={item.label}
              ref={(el) => { linksRef.current[i] = el; }}
              className="border-b border-thrift-border/50 last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`text-3xl font-bold uppercase tracking-tight py-4 transition-colors ${
                    isActive(item.href)
                      ? 'text-thrift-accent'
                      : 'text-thrift-cream hover:text-thrift-accent'
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className="p-2 text-thrift-cream"
                    aria-label={`Toggle ${item.label} submenu`}
                    aria-expanded={openSubmenu === item.label}
                  >
                    <ChevronRight
                      className={`w-5 h-5 transition-transform duration-200 ${
                        openSubmenu === item.label ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                )}
              </div>

              {item.children && openSubmenu === item.label && (
                <div
                  className="pl-4 pb-4"
                  style={{
                    animation: 'submenuSlide 0.2s ease-out forwards',
                  }}
                >
                  {item.children.map((child, idx) => (
                    <Link
                      key={`${item.label}-${idx}`}
                      href={child.href}
                      onClick={onClose}
                      className={`block py-2 text-sm uppercase tracking-wider transition-colors ${
                        isActive(child.href)
                          ? 'text-thrift-accent'
                          : 'text-thrift-text-muted hover:text-thrift-cream'
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-auto pt-12">
          <Link
            href="/auth/login"
            onClick={onClose}
            className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-thrift-accent"
          >
            Belanja Sekarang
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
