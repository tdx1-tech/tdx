import React from 'react';
import { motion } from 'motion/react';
import { Facebook, Instagram, Youtube, MessageCircle, Phone, MapPin, Clock } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenBooking: (doctorId: 'mashal' | 'faizan' | null) => void;
}

export default function Footer({ setActiveTab, onOpenBooking }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans"
    >
      {/* Outer Rounded Container mirroring layout from screenshot */}
      <div className="bg-[#0D0C1D] text-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-2xl space-y-10 border border-white/10 relative overflow-hidden">
        
        {/* Main 3-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-8 border-b border-white/10">
          
          {/* Column 1: Brand & Mission (4 cols) */}
          <div className="md:col-span-5 lg:col-span-4 space-y-5">
            <div className="flex items-center space-x-3">
              {/* TDX Logo */}
              <div className="flex items-end font-sans select-none tracking-tighter shrink-0">
                <span className="text-3xl font-black text-white leading-none tracking-tight">TD</span>
                <span className="text-3xl font-light text-[#0D9C89] leading-none relative -ml-0.5 -bottom-[1px]">X</span>
              </div>
              <div className="flex flex-col border-l border-white/20 pl-3">
                <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-white font-serif">
                  THE DENTAL EXPERIENCE
                </span>
                <span className="text-[9px] uppercase tracking-[0.18em] text-[#0D9C89] font-semibold">
                  Aesthetic & Surgery Suite
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed font-light">
              Led by Pakistan's premier FCPS specialists, <strong className="text-white font-semibold">Dr. Faizan Ul Hassan</strong> and <strong className="text-white font-semibold">Dr. Mashal Zeb Jan</strong>, we bring world-class precision, compassionate care, and mastery to aesthetic transformations and advanced orthodontics.
            </p>

            <div className="pt-1 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#0D9C89] animate-pulse" />
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-300 font-medium">
                Peshawar Co-Operative Specialty Clinic
              </span>
            </div>
          </div>

          {/* Column 2: Services List (4 cols) */}
          <div className="md:col-span-3 lg:col-span-4 space-y-4">
            <h4 className="font-serif text-xs font-bold text-[#0D9C89] tracking-[0.2em] uppercase">
              SERVICES
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-light">
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-[#0D9C89] transition-colors text-left">
                  General & Preventive Dentistry
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-[#0D9C89] transition-colors text-left">
                  Endodontics (Microscopic Root Canals)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-[#0D9C89] transition-colors text-left">
                  Cosmetic Dentistry & Porcelain Veneers
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-[#0D9C89] transition-colors text-left">
                  Orthodontics (Braces & Clear Aligners)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-[#0D9C89] transition-colors text-left">
                  Operative Restorations & Composite Bonding
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-[#0D9C89] transition-colors text-left">
                  Oral & Maxillofacial Surgery
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-[#0D9C89] transition-colors text-left">
                  Professional Teeth Whitening
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-[#0D9C89] transition-colors text-left">
                  Dental Implants & Smile Reconstructions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Follow Us + Contact (4 cols) */}
          <div className="md:col-span-4 lg:col-span-4 space-y-6">
            
            

            {/* Contact Section */}
            <div className="space-y-3 pt-2">
              <h4 className="font-serif text-xs font-bold text-[#0D9C89] tracking-[0.2em] uppercase">
                CONTACT
              </h4>
              <div className="space-y-2 text-xs text-gray-300 font-light">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#0D9C89] shrink-0" />
                  <span>+92 316 5944327 / +92 333 9192939</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-[#0D9C89] shrink-0 mt-0.5" />
                  <span>Office 312, 3rd Floor, Uhad Tower, Shaheen Town, Peshawar, Pakistan</span>
                </div>
                <div className="flex items-center space-x-2 pt-1 text-gray-400 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-[#0D9C89] shrink-0" />
                  <span>Mon-Sat: 11:00 AM - 9:00 PM, Sun: Closed</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Pill Card Bar */}
        <div className="bg-white rounded-2xl sm:rounded-full px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-brand-charcoal font-medium shadow-md">
          <div className="text-center sm:text-left">
            <span>© {currentYear} The Dental Experience. All rights reserved.</span>
          </div>
          <div className="text-center sm:text-right text-gray-500 text-[11px] font-sans">
            Co-operative Specialty Clinic · Uhad Tower, Shaheen Town, Peshawar
          </div>
        </div>

      </div>
    </motion.footer>
  );
}
