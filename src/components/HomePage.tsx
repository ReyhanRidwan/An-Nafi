import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Star, ArrowRight, ShieldCheck, Clock, MapPin, Users, Heart, Camera, ChevronDown } from 'lucide-react';
import { BENTO_ITEMS, PACKAGES, OPEN_TRIP_SCHEDULES } from '../data';

interface HomePageProps {
  onTabChange: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenBookingWithParams: (tripType: 'Open Trip' | 'Private Trip', destination: 'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba' | 'Ziarah' | 'Study Tour', packageId: string) => void;
}

export default function HomePage({ onTabChange, onOpenBooking, onOpenBookingWithParams }: HomePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredPackages = React.useMemo(() => {
    const list = [];
    const dests = ['Bali', 'Yogyakarta', 'Lombok', 'Sumba', 'Ziarah', 'Study Tour'];
    dests.forEach(dest => {
      const found = PACKAGES.find(p => p.destination === dest);
      if (found) list.push(found);
    });
    return list;
  }, []);

  const slides = [
    {
      image: "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783323538/52232f7d-759e-40de-a9ce-a8aa0fcde84d.png",
      title: "BALI",
      tagline: "Keheningan Ubud & Pesona Tebing Nusa Penida",
      desc: "Menyusuri pura samudera tinggi, bersantai di villa sawah asri, hingga petualangan tebing eksotis."
    },
    {
      image: "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783260527/df4b701d-7590-4c0b-825a-9a947c63330c.png",
      title: "YOGYAKARTA",
      tagline: "Karya Agung Candi Buddha & Warisan Keraton",
      desc: "Melihat sunrise Borobudur berselimut kabut pagi, menyusuri Kraton, dan petualangan Jeep Merapi."
    },
    {
      image: "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783325990/07be36ab-1958-4953-9542-37d30212f527.png",
      title: "LOMBOK",
      tagline: "Kejernihan Gili Islands & Pesisir Pasir Pink",
      desc: "Berenang bersama penyu laut di Gili Trawangan, mendaki Sembalun, dan keunikan Pink Beach."
    },
    {
      image: "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783323579/14dd2e5b-db1b-45d4-80fb-85d7d1775637.png",
      title: "SUMBA",
      tagline: "Eksotisme Savana Liar & Tradisi Megalitikum",
      desc: "Menyaksikan hamparan bukit bergelombang Wairinding dan keajaiban danau air asin Weekuri."
    }
  ];

  // Slideshow rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleTabChangeWithScroll = (tabId: string) => {
    onTabChange(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-stone-50 text-stone-900 overflow-hidden">
      
      {/* 2. HERO SECTION WITH CURVED BOTTOM MASK */}
      <section 
        id="hero-section"
        className="relative min-h-[100vh] lg:min-h-[105vh] flex items-center justify-center overflow-hidden bg-stone-950 text-white"
      >
        {/* Slideshow background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <img 
                src={slides[currentSlide].image} 
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover brightness-[0.35]" 
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center space-y-6 pt-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <span className="text-[11px] font-bold tracking-[0.3em] text-amber-500 uppercase">
              BALI • YOGYAKARTA • LOMBOK • SUMBA
            </span>
            <div className="w-12 h-[2px] bg-amber-500 mx-auto mt-2"></div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-serif text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white uppercase leading-none"
          >
            {slides[currentSlide].title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl mx-auto space-y-4"
          >
            <p className="font-serif text-sm sm:text-lg lg:text-xl text-amber-100 font-medium tracking-wide">
              {slides[currentSlide].tagline}
            </p>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed font-sans">
              {slides[currentSlide].desc}
            </p>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="pt-4 flex flex-col sm:flex-row justify-center gap-3"
          >
            <button
              onClick={() => handleTabChangeWithScroll('packages')}
              className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-serif font-bold px-8 py-3.5 transition-all text-xs tracking-widest uppercase border border-amber-500"
            >
              JELAJAHI PAKET WISATA
            </button>
            <button
              onClick={onOpenBooking}
              className="bg-white/10 hover:bg-white/20 text-white font-serif font-bold px-8 py-3.5 transition-all text-xs tracking-widest uppercase border border-white/30 backdrop-blur-sm"
            >
              PESAN SEKARANG
            </button>
          </motion.div>
          
          <div className="pt-8 animate-bounce flex justify-center">
            <ChevronDown className="w-6 h-6 text-stone-400" />
          </div>
        </div>
      </section>

      {/* 3. BENTO GRID MULTI-DESTINASI WISATA */}
      <section id="bento-grid-section" className="py-12 bg-stone-50 max-w-7xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Koleksi Terkurasi</span>
          <h2 className="font-serif text-2xl md:text-4xl tracking-wide text-stone-900">KEINDAHAN 4 DESTINASI UTAMA</h2>
        </div>

        {/* Bento Grid layout with extremely tight gaps and rounded-3xl corners as requested */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {BENTO_ITEMS.map((item) => {
            const isBannerYogya = item.id === 7;
            const isBannerSumba = item.id === 8;

            return (
              <div
                key={item.id}
                className={`${item.sizeClass} group relative bg-stone-150 overflow-hidden rounded-3xl border border-stone-200/40 min-h-[220px] shadow-sm`}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.7] group-hover:brightness-[0.6]"
                  referrerPolicy="no-referrer"
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 text-white space-y-1.5">
                  <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                        {item.location} • {item.island}
                      </span>
                      <h3 className="font-serif text-base md:text-lg lg:text-xl font-bold tracking-wide leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    
                    {!isBannerYogya && !isBannerSumba && (
                      <div className="flex items-center gap-0.5 text-xs text-amber-400 bg-black/40 px-2 py-0.5 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 shrink-0" />
                        <span>{item.rating}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-stone-200 line-clamp-2 leading-relaxed font-sans font-light">
                    {item.description}
                  </p>

                  {/* Banner specific CTAs */}
                  {(isBannerYogya || isBannerSumba) && (
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          const destFilter = isBannerYogya ? 'Yogyakarta' : 'Sumba';
                          onTabChange('packages');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-amber-500 hover:bg-amber-600 text-stone-950 text-[10px] font-serif font-bold tracking-widest px-4 py-2 uppercase shadow-md transition-colors inline-flex items-center gap-1 rounded-md"
                      >
                        Lihat Paket {isBannerYogya ? 'Jogja' : 'Sumba'} <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Ambient glow top */}
                <div className="absolute inset-t-0 bg-gradient-to-b from-black/50 to-transparent h-1/3"></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION HIGHLIGHT 1: ABOUT US */}
      <section className="py-16 bg-stone-100 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Sejak Tahun 2012</span>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-wide text-stone-900 uppercase">Kredibilitas Nurrbalitravel</h2>
            <div className="w-12 h-1 bg-amber-500"></div>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed pt-2">
              Berasal dari keindahan pulau Dewata Bali, dedikasi kami selama lebih dari satu dekade kini berkembang melayani perjalanan berkelas di Yogyakarta, Lombok, hingga bentang alam magis Sumba. Kami melayani dengan penuh ketulusan, transparansi harga penuh, serta jaminan keselamatan terbaik bagi rombongan Anda.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleTabChangeWithScroll('about')}
                className="bg-stone-900 hover:bg-stone-850 text-white text-[10px] font-serif font-bold tracking-widest px-6 py-2.5 uppercase transition-colors inline-flex items-center gap-1.5"
              >
                Kisah & Visi Kami <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 border border-stone-200/80 text-center space-y-1">
              <div className="font-serif text-3xl font-bold text-amber-500">14+</div>
              <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">Tahun Melayani</p>
            </div>
            <div className="bg-white p-6 border border-stone-200/80 text-center space-y-1">
              <div className="font-serif text-3xl font-bold text-amber-500">25K+</div>
              <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">Tamu Bahagia</p>
            </div>
            <div className="bg-white p-6 border border-stone-200/80 text-center space-y-1">
              <div className="font-serif text-3xl font-bold text-amber-500">4.9</div>
              <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">Google Rating</p>
            </div>
            <div className="bg-white p-6 border border-stone-200/80 text-center space-y-1">
              <div className="font-serif text-3xl font-bold text-amber-500">100%</div>
              <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">Amanah & Legal</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION HIGHLIGHT 2: PACKAGES */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Paket Paling Populer</span>
              <h2 className="font-serif text-2xl md:text-3xl tracking-wide text-stone-900 uppercase">Katalog Paket Unggulan</h2>
              <div className="w-12 h-1 bg-amber-500"></div>
            </div>
            <button
              onClick={() => handleTabChangeWithScroll('packages')}
              className="text-xs font-bold text-amber-500 hover:text-amber-600 flex items-center gap-1 uppercase tracking-wider shrink-0"
            >
              Lihat Semua Paket ({PACKAGES.length}) <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
                <div className="h-48 overflow-hidden bg-stone-100 relative shrink-0">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <span className="absolute top-3 left-3 bg-stone-900 text-white text-[9px] font-bold tracking-widest px-2 py-0.5 uppercase">
                    {pkg.destination}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-stone-900 text-sm leading-snug line-clamp-1">{pkg.name}</h3>
                    <p className="text-xs text-stone-500 line-clamp-2">{pkg.description}</p>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-stone-100">
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider">{pkg.duration}</span>
                    <span className="font-serif font-bold text-amber-500 text-sm">Rp {new Intl.NumberFormat('id-ID').format(pkg.price)}<span className="text-[10px] font-sans font-normal text-stone-400">/pax</span></span>
                  </div>
                  <button
                    onClick={() => onOpenBookingWithParams(pkg.type, pkg.destination, pkg.id)}
                    className="w-full bg-stone-900 text-white font-serif text-[10px] py-2 transition-colors hover:bg-stone-850 uppercase tracking-widest font-bold"
                  >
                    Booking Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION HIGHLIGHT 3: WHY US */}
      <section className="py-16 bg-stone-900 text-white border-y border-stone-850">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-amber-500 tracking-widest uppercase block">Kualitas Tanpa Kompromi</span>
            <h2 className="font-serif text-2xl md:text-4xl tracking-wide leading-tight">KOMITMEN KESELAMATAN & PERLINDUNGAN</h2>
            <div className="w-12 h-0.5 bg-amber-500"></div>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Kami bekerja sama dengan institusi penjaminan asuransi jiwa nasional resmi untuk mengcover asuransi perjalanan Anda. Setiap sopir kami dilatih khusus ramah rute berat, dan dibekali perlengkapan rescue darurat harian terlengkap.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleTabChangeWithScroll('why')}
                className="bg-amber-500 hover:bg-amber-600 text-stone-950 text-[10px] font-serif font-bold tracking-widest px-6 py-2.5 uppercase transition-colors inline-flex items-center gap-1.5"
              >
                Pelajari Standar Asuransi <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="space-y-4 bg-stone-850/50 p-6 border border-stone-800">
            <h3 className="font-serif text-amber-400 text-sm tracking-widest uppercase">KEAMANAN UTAMA</h3>
            <ul className="space-y-3 text-xs text-stone-300 list-none pl-0">
              <li className="flex gap-2.5 items-start">
                <span className="text-amber-500 font-bold shrink-0">•</span>
                <span>Asuransi jiwa komprehensif Jasa Raharja untuk setiap rute terdaftar.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-amber-500 font-bold shrink-0">•</span>
                <span>Armada mobil VIP AC dibersihkan harian sebelum digunakan menjemput tamu.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-amber-500 font-bold shrink-0">•</span>
                <span>Pemandu lokal bersertifikat memiliki relasi erat adat di masing-masing desa.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION HIGHLIGHT 4: GALLERY */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Lensa Perjalanan</span>
              <h2 className="font-serif text-2xl md:text-3xl tracking-wide text-stone-900 uppercase">Potret Kebahagiaan Tamu</h2>
              <div className="w-12 h-1 bg-amber-500"></div>
            </div>
            <button
              onClick={() => handleTabChangeWithScroll('galery')}
              className="text-xs font-bold text-amber-500 hover:text-amber-600 flex items-center gap-1 uppercase tracking-wider shrink-0"
            >
              Jelajahi Galeri Foto <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783323538/52232f7d-759e-40de-a9ce-a8aa0fcde84d.png",
              "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783259686/52e43830-db53-4994-bcdc-5f89d5ab2d81.png",
              "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783260527/df4b701d-7590-4c0b-825a-9a947c63330c.png",
              "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783239412/46590175-6096-4c5d-946c-9102764f4780.png",
              "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783325990/07be36ab-1958-4953-9542-37d30212f527.png",
              "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783239446/a455d443-e832-40a7-99a1-2caf09c73875.png",
              "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783323579/14dd2e5b-db1b-45d4-80fb-85d7d1775637.png",
              "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783259886/ff111fc5-420e-4677-8c71-19437f814b2a.png"
            ].map((img, i) => (
              <div key={i} className="aspect-[4/3] bg-stone-100 overflow-hidden border border-stone-200">
                <img src={img} alt="Tamu kami" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION HIGHLIGHT 5: OPEN TRIP */}
      <section className="py-16 bg-stone-100 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Mulai Pertemanan Baru</span>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-wide text-stone-900 uppercase">Jadwal Keberangkatan Terbuka</h2>
            <div className="w-12 h-1 bg-amber-500"></div>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed pt-2">
              Bagi Anda solo traveler atau berdua yang menginginkan efisiensi biaya, gabunglah bersama Open Trip rombongan kami. Semua tanggal dijamin pasti berangkat dengan koordinasi pemandu lokal ramah.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleTabChangeWithScroll('open-trip')}
                className="bg-stone-900 hover:bg-stone-850 text-white text-[10px] font-serif font-bold tracking-widest px-6 py-2.5 uppercase transition-colors inline-flex items-center gap-1.5"
              >
                Lihat Jadwal Open Trip <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="bg-white border border-stone-200 p-5 space-y-4">
            <h3 className="font-serif font-bold text-stone-900 text-xs uppercase tracking-widest">Sisa Quota Terdekat (Juli 2026)</h3>
            <div className="space-y-3">
              {OPEN_TRIP_SCHEDULES.slice(0, 2).map((sched) => (
                <div key={sched.id} className="text-xs border-b border-stone-100 pb-3 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-serif font-bold text-stone-850">{sched.packageName}</span>
                    <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 font-bold uppercase">{sched.status}</span>
                  </div>
                  <p className="text-[10px] text-stone-400 mb-1">Berangkat: Juli {sched.date.split('-')[2]}, 2026</p>
                  <div className="w-full bg-stone-100 h-1.5">
                    <div className="bg-amber-500 h-full" style={{ width: `${(sched.quotaFilled / sched.quotaMax) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION HIGHLIGHT 6: PRIVATE TRIP */}
      <section className="py-16 bg-stone-900 text-white border-t border-stone-850 text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-4 px-6">
          <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">Grup Mandiri / Keluarga</span>
          <h2 className="font-serif text-2xl md:text-4xl tracking-wide uppercase">Konsultasi Rencana Perjalanan Mandiri</h2>
          <div className="w-12 h-0.5 bg-amber-500 mx-auto"></div>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Inginkan keintiman privasi liburan penuh? Gunakan layanan kustom kami untuk mengorganisir ulang akomodasi, restoran halal, dan ketersediaan kursi balita. Admin profesional kami melayani secara cepat via WhatsApp.
          </p>
          <div className="pt-2">
            <button
              onClick={() => handleTabChangeWithScroll('private-trip')}
              className="bg-amber-500 hover:bg-amber-600 text-stone-950 text-[10px] font-serif font-bold tracking-widest px-8 py-3 uppercase transition-colors inline-flex items-center gap-1.5"
            >
              Kustom Private Trip Sekarang <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
