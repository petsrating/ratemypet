export interface Pet {
  id: string;
  name: string;
  age: number;
  petType: 'Dog' | 'Cat' | 'Bird' | 'Livestock' | 'Pet Services' | 'Pet Products' | 'Other';
  breed: string;
  purpose: 'For Sale' | 'For Adoption' | 'For Breeding';
  price?: number;
  sex: 'Male' | 'Female';
  location: {
    country: string;
    state: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  description: string;
  phone?: string;
  images: string[];
  rating: number;
  ratingCount: number;
  featured: boolean;
  ownerId: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  location: {
    country: string;
    state: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  discoveryRadius: number; // in km
  petProfiles: string[]; // pet IDs
}

export interface Rating {
  userId: string;
  petId: string;
  stars: number;
  timestamp: Date;
}