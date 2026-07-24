/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, ChevronRight, MessageSquare, ExternalLink } from 'lucide-react';
import { DOCTORS } from '../data';

interface ContactViewProps {
  onOpenBooking: (doctorId?: 'mashal' | 'faizan' | null) => void;
}

export default function ContactView({ onOpenBooking }: ContactViewProps) {
  return (
    <div className="space-y-16 py-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.section 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-3xl mx-auto text-center space-y-4"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold">Connect and Book</span>
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-brand-charcoal leading-snug">
          Visit Our Peshawar Suite or <br />
          <span className="text-brand-gold font-semibold">Reserve Your Slot</span>
        </h1>
        <div className="w-16 h-0.5 bg-brand-champagne mx-auto" />
        <p className="font-sans text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
          Reach out to our clinical concierges for scheduling queries, custom smile mockups, or orthodontic alignment consultations.
        </p>
      </motion.section>

      {/* Main Info Columns */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Contact info, Peshawar map placeholder, hours (col-span-5) - Ordered second on mobile, first on desktop */}
        <motion.div 
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 space-y-6 order-2 lg:order-1"
        >
          {/* Clinic Coordinates Box */}
          <div className="bg-brand-emerald text-brand-sand p-6 rounded-2xl border border-brand-emerald-dark shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-medium text-white">Clinic Details</h3>
            <div className="w-8 h-0.5 bg-brand-gold" />

            <div className="space-y-4 font-sans text-xs">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">The Dental Experience</p>
                  <p className="text-brand-champagne/90">
                    Office 312, 3rd Floor, Uhad Tower, Shaheen Town, Peshawar, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 border-t border-brand-emerald-dark/50 pt-3">
                <Clock className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Operational Hours</p>
                  <p className="text-brand-champagne/90">Monday - Saturday: 11:00 AM - 9:00 PM</p>
                  <p className="text-[10px] text-brand-mint font-mono mt-0.5">Sunday: Emergency On-Call Only</p>
                </div>
              </div>
            </div>
          </div>

          {/* Peshawar Interactive Map Mockup */}
          <div className="relative rounded-2xl overflow-hidden border border-brand-champagne aspect-video shadow-sm bg-brand-sand flex flex-col justify-end">
            {/* Visual Vector Map representation */}
            <div className="absolute inset-0 flex items-center justify-center bg-radial-gradient">
              <div className="text-center p-4">
                <MapPin className="w-10 h-10 text-brand-emerald mx-auto animate-bounce mb-2" />
                <span className="font-serif text-xs font-semibold text-brand-charcoal block">Uhad Tower, Shaheen Town</span>
                <span className="text-[10px] text-gray-400 font-mono block">Peshawar, KP, Pakistan</span>
              </div>
            </div>
            
            {/* Bottom Strip */}
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer" 
              className="relative z-10 w-full py-2.5 bg-brand-charcoal/90 text-brand-sand text-center text-[10px] font-mono uppercase tracking-widest hover:bg-brand-charcoal hover:text-white transition-colors flex items-center justify-center space-x-1"
            >
              <span>Get GPS Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

        {/* Dynamic Appointment Embed or Form (col-span-7) - Ordered first on mobile, second on desktop */}
        <motion.div 
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-brand-champagne shadow-sm order-1 lg:order-2"
        >
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-brand-gold font-bold">Appointment Gateway</span>
              <h3 className="font-serif text-xl font-semibold text-brand-charcoal">Request Clinical Intake</h3>
              <p className="text-xs text-gray-500 font-sans">
                Launch our direct scheduling engine below to reserve your slot instantly.
              </p>
            </div>

            {/* Direct Booking Shortcut Button */}
            <motion.button
              whileHover={{ scale: 1.015, y: -1 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onOpenBooking(null)}
              className="w-full py-4 bg-brand-emerald/10 hover:bg-brand-emerald text-brand-emerald hover:text-white rounded-xl border border-brand-emerald/30 hover:border-brand-emerald transition-all font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
            >
              <span>Launch Direct Scheduler</span>
              <ChevronRight className="w-4 h-4 text-brand-gold shrink-0" />
            </motion.button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-brand-champagne"></div>
              <span className="flex-shrink mx-4 text-[10px] font-mono text-gray-400 uppercase tracking-widest">Or Book Via Direct Call or WhatsApp</span>
              <div className="flex-grow border-t border-brand-champagne"></div>
            </div>

            {/* Direct Specialized Lines (Replacing Form) */}
            <div className="space-y-4">
              {DOCTORS.map((doc) => {
                const isMashal = doc.id === 'mashal';
                const streamName = isMashal ? 'Cosmetic Stream' : 'Orthodontic Stream';
                const subtitle = isMashal ? 'FCPS Specialist, Restorations & Smile Design' : 'Consultant Orthodontist & Department Lead';

                return (
                  <div key={doc.id} className="p-5 bg-[#F8F9FA] rounded-2xl border border-brand-champagne flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:border-brand-emerald shadow-sm">
                    <div className="flex items-center space-x-4 w-full sm:w-auto">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border border-brand-champagne shrink-0">
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-full h-full object-cover object-top"
                          style={doc.id === 'faizan' ? { objectPosition: 'center 5%', transform: 'scale(1)' } : undefined}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-0.5 text-left">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-brand-gold font-bold block">{streamName}</span>
                        <h4 className="font-serif text-sm font-semibold text-brand-charcoal">{doc.name}</h4>
                        <p className="text-[10px] text-gray-500 font-sans leading-tight">{subtitle}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0">
                      {/* Call button */}
                      <a
                        href={`tel:${doc.phoneNumber.replace(/\s+/g, '')}`}
                        className="flex-1 sm:flex-initial px-5 py-2.5 bg-brand-emerald hover:bg-brand-emerald-dark text-white rounded-full text-[10px] font-mono uppercase tracking-widest font-bold transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-1.5 shadow-sm"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Direct Call</span>
                      </a>

                      {/* WhatsApp button */}
                      <a
                        href={`https://wa.me/${doc.whatsappNumber.replace('+', '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#22C55E] hover:bg-[#1ebd53] text-white rounded-full text-[10px] font-sans uppercase tracking-widest font-extrabold shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-white shrink-0" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
