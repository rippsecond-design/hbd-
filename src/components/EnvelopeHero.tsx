import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, MailOpen, ArrowDown } from 'lucide-react';
import { musicBox } from '../utils/audio';
import { fireHeartConfetti } from '../utils/confetti';

interface Props {
  isEnvelopeOpen: boolean;
  onOpenEnvelope: () => void;
  onLetterScroll: () => void;
}

export default function EnvelopeHero({
  isEnvelopeOpen,
  onOpenEnvelope,
  onLetterScroll,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const handleEnvelopeClick = () => {
    if (!isEnvelopeOpen) {
      musicBox.playSparkleChime();
      fireHeartConfetti();
      onOpenEnvelope();
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 select-none">
      {/* Header Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-8 max-w-md"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium shadow-xs mb-3">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>A Special Gift for Shalva Aulia Putri</span>
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-800 tracking-tight leading-tight">
          Sheba&apos;s Birthday Web
        </h1>
        <p className="text-stone-500 text-sm sm:text-base mt-2">
          Ada sepucuk surat rahasia dan sejuta doa untukmu hari ini.
        </p>
      </motion.div>

      {/* 3D Envelope Container with Floating Physics */}
      <div className="relative w-full max-w-[340px] sm:max-w-[420px] h-[250px] sm:h-[280px] perspective-1000 flex items-center justify-center">
        <motion.div
          animate={
            isEnvelopeOpen
              ? { y: 0, scale: 1 }
              : {
                  y: [0, -10, 0],
                  rotateZ: [0, 0.5, -0.5, 0],
                }
          }
          transition={
            isEnvelopeOpen
              ? { duration: 0.5 }
              : {
                  repeat: Infinity,
                  duration: 4,
                  ease: 'easeInOut',
                }
          }
          whileHover={!isEnvelopeOpen ? { scale: 1.03 } : {}}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={handleEnvelopeClick}
          id="envelope-main-card"
          className={`relative w-full h-full cursor-pointer transition-shadow duration-500 ${
            !isEnvelopeOpen ? 'cursor-pointer' : ''
          }`}
        >
          {/* Shadow beneath envelope */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-stone-800/10 blur-xl rounded-full" />

          {/* Envelope Body Base (Warm Parchment / Dusty Rose Cream) */}
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#fcefe8] to-[#f7e0d6] border border-rose-200/90 shadow-xl overflow-hidden flex items-center justify-center">
            {/* Diagonal Envelope Creases (Pocket back flap) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {/* Bottom fold */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#ebd0c4] to-[#f4ded4]/50 border-t border-rose-200/50"
                style={{
                  clipPath: 'polygon(0% 100%, 50% 30%, 100% 100%)',
                }}
              />
              {/* Left flap */}
              <div
                className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#f9e5db]/60 border-r border-rose-200/40"
                style={{
                  clipPath: 'polygon(0% 0%, 0% 100%, 75% 50%)',
                }}
              />
              {/* Right flap */}
              <div
                className="absolute top-0 bottom-0 right-0 w-1/2 bg-[#f4ded4]/60 border-l border-rose-200/40"
                style={{
                  clipPath: 'polygon(100% 0%, 100% 100%, 25% 50%)',
                }}
              />
            </div>

            {/* Top Flap (Triangular Lid that Flips open) */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1/2 origin-top z-20"
              animate={
                isEnvelopeOpen
                  ? { rotateX: 180, zIndex: 5 }
                  : { rotateX: 0, zIndex: 20 }
              }
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                className="w-full h-full bg-gradient-to-b from-[#ecd2c6] to-[#dfbfb1] border-b border-rose-300/60 shadow-sm"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                }}
              />
            </motion.div>

            {/* Letter Inside Peek (Slides out when opened) */}
            <motion.div
              initial={false}
              animate={
                isEnvelopeOpen
                  ? { y: -110, scale: 1.02, opacity: 1 }
                  : { y: 0, scale: 0.95, opacity: 0.9 }
              }
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
              className="absolute z-15 w-[86%] h-[75%] bg-amber-50 rounded-lg shadow-md border border-amber-200/80 p-4 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between border-b border-rose-100 pb-2">
                <span className="font-handwriting text-rose-700 text-lg sm:text-xl font-bold">
                  Surat Spesial Ulang Tahun
                </span>
                <span className="text-rose-400 text-xs flex items-center gap-1 font-mono">
                  <Heart className="w-3 h-3 fill-rose-400" /> Sheba
                </span>
              </div>
              <p className="font-serif-display text-stone-700 text-xs sm:text-sm line-clamp-3 italic">
                &ldquo;Happy Birthday, Shalva Aulia Putri! Terima kasih sudah selalu hadir dengan senyum manismu...&rdquo;
              </p>
              <div className="flex justify-between items-center text-[10px] text-stone-400 pt-1">
                <span>Untuk Sheba tersayang 🌸</span>
                <span className="text-rose-500 font-medium">Buka untuk baca &darr;</span>
              </div>
            </motion.div>

            {/* Digital Wax Seal Stamp & Ribbon */}
            <AnimatePresence>
              {!isEnvelopeOpen && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
                  className="absolute z-30 flex flex-col items-center justify-center pointer-events-none"
                >
                  {/* Wax Seal Badge */}
                  <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 border-2 border-rose-300 shadow-lg shadow-rose-600/30 flex flex-col items-center justify-center text-white text-center p-1 group">
                    <div className="absolute inset-1 rounded-full border border-rose-300/40 border-dashed" />
                    <Heart className="w-5 h-5 fill-white text-rose-100 mb-0.5 animate-pulse" />
                    <span className="font-serif-display font-bold text-[10px] sm:text-xs tracking-wider uppercase leading-none">
                      For Sheba
                    </span>
                    <span className="text-[9px] text-rose-200">💌</span>
                  </div>

                  {/* Ribbon Tails */}
                  <div className="flex gap-2 -mt-1 opacity-90">
                    <div
                      className="w-3.5 h-6 bg-rose-600 shadow-sm"
                      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)' }}
                    />
                    <div
                      className="w-3.5 h-6 bg-rose-700 shadow-sm"
                      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)' }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Action / Guidance Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-10 text-center z-20"
      >
        {!isEnvelopeOpen ? (
          <button
            type="button"
            onClick={handleEnvelopeClick}
            id="open-envelope-action-btn"
            className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white text-sm sm:text-base font-semibold shadow-lg shadow-rose-400/30 hover:shadow-rose-400/50 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <MailOpen className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span>Sentuh Amplop untuk Membuka 💌</span>
            <Sparkles className="w-4 h-4 text-rose-200 animate-spin [animation-duration:4s]" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onLetterScroll}
            id="scroll-to-letter-btn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-100 hover:bg-rose-200/80 text-rose-800 text-sm font-medium transition-colors shadow-xs animate-bounce"
          >
            <span>Baca Surat Lengkap</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        )}
      </motion.div>
    </div>
  );
}
