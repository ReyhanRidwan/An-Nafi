import React from 'react';
import { Shield, Award, Users, Heart, ClipboardCheck, Compass, CheckCircle } from 'lucide-react';
import { FLEETS } from '../data';

export default function WhyPage({ onOpenBooking }: { onOpenBooking: () => void }) {
  const values = [
    {
      icon: <Award className="w-6 h-6 text-amber-500" />,
      title: 'Sejak Tahun 2012',
      desc: 'Lebih dari satu dekade melayani liburan premium di Bali, dan kini berekspansi ke Yogyakarta, Lombok, dan Sumba dengan standar layanan terbaik.'
    },
    {
      icon: <Shield className="w-6 h-6 text-amber-500" />,
      title: 'Standar Keselamatan Utama',
      desc: 'Setiap paket wisata kami telah dilengkapi asuransi perjalanan komprehensif, perlengkapan darurat P3K, dan armada yang selalu dicek berkala.'
    },
    {
      icon: <Users className="w-6 h-6 text-amber-500" />,
      title: 'Pemandu Lokal Berlisensi',
      desc: 'Bekerjasama erat dengan masyarakat adat setempat untuk menyediakan pemandu lokal berpengetahuan luas, ramah, dan komunikatif.'
    },
    {
      icon: <ClipboardCheck className="w-6 h-6 text-amber-500" />,
      title: 'Biaya Transparan 100%',
      desc: 'Tanpa biaya tersembunyi. Semua rincian hotel, tiket masuk, makanan, dan retribusi tertera jelas di kwitansi dan invoice resmi.'
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-stone-50 min-h-screen text-stone-900 space-y-16">
      {/* Title Header */}
      <div className="max-w-4xl mx-auto text-center px-6 space-y-4">
        <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Keandalan Utama Kami</span>
        <h1 className="font-serif text-3xl md:text-5xl tracking-wide text-stone-900 uppercase">MENGAPA PILIH AN NAFI?</h1>
        <div className="w-16 h-1 bg-amber-500 mx-auto mt-2"></div>
        <p className="text-stone-600 text-sm md:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
          Kami memahami bahwa waktu liburan Anda sangat berharga. Itulah mengapa kami mengelola seluruh elemen perjalanan secara teliti dan profesional.
        </p>
      </div>

      {/* Core Values Section */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((val, i) => (
          <div key={i} className="bg-white border border-stone-200 p-6 space-y-4">
            <div className="bg-stone-50 w-12 h-12 flex items-center justify-center border border-stone-100">
              {val.icon}
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-sm tracking-wide uppercase">{val.title}</h3>
            <p className="text-stone-500 text-xs leading-relaxed font-sans">{val.desc}</p>
          </div>
        ))}
      </section>

      {/* Insurance Standar Keselamatan */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-stone-900 text-white p-8 lg:p-12">
        <div className="space-y-6">
          <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase">Perlindungan Perjalanan</span>
          <h2 className="font-serif text-2xl md:text-3xl tracking-wide">STANDAR ASURANSI & KESELAMATAN KAMI</h2>
          <p className="text-stone-300 text-xs leading-relaxed">
            Keamanan dan kenyamanan Anda adalah prioritas mutlak kami. Setiap paket perjalanan yang diselenggarakan oleh An nafi dilindungi asuransi jiwa komprehensif bekerja sama dengan Jasa Raharja dan institusi asuransi terkemuka di Indonesia.
          </p>
          <div className="space-y-3 pt-2 text-xs">
            <div className="flex gap-2 items-start">
              <CheckCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
              <span>Proteksi asuransi perjalanan penuh selama berada di rute trip terdaftar.</span>
            </div>
            <div className="flex gap-2 items-start">
              <CheckCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
              <span>Sopir profesional berlisensi menguasai medan jalanan ekstrem di Sumba dan Bali Utara.</span>
            </div>
            <div className="flex gap-2 items-start">
              <CheckCircle className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
              <span>Perlengkapan darurat standar laut (life jacket SNI) untuk setiap aktivitas air di Gili Lombok atau Nusa Penida.</span>
            </div>
          </div>
        </div>

        <div className="border border-stone-800 p-6 bg-stone-850/50 space-y-4">
          <h3 className="font-serif text-amber-500 text-sm tracking-wider uppercase">JAMINAN AMANAH 100%</h3>
          <p className="text-stone-400 text-xs leading-relaxed">
            Sejak tahun 2012, kami bangga mempertahankan rekor keluhan minimal berkat keterbukaan administrasi. Anda menerima kwitansi, rincian pengeluaran, serta bukti reservasi hotel sebelum keberangkatan tanpa ada biaya yang disembunyikan.
          </p>
          <div className="border-t border-stone-800 pt-4 flex gap-6 text-center">
            <div className="flex-1">
              <div className="text-2xl font-serif font-bold text-white">0%</div>
              <div className="text-[9px] uppercase tracking-wider text-stone-500 mt-1">Biaya Tersembunyi</div>
            </div>
            <div className="flex-1 border-l border-stone-800">
              <div className="text-2xl font-serif font-bold text-white">24/7</div>
              <div className="text-[9px] uppercase tracking-wider text-stone-500 mt-1">Dukungan Admin</div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Fleet Gallery */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase">Standard Kendaraan Kelas Utama</span>
          <h2 className="font-serif text-2xl md:text-3xl tracking-wide text-stone-900">GALERI ARMADA PREMIUM KAMI</h2>
          <p className="text-stone-500 text-xs max-w-lg mx-auto">Kami mengoperasikan armada ber-AC keluaran terbaru untuk memastikan kenyamanan fisik Anda sepanjang liburan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FLEETS.map((car) => (
            <div key={car.id} className="bg-white border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-48 overflow-hidden bg-stone-100 relative">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <span className="absolute bottom-3 left-3 bg-stone-900/90 text-white text-[9px] uppercase font-bold tracking-widest px-2 py-0.5">
                    {car.type}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="font-serif font-bold text-stone-900 text-sm tracking-wide">{car.name}</h4>
                  <div className="flex justify-between text-xs text-stone-500 border-b border-stone-100 pb-2">
                    <span>Maks. Kapasitas:</span>
                    <span className="font-semibold text-stone-800">{car.capacity} Penumpang</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-500 pt-1">
                    <span>Ketersediaan:</span>
                    <span className="text-green-600 font-semibold">Tersedia di Bali & Jogja</span>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 pt-2 border-t border-stone-50">
                <button
                  onClick={onOpenBooking}
                  className="w-full bg-stone-900 text-white font-serif text-[10px] font-bold py-2 transition-colors hover:bg-stone-850 uppercase tracking-widest"
                >
                  Pilih & Booking Privat Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
