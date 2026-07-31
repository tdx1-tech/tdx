/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Facebook, MessageCircle, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { PatientReview } from '../types';

const SOURCE_META = {
  instagram: { icon: Instagram, label: 'Instagram message' },
  facebook: { icon: Facebook, label: 'Facebook message' },
  whatsapp: { icon: MessageCircle, label: 'WhatsApp message' }
} as const;

interface ReviewCardProps {
  review: PatientReview;
}

function ReviewCard({ review }: ReviewCardProps) {
  const source = SOURCE_META[review.source];
  const SourceIcon = source.icon;

  return (
    <figure
      className="h-full bg-white p-6 rounded-2xl border border-brand-champagne shadow-sm hover:border-brand-mint hover:shadow-md transition-all"
    >
      <Quote className="w-5 h-5 text-brand-mint/70 mb-3" aria-hidden="true" />

      <blockquote className="text-sm text-gray-600 font-sans leading-relaxed">
        {review.text}
      </blockquote>

      <figcaption className="mt-5 pt-4 border-t border-brand-champagne/60 space-y-2">
        {review.treatment && (
          <span className="inline-block font-mono text-[9px] uppercase tracking-widest text-[#0D9C89] font-bold bg-[#0D9C89]/10 px-2.5 py-1 rounded-full border border-[#0D9C89]/20">
            {review.treatment}
          </span>
        )}

        <div className="flex items-center gap-1.5 text-[9px] text-gray-400 font-mono uppercase tracking-widest">
          <SourceIcon className="w-3 h-3" aria-hidden="true" />
          <span>{review.attribution ?? 'Verified patient'}</span>
          <span aria-hidden="true">•</span>
          <span>{source.label}</span>
          {review.translated && (
            <>
              <span aria-hidden="true">•</span>
              <span>Translated</span>
            </>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

interface PatientReviewGridProps {
  reviews: PatientReview[];
  /**
   * Caps the masonry only. The phone carousel always shows every message -
   * swiping through extras costs nothing there, whereas the masonry would grow
   * the page by a full row for each one.
   */
  desktopLimit?: number;
}

/**
 * Patient thank-you messages, laid out as chat-style quote cards.
 *
 * These arrive as redacted social-media screenshots, so there is no avatar,
 * star rating or timestamp to show - the layout leans on the message itself.
 *
 * Phones get a swipeable carousel rather than the full stack: at fourteen
 * messages a single column turns the page into a very long scroll. Each card
 * spans the full content width so its gutters stay even with the surrounding
 * section - an inset peek of the next card would sit the text off-centre.
 *
 * Tablets and up get a CSS column masonry, which keeps the very uneven lengths
 * (from six words to a full paragraph) from tearing holes in a fixed grid.
 */
export default function PatientReviewGrid({ reviews, desktopLimit }: PatientReviewGridProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // Derive the active card from scroll position so swiping, the arrows and the
  // counter never disagree.
  const syncIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    if (!card) return;
    const stride = card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
    if (stride <= 0) return;
    setIndex(Math.min(reviews.length - 1, Math.max(0, Math.round(track.scrollLeft / stride))));
  }, [reviews.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', syncIndex, { passive: true });
    return () => track.removeEventListener('scroll', syncIndex);
  }, [syncIndex]);

  const scrollTo = (target: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[target] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  if (reviews.length === 0) return null;

  const masonryReviews = desktopLimit ? reviews.slice(0, desktopLimit) : reviews;

  return (
    <>
      {/* Phones: swipeable carousel */}
      <div className="sm:hidden">
        <div
          ref={trackRef}
          className="flex items-start gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((rev) => (
            <div key={rev.id} className="snap-start shrink-0 w-full">
              <ReviewCard review={rev} />
            </div>
          ))}
        </div>

        {reviews.length > 1 && (
          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => scrollTo(index - 1)}
              disabled={index === 0}
              aria-label="Previous patient message"
              className="w-9 h-9 rounded-full border border-brand-champagne bg-white text-brand-charcoal flex items-center justify-center shadow-sm transition-all disabled:opacity-30 enabled:hover:border-[#0D9C89] enabled:hover:text-[#0D9C89] enabled:cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 tabular-nums">
              {index + 1} / {reviews.length}
            </span>

            <button
              type="button"
              onClick={() => scrollTo(index + 1)}
              disabled={index === reviews.length - 1}
              aria-label="Next patient message"
              className="w-9 h-9 rounded-full border border-brand-champagne bg-white text-brand-charcoal flex items-center justify-center shadow-sm transition-all disabled:opacity-30 enabled:hover:border-[#0D9C89] enabled:hover:text-[#0D9C89] enabled:cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Tablet and up: masonry columns */}
      <div className="hidden sm:block sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
        {masonryReviews.map((rev, i) => (
          <motion.div
            key={rev.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.07 }}
            className="break-inside-avoid mb-6"
          >
            <ReviewCard review={rev} />
          </motion.div>
        ))}
      </div>
    </>
  );
}
