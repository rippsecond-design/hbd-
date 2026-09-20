import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Laugh, Gift, X, ChevronRight, Check } from 'lucide-react';
import { FUN_FACTS } from '../data/birthdayData';
import { musicBox } from '../utils/audio';
import { fireHeartConfetti } from '../utils/confetti';
import { FunFact } from '../types';

export default function InteractiveSurprise() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFactIndex, setActiveFactIndex] = useState(0);
  const [revealedIds, setRevealedIds] = useState<string[]>([FUN_FACTS[0].id]);

  const handleOpenModal = () => {
    setIsOpen(true);
    musicBox.playSparkleChime();
    fireHeartConfetti();
  };

  const handleSelectFact = (index: number) => {
    setActiveFactIndex(index);
    const fact = FUN_FACTS[index];
    if (!revealedIds.includes(fact.id)) {
      setRevealedIds((prev) => [...prev, fact.id]);
    }
    musicBox.playSparkleChime();
  };

  const handleNextFact = () => {
    const nextIdx = (activeFactIndex + 1) % FUN_FACTS.length;
    handleSelectFact(nextIdx);
  };

  const currentFact: FunFact = FUN_FACTS[activeFactIndex];

  return (
    <section className="relative max-w-3xl mx-auto px-4 py-8 text-center">
      {/* Interactive Trigger Button as specified in PRD */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-block"
      >
        <button
          type="button"
          id="curious-surprise-btn"
          onClick={handleOpenModal}
          className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500 text-white font-semibold text-base sm:text-lg shadow-lg shadow-rose-300/40 hover:shadow-rose-300/70 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <span className="text-xl group-hover:scale-125 transition-transform duration-300">🤭</span>
          <span>Klik kalau kamu penasaran...</span>
          <Sparkles className="w-5 h-5 text-amber-100 group-hover:rotate-45 transition-transform duration-300" />
        </button>
        <p className="text-xs text-stone-500 mt-2">
          Ada beberapa rahasia & fakta manis tentang Sheba di sini!
        </p>
      </motion.div>

      {/* Modal / Popup for Sweet & Cute Facts */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 overflow-hidden z-10 text-left"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-rose-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-base">
                    ✨
                  </div>
                  <div>
                    <h3 className="font-serif-display font-bold text-stone-800 text-lg sm:text-xl">
                      Fakta & Hal Manis Tentang Sheba
                    </h3>
                    <p className="text-xs text-stone-500">
                      Yang selalu bikin orang di dekatmu jatuh hati
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Badges Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar">
                {FUN_FACTS.map((fact, idx) => {
                  const isActive = idx === activeFactIndex;
                  return (
                    <button
                      key={fact.id}
                      type="button"
                      onClick={() => handleSelectFact(idx)}
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
                        isActive
                          ? 'bg-rose-500 text-white shadow-xs'
                          : 'bg-stone-100 text-stone-600 hover:bg-rose-50'
                      }`}
                    >
                      <span>{fact.icon}</span>
                      <span>{fact.badge}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Fact Display Card */}
              <motion.div
                key={currentFact.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="my-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-rose-50 via-amber-50/60 to-pink-50 border border-rose-200/70"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{currentFact.icon}</span>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-rose-600 font-semibold">
                      {currentFact.badge}
                    </span>
                    <h4 className="font-serif-display font-bold text-stone-800 text-lg sm:text-xl">
                      {currentFact.title}
                    </h4>
                  </div>
                </div>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed mt-3">
                  {currentFact.description}
                </p>
              </motion.div>

              {/* Modal Footer Controls */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-stone-400">
                  {activeFactIndex + 1} dari {FUN_FACTS.length} fakta
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      fireHeartConfetti();
                      handleNextFact();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-medium transition-colors shadow-xs"
                  >
                    <span>Fakta Selanjutnya</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
