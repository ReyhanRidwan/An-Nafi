import React, { useState } from 'react';
import { Camera, MapPin, X, ZoomIn } from 'lucide-react';

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  location: string;
  island: 'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba';
  desc: string;
}

export default function GalleryPage() {
  const [filter, setFilter] = useState<'Semua' | 'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba'>('Semua');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const galleryData: GalleryItem[] = [
    {
      id: 1,
      image: "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783323538/52232f7d-759e-40de-a9ce-a8aa0fcde84d.png",
      title: "Keheningan Ubud & Pesona Alam",
      location: "Ubud, Bali",
      island: "Bali",
      desc: "Menyusuri pura samudera tinggi, bersantai di villa sawah asri, hingga petualangan tebing eksotis."
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783259686/52e43830-db53-4994-bcdc-5f89d5ab2d81.png",
      title: "Eksotisme Nusa Penida",
      location: "Kelingking Beach, Bali",
      island: "Bali",
      desc: "Petualangan premium yang memadukan keindahan alam mistis tebing pantai pasir putih."
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783260527/df4b701d-7590-4c0b-825a-9a947c63330c.png",
      title: "Warisan Luhur Borobudur",
      location: "Borobudur, Yogyakarta",
      island: "Yogyakarta",
      desc: "Melihat sunrise Borobudur berselimut kabut fajar dengan latar belakang pegunungan yang megah."
    },
    {
      id: 4,
      image: "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783239412/46590175-6096-4c5d-946c-9102764f4780.png",
      title: "Sudut Sejarah Keraton",
      location: "Kraton Yogyakarta, Yogyakarta",
      island: "Yogyakarta",
      desc: "Menjelajahi arsitektur tradisional jawa, pusaka pusaka keraton, dan kekayaan budaya kesultanan."
    },
    {
      id: 5,
      image: "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783325990/07be36ab-1958-4953-9542-37d30212f527.png",
      title: "Kejernihan Gili Islands & Pantai",
      location: "Gili Trawangan, Lombok",
      island: "Lombok",
      desc: "Berenang bersama penyu laut di Gili Trawangan, menikmati birunya pesisir pasir pantai."
    },
    {
      id: 6,
      image: "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783239446/a455d443-e832-40a7-99a1-2caf09c73875.png",
      title: "Pemandangan Savana Sembalun",
      location: "Sembalun, Lombok",
      island: "Lombok",
      desc: "Kesejukan alam di lereng Gunung Rinjani yang asri dikelilingi perbukitan hijau tropis."
    },
    {
      id: 7,
      image: "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783323579/14dd2e5b-db1b-45d4-80fb-85d7d1775637.png",
      title: "Sumba Savana Liar",
      location: "Wairinding, Sumba",
      island: "Sumba",
      desc: "Menyaksikan hamparan bukit bergelombang Wairinding dan keajaiban danau air asin."
    },
    {
      id: 8,
      image: "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783259886/ff111fc5-420e-4677-8c71-19437f814b2a.png",
      title: "Eksotisme Pesisir Sumba",
      location: "Pantai Walakiri, Sumba",
      island: "Sumba",
      desc: "Menyusuri indahnya pemandangan pohon bakau menari di bawah langit sunset yang berkilauan."
    }
  ];

  const filteredData = filter === 'Semua' 
    ? galleryData 
    : galleryData.filter(item => item.island === filter);

  return (
    <div className="pt-24 pb-16 bg-stone-50 min-h-screen text-stone-900 space-y-12">
      {/* Title Header */}
      <div className="max-w-4xl mx-auto text-center px-6 space-y-4">
        <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Eksplorasi Lensa Kamera</span>
        <h1 className="font-serif text-3xl md:text-5xl tracking-wide text-stone-900 uppercase">GALERI TRIP AN NAFI</h1>
        <div className="w-16 h-1 bg-amber-500 mx-auto mt-2"></div>
        <p className="text-stone-600 text-sm leading-relaxed max-w-2xl mx-auto pt-2">
          Berikut adalah potret orisinal perjalanan para tamu premium kami selama menjelajahi pesona Bali, Yogyakarta, Lombok, dan Sumba.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-6 flex justify-center">
        <div className="flex flex-wrap gap-2 justify-center border-b border-stone-200 pb-4 w-full max-w-lg">
          {(['Semua', 'Bali', 'Yogyakarta', 'Lombok', 'Sumba'] as const).map((loc) => (
            <button
              key={loc}
              onClick={() => setFilter(loc)}
              className={`py-1.5 px-4 text-xs font-semibold tracking-wider border transition-colors ${
                filter === loc
                  ? 'bg-stone-900 text-white border-stone-900 font-bold'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
              }`}
            >
              {loc.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Photos */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredData.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedPhoto(item)}
            className="group relative bg-white border border-stone-200 p-2 cursor-pointer transition-transform hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/90 p-2 text-stone-900">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            <div className="p-3 space-y-1">
              <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">{item.island}</span>
              <h3 className="font-serif font-bold text-stone-900 text-xs tracking-wide truncate">{item.title}</h3>
              <div className="flex items-center gap-1 text-[10px] text-stone-400">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate">{item.location}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Lightbox Modal Overlay */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 text-white hover:text-amber-500 p-2 border border-white/20 hover:border-amber-500/40 bg-black/40"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-4xl w-full bg-stone-900 text-white border border-stone-800 p-4 space-y-4 shadow-2xl">
            <div className="aspect-[16/10] bg-stone-950 overflow-hidden max-h-[70vh]">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="px-2 pb-2 space-y-1">
              <div className="flex justify-between items-baseline">
                <h3 className="font-serif text-lg font-bold text-white tracking-wide">{selectedPhoto.title}</h3>
                <span className="text-[10px] bg-amber-500 text-stone-950 px-2 py-0.5 uppercase tracking-wider font-bold">
                  {selectedPhoto.island}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-stone-400">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>{selectedPhoto.location}</span>
              </div>
              <p className="text-xs text-stone-300 pt-2 font-sans leading-relaxed max-w-2xl">
                {selectedPhoto.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
