import { FunFact, PhotoMemory } from '../types';

export const INITIAL_PHOTOS: PhotoMemory[] = [
  {
    id: 'p1',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    caption: 'Senyum tercantik yang selalu bikin hari-hariku adem ✨',
    date: 'Kenangan Manis',
    tag: 'Favorite Smile',
    rotation: -2,
  },
  {
    id: 'p2',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    caption: 'Kencan sore yang santai, ngobrolin ribuan hal random ☕',
    date: 'Coffee & You',
    tag: 'Warm Moments',
    rotation: 3,
  },
  {
    id: 'p3',
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    caption: 'Foto candid tapi auranya selalu paling bersinar 🌸',
    date: 'Golden Hour',
    tag: 'Glow of Sheba',
    rotation: -1,
  },
  {
    id: 'p4',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    caption: 'Ketawa lepas bareng yang nggak bakal pernah terlupakan 💕',
    date: 'Happy Days',
    tag: 'Pure Joy',
    rotation: 2,
  },
];

export const FUN_FACTS: FunFact[] = [
  {
    id: 'f1',
    icon: '✨',
    badge: 'Fakta #1',
    title: 'Senyuman Pencair Suasana',
    description: 'Kalau Sheba udah senyum atau ketawa kecil, rasanya semua capek dan penat langsung buyar. Senyummu punya sihir tersendiri!',
  },
  {
    id: 'f2',
    icon: '🥺',
    badge: 'Fakta #2',
    title: 'Tukang Ngambek yang Bikin Gemas',
    description: 'Kalau lagi cemberut atau ngambek tipis-tipis, bukannya takut, malah pengen cubit pipinya karena terlalu lucu.',
  },
  {
    id: 'f3',
    icon: '☕',
    badge: 'Fakta #3',
    title: 'Tempat Cerita Paling Nyaman',
    description: 'Ngobrol apapun bareng Sheba nggak pernah bikin bosan. Dari cerita penting sampai gosip receh, selalu asik berjam-jam.',
  },
  {
    id: 'f4',
    icon: '🍰',
    badge: 'Fakta #4',
    title: 'Foodie Enthusiast Mode: ON',
    description: 'Matanya langsung berbinar-binar kalau ditawarin dessert manis atau makanan enak. Energi bahagianya nular banget!',
  },
  {
    id: 'f5',
    icon: '🌷',
    badge: 'Fakta #5',
    title: 'Hati yang Sangat Tulus',
    description: 'Sheba selalu punya cara manis untuk peduli sama orang di sekitarnya. Kebaikan hatimu itu langka dan berharga.',
  },
  {
    id: 'f6',
    icon: '💌',
    badge: 'Fakta #6',
    title: 'Forever My Favorite Person',
    description: 'Di antara miliaran manusia di dunia, aku selalu bersyukur semesta mempertemukan kita. Kamu selalu jadi favoritku.',
  },
];

export const LETTER_CONTENT = {
  greeting: 'Hai Shalva Aulia Putri, my sweetest Sheba...',
  paragraphs: [
    'Selamat bertambah usia untuk perempuan terhebat dan termanis yang selalu ada di pikiranku! 🎉',
    'Hari ini adalah hari yang luar biasa karena seseorang yang begitu istimewa dilahirkan ke dunia. Terima kasih sudah tumbuh menjadi pribadi yang begitu hangat, ceria, dan selalu membawa tawa ke mana pun kamu melangkah.',
    'Bersama kamu, hal-hal sederhana berubah jadi kenangan yang sangat berharga. Cara kamu tersenyum, cara kamu bercerita dengan mata yang berbinar, sampai tingkah lucumu yang sering bikin gemas—semuanya selalu berhasil bikin duniaku terasa lebih indah.',
    'Di usiamu yang baru ini, doa terbaikku selalu mengalir untukmu: semoga langkahmu selalu dimudahkan, kesehatan dan kebahagiaan selalu menyertaimu, serta semua mimpi-mimpi hebat yang kamu simpan dalam hati segera menjadi kenyataan.',
    'Jangan pernah ragu akan potensimu, karena kamu jauh lebih kuat dan hebat dari yang kamu bayangkan. Dan ingat, apapun harinya, aku selalu di sini mendukung dan menyayangimu.',
  ],
  closing: 'With all the love in the universe,',
  sender: 'Seseorang yang Selalu Mengagumimu ❤️',
};
