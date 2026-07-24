import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1600; // 1.6s

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 200);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-[#0D0C1D] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute w-[350px] h-[350px] bg-[#0D9C89]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        {/* Clinic Crest / Emblem */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mb-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0D9C89] to-[#0A7B6C] flex items-center justify-center shadow-2xl border border-white/20 relative">
            <span className="font-serif font-bold text-2xl text-white tracking-tighter">TDX</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-5 h-5 text-teal-200 fill-teal-200/30" />
            </motion.div>
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-1 mb-8"
        >
          <h1 className="font-mono text-xs uppercase tracking-[0.35em] text-[#0D9C89] font-bold">
            The Dental Experience
          </h1>
          <p className="font-serif text-lg font-semibold text-white tracking-wide">
            Aesthetic & Clinical Excellence
          </p>
        </motion.div>

        {/* Progress Bar & Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-48 sm:w-56 space-y-2"
        >
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-[#0D9C89] to-teal-300 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 px-1">
            <span className="uppercase tracking-widest text-[#0D9C89]">Loading</span>
            <span>{progress}%</span>
          </div>
        </motion.div>
      </div>

      {/* Footer Tag */}
      <div className="absolute bottom-6 text-[10px] font-mono uppercase tracking-widest text-gray-500">
        Peshawar, Pakistan
      </div>
    </motion.div>
  );
}
