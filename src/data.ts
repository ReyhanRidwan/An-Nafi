import { Package, OpenTripSchedule, BentoItem, Testimonial, Fleet } from './types';

export const BENTO_ITEMS: BentoItem[] = [
  {
    id: 1,
    title: "Nusa Penida Cliff & Snorkeling",
    location: "Kelingking Beach, Nusa Penida",
    island: "Bali",
    rating: 4.9,
    image: "/images/bali_focal_1783185247189.jpg",
    sizeClass: "col-span-1 md:col-span-2 row-span-2",
    description: "Tebing ikonik menyerupai T-Rex yang menjulang di atas laut biru toska berpasir putih berkilau."
  },
  {
    id: 2,
    title: "Gili Trawangan Escape",
    location: "Gili Trawangan Island",
    island: "Lombok",
    rating: 4.8,
    image: "/images/lombok_gili_1783185347860.jpg",
    sizeClass: "col-span-1 md:col-span-1 row-span-1",
    description: "Nikmati pulau tenang tanpa kendaraan bermotor, dengan air super bening dan ayunan laut yang estetik."
  },
  {
    id: 3,
    title: "Pink Beach Adventure",
    location: "Pink Beach Lagoon",
    island: "Lombok",
    rating: 4.9,
    image: "/images/lombok_beach_1783185262379.jpg",
    sizeClass: "col-span-1 md:col-span-1 row-span-1",
    description: "Gradasi pasir merah muda unik hasil peleburan koral merah di pesisir pantai tropis yang tenang."
  },
  {
    id: 4,
    title: "Savana Bukit Wairinding",
    location: "Wairinding Hill, Waingapu",
    island: "Sumba",
    rating: 4.9,
    image: "/images/sumba_savannah_1783185278312.jpg",
    sizeClass: "col-span-1 md:col-span-1 row-span-2",
    description: "Hamparan bukit savana hijau bergelombang nan magis di kala matahari terbit dan tenggelam."
  },
  {
    id: 5,
    title: "Matahari Terbenam Uluwatu",
    location: "Uluwatu Cliff & Temple",
    island: "Bali",
    rating: 4.8,
    image: "/images/bali_uluwatu_1783185319938.jpg",
    sizeClass: "col-span-1 md:col-span-2 row-span-1",
    description: "Candi batu kuno berdiri megah di tebing tinggi 70 meter menghadap Samudra Hindia saat sunset."
  },
  {
    id: 6,
    title: "Keajaiban Candi Borobudur",
    location: "Borobudur Temple, Magelang",
    island: "Yogyakarta",
    rating: 4.9,
    image: "/images/jogja_borobudur_1783185333099.jpg",
    sizeClass: "col-span-1 md:col-span-2 row-span-1",
    description: "Candi Buddha terbesar di dunia yang diselimuti kabut pagi dengan latar belakang jajaran gunung berapi."
  },
  {
    id: 7,
    title: "Prambanan Heritage Sunset",
    location: "Prambanan Temple Complex",
    island: "Yogyakarta",
    rating: 4.8,
    image: "/images/jogja_prambanan_1783185291443.jpg",
    sizeClass: "col-span-1 md:col-span-3 row-span-1",
    description: "Candi Hindu menjulang megah menembus langit senja jingga keunguan. Ketuk untuk menjelajahi Yogyakarta!"
  },
  {
    id: 8,
    title: "Weekuri Lagoon Paradise",
    location: "Weekuri Saltwater Lagoon",
    island: "Sumba",
    rating: 5.0,
    image: "/images/sumba_lagoon_1783185303875.jpg",
    sizeClass: "col-span-1 md:col-span-3 row-span-1",
    description: "Danau air asin sebening kaca yang dilingkari tebing karang dan tumbuhan tropis subur. Ketuk untuk menjelajahi Sumba!"
  }
];

export const PACKAGES: Package[] = [
  // BALI PACKAGES
  {
    id: "pkg-bali-1",
    name: "Luxury Ubud & Nusa Penida Escape",
    destination: "Bali",
    type: "Private Trip",
    price: 4850000,
    priceChild: 3395000,
    duration: "4 Hari 3 Malam",
    rating: 4.9,
    reviewsCount: 148,
    image: "/images/bali_focal_1783185247189.jpg",
    highlights: ["Infinity Pool Ubud", "Nusa Penida Kelingking tour", "Sunset Dinner Jimbaran", "Tari Kecak Uluwatu"],
    description: "Petualangan premium yang memadukan keindahan alam mistis pedesaan Ubud dan pesona dramatis tebing-tebing Nusa Penida.",
    itinerary: [
      "Hari 1: Penjemputan di Bandara, Check-in Resor Luxury Ubud, Welcome Dinner",
      "Hari 2: Trekking Sawah Tegallalang, Wisata Air Terjun Kanto Lampo, Tari Kecak Uluwatu",
      "Hari 3: Speedboat ke Nusa Penida, Tour Kelingking Beach, Broken Beach, Snorkeling Manta Bay",
      "Hari 4: SPA treatment premium, berburu oleh-oleh khas Bali, Drop Bandara"
    ]
  },
  {
    id: "pkg-bali-2",
    name: "Exotic East Bali Heritage",
    destination: "Bali",
    type: "Open Trip",
    price: 2450000,
    priceChild: 1715000,
    duration: "3 Hari 2 Malam",
    rating: 4.8,
    reviewsCount: 92,
    image: "/images/bali_uluwatu_1783185319938.jpg",
    highlights: ["Lempuyang Gate of Heaven", "Tirta Gangga Water Palace", "Snorkeling Blue Lagoon", "Pantai Virgin Beach"],
    description: "Gabung bersama grup menjelajahi pesona sejarah Bali Timur, dari gerbang suci Lempuyang hingga keindahan bawah air Karangasem.",
    itinerary: [
      "Hari 1: Penjemputan, Wisata Sejarah Kerta Gosa, Check-in Hotel Candidasa",
      "Hari 2: Sunrise di Gerbang Surga Lempuyang, Istana Air Tirta Gangga, Snorkeling di Blue Lagoon",
      "Hari 3: Belanja Kerajinan Tenganan Pegringsingan, Sunset Pantai Virgin, Pengantaran ke Bandara"
    ]
  },

  // JOGJA PACKAGES
  {
    id: "pkg-jogja-1",
    name: "Yogyakarta Royal Cultural Journey",
    destination: "Yogyakarta",
    type: "Private Trip",
    price: 3650000,
    priceChild: 2555000,
    duration: "3 Hari 2 Malam",
    rating: 4.9,
    reviewsCount: 110,
    image: "/images/jogja_borobudur_1783185333099.jpg",
    highlights: ["Sunrise Candi Borobudur", "Lava Tour Merapi VIP", "Keraton & Tamansari", "Dinner di Ndalem Katongan"],
    description: "Paket budaya eksklusif menguak kekayaan sejarah kesultanan Jogja dan kemegahan Candi Borobudur di kala matahari terbit.",
    itinerary: [
      "Hari 1: Penjemputan Stasiun/Bandara, Keliling Kraton Jogja, Taman Sari Water Castle, Dinner Tradisional",
      "Hari 2: Berburu Sunrise Borobudur, Petualangan Jeep Lava Tour Merapi VIP, Candi Prambanan Sunset",
      "Hari 3: Belanja Batik Kotagede, Kuliner Legendaris Gudeg, Transfer Out"
    ]
  },
  {
    id: "pkg-jogja-2",
    name: "Yogyakarta Scenic Nature Adventures",
    destination: "Yogyakarta",
    type: "Open Trip",
    price: 1850000,
    priceChild: 1295000,
    duration: "3 Hari 2 Malam",
    rating: 4.7,
    reviewsCount: 74,
    image: "/images/jogja_prambanan_1783185291443.jpg",
    highlights: ["Gua Jomblang Cahaya Surga", "Pantai pasir putih Gunungkidul", "Pinus Pengger", "Sunset Bukit Paralayang"],
    description: "Rasakan serunya menjelajahi alam Yogyakarta yang menakjubkan, dari tur vertikal Gua Jomblang hingga keindahan pantai selatan.",
    itinerary: [
      "Hari 1: Penjemputan, Wisata Hutan Pinus Pengger, Sunset Bukit Bintang",
      "Hari 2: Tur Gua Jomblang (melihat cahaya surga), Pantai Drini Gunungkidul, Candi Ijo Sunset",
      "Hari 3: Kuliner Bakpia, Belanja Malioboro, Transfer Out"
    ]
  },

  // LOMBOK PACKAGES
  {
    id: "pkg-lombok-1",
    name: "Lombok Gili Islands & Pink Beach Paradise",
    destination: "Lombok",
    type: "Private Trip",
    price: 4250000,
    priceChild: 2975000,
    duration: "4 Hari 3 Malam",
    rating: 4.9,
    reviewsCount: 125,
    image: "/images/lombok_gili_1783185347860.jpg",
    highlights: ["Snorkeling 3 Gili", "Wisata Pasir Merah Muda", "Desa Adat Sasak Sade", "Sunset Bukit Merese"],
    description: "Jelajahi pulau tropis impian di Lombok. Snorkeling di tengah kura-kura Gili Trawangan dan bersantai di keindahan Pink Beach.",
    itinerary: [
      "Hari 1: Penjemputan di Bandara Lombok Praya, Wisata Budaya Desa Adat Sade, Sunset Bukit Merese",
      "Hari 2: Private Glass Bottom Boat Snorkeling di Gili Air, Meno, dan Trawangan. Sunset Dinner di Gili T",
      "Hari 3: Perjalanan ke Pink Beach, Snorkeling Pulau Pasir, Kuliner Seafood Segar",
      "Hari 4: Belanja Mutiara Lombok, Drop Bandara"
    ]
  },
  {
    id: "pkg-lombok-2",
    name: "Lombok Rinjani Sembalun Escapade",
    destination: "Lombok",
    type: "Open Trip",
    price: 2650000,
    priceChild: 1855000,
    duration: "3 Hari 2 Malam",
    rating: 4.8,
    reviewsCount: 68,
    image: "/images/lombok_beach_1783185262379.jpg",
    highlights: ["Lembah Sembalun Rinjani", "Air Terjun Sendang Gile", "Kebun Stroberi", "Bukit Selong"],
    description: "Gabung open trip menyusuri lereng Gunung Rinjani yang sejuk di Sembalun dengan pemandangan bukit-bukit hijau yang asri.",
    itinerary: [
      "Hari 1: Penjemputan, Perjalanan ke Sembalun, Check-in Glamour Camp",
      "Hari 2: Sunrise Bukit Selong, Petik Stroberi segar, Air Terjun Sendang Gile & Tiu Kelep",
      "Hari 3: Wisata Kuliner Ayam Taliwang, Drop Bandara Lombok"
    ]
  },

  // SUMBA PACKAGES
  {
    id: "pkg-sumba-1",
    name: "Sumba Exotic Wild Savannah & Lagoons",
    destination: "Sumba",
    type: "Private Trip",
    price: 5950000,
    priceChild: 4165000,
    duration: "5 Hari 4 Malam",
    rating: 5.0,
    reviewsCount: 88,
    image: "/images/sumba_savannah_1783185278312.jpg",
    highlights: ["Danau Weekuri", "Bukit Wairinding Sunset", "Desa Adat Ratenggaro", "Air Terjun Lapopu"],
    description: "Paket petualangan paling eksotis menembus zaman purba di Pulau Sumba. Menyaksikan savana magis, desa megalitikum, dan danau sebening kaca.",
    itinerary: [
      "Hari 1: Tiba di Bandara Tambolaka, Berenang di Danau Weekuri yang bening, Sunset Pantai Mandorak",
      "Hari 2: Mengunjungi Desa Adat Ratenggaro, Berenang di Air Terjun Lapopu yang asri, Check-in Resor Sumba Timur",
      "Hari 3: Trekking Bukit Tenau Sunrise, Kampung Adat Prailiu, Sunset Bukit Wairinding",
      "Hari 4: Menjelajahi Air Terjun Tanggedu (Grand Canyon Sumba), Sunset Pantai Walakiri dengan Pohon Menari",
      "Hari 5: Belanja Tenun Ikat Sumba, Drop Bandara Waingapu"
    ]
  },
  {
    id: "pkg-sumba-2",
    name: "Sumba Cultural Heritage Highlight",
    destination: "Sumba",
    type: "Open Trip",
    price: 3850000,
    priceChild: 2695000,
    duration: "4 Hari 3 Malam",
    rating: 4.8,
    reviewsCount: 54,
    image: "/images/sumba_lagoon_1783185303875.jpg",
    highlights: ["Desa Adat Prai Ijing", "Bukit Wairinding", "Pantai Walakiri", "Danau Weekuri"],
    description: "Eksplorasi Sumba bersama rombongan seru untuk mengabadikan momen-momen magis savana dan tradisi megalitikum Sumba.",
    itinerary: [
      "Hari 1: Tiba Tambolaka, Wisata Danau Weekuri & Pantai Mandorak, Hotel",
      "Hari 2: Desa Adat Prai Ijing, Air Terjun Lapopu, Sunset Bukit Wairinding",
      "Hari 3: Savana Puru Kambera, Pantai Walakiri Sunset (Pohon Bakau Menari)",
      "Hari 4: Belanja Souvenir Khas Sumba, Transfer Out Waingapu"
    ]
  },
  // ZIARAH PACKAGE
  {
    id: "pkg-ziarah-1",
    name: "Paket Ziarah Wali Songo 5 Hari 4 Malam",
    destination: "Ziarah",
    type: "Private Trip",
    price: 3250000,
    priceChild: 2275000,
    duration: "5 Hari 4 Malam",
    rating: 4.9,
    reviewsCount: 120,
    image: "https://res.cloudinary.com/di6ziqvtp/image/upload/v1783324075/c9f7e482-f47a-4f32-9506-273eea62da3c.png",
    highlights: ["Makam Wali Songo", "Masjid Demak", "Ziarah Sunan Ampel", "Bus AC Premium"],
    description: "Perjalanan spiritual ziarah ke makam Wali Songo yang khusyuk dan tertata rapi, menggunakan bus premium dan akomodasi hotel pilihan dekat komplek makam.",
    itinerary: [
      "Hari 1: Penjemputan di Surabaya, Ziarah Makam Sunan Ampel & Sunan Giri, Check-in Hotel",
      "Hari 2: Perjalanan ke Gresik & Lamongan, Ziarah Makam Sunan Maulana Malik Ibrahim & Sunan Drajat",
      "Hari 3: Menuju Tuban & Kudus, Ziarah Makam Sunan Bonang, Sunan Kudus, & Sunan Muria",
      "Hari 4: Perjalanan ke Demak & Cirebon, Ziarah Masjid Agung Demak, Makam Sunan Kalijaga & Sunan Gunung Jati",
      "Hari 5: Belanja oleh-oleh Cirebon, pengantaran kembali ke Bandara / Stasiun"
    ]
  },
  // STUDY TOUR PACKAGE
  {
    id: "pkg-studytour-1",
    name: "Paket Study Tour Edukasi & Budaya",
    destination: "Study Tour",
    type: "Open Trip",
    price: 1500000,
    priceChild: 1150000,
    duration: "3 Hari 2 Malam",
    rating: 4.8,
    reviewsCount: 85,
    image: "/images/study_tour_1783324218628.jpg",
    highlights: ["Kunjungan Museum", "Workshop Membatik", "Sains & Budaya", "Bus Pariwisata Full AC"],
    description: "Program pembelajaran interaktif luar sekolah yang edukatif, memadukan kunjungan museum bersejarah, praktikum budaya, dan eksplorasi sains terapan.",
    itinerary: [
      "Hari 1: Penjemputan Rombongan di Sekolah, Perjalanan ke Destinasi Edukasi, Kunjungan Museum & Pusat Sains",
      "Hari 2: Workshop Membatik Tradisional, Kunjungan Sentra Kerajinan Lokal, Makan Malam Bersama & Pentas Seni",
      "Hari 3: Evaluasi Hasil Study Tour, Pembagian Souvenir, Perjalanan Kembali ke Sekolah"
    ]
  }
];

export const OPEN_TRIP_SCHEDULES: OpenTripSchedule[] = [
  {
    id: "sched-1",
    packageId: "pkg-bali-2",
    packageName: "Exotic East Bali Heritage",
    destination: "Bali",
    date: "2026-07-10",
    quotaMax: 15,
    quotaFilled: 12,
    pricePerPerson: 2450000,
    status: "Tersedia"
  },
  {
    id: "sched-2",
    packageId: "pkg-bali-2",
    packageName: "Exotic East Bali Heritage",
    destination: "Bali",
    date: "2026-07-20",
    quotaMax: 15,
    quotaFilled: 14,
    pricePerPerson: 2450000,
    status: "Hampir Penuh"
  },
  {
    id: "sched-3",
    packageId: "pkg-jogja-2",
    packageName: "Yogyakarta Scenic Nature Adventures",
    destination: "Yogyakarta",
    date: "2026-07-15",
    quotaMax: 20,
    quotaFilled: 19,
    pricePerPerson: 1850000,
    status: "Hampir Penuh"
  },
  {
    id: "sched-4",
    packageId: "pkg-jogja-2",
    packageName: "Yogyakarta Scenic Nature Adventures",
    destination: "Yogyakarta",
    date: "2026-07-28",
    quotaMax: 20,
    quotaFilled: 8,
    pricePerPerson: 1850000,
    status: "Tersedia"
  },
  {
    id: "sched-5",
    packageId: "pkg-lombok-2",
    packageName: "Lombok Rinjani Sembalun Escapade",
    destination: "Lombok",
    date: "2026-07-12",
    quotaMax: 12,
    quotaFilled: 12,
    pricePerPerson: 2650000,
    status: "Full"
  },
  {
    id: "sched-6",
    packageId: "pkg-lombok-2",
    packageName: "Lombok Rinjani Sembalun Escapade",
    destination: "Lombok",
    date: "2026-07-24",
    quotaMax: 12,
    quotaFilled: 9,
    pricePerPerson: 2650000,
    status: "Tersedia"
  },
  {
    id: "sched-7",
    packageId: "pkg-sumba-2",
    packageName: "Sumba Cultural Heritage Highlight",
    destination: "Sumba",
    date: "2026-07-17",
    quotaMax: 10,
    quotaFilled: 6,
    pricePerPerson: 3850000,
    status: "Tersedia"
  },
  {
    id: "sched-8",
    packageId: "pkg-sumba-2",
    packageName: "Sumba Cultural Heritage Highlight",
    destination: "Sumba",
    date: "2026-07-31",
    quotaMax: 10,
    quotaFilled: 10,
    pricePerPerson: 3850000,
    status: "Full"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Budi Setiawan",
    location: "Jakarta, Indonesia",
    rating: 5,
    text: "Luar biasa pelayanan An nafi! Kami memilih paket Private Trip Sumba, dari penjemputan bandara hingga resor semua bintang lima. Pemandu lokalnya berwawasan luas dan fotografernya sangat jago mengambil sudut savana Wairinding.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
    tripType: "Private Trip Sumba"
  },
  {
    id: "test-2",
    name: "Siti Rahma",
    location: "Bandung, Indonesia",
    rating: 5,
    text: "Sangat puas dengan Open Trip Bali Timur. Harganya sangat rasional untuk fasilitas sekelas ini. Meskipun gabung dengan rombongan lain, pengaturannya sangat rapi dan kami mendapatkan banyak teman baru yang seru selama snorkeling.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    tripType: "Open Trip Bali"
  },
  {
    id: "test-3",
    name: "Marcus Lau",
    location: "Singapura",
    rating: 4.9,
    text: "Highly recommended travel agency! I booked a 3D2N Royal Jogja trip for my parents. They loved the Borobudur sunrise tour and the VIP Merapi Jeep. Excellent communication and precise execution by An nafi team.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    tripType: "Private Trip Yogyakarta"
  }
];

export const FLEETS: Fleet[] = [
  {
    id: "flt-1",
    name: "Toyota Alphard Transformer",
    type: "Premium MPV",
    capacity: 5,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=500&q=80",
    pricePerDay: 2500000
  },
  {
    id: "flt-2",
    name: "Toyota Hiace Commuter Luxury",
    type: "Premium Van",
    capacity: 11,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=500&q=80",
    pricePerDay: 1800000
  },
  {
    id: "flt-3",
    name: "Toyota Innova Zenix Hybrid",
    type: "Comfort MPV",
    capacity: 6,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=500&q=80",
    pricePerDay: 1100000
  }
];
