/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { DOCTORS } from '../data';
import { DoctorType } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: (doctorId?: 'mashal' | 'faizan' | null) => void;
  onViewDoctorProfile: (doctorId: DoctorType) => void;
  /** The doctor whose own page is currently open, if any - highlights that entry in the dropdown. */
  activeDoctorId?: DoctorType | null;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  onOpenBooking,
  onViewDoctorProfile,
  activeDoctorId = null
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSpecialistsOpen, setIsSpecialistsOpen] = useState(false);
  const [isMobileSpecialistsOpen, setIsMobileSpecialistsOpen] = useState(false);
  const specialistsRef = useRef<HTMLDivElement>(null);

  // Close the desktop dropdown on outside click
  useEffect(() => {
    if (!isSpecialistsOpen) return;

    const onClickOutside = (e: MouseEvent) => {
      if (specialistsRef.current && !specialistsRef.current.contains(e.target as Node)) {
        setIsSpecialistsOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isSpecialistsOpen]);

  // 'home' is rendered separately in the desktop nav so "Our Specialists" can
  // slot in right after it as a dropdown; the mobile drawer still uses the
  // full list including 'home' further down.
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
          <button
            onClick={() => setActiveTab('home')}
            className={`text-xs xl:text-sm tracking-wider font-semibold py-1 transition-all whitespace-nowrap ${
              activeTab === 'home'
                ? 'text-[#0D9C89] font-bold'
                : 'text-brand-charcoal/70 hover:text-[#0D9C89]'
            }`}
          >
            Home
          </button>

          {/* Our Specialists - click opens a dropdown to jump straight to either
              doctor's own page, or to the index if you just want an overview. */}
          <div ref={specialistsRef} className="relative">
            <button
              onClick={() => setIsSpecialistsOpen((v) => !v)}
              aria-expanded={isSpecialistsOpen}
              className={`flex items-center gap-1 text-xs xl:text-sm tracking-wider font-semibold py-1 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'about'
                  ? 'text-[#0D9C89] font-bold'
                  : 'text-brand-charcoal/70 hover:text-[#0D9C89]'
              }`}
            >
              <span>Our Specialists</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isSpecialistsOpen ? 'rotate-180' : ''}`} />
            </button>

            {isSpecialistsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-2xl border border-brand-champagne shadow-xl overflow-hidden py-2">
                <button
                  onClick={() => {
                    setActiveTab('about');
                    setIsSpecialistsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-mono uppercase tracking-widest font-bold text-brand-charcoal/60 hover:text-[#0D9C89] hover:bg-[#0D9C89]/5 transition-colors cursor-pointer"
                >
                  All Specialists
                </button>
                <div className="h-px bg-brand-champagne mx-2 my-1" />
                {DOCTORS.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      onViewDoctorProfile(doc.id);
                      setIsSpecialistsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 text-left px-3 py-2.5 transition-colors cursor-pointer ${
                      activeDoctorId === doc.id ? 'bg-[#0D9C89]/10' : 'hover:bg-[#0D9C89]/5'
                    }`}
                  >
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-9 h-9 rounded-full object-cover object-top border border-brand-champagne shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <span className="min-w-0">
                      <span className={`block text-xs font-semibold truncate ${activeDoctorId === doc.id ? 'text-[#0D9C89]' : 'text-brand-charcoal'}`}>
                        {doc.name}
                      </span>
                      <span className="block text-[10px] text-gray-500 truncate">
                        {doc.id === 'mashal' ? 'Cosmetic & Operative Specialist' : 'Consultant Orthodontist'}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {navItems.filter((item) => item.id !== 'home' && item.id !== 'about').map((item) => (
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
            {navItems.map((item) =>
              item.id === 'about' ? (
                <div key={item.id}>
                  <button
                    onClick={() => setIsMobileSpecialistsOpen((v) => !v)}
                    aria-expanded={isMobileSpecialistsOpen}
                    className={`w-full flex items-center justify-between text-left px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wider transition-all cursor-pointer ${
                      activeTab === 'about'
                        ? 'bg-[#0D9C89]/10 text-[#0D9C89] font-bold'
                        : 'text-brand-charcoal/80 hover:bg-brand-champagne/40'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMobileSpecialistsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isMobileSpecialistsOpen && (
                    <div className="pl-3 pt-1 pb-1 space-y-1">
                      <button
                        onClick={() => {
                          setActiveTab('about');
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 rounded-xl text-[11px] font-mono uppercase tracking-widest font-bold text-brand-charcoal/60 hover:bg-brand-champagne/40 transition-colors"
                      >
                        All Specialists
                      </button>
                      {DOCTORS.map((doc) => (
                        <button
                          key={doc.id}
                          onClick={() => {
                            onViewDoctorProfile(doc.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 text-left px-4 py-2 rounded-xl transition-colors ${
                            activeDoctorId === doc.id ? 'bg-[#0D9C89]/10' : 'hover:bg-brand-champagne/40'
                          }`}
                        >
                          <img
                            src={doc.image}
                            alt={doc.name}
                            className="w-7 h-7 rounded-full object-cover object-top border border-brand-champagne shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <span className={`text-xs font-semibold truncate ${activeDoctorId === doc.id ? 'text-[#0D9C89]' : 'text-brand-charcoal/80'}`}>
                            {doc.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
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
              )
            )}
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

