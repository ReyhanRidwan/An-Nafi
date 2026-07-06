import React from 'react';
import { motion } from 'motion/react';
import { Award, Users, Calendar, MapPin, Shield, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function AboutPage({ onOpenBooking }: { onOpenBooking: () => void }) {
  const milestones = [
    { year: '2012', title: 'Awal Mula di Bali', desc: 'An nafi didirikan di Kuta, Bali dengan fokus pada layanan rental premium dan paket privat eksklusif.' },
    { year: '2016', title: 'Ekspansi Yogyakarta', desc: 'Sukses memperluas layanan ke pusat budaya Jawa, Yogyakarta, menawarkan kombinasi wisata sejarah Kraton dan Borobudur.' },
    { year: '2019', title: 'Menjangkau Lombok', desc: 'Membuka cabang di Lombok untuk merespon tingginya permintaan wisata bahari Gili Islands dan Pink Beach.' },
    { year: '2022', title: 'Menembus Sumba', desc: 'Menghadirkan rute petualangan paling eksotis dan kultural di Sumba Barat & Timur dengan standar premium.' },
  ];

  const stats = [
    { value: '14+', label: 'Tahun Pengalaman' },
    { value: '4', label: 'Destinasi Utama' },
    { value: '25,000+', label: 'Tamu Bahagia' },
    { value: '4.9', label: 'Rating Google Maps' },
  ];

  return (
    <div className="pt-24 pb-16 bg-stone-50 min-h-screen text-stone-900 space-y-16">
      {/* Title Header */}
      <div className="max-w-4xl mx-auto text-center px-6 space-y-4">
        <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Kisah Perjalanan Kami</span>
        <h1 className="font-serif text-3xl md:text-5xl tracking-wide text-stone-900 uppercase">MENGENAL AN NAFI</h1>
        <div className="w-16 h-1 bg-amber-500 mx-auto mt-2"></div>
        <p className="text-stone-600 text-sm md:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
          Berdiri sejak tahun 2012 di Bali, kini kami telah berkembang melayani 4 destinasi terbaik Indonesia: Bali, Yogyakarta, Lombok, dan Sumba. Berfokus pada pelayanan premium, personal, dan amanah.
        </p>
      </div>

      {/* History & Achievements */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl tracking-wide text-stone-900">Lebih dari Sekadar Agen Perjalanan Wisata</h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            An nafi lahir dari kecintaan kami terhadap keindahan alam Indonesia. Kami menyadari bahwa setiap pelancong menginginkan perjalanan yang nyaman, fleksibel, dan memiliki nilai kenangan yang mendalam. Oleh karena itu, kami mengedepankan akomodasi pilihan, armada berstandar tinggi, serta pemandu wisata lokal yang bersertifikat.
          </p>
          <p className="text-stone-600 text-sm leading-relaxed">
            Dari pesisir pantai berpasir putih di Bali, kemegahan candi bersejarah di Yogyakarta, ketenangan gili di Lombok, hingga eksotisme bentang savana liar di Sumba, kami mengkurasi setiap rute perjalanan agar ramah untuk liburan keluarga maupun rombongan.
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white border border-stone-200 p-4 text-center">
                <div className="font-serif text-2xl md:text-3xl font-bold text-amber-500">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-wider text-stone-500 mt-1 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="bg-stone-900 text-white p-8 border border-stone-800 space-y-6">
          <div className="space-y-2">
            <h3 className="font-serif text-amber-500 text-xl tracking-wide uppercase">Visi Kami</h3>
            <p className="text-stone-300 text-xs leading-relaxed font-sans">
              Menjadi pionir penyedia jasa perjalanan wisata multi-destinasi di Indonesia yang mengutamakan kualitas premium, integritas layanan, dan kelestarian warisan budaya lokal.
            </p>
          </div>
          <div className="space-y-4 border-t border-stone-800 pt-6">
            <h3 className="font-serif text-amber-500 text-xl tracking-wide uppercase">Misi Kami</h3>
            <ul className="space-y-3 text-xs text-stone-300 list-none pl-0">
              <li className="flex gap-3">
                <span className="text-amber-500 font-bold shrink-0">•</span>
                <span>Menyediakan pelayanan premium dengan armada terbaru dan akomodasi terstandar tinggi.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 font-bold shrink-0">•</span>
                <span>Pemberdayaan ekonomi lokal lewat kemitraan erat bersama pemandu, pengrajin, dan warga setempat.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 font-bold shrink-0">•</span>
                <span>Menjamin keselamatan, kejelasan biaya transparan, serta keandalan pemesanan tanpa biaya tersembunyi.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Timeline section */}
      <section className="bg-stone-100 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl text-center tracking-wide text-stone-900 mb-12">MILIK JALUR SEJARAH EKSPANSI</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-stone-300 z-0"></div>

            {milestones.map((item, idx) => (
              <div key={idx} className="relative z-10 text-center space-y-3 bg-white p-6 border border-stone-200/80">
                <div className="w-12 h-12 bg-stone-900 text-amber-500 font-serif font-bold rounded-none flex items-center justify-center mx-auto text-lg border border-amber-500 shadow-md">
                  {item.year}
                </div>
                <h4 className="font-serif font-bold text-stone-900 text-sm tracking-wide mt-2">{item.title}</h4>
                <p className="text-xs text-stone-500 leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Maps & Guest Reviews Integrasi */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="font-serif text-2xl md:text-3xl text-center tracking-wide text-stone-900 mb-8 uppercase">Ulasan Tamu Google Maps</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Simulated Premium Google Map with Reviews pin */}
          <div className="lg:col-span-2 border border-stone-200 bg-white p-4 flex flex-col justify-between min-h-[350px]">
            <div>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-5 h-5 text-red-600 animate-bounce" />
                  <span className="font-serif font-bold text-stone-850 text-sm uppercase">An nafi HQ & Destinasi Terintegrasi</span>
                </div>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 uppercase tracking-wider font-bold">Terverifikasi</span>
              </div>
              <p className="text-xs text-stone-500 mb-4">Mencakup kantor pusat di Bali serta koordinator lokal profesional di Yogyakarta, Lombok, dan Sumba.</p>
            </div>
            
            {/* Map Placeholder frame with premium styling */}
            <div className="flex-1 bg-stone-100 border border-stone-200 flex flex-col items-center justify-center p-6 relative overflow-hidden min-h-[220px]">
              {/* Background styling for realistic vector look */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="relative z-10 text-center space-y-4 max-w-md">
                <div className="inline-flex items-center gap-1 bg-white border border-stone-200 px-3 py-1 text-[11px] font-semibold text-stone-800 shadow-md">
                  📍 Kuta, Bali (Kantor Pusat)
                </div>
                <div className="text-xs text-stone-600 leading-relaxed">
                  Layanan kami tersambung secara digital dengan navigasi Google Maps. Semua rute penjemputan bandara, resor, dan titik atraksi wisata dikonfigurasi menggunakan koordinat GPS presisi.
                </div>
                <div className="flex justify-center gap-2">
                  <span className="bg-stone-900 text-white text-[10px] px-2.5 py-1 tracking-wider uppercase font-semibold">Bali HQ</span>
                  <span className="bg-stone-900 text-white text-[10px] px-2.5 py-1 tracking-wider uppercase font-semibold">Jogja Branch</span>
                  <span className="bg-stone-900 text-white text-[10px] px-2.5 py-1 tracking-wider uppercase font-semibold">Lombok</span>
                  <span className="bg-stone-900 text-white text-[10px] px-2.5 py-1 tracking-wider uppercase font-semibold">Sumba</span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonies box on maps */}
          <div className="bg-white border border-stone-200 p-6 space-y-6">
            <div className="border-b border-stone-100 pb-4">
              <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                <Star className="w-4 h-4 fill-amber-500" />
                <Star className="w-4 h-4 fill-amber-500" />
                <Star className="w-4 h-4 fill-amber-500" />
                <Star className="w-4 h-4 fill-amber-500" />
                <Star className="w-4 h-4 fill-amber-500" />
                <span className="text-stone-800 text-xs ml-1">4.9 / 5.0 (2,450+ Ulasan)</span>
              </div>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">Ulasan Pelanggan Terpercaya</p>
            </div>

            <div className="space-y-4">
              {TESTIMONIALS.map((test) => (
                <div key={test.id} className="text-xs border-b border-stone-100 pb-3 last:border-b-0 last:pb-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <img src={test.avatar} alt={test.name} className="w-7 h-7 rounded-none border border-stone-200 shrink-0" referrerPolicy="no-referrer" />
                    <div>
                      <p className="font-semibold text-stone-900">{test.name}</p>
                      <p className="text-[9px] text-stone-500">{test.location} • <span className="text-amber-600 font-medium">{test.tripType}</span></p>
                    </div>
                  </div>
                  <p className="text-stone-600 font-serif leading-relaxed italic">"{test.text}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Booking CTA bottom */}
      <section className="bg-stone-900 text-white py-12 text-center space-y-4 px-6 border-t border-stone-800">
        <h3 className="font-serif text-xl md:text-2xl tracking-wide uppercase">Siap Menulis Cerita Petualangan Anda?</h3>
        <p className="text-stone-400 text-xs max-w-xl mx-auto leading-relaxed">Konsultasikan kebutuhan rombongan Anda bersama tim admin profesional An nafi. Pelayanan 24/7 prima.</p>
        <div className="pt-2">
          <button
            onClick={onOpenBooking}
            className="bg-amber-500 text-stone-950 font-serif font-bold uppercase tracking-widest px-8 py-3 text-xs transition-colors hover:bg-amber-600"
          >
            Konsultasikan Perjalanan Sekarang
          </button>
        </div>
      </section>
    </div>
  );
}
