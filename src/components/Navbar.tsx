/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: (doctorId?: 'mashal' | 'faizan' | null) => void;
}

export default function Navbar({ activeTab, setActiveTab, onOpenBooking }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Our Specialists' },
    { id: 'services', label: 'Services' },
    { id: 'cases', label: 'Cases' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 w-full px-3 sm:px-6 lg:px-8 font-sans max-w-7xl mx-auto pointer-events-none">
      {/* Floating Pill Rounded Glass Navbar with subtle light green tint */}
      <div className="bg-[#f0fdfa]/90 backdrop-blur-xl border border-[#0D9C89]/20 shadow-lg shadow-[#0D9C89]/5 rounded-full px-5 sm:px-7 py-3.5 sm:py-4 flex items-center justify-between transition-all pointer-events-auto">
        {/* Logo Branding */}
        <div 
          onClick={() => setActiveTab('home')} 
          className="cursor-pointer group flex items-center space-x-2.5 sm:space-x-3 shrink-0 select-none"
        >
          {/* TDX Custom SVG Logo */}
          <div className="flex items-center shrink-0">
            <svg viewBox="0 0 110 40" className="h-7 sm:h-8 w-auto select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* T */}
              <path d="M5 8h16v4.5h-5.5v19h-5v-19H5V8z" fill="#0D0C1D" />
              {/* D */}
              <path d="M18.5 8H31c6.5 0 11 4 11 12s-4.5 12-11 12H18.5V8zm5 4.5v15H30c4 0 6.5-2.5 6.5-7.5s-2.5-7.5-6.5-7.5h-6.5z" fill="#0D0C1D" />
              {/* X (Solid Outer Shape) */}
              <path d="M43.5 8H49l8.5 11.5L66 8h5.5l-11.5 15.5L71.5 32H66l-8.5-11.5L49 32h-5.5l11.5-15.5L43.5 8z" fill="#0D9C89" />
              {/* X (Inner Cutout) */}
              <path d="M46 9h2.5l8.5 11.5L65.5 9H68l-9.5 12.8L68.5 31H66l-8.5-11.5L49 31h-2.5l9.5-12.8L46 9z" fill="#FFFFFF" />
            </svg>
          </div>
          
          <div className="flex flex-col border-l border-brand-champagne/80 pl-3">
            <span className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em] uppercase text-brand-charcoal transition-colors">
              THE DENTAL EXPERIENCE
            </span>
            <span className="text-[8px] uppercase tracking-[0.18em] text-brand-charcoal/60 font-medium">
              PESHAWAR
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 mx-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-xs xl:text-sm tracking-wider font-semibold py-1 transition-all whitespace-nowrap ${
                activeTab === item.id
                  ? 'text-[#0D9C89] font-bold'
                  : 'text-brand-charcoal/70 hover:text-[#0D9C89]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA Cluster - Book Now ONLY */}
        <div className="hidden lg:flex items-center shrink-0">
          <button
            onClick={() => onOpenBooking(null)}
            className="px-6 py-2 bg-[#0D9C89] hover:bg-[#0A7B6C] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-1.5 text-brand-charcoal hover:bg-brand-champagne/50 rounded-full transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-[#f0fdfa]/95 backdrop-blur-xl border border-[#0D9C89]/20 rounded-2xl p-4 space-y-3 shadow-xl pointer-events-auto">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wider transition-all ${
                  activeTab === item.id
                    ? 'bg-[#0D9C89]/10 text-[#0D9C89] font-bold'
                    : 'text-brand-charcoal/80 hover:bg-brand-champagne/40'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-brand-champagne/80">
            <button
              onClick={() => {
                onOpenBooking(null);
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-[#0D9C89] hover:bg-[#0A7B6C] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-all text-center block shadow-md"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

