'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { navItems, type NavItem } from '@/lib/nav-data';

export default function DesktopNav() {
  const pathname = usePathname();
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = useCallback(
    (href: string) => {
      if (href === '/') return pathname === '/';
      return pathname.startsWith(href);
    },
    [pathname]
  );

  const handleEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredDropdown(label);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setHoveredDropdown(null), 120);
  };

  return (
    <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
      {navItems.map((item: NavItem) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => item.children && handleEnter(item.label)}
          onMouseLeave={handleLeave}
        >
          <Link
            href={item.href}
            aria-haspopup={item.children ? 'true' : undefined}
            aria-expanded={item.children ? hoveredDropdown === item.label : undefined}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 relative group ${
              isActive(item.href)
                ? 'text-thrift-cream'
                : 'text-thrift-text-muted hover:text-thrift-cream'
            }`}
          >
            {item.label}
            {item.children && (
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${
                  hoveredDropdown === item.label ? 'rotate-180' : ''
                }`}
              />
            )}
            <span
              className={`absolute -bottom-1 left-4 h-px bg-thrift-accent transition-all duration-300 ${
                isActive(item.href)
                  ? 'w-[calc(100%-32px)]'
                  : 'w-0 group-hover:w-[calc(100%-32px)]'
              }`}
            />
          </Link>

          {item.children && hoveredDropdown === item.label && (
            <div
              className="absolute top-full left-0 pt-2 z-50"
              onMouseEnter={() => handleEnter(item.label)}
              onMouseLeave={handleLeave}
            >
              <div
                className="bg-[#f5f0e8] border border-thrift-border shadow-[0_8px_30px_rgba(0,0,0,0.08)] min-w-[220px] py-2"
                style={{
                  animation: 'dropdownIn 0.15s ease-out forwards',
                }}
              >
                {item.children.map((child, idx) => (
                  <Link
                    key={`${item.label}-${idx}`}
                    href={child.href}
                    className={`block px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] transition-colors duration-200 ${
                      isActive(child.href)
                        ? 'text-thrift-accent bg-thrift-accent/5'
                        : 'text-thrift-text-muted hover:text-thrift-cream hover:bg-thrift-border/30'
                    }`}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
