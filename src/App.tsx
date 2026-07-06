import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import PackagesPage from './components/PackagesPage';
import WhyPage from './components/WhyPage';
import GalleryPage from './components/GalleryPage';
import OpenTripPage from './components/OpenTripPage';
import PrivateTripPage from './components/PrivateTripPage';
import BookingWizard from './components/BookingWizard';
import { Compass, Mail, Phone, MapPin, Instagram, Globe, Facebook, Star, Calendar } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  
  // Wizard initial values
  const [wizardTripType, setWizardTripType] = useState<'Open Trip' | 'Private Trip'>('Open Trip');
  const [wizardDest, setWizardDest] = useState<'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba' | 'Ziarah' | 'Study Tour'>('Bali');
  const [wizardPkgId, setWizardPkgId] = useState<string>('');
  const [wizardDate, setWizardDate] = useState<string>('');
  const [wizardNotes, setWizardNotes] = useState<string>('');

  // Tab changer
  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
  };

  // Open general booking
  const handleOpenGeneralBooking = () => {
    setWizardTripType('Open Trip');
    setWizardDest('Bali');
    setWizardPkgId('');
    setWizardDate('');
    setWizardNotes('');
    setBookingOpen(true);
  };

  // Open booking with specific package params
  const handleOpenBookingWithPackage = (
    tripType: 'Open Trip' | 'Private Trip',
    destination: 'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba' | 'Ziarah' | 'Study Tour',
    packageId: string
  ) => {
    setWizardTripType(tripType);
    setWizardDest(destination);
    setWizardPkgId(packageId);
    setWizardDate('');
    setWizardNotes('');
    setBookingOpen(true);
  };

  // Open booking with open-trip schedule date
  const handleOpenBookingWithSchedule = (
    destination: 'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba' | 'Ziarah' | 'Study Tour',
    packageId: string,
    date: string
  ) => {
    setWizardTripType('Open Trip');
    setWizardDest(destination);
    setWizardPkgId(packageId);
    setWizardDate(date);
    setWizardNotes('');
    setBookingOpen(true);
  };

  // Open booking with customized private-trip notes
  const handleOpenBookingWithNotes = (
    destination: 'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba' | 'Ziarah' | 'Study Tour',
    customNotes: string
  ) => {
    setWizardTripType('Private Trip');
    setWizardDest(destination);
    setWizardPkgId('');
    setWizardDate('');
    setWizardNotes(customNotes);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col justify-between">
      {/* Dynamic Transparency Navigation Header */}
      <Navbar currentTab={currentTab} onTabChange={handleTabChange} />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage 
            onTabChange={handleTabChange}
            onOpenBooking={handleOpenGeneralBooking}
            onOpenBookingWithParams={handleOpenBookingWithPackage}
          />
        )}
        {currentTab === 'about' && (
          <AboutPage onOpenBooking={handleOpenGeneralBooking} />
        )}
        {currentTab === 'packages' && (
          <PackagesPage onOpenBookingWithPackage={handleOpenBookingWithPackage} />
        )}
        {currentTab === 'why' && (
          <WhyPage onOpenBooking={handleOpenGeneralBooking} />
        )}
        {currentTab === 'galery' && (
          <GalleryPage />
        )}
        {currentTab === 'open-trip' && (
          <OpenTripPage onOpenBookingWithSchedule={handleOpenBookingWithSchedule} />
        )}
        {currentTab === 'private-trip' && (
          <PrivateTripPage onOpenBookingWithNotes={handleOpenBookingWithNotes} />
        )}
      </main>

      {/* Premium Footer - Deep Dark Accent */}
      <footer id="main-premium-footer" className="bg-stone-950 text-stone-300 pt-16 pb-8 border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-stone-900 pb-12">
          {/* Column 1: Brand & Desc */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://res.cloudinary.com/di6ziqvtp/image/upload/v1783322977/1563e4c7-4c01-40ec-ac41-a1a6a7772691.png"
                alt="An nafi Logo"
                className="h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-serif font-bold text-white tracking-wider leading-none uppercase">An nafi</h4>
                <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">Premium Tour & Travel</p>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-sans font-light">
              Pionir agen perjalanan wisata multi-destinasi di Indonesia yang terbukti amanah dan berpengalaman. Menyediakan petualangan eksklusif di Bali, Yogyakarta, Lombok, Sumba, serta Paket Ziarah dan Study Tour.
            </p>
            <div className="flex gap-2 pt-2">
              <a href="#" className="p-2 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-amber-500 transition-colors border border-stone-850">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-amber-500 transition-colors border border-stone-850">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-amber-500 transition-colors border border-stone-850">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Destinasi Wisata */}
          <div className="space-y-4">
            <h4 className="font-serif text-white text-sm font-bold tracking-wider uppercase">Destinasi Utama</h4>
            <ul className="space-y-2 text-xs text-stone-400 list-none pl-0">
              <li className="flex gap-2 items-center hover:text-amber-500 transition-colors cursor-pointer" onClick={() => { handleTabChange('packages'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <span className="text-amber-500">•</span> Pulau Dewata Bali
              </li>
              <li className="flex gap-2 items-center hover:text-amber-500 transition-colors cursor-pointer" onClick={() => { handleTabChange('packages'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <span className="text-amber-500">•</span> Pusat Budaya Yogyakarta
              </li>
              <li className="flex gap-2 items-center hover:text-amber-500 transition-colors cursor-pointer" onClick={() => { handleTabChange('packages'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <span className="text-amber-500">•</span> Surga Tropis Lombok
              </li>
              <li className="flex gap-2 items-center hover:text-amber-500 transition-colors cursor-pointer" onClick={() => { handleTabChange('packages'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <span className="text-amber-500">•</span> Savana Eksotis Sumba
              </li>
              <li className="flex gap-2 items-center hover:text-amber-500 transition-colors cursor-pointer" onClick={() => { handleTabChange('packages'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <span className="text-amber-500">•</span> Paket Ziarah Wali Songo
              </li>
              <li className="flex gap-2 items-center hover:text-amber-500 transition-colors cursor-pointer" onClick={() => { handleTabChange('packages'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <span className="text-amber-500">•</span> Paket Study Tour Edukasi
              </li>
            </ul>
          </div>

          {/* Column 3: Navigasi Cepat */}
          <div className="space-y-4">
            <h4 className="font-serif text-white text-sm font-bold tracking-wider uppercase">Menu Navigasi</h4>
            <ul className="space-y-2 text-xs text-stone-400 list-none pl-0">
              {['home', 'about', 'packages', 'why', 'galery', 'open-trip', 'private-trip'].map((menu) => (
                <li 
                  key={menu} 
                  onClick={() => { handleTabChange(menu); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-500 transition-colors cursor-pointer capitalize"
                >
                  {menu === 'galery' ? 'Gallery' : menu.replace('-', ' ')}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Hubungi Kami */}
          <div className="space-y-4">
            <h4 className="font-serif text-white text-sm font-bold tracking-wider uppercase">Hubungi Kantor Pusat</h4>
            <ul className="space-y-3 text-xs text-stone-400 list-none pl-0">
              <li className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Jl. Raya Kuta No. 88X, Kuta, Kabupaten Badung, Bali 80361, Indonesia</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+62 851-5507-0024</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>info@annafitravel.com</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Setiap Hari (08:00 - 22:00 WITA)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 5: Copyright */}
        <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-4">
          <p>© 2026 PT An Nafi Tour & Travel. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-stone-300">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-stone-300">Kebijakan Privasi</a>
          </div>
        </div>
      </footer>

      {/* Stateful 8-Step Booking Wizard Modal */}
      <BookingWizard 
        isOpen={bookingOpen} 
        onClose={() => setBookingOpen(false)}
        initialTripType={wizardTripType}
        initialDestination={wizardDest}
        initialPackageId={wizardPkgId}
        initialScheduleDate={wizardDate}
        customItineraryNotes={wizardNotes}
      />
    </div>
  );
}
