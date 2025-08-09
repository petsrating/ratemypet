import { Pet, User } from '../types/Pet';

export const mockUser: User = {
  id: 'user1',
  name: 'John Doe',
  email: 'john@example.com',
  location: {
    country: 'USA',
    state: 'California',
    city: 'Los Angeles',
    coordinates: { lat: 34.0522, lng: -118.2437 }
  },
  discoveryRadius: 50,
  petProfiles: ['pet1', 'pet2']
};

export const mockPets: Pet[] = [
  {
    id: 'pet1',
    name: 'Luna',
    age: 3,
    petType: 'Dog',
    breed: 'Golden Retriever',
    purpose: 'For Adoption',
    sex: 'Female',
    location: {
      country: 'USA',
      state: 'California',
      city: 'Los Angeles',
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    description: 'Luna is a friendly and energetic Golden Retriever who loves playing fetch and swimming. She is great with kids and other pets.',
    phone: '+1-555-0123',
    images: [
      'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.8,
    ratingCount: 24,
    featured: true,
    ownerId: 'owner1',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'pet2',
    name: 'Whiskers',
    age: 2,
    petType: 'Cat',
    breed: 'Persian',
    purpose: 'For Sale',
    price: 1500,
    sex: 'Male',
    location: {
      country: 'USA',
      state: 'California',
      city: 'San Francisco',
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    description: 'Beautiful Persian cat with long, silky fur. Very calm and affectionate. Perfect for apartment living.',
    phone: '+1-555-0124',
    images: [
      'https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.6,
    ratingCount: 18,
    featured: false,
    ownerId: 'owner2',
    createdAt: new Date('2024-01-20')
  },
  {
    id: 'pet3',
    name: 'Rocky',
    age: 4,
    petType: 'Dog',
    breed: 'German Shepherd',
    purpose: 'For Breeding',
    price: 2000,
    sex: 'Male',
    location: {
      country: 'USA',
      state: 'California',
      city: 'San Diego',
      coordinates: { lat: 32.7157, lng: -117.1611 }
    },
    description: 'Champion bloodline German Shepherd. Excellent temperament and health records. Perfect for breeding programs.',
    phone: '+1-555-0125',
    images: [
      'https://images.pexels.com/photos/1174081/pexels-photo-1174081.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.9,
    ratingCount: 31,
    featured: true,
    ownerId: 'owner3',
    createdAt: new Date('2024-01-10')
  },
  {
    id: 'pet4',
    name: 'Bella',
    age: 1,
    petType: 'Cat',
    breed: 'Maine Coon',
    purpose: 'For Adoption',
    sex: 'Female',
    location: {
      country: 'USA',
      state: 'California',
      city: 'Oakland',
      coordinates: { lat: 37.8044, lng: -122.2711 }
    },
    description: 'Young Maine Coon kitten looking for a loving home. Very playful and social.',
    images: [
      'https://images.pexels.com/photos/1472999/pexels-photo-1472999.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.7,
    ratingCount: 12,
    featured: false,
    ownerId: 'owner4',
    createdAt: new Date('2024-01-25')
  },
  {
    id: 'pet5',
    name: 'Charlie',
    age: 2,
    petType: 'Bird',
    breed: 'Cockatiel',
    purpose: 'For Sale',
    price: 300,
    sex: 'Male',
    location: {
      country: 'USA',
      state: 'California',
      city: 'Los Angeles',
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    description: 'Hand-trained Cockatiel with beautiful coloring. Can whistle several tunes and loves attention.',
    phone: '+1-555-0126',
    images: [
      'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.5,
    ratingCount: 8,
    featured: true,
    ownerId: 'owner5',
    createdAt: new Date('2024-01-18')
  },
  {
    id: 'pet6',
    name: 'Max',
    age: 5,
    petType: 'Dog',
    breed: 'Labrador',
    purpose: 'For Breeding',
    price: 1800,
    sex: 'Male',
    location: {
      country: 'USA',
      state: 'California',
      city: 'Fresno',
      coordinates: { lat: 36.7378, lng: -119.7871 }
    },
    description: 'Purebred Labrador with excellent pedigree. Health tested and ready for breeding.',
    phone: '+1-555-0127',
    images: [
      'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    rating: 4.4,
    ratingCount: 15,
    featured: false,
    ownerId: 'owner6',
    createdAt: new Date('2024-01-12')
  }
];