export interface Package {
  id: string;
  name: string;
  destination: 'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba' | 'Ziarah' | 'Study Tour';
  type: 'Open Trip' | 'Private Trip';
  price: number;
  priceChild?: number;
  duration: string;
  rating: number;
  reviewsCount: number;
  image: string;
  highlights: string[];
  description: string;
  itinerary: string[];
}

export interface OpenTripSchedule {
  id: string;
  packageId: string;
  packageName: string;
  destination: 'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba' | 'Ziarah' | 'Study Tour';
  date: string;
  quotaMax: number;
  quotaFilled: number;
  pricePerPerson: number;
  status: 'Tersedia' | 'Hampir Penuh' | 'Full';
}

export interface BentoItem {
  id: number;
  title: string;
  location: string;
  island: 'Bali' | 'Yogyakarta' | 'Lombok' | 'Sumba' | 'Ziarah' | 'Study Tour';
  rating: number;
  image: string;
  sizeClass: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
  tripType: string;
}

export interface Fleet {
  id: string;
  name: string;
  type: string;
  capacity: number;
  image: string;
  pricePerDay: number;
}
