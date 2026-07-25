/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle } from 'lucide-react';
import { CASE_STUDIES } from '../data';
import CaseStudyCard from './CaseStudyCard';

export default function CaseStudiesView() {
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
                <CaseStudyCard study={study} />
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
