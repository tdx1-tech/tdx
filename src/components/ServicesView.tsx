/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Crown, Sun, CheckCircle, Shield, Activity, Cpu, Heart, 
  ArrowRight, Clock, HelpCircle, Check, Award, ChevronRight, Zap, Layers, Grid, EyeOff, Smile
} from 'lucide-react';
import { SERVICES, DOCTORS } from '../data';
import { Service } from '../types';

interface ServicesViewProps {
  onOpenBooking: (doctorId: 'mashal' | 'faizan', serviceId: string) => void;
  preSelectedDoctorId?: 'mashal' | 'faizan' | null;
}

// Dedicated Visual Graphic Component with animated illustration / icon artwork per service
function ServiceVisualIllustration({ serviceId, index }: { serviceId: string; index: number }) {
  // Staggered float animation config for organic movement
  const floatAnim = {
    y: [0, -7, 0],
    scale: [1, 1.025, 1],
    rotate: [0, 1.2, -1.2, 0]
  };

  const floatTransition = {
    duration: 3.6 + (index % 3) * 0.5,
    repeat: Infinity,
    ease: "easeInOut"
  };

  if (serviceId === 'porcelain-veneers') {
    return (
      <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#FFF5EC] via-[#F8F9FA] to-[#E6F4F1] p-4 flex items-center justify-center overflow-hidden border border-amber-100/60 shadow-inner">
        {/* Soft background radial blur */}
        <div className="absolute inset-0 bg-radial from-brand-gold/15 via-transparent to-transparent opacity-70 pointer-events-none" />
        
        {/* Animated Floating Graphic */}
        <motion.div 
          animate={floatAnim}
          transition={floatTransition}
          className="relative flex flex-col items-center justify-center space-y-2 z-10"
        >
          <div className="relative w-24 h-24 rounded-full bg-white shadow-lg border border-amber-100 flex items-center justify-center">
            {/* Tooth Vector with Sparkles */}
            <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#0D9C89]">
              <path 
                d="M50,15 C32,15 22,25 22,40 C22,58 35,82 42,88 C45,90 47,85 50,85 C53,85 55,90 58,88 C65,82 78,58 78,40 C78,25 68,15 50,15 Z" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <path 
                d="M32,25 Q50,38 68,25" 
                fill="none" 
                stroke="#D4AF37" 
                strokeWidth="3" 
                strokeLinecap="round" 
              />
            </svg>
            <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-brand-gold animate-pulse" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gold font-bold">Porcelain Translucency</span>
        </motion.div>
      </div>
    );
  }

  if (serviceId === 'smile-makeover') {
    return (
      <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#FFF8E7] via-[#FDFBF7] to-[#F3EFE0] p-4 flex items-center justify-center overflow-hidden border border-amber-200/50 shadow-inner">
        <div className="absolute inset-0 bg-radial from-brand-gold/20 via-transparent to-transparent opacity-60 pointer-events-none" />
        
        <motion.div 
          animate={floatAnim}
          transition={floatTransition}
          className="relative flex flex-col items-center justify-center space-y-2 z-10"
        >
          <div className="relative w-24 h-24 rounded-full bg-white shadow-lg border border-amber-200 flex items-center justify-center">
            <Crown className="w-12 h-12 text-brand-gold" />
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-gold/30 animate-spin-slow" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-charcoal font-bold">Signature Design</span>
        </motion.div>
      </div>
    );
  }

  if (serviceId === 'laser-whitening') {
    return (
      <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#E6F8F5] via-[#F4FCFA] to-[#D5F2EC] p-4 flex items-center justify-center overflow-hidden border border-teal-100 shadow-inner">
        <div className="absolute inset-0 bg-radial from-[#0D9C89]/20 via-transparent to-transparent opacity-60 pointer-events-none" />
        
        <motion.div 
          animate={floatAnim}
          transition={floatTransition}
          className="relative flex flex-col items-center justify-center space-y-2 z-10"
        >
          <div className="relative w-24 h-24 rounded-full bg-white shadow-lg border border-teal-200 flex items-center justify-center">
            <Zap className="w-12 h-12 text-[#0D9C89]" />
            <Sun className="absolute -top-2 -right-2 w-7 h-7 text-brand-gold animate-bounce" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#0D9C89] font-bold">Laser Zoom Rays</span>
        </motion.div>
      </div>
    );
  }

  if (serviceId === 'composite-bonding') {
    return (
      <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#F5EEF8] via-[#FDFBFD] to-[#EBF3F8] p-4 flex items-center justify-center overflow-hidden border border-purple-100 shadow-inner">
        <motion.div 
          animate={floatAnim}
          transition={floatTransition}
          className="relative flex flex-col items-center justify-center space-y-2 z-10"
        >
          <div className="relative w-24 h-24 rounded-full bg-white shadow-lg border border-purple-100 flex items-center justify-center">
            <Layers className="w-12 h-12 text-purple-600" />
            <Sparkles className="absolute -bottom-1 -right-1 w-6 h-6 text-brand-gold" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-purple-700 font-bold">Artisanal Layering</span>
        </motion.div>
      </div>
    );
  }

  if (serviceId === 'fixed-orthodontics') {
    return (
      <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#EBF5FB] via-[#F7FCFF] to-[#E3F2FD] p-4 flex items-center justify-center overflow-hidden border border-blue-100 shadow-inner">
        <motion.div 
          animate={floatAnim}
          transition={floatTransition}
          className="relative flex flex-col items-center justify-center space-y-2 z-10"
        >
          <div className="relative w-24 h-24 rounded-full bg-white shadow-lg border border-blue-200 flex items-center justify-center">
            <Grid className="w-12 h-12 text-blue-600" />
            <Shield className="absolute -top-1 -right-1 w-6 h-6 text-[#0D9C89]" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-blue-700 font-bold">Precision Braces</span>
        </motion.div>
      </div>
    );
  }

  if (serviceId === 'lingual-orthodontics') {
    return (
      <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#F0F3F4] via-[#FAFCFC] to-[#E2E8E9] p-4 flex items-center justify-center overflow-hidden border border-gray-200 shadow-inner">
        <motion.div 
          animate={floatAnim}
          transition={floatTransition}
          className="relative flex flex-col items-center justify-center space-y-2 z-10"
        >
          <div className="relative w-24 h-24 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center">
            <EyeOff className="w-12 h-12 text-brand-charcoal" />
            <Cpu className="absolute -bottom-1 -left-1 w-6 h-6 text-brand-gold" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-charcoal font-bold">Hidden Lingual Setup</span>
        </motion.div>
      </div>
    );
  }

  if (serviceId === 'cleft-orthodontics') {
    return (
      <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#FDF2F4] via-[#FFFDFE] to-[#FCE8EC] p-4 flex items-center justify-center overflow-hidden border border-rose-100 shadow-inner">
        <motion.div 
          animate={floatAnim}
          transition={floatTransition}
          className="relative flex flex-col items-center justify-center space-y-2 z-10"
        >
          <div className="relative w-24 h-24 rounded-full bg-white shadow-lg border border-rose-200 flex items-center justify-center">
            <Heart className="w-12 h-12 text-rose-500 fill-rose-100" />
            <Activity className="absolute -top-1 -right-1 w-6 h-6 text-brand-emerald" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-rose-600 font-bold">Specialized Care</span>
        </motion.div>
      </div>
    );
  }

  if (serviceId === 'surgical-orthodontics') {
    return (
      <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#E8F8F5] via-[#F4FCFA] to-[#D1F2EB] p-4 flex items-center justify-center overflow-hidden border border-emerald-100 shadow-inner">
        <motion.div 
          animate={floatAnim}
          transition={floatTransition}
          className="relative flex flex-col items-center justify-center space-y-2 z-10"
        >
          <div className="relative w-24 h-24 rounded-full bg-white shadow-lg border border-emerald-200 flex items-center justify-center">
            <Activity className="w-12 h-12 text-[#0D9C89]" />
            <Zap className="absolute -top-1 -left-1 w-6 h-6 text-brand-gold" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#0D9C89] font-bold">Accelerated Tech</span>
        </motion.div>
      </div>
    );
  }

  // Fallback for clear-aligners or default
  return (
    <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#EBF5FB] via-[#F7FCFF] to-[#E3F2FD] p-4 flex items-center justify-center overflow-hidden border border-blue-100 shadow-inner">
      <motion.div 
        animate={floatAnim}
        transition={floatTransition}
        className="relative flex flex-col items-center justify-center space-y-2 z-10"
      >
        <div className="relative w-24 h-24 rounded-full bg-white shadow-lg border border-blue-200 flex items-center justify-center">
          <Shield className="w-12 h-12 text-[#0D9C89]" />
          <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-brand-gold" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-blue-700 font-bold">Invisible Aligners</span>
      </motion.div>
    </div>
  );
}

export default function ServicesView({ onOpenBooking, preSelectedDoctorId = null }: ServicesViewProps) {
  // Tabs: 'mashal' (Aesthetic) or 'faizan' (Surgical)
  const [activeDoctorTab, setActiveDoctorTab] = useState<'mashal' | 'faizan'>(
    preSelectedDoctorId || 'mashal'
  );

  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter services by doctor
  const filteredServices = SERVICES.filter((s) => s.doctor === activeDoctorTab);
  const activeDoctor = DOCTORS.find((d) => d.id === activeDoctorTab);

  // Helper mapping string to lucide icons
  const IconMap: Record<string, React.ComponentType<any>> = {
    Sparkles,
    Crown,
    Sun,
    CheckCircle,
    Shield,
    Activity,
    Cpu,
    Heart,
    Zap,
    Layers,
    Grid,
    EyeOff,
    Smile,
  };

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
                src="/src/assets/images/Dr Mashal.webp"
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
                src="/src/assets/images/Faizan.webp"
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
            {filteredServices.map((srv, index) => {
              const isFlipped = !!flippedCards[srv.id];
              const docName = srv.doctor === 'mashal' ? 'Dr. Mashal' : 'Dr. Faizan';

              return (
                <motion.div
                  key={srv.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-[510px] relative [perspective:1000px]"
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 25 }}
                    className="w-full h-full relative [transform-style:preserve-3d] transition-all"
                  >
                    {/* FRONT SIDE (REFERENCE CARD LAYOUT) */}
                    <div className="absolute inset-0 bg-white p-7 rounded-[32px] border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-[#0D9C89]/30 transition-all duration-300 flex flex-col justify-between [backface-visibility:hidden] group">
                      
                      <div className="space-y-3">
                        {/* Stream Badge */}
                        <div className="flex justify-end items-center">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-[#0D9C89] font-bold bg-[#0D9C89]/10 px-2.5 py-0.5 rounded-full">
                            {docName} Stream
                          </span>
                        </div>

                        {/* Service Title */}
                        <h3 className="font-serif text-2xl font-semibold text-brand-charcoal leading-snug tracking-tight">
                          {srv.title}
                        </h3>

                        {/* Short Description */}
                        <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed line-clamp-2">
                          {srv.shortDescription}
                        </p>

                        {/* Inner Media Card Container with Animated Moving Graphic */}
                        <div className="w-full h-52 my-3 relative">
                          <ServiceVisualIllustration serviceId={srv.id} index={index} />
                        </div>
                      </div>

                      {/* Bottom Action Row & Gradient Progress Bar */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => toggleFlip(srv.id)}
                            className="text-xs font-mono font-semibold text-[#0D9C89] hover:text-[#0A7B6C] flex items-center space-x-1 cursor-pointer transition-colors"
                          >
                            <span>Clinical Protocol & Benefits</span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#0D9C89]" />
                          </button>
                        </div>

                        {/* Bottom Gradient Accent Line (matching reference card design) */}
                        <div className="w-full h-1.5 rounded-full bg-gradient-to-r from-orange-400 via-[#0D9C89] to-sky-400 opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    {/* BACK SIDE (BENEFITS & PROTOCOL) */}
                    <div className="absolute inset-0 bg-[#0D0C1D] text-white p-7 rounded-[32px] border border-white/10 shadow-xl flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <div>
                        <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/10">
                          <span className="font-serif text-xs font-bold text-brand-gold italic">Clinical Protocol</span>
                          <button
                            type="button"
                            onClick={() => toggleFlip(srv.id)}
                            className="text-[10px] font-mono text-gray-400 hover:text-white uppercase tracking-wider underline cursor-pointer"
                          >
                            ← Back
                          </button>
                        </div>

                        <h4 className="font-serif text-lg font-semibold text-white mb-3">{srv.title}</h4>
                        
                        <div className="space-y-2">
                          <p className="text-[10px] text-brand-gold font-mono uppercase tracking-widest font-bold">Key Benefits:</p>
                          <ul className="space-y-2 text-xs">
                            {srv.benefits.map((b, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <span className="text-[#0D9C89] text-xs shrink-0 font-bold">✓</span>
                                <span className="text-gray-300 font-sans leading-relaxed">{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenBooking(srv.doctor, srv.id);
                          }}
                          className="w-full py-3 bg-[#0D9C89] hover:bg-[#0A7B6C] text-white text-center text-xs font-mono uppercase tracking-widest font-bold rounded-xl transition-all shadow-md cursor-pointer"
                        >
                          Book Treatment Slot
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

