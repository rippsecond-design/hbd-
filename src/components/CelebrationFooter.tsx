import { useState } from 'react';
import { motion } from 'motion/react';
import { PartyPopper, Heart, Send, Check, Sparkles, MessageCircleHeart } from 'lucide-react';
import { fireBirthdayConfetti, fireHeartConfetti } from '../utils/confetti';
import { musicBox } from '../utils/audio';

export default function CelebrationFooter() {
  const [replyText, setReplyText] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleCelebrateBlast = () => {
    fireBirthdayConfetti();
    fireHeartConfetti();
    musicBox.playSparkleChime();
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    // Save to local storage for memories
    const replies = JSON.parse(localStorage.getItem('sheba_replies') || '[]');
    replies.push({
      text: replyText.trim(),
      date: new Date().toISOString(),
    });
    localStorage.setItem('sheba_replies', JSON.stringify(replies));

    setIsSent(true);
    fireBirthdayConfetti();
    musicBox.playSparkleChime();
  };

  const handleCopyWhatsApp = () => {
    const textToShare = `Haiii! Aku udah buka website ulang tahunku yang manis banget dari kamu! Makasih banyaaak yaaa... ${replyText ? `"${replyText}"` : 'Aku suka banget! 💖'}`;
    navigator.clipboard?.writeText(textToShare);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  return (
    <footer className="relative max-w-4xl mx-auto px-4 pt-10 pb-20 text-center">
      {/* Celebration Ribbon & Trigger */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-b from-rose-100/70 via-amber-50 to-white border border-rose-200/90 rounded-3xl p-8 sm:p-12 shadow-xl overflow-hidden"
      >
        {/* Floating background decorative balloons */}
        <div className="absolute -top-4 -left-4 text-3xl opacity-60 animate-bounce [animation-duration:5s]">🎈</div>
        <div className="absolute -bottom-4 -right-4 text-3xl opacity-60 animate-bounce [animation-duration:6s]">🎈</div>
        <div className="absolute top-1/2 -right-2 text-2xl opacity-40">✨</div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-200/80 text-rose-800 text-xs font-semibold uppercase tracking-wider mb-4">
          <PartyPopper className="w-3.5 h-3.5" />
          <span>Celebration Mode</span>
        </div>

        <h3 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800">
          Happy Birthday Once Again, Sheba! 💖
        </h3>
        <p className="max-w-xl mx-auto text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
          Semoga semua langkahmu di usia baru ini selalu dikelilingi orang-orang yang tulus menyayangimu, kesehatan yang prima, dan kebahagiaan yang tidak pernah habis.
        </p>

        {/* Big Confetti Blast Button */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            id="celebrate-again-btn"
            onClick={handleCelebrateBlast}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-rose-300/60 hover:scale-105 active:scale-95 transition-all"
          >
            <PartyPopper className="w-5 h-5 text-amber-200" />
            <span>Hujani Layar dengan Konfeti! 🎊</span>
          </button>
        </div>

        {/* Optional Interactive Reply Card for Sheba */}
        <div className="mt-12 pt-8 border-t border-rose-200/70 max-w-lg mx-auto text-left">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircleHeart className="w-4 h-4 text-rose-500" />
            <h4 className="font-serif-display font-semibold text-stone-800 text-sm sm:text-base">
              Kirim Pesan Balasan untuk Pengirim Surat 💌
            </h4>
          </div>

          {!isSent ? (
            <form onSubmit={handleSendReply} className="space-y-3">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Tuliskan perasaanmu atau pesan balasan manis di sini..."
                rows={3}
                className="w-full text-xs sm:text-sm px-4 py-2.5 bg-white border border-stone-300 rounded-2xl focus:ring-2 focus:ring-rose-400 focus:outline-hidden"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs sm:text-sm font-medium shadow-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Pesan</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center">
              <div className="w-8 h-8 rounded-full bg-rose-500 text-white mx-auto flex items-center justify-center mb-2">
                <Check className="w-4 h-4" />
              </div>
              <p className="font-serif-display font-bold text-stone-800 text-sm">
                Pesan Balasan Tersimpan dengan Manis!
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Pesanmu sudah tersimpan rapi. Kamu juga bisa langsung menyalin dan mengirimkannya via WhatsApp:
              </p>
              <div className="mt-3 flex justify-center">
                <button
                  type="button"
                  onClick={handleCopyWhatsApp}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-medium shadow-xs transition-colors"
                >
                  {copiedNotification ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 font-semibold">Tersalin ke Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      <span>Salin Teks untuk WhatsApp</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Sweet Footer Signature */}
      <div className="mt-8 text-center text-xs text-stone-400">
        <p className="flex items-center justify-center gap-1">
          <span>Dibuat dengan segenap rasa sayang untuk</span>
          <span className="font-semibold text-stone-600">Shalva Aulia Putri (Sheba)</span>
          <span className="text-rose-500">❤️</span>
        </p>
        <p className="mt-1 text-[11px] text-stone-400 font-mono">
          Special Edition • Forever & Always
        </p>
      </div>
    </footer>
  );
}
