export type PetSpecies = 'dog' | 'cat';
export type PetSize = 'small' | 'medium' | 'large';

export interface ServiceItem {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  durationMinutes: number;
  prices: {
    small: number;
    medium: number;
    large: number;
  };
  recommendedFor: string;
  image?: string;
  includes: string[];
}

export interface ServiceAddon {
  id: string;
  name: string;
  price: number;
  desc: string;
}

export interface BookingData {
  // Step 1: Pet & Tutor
  petName: string;
  petSpecies: PetSpecies;
  petSize: PetSize;
  petNotes: string;
  tutorName: string;
  tutorPhone: string;
  
  // Step 2: Services
  mainServiceId: string;
  selectedAddonIds: string[];
  
  // Step 3: Date & Time
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:mm
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'racao' | 'brinquedos' | 'acessorios';
  price: number;
  badge?: string;
  desc: string;
  details: string;
  volumeOrWeight: string;
}

export interface TestimonialItem {
  id: string;
  tutorName: string;
  petName: string;
  petBreed: string;
  comment: string;
  rating: number;
  serviceUsed: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
