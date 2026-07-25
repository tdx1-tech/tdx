/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeftRight, HelpCircle } from 'lucide-react';
import { CASE_STUDIES } from '../data';
import { CaseStudy } from '../types';
import { splitCompositeImage } from '../utils/splitComposite';

interface CaseStudyCardProps {
  study: CaseStudy;
  onSelectBook: (doctorId: 'mashal' | 'faizan') => void;
}

function CaseStudyCard({ study, onSelectBook }: CaseStudyCardProps) {
  const [pos, setPos] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showFullPhoto, setShowFullPhoto] = useState<boolean>(false);

  // Split images state for top-bottom composite photos
  const [splitResult, setSplitResult] = useState<{ before: string; after: string; aspect: string } | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    if (study.isSplitComposite && study.fullImage) {
      splitCompositeImage(study.fullImage, {
        beforeCropY: study.beforeCropY,
        afterCropY: study.afterCropY,
      })
        .then((res) => setSplitResult(res))
        .catch(() => setSplitResult(null));
    } else {
      setSplitResult(null);
    }
  }, [study.id, study.fullImage, study.isSplitComposite, study.beforeCropY, study.afterCropY]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPos(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isDragging) {
      handleMove(e.clientX);
    }
  };

  const doctorName = study.doctor === 'mashal' ? 'Dr. Mashal Zeb Jan' : 'Dr. Faizan Ul Hassan';
  const isSplit = !!study.isSplitComposite;
  const beforeSrc = splitResult ? splitResult.before : study.beforeImage;
  const afterSrc = splitResult ? splitResult.after : study.afterImage;

  return (
    <div className="space-y-4">
      {/* Photo Container & Mode Toggle */}
      <div className="relative">
        <div
          ref={containerRef}
          onMouseMove={!showFullPhoto ? handleMouseMove : undefined}
          onTouchMove={!showFullPhoto ? handleTouchMove : undefined}
          onMouseDown={!showFullPhoto ? () => setIsDragging(true) : undefined}
          onMouseUp={!showFullPhoto ? () => setIsDragging(false) : undefined}
          onMouseLeave={!showFullPhoto ? () => setIsDragging(false) : undefined}
          className={`relative w-full aspect-[4/3] rounded-[28px] overflow-hidden border border-brand-champagne shadow-md select-none ${isSplit ? 'bg-[#F8F9FA]' : 'bg-black'} ${!showFullPhoto ? 'cursor-ew-resize' : ''}`}
        >
          {showFullPhoto ? (
            /* FULL UNTOUCHED ORIGINAL COMPOSITE PHOTO */
            <div className="w-full h-full flex items-center justify-center bg-black/95 p-2">
              <img
                src={study.fullImage || study.afterImage}
                alt={`${study.title} full clinical presentation`}
                className="w-full h-full object-contain pointer-events-none rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            /* INTERACTIVE SLIDER MODE */
            <>
              {/* AFTER IMAGE */}
              <img
                src={afterSrc}
                alt={`${study.title} after treatment`}
                className={`absolute inset-0 w-full h-full pointer-events-none ${isSplit ? 'object-cover object-center' : 'object-contain object-center'}`}
                referrerPolicy="no-referrer"
              />
              {/* AFTER Pill */}
              <div className="absolute bottom-3 right-3 bg-brand-charcoal/85 backdrop-blur-sm text-white font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-sm z-20 font-bold">
                AFTER
              </div>

              {/* BEFORE IMAGE (clipped width) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${pos}%` }}
              >
                <img
                  src={beforeSrc}
                  alt={`${study.title} before treatment`}
                  className={`absolute inset-y-0 left-0 max-w-none pointer-events-none ${isSplit ? 'h-full object-cover object-center' : 'h-full object-contain object-center'}`}
                  style={{ width: containerWidth ? `${containerWidth}px` : '100%' }}
                  referrerPolicy="no-referrer"
                />
                {/* BEFORE Pill */}
                <div className="absolute bottom-3 left-3 bg-brand-charcoal/85 backdrop-blur-sm text-brand-sand font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-sm z-20 font-bold">
                  BEFORE
                </div>
              </div>

              {/* SLIDER HANDLE LINE */}
              <div
                className="absolute inset-y-0 w-0.5 bg-white cursor-ew-resize z-30"
                style={{ left: `${pos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white text-brand-charcoal rounded-full shadow-lg border border-brand-champagne/40 flex items-center justify-center z-30 hover:scale-110 active:scale-95 transition-transform">
                  <ArrowLeftRight className="w-3.5 h-3.5 text-brand-charcoal" />
                </div>
              </div>
            </>
          )}

          {/* Toggle Full Photo / Slider Button */}
          {study.isSplitComposite && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowFullPhoto(!showFullPhoto);
              }}
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-md hover:bg-white text-brand-charcoal font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm z-40 font-bold border border-brand-champagne transition-all cursor-pointer"
            >
              {showFullPhoto ? 'Interactive Slider' : 'Full Split Photo'}
            </button>
          )}
        </div>
      </div>

      {/* Caption Below Slider */}
      <div className="px-1 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#0D9C89] font-bold bg-[#0D9C89]/10 px-2.5 py-1 rounded-full border border-[#0D9C89]/20">
            {study.category}
          </span>
          <span className="text-xs text-gray-500 font-sans font-medium">
            {doctorName}
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="font-serif text-lg sm:text-xl font-semibold text-brand-charcoal leading-snug">
            {study.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed">
            {study.description}
          </p>
        </div>


        <div className="pt-2 flex items-center justify-between border-t border-brand-champagne/60">

        </div>
      </div>
    </div>
  );
}

interface CaseStudiesViewProps {
  onOpenBooking: (doctorId: 'mashal' | 'faizan') => void;
}

export default function CaseStudiesView({ onOpenBooking }: CaseStudiesViewProps) {
  // Tabs: 'all', 'mashal', 'faizan'
  const [activeDoctorTab, setActiveDoctorTab] = useState<'all' | 'mashal' | 'faizan'>('all');

  const filteredCases = CASE_STUDIES.filter(
    (c) => activeDoctorTab === 'all' || c.doctor === activeDoctorTab
  );

  return (
    <div className="space-y-16 py-12 pb-24">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#0D9C89] font-bold">
          Real Patient Transformations
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-brand-charcoal leading-snug">
          Clinical Before & After <br />
          <span className="text-[#0D9C89] font-serif font-semibold">Case Gallery</span>
        </h1>
        <div className="w-16 h-0.5 bg-[#0D9C89]/30 mx-auto" />
        <p className="font-sans text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
          View authentic clinical cases treated on-site by Dr. Mashal Zeb Jan and Dr. Faizan Ul Hassan. Drag the comparison slider or toggle to view the original split photo.
        </p>

        {/* Doctor Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 pt-4 font-mono text-xs">
          {[
            { id: 'all', label: 'All Cases' },
            { id: 'mashal', label: "Dr. Mashal's Cases" },
            { id: 'faizan', label: "Dr. Faizan's Cases" },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveDoctorTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl border uppercase tracking-wider transition-all cursor-pointer font-bold ${activeDoctorTab === tab.id
                  ? 'bg-[#0D9C89] text-white border-[#0D9C89] shadow-sm'
                  : 'bg-white border-brand-champagne text-brand-charcoal hover:bg-brand-sand/50'
                }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Case Studies 2-Column Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredCases.map((study, idx) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <CaseStudyCard
                  study={study}
                  onSelectBook={onOpenBooking}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Clinical Consent Disclaimer */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-[#F8F9FA] border border-brand-champagne p-5 rounded-2xl flex items-start space-x-3 text-xs text-gray-500 font-sans leading-relaxed shadow-sm">
          <HelpCircle className="w-5 h-5 text-[#0D9C89] shrink-0 mt-0.5" />
          <div>
            <strong className="text-brand-charcoal font-semibold block mb-1">Clinical Consent & Authenticity Note</strong>
            All case photographs shown are authentic, unaltered patient clinical records treated personally by our specialists. Individual biological characteristics, enamel shades, and jaw geometry differ across patients.
          </div>
        </div>
      </section>
    </div>
  );
}
