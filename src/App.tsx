/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import BackgroundElements from './components/BackgroundElements';
import EnvelopeHero from './components/EnvelopeHero';
import BirthdayLetter from './components/BirthdayLetter';
import MakeAWishCake from './components/MakeAWishCake';
import CelebrationFooter from './components/CelebrationFooter';
import { musicBox } from './utils/audio';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    // Start sweet ambient music box playback if not already started
    if (!isMusicPlaying) {
      musicBox.play();
      setIsMusicPlaying(true);
    }
  };

  const handleScrollToLetter = () => {
    letterRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto scroll smoothly to letter when envelope opens
  useEffect(() => {
    if (isEnvelopeOpen) {
      const timer = setTimeout(() => {
        handleScrollToLetter();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isEnvelopeOpen]);

  return (
    <div className="min-h-screen relative font-sans text-stone-800 bg-gradient-to-b from-[#fffaf7] via-[#fff5f0] to-[#fff8f4] selection:bg-rose-200 selection:text-rose-900">
      {/* Aesthetic Background Elements & Ambient Music Toggle */}
      <BackgroundElements
        isMusicPlaying={isMusicPlaying}
        setIsMusicPlaying={setIsMusicPlaying}
      />

      {/* Main Content Area */}
      <main className="relative z-10 w-full overflow-hidden">
        {/* Phase 1 & 2: The Envelope Reveal & Opening Interaction */}
        <EnvelopeHero
          isEnvelopeOpen={isEnvelopeOpen}
          onOpenEnvelope={handleOpenEnvelope}
          onLetterScroll={handleScrollToLetter}
        />

        {/* Phases 3, 4, 5 Revealed seamlessly */}
        {isEnvelopeOpen && (
          <div ref={letterRef} className="animate-in fade-in duration-1000 space-y-8 sm:space-y-12">
            {/* Phase 3: Personalized Letter with Typing Effect */}
            <BirthdayLetter isVisible={isEnvelopeOpen} />

            {/* Extra interactive delight: Make a Wish & Tiup Lilin */}
            <MakeAWishCake />

            {/* Phase 5: Celebration Mode, Confetti, & Boyfriend's Closing Message */}
            <CelebrationFooter />
          </div>
        )}
      </main>
    </div>
  );
}
