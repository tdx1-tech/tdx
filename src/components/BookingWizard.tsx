/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Mail, Phone, MapPin, CheckCircle, ChevronRight, MessageSquare, ExternalLink, Sparkles } from 'lucide-react';
import { Doctor, Service, Appointment } from '../types';
import { DOCTORS, SERVICES } from '../data';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedDoctorId?: 'mashal' | 'faizan' | null;
  preSelectedServiceId?: string | null;
}

export default function BookingWizard({
  isOpen,
  onClose,
  preSelectedDoctorId = null,
  preSelectedServiceId = null,
}: BookingWizardProps) {
  // Booking Steps: 1: Choose Doctor, 2: Choose Service, 3: Select Date & Time, 4: Patient Details, 5: Confirmation
  const [step, setStep] = useState<number>(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [patientName, setPatientName] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientNotes, setPatientNotes] = useState<string>('');
  const [savedAppointment, setSavedAppointment] = useState<Appointment | null>(null);

  // Pre-selection management
  useEffect(() => {
    if (isOpen) {
      if (preSelectedDoctorId) {
        const doc = DOCTORS.find((d) => d.id === preSelectedDoctorId) || null;
        setSelectedDoctor(doc);
        if (preSelectedServiceId) {
          const srv = SERVICES.find((s) => s.id === preSelectedServiceId) || null;
          setSelectedService(srv);
          setStep(3); // skip doctor and service choices
        } else {
          setStep(2); // skip doctor choice, go to service selection
        }
      } else {
        setStep(1);
        setSelectedDoctor(null);
        setSelectedService(null);
      }
      setSelectedDate('');
      setSelectedTime('');
    }
  }, [isOpen, preSelectedDoctorId, preSelectedServiceId]);

  // Generate date options for the next 14 days (excluding Sundays)
  const getDateOptions = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      if (nextDate.getDay() !== 0) { // skip Sunday
        const dayString = nextDate.toLocaleDateString('en-US', { weekday: 'short' });
        const dateString = nextDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        const isoString = nextDate.toISOString().split('T')[0];
        dates.push({ dayString, dateString, isoString });
      }
    }
    return dates;
  };

  const timeslots = [
    '11:30 AM', '12:30 PM', '01:30 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:30 PM', '07:30 PM'
  ];

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    // If a service was previously selected and doesn't belong to this doctor, clear it
    if (selectedService && selectedService.doctor !== doctor.id) {
      setSelectedService(null);
    }
    setStep(2);
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep(3);
  };

  const handleDateTimeConfirm = () => {
    if (selectedDate && selectedTime) {
      setStep(4);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedService || !selectedDate || !selectedTime) return;

    const newAppointment: Appointment = {
      id: 'apt_' + Date.now(),
      doctor: selectedDoctor.id,
      serviceId: selectedService.id,
      patientName,
      patientEmail,
      patientPhone,
      date: selectedDate,
      time: selectedTime,
      notes: patientNotes,
      createdAt: new Date().toISOString(),
    };

    // Store in localStorage
    const existing = localStorage.getItem('dental_bookings');
    const list = existing ? JSON.parse(existing) : [];
    list.push(newAppointment);
    localStorage.setItem('dental_bookings', JSON.stringify(list));

    setSavedAppointment(newAppointment);
    setStep(5);

    // Trigger local storage custom event to refresh lists in other components
    window.dispatchEvent(new Event('storage_update'));

    // Automatically open WhatsApp with pre-filled message for the selected doctor
    const cleanPhone = selectedDoctor.whatsappNumber.replace(/[^0-9]/g, '');
    const message = `Hello ${selectedDoctor.name}, I would like to confirm my booking at The Dental Experience:\n\n` +
      `• Patient: ${patientName}\n` +
      `• Phone: ${patientPhone}\n` +
      `• Service: ${selectedService.title}\n` +
      `• Date: ${selectedDate}\n` +
      `• Time: ${selectedTime}\n` +
      (patientNotes ? `• Notes: ${patientNotes}\n` : '');

    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  // Get service options for the selected doctor
  const baseServices = SERVICES.filter(
    (s) => !selectedDoctor || s.doctor === selectedDoctor.id
  );

  const otherService: Service = {
    id: 'srv_other',
    title: 'Other / Custom Inquiry',
    doctor: selectedDoctor?.id || 'mashal',
    duration: 'Flexible',
    priceEstimate: 'Consultation Required',
    shortDescription: 'General dental check-up, second opinion, or custom clinical evaluation.',
    longDescription: 'A tailored consultation session for unique clinical requirements, diagnostic check-ups, or second opinions.',
    benefits: ['Personalized Evaluation', 'Customized Treatment Plan', 'Expert Advice'],
    steps: ['Clinical Examination', 'Diagnostic Review', 'Treatment Plan'],
    iconName: 'HelpCircle'
  };

  const filteredServices = [...baseServices, otherService];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-charcoal/80 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-brand-champagne overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-brand-emerald text-brand-sand px-6 py-5 flex justify-between items-center relative border-b border-brand-emerald-dark">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-white font-medium">The Dental Experience</span>
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-white">Book Your Consultation</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-brand-champagne hover:text-white rounded-full hover:bg-brand-emerald-dark/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Progress Indicator */}
        {step < 5 && (
          <div className="bg-brand-champagne/40 px-6 py-3 flex items-center justify-between text-xs font-medium border-b border-brand-champagne">
            <div className="flex space-x-2 overflow-x-auto py-1 scrollbar-none w-full">
              {[
                { label: 'Doctor', num: 1 },
                { label: 'Service', num: 2 },
                { label: 'Schedule', num: 3 },
                { label: 'Information', num: 4 },
              ].map((s) => {
                const canNavigate = s.num < step || 
                  (s.num === 2 && selectedDoctor !== null) || 
                  (s.num === 3 && selectedDoctor !== null && selectedService !== null);

                return (
                  <button
                    key={s.num}
                    type="button"
                    onClick={() => {
                      if (canNavigate) {
                        setStep(s.num);
                      }
                    }}
                    disabled={!canNavigate}
                    className={`flex items-center space-x-1 whitespace-nowrap transition-all ${
                      canNavigate ? 'cursor-pointer hover:opacity-80' : 'cursor-default opacity-70'
                    } ${
                      step === s.num
                        ? 'text-brand-emerald font-semibold'
                        : step > s.num
                        ? 'text-brand-mint font-medium'
                        : 'text-gray-400'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        step === s.num
                          ? 'bg-brand-emerald text-white font-bold'
                          : step > s.num
                          ? 'bg-brand-mint/20 text-brand-mint font-semibold'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {s.num}
                    </span>
                    <span>{s.label}</span>
                    {s.num < 4 && <ChevronRight className="w-3 h-3 text-gray-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            {/* STEP 1: CHOOSE DOCTOR */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="text-center max-w-md mx-auto mb-6">
                  <h4 className="font-serif text-lg font-semibold text-brand-charcoal mb-1">Who would you like to consult with?</h4>
                  <p className="text-sm text-gray-500">Each of our owners manages a separate specialized clinic stream based on clinical training.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {DOCTORS.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => handleDoctorSelect(doc)}
                      className="group cursor-pointer bg-white p-5 rounded-xl border border-brand-champagne hover:border-brand-emerald transition-all hover:shadow-md flex flex-col text-center"
                    >
                      <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-2 border-brand-champagne group-hover:border-brand-gold transition-colors">
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-full h-full object-cover object-top"
                          style={doc.id === 'faizan' ? { objectPosition: 'center 5%', transform: 'scale(1)' } : undefined}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-brand-gold font-semibold mb-1">
                        {doc.title}
                      </span>
                      <h5 className="font-serif text-base font-semibold text-brand-charcoal group-hover:text-brand-emerald transition-colors">
                        {doc.name}
                      </h5>
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                        {doc.bio}
                      </p>
                      <div className="mt-4 pt-3 border-t border-brand-champagne text-xs font-semibold text-brand-emerald flex items-center justify-center space-x-1 group-hover:translate-x-1 transition-transform">
                        <span>Select Specialist</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: CHOOSE SERVICE */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-brand-charcoal">Select clinical service</h4>
                    <p className="text-xs text-gray-500">
                      Showing specialized offerings for <strong className="text-brand-emerald">{selectedDoctor?.name}</strong>
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-brand-gold hover:text-brand-gold-dark font-medium underline cursor-pointer"
                  >
                    Change Practitioner
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {filteredServices.map((srv) => {
                    const isOther = srv.id === 'srv_other';
                    return (
                      <div
                        key={srv.id}
                        onClick={() => handleServiceSelect(srv)}
                        className={`cursor-pointer p-4 rounded-xl transition-all ${
                          isOther
                            ? 'bg-gradient-to-br from-brand-sand/60 to-emerald-50/50 border-2 border-dashed border-brand-emerald/40 hover:border-brand-emerald hover:shadow-md relative overflow-hidden'
                            : 'bg-white border border-brand-champagne hover:border-brand-mint hover:shadow-sm'
                        }`}
                      >
                        {isOther && (
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-brand-emerald text-white">
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>Custom Inquiry</span>
                            </span>
                          </div>
                        )}
                        <h5 className="font-serif text-sm font-semibold text-brand-charcoal mb-1">
                          {srv.title}
                        </h5>
                        <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                          {srv.shortDescription}
                        </p>
                        <div className="flex justify-end items-center text-[10px] text-gray-400 font-mono">
                          <span className={isOther ? "text-brand-emerald font-bold" : "text-brand-mint font-semibold"}>
                            {srv.priceEstimate}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-brand-champagne flex justify-start">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 border border-brand-champagne hover:border-brand-emerald text-brand-charcoal rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                  >
                    ← Back to Doctors
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: DATE & TIME */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-5"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-brand-charcoal">Select Preferred Appointment Time</h4>
                    <p className="text-xs text-gray-500">
                      With <strong className="text-brand-emerald">{selectedDoctor?.name}</strong> for <strong className="text-brand-mint">{selectedService?.title}</strong>
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs text-brand-gold hover:text-brand-gold-dark font-medium underline cursor-pointer"
                  >
                    Back to services
                  </button>
                </div>

                {/* Calendar Horizon Slider */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                    1. Choose Date
                  </label>
                  <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin">
                    {getDateOptions().map((dt) => {
                      const isSelected = selectedDate === dt.isoString;
                      return (
                        <button
                          key={dt.isoString}
                          type="button"
                          onClick={() => setSelectedDate(dt.isoString)}
                          className={`flex flex-col items-center justify-center min-w-16 p-3 rounded-lg border transition-all text-center ${
                            isSelected
                              ? 'bg-brand-emerald text-white border-brand-emerald shadow-sm'
                              : 'bg-white text-brand-charcoal border-brand-champagne hover:border-brand-mint'
                          }`}
                        >
                          <span className={`text-[10px] font-mono ${isSelected ? 'text-brand-gold' : 'text-gray-400'}`}>
                            {dt.dayString}
                          </span>
                          <span className="text-sm font-bold mt-1">
                            {dt.dateString.split(' ')[0]}
                          </span>
                          <span className="text-[10px]">
                            {dt.dateString.split(' ')[1]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Timeslots */}
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                      2. Choose Available Timeslot
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeslots.map((time) => {
                        const isSelected = selectedTime === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 text-xs font-medium rounded-lg border transition-all text-center ${
                              isSelected
                                ? 'bg-brand-mint text-white border-brand-mint'
                                : 'bg-white text-brand-charcoal border-brand-champagne hover:border-brand-mint'
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Action CTA */}
                <div className="pt-4 border-t border-brand-champagne flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 border border-brand-champagne hover:border-brand-emerald text-brand-charcoal rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    disabled={!selectedDate || !selectedTime}
                    onClick={handleDateTimeConfirm}
                    className={`px-6 py-2.5 rounded-lg font-medium text-xs tracking-wider uppercase transition-all flex items-center space-x-1 ${
                      selectedDate && selectedTime
                        ? 'bg-brand-emerald text-white hover:bg-brand-emerald-dark cursor-pointer'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <span>Proceed to Information</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: INFORMATION FORM */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-brand-charcoal">Your Contact Information</h4>
                    <p className="text-xs text-gray-500">Provide details to confirm your premium slot in TDX.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="text-xs text-brand-gold hover:text-brand-gold-dark font-medium underline cursor-pointer"
                  >
                    Back to schedule
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-brand-charcoal mb-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          required
                          type="text"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          placeholder="e.g. Ali Ahmed"
                          className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-brand-champagne rounded-lg font-sans"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-charcoal mb-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          required
                          type="tel"
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          placeholder="e.g. 03001234567"
                          className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-brand-champagne rounded-lg font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-charcoal mb-1">Special Clinical Requests / Symptoms (Optional)</label>
                    <textarea
                      rows={3}
                      value={patientNotes}
                      onChange={(e) => setPatientNotes(e.target.value)}
                      placeholder="Please note if you have pain, are interested in mockups, or have any dental anxiety."
                      className="w-full px-4 py-2 text-sm bg-white border border-brand-champagne rounded-lg font-sans resize-none"
                    />
                  </div>

                  <div className="bg-brand-mint-light/50 p-4 rounded-xl border border-brand-mint/20 space-y-2">
                    <h6 className="text-xs font-bold text-brand-emerald">Consultation Booking Outline:</h6>
                    <div className="grid grid-cols-2 gap-y-1 text-xs text-brand-charcoal font-sans">
                      <div>Practitioner:</div>
                      <div className="font-semibold">{selectedDoctor?.name}</div>
                      <div>Service:</div>
                      <div className="font-semibold">{selectedService?.title}</div>
                      <div>Time Slot:</div>
                      <div className="font-semibold text-brand-mint">
                        {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {selectedTime}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 border border-brand-champagne hover:border-brand-emerald text-brand-charcoal rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-brand-emerald hover:bg-brand-emerald-dark text-white rounded-lg font-mono text-xs uppercase tracking-widest transition-all shadow-sm font-semibold cursor-pointer"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 5: BOOKING SUCCESS CONFIRMATION */}
            {step === 5 && savedAppointment && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-6"
              >
                <div className="w-16 h-16 bg-brand-mint/10 text-brand-mint rounded-full flex items-center justify-center mx-auto border border-brand-mint/30">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-brand-gold font-semibold">Booking Confirmed</span>
                  <h4 className="font-serif text-2xl font-semibold text-brand-charcoal">Your smile journey has begun!</h4>
                  <p className="text-sm text-gray-500 max-w-md mx-auto">
                    A clinical concierge from <strong>The Dental Experience</strong> will contact you via phone or WhatsApp shortly to verify your medical history.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-brand-champagne max-w-md mx-auto text-left font-sans space-y-3 shadow-sm">
                  <div className="border-b border-brand-champagne pb-3 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-mono">Patient</span>
                      <p className="text-sm font-semibold text-brand-charcoal">{savedAppointment.patientName}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 uppercase font-mono">Reference ID</span>
                      <p className="text-xs font-mono text-brand-gold">{savedAppointment.id}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 text-xs text-brand-charcoal">
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase font-mono">Practitioner</span>
                      <span className="font-medium">{selectedDoctor?.name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase font-mono">Clinical Stream</span>
                      <span className="font-medium">{selectedService?.title}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[10px] text-gray-400 block uppercase font-mono">Schedule Date & Time</span>
                      <span className="font-semibold text-brand-emerald">
                        {new Date(savedAppointment.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {savedAppointment.time}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-brand-champagne text-xs text-gray-500 flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>
                      Office 312, 3rd Floor, Uhad Tower, Shaheen Town, Peshawar, Pakistan.
                    </span>
                  </div>
                </div>

                {/* Instant Actions */}
                <div className="flex flex-col sm:flex-row gap-2 justify-center pt-4 max-w-md mx-auto">
                  <a
                    href={`https://wa.me/${selectedDoctor?.whatsappNumber.replace('+', '')}?text=Hello,%20I%20just%20booked%20an%20appointment%20with%20${selectedDoctor?.name}%20for%20${selectedService?.title}%20on%20${savedAppointment.date}%20at%20${savedAppointment.time}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 px-5 py-3 bg-[#22C55E] hover:bg-[#1ebd53] text-white rounded-full text-xs font-sans uppercase tracking-widest font-extrabold flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WHATSAPP</span>
                  </a>
                  <button
                    onClick={onClose}
                    className="flex-1 px-5 py-3 border border-brand-champagne hover:border-brand-emerald text-brand-charcoal rounded-xl text-xs font-semibold hover:bg-white transition-colors"
                  >
                    Done & Close
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
