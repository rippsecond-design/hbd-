import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Flame, Wind, Heart, RotateCcw } from 'lucide-react';
import { musicBox } from '../utils/audio';
import { fireBirthdayConfetti } from '../utils/confetti';

export default function MakeAWishCake() {
  const [isBlown, setIsBlown] = useState(false);
  const [userWish, setUserWish] = useState('');
  const [wishSaved, setWishSaved] = useState(false);

  const handleBlowCandle = () => {
    setIsBlown(true);
    musicBox.playSparkleChime();
    fireBirthdayConfetti();
  };

  const handleRelight = () => {
    setIsBlown(false);
    musicBox.playSparkleChime();
  };

  const handleSaveWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userWish.trim()) return;
    setWishSaved(true);
    fireBirthdayConfetti();
    musicBox.playSparkleChime();
  };

  return (
    <section className="relative max-w-xl mx-auto px-4 py-12 text-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
        <Sparkles className="w-3 h-3 text-amber-600" />
        <span>Make a Wish Moment</span>
      </div>
      <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-800">
        Tiup Lilin Ulang Tahunmu, Sheba! 🎂
      </h3>
      <p className="text-stone-500 text-xs sm:text-sm mt-1 mb-8">
        Pejamkan mata, buat satu permohonan tulus dari dalam hatimu, lalu tiup lilinnya.
      </p>

      {/* Stylized Illustrated Cake Container */}
      <div className="relative w-64 h-56 mx-auto flex flex-col items-center justify-end pb-2">
        {/* Candle */}
        <div className="relative flex flex-col items-center z-20">
          {/* Flame / Smoke */}
          <div className="h-10 flex items-center justify-center">
            {!isBlown ? (
              <motion.div
                animate={{
                  scale: [1, 1.15, 0.95, 1.05],
                  rotate: [-2, 3, -3, 2],
                }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                className="w-4 h-7 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-md shadow-amber-300/80 cursor-pointer"
                onClick={handleBlowCandle}
                title="Klik untuk meniup lilin!"
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 0.8, 0], y: -25, x: [-2, 4, -3] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="text-stone-400 text-xs font-mono"
              >
                💨
              </motion.div>
            )}
          </div>

          {/* Candle stick */}
          <div className="w-3.5 h-12 rounded-t-sm bg-gradient-to-r from-rose-300 via-pink-200 to-rose-400 border border-rose-300/80 shadow-xs relative overflow-hidden">
            {/* Candle spiral stripes */}
            <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,#fff,#fff_2px,transparent_2px,transparent_6px)]" />
          </div>
        </div>

        {/* Cake Layer 1 (Top Tier) */}
        <div className="relative w-36 h-14 rounded-t-2xl bg-gradient-to-b from-rose-100 to-rose-200 border border-rose-300 shadow-sm z-10 flex items-center justify-center">
          {/* Frosting Drips */}
          <div className="absolute top-0 inset-x-0 h-4 bg-white/90 rounded-t-2xl flex justify-around px-1">
            <div className="w-3 h-3.5 bg-white rounded-full -mt-0.5" />
            <div className="w-3.5 h-4.5 bg-white rounded-full -mt-0.5" />
            <div className="w-3 h-3 bg-white rounded-full -mt-0.5" />
            <div className="w-4 h-4 bg-white rounded-full -mt-0.5" />
          </div>
          {/* Strawberry / heart deco */}
          <span className="text-sm mt-3">🍓</span>
        </div>

        {/* Cake Layer 2 (Bottom Tier) */}
        <div className="relative w-52 h-18 rounded-t-2xl bg-gradient-to-b from-amber-100 via-orange-100 to-rose-100 border border-rose-300/80 shadow-md flex items-center justify-center overflow-hidden">
          {/* Bottom Cream Ribbon */}
          <div className="absolute top-0 inset-x-0 h-4 bg-white/90 flex justify-between px-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-white rounded-full -mt-1 shadow-2xs" />
            ))}
          </div>
          <span className="font-handwriting text-rose-600 text-lg font-bold mt-2">
            Sheba&apos;s Day ✨
          </span>
        </div>

        {/* Cake Plate */}
        <div className="w-64 h-3.5 rounded-full bg-stone-200 border border-stone-300 shadow-md -mt-1" />
      </div>

      {/* Button Controls */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {!isBlown ? (
          <button
            type="button"
            onClick={handleBlowCandle}
            id="blow-candle-btn"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium text-sm shadow-md shadow-rose-300/50 hover:scale-105 active:scale-95 transition-all"
          >
            <Wind className="w-4 h-4" />
            <span>Tiup Lilin Sekarang 💨</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs text-rose-700 bg-rose-100 px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              Lilin berhasil ditiup! Semoga terwujud!
            </span>
            <button
              type="button"
              onClick={handleRelight}
              className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
              title="Nyalakan lilin lagi"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Secret Wish Card Prompt when candle is blown */}
      <AnimatePresence>
        {isBlown && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 p-5 rounded-2xl bg-white/90 border border-amber-200/80 shadow-sm text-left max-w-md mx-auto"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✨</span>
              <h4 className="font-serif-display font-bold text-stone-800 text-sm">
                Harapan Rahasia Sheba untuk Tahun Ini
              </h4>
            </div>

            {!wishSaved ? (
              <form onSubmit={handleSaveWish} className="space-y-2">
                <p className="text-xs text-stone-500">
                  Tuliskan satu doa rahasiamu di sini (hanya disimpan di browser ini agar selalu jadi pengingat indah):
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userWish}
                    onChange={(e) => setUserWish(e.target.value)}
                    placeholder="Tulis harapanmu di sini..."
                    className="flex-1 text-xs px-3 py-2 border border-stone-300 rounded-xl focus:outline-rose-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-medium shadow-xs"
                  >
                    Kunci Doa 🔒
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-rose-50/80 p-3 rounded-xl border border-rose-200 text-xs text-rose-800">
                <p className="font-semibold mb-1">Doa tersimpan rapi:</p>
                <p className="italic font-handwriting text-lg text-rose-900">&ldquo;{userWish}&rdquo;</p>
                <p className="text-[10px] text-stone-400 mt-1">
                  Aamiin ya rabbal alamin... Semoga semesta mengabulkannya untukmu! 🌸
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
