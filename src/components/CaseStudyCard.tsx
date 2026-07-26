/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { CaseStudy } from '../types';
import { splitCompositeImage } from '../utils/splitComposite';

interface CaseStudyCardProps {
  study: CaseStudy;
  /** Hides the doctor's name where the surrounding page already establishes it. */
  showDoctorName?: boolean;
}

/**
 * A single before/after case study: draggable comparison slider plus caption.
 * Shared by the Cases page and each doctor's own profile page.
 */
export default function CaseStudyCard({ study, showDoctorName = true }: CaseStudyCardProps) {
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

  // Some composites ship as a single photo that has to be sliced in the browser;
  // others are already split into separate before/after files at build time and
  // only keep fullImage around for the "Full Split Photo" toggle.
  const needsRuntimeSplit =
    !!study.isSplitComposite && !!study.fullImage && study.beforeImage === study.fullImage;

  useEffect(() => {
    if (needsRuntimeSplit && study.fullImage) {
      splitCompositeImage(study.fullImage, {
        beforeCropY: study.beforeCropY,
        afterCropY: study.afterCropY,
      })
        .then((res) => setSplitResult(res))
        .catch(() => setSplitResult(null));
    } else {
      setSplitResult(null);
    }
  }, [study.id, study.fullImage, needsRuntimeSplit, study.beforeCropY, study.afterCropY]);

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
          style={{ aspectRatio: study.aspectRatio ?? 4 / 3 }}
          className={`relative w-full rounded-[28px] overflow-hidden border border-brand-champagne shadow-md select-none ${isSplit ? 'bg-[#F8F9FA]' : 'bg-black'} ${!showFullPhoto ? 'cursor-ew-resize' : ''}`}
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
          {showDoctorName && (
            <span className="text-xs text-gray-500 font-sans font-medium">
              {doctorName}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="font-serif text-lg sm:text-xl font-semibold text-brand-charcoal leading-snug">
            {study.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed">
            {study.description}
          </p>
        </div>
      </div>
    </div>
  );
}
