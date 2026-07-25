/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles, Shield, Star, MapPin, Phone, MessageSquare, ChevronDown,
  ChevronRight, ArrowRight, CheckCircle, Clock, ChevronUp, Users, Info, ArrowLeftRight,
  Crown, Sun, Activity, Cpu, Heart, Zap, Layers, Grid, EyeOff, Smile, Maximize2, X, ChevronLeft
} from 'lucide-react';
import heroVideo from '@/assets/The Dental Experience TDX.mp4';

// Gallery images
import clinicTech from '@/assets/images/Gallery/clinic-tech.jpeg';
import drMashalMirrorSelfie from '@/assets/images/Gallery/dr-mashal-mirror-selfie.jpg';
import drMashalTreatingKids from '@/assets/images/Gallery/dr-mashal-treating-kids.jpeg';
import drFaizanInScotland from '@/assets/images/Gallery/dr-faizan-in-scotland.webp';
import drMashalConf from '@/assets/images/Gallery/dr-mashal-conf.jpg';
import clinicTech2 from '@/assets/images/Gallery/clinic-tech-2.webp';
import drFaizanInClinic from '@/assets/images/Gallery/dr-faizan-in-clinic.jpeg';
import clinicWall from '@/assets/images/Gallery/clinic-wall.webp';
import tdxWallLogo from '@/assets/images/Gallery/tdx-wall-logo.webp';
import clinicInterior from '@/assets/images/Gallery/clinic-interior.webp';
import mashal from '@/assets/images/mashal.webp';

import { SERVICES, DOCTORS, CASE_STUDIES, GOOGLE_REVIEWS, FAQS, CLINIC_GOOGLE_REVIEW_URL } from '../data';
import { Doctor, Service } from '../types';

const IconMap: Record<string, React.ComponentType<any>> = {
  Sparkles: Sparkles,
  Crown: Crown,
  Sun: Sun,
  CheckCircle: CheckCircle,
  Shield: Shield,
  Activity: Activity,
  Cpu: Cpu,
  Heart: Heart,
  Zap: Zap,
  Layers: Layers,
  Grid: Grid,
  EyeOff: EyeOff,
  Smile: Smile,
};

interface HomeCaseSliderCardProps {
  title: string;
  desc: string;
  beforeImg: string;
  afterImg: string;
  doctorNote: string;
}

function HomeCaseSliderCard({
  title,
  desc,
  beforeImg,
  afterImg,
  doctorNote
}: HomeCaseSliderCardProps) {
  const [pos, setPos] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

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

  return (
    <div className="space-y-4">
      {/* Interactive Slider Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        className="relative w-full aspect-[16/10] rounded-[32px] overflow-hidden border border-brand-champagne shadow-md cursor-ew-resize select-none bg-brand-sand/20"
      >
        {/* AFTER IMAGE */}
        <img
          src={afterImg}
          alt={`${title} after treatment`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
        />
        {/* AFTER Pill - bottom right */}
        <div className="absolute bottom-4 right-4 bg-brand-charcoal/80 backdrop-blur-sm text-white font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-sm z-20 font-bold">
          AFTER
        </div>

        {/* BEFORE IMAGE (clipped width) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <img
            src={beforeImg}
            alt={`${title} before treatment`}
            className="absolute inset-0 w-[420px] sm:w-[580px] md:w-[700px] lg:w-[580px] xl:w-[700px] h-full object-cover max-w-none pointer-events-none"
            referrerPolicy="no-referrer"
          />
          {/* BEFORE Pill - bottom left */}
          <div className="absolute bottom-4 left-4 bg-brand-charcoal/80 backdrop-blur-sm text-brand-sand font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-sm z-20 font-bold">
            BEFORE
          </div>
        </div>

        {/* SLIDER HANDLE LINE */}
        <div
          className="absolute inset-y-0 w-0.5 bg-white cursor-ew-resize z-30"
          style={{ left: `${pos}%` }}
        >
          {/* Draggable Button with Double Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white text-brand-charcoal rounded-full shadow-lg border border-brand-champagne/40 flex items-center justify-center z-30 hover:scale-110 active:scale-95 transition-transform">
            <ArrowLeftRight className="w-3.5 h-3.5 text-brand-charcoal" />
          </div>
        </div>
      </div>

      {/* Texts Below as in the screenshot */}
      <div className="px-1 space-y-1 text-left">
        <h3 className="font-serif text-lg font-semibold text-brand-charcoal leading-tight">
          {title}
        </h3>
        <p className="text-xs text-gray-500 font-sans leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

interface HomeViewProps {
  onOpenBooking: (doctorId?: 'mashal' | 'faizan' | null, serviceId?: string | null) => void;
  setActiveTab: (tab: string) => void;
}

export default function HomeView({ onOpenBooking, setActiveTab }: HomeViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay was prevented by the browser. Waiting for user interaction to resume.", err);
        });
      }
    }
  }, []);

  // Flip states for service cards
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Call prompt state for booking redirects
  const [callPromptData, setCallPromptData] = useState<{
    doctorName: string;
    phoneNumber: string;
    whatsappNumber: string;
    serviceTitle: string;
  } | null>(null);

  // FAQ open states
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Interactive gallery selection state
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState<number | null>(null);
  const [mobileGalleryIdx, setMobileGalleryIdx] = useState<number>(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) {
      // Swipe left -> Next photo
      setMobileGalleryIdx((prev) => (prev + 1) % galleryImages.length);
    } else if (distance < -40) {
      // Swipe right -> Previous photo
      setMobileGalleryIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const galleryImages = [
    {
      url: clinicTech,
      category: 'Therapy Room',
      title: 'Treatment Room',
      desc: 'A modern treatment space designed for patient comfort and precise care.',
      gridClasses: 'md:col-span-2 md:row-span-2 aspect-square'
    },
    {
      url: drMashalMirrorSelfie,
      category: 'Smile Design',
      title: 'Dr. Mashal Mirror Selfie',
      desc: 'Authentic team energy and confidence in our patient-first smile studio.',
      gridClasses: 'md:col-span-1 md:row-span-1 aspect-square'
    },
    {
      url: drMashalTreatingKids,
      category: 'Family Care',
      title: 'Pediatric Treatment',
      desc: 'Compassionate pediatric dentistry in a calm, welcoming environment.',
      gridClasses: 'md:col-span-1 md:row-span-1 aspect-square'
    },
    {
      url: drFaizanInScotland,
      category: 'Expertise',
      title: 'International Credentials',
      desc: 'Professional development and global training are part of our clinical foundation.',
      gridClasses: 'md:col-span-1 md:row-span-1 aspect-square'
    },
    {
      url: drMashalConf,
      category: 'Consultation',
      title: 'Patient Consultation',
      desc: 'Detailed patient review and customized smile planning led by our specialist team.',
      gridClasses: 'md:col-span-1 md:row-span-1 aspect-square'
    },
    {
      url: clinicTech2,
      category: 'Technology',
      title: 'Clinical Technology',
      desc: 'Advanced clinical equipment supports accurate diagnostics and efficient treatment.',
      gridClasses: 'md:col-span-1 md:row-span-1 aspect-square'
    },
    {
      url: drFaizanInClinic,
      category: 'Orthodontics',
      title: 'Dr. Faizan in Clinic',
      desc: 'A real patient consultation moment captured in our dedicated orthodontic suite.',
      gridClasses: 'md:col-span-1 md:row-span-1 aspect-square'
    },
    {
      url: clinicWall,
      category: 'Clinic Brand',
      title: 'Brand Wall',
      desc: 'Signature branding and interior details that express our premium clinic identity.',
      gridClasses: 'md:col-span-1 md:row-span-1 aspect-square'
    },
    {
      url: tdxWallLogo,
      category: 'Clinic Identity',
      title: 'TDX Wall Logo',
      desc: 'A bold brand statement that welcomes patients into our clinic environment.',
      gridClasses: 'md:col-span-1 md:row-span-1 aspect-square'
    },
    {
      url: clinicInterior,
      category: 'Interior',
      title: 'Clinic Interior',
      desc: 'A spacious clinical interior showcasing the calm, premium atmosphere of our practice.',
      gridClasses: 'md:col-span-4 h-48 md:h-64'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION WITH BACKGROUND VIDEO */}
      <section className="relative min-h-[85vh] sm:min-h-screen pt-32 pb-20 sm:pt-36 lg:pt-48 lg:pb-36 flex items-center overflow-hidden">
        {/* Background Video Elements */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster={clinicInterior}
          >
            <source src={heroVideo} type="video/mp4" />
            {/* Fallback sources */}
            <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054773d1e3e6f9661331c19b674cf48&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
            <source src="https://assets.mixkit.co/videos/preview/mixkit-dentist-working-on-a-patients-mouth-44444-large.mp4" type="video/mp4" />
            {/* Fallback image */}
            <img
              src={clinicInterior}
              className="w-full h-full object-cover"
              alt="The Dental Experience Lobby"
            />
          </video>
          {/* Dark overlay gradient tuned for stronger left-side contrast and clear right-side clinic visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/68 via-50% sm:via-60% to-black/25 z-10 pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          {/* Main Grid: text takes the left side, leaving the right open so the clinic walkthrough video is visible */}
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Text Left */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-8 space-y-6 sm:space-y-8"
            >

              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.08] text-white tracking-tight">
                The Art of a, <br />
                <span className="text-[#16c7af] font-serif font-medium">Healthy Smile.</span>
              </h1>

              <p className="font-sans text-base sm:text-lg lg:text-xl text-gray-100 max-w-2xl leading-relaxed font-light">
                At <span className="font-normal text-white">The Dental Experience</span>, we blend advanced dental technology with a warm, welcoming atmosphere delivering world-class care you'll actually look forward to.
              </p>

              {/* Main Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenBooking(null)}
                  className="px-8 py-3.5 bg-[#0D9C89] hover:bg-[#0A7B6C] text-white rounded-xl text-xs font-mono uppercase tracking-widest font-medium transition-all shadow-md flex items-center justify-center space-x-2 border border-white/20 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <span>BOOK AN APPOINTMENT</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab('services')}
                  className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-xl text-xs font-mono uppercase tracking-widest font-medium transition-all flex items-center justify-center space-x-2 backdrop-blur-sm cursor-pointer"
                >
                  <span>EXPLORE SERVICES</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </motion.button>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CLINICAL OWNERS INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-14 space-y-3"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#0D9C89] font-bold">Meet Your Doctors</span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-brand-charcoal leading-tight">
            Uncompromising Excellence in<br /> <span className="text-[#0D9C89] font-semibold">Two Specialized Streams</span>
          </h2>
          <div className="w-16 h-0.5 bg-[#0D9C89]/30 mx-auto mt-3" />
          <p className="text-gray-500 text-base leading-relaxed font-sans max-w-3xl mx-auto pt-1">
            We don't practice general dentistry. Dr. Mashal Zeb Jan leads aesthetic & microscopic restorations, while Dr. Faizan Ul Hassan directs orthodontic alignment and surgical protocols.
          </p>
        </motion.div>

        <div className="space-y-12 max-w-6xl mx-auto">
          {DOCTORS.map((doc, idx) => {
            const isMashal = doc.id === 'mashal';
            const eyebrow = isMashal ? "MEET YOUR COSMETIC & OPERATIVE SPECIALIST" : "MEET YOUR CONSULTANT ORTHODONTIST";
            const fullBio = isMashal
              ? "Dr. Mashal Zeb Jan is a specialist in Operative Dentistry and Endodontics, holding the prestigious FCPS qualification awarded by the College of Physicians and Surgeons Pakistan. She is the first resident of Rehman College of Dentistry to clear FCPS Part II, and the youngest consultant in her specialty to pass the examination in Pakistan - clearing it on her first attempt. She brings that same standard of precision and commitment to every patient she treats."
              : "Dr. Faizan Ul Hassan is a Consultant Orthodontist and FCPS Fellow leading advanced dentofacial orthopedics and surgical alignment protocols. Having personally treated over 550+ complex orthodontic cases, he serves as a Principal Facilitator for National Postgraduate Workshops at CPSP and directs comprehensive smile straightening with microscopic precision.";

            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -3 }}
                className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-gray-100 shadow-xl shadow-gray-100/50 flex flex-col md:flex-row items-center gap-8 lg:gap-12 transition-all duration-300"
              >
                {/* Left Column: Offset Image Frame Layout */}
                <div className="w-full md:w-5/12 lg:w-4/12 shrink-0">
                  <div className="relative mx-auto max-w-sm md:max-w-none">
                    {/* Offset backdrop layer */}
                    <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-full h-full rounded-2xl bg-[#0D9C89]/20 border border-[#0D9C89]/30" />

                    {/* Foreground image card */}
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-md aspect-[3/4] bg-gray-100 border border-gray-200/80">
                      <img
                        src={doc.id === 'mashal' ? mashal : doc.image}
                        alt={doc.name}
                        className="w-full h-full object-cover object-top"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Narrative Content */}
                <div className="w-full md:w-7/12 lg:w-8/12 space-y-4 text-left">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#0D9C89] font-bold block">
                    {eyebrow}
                  </span>

                  <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-charcoal leading-tight">
                    {doc.name}
                  </h3>

                  <p className="text-xs font-mono uppercase tracking-wider text-gray-500 font-medium">
                    {doc.title}
                  </p>

                  <p className="text-sm sm:text-base font-sans text-gray-600 leading-relaxed pt-1">
                    {fullBio}
                  </p>

                  {/* Action buttons */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setCallPromptData({
                          doctorName: doc.name,
                          phoneNumber: doc.phoneNumber,
                          whatsappNumber: doc.whatsappNumber,
                          serviceTitle: 'Bespoke Specialist Consultation'
                        });
                      }}
                      className="px-6 py-3 bg-white hover:bg-gray-50 text-[#0D9C89] border border-[#0D9C89] rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
                    >
                      Book Consultation
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('about')}
                      className="px-6 py-3 border border-gray-200 hover:border-[#0D9C89] text-brand-charcoal hover:text-[#0D9C89] rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      View Credentials
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. LOOK INSIDE SECTION (CLINIC PHOTOS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-brand-champagne pb-6">
          <div className="space-y-2 max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-brand-charcoal">
              Get to Know Our Space
            </h2>
            <p className="text-gray-500 text-sm sm:text-base font-sans leading-relaxed pt-1">
              Take a look around our clinic, from our welcoming spaces to the friendly faces behind every smile. We want you to feel at home before you even walk through the door.
            </p>
          </div>
        </div>

        {/* Desktop Bento Gallery Grid (Hidden on mobile) */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img, index) => (
            <motion.div
              key={img.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => setSelectedGalleryIdx(index)}
              className={`group relative overflow-hidden bg-gradient-to-br from-white to-brand-sand/40 rounded-[32px] border border-brand-champagne/40 shadow-md cursor-pointer ${img.gridClasses} flex flex-col`}
            >
              <div className="relative w-full h-full overflow-hidden flex-1">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Subtle hover overlay gradient */}
                <div className="absolute inset-0 bg-brand-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Top-Right expand visual (maximize icon) - elegant white background circle */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-brand-charcoal hover:bg-brand-gold hover:text-white transition-all duration-300 w-8 h-8 rounded-full flex items-center justify-center shadow-md z-10">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Single Photo Gallery Carousel (Mobile screens only) */}
        <div className="block sm:hidden space-y-4">
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative rounded-[28px] overflow-hidden bg-brand-charcoal border border-brand-champagne shadow-lg aspect-[4/3] flex items-center justify-center group select-none cursor-pointer"
            onClick={() => setSelectedGalleryIdx(mobileGalleryIdx)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={mobileGalleryIdx}
                src={galleryImages[mobileGalleryIdx].url}
                alt={galleryImages[mobileGalleryIdx].title}
                initial={{ opacity: 0.3, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.3, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full object-contain object-center"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>

            {/* Gradient overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none" />

            {/* Counter Badge (Top-Right) */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white font-mono text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-sm z-10">
              {mobileGalleryIdx + 1} / {galleryImages.length}
            </div>

            {/* Left Arrow Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMobileGalleryIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
              }}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 active:scale-90 text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-md transition-all z-20 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Arrow Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMobileGalleryIdx((prev) => (prev + 1) % galleryImages.length);
              }}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 active:scale-90 text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-md transition-all z-20 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Fullscreen Expand Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedGalleryIdx(mobileGalleryIdx);
              }}
              aria-label="Expand image full screen"
              className="absolute bottom-4 right-4 bg-white/90 text-brand-charcoal p-2 rounded-full shadow-md z-20 active:scale-90 transition-transform cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Control Bar with Prev / Dots / Next */}
          <div className="flex items-center justify-between py-2 px-1">
            <button
              type="button"
              onClick={() => setMobileGalleryIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-brand-charcoal font-mono text-xs font-semibold flex items-center space-x-1 transition-colors shadow-sm cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            {/* Dots indicator */}
            <div className="flex items-center space-x-1.5 overflow-x-auto max-w-[150px] px-1 py-1">
              {galleryImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMobileGalleryIdx(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${idx === mobileGalleryIdx
                      ? 'w-5 bg-[#0D9C89]'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setMobileGalleryIdx((prev) => (prev + 1) % galleryImages.length)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-brand-charcoal font-mono text-xs font-semibold flex items-center space-x-1 transition-colors shadow-sm cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {selectedGalleryIdx !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop with heavy blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedGalleryIdx(null)}
                className="absolute inset-0 bg-brand-charcoal/95 backdrop-blur-xl cursor-zoom-out"
              />

              {/* Lightbox content card */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="relative max-w-5xl w-full flex flex-col items-center justify-center z-10 pointer-events-none"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedGalleryIdx(null)}
                  className="absolute -top-14 right-0 text-white hover:text-brand-gold bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-300 z-50 shadow-lg pointer-events-auto"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedGalleryIdx((prev) => (prev === null ? 0 : (prev - 1 + galleryImages.length) % galleryImages.length));
                  }}
                  className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 text-white hover:text-brand-gold bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 z-50 shadow-lg pointer-events-auto"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedGalleryIdx((prev) => (prev === null ? 0 : (prev + 1) % galleryImages.length));
                  }}
                  className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 text-white hover:text-brand-gold bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 z-50 shadow-lg pointer-events-auto"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* High Res Image */}
                <div className="relative max-h-[80vh] flex items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-brand-charcoal shadow-2xl pointer-events-auto">
                  <img
                    src={galleryImages[selectedGalleryIdx].url}
                    alt={galleryImages[selectedGalleryIdx].title}
                    className="max-h-[80vh] w-auto max-w-full object-contain rounded-3xl select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* 5. DYNAMIC BEFORE/AFTER SLIDERS (GLIMPSE OF CASE STUDIES) */}
      <section className="bg-[#F8F9FA] text-brand-charcoal py-24 border-y border-brand-champagne">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold">Transformative Clinical Results</span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-brand-charcoal">
                A Glimpse of Our Case Studies
              </h2>
              <p className="font-sans text-sm text-gray-500 max-w-2xl leading-relaxed">
                Drag the slider to compare before and after, and see the transformation from clinical treatment to a beautifully natural smile.
              </p>
            </div>

            <div className="shrink-0">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('cases')}
                className="px-6 py-3 bg-brand-emerald hover:bg-brand-emerald-dark text-white rounded-lg text-xs font-mono uppercase tracking-widest font-bold transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer"
              >
                <span>View Full Case Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Interactive Drag Comparison Canvas */}
          {/* Sliders Grid: 2 Columns matching user screenshot */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Case Card 1: Crown Restoration / Ceramic Restoration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.05 }}
              whileHover={{ y: -3 }}
            >
              <HomeCaseSliderCard
                title="Crown Restoration"
                desc="Natural-looking ceramic crown replacing a cracked molar."
                beforeImg="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800"
                afterImg="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
                doctorNote="Dr. Faizan Ul Hassan"
              />
            </motion.div>

            {/* Case Card 2: Smile Whitening */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ y: -3 }}
            >
              <HomeCaseSliderCard
                title="Smile Whitening"
                desc="Professional in-office whitening, visibly brighter in a single visit."
                beforeImg="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
                afterImg="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800"
                doctorNote="Dr. Mashal Zeb Jan"
              />
            </motion.div>
          </div>

        </div>
      </section>

      {/* 6. GOOGLE REVIEWS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-semibold">Verified Google Reviews</span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-brand-charcoal">
            What Our Patients Say
          </h2>
          <div className="w-16 h-0.5 bg-brand-champagne mx-auto mt-4" />
          <p className="text-gray-500 text-sm font-sans">
            We hold ourselves to a flawless standard of dental hygiene and customer concierge. Read honest feedback from our real patients.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GOOGLE_REVIEWS.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white p-6 rounded-2xl border border-brand-champagne shadow-sm hover:border-brand-mint hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Stars */}
                <div className="flex items-center space-x-0.5 text-brand-gold">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-gray-600 font-sans italic leading-relaxed line-clamp-6">
                  "{rev.text}"
                </p>
              </div>

              {/* Author Row */}
              <div className="flex items-center space-x-3 pt-4 border-t border-brand-champagne/60">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-brand-sand">
                  <img
                    src={rev.avatarUrl}
                    alt={rev.author}
                    className="w-full h-full object-cover object-top scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-brand-charcoal">{rev.author}</h4>
                  <div className="flex items-center space-x-1.5 text-[9px] text-gray-400 font-mono">
                    <span>{rev.timeAgo}</span>
                    <span>•</span>
                    <span className="text-brand-mint font-bold">Google Maps</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={CLINIC_GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white border border-brand-champagne hover:border-brand-emerald hover:text-brand-emerald text-brand-charcoal rounded-xl text-xs font-mono uppercase tracking-wider transition-all shadow-sm hover:shadow group cursor-pointer"
          >
            <Star className="w-4 h-4 text-brand-gold fill-brand-gold" />
            <span>Leave a Review on Google Maps</span>
            <span className="text-gray-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </a>
        </div>
      </section>

      {/* 7. FAQS - 2 COLUMN MODERN UI (MATCHING DESIGN LAYOUT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Heading + Tag + Still Have Questions Card (Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6 lg:sticky lg:top-28"
          >
            <div className="space-y-3">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0D9C89]/10 text-[#0D9C89] text-xs font-mono font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D9C89]" />
                <span>Clarify Clinical Steps</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-charcoal tracking-tight leading-none pt-1">
                Frequently asked questions
              </h2>
            </div>

            {/* Still Have Questions Box (Desktop only) */}
            <div className="hidden lg:block bg-gradient-to-br from-[#0D9C89]/10 via-[#0D9C89]/5 to-transparent p-7 sm:p-8 rounded-3xl border border-[#0D9C89]/20 shadow-sm space-y-4">
              <h3 className="font-serif text-xl font-semibold text-brand-charcoal">
                Still have questions?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed">
                Can't find the exact answer you're looking for? Reach out to our clinical reception or book a direct consultation with our specialists.
              </p>
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenBooking(null)}
                  className="px-6 py-3 bg-[#0D9C89] hover:bg-[#0A7B6C] text-white rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-sm cursor-pointer"
                >
                  Book Consultation
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Individual Stacked Accordion Cards + Still Have Questions (Mobile) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-4"
          >
            {FAQS.map((faq, index) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                      ? 'bg-white border-[#0D9C89]/40 shadow-md'
                      : 'bg-[#F8F9FA] hover:bg-white border-gray-200/80 hover:border-gray-300 shadow-sm'
                    }`}
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex justify-between items-center group gap-4 cursor-pointer"
                  >
                    <span className="font-serif text-base sm:text-lg font-medium text-brand-charcoal group-hover:text-[#0D9C89] transition-colors leading-snug">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all shrink-0 ${isOpen
                        ? 'bg-[#0D9C89] text-white border-[#0D9C89] rotate-180'
                        : 'bg-white text-gray-500 border-gray-200 group-hover:border-[#0D9C89] group-hover:text-[#0D9C89]'
                      }`}>
                      <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-600 font-sans leading-relaxed border-t border-gray-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Still Have Questions Box (Mobile only - placed at the bottom below FAQs) */}
            <div className="block lg:hidden pt-4">
              <div className="bg-gradient-to-br from-[#0D9C89]/10 via-[#0D9C89]/5 to-transparent p-7 sm:p-8 rounded-3xl border border-[#0D9C89]/20 shadow-sm space-y-4">
                <h3 className="font-serif text-xl font-semibold text-brand-charcoal">
                  Still have questions?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed">
                  Can't find the exact answer you're looking for? Reach out to our clinical reception or book a direct consultation with our specialists.
                </p>
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onOpenBooking(null)}
                    className="px-6 py-3 bg-[#0D9C89] hover:bg-[#0A7B6C] text-white rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-sm cursor-pointer"
                  >
                    Book Consultation
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 5. CALL / WHATSAPP PROMPT MODAL */}
      <AnimatePresence>
        {callPromptData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur & Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCallPromptData(null)}
              className="absolute inset-0 bg-brand-charcoal/60 backdrop-blur-md"
            />

            {/* Modal Card content */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md bg-white rounded-2xl border border-brand-champagne shadow-2xl p-6 overflow-hidden z-10"
            >
              {/* Top ambient warm gold glow */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-gold via-brand-champagne to-brand-gold" />

              <div className="space-y-5 text-center mt-2">
                <div className="mx-auto w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                  <Phone className="w-5 h-5" />
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gold font-bold block">
                    Specialized Booking Stream
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-brand-charcoal">
                    Call to Reserve Your Slot
                  </h3>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
                    To book <span className="font-semibold text-brand-charcoal">{callPromptData.serviceTitle}</span>, reach out directly to the clinical team of:
                  </p>
                </div>

                {/* Doctor Mini Profile */}
                <div className="p-4 bg-brand-sand/60 rounded-xl border border-brand-champagne/40 flex flex-col items-center">
                  <p className="font-serif text-base font-semibold text-brand-charcoal">
                    {callPromptData.doctorName}
                  </p>
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mt-0.5">
                    Consultant Specialist
                  </p>
                </div>

                {/* Call Actions */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href={`tel:${callPromptData.phoneNumber.replace(/\s+/g, '')}`}
                    className="flex items-center justify-center space-x-2 py-3 px-4 bg-brand-emerald hover:bg-brand-emerald-dark text-white rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-colors shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-white" />
                    <span>Direct Call</span>
                  </a>

                  <a
                    href={`https://wa.me/${callPromptData.whatsappNumber.replace('+', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center space-x-2 py-3 px-4 bg-[#22C55E] hover:bg-[#1ebd53] text-white rounded-full text-xs font-sans uppercase tracking-widest font-extrabold shadow-md transition-all hover:scale-105 active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>WHATSAPP</span>
                  </a>
                </div>

                <button
                  onClick={() => setCallPromptData(null)}
                  className="w-full py-2 text-xs font-mono text-gray-400 hover:text-brand-charcoal transition-colors uppercase tracking-wider"
                >
                  Go Back
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
