import { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { musicBox } from '../utils/audio';

interface Props {
  isMusicPlaying: boolean;
  setIsMusicPlaying: (playing: boolean) => void;
}

export default function BackgroundElements({ isMusicPlaying, setIsMusicPlaying }: Props) {
  const [stars, setStars] = useState<Array<{ id: number; top: number; left: number; delay: number; size: number }>>([]);

  useEffect(() => {
    // Generate soft floating star sparkles
    const starList = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      size: Math.random() * 4 + 2,
    }));
    setStars(starList);
  }, []);

  const toggleMusic = () => {
    const status = musicBox.toggle();
    setIsMusicPlaying(status);
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft warm aesthetic radial glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-rose-200/35 blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] rounded-full bg-pink-100/40 blur-3xl" />

      {/* Twinkling ambient sparkles */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-amber-300/60 animate-pulse"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${2 + star.delay}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Floating gentle pastel hearts in the atmosphere */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-1/4 left-10 text-rose-300 text-xl animate-bounce [animation-duration:6s]">🌸</div>
        <div className="absolute top-2/3 left-16 text-rose-200 text-lg animate-pulse [animation-duration:4s]">✨</div>
        <div className="absolute top-1/5 right-12 text-pink-300 text-2xl animate-bounce [animation-duration:8s]">💖</div>
        <div className="absolute top-3/4 right-20 text-amber-200 text-xl animate-pulse [animation-duration:5s]">⭐</div>
        <div className="absolute top-1/2 left-8 text-rose-300/70 text-sm animate-bounce [animation-duration:7s]">💌</div>
      </div>

      {/* Interactive Music Player Controller (fixed top right) */}
      <div className="fixed top-4 right-4 z-50 pointer-events-auto">
        <button
          id="music-toggle-btn"
          type="button"
          onClick={toggleMusic}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-sm backdrop-blur-md border ${
            isMusicPlaying
              ? 'bg-rose-500/90 text-white border-rose-400 shadow-rose-200'
              : 'bg-white/80 text-stone-700 hover:bg-white border-stone-200 shadow-stone-200'
          }`}
          title={isMusicPlaying ? 'Mute Music' : 'Play Romantic Music Box'}
        >
          {isMusicPlaying ? (
            <>
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline">Playing Melodi Sheba</span>
              <span className="sm:hidden">Melodi ON</span>
              <div className="flex items-end gap-0.5 h-3 ml-1">
                <span className="w-0.5 bg-white rounded-full animate-[bounce_0.8s_ease-in-out_infinite]" style={{ height: '70%' }} />
                <span className="w-0.5 bg-white rounded-full animate-[bounce_0.6s_ease-in-out_infinite_0.2s]" style={{ height: '100%' }} />
                <span className="w-0.5 bg-white rounded-full animate-[bounce_0.9s_ease-in-out_infinite_0.4s]" style={{ height: '50%' }} />
              </div>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-stone-400" />
              <span className="text-stone-600">Putar Musik 🎵</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
