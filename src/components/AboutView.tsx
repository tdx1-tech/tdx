/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Award, BookOpen, GraduationCap, CheckCircle, ArrowRight } from 'lucide-react';
import { DOCTORS } from '../data';

interface AboutViewProps {
  onOpenBooking: (doctorId: 'mashal' | 'faizan') => void;
  /** Opens the doctor's own page, which carries their full profile. */
  onViewDoctorProfile: (doctorId: 'mashal' | 'faizan') => void;
}

export default function AboutView({ onOpenBooking, onViewDoctorProfile }: AboutViewProps) {
  return (
    <div className="space-y-24 py-12 pb-24">
      {/* Introduction Header */}
      <motion.section 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold">The Dental Experience</span>
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-brand-charcoal leading-snug">
          Clinical Credentialing & <br />
          <span className="text-brand-gold font-semibold">Bespoke Patient Protocols</span>
        </h1>
        <div className="w-16 h-0.5 bg-brand-champagne mx-auto" />
        <p className="font-sans text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
          Our clinic operates as a co-operative medical practice where both principal owners maintain completely independent, peer-certified treatment workflows aligned with their respective residencies.
        </p>
      </motion.section>

      {/* Doctor Detailed Profiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {DOCTORS.map((doc, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={doc.id}
              id={`doctor-${doc.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              /* scroll-mt clears the fixed navbar when linked to from another page */
              className={`flex flex-col lg:flex-row gap-12 items-center scroll-mt-24 sm:scroll-mt-28 rounded-3xl ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Profile Image Column - doubles as a link to the doctor's own page */}
              <div className="w-full lg:w-[40%] relative">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => onViewDoctorProfile(doc.id)}
                  aria-label={`Open ${doc.name}'s profile page`}
                  className="relative z-10 block w-full rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-brand-sand aspect-[3/4] cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9C89] focus-visible:ring-offset-2"
                >
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover"
                    style={doc.id === 'faizan' ? { objectPosition: '50% 05%' } : undefined}
                    referrerPolicy="no-referrer"
                  />
                  {/* Backdrop tint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/10 to-transparent" />

                  {/* Hover affordance so it reads as clickable */}
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-brand-charcoal/75 backdrop-blur-sm text-white font-mono text-[10px] uppercase tracking-widest py-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Open Full Profile</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </motion.button>

                {/* Decorative border */}
                <div className="absolute -bottom-6 -right-6 w-full h-full bg-brand-gold/15 rounded-2xl -z-10 border border-brand-gold/20" />
              </div>

              {/* Profile Text Column */}
              <div className="w-full lg:w-[60%] space-y-6">
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold block">
                    {doc.title}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-brand-charcoal">
                    <button
                      type="button"
                      onClick={() => onViewDoctorProfile(doc.id)}
                      className="text-left hover:text-[#0D9C89] transition-colors cursor-pointer focus:outline-none focus-visible:underline decoration-[#0D9C89] underline-offset-4"
                    >
                      {doc.name}
                    </button>
                  </h2>
                </div>

                <p className="font-sans text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {doc.id === 'mashal' ? (
                    <>
                      Dr. Mashal Zeb Jan is a specialist in Operative Dentistry and Endodontics, holding the prestigious FCPS qualification awarded by the College of Physicians and Surgeons Pakistan. <span className="text-brand-emerald font-semibold inline">She is the first resident of Rehman College of Dentistry to clear FCPS Part II, and the youngest consultant in her specialty to pass the examination in Pakistan - clearing it on her first attempt.</span> She brings that same standard of precision and commitment to every patient she treats.
                    </>
                  ) : doc.id === 'faizan' ? (
                    <>
                      Dr. Faizan ul Hassan is a dedicated and accomplished orthodontist at the RCD's Department of Orthodontics. He graduated from Khyber College of Dentistry (KCD) in 2013 and pursued his passion for orthodontics, completing his fellowship and clearing FCPS part 2 in 2018, <span className="text-brand-emerald font-semibold inline">becoming one of the youngest fellows in the field.</span>
                      {"\n\n"}
                      Dr. Hassan has <span className="text-brand-emerald font-semibold inline">personally treated more than 1,300 cases over 15 years</span> and <span className="text-brand-emerald font-semibold inline">supervised the treatment of thousands more</span> under the care of postgraduate residents. As an educator, he has <span className="text-brand-emerald font-semibold inline">facilitated 17 workshops and courses for postgraduate orthodontic residents</span>. His research expertise is evident in his publication record, with <span className="text-brand-emerald font-semibold inline">21 articles</span> covering a range of topics.
                      {"\n\n"}
                      Dr. Hassan teaches final-year orthodontics, sharing his expertise and inspiring the next generation of dental professionals. His commitment to excellence in clinical practice, education, and research makes him a valuable asset to our institution.
                    </>
                  ) : (
                    doc.detailedBio
                  )}
                </p>

                {/* Info blocks: Education, Specialties, Certifications & Honors */}
                <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-brand-champagne">
                  
                  {/* Education, Residencies & Certifications/Honors Column */}
                  <div className="space-y-6">
                    {/* Education & Residency */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-brand-emerald">
                        <GraduationCap className="w-5 h-5 text-brand-gold" />
                        <h4 className="font-serif text-sm font-medium text-brand-charcoal">Education & Residencies</h4>
                      </div>
                      <ul className="space-y-2 font-sans text-xs text-gray-500">
                        {doc.education.map((edu, eIdx) => (
                          <li key={eIdx} className="flex items-start space-x-2">
                            <CheckCircle className="w-3.5 h-3.5 text-brand-mint shrink-0 mt-0.5" />
                            <span>{edu}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Certifications & Honors */}
                    {((doc.certs && doc.certs.length > 0) || (doc.honors && doc.honors.length > 0)) && (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-brand-emerald">
                          <BookOpen className="w-5 h-5 text-brand-gold" />
                          <h4 className="font-serif text-sm font-medium text-brand-charcoal">Certifications & Honors</h4>
                        </div>
                        <ul className="space-y-2 font-sans text-xs text-gray-500">
                          {doc.certs?.map((cert, cIdx) => (
                            <li key={`cert-${cIdx}`} className="flex items-start space-x-2">
                              <CheckCircle className="w-3.5 h-3.5 text-brand-mint shrink-0 mt-0.5" />
                              <span>{cert}</span>
                            </li>
                          ))}
                          {doc.honors?.map((honor, hIdx) => (
                            <li key={`honor-${hIdx}`} className="flex items-start space-x-2">
                              <CheckCircle className="w-3.5 h-3.5 text-brand-mint shrink-0 mt-0.5" />
                              <span>{honor}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Specialty Stream & Focus */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-brand-emerald">
                      <Award className="w-5 h-5 text-brand-gold" />
                      <h4 className="font-serif text-sm font-medium text-brand-charcoal">Clinical Focus Area</h4>
                    </div>
                    <ul className="space-y-2 font-sans text-xs text-gray-500">
                      {doc.specialties.map((spec, sIdx) => (
                        <li key={sIdx} className="flex items-start space-x-2">
                          <CheckCircle className="w-3.5 h-3.5 text-brand-mint shrink-0 mt-0.5" />
                          <span className="font-medium text-brand-charcoal">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Direct Action */}
                <div className="pt-6 flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onViewDoctorProfile(doc.id)}
                    className="px-6 py-3 bg-brand-emerald hover:bg-brand-emerald-dark text-white rounded-lg text-xs font-mono uppercase tracking-widest font-bold transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <span>View Dr. {doc.name.split(' ')[1]}'s Full Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onOpenBooking(doc.id)}
                    className="px-6 py-3 bg-white border border-brand-emerald text-brand-emerald hover:bg-brand-emerald/5 rounded-lg text-xs font-mono uppercase tracking-widest font-bold transition-colors cursor-pointer"
                  >
                    Book Consultation
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>


    </div>
  );
}
