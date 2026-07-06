import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Calendar, Clock, Star, CheckCircle, Compass, HelpCircle } from 'lucide-react';
import { Package } from '../types';
import { PACKAGES } from '../data';

interface PackagesPageProps {
  onOpenBookingWithPackage: (tripType: 'Open Trip' | 'Private Trip', destination: 'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba' | 'Ziarah' | 'Study Tour', packageId: string) => void;
  initialDestinationFilter?: 'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba' | 'Ziarah' | 'Study Tour' | 'Semua';
}

export default function PackagesPage({ onOpenBookingWithPackage, initialDestinationFilter = 'Semua' }: PackagesPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDest, setSelectedDest] = useState<'Semua' | 'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba' | 'Ziarah' | 'Study Tour'>(initialDestinationFilter);
  const [selectedType, setSelectedType] = useState<'Semua' | 'Open Trip' | 'Private Trip'>('Semua');
  const [activeItineraryId, setActiveItineraryId] = useState<string | null>(null);

  // Filters logic
  const filteredPackages = useMemo(() => {
    return PACKAGES.filter((pkg) => {
      const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            pkg.highlights.some(h => h.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesDest = selectedDest === 'Semua' || pkg.destination === selectedDest;
      const matchesType = selectedType === 'Semua' || pkg.type === selectedType;

      return matchesSearch && matchesDest && matchesType;
    });
  }, [searchTerm, selectedDest, selectedType]);

  const destinations: ('Semua' | 'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba' | 'Ziarah' | 'Study Tour')[] = ['Semua', 'Bali', 'Yogyakarta', 'Lombok', 'Sumba', 'Ziarah', 'Study Tour'];
  const types: ('Semua' | 'Open Trip' | 'Private Trip')[] = ['Semua', 'Open Trip', 'Private Trip'];

  return (
    <div className="pt-24 pb-16 bg-stone-50 min-h-screen text-stone-900 space-y-12">
      {/* Title Header */}
      <div className="max-w-4xl mx-auto text-center px-6 space-y-3">
        <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Katalog Perjalanan Terbaik</span>
        <h1 className="font-serif text-3xl md:text-5xl tracking-wide text-stone-900">PAKET WISATA PILIHAN</h1>
        <div className="w-16 h-1 bg-amber-500 mx-auto mt-1"></div>
        <p className="text-stone-600 text-sm leading-relaxed max-w-2xl mx-auto pt-2">
          Jelajahi keindahan tersembunyi Indonesia dengan jaminan kepuasan tertinggi. Pilih paket yang sesuai dengan minat dan tanggal impian Anda.
        </p>
      </div>

      {/* Filter and Search Section */}
      <section className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="bg-white border border-stone-200 p-5 md:p-6 space-y-5">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
              <Search className="w-4.5 h-4.5" />
            </div>
            <input
              type="text"
              placeholder="Cari paket wisata, destinasi, atau kegiatan menarik (contoh: Kelingking, Sunrise, Snorkeling)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-stone-200 text-sm outline-none focus:border-stone-900 transition-all bg-stone-50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Destination Filters */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block">Filter Destinasi</span>
              <div className="flex flex-wrap gap-1.5">
                {destinations.map((dest) => (
                  <button
                    key={dest}
                    onClick={() => setSelectedDest(dest)}
                    className={`py-1.5 px-3.5 text-xs font-medium border transition-all ${
                      selectedDest === dest
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>

            {/* Trip Type Filters */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block">Filter Tipe Trip</span>
              <div className="flex flex-wrap gap-1.5">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`py-1.5 px-3.5 text-xs font-medium border transition-all ${
                      selectedType === type
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="max-w-7xl mx-auto px-6">
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white border border-stone-200 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Thumbnail */}
                <div className="relative h-56 overflow-hidden bg-stone-100 shrink-0">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-stone-900/90 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1">
                    {pkg.destination}
                  </div>
                  <div className="absolute top-4 right-4 bg-amber-500 text-stone-950 text-[10px] uppercase font-bold tracking-wider px-3 py-1">
                    {pkg.type}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs text-stone-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="font-semibold text-stone-800">{pkg.rating} ({pkg.reviewsCount} Ulasan)</span>
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-stone-900 text-lg leading-snug hover:text-amber-600 transition-colors">
                      {pkg.name}
                    </h3>

                    <p className="text-xs text-stone-600 font-sans leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block">Atraksi Utama</span>
                      <div className="flex flex-wrap gap-1">
                        {pkg.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="text-[9px] bg-stone-50 text-stone-600 border border-stone-200/60 px-2 py-0.5"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions / Itinerary Details */}
                  <div className="space-y-4 pt-4 border-t border-stone-100">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Harga Mulai Dari:</span>
                      <span className="font-serif text-lg font-bold text-amber-600">
                        Rp {new Intl.NumberFormat('id-ID').format(pkg.price)}
                        <span className="text-[10px] font-sans font-normal text-stone-400">/pax</span>
                      </span>
                    </div>

                    {/* Toggle Itinerary dropdown */}
                    <div className="space-y-2">
                      <button
                        onClick={() => setActiveItineraryId(activeItineraryId === pkg.id ? null : pkg.id)}
                        className="text-[10px] font-bold text-stone-700 hover:text-stone-950 flex items-center gap-1 uppercase tracking-wider"
                      >
                        {activeItineraryId === pkg.id ? 'Sembunyikan Rencana Perjalanan' : 'Lihat Rencana Perjalanan (Itinerary)'}
                      </button>

                      {activeItineraryId === pkg.id && (
                        <div className="bg-stone-50 border border-stone-200 p-3.5 space-y-2 text-xs">
                          {pkg.itinerary.map((it, idx) => (
                            <div key={idx} className="flex gap-2 leading-relaxed">
                              <span className="text-amber-500 font-bold shrink-0">•</span>
                              <span className="text-stone-600">{it}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Main Book Button */}
                    <button
                      onClick={() => onOpenBookingWithPackage(pkg.type, pkg.destination, pkg.id)}
                      className="w-full bg-stone-900 text-white font-serif text-xs font-semibold py-2.5 transition-colors hover:bg-stone-850 uppercase tracking-widest text-center"
                    >
                      Booking Sekarang
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-stone-200 py-16 px-6 text-center space-y-4 max-w-lg mx-auto">
            <Compass className="w-12 h-12 text-stone-300 mx-auto animate-spin-slow" />
            <h3 className="font-serif text-lg font-bold text-stone-900">Paket Wisata Tidak Ditemukan</h3>
            <p className="text-xs text-stone-500">
              Tidak ada paket wisata yang cocok dengan pencarian "{searchTerm}" untuk kategori terpilih. Silakan ubah filter destinasi atau tipe trip Anda.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDest('Semua');
                setSelectedType('Semua');
              }}
              className="text-xs font-bold text-amber-500 underline uppercase tracking-wider"
            >
              Reset Semua Filter
            </button>
          </div>
        )}
      </section>

      {/* Sumba / Bali Custom Private Trip Note */}
      <section className="max-w-7xl mx-auto px-6 py-6 bg-amber-50 border border-amber-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 max-w-2xl">
          <h4 className="font-serif font-bold text-stone-900 text-sm">Butuh Itinerary Kustom atau Penyesuaian Sendiri?</h4>
          <p className="text-xs text-stone-600">
            An nafi sangat berpengalaman mengelola Private Trip keluarga besar, reuni, instansi BUMN, maupun bulan madu romantis. Kami melayani perancangan rute kustom gratis.
          </p>
        </div>
        <button
          onClick={() => onOpenBookingWithPackage('Private Trip', 'Bali', '')}
          className="bg-stone-900 text-white font-serif font-bold px-6 py-2.5 text-xs transition-colors hover:bg-stone-850 uppercase tracking-widest min-w-max"
        >
          Konsultasikan Private Trip
        </button>
      </section>
    </div>
  );
}
