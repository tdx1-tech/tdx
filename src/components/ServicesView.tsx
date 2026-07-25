/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import drMashal from '@/assets/images/dr-mashal.webp';
import faizan from '@/assets/images/faizan.webp';
import { SERVICES } from '../data';
import ServiceFlipCard from './ServiceFlipCard';

interface ServicesViewProps {
  onOpenBooking: (doctorId: 'mashal' | 'faizan', serviceId: string) => void;
  preSelectedDoctorId?: 'mashal' | 'faizan' | null;
}

export default function ServicesView({ onOpenBooking, preSelectedDoctorId = null }: ServicesViewProps) {
  // Tabs: 'mashal' (Aesthetic) or 'faizan' (Surgical)
  const [activeDoctorTab, setActiveDoctorTab] = useState<'mashal' | 'faizan'>(
    preSelectedDoctorId || 'mashal'
  );

  // Filter services by doctor
  const filteredServices = SERVICES.filter((s) => s.doctor === activeDoctorTab);

  return (
    <div className="space-y-16 py-12 pb-24">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#0D9C89] font-bold">Clinical Specialties</span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-charcoal leading-snug">
          Separate Specialized <br />
          <span className="text-[#0D9C89] font-semibold">Treatment Streams</span>
        </h1>
        <div className="w-16 h-0.5 bg-brand-champagne mx-auto" />
        <p className="font-sans text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          We believe in elite mastery over general dentistry. Choose a doctor's stream below to browse their dedicated services, clinical steps, and custom protocols.
        </p>

        {/* Doctor Stream Filter Buttons */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto pt-8">
          {/* Dr Mashal Tab */}
          <motion.button
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => setActiveDoctorTab('mashal')}
            className={`p-6 rounded-3xl border text-left transition-all flex items-center space-x-4 cursor-pointer relative overflow-hidden ${
              activeDoctorTab === 'mashal'
                ? 'bg-brand-sand border-[#0D9C89] text-[#0D9C89] shadow-md ring-2 ring-[#0D9C89]/20'
                : 'bg-white border-brand-champagne text-brand-charcoal hover:bg-brand-sand/50 shadow-sm hover:border-brand-champagne-dark'
            }`}
          >
              <div className={`relative w-16 h-16 rounded-full overflow-hidden border-2 shrink-0 ${
              activeDoctorTab === 'mashal' ? 'border-[#0D9C89] shadow-sm' : 'border-brand-champagne'
            }`}>
              <img
                src={drMashal}
                alt="Dr. Mashal"
                className="w-full h-full object-cover object-top scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gold font-bold block">Cosmetic Stream</span>
              <h3 className="font-serif text-lg font-semibold text-brand-charcoal">Dr. Mashal's Services</h3>
              <span className="text-xs text-gray-500 font-sans block leading-tight">FCPS Specialist, Restorations & Smile Design</span>
            </div>
            {activeDoctorTab === 'mashal' && (
              <div className="absolute top-3 right-3 bg-[#0D9C89] text-white p-1 rounded-full">
                <Check className="w-3.5 h-3.5" />
              </div>
            )}
          </motion.button>

          {/* Dr Faizan Tab */}
          <motion.button
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => setActiveDoctorTab('faizan')}
            className={`p-6 rounded-3xl border text-left transition-all flex items-center space-x-4 cursor-pointer relative overflow-hidden ${
              activeDoctorTab === 'faizan'
                ? 'bg-brand-mint-light/30 border-brand-mint text-[#0D9C89] shadow-md ring-2 ring-brand-mint/20'
                : 'bg-white border-brand-champagne text-brand-charcoal hover:bg-brand-sand/50 shadow-sm hover:border-brand-champagne-dark'
            }`}
          >
            <div className={`relative w-16 h-16 rounded-full overflow-hidden border-2 shrink-0 ${
              activeDoctorTab === 'faizan' ? 'border-brand-mint shadow-sm' : 'border-brand-champagne'
            }`}>
              <img
                src={faizan}
                alt="Dr. Faizan"
                className="w-full h-full object-cover object-top"
                style={{ objectPosition: 'center 5%', transform: 'scale(1)' }}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gold font-bold block">Orthodontic Stream</span>
              <h3 className="font-serif text-lg font-semibold text-brand-charcoal">Dr. Faizan's Services</h3>
              <span className="text-xs text-gray-500 font-sans block leading-tight">Consultant Orthodontist & Department Lead</span>
            </div>
            {activeDoctorTab === 'faizan' && (
              <div className="absolute top-3 right-3 bg-[#0D9C89] text-white p-1 rounded-full">
                <Check className="w-3.5 h-3.5" />
              </div>
            )}
          </motion.button>
        </div>
      </motion.section>

      {/* Main Stream Section - Cards Grid matching reference layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((srv, index) => (
              <motion.div
                key={srv.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ServiceFlipCard
                  service={srv}
                  index={index}
                  onOpenBooking={onOpenBooking}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
