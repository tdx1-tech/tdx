/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import DoctorProfileView from './components/DoctorProfileView';
import ServicesView from './components/ServicesView';
import CaseStudiesView from './components/CaseStudiesView';
import ContactView from './components/ContactView';
import BookingWizard from './components/BookingWizard';
import Footer from './components/Footer';
import FloatingAssistWidget from './components/FloatingAssistWidget';
import { DOCTORS } from './data';
import { DoctorType } from './types';

/** Hash prefix for the per-doctor pages, e.g. #/doctors/dr-mashal-zeb-jan */
const DOCTOR_HASH_PREFIX = '#/doctors/';

/** Reads the doctor slug out of the current URL hash, if there is one. */
function doctorIdFromHash(): DoctorType | null {
  if (!window.location.hash.startsWith(DOCTOR_HASH_PREFIX)) return null;
  const slug = window.location.hash.slice(DOCTOR_HASH_PREFIX.length);
  return DOCTORS.find((d) => d.slug === slug)?.id ?? null;
}

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [preSelectedDoc, setPreSelectedDoc] = useState<'mashal' | 'faizan' | null>(null);
  const [preSelectedSrv, setPreSelectedSrv] = useState<string | null>(null);
  const [recentAppointmentsCount, setRecentAppointmentsCount] = useState<number>(0);

  // The doctor whose own page is being shown. Seeded from the URL so a shared
  // link like /#/doctors/dr-faizan-ul-hassan opens straight onto that profile.
  const [activeDoctorId, setActiveDoctorId] = useState<DoctorType | null>(doctorIdFromHash);
  const [activeTab, setActiveTab] = useState<string>(() =>
    doctorIdFromHash() ? 'doctor' : 'home'
  );

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

  // Scroll to top upon page navigation. Also fires when switching between the
  // two doctor pages, since activeDoctorId changes with it.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, activeDoctorId]);

  // Keep the URL hash in step with the doctor pages so profiles stay shareable
  // and the browser back button behaves the way visitors expect.
  useEffect(() => {
    const targetHash =
      activeTab === 'doctor' && activeDoctorId
        ? DOCTOR_HASH_PREFIX + DOCTORS.find((d) => d.id === activeDoctorId)!.slug
        : '';

    if (window.location.hash === targetHash) return;

    if (targetHash) {
      window.history.pushState(null, '', targetHash);
    } else {
      // Drop the hash without leaving a bare "#" behind in the address bar
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  }, [activeTab, activeDoctorId]);

  // Browser back / forward between a doctor page and the rest of the site
  useEffect(() => {
    const syncFromHash = () => {
      const id = doctorIdFromHash();
      if (id) {
        setActiveDoctorId(id);
        setActiveTab('doctor');
      } else {
        setActiveTab((tab) => (tab === 'doctor' ? 'about' : tab));
      }
    };

    window.addEventListener('popstate', syncFromHash);
    return () => window.removeEventListener('popstate', syncFromHash);
  }, []);

  // Ordinary tab navigation
  const navigateToTab = (tab: string) => {
    setActiveTab(tab);
  };

  // Open a doctor's own page
  const handleViewDoctorProfile = (doctorId: 'mashal' | 'faizan') => {
    setActiveDoctorId(doctorId);
    setActiveTab('doctor');
  };

  const activeDoctor = DOCTORS.find((d) => d.id === activeDoctorId) ?? DOCTORS[0];

  return (
    <div className="min-h-screen bg-brand-sand text-brand-charcoal flex flex-col font-sans antialiased selection:bg-brand-emerald selection:text-white">
      {/* Clinic Preloader Overlay */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Premium Navigation Header. A doctor page keeps "Our Specialists" lit,
          since that is the section it belongs to. */}
      <Navbar
        activeTab={activeTab === 'doctor' ? 'about' : activeTab}
        setActiveTab={navigateToTab}
        onOpenBooking={(docId) => handleOpenBooking(docId)}
        onViewDoctorProfile={handleViewDoctorProfile}
        activeDoctorId={activeTab === 'doctor' ? activeDoctorId : null}
      />

      {/* Main Content Area with Smooth Page/Section Cross-fade */}
      <main className={`flex-1 ${activeTab !== 'home' ? 'pt-20 sm:pt-24' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab === 'doctor' ? `doctor-${activeDoctorId}` : activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            {activeTab === 'home' && (
              <HomeView
                onOpenBooking={handleOpenBooking}
                setActiveTab={navigateToTab}
                onViewDoctorProfile={handleViewDoctorProfile}
              />
            )}
            {activeTab === 'about' && (
              <AboutView
                onOpenBooking={(docId) => handleOpenBooking(docId)}
                onViewDoctorProfile={handleViewDoctorProfile}
              />
            )}
            {activeTab === 'doctor' && (
              <DoctorProfileView
                doctor={activeDoctor}
                onOpenBooking={(docId, srvId) => handleOpenBooking(docId, srvId ?? null)}
                onBack={() => navigateToTab('about')}
                onViewDoctorProfile={handleViewDoctorProfile}
                setActiveTab={navigateToTab}
              />
            )}
            {activeTab === 'services' && (
              <ServicesView
                onOpenBooking={(docId, srvId) => handleOpenBooking(docId, srvId)}
                preSelectedDoctorId={preSelectedDoc}
              />
            )}
            {activeTab === 'cases' && <CaseStudiesView />}
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
        setActiveTab={navigateToTab}
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
