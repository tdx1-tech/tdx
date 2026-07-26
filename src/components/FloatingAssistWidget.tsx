/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, ChevronRight, Sparkles, Phone, MessageCircle } from 'lucide-react';
import drMashal from '@/assets/images/dr-mashal.webp';
import faizan from '@/assets/images/faizan.webp';

interface FloatingAssistWidgetProps {
  onOpenBooking?: (doctorId: 'mashal' | 'faizan') => void;
}

export default function FloatingAssistWidget({ onOpenBooking }: FloatingAssistWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const doctors = [
    {
      id: 'faizan' as const,
      name: 'Dr. Faizan Ul Hassan',
      role: 'Consultant Orthodontist',
      whatsapp: 'https://wa.me/923439591498?text=Hello%20Dr.%20Faizan,%20I%20have%20a%20question%20regarding%20The%20Dental%20Experience.',
      phone: '+92 343 9591498',
      image: faizan,
      badgeColor: 'bg-[#0D9C89]/10 text-[#0D9C89] border-[#0D9C89]/20'
    },
    {
      id: 'mashal' as const,
      name: 'Dr. Mashal Zeb Jan',
      role: 'FCPS Restorative & Aesthetics',
      whatsapp: 'https://wa.me/923165944327?text=Hello%20Dr.%20Mashal,%20I%20have%20a%20question%20regarding%20The%20Dental%20Experience.',
      phone: '+92 316 5944327',
      image: drMashal,
      badgeColor: 'bg-[#0D9C89]/10 text-[#0D9C89] border-[#0D9C89]/20'
    }
  ];

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-3 w-[330px] sm:w-[360px] bg-white rounded-3xl border border-gray-200 shadow-2xl p-5 space-y-4 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-[#22C55E]/10 text-[#22C55E]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-brand-charcoal leading-tight">
                    Contact Doctor
                  </h3>
                  <p className="text-[11px] text-gray-500 font-sans">
                    Select a specialist to chat on WhatsApp
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                aria-label="Close message popover"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Doctor Options */}
            <div className="space-y-3">
              {doctors.map((doc) => (
                <div
                  key={doc.id}
                  className="group relative bg-brand-sand/40 hover:bg-[#22C55E]/5 p-3.5 rounded-2xl border border-gray-200/80 hover:border-[#22C55E]/40 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-full h-full object-cover object-top"
                        style={doc.id === 'faizan' ? { objectPosition: 'center 5%', transform: 'scale(1)' } : undefined}
                        />
                    </div>
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <span className={`inline-block px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded-md border ${doc.badgeColor}`}>
                        {doc.role}
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-brand-charcoal truncate">
                        {doc.name}
                      </h4>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 pt-2.5 border-t border-gray-200/60 flex items-center justify-between gap-2">
                    <a
                      href={doc.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 py-2 px-3 bg-[#22C55E] hover:bg-[#1ebd53] text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center space-x-1.5 transition-all shadow-sm cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    {onOpenBooking && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          onOpenBooking(doc.id);
                        }}
                        className="py-2 px-3 bg-white hover:bg-gray-50 border border-gray-200 text-brand-charcoal rounded-xl text-xs font-mono font-semibold flex items-center space-x-1 transition-all cursor-pointer shrink-0"
                      >
                        <span>Book</span>
                        <ChevronRight className="w-3 h-3 text-[#0D9C89]" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Subtext */}
            <p className="text-[10px] text-center text-gray-400 font-sans italic">
              Clinical response team available Mon - Sat (9am - 8pm)
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-3.5 sm:p-4 bg-[#22C55E] text-white rounded-full shadow-2xl hover:bg-[#1ebd53] transition-all flex items-center justify-center border border-[#22C55E]/40 cursor-pointer group"
        aria-label="Open contact doctor menu"
        title="Contact Dr. Faizan or Dr. Mashal"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageSquare className="w-6 h-6 text-white" />
        )}

        {/* Hover Label for desktop */}
        {!isOpen && (
          <span className="absolute right-16 bg-brand-charcoal text-white text-[11px] font-mono px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg border border-white/10 pointer-events-none">
            Contact Dr. Faizan or Dr. Mashal
          </span>
        )}
      </button>
    </div>
  );
}
