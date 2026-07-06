import React, { useState, useMemo } from 'react';
import { Calendar, Users, Info, ArrowRight, Tag, Compass, Sparkles } from 'lucide-react';
import { OpenTripSchedule } from '../types';
import { OPEN_TRIP_SCHEDULES, PACKAGES } from '../data';

interface OpenTripPageProps {
  onOpenBookingWithSchedule: (destination: 'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba', packageId: string, date: string) => void;
}

export default function OpenTripPage({ onOpenBookingWithSchedule }: OpenTripPageProps) {
  const [selectedDest, setSelectedDest] = useState<'Semua' | 'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba'>('Semua');
  const [selectedMonth, setSelectedMonth] = useState<'Semua' | '07'>('Semua'); // Only July 2026 scheduling is setup

  // filter
  const filteredSchedules = useMemo(() => {
    return OPEN_TRIP_SCHEDULES.filter((sched) => {
      const matchesDest = selectedDest === 'Semua' || sched.destination === selectedDest;
      
      const dateParts = sched.date.split('-'); // ["2026", "07", "10"]
      const matchesMonth = selectedMonth === 'Semua' || dateParts[1] === selectedMonth;

      return matchesDest && matchesMonth;
    });
  }, [selectedDest, selectedMonth]);

  const destinations: ('Semua' | 'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba')[] = ['Semua', 'Bali', 'Yogyakarta', 'Lombok', 'Sumba'];
  const months = [
    { value: 'Semua', label: 'SEMUA BULAN' },
    { value: '07', label: 'JULI 2026' }
  ];

  const getStatusBadge = (status: 'Tersedia' | 'Hampir Penuh' | 'Full') => {
    if (status === 'Tersedia') {
      return <span className="bg-green-100 text-green-700 text-[10px] font-bold tracking-wider px-2.5 py-0.5 uppercase">Tersedia</span>;
    }
    if (status === 'Hampir Penuh') {
      return <span className="bg-amber-100 text-amber-700 text-[10px] font-bold tracking-wider px-2.5 py-0.5 uppercase">Hampir Penuh</span>;
    }
    return <span className="bg-stone-200 text-stone-500 text-[10px] font-bold tracking-wider px-2.5 py-0.5 uppercase">Full Booked</span>;
  };

  return (
    <div className="pt-24 pb-16 bg-stone-50 min-h-screen text-stone-900 space-y-12">
      {/* Title Header */}
      <div className="max-w-4xl mx-auto text-center px-6 space-y-4">
        <span className="text-xs font-bold text-amber-500 tracking-widest uppercase flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Gabung Rombongan Seru
        </span>
        <h1 className="font-serif text-3xl md:text-5xl tracking-wide text-stone-900">JADWAL OPEN TRIP</h1>
        <div className="w-16 h-1 bg-amber-500 mx-auto mt-2"></div>
        <p className="text-stone-600 text-sm leading-relaxed max-w-2xl mx-auto pt-2">
          Hemat biaya dengan bergabung bersama grup traveler seru lainnya di jadwal keberangkatan tetap kami. Sempurna untuk solo traveler, pasangan, atau grup kecil.
        </p>
      </div>

      {/* Interactive Filter Panel */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white border border-stone-200 p-5 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dest Filter */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block">Cari Destinasi</span>
              <div className="flex flex-wrap gap-1.5">
                {destinations.map((dest) => (
                  <button
                    key={dest}
                    onClick={() => setSelectedDest(dest)}
                    className={`py-1.5 px-3.5 text-xs font-medium border transition-colors ${
                      selectedDest === dest
                        ? 'bg-stone-900 text-white border-stone-900 font-bold'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>

            {/* Month Filter */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block">Pilih Bulan Keberangkatan</span>
              <div className="flex flex-wrap gap-1.5">
                {months.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setSelectedMonth(m.value as any)}
                    className={`py-1.5 px-3.5 text-xs font-medium border transition-colors ${
                      selectedMonth === m.value
                        ? 'bg-stone-900 text-white border-stone-900 font-bold'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedules List Grid */}
      <section className="max-w-7xl mx-auto px-6">
        {filteredSchedules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSchedules.map((sched) => {
              const matchedPkg = PACKAGES.find(p => p.id === sched.packageId);
              const filledPercentage = (sched.quotaFilled / sched.quotaMax) * 100;
              const isFull = sched.status === 'Full';

              return (
                <div
                  key={sched.id}
                  className={`bg-white border p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative ${
                    isFull ? 'border-stone-200 opacity-80' : 'border-stone-300'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Badge row */}
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] bg-stone-900 text-white font-bold tracking-widest px-2.5 py-1 uppercase">
                        {sched.destination}
                      </span>
                      {getStatusBadge(sched.status)}
                    </div>

                    {/* Date and package name */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold uppercase tracking-wider">
                        <Calendar className="w-4 h-4" />
                        <span>Juli {sched.date.split('-')[2]}, 2026 (Fixed Departure)</span>
                      </div>
                      <h3 className="font-serif font-bold text-stone-900 text-base md:text-lg tracking-wide leading-snug">
                        {sched.packageName}
                      </h3>
                      {matchedPkg && (
                        <p className="text-xs text-stone-500 line-clamp-2 pt-1 font-sans">{matchedPkg.description}</p>
                      )}
                    </div>

                    {/* Quota Progress Bar */}
                    <div className="space-y-1.5 border-t border-stone-100 pt-3">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-stone-500 font-medium">Sisa Slot Keberangkatan:</span>
                        <span className="font-bold text-stone-850">
                          {sched.quotaFilled} / {sched.quotaMax} Peserta Terdaftar
                        </span>
                      </div>
                      <div className="w-full bg-stone-100 h-2">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isFull 
                              ? 'bg-stone-300' 
                              : sched.status === 'Hampir Penuh' 
                                ? 'bg-amber-500' 
                                : 'bg-green-500'
                          }`}
                          style={{ width: `${filledPercentage}%` }}
                        ></div>
                      </div>
                      <p className="text-[9px] text-stone-400 italic">
                        *Keberangkatan dijamin lunas & berangkat meskipun kuota belum terisi penuh.
                      </p>
                    </div>
                  </div>

                  {/* Pricing and Action Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-stone-100 pt-4 mt-6">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase tracking-widest block">Harga Per Orang (All-In):</span>
                      <span className="font-serif font-bold text-amber-600 text-base md:text-lg">
                        Rp {new Intl.NumberFormat('id-ID').format(sched.pricePerPerson)}
                        <span className="text-xs font-sans font-normal text-stone-400">/pax</span>
                      </span>
                    </div>

                    <button
                      disabled={isFull}
                      onClick={() => onOpenBookingWithSchedule(sched.destination, sched.packageId, sched.date)}
                      className={`font-serif text-xs font-bold px-6 py-2.5 transition-colors uppercase tracking-widest text-center ${
                        isFull
                          ? 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
                          : 'bg-stone-900 text-white hover:bg-stone-850'
                      }`}
                    >
                      {isFull ? 'Selesai / Full Booked' : 'Gabung Trip Ini'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-stone-200 py-16 px-6 text-center space-y-4 max-w-lg mx-auto">
            <Compass className="w-12 h-12 text-stone-300 mx-auto animate-spin-slow" />
            <h3 className="font-serif text-lg font-bold text-stone-900">Jadwal Tidak Ditemukan</h3>
            <p className="text-xs text-stone-500">
              Maaf, belum ada jadwal keberangkatan Open Trip untuk kategori filter terpilih di bulan Juli 2026. Silakan coba destinasi lain.
            </p>
            <button
              onClick={() => {
                setSelectedDest('Semua');
                setSelectedMonth('Semua');
              }}
              className="text-xs font-bold text-amber-500 underline uppercase tracking-wider"
            >
              Tampilkan Semua Jadwal
            </button>
          </div>
        )}
      </section>

      {/* Safety Info Section */}
      <section className="max-w-7xl mx-auto px-6 py-8 bg-stone-900 text-white grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div className="p-4 space-y-2 border-b md:border-b-0 md:border-r border-stone-800 last:border-0">
          <div className="flex justify-center md:justify-start">
            <Users className="w-6 h-6 text-amber-500 mb-2" />
          </div>
          <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-amber-500">GRUP TERBATAS EKSKLUSIF</h4>
          <p className="text-[11px] text-stone-400 leading-relaxed font-sans">Kapasitas rombongan dibatasi maksimal 10-15 orang per trip demi menjaga kualitas interaksi, kenyamanan, serta protokol sanitasi yang prima.</p>
        </div>
        <div className="p-4 space-y-2 border-b md:border-b-0 md:border-r border-stone-800 last:border-0">
          <div className="flex justify-center md:justify-start">
            <Tag className="w-6 h-6 text-amber-500 mb-2" />
          </div>
          <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-amber-500">HARGA SUDAH BERSIH</h4>
          <p className="text-[11px] text-stone-400 leading-relaxed font-sans">Harga all-in mencakup akomodasi hotel bintang 3/4, konsumsi makan harian, seluruh tiket masuk gerbang wisata nasional, pemandu lokal, dan asuransi jiwa.</p>
        </div>
        <div className="p-4 space-y-2 last:border-0">
          <div className="flex justify-center md:justify-start">
            <Info className="w-6 h-6 text-amber-500 mb-2" />
          </div>
          <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-amber-500">JAMINAN TANGGAL FIX</h4>
          <p className="text-[11px] text-stone-400 leading-relaxed font-sans">Kami menggaransi semua jadwal di atas pasti berangkat 100% tanpa ada penundaan, penambahan biaya di tengah jalan, atau pembatalan sepihak.</p>
        </div>
      </section>
    </div>
  );
}
