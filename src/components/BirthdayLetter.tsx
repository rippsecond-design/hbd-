import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, FastForward, RotateCcw, Feather, Volume2 } from 'lucide-react';
import { LETTER_CONTENT } from '../data/birthdayData';
import { musicBox } from '../utils/audio';
import { fireHeartConfetti } from '../utils/confetti';

interface Props {
  isVisible: boolean;
}

export default function BirthdayLetter({ isVisible }: Props) {
  const fullText = LETTER_CONTENT.paragraphs.join('\n\n');
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const typingSpeedRef = useRef<number>(28); // ms per char

  useEffect(() => {
    if (!isVisible) return;

    let currentIndex = 0;
    setDisplayedText('');
    setIsTypingComplete(false);

    const timer = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(timer);
        setIsTypingComplete(true);
        fireHeartConfetti();
      }
    }, typingSpeedRef.current);

    return () => clearInterval(timer);
  }, [isVisible, fullText]);

  const handleSkipTyping = () => {
    setDisplayedText(fullText);
    setIsTypingComplete(true);
    musicBox.playSparkleChime();
    fireHeartConfetti();
  };

  const handleRestartTyping = () => {
    setIsTypingComplete(false);
    setDisplayedText('');
    musicBox.playSparkleChime();
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(timer);
        setIsTypingComplete(true);
        fireHeartConfetti();
      }
    }, typingSpeedRef.current);
  };

  return (
    <section id="birthday-letter-section" className="relative max-w-3xl mx-auto px-4 py-8 sm:py-14">
      {/* Decorative vintage stamp & tag */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 border border-rose-200/80 px-3 py-1 rounded-full font-mono">
          <Feather className="w-3.5 h-3.5" />
          <span>Surat Cinta & Doa Spesial</span>
        </div>
        <div className="flex items-center gap-2">
          {!isTypingComplete && (
            <button
              type="button"
              onClick={handleSkipTyping}
              className="text-xs flex items-center gap-1 text-stone-600 hover:text-rose-600 bg-white/90 hover:bg-white border border-stone-200 px-3 py-1 rounded-full shadow-xs transition-colors"
              title="Tampilkan langsung seluruh teks"
            >
              <FastForward className="w-3.5 h-3.5 text-rose-500" />
              <span>Langsung Tampilkan</span>
            </button>
          )}
          {isTypingComplete && (
            <button
              type="button"
              onClick={handleRestartTyping}
              className="text-xs flex items-center gap-1 text-stone-600 hover:text-rose-600 bg-white/90 hover:bg-white border border-stone-200 px-3 py-1 rounded-full shadow-xs transition-colors"
              title="Ulangi animasi mengetik"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span>Ketik Ulang</span>
            </button>
          )}
        </div>
      </div>

      {/* Parchment Styled Letter Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative bg-[#fffdfa] border-2 border-[#f3dfd5] rounded-3xl p-6 sm:p-10 md:p-14 shadow-xl shadow-stone-300/30 overflow-hidden"
      >
        {/* Subtle lined paper watermarks or corner flourish */}
        <div className="absolute top-4 right-4 text-stone-300 pointer-events-none opacity-40 font-serif-display text-4xl">
          ❦
        </div>
        <div className="absolute bottom-4 left-4 text-stone-300 pointer-events-none opacity-40 font-serif-display text-4xl">
          ❦
        </div>

        {/* Letter Head */}
        <div className="border-b border-rose-100/90 pb-6 mb-8 text-center sm:text-left">
          <div className="inline-block px-3 py-1 rounded-md bg-rose-50 text-rose-600 text-xs font-semibold tracking-wider uppercase mb-2">
            20 September • Special Day
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800 leading-snug">
            Happy Birthday, Shalva Aulia Putri (Sheba)! 🎉
          </h2>
          <p className="text-stone-500 text-sm sm:text-base mt-2 font-medium italic">
            A special little something for someone special.
          </p>
        </div>

        {/* Greeting */}
        <p className="font-handwriting text-2xl sm:text-3xl text-rose-700 font-bold mb-6">
          {LETTER_CONTENT.greeting}
        </p>

        {/* Typing Content Body */}
        <div className="prose prose-stone max-w-none text-stone-700 font-sans leading-relaxed text-base sm:text-lg space-y-4">
          {displayedText.split('\n\n').map((para, idx) => (
            <p key={idx} className="relative">
              {para}
              {/* Blinking cursor while typing this specific chunk */}
              {!isTypingComplete && idx === displayedText.split('\n\n').length - 1 && (
                <span className="inline-block w-2 h-5 bg-rose-500 ml-1 translate-y-0.5 animate-pulse" />
              )}
            </p>
          ))}
        </div>

        {/* Signature & Closing */}
        <div className="mt-10 pt-6 border-t border-rose-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-stone-500 text-xs sm:text-sm italic">
              &ldquo;Semoga setiap hembusan napasmu selalu dipeluk bahagia.&rdquo;
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-stone-400 uppercase tracking-widest font-mono">
              {LETTER_CONTENT.closing}
            </p>
            <p className="font-handwriting text-2xl sm:text-3xl font-bold text-rose-700 mt-1 flex items-center justify-end gap-1.5">
              <span>{LETTER_CONTENT.sender}</span>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
