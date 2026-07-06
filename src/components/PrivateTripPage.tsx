import React, { useState } from 'react';
import { Compass, Sparkles, Shield, Heart, ShieldCheck, MapPin, Calculator, HelpCircle } from 'lucide-react';

interface PrivateTripPageProps {
  onOpenBookingWithNotes: (destination: 'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba', customNotes: string) => void;
}

export default function PrivateTripPage({ onOpenBookingWithNotes }: PrivateTripPageProps) {
  const [calcDest, setCalcDest] = useState<'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba'>('Bali');
  const [calcGuests, setCalcGuests] = useState<number>(2);
  const [customNotes, setCustomNotes] = useState<string>('');

  // Base Prices for Estimations
  const prices: Record<'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba', number> = {
    Bali: 4850000,
    Yogyakarta: 3650000,
    Lombok: 4250000,
    Sumba: 5950000
  };

  const currentPrice = prices[calcDest];
  const subtotal = currentPrice * calcGuests;
  const discount = calcGuests >= 4 ? 150000 : 0;
  const totalEstimation = Math.max(0, subtotal - discount);

  const handleSubmitCustomRequest = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBookingWithNotes(calcDest, customNotes);
  };

  return (
    <div className="pt-24 pb-16 bg-stone-50 min-h-screen text-stone-900 space-y-16">
      {/* Title Header */}
      <div className="max-w-4xl mx-auto text-center px-6 space-y-4">
        <span className="text-xs font-bold text-amber-500 tracking-widest uppercase flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Kemewahan Liburan Eksklusif
        </span>
        <h1 className="font-serif text-3xl md:text-5xl tracking-wide text-stone-900">PRIVATE TRIP PREMIUM</h1>
        <div className="w-16 h-1 bg-amber-500 mx-auto mt-2"></div>
        <p className="text-stone-600 text-sm leading-relaxed max-w-2xl mx-auto pt-2">
          Hadirkan kenyamanan mutlak bagi keluarga atau grup korporasi Anda. Tanggal fleksibel bebas ditentukan sendiri, rute perjalanan kustom sesuai keinginan, serta armada & pemandu khusus eksklusif milik Anda.
        </p>
      </div>

      {/* Private Trip Advantages */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-stone-200 p-6 space-y-3">
          <div className="w-10 h-10 bg-amber-50 flex items-center justify-center border border-amber-100">
            <Sparkles className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-sm tracking-wide uppercase">Itinerary Fleksibel & Kustom</h3>
          <p className="text-stone-500 text-xs leading-relaxed font-sans">Anda dapat menentukan objek wisata mana saja yang ingin dikunjungi lebih lama, menambahkan destinasi kuliner impian, atau memperlambat tempo liburan tanpa terikat rombongan lain.</p>
        </div>

        <div className="bg-white border border-stone-200 p-6 space-y-3">
          <div className="w-10 h-10 bg-amber-50 flex items-center justify-center border border-amber-100">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-sm tracking-wide uppercase">Armada & Sopir Khusus</h3>
          <p className="text-stone-500 text-xs leading-relaxed font-sans">Satu armada MPV luxury ( Alphard / Innova Zenix ) didedikasikan penuh hanya untuk rombongan Anda selama liburan, menjamin kebersihan dan keleluasaan istirahat Anda.</p>
        </div>

        <div className="bg-white border border-stone-200 p-6 space-y-3">
          <div className="w-10 h-10 bg-amber-50 flex items-center justify-center border border-amber-100">
            <Heart className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-sm tracking-wide uppercase">Pemandu Personal Berlisensi</h3>
          <p className="text-stone-500 text-xs leading-relaxed font-sans">Seorang pemandu wisata lokal profesional akan memandu secara eksklusif, menceritakan rahasia budaya lokal, membantu fotografi estetik, dan memastikan kelancaran aktivitas rombongan.</p>
        </div>
      </section>

      {/* Interactive Estimator Calculator & Request Custom Itinerary Form */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Estimator Calculator */}
        <div className="bg-white border border-stone-200 p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Calculator className="w-5 h-5 text-amber-500" />
            <h2 className="font-serif font-bold text-stone-900 text-base uppercase tracking-wider">Kalkulator Estimasi Biaya Dasar</h2>
          </div>

          <div className="space-y-4 text-xs font-sans">
            {/* Dest select */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block">Pilih Destinasi Wisata</label>
              <select
                value={calcDest}
                onChange={(e) => setCalcDest(e.target.value as any)}
                className="w-full p-2.5 border border-stone-200 bg-stone-50 outline-none text-stone-850 focus:border-stone-900"
              >
                <option value="Bali">BALI (Premium Ubud & Nusa Penida Escape - Rp 4.850.000/pax)</option>
                <option value="Yogyakarta">YOGYAKARTA (Royal Cultural Journey - Rp 3.650.000/pax)</option>
                <option value="Lombok">LOMBOK (Gili Islands & Pink Beach - Rp 4.250.000/pax)</option>
                <option value="Sumba">SUMBA (Exotic Wild Savannah & Lagoons - Rp 5.950.000/pax)</option>
              </select>
            </div>

            {/* Guests count */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block">Jumlah Anggota Rombongan</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCalcGuests(prev => Math.max(1, prev - 1))}
                  className="w-9 h-9 flex items-center justify-center bg-stone-100 text-stone-800 border border-stone-300 font-bold"
                >
                  -
                </button>
                <span className="font-serif font-bold text-base w-8 text-center">{calcGuests}</span>
                <button
                  type="button"
                  onClick={() => setCalcGuests(prev => prev + 1)}
                  className="w-9 h-9 flex items-center justify-center bg-stone-100 text-stone-800 border border-stone-300 font-bold"
                >
                  +
                </button>
                <span className="text-stone-500 font-medium">Pax / Orang</span>
              </div>
            </div>

            {/* Estimation Calculation breakdown */}
            <div className="bg-stone-50 p-4 border border-stone-200/60 space-y-2.5 pt-3 mt-4">
              <div className="flex justify-between items-center text-stone-500">
                <span>Harga Paket Dasar per pax:</span>
                <span className="font-semibold text-stone-800">Rp {new Intl.NumberFormat('id-ID').format(currentPrice)}</span>
              </div>
              <div className="flex justify-between items-center text-stone-500">
                <span>Subtotal Peserta ({calcGuests} Pax):</span>
                <span className="font-semibold text-stone-800">Rp {new Intl.NumberFormat('id-ID').format(subtotal)}</span>
              </div>
              {calcGuests >= 4 && (
                <div className="flex justify-between items-center text-green-600 font-medium">
                  <span>Diskon Rombongan (Min 4 pax):</span>
                  <span>-Rp {new Intl.NumberFormat('id-ID').format(discount)}</span>
                </div>
              )}
              <div className="border-t border-stone-300 pt-3 flex justify-between items-baseline text-sm font-serif font-bold text-stone-900">
                <span>Estimasi Total Biaya:</span>
                <span className="text-amber-600 text-base">Rp {new Intl.NumberFormat('id-ID').format(totalEstimation)}</span>
              </div>
              <p className="text-[10px] text-stone-400 italic pt-1 leading-relaxed">
                *Estimasi di atas hanya untuk referensi biaya dasar per pax, belum termasuk add-on opsional (malam ekstra hotel, dsb) atau akomodasi hotel bintang 5 yang kustom.
              </p>
            </div>
          </div>
        </div>

        {/* Custom Itinerary Request Form */}
        <div className="bg-stone-900 text-white p-6 md:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase">Buat Itinerary Sendiri</span>
            <h2 className="font-serif text-xl md:text-2xl tracking-wide uppercase">REQUEST ITINERARY CUSTOM</h2>
            <p className="text-stone-400 text-xs">Punya impian atau kebutuhan khusus? Tuliskan di formulir singkat ini, tim travel designer kami akan segera menghubungi Anda.</p>
          </div>

          <form onSubmit={handleSubmitCustomRequest} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">Tulis Kebutuhan Khusus / Preferensi</label>
              <textarea
                required
                rows={4}
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Contoh: Kami berlibur membawa lansia (butuh akses kursi roda), menginginkan hotel bintang 5 pinggir tebing Uluwatu, dan makan malam romantis seafood di Jimbaran."
                className="w-full p-3.5 bg-stone-850 border border-stone-800 text-stone-200 text-xs outline-none focus:border-amber-500 transition-colors font-sans leading-relaxed"
              />
            </div>

            <div className="flex gap-2 items-start text-[10px] text-stone-400 bg-stone-850 p-3 border-l-2 border-amber-500">
              <span className="text-amber-500 font-bold shrink-0">•</span>
              <p className="font-sans">Menekan tombol di bawah ini akan membuka Booking Wizard dengan detail catatan ini otomatis ditransfer ke Step 6 formulir pemesanan.</p>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 text-stone-950 font-serif text-xs font-bold py-3 transition-colors hover:bg-amber-600 uppercase tracking-widest"
            >
              Konsultasi & Booking Private Trip
            </button>
          </form>
        </div>

      </section>

      {/* Private Trip FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 space-y-8">
        <h2 className="font-serif text-2xl md:text-3xl text-center tracking-wide text-stone-900 uppercase">Tanya Jawab Seputar Private Trip</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="bg-white border border-stone-200 p-5 space-y-2">
            <h4 className="font-serif font-bold text-stone-900 text-sm">Apakah tanggal trip bebas ditentukan sendiri?</h4>
            <p className="text-stone-500 font-sans leading-relaxed">Benar-benar bebas. Anda bebas menentukan tanggal mulai dan kepulangan kapan saja (kecuali blackout tanggal penuh jika kapasitas hotel/pemandu kami benar-benar habis).</p>
          </div>
          <div className="bg-white border border-stone-200 p-5 space-y-2">
            <h4 className="font-serif font-bold text-stone-900 text-sm">Bagaimana jika kami memiliki rombongan besar (corporate)?</h4>
            <p className="text-stone-500 font-sans leading-relaxed">Nurrbalitravel berpengalaman mengurus MICE / Outing Perusahaan hingga ratusan pax lengkap dengan penyediaan sewa bus besar premium serta gala dinner korporasi.</p>
          </div>
          <div className="bg-white border border-stone-200 p-5 space-y-2">
            <h4 className="font-serif font-bold text-stone-900 text-sm">Apakah kami bisa memilih sendiri kelas hotel?</h4>
            <p className="text-stone-500 font-sans leading-relaxed">Sangat bisa. Anda dapat melakukan request kustom untuk mengganti akomodasi dari hotel bintang 4 default menjadi villa privat, resor mewah bintang 5, maupun glamping mewah.</p>
          </div>
          <div className="bg-white border border-stone-200 p-5 space-y-2">
            <h4 className="font-serif font-bold text-stone-900 text-sm">Berapa lama proses pembuatan rancangan rute kustom?</h4>
            <p className="text-stone-500 font-sans leading-relaxed">Hanya butuh waktu maksimal 1x24 jam sejak konsultasi pertama. Tim travel designer kami akan mengirimkan file PDF itinerary komprehensif lengkap lewat WhatsApp.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
