/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, ArrowRight, Award, BookOpen, GraduationCap, CheckCircle,
  Phone, MessageCircle, Instagram, Maximize2, X, ChevronLeft, ChevronRight, Images,
  Stethoscope, Sparkles
} from 'lucide-react';
import { DOCTORS, SERVICES, CASE_STUDIES } from '../data';
import { Doctor, DoctorPhoto, DoctorType } from '../types';
import ServiceFlipCard from './ServiceFlipCard';
import CaseStudyCard from './CaseStudyCard';

interface DoctorProfileViewProps {
  doctor: Doctor;
  onOpenBooking: (doctorId: DoctorType, serviceId?: string | null) => void;
  /** Returns to the Our Specialists index page. */
  onBack: () => void;
  /** Switches this page over to the other doctor. */
  onViewDoctorProfile: (doctorId: DoctorType) => void;
  setActiveTab: (tab: string) => void;
}

/**
 * Headline numbers shown under the hero. Every figure here is drawn from the
 * biography the clinic already publishes for that doctor - keep it that way.
 */
const DOCTOR_HIGHLIGHTS: Record<DoctorType, { value: string; label: string }[]> = {
  mashal: [
    { value: 'FCPS', label: 'Operative Dentistry & Endodontics, CPSP' },
    { value: '1st', label: 'RCD resident to clear FCPS Part II' },
    { value: 'Youngest', label: 'Consultant in her specialty in Pakistan' }
  ],
  faizan: [
    { value: '1300+', label: 'Cases treated over 15 years' },
    { value: '17', label: 'Workshops and courses facilitated' },
    { value: '21', label: 'Published research articles' }
  ]
};

/** Case studies shown on a doctor's page. The full set stays on the Cases page. */
const MAX_CASES_ON_PROFILE = 4;

/**
 * Column count for the photo strip, so every doctor's photos sit on one row
 * regardless of how many they have. Tailwind needs the full class name here.
 */
const PHOTO_ROW_COLUMNS: Record<number, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5'
};

export default function DoctorProfileView({
  doctor,
  onOpenBooking,
  onBack,
  onViewDoctorProfile,
  setActiveTab
}: DoctorProfileViewProps) {
  /** Open lightbox. It carries its own photo set so both galleries can share it. */
  const [lightbox, setLightbox] = useState<{ photos: DoctorPhoto[]; index: number } | null>(null);

  const services = useMemo(() => SERVICES.filter((s) => s.doctor === doctor.id), [doctor.id]);
  const allCases = useMemo(() => CASE_STUDIES.filter((c) => c.doctor === doctor.id), [doctor.id]);
  const cases = allCases.slice(0, MAX_CASES_ON_PROFILE);
  const otherDoctor = DOCTORS.find((d) => d.id !== doctor.id);
  const photos = doctor.photos;
  const coursePhotos = doctor.coursePhotos ?? [];
  const highlights = DOCTOR_HIGHLIGHTS[doctor.id] ?? [];
  const firstName = doctor.name.split(' ')[1] ?? doctor.name;
  const whatsappHref = `https://wa.me/${doctor.whatsappNumber.replace(/\D/g, '')}`;

  const stepLightbox = (delta: number) =>
    setLightbox((lb) =>
      lb ? { ...lb, index: (lb.index + delta + lb.photos.length) % lb.photos.length } : lb
    );

  // Close the lightbox and step through photos with the keyboard
  useEffect(() => {
    if (!lightbox) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') stepLightbox(1);
      if (e.key === 'ArrowLeft') stepLightbox(-1);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightbox]);

  return (
    <div className="pb-24">
      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Breadcrumb back to the specialists index */}
        <button
          type="button"
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-bold text-gray-500 hover:text-[#0D9C89] transition-colors cursor-pointer mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Our Specialists</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-gray-100 shadow-xl shadow-gray-100/50 flex flex-col md:flex-row items-center gap-8 lg:gap-12"
        >
          {/* Lead portrait with the offset frame used across the site */}
          <div className="w-full md:w-5/12 lg:w-4/12 shrink-0">
            <div className="relative mx-auto max-w-sm md:max-w-none">
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-full h-full rounded-2xl bg-[#0D9C89]/20 border border-[#0D9C89]/30" />
              <div className="relative z-10 w-full rounded-2xl overflow-hidden shadow-md aspect-[3/4] bg-gray-100 border border-gray-200/80">
                <img
                  src={photos[0]?.src ?? doctor.image}
                  alt={photos[0]?.alt ?? doctor.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Name, title, biography and primary actions */}
          <div className="w-full md:w-7/12 lg:w-8/12 space-y-5 text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-[#0D9C89] font-bold block">
              {doctor.id === 'mashal' ? 'Cosmetic & Operative Specialist' : 'Consultant Orthodontist'}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-charcoal leading-tight">
              {doctor.name}
            </h1>

            <p className="text-xs font-mono uppercase tracking-wider text-gray-500 font-medium">
              {doctor.title}
            </p>

            <p className="text-sm sm:text-base font-sans text-gray-600 leading-relaxed whitespace-pre-line">
              {doctor.detailedBio}
            </p>

            {/* Headline figures */}
            {highlights.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {highlights.map((h) => (
                  <div
                    key={h.label}
                    className="bg-[#F8F9FA] border border-brand-champagne rounded-2xl px-4 py-3 space-y-0.5"
                  >
                    <span className="block font-serif text-xl sm:text-2xl font-semibold text-[#0D9C89] leading-none">
                      {h.value}
                    </span>
                    <span className="block text-[11px] text-gray-500 font-sans leading-snug">
                      {h.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Primary actions */}
            <div className="pt-3 flex flex-col sm:flex-row flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpenBooking(doctor.id)}
                className="px-6 py-3 bg-[#0D9C89] hover:bg-[#0A7B6C] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Book an Appointment</span>
              </motion.button>

              {doctor.instagramUrl && (
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={doctor.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${doctor.name} on Instagram`}
                  className="w-11 h-11 rounded-full border border-[#0D9C89]/30 text-[#0D9C89] hover:bg-[#0D9C89] hover:text-white flex items-center justify-center transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
                >
                  <Instagram className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= PHOTO GALLERY ================= */}
      <section
        id="section-gallery"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 scroll-mt-28"
      >
        <SectionHeading
          eyebrow="In Practice"
          title={`Dr. ${firstName} in Photos`}
          description="Moments from the clinic, convocation and continuing education - tap any photo to view it full screen."
          icon={Images}
        />

        {/* Two-up on phones, then every photo side by side on one row */}
        <div className={`grid grid-cols-2 gap-4 sm:gap-5 ${PHOTO_ROW_COLUMNS[photos.length] ?? 'sm:grid-cols-4'}`}>
          {photos.map((photo, idx) => (
            <motion.button
              key={photo.src}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              onClick={() => setLightbox({ photos, index: idx })}
              className="group relative overflow-hidden rounded-[28px] border border-brand-champagne/60 shadow-md bg-gray-100 cursor-pointer text-left aspect-[3/4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9C89] focus-visible:ring-offset-2"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Caption plate */}
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/50 to-transparent px-4 pt-10 pb-3.5 block">
                <span className="block text-[11px] sm:text-xs text-white font-sans font-medium leading-snug">
                  {photo.caption}
                </span>
              </span>

              {/* Expand affordance */}
              <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-brand-charcoal group-hover:bg-[#0D9C89] group-hover:text-white transition-all duration-300 w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                <Maximize2 className="w-3.5 h-3.5" />
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ================= CREDENTIALS ================= */}
      <section
        id="section-credentials"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 scroll-mt-28"
      >
        <SectionHeading
          eyebrow="Verified Background"
          title="Credentials & Clinical Focus"
          description={`The qualifications, certifications and honours behind Dr. ${firstName}'s treatment planning.`}
          icon={Award}
          indent="pl-6 sm:pl-7"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <CredentialCard icon={GraduationCap} title="Education & Residencies" items={doctor.education} />

          <CredentialCard icon={BookOpen} title="Certifications" items={doctor.certs} />

          <CredentialCard icon={Award} title="Honours & Awards" items={doctor.honors} />

          <CredentialCard icon={Stethoscope} title="Clinical Focus Areas" items={doctor.specialties} />
        </div>
      </section>

      {/* ================= COURSES & TRAINING ================= */}
      {doctor.courses.length > 0 && (
        <section
          id="section-courses"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 scroll-mt-28"
        >
          <SectionHeading
            eyebrow="Continuing Education"
            title="Courses & Training Attended"
            description={`Postgraduate workshops, certifications and hands-on programmes Dr. ${firstName} has taken part in.`}
            icon={Sparkles}
            indent="pl-6 sm:pl-10"
          />

          {/* Course list on the left, training photography alongside it.
              items-stretch (the grid default) makes the photo column match
              the course card's height on desktop, instead of the two racing
              to their own natural sizes. */}
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-stretch">
          <div className={`bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-lg shadow-gray-100/50 ${coursePhotos.length > 0 ? 'lg:col-span-3' : 'lg:col-span-5'}`}>
            <ol className="relative space-y-8 sm:space-y-9">
              {/* Timeline rail - hidden on the smallest screens where it crowds the text */}
              <span className="hidden sm:block absolute left-[7px] top-2 bottom-2 w-px bg-brand-champagne" aria-hidden="true" />

              {doctor.courses.map((course, idx) => (
                <motion.li
                  key={`${course.title}-${idx}`}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="relative sm:pl-8"
                >
                  <span className="hidden sm:block absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-white border-[3px] border-[#0D9C89]" aria-hidden="true" />

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <h3 className="font-serif text-base sm:text-lg font-semibold text-brand-charcoal leading-snug">
                        {course.title}
                      </h3>
                      {course.role && (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#0D9C89] font-bold bg-[#0D9C89]/10 px-2.5 py-1 rounded-full border border-[#0D9C89]/20 whitespace-nowrap">
                          {course.role}
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-mono uppercase tracking-wider text-gray-500 font-medium">
                      {[course.provider, course.location, course.year].filter(Boolean).join(' · ')}
                    </p>

                    {course.description && (
                      <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed max-w-3xl pt-0.5">
                        {course.description}
                      </p>
                    )}
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Side gallery - training, workshop and convocation photography.
              h-full lets it stretch to the course card's height on desktop;
              on mobile (no stretch context) each tile falls back to aspect-[4/5]. */}
          {coursePhotos.length > 0 && (
            <div className="lg:col-span-2 grid grid-cols-1 gap-4 sm:gap-5 h-full">
              {coursePhotos.map((photo, idx) => (
                <motion.button
                  key={photo.src}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  onClick={() => setLightbox({ photos: coursePhotos, index: idx })}
                  className="group relative overflow-hidden rounded-[28px] border border-brand-champagne/60 shadow-md bg-gray-100 cursor-pointer text-left aspect-[4/5] lg:aspect-auto lg:h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9C89] focus-visible:ring-offset-2"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />

                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/50 to-transparent px-4 pt-10 pb-3.5 block">
                    <span className="block text-[11px] sm:text-xs text-white font-sans font-medium leading-snug">
                      {photo.caption}
                    </span>
                  </span>

                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-brand-charcoal group-hover:bg-[#0D9C89] group-hover:text-white transition-all duration-300 w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </motion.button>
              ))}
            </div>
          )}
          </div>
        </section>
      )}

      {/* ================= SERVICES ================= */}
      <section
        id="section-services"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 scroll-mt-28"
      >
        <SectionHeading
          eyebrow="Treatment Stream"
          title={`Services by Dr. ${firstName}`}
          description="Flip any card to see the clinical protocol, key benefits and to reserve a treatment slot."
          icon={Stethoscope}
          indent="pl-7"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (idx % 3) * 0.06 }}
            >
              <ServiceFlipCard
                service={srv}
                index={idx}
                onOpenBooking={onOpenBooking}
                showStreamBadge={false}
              />
            </motion.div>
          ))}
        </div>

        <div className="pt-8 text-center">
          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 hover:border-[#0D9C89] text-brand-charcoal hover:text-[#0D9C89] rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
          >
            <span>Browse all clinic services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ================= CASE STUDIES ================= */}
      <section
        id="section-cases"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 scroll-mt-28"
      >
        <SectionHeading
          eyebrow="Real Patient Results"
          title={`Case Studies by Dr. ${firstName}`}
          description="Authentic, unaltered clinical records. Drag the slider on any case to compare before and after."
          icon={Sparkles}
        />

        {cases.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {cases.map((study, idx) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (idx % 2) * 0.06 }}
              >
                <CaseStudyCard study={study} showDoctorName={false} />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 font-sans">
            Case photography for this specialist is being prepared and will be published shortly.
          </p>
        )}

        {allCases.length > cases.length && (
          <div className="pt-8 text-center">
            <button
              type="button"
              onClick={() => setActiveTab('cases')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 hover:border-[#0D9C89] text-brand-charcoal hover:text-[#0D9C89] rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>See all cases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="pt-10">
          <div className="bg-[#F8F9FA] border border-brand-champagne p-5 rounded-2xl text-xs text-gray-500 font-sans leading-relaxed shadow-sm">
            <strong className="text-brand-charcoal font-semibold block mb-1">Clinical Consent & Authenticity Note</strong>
            All case photographs shown are authentic, unaltered patient clinical records treated personally by our specialists. Individual biological characteristics, enamel shades, and jaw geometry differ across patients.
          </div>
        </div>
      </section>

      {/* ================= CLOSING CTA ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="bg-[#0D0C1D] text-white rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 shadow-2xl border border-white/10 space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#0D9C89] font-bold">
              Ready When You Are
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug">
              Book a consultation with Dr. {firstName}
            </h2>
            <p className="text-sm text-gray-300 font-sans leading-relaxed">
              Bring your questions, your photographs, or simply your concerns. You will get a straight answer about what is possible and what it involves.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onOpenBooking(doctor.id)}
              className="px-7 py-3.5 bg-[#0D9C89] hover:bg-[#0A7B6C] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Book an appointment</span>
            </button>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all backdrop-blur-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book via WhatsApp</span>
            </a>

            {doctor.instagramUrl && (
              <a
                href={doctor.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all backdrop-blur-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow on Instagram</span>
              </a>
            )}
          </div>

          {/* Cross-link to the other specialist */}
          {otherDoctor && (
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shrink-0">
                  <img
                    src={otherDoctor.image}
                    alt={otherDoctor.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-0.5">
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                    Also at the clinic
                  </span>
                  <span className="block font-serif text-base font-semibold text-white">
                    {otherDoctor.name}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onViewDoctorProfile(otherDoctor.id)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/30 hover:border-[#0D9C89] hover:text-[#0D9C89] text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap"
              >
                <span>View profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= PHOTO LIGHTBOX ================= */}
      <AnimatePresence>
        {lightbox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
              className="absolute inset-0 bg-brand-charcoal/95 backdrop-blur-xl cursor-zoom-out"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative max-w-4xl w-full flex flex-col items-center justify-center z-10 pointer-events-none"
            >
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Close photo"
                className="absolute -top-14 right-0 text-white hover:text-[#0D9C89] bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-300 z-50 shadow-lg pointer-events-auto cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {lightbox.photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      stepLightbox(-1);
                    }}
                    aria-label="Previous photo"
                    className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 text-white hover:text-[#0D9C89] bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 z-50 shadow-lg pointer-events-auto cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      stepLightbox(1);
                    }}
                    aria-label="Next photo"
                    className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 text-white hover:text-[#0D9C89] bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 z-50 shadow-lg pointer-events-auto cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              <div className="relative max-h-[78vh] flex items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-brand-charcoal shadow-2xl pointer-events-auto">
                <img
                  src={lightbox.photos[lightbox.index].src}
                  alt={lightbox.photos[lightbox.index].alt}
                  className="max-h-[78vh] w-auto max-w-full object-contain rounded-3xl select-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="mt-4 text-center text-xs sm:text-sm text-gray-300 font-sans max-w-xl pointer-events-auto">
                {lightbox.photos[lightbox.index].caption}
                <span className="block mt-1 font-mono text-[10px] uppercase tracking-widest text-gray-500">
                  {lightbox.index + 1} / {lightbox.photos.length}
                </span>
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Shared heading block so every section on this page lines up identically.
 *
 * The heading sits directly in the section (which only contributes the
 * page's own gutter), while the cards below it add their own internal
 * padding on top of that gutter - so their text lands further right than
 * the heading unless we compensate. `indent` passes that compensation in
 * (matching whichever card's own padding follows), and is left unset for
 * sections whose content sits flush with the section edge already (photo
 * grids, before/after sliders) where no correction is needed.
 */
function SectionHeading({
  eyebrow,
  title,
  description,
  icon: Icon,
  indent = ''
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  indent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className={`mb-10 space-y-3 max-w-3xl ${indent}`}
    >
      <span className="font-mono text-xs uppercase tracking-widest text-[#0D9C89] font-bold flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {eyebrow}
      </span>
      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-brand-charcoal leading-snug">
        {title}
      </h2>
      <div className="w-16 h-0.5 bg-[#0D9C89]/30" />
      <p className="font-sans text-gray-500 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

/** Checklist card used for education, certifications, honours and focus areas. */
function CredentialCard({
  icon: Icon,
  title,
  items,
  className = ''
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: string[];
  className?: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45 }}
      className={`bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-lg shadow-gray-100/50 space-y-4 ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <span className="w-9 h-9 rounded-full bg-[#0D9C89]/10 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-[#0D9C89]" />
        </span>
        <h3 className="font-serif text-base font-semibold text-brand-charcoal">{title}</h3>
      </div>

      <ul className="space-y-2.5">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-[#0D9C89] shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
