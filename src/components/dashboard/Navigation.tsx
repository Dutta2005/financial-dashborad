'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { NAVIGATION_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-red-600 text-white">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between px-4">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'px-4 py-3 text-sm font-medium transition-colors hover:bg-red-700',
                pathname === item.href && 'bg-red-700'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-lg font-semibold">Financial Dashboard</span>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-red-700"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-red-700">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'block px-4 py-3 text-sm font-medium transition-colors hover:bg-red-700',
                  pathname === item.href && 'bg-red-700'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;