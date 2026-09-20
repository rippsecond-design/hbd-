import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, ChevronLeft, ChevronRight, Maximize2, X, Plus, Sparkles, Heart } from 'lucide-react';
import { INITIAL_PHOTOS } from '../data/birthdayData';
import { PhotoMemory } from '../types';
import { musicBox } from '../utils/audio';
import { fireHeartConfetti } from '../utils/confetti';

export default function PolaroidGallery() {
  const [photos, setPhotos] = useState<PhotoMemory[]>(() => {
    const saved = localStorage.getItem('sheba_birthday_photos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PHOTOS;
      }
    }
    return INITIAL_PHOTOS;
  });

  const [activePhoto, setActivePhoto] = useState<PhotoMemory | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newDate, setNewDate] = useState('');

  useEffect(() => {
    localStorage.setItem('sheba_birthday_photos', JSON.stringify(photos));
  }, [photos]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleOpenPhoto = (photo: PhotoMemory) => {
    setActivePhoto(photo);
    musicBox.playSparkleChime();
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    const newPhoto: PhotoMemory = {
      id: 'photo_' + Date.now(),
      url: newUrl.trim(),
      caption: newCaption.trim() || 'Kenangan manis bersama Sheba 💖',
      date: newDate.trim() || 'Momen Spesial',
      tag: 'Our Memory',
      rotation: Math.floor(Math.random() * 6) - 3,
    };

    setPhotos((prev) => [...prev, newPhoto]);
    setNewUrl('');
    setNewCaption('');
    setNewDate('');
    setShowAddModal(false);
    musicBox.playSparkleChime();
    fireHeartConfetti();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="polaroid-gallery-section" className="relative max-w-5xl mx-auto px-4 py-12 sm:py-16">
      {/* Section Title */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3 h-3 text-rose-500" />
          <span>Mini Galeri Kenangan</span>
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800">
          Momen Manis Bersama Sheba 📸
        </h2>
        <p className="text-stone-500 text-sm sm:text-base mt-2">
          Setiap senyuman dan tawa selalu layak diabadikan. Ketuk foto polaroid untuk melihat lebih dekat!
        </p>
      </div>

      {/* Polaroid Grid & Slider Container */}
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center justify-center">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.04, rotateZ: 0, zIndex: 10 }}
              onClick={() => handleOpenPhoto(photo)}
              style={{
                transform: `rotate(${photo.rotation ?? 0}deg)`,
              }}
              className="cursor-pointer group relative bg-white p-3.5 pb-6 rounded-md shadow-md hover:shadow-2xl transition-all duration-300 border border-stone-200/80"
            >
              {/* Cute Washi Tape on top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-rose-200/80 border border-rose-300/60 rotate-1 shadow-xs z-10 opacity-80" />

              {/* Polaroid Image Box */}
              <div className="relative aspect-4/5 w-full bg-stone-100 rounded-xs overflow-hidden mb-3.5">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 rounded-full bg-white/90 text-stone-800 shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Handwritten Style Caption */}
              <div className="text-center px-1">
                <p className="font-handwriting text-stone-800 text-lg sm:text-xl font-bold line-clamp-2 leading-tight">
                  {photo.caption}
                </p>
                {photo.date && (
                  <span className="text-[11px] text-stone-400 font-mono block mt-1">
                    {photo.date}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add photo trigger button */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 text-xs sm:text-sm font-medium shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4 text-rose-500" />
            <span>Tambah Foto Kenangan Sendiri</span>
          </button>
        </div>
      </div>

      {/* Lightbox Preview Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="absolute inset-0 bg-stone-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="relative max-w-lg w-full bg-white p-4 sm:p-6 rounded-2xl shadow-2xl z-10 text-center"
            >
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="aspect-4/5 w-full bg-stone-100 rounded-lg overflow-hidden mb-4 shadow-inner">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.caption}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="font-handwriting text-2xl sm:text-3xl text-rose-800 font-bold">
                {activePhoto.caption}
              </p>
              {activePhoto.date && (
                <p className="text-xs text-stone-400 font-mono mt-1">
                  📅 {activePhoto.date}
                </p>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Add Photo */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-md w-full bg-white p-6 rounded-2xl shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                <h3 className="font-serif-display font-bold text-lg text-stone-800">
                  Tambah Foto Kenangan Baru
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddPhoto} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Pilih File Foto atau Masukkan URL
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-xs text-stone-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 mb-2 cursor-pointer"
                  />
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://example.com/foto-sheba.jpg"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Caption Manis
                  </label>
                  <input
                    type="text"
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    placeholder="Misal: Senyum tercantik di kafe favorit..."
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Label Momen / Tanggal
                  </label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="Misal: Liburan Seru, 2024"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-rose-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-xs text-stone-600 hover:bg-stone-100 rounded-lg"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={!newUrl}
                    className="px-4 py-2 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 rounded-lg shadow-xs"
                  >
                    Simpan Polaroid 📸
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
