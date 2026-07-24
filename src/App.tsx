/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import CaseStudiesView from './components/CaseStudiesView';
import ContactView from './components/ContactView';
import BookingWizard from './components/BookingWizard';
import Footer from './components/Footer';
import FloatingAssistWidget from './components/FloatingAssistWidget';
import { MessageSquare, Phone, MapPin, Check, Instagram, Globe } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [preSelectedDoc, setPreSelectedDoc] = useState<'mashal' | 'faizan' | null>(null);
  const [preSelectedSrv, setPreSelectedSrv] = useState<string | null>(null);
  const [recentAppointmentsCount, setRecentAppointmentsCount] = useState<number>(0);

  // Load appointments count from localStorage on mount and updates
  const loadAppointmentsCount = () => {
    const existing = localStorage.getItem('dental_bookings');
    if (existing) {
      const list = JSON.parse(existing);
      setRecentAppointmentsCount(list.length);
    }
  };

  useEffect(() => {
    loadAppointmentsCount();
    // Listen to custom local storage event
    window.addEventListener('storage_update', loadAppointmentsCount);
    return () => {
      window.removeEventListener('storage_update', loadAppointmentsCount);
    };
  }, []);

  // Global CTA opening logic
  const handleOpenBooking = (
    doctorId: 'mashal' | 'faizan' | null = null,
    serviceId: string | null = null
  ) => {
    setPreSelectedDoc(doctorId);
    setPreSelectedSrv(serviceId);
    setIsBookingOpen(true);
  };

  // Scroll to top upon page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-brand-sand text-brand-charcoal flex flex-col font-sans antialiased selection:bg-brand-emerald selection:text-white">
      {/* Clinic Preloader Overlay */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Premium Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={(docId) => handleOpenBooking(docId)}
      />

      {/* Main Content Area with Smooth Page/Section Cross-fade */}
      <main className={`flex-1 ${activeTab !== 'home' ? 'pt-20 sm:pt-24' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            {activeTab === 'home' && (
              <HomeView 
                onOpenBooking={handleOpenBooking} 
                setActiveTab={setActiveTab} 
              />
            )}
            {activeTab === 'about' && (
              <AboutView 
                onOpenBooking={(docId) => handleOpenBooking(docId)} 
              />
            )}
            {activeTab === 'services' && (
              <ServicesView
                onOpenBooking={(docId, srvId) => handleOpenBooking(docId, srvId)}
                preSelectedDoctorId={preSelectedDoc}
              />
            )}
            {activeTab === 'cases' && (
              <CaseStudiesView 
                onOpenBooking={(docId) => handleOpenBooking(docId)} 
              />
            )}
            {activeTab === 'contact' && (
              <ContactView 
                onOpenBooking={(docId) => handleOpenBooking(docId)} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        onOpenBooking={(docId) => handleOpenBooking(docId)} 
      />

      {/* Global Booking Wizard Overlay */}
      <BookingWizard
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedDoctorId={preSelectedDoc}
        preSelectedServiceId={preSelectedSrv}
      />

      {/* Global Floating Assist Widget (Doctor WhatsApp Options) */}
      <FloatingAssistWidget onOpenBooking={(docId) => handleOpenBooking(docId)} />
    </div>
  );
}
