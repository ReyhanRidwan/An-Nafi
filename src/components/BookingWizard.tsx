import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Compass, Calendar, Users, CheckCircle, Plus, Minus, 
  User, Phone, Mail, FileText, CreditCard, ArrowLeft, ArrowRight, 
  Info, Star, Percent, Landmark
} from 'lucide-react';
import { Package, OpenTripSchedule } from '../types';
import { PACKAGES, OPEN_TRIP_SCHEDULES } from '../data';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  initialTripType?: 'Open Trip' | 'Private Trip';
  initialDestination?: 'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba' | 'Ziarah' | 'Study Tour';
  initialPackageId?: string;
  initialScheduleDate?: string;
  customItineraryNotes?: string;
}

export default function BookingWizard({
  isOpen,
  onClose,
  initialTripType = 'Open Trip',
  initialDestination = 'Bali',
  initialPackageId = '',
  initialScheduleDate = '',
  customItineraryNotes = ''
}: BookingWizardProps) {
  // Wizard State
  const [step, setStep] = useState(1);
  const [tripType, setTripType] = useState<'Open Trip' | 'Private Trip'>(initialTripType);
  const [destination, setDestination] = useState<'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba' | 'Ziarah' | 'Study Tour'>(initialDestination);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  
  // Step 2: Date
  const [selectedDate, setSelectedDate] = useState<string>(initialScheduleDate);
  
  // Step 3: Participants
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  
  // Step 4: Add-ons
  const [addOnExtraHotel, setAddOnExtraHotel] = useState<boolean>(false);
  const [addOnAirportTransfer, setAddOnAirportTransfer] = useState<boolean>(false);
  const [addOnGuidePhotographer, setAddOnGuidePhotographer] = useState<boolean>(false);
  
  // Step 6: Personal Data
  const [fullName, setFullName] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Step 7: Payment & Unique Code
  const [paymentMethod, setPaymentMethod] = useState<'DP' | 'Full'>('DP');
  const [orderCode, setOrderCode] = useState<string>('');

  // Sumba / Lombok / Bali etc. Custom Notes
  const [itineraryNotes, setItineraryNotes] = useState<string>(customItineraryNotes);

  // Sync props when wizard opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setTripType(initialTripType);
      setDestination(initialDestination);
      setSelectedDate(initialScheduleDate);
      setItineraryNotes(customItineraryNotes);
      
      // Select appropriate package
      const matchingPkgs = PACKAGES.filter(p => p.destination === initialDestination && p.type === initialTripType);
      if (initialPackageId) {
        const found = PACKAGES.find(p => p.id === initialPackageId);
        if (found) setSelectedPackage(found);
      } else if (matchingPkgs.length > 0) {
        setSelectedPackage(matchingPkgs[0]);
      } else {
        setSelectedPackage(null);
      }
      
      // Generate unique order code
      const randNum = Math.floor(10000 + Math.random() * 90000);
      setOrderCode(`ANF-2026-${randNum}`);
    }
  }, [isOpen, initialTripType, initialDestination, initialPackageId, initialScheduleDate, customItineraryNotes]);

  // Adjust package list when tripType or destination changes
  useEffect(() => {
    const matchingPkgs = PACKAGES.filter(p => p.destination === destination && p.type === tripType);
    if (matchingPkgs.length > 0) {
      // Keep selected if it matches filters
      if (selectedPackage && selectedPackage.destination === destination && selectedPackage.type === tripType) {
        // keep it
      } else {
        setSelectedPackage(matchingPkgs[0]);
      }
    } else {
      setSelectedPackage(null);
    }
  }, [tripType, destination]);

  if (!isOpen) return null;

  // Constants
  const ADDON_HOTEL_PRICE = 450000;
  const ADDON_AIRPORT_PRICE = 250000;
  const ADDON_GUIDE_PRICE = 350000;

  // Calculate Prices
  const basePrice = selectedPackage ? selectedPackage.price : 0;
  const childPrice = selectedPackage ? (selectedPackage.priceChild || basePrice * 0.7) : 0;
  
  const totalAdultPrice = adults * basePrice;
  const totalChildPrice = children * childPrice;
  
  let addOnTotal = 0;
  if (addOnExtraHotel) addOnTotal += ADDON_HOTEL_PRICE;
  if (addOnAirportTransfer) addOnTotal += ADDON_AIRPORT_PRICE;
  if (addOnGuidePhotographer) addOnTotal += ADDON_GUIDE_PRICE;

  const totalParticipants = adults + children;
  const groupDiscount = totalParticipants >= 4 ? 150000 : 0;

  const grandTotal = Math.max(0, totalAdultPrice + totalChildPrice + addOnTotal - groupDiscount);
  const amountToPayNow = paymentMethod === 'DP' ? Math.round(grandTotal * 0.3) : grandTotal;

  // Helper validation
  const validateStep6 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = "Nama Lengkap wajib diisi.";
    if (!whatsapp.trim()) newErrors.whatsapp = "Nomor WhatsApp wajib diisi.";
    else if (!/^\+?[0-9]{8,15}$/.test(whatsapp.replace(/\s+/g, ''))) newErrors.whatsapp = "Format nomor WhatsApp tidak valid.";
    if (!email.trim()) newErrors.email = "Alamat Email wajib diisi.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Format email tidak valid.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !selectedPackage) {
      alert("Silakan pilih paket wisata terlebih dahulu.");
      return;
    }
    if (step === 2 && !selectedDate) {
      alert("Silakan pilih tanggal keberangkatan terlebih dahulu.");
      return;
    }
    if (step === 3 && adults < 1) {
      alert("Jumlah peserta dewasa minimal 1 orang.");
      return;
    }
    if (step === 6) {
      if (!validateStep6()) return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  // WhatsApp Redirect Message Generator
  const sendWhatsAppMsg = () => {
    const addOnList: string[] = [];
    if (addOnExtraHotel) addOnList.push(`- Malam Extra Hotel (+Rp 450.000)`);
    if (addOnAirportTransfer) addOnList.push(`- Airport Transfer PP (+Rp 250.000)`);
    if (addOnGuidePhotographer) addOnList.push(`- Private Guide & Fotografer (+Rp 350.000)`);

    const formattedBase = new Intl.NumberFormat('id-ID').format(basePrice);
    const formattedChild = new Intl.NumberFormat('id-ID').format(childPrice);
    const formattedAddOn = new Intl.NumberFormat('id-ID').format(addOnTotal);
    const formattedDiscount = new Intl.NumberFormat('id-ID').format(groupDiscount);
    const formattedGrand = new Intl.NumberFormat('id-ID').format(grandTotal);
    const formattedToPay = new Intl.NumberFormat('id-ID').format(amountToPayNow);

    const message = `Halo Admin Nurrbalitravel, saya ingin mengonfirmasi booking wisata saya:

✨ *DETAIL PESANAN* ✨
-----------------------------
🎟️ *Kode Booking:* ${orderCode}
✈️ *Tipe Trip:* ${tripType}
🏝️ *Destinasi:* ${destination}
📦 *Paket:* ${selectedPackage?.name}
📅 *Tanggal:* ${selectedDate}
👥 *Peserta:* ${adults} Dewasa ${children > 0 ? `, ${children} Anak` : ''}

🌟 *DATA DIRI* 🌟
-----------------------------
👤 *Nama:* ${fullName}
📞 *No. WA:* ${whatsapp}
📧 *Email:* ${email}
${itineraryNotes.trim() ? `📝 *Catatan Khusus:* "${itineraryNotes}"` : ''}

💳 *RANCANGAN BIAYA* 💳
-----------------------------
• Dewasa: ${adults} × Rp ${formattedBase}
${children > 0 ? `• Anak-Anak: ${children} × Rp ${formattedChild}` : ''}
${addOnList.length > 0 ? `• Add-ons:\n${addOnList.join('\n')}` : ''}
${groupDiscount > 0 ? `• Diskon Rombongan: -Rp ${formattedDiscount}` : ''}
-----------------------------
💰 *Total Harga:* **Rp ${formattedGrand}**
💳 *Pilihan Pembayaran:* ${paymentMethod === 'DP' ? 'Uang Muka / DP 30% (Lunas di lokasi)' : 'Lunas 100%'}
💵 *Jumlah Transfer:* **Rp ${formattedToPay}**

Mohon instruksi selanjutnya untuk verifikasi bukti transfer. Terima kasih! 🙏🌴`;

    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/6285155070024?text=${encodedMsg}`, '_blank');
  };

  // Month July 2026 Grid Logic
  const renderJuly2026Calendar = () => {
    // July 2026 starts on Wednesday (1st)
    // Total days: 31
    const totalDays = 31;
    const startDayOffset = 3; // Wednesday (0=Sun, 1=Mon, 2=Tue, 3=Wed...)
    
    const days: (number | null)[] = [];
    for (let i = 0; i < startDayOffset; i++) {
      days.push(null);
    }
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    const weekdays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    
    // Weekend dates: July 4, 11, 12, 18, 19, 25, 26
    const blackoutDates = [4, 11, 12, 18, 19, 25, 26];

    // Schedules for Open Trips
    const getOpenTripDates = () => {
      if (!selectedPackage) return [];
      return OPEN_TRIP_SCHEDULES
        .filter(s => s.packageId === selectedPackage.id && s.status !== 'Full')
        .map(s => parseInt(s.date.split('-')[2]));
    };

    const openTripDates = getOpenTripDates();

    const isDateDisabled = (day: number) => {
      // Weekend check
      if (blackoutDates.includes(day)) return true;
      
      if (tripType === 'Open Trip') {
        // If open trip, only allow specified scheduling dates that aren't full
        return !openTripDates.includes(day);
      }
      return false;
    };

    return (
      <div className="border border-stone-200 bg-white p-4">
        <div className="mb-3 text-center font-serif text-sm font-semibold tracking-wide text-stone-850">
          JULI 2026
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-stone-500 mb-2">
          {weekdays.map((w, idx) => (
            <div key={idx} className={idx === 0 || idx === 6 ? 'text-red-500' : ''}>
              {w}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, idx) => {
            if (day === null) return <div key={`empty-${idx}`}></div>;

            const dateStr = `2026-07-${day.toString().padStart(2, '0')}`;
            const isDisabled = isDateDisabled(day);
            const isSelected = selectedDate === dateStr;
            const isWeekend = blackoutDates.includes(day);

            return (
              <button
                key={day}
                type="button"
                disabled={isDisabled}
                onClick={() => setSelectedDate(dateStr)}
                className={`
                  h-9 w-full flex flex-col items-center justify-center transition-colors text-xs relative
                  ${isSelected 
                    ? 'bg-amber-500 text-white font-bold' 
                    : isDisabled 
                      ? 'bg-stone-50 text-stone-300 cursor-not-allowed line-through' 
                      : 'hover:bg-amber-50 text-stone-800'
                  }
                  ${isWeekend && !isSelected ? 'text-red-400 font-semibold' : ''}
                `}
              >
                <span>{day}</span>
                {tripType === 'Open Trip' && openTripDates.includes(day) && !isSelected && (
                  <span className="absolute bottom-0.5 w-1 h-1 bg-amber-500 rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-stone-500 border-t border-stone-100 pt-2">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-amber-500 inline-block"></span>
            <span>Dipilih</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-stone-50 border border-stone-200 inline-block"></span>
            <span>Tersedia</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-stone-100 text-stone-300 line-through inline-block"></span>
            <span>Penuh / Libur Akhir Pekan</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div 
        id="booking-modal-content"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl bg-stone-50 text-stone-900 border border-stone-200 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-stone-900 text-white">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-500 animate-spin-slow" />
            <div>
              <h2 className="font-serif text-lg tracking-wide">BOOKING WIZARD</h2>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest">Nurrbalitravel Premium</p>
            </div>
          </div>
          <button 
            id="close-booking-modal-btn"
            onClick={onClose} 
            className="p-1 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-stone-100 border-b border-stone-200 px-6 py-3 flex items-center justify-between overflow-x-auto gap-4">
          <div className="flex items-center gap-2 min-w-max text-xs">
            <span className="font-serif font-bold text-amber-500">Langkah {step} dari 8:</span>
            <span className="text-stone-700 font-medium">
              {step === 1 && "Tipe Trip, Destinasi & Paket"}
              {step === 2 && "Pilih Tanggal Keberangkatan"}
              {step === 3 && "Jumlah Peserta & Tarif"}
              {step === 4 && "Add-on Tambahan"}
              {step === 5 && "Transparan Invoice"}
              {step === 6 && "Lengkapi Data Diri"}
              {step === 7 && "Metode Pembayaran"}
              {step === 8 && "Konfirmasi Akhir & Tiket"}
            </span>
          </div>
          <div className="w-40 md:w-60 bg-stone-200 h-1.5 overflow-hidden">
            <div 
              className="bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${(step / 8) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              
              {/* STEP 1: SELECT TRIP TYPE, DESTINATION, PACKAGE */}
              {step === 1 && (
                <div className="space-y-6">
                  {/* Trip Type Toggle */}
                  <div className="flex justify-center">
                    <div className="bg-stone-200 p-1 flex">
                      <button
                        type="button"
                        onClick={() => setTripType('Open Trip')}
                        className={`px-5 py-1.5 text-xs font-semibold tracking-wider transition-colors uppercase ${tripType === 'Open Trip' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-950'}`}
                      >
                        Open Trip
                      </button>
                      <button
                        type="button"
                        onClick={() => setTripType('Private Trip')}
                        className={`px-5 py-1.5 text-xs font-semibold tracking-wider transition-colors uppercase ${tripType === 'Private Trip' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:text-stone-950'}`}
                      >
                        Private Trip
                      </button>
                    </div>
                  </div>

                  {/* Destination Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-600 uppercase tracking-widest">Pilih Destinasi</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {(['Bali', 'Yogyakarta', 'Lombok', 'Sumba', 'Ziarah', 'Study Tour'] as const).map((dest) => (
                        <button
                          key={dest}
                          type="button"
                          onClick={() => setDestination(dest)}
                          className={`py-2 px-1 text-center text-[11px] font-medium border transition-all ${destination === dest ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'}`}
                        >
                          {dest}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Visual Package Card Selection (As requested) */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-stone-600 uppercase tracking-widest">Pilih Paket Wisata ({destination} - {tripType})</label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {PACKAGES.filter(p => p.destination === destination && p.type === tripType).map((pkg) => {
                        const isSelected = selectedPackage?.id === pkg.id;
                        return (
                          <div 
                            key={pkg.id}
                            onClick={() => setSelectedPackage(pkg)}
                            className={`border p-4 bg-white cursor-pointer transition-all flex flex-col justify-between ${isSelected ? 'border-amber-500 ring-1 ring-amber-500' : 'border-stone-200 hover:border-stone-400'}`}
                          >
                            <div>
                              <div className="flex justify-between items-start gap-1 mb-1">
                                <h4 className="font-serif font-semibold text-stone-900 text-sm">{pkg.name}</h4>
                                <div className="flex items-center text-amber-500 text-xs font-bold shrink-0">
                                  <Star className="w-3 h-3 fill-amber-500 mr-0.5" />
                                  <span>{pkg.rating}</span>
                                </div>
                              </div>
                              <p className="text-[11px] text-stone-500 line-clamp-2 mb-3">{pkg.description}</p>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {pkg.highlights.slice(0, 3).map((h, i) => (
                                  <span key={i} className="text-[9px] bg-stone-100 text-stone-600 px-1.5 py-0.5">{h}</span>
                                ))}
                              </div>
                            </div>
                            <div className="flex justify-between items-center border-t border-stone-100 pt-2.5 mt-auto">
                              <span className="text-[10px] text-stone-500 uppercase tracking-wider">{pkg.duration}</span>
                              <span className="font-serif font-bold text-amber-500 text-sm">Rp {new Intl.NumberFormat('id-ID').format(pkg.price)}<span className="text-[10px] font-sans font-normal text-stone-400">/pax</span></span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: SELECT DATE */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="text-stone-700 space-y-1">
                    <h3 className="font-serif font-medium text-stone-900">Pilih Tanggal Keberangkatan</h3>
                    <p className="text-xs text-stone-500">
                      {tripType === 'Open Trip' 
                        ? 'Untuk Open Trip, silakan pilih tanggal sesuai jadwal keberangkatan tetap (ditandai dengan titik oranye di kalender).' 
                        : 'Untuk Private Trip, pilih tanggal fleksibel selain akhir pekan (akhir pekan penuh blackout).'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {renderJuly2026Calendar()}
                    
                    <div className="space-y-4 bg-stone-100 p-4 border border-stone-200">
                      <h4 className="font-serif font-semibold text-stone-900 text-sm uppercase tracking-wider">Detail Jadwal Keberangkatan</h4>
                      {selectedDate ? (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs py-1 border-b border-stone-200">
                            <span className="text-stone-500">Tanggal Terpilih:</span>
                            <span className="font-semibold text-stone-800">{selectedDate} (Juli 2026)</span>
                          </div>
                          <div className="flex justify-between text-xs py-1 border-b border-stone-200">
                            <span className="text-stone-500">Paket Wisata:</span>
                            <span className="font-semibold text-stone-800 text-right">{selectedPackage?.name}</span>
                          </div>
                          <div className="flex justify-between text-xs py-1 border-b border-stone-200">
                            <span className="text-stone-500">Durasi:</span>
                            <span className="font-semibold text-stone-800">{selectedPackage?.duration}</span>
                          </div>
                          {tripType === 'Open Trip' && (
                            <div className="flex justify-between text-xs py-1 border-b border-stone-200">
                              <span className="text-stone-500">Status Sisa Slot:</span>
                              <span className="font-semibold text-amber-600">
                                {OPEN_TRIP_SCHEDULES.find(s => s.date === selectedDate && s.packageId === selectedPackage?.id)?.quotaMax 
                                  ? `${OPEN_TRIP_SCHEDULES.find(s => s.date === selectedDate && s.packageId === selectedPackage?.id)?.quotaFilled}/${OPEN_TRIP_SCHEDULES.find(s => s.date === selectedDate && s.packageId === selectedPackage?.id)?.quotaMax} slot terisi` 
                                  : "Jadwal Terdaftar"}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-xs text-stone-500 py-6 text-center italic">
                          Pilih salah satu tanggal di kalender untuk menampilkan detail ketersediaan.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: NUM PARTICIPANTS */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="font-serif font-medium text-stone-900">Tentukan Jumlah Peserta</h3>
                    <p className="text-xs text-stone-500">Masukkan jumlah peserta dewasa dan anak-anak. Diskon otomatis Rp 150.000 berlaku jika total rombongan minimal 4 orang.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Counters */}
                    <div className="space-y-4">
                      {/* Adults */}
                      <div className="flex items-center justify-between p-4 bg-white border border-stone-200">
                        <div>
                          <p className="font-semibold text-stone-800 text-sm">Dewasa</p>
                          <p className="text-xs text-stone-500">Usia 12 tahun ke atas</p>
                          <p className="text-xs font-serif font-semibold text-amber-500 mt-1">Rp {new Intl.NumberFormat('id-ID').format(basePrice)} / orang</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setAdults(prev => Math.max(1, prev - 1))}
                            className="w-8 h-8 flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold border border-stone-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-serif font-bold text-lg w-6 text-center">{adults}</span>
                          <button
                            type="button"
                            onClick={() => setAdults(prev => prev + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold border border-stone-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between p-4 bg-white border border-stone-200">
                        <div>
                          <p className="font-semibold text-stone-800 text-sm">Anak-Anak</p>
                          <p className="text-xs text-stone-500">Usia 2 - 11 tahun (Diskon 30% Paket)</p>
                          <p className="text-xs font-serif font-semibold text-amber-500 mt-1">Rp {new Intl.NumberFormat('id-ID').format(childPrice)} / anak</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setChildren(prev => Math.max(0, prev - 1))}
                            className="w-8 h-8 flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold border border-stone-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-serif font-bold text-lg w-6 text-center">{children}</span>
                          <button
                            type="button"
                            onClick={() => setChildren(prev => prev + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold border border-stone-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Rates Info */}
                    <div className="bg-amber-50/50 border border-amber-100 p-5 space-y-4">
                      <div className="flex gap-2 items-start">
                        <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide">INFORMASI TARIF & KAPASITAS</h4>
                          <p className="text-xs text-stone-600 mt-1">Seluruh paket kami sudah termasuk akomodasi, transportasi ber-AC, pemandu, tiket masuk wisata, dan makan sesuai itinerary.</p>
                        </div>
                      </div>
                      
                      {selectedPackage?.name.toLowerCase().includes("mobil") || selectedPackage?.name.toLowerCase().includes("rental") ? (
                        <div className="bg-stone-900 text-white p-3 border-l-4 border-amber-500">
                          <p className="text-xs font-bold uppercase tracking-wider">PAKET LAYANAN SEWA MOBIL</p>
                          <p className="text-[11px] text-stone-300 mt-1">Tarif merupakan Flat-rate per mobil. Kapasitas maksimum 5-6 penumpang termasuk barang bawaan.</p>
                        </div>
                      ) : (
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between py-1 border-b border-stone-200/60">
                            <span className="text-stone-500">Estimasi Subtotal Dewasa:</span>
                            <span className="font-semibold text-stone-800">Rp {new Intl.NumberFormat('id-ID').format(totalAdultPrice)}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-stone-200/60">
                            <span className="text-stone-500">Estimasi Subtotal Anak:</span>
                            <span className="font-semibold text-stone-800">Rp {new Intl.NumberFormat('id-ID').format(totalChildPrice)}</span>
                          </div>
                          {totalParticipants >= 4 && (
                            <div className="flex justify-between py-1 border-b border-stone-200/60 text-green-600 font-medium">
                              <span>Diskon Rombongan (Min 4 pax):</span>
                              <span>-Rp {new Intl.NumberFormat('id-ID').format(groupDiscount)}</span>
                            </div>
                          )}
                          <div className="flex justify-between py-2 text-sm font-serif font-bold text-stone-900 pt-3 border-t border-stone-300">
                            <span>Estimasi Total:</span>
                            <span>Rp {new Intl.NumberFormat('id-ID').format(Math.max(0, totalAdultPrice + totalChildPrice - groupDiscount))}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: ADD-ONS */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="font-serif font-medium text-stone-900">Pilih Layanan Tambahan (Optional Add-ons)</h3>
                    <p className="text-xs text-stone-500">Sesuaikan kenyamanan perjalanan Anda dengan pilihan ekstra di bawah ini.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Addon 1 */}
                    <div 
                      onClick={() => setAddOnExtraHotel(!addOnExtraHotel)}
                      className={`border p-5 bg-white cursor-pointer transition-all flex flex-col justify-between ${addOnExtraHotel ? 'border-amber-500 ring-1 ring-amber-500' : 'border-stone-200 hover:border-stone-400'}`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Akomodasi</span>
                          <input 
                            type="checkbox" 
                            checked={addOnExtraHotel} 
                            onChange={() => {}} 
                            className="rounded text-amber-500 focus:ring-amber-500"
                          />
                        </div>
                        <h4 className="font-serif font-semibold text-stone-900 text-sm mb-1">Malam Extra Hotel</h4>
                        <p className="text-[11px] text-stone-500 leading-relaxed">Tambah menginap 1 malam ekstra sebelum/sesudah jadwal trip di hotel bintang 4 rekanan kami.</p>
                      </div>
                      <div className="border-t border-stone-100 pt-3 mt-4 text-right">
                        <span className="font-serif font-bold text-amber-500 text-sm">+Rp 450.000 <span className="text-[10px] font-sans font-normal text-stone-400">/malam</span></span>
                      </div>
                    </div>

                    {/* Addon 2 */}
                    <div 
                      onClick={() => setAddOnAirportTransfer(!addOnAirportTransfer)}
                      className={`border p-5 bg-white cursor-pointer transition-all flex flex-col justify-between ${addOnAirportTransfer ? 'border-amber-500 ring-1 ring-amber-500' : 'border-stone-200 hover:border-stone-400'}`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Transportasi</span>
                          <input 
                            type="checkbox" 
                            checked={addOnAirportTransfer} 
                            onChange={() => {}} 
                            className="rounded text-amber-500 focus:ring-amber-500"
                          />
                        </div>
                        <h4 className="font-serif font-semibold text-stone-900 text-sm mb-1">Airport Transfer PP</h4>
                        <p className="text-[11px] text-stone-500 leading-relaxed">Antar jemput privat eksklusif ber-AC dari bandara ke hotel pada saat kedatangan & kepulangan Anda.</p>
                      </div>
                      <div className="border-t border-stone-100 pt-3 mt-4 text-right">
                        <span className="font-serif font-bold text-amber-500 text-sm">+Rp 250.000 <span className="text-[10px] font-sans font-normal text-stone-400">/pax</span></span>
                      </div>
                    </div>

                    {/* Addon 3 */}
                    <div 
                      onClick={() => setAddOnGuidePhotographer(!addOnGuidePhotographer)}
                      className={`border p-5 bg-white cursor-pointer transition-all flex flex-col justify-between ${addOnGuidePhotographer ? 'border-amber-500 ring-1 ring-amber-500' : 'border-stone-200 hover:border-stone-400'}`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Layanan Ahli</span>
                          <input 
                            type="checkbox" 
                            checked={addOnGuidePhotographer} 
                            onChange={() => {}} 
                            className="rounded text-amber-500 focus:ring-amber-500"
                          />
                        </div>
                        <h4 className="font-serif font-semibold text-stone-900 text-sm mb-1">Guide & Fotografer Privat</h4>
                        <p className="text-[11px] text-stone-500 leading-relaxed">Fotografer profesional merangkap pemandu lokal untuk mendokumentasikan setiap momen berharga Anda.</p>
                      </div>
                      <div className="border-t border-stone-100 pt-3 mt-4 text-right">
                        <span className="font-serif font-bold text-amber-500 text-sm">+Rp 350.000 <span className="text-[10px] font-sans font-normal text-stone-400">/hari</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: TRANSPARENT INVOICE */}
              {step === 5 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="font-serif font-medium text-stone-900">Rincian Invoice Transparan</h3>
                    <p className="text-xs text-stone-500">Semua biaya dirinci secara transparan tanpa biaya tambahan tersembunyi.</p>
                  </div>

                  <div className="bg-white border border-stone-200 p-6 md:p-8 relative">
                    {/* Watermark logo */}
                    <div className="absolute right-6 top-6 opacity-5 select-none pointer-events-none">
                      <Compass className="w-32 h-32 text-stone-900" />
                    </div>

                    <div className="flex justify-between items-start border-b border-stone-200 pb-4 mb-6">
                      <div>
                        <h4 className="font-serif font-bold text-stone-900 text-base">NURRBALITRAVEL</h4>
                        <p className="text-[10px] text-stone-500 uppercase tracking-widest">EST. 2012 | BALI - JOGJA - LOMBOK - SUMBA</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold bg-stone-100 px-2 py-1 text-stone-700">{orderCode}</span>
                        <p className="text-[9px] text-stone-400 mt-1">Invoice Generated: 2026</p>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      {/* Destination / Package */}
                      <div className="grid grid-cols-3 py-1 border-b border-stone-100">
                        <span className="text-stone-500 font-medium">Paket Wisata Terpilih</span>
                        <span className="col-span-2 text-right font-semibold text-stone-900">{selectedPackage?.name} ({destination})</span>
                      </div>
                      {/* Trip Type */}
                      <div className="grid grid-cols-3 py-1 border-b border-stone-100">
                        <span className="text-stone-500 font-medium">Tipe Perjalanan</span>
                        <span className="col-span-2 text-right font-semibold text-stone-900">{tripType}</span>
                      </div>
                      {/* Date */}
                      <div className="grid grid-cols-3 py-1 border-b border-stone-100">
                        <span className="text-stone-500 font-medium">Tanggal Perjalanan</span>
                        <span className="col-span-2 text-right font-semibold text-stone-900">{selectedDate}</span>
                      </div>
                      {/* Adults */}
                      <div className="grid grid-cols-3 py-1 border-b border-stone-100">
                        <span className="text-stone-500 font-medium">Peserta Dewasa</span>
                        <span className="text-stone-800 text-center">{adults} orang</span>
                        <span className="text-right font-semibold text-stone-900">Rp {new Intl.NumberFormat('id-ID').format(totalAdultPrice)}</span>
                      </div>
                      {/* Children */}
                      {children > 0 && (
                        <div className="grid grid-cols-3 py-1 border-b border-stone-100">
                          <span className="text-stone-500 font-medium">Peserta Anak (Diskon 30%)</span>
                          <span className="text-stone-800 text-center">{children} anak</span>
                          <span className="text-right font-semibold text-stone-900">Rp {new Intl.NumberFormat('id-ID').format(totalChildPrice)}</span>
                        </div>
                      )}
                      {/* Addons */}
                      {addOnTotal > 0 && (
                        <div className="grid grid-cols-3 py-1 border-b border-stone-100">
                          <span className="text-stone-500 font-medium">Layanan Add-ons</span>
                          <span className="text-stone-500 text-center">
                            {addOnExtraHotel && "Hotel extra, "}
                            {addOnAirportTransfer && "Airport transfer, "}
                            {addOnGuidePhotographer && "Guide privat"}
                          </span>
                          <span className="text-right font-semibold text-stone-900">Rp {new Intl.NumberFormat('id-ID').format(addOnTotal)}</span>
                        </div>
                      )}
                      {/* Group Discount */}
                      {groupDiscount > 0 && (
                        <div className="grid grid-cols-3 py-1 border-b border-stone-100 text-green-600 font-medium">
                          <span>Diskon Rombongan (Min 4 pax)</span>
                          <span></span>
                          <span className="text-right">-Rp {new Intl.NumberFormat('id-ID').format(groupDiscount)}</span>
                        </div>
                      )}

                      {/* Grand Total */}
                      <div className="grid grid-cols-3 py-3 border-t-2 border-stone-900 mt-6 text-sm font-serif font-bold text-stone-950">
                        <span>Grand Total</span>
                        <span></span>
                        <span className="text-right text-amber-500">Rp {new Intl.NumberFormat('id-ID').format(grandTotal)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: PERSONAL INFORMATION FORM */}
              {step === 6 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="font-serif font-medium text-stone-900">Data Diri Pemesan</h3>
                    <p className="text-xs text-stone-500">Harap isi informasi kontak Anda dengan benar untuk memudahkan koordinasi tiket dan lokasi penjemputan.</p>
                  </div>

                  <div className="space-y-4 max-w-lg mx-auto bg-white border border-stone-200 p-6">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block">Nama Lengkap (Sesuai KTP/Paspor)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: Reyhan Ridwan"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                          }}
                          className={`w-full pl-9 pr-4 py-2 border text-sm outline-none transition-all ${errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-stone-200 focus:border-stone-900'}`}
                        />
                      </div>
                      {errors.fullName && <p className="text-[10px] text-red-500 font-semibold">{errors.fullName}</p>}
                    </div>

                    {/* WhatsApp */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block">No. HP / WhatsApp Aktif</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: 085123578598"
                          value={whatsapp}
                          onChange={(e) => {
                            setWhatsapp(e.target.value);
                            if (errors.whatsapp) setErrors(prev => ({ ...prev, whatsapp: '' }));
                          }}
                          className={`w-full pl-9 pr-4 py-2 border text-sm outline-none transition-all ${errors.whatsapp ? 'border-red-500 focus:border-red-500' : 'border-stone-200 focus:border-stone-900'}`}
                        />
                      </div>
                      {errors.whatsapp && <p className="text-[10px] text-red-500 font-semibold">{errors.whatsapp}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block">Alamat Email Valid</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="Contoh: reyhan@email.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                          }}
                          className={`w-full pl-9 pr-4 py-2 border text-sm outline-none transition-all ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-stone-200 focus:border-stone-900'}`}
                        />
                      </div>
                      {errors.email && <p className="text-[10px] text-red-500 font-semibold">{errors.email}</p>}
                    </div>

                    {/* Optional request itinerary notes */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block">Catatan Khusus / Preferensi Rencana Perjalanan</label>
                      <textarea
                        rows={3}
                        placeholder="Contoh: Ingin fokus kuliner, bawa kursi roda, dll."
                        value={itineraryNotes}
                        onChange={(e) => setItineraryNotes(e.target.value)}
                        className="w-full p-3 border border-stone-200 text-sm outline-none focus:border-stone-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 7: PAYMENT METHOD */}
              {step === 7 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="font-serif font-medium text-stone-900">Pilih Metode Pembayaran</h3>
                    <p className="text-xs text-stone-500">Guna mengonfirmasi booking Anda, Anda dapat membayar Uang Muka (DP) terlebih dahulu atau melakukan pelunasan penuh.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Payment Options */}
                    <div className="space-y-4">
                      {/* DP Option */}
                      <div 
                        onClick={() => setPaymentMethod('DP')}
                        className={`border p-4 bg-white cursor-pointer transition-all flex items-start gap-3 ${paymentMethod === 'DP' ? 'border-amber-500 ring-1 ring-amber-500' : 'border-stone-200 hover:border-stone-400'}`}
                      >
                        <input 
                          type="radio" 
                          checked={paymentMethod === 'DP'} 
                          onChange={() => {}} 
                          className="mt-1 text-amber-500 focus:ring-amber-500"
                        />
                        <div>
                          <h4 className="font-serif font-bold text-stone-900 text-sm">Uang Muka / DP 30%</h4>
                          <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">Selesaikan pembayaran 30% di awal untuk mengunci slot keberangkatan. Sisa pelunasan 70% dapat dibayar di lokasi.</p>
                          <span className="inline-block mt-2 font-serif font-semibold text-amber-500 text-xs">Bayar Sekarang: Rp {new Intl.NumberFormat('id-ID').format(Math.round(grandTotal * 0.3))}</span>
                        </div>
                      </div>

                      {/* Full Option */}
                      <div 
                        onClick={() => setPaymentMethod('Full')}
                        className={`border p-4 bg-white cursor-pointer transition-all flex items-start gap-3 ${paymentMethod === 'Full' ? 'border-amber-500 ring-1 ring-amber-500' : 'border-stone-200 hover:border-stone-400'}`}
                      >
                        <input 
                          type="radio" 
                          checked={paymentMethod === 'Full'} 
                          onChange={() => {}} 
                          className="mt-1 text-amber-500 focus:ring-amber-500"
                        />
                        <div>
                          <h4 className="font-serif font-bold text-stone-900 text-sm">Pelunasan Penuh (100% Lunas)</h4>
                          <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">Selesaikan pelunasan penuh di awal untuk kemudahan administrasi tanpa memikirkan sisa tagihan.</p>
                          <span className="inline-block mt-2 font-serif font-semibold text-amber-500 text-xs">Bayar Sekarang: Rp {new Intl.NumberFormat('id-ID').format(grandTotal)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bank Transfer Details */}
                    <div className="bg-stone-900 text-white p-5 space-y-4">
                      <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
                        <Landmark className="w-5 h-5 text-amber-500" />
                        <h4 className="font-serif font-bold text-sm uppercase tracking-wider">Rekening Resmi An nafi</h4>
                      </div>

                      <div className="space-y-3 text-xs">
                        {/* BCA */}
                        <div className="bg-stone-850 p-3 border-l-2 border-amber-500">
                          <p className="font-bold text-amber-500 text-[10px] tracking-wider uppercase">BANK BCA (KCP Denpasar)</p>
                          <p className="font-mono text-sm font-semibold tracking-wider mt-1">772-512-3578</p>
                          <p className="text-[10px] text-stone-400 mt-0.5">Atas Nama: PT AN NAFI TOUR & TRAVEL</p>
                        </div>

                        {/* Mandiri */}
                        <div className="bg-stone-850 p-3 border-l-2 border-amber-500">
                          <p className="font-bold text-amber-500 text-[10px] tracking-wider uppercase">BANK MANDIRI (KCP Seminyak)</p>
                          <p className="font-mono text-sm font-semibold tracking-wider mt-1">145-00-1235-7859</p>
                          <p className="text-[10px] text-stone-400 mt-0.5">Atas Nama: PT AN NAFI TOUR & TRAVEL</p>
                        </div>
                      </div>

                      <div className="flex gap-2 items-start text-[10px] text-stone-400 bg-stone-800 p-2.5">
                        <Info className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <p>Silakan simpan nomor rekening di atas. Di langkah selanjutnya, Anda akan diarahkan mengirimkan detail pesanan ini ke WhatsApp kami beserta bukti transfer.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 8: FINAL CONFIRMATION & REDIRECT */}
              {step === 8 && (
                <div className="text-center space-y-6 py-6">
                  {/* Animasi success */}
                  <div className="flex justify-center">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 100 }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600"
                    >
                      <CheckCircle className="w-10 h-10" />
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-stone-900">Form Pemesanan Selesai!</h3>
                    <p className="text-sm text-stone-500">Nomor Registrasi Anda adalah <span className="font-mono font-bold text-stone-800">{orderCode}</span>.</p>
                  </div>

                  <div className="max-w-md mx-auto bg-white border border-stone-200 p-5 text-left space-y-3 text-xs">
                    <h4 className="font-serif font-bold text-stone-800 text-sm border-b border-stone-100 pb-2 uppercase tracking-wider">Ringkasan Konfirmasi</h4>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Nama Pemesan:</span>
                      <span className="font-semibold text-stone-900">{fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Tipe & Destinasi:</span>
                      <span className="font-semibold text-stone-900">{tripType} - {destination}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Nama Paket:</span>
                      <span className="font-semibold text-stone-900">{selectedPackage?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Tanggal Berangkat:</span>
                      <span className="font-semibold text-stone-900">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Peserta Rombongan:</span>
                      <span className="font-semibold text-stone-900">{adults} Dewasa {children > 0 ? `, ${children} Anak` : ''}</span>
                    </div>
                    <div className="flex justify-between border-t border-stone-100 pt-2 font-semibold">
                      <span className="text-stone-600">Total Pembayaran:</span>
                      <span className="text-stone-900">Rp {new Intl.NumberFormat('id-ID').format(grandTotal)}</span>
                    </div>
                    <div className="flex justify-between border-t-2 border-dashed border-amber-200 pt-2 text-amber-700 font-bold">
                      <span>{paymentMethod === 'DP' ? 'Uang Muka (DP 30%) Ke Rekening:' : 'Pelunasan (100%) Ke Rekening:'}</span>
                      <span>Rp {new Intl.NumberFormat('id-ID').format(amountToPayNow)}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                    Silakan klik tombol di bawah untuk mengalihkan ke WhatsApp Admin An nafi. Pesan berisi detail formulir di atas akan dibuat otomatis. Kirimkan pesan tersebut beserta bukti transfer untuk menyelesaikan verifikasi booking.
                  </p>

                  <div className="pt-2">
                    <button
                      id="submit-booking-wa-btn"
                      type="button"
                      onClick={sendWhatsAppMsg}
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-serif px-8 py-3 transition-colors uppercase tracking-widest text-sm"
                    >
                      <Compass className="w-4 h-4 animate-spin-slow" />
                      Konfirmasi & Kirim via WhatsApp
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Buttons */}
        <div className="px-6 py-4 bg-stone-100 border-t border-stone-200 flex justify-between">
          {step > 1 && step < 8 ? (
            <button
              id="prev-booking-step-btn"
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-2 border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors bg-white uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          ) : (
            <div></div>
          )}

          {step < 8 ? (
            <button
              id="next-booking-step-btn"
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 bg-stone-900 text-white px-5 py-2 text-xs font-semibold hover:bg-stone-850 transition-colors uppercase tracking-wider ml-auto"
            >
              Next <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              id="close-booking-success-btn"
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 bg-stone-800 text-white px-5 py-2 text-xs font-semibold hover:bg-stone-900 transition-colors uppercase tracking-wider ml-auto"
            >
              Tutup Wizard
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
