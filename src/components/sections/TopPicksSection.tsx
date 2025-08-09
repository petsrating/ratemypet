import React from 'react';
import { Pet } from '../../types/Pet';
import { StarRating } from '../StarRating';
import { MapPin, Award, Crown } from 'lucide-react';

interface TopPicksSectionProps {
  pets: Pet[];
  onPetClick: (pet: Pet) => void;
}

export function TopPicksSection({ pets, onPetClick }: TopPicksSectionProps) {
  const featuredPets = pets.filter(pet => pet.featured).slice(0, 6);
  const topRatedPets = pets
    .filter(pet => !pet.featured)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const PetMiniCard = ({ pet, isFeatured = false }: { pet: Pet; isFeatured?: boolean }) => (
    <div 
      onClick={() => onPetClick(pet)}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
    >
      <div className="relative">
        <img
          src={pet.images[0]}
          alt={pet.name}
          className="w-full h-40 object-cover"
        />
        {isFeatured && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <Crown className="w-3 h-3 mr-1" />
            Featured
          </div>
        )}
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 rounded-lg px-2 py-1">
          <StarRating rating={pet.rating} size="sm" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-1">{pet.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{pet.breed} • {pet.age} years</p>
        <div className="flex items-center text-gray-500 text-xs mb-2">
          <MapPin className="w-3 h-3 mr-1" />
          {pet.location.city}, {pet.location.state}
        </div>
        <div className="flex justify-between items-center">
          <span className={`px-2 py-1 rounded text-xs ${
            pet.purpose === 'For Sale' ? 'bg-green-100 text-green-800' :
            pet.purpose === 'For Adoption' ? 'bg-blue-100 text-blue-800' :
            'bg-orange-100 text-orange-800'
          }`}>
            {pet.purpose}
          </span>
          {pet.price && (
            <span className="text-sm font-bold text-gray-800">
              ${pet.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Top Picks</h1>
          <p className="text-gray-600">Featured and highest-rated pets in your area</p>
        </div>

        {/* Featured Pets Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Crown className="w-6 h-6 text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Featured Pets</h2>
            <div className="ml-auto bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              Premium
            </div>
          </div>
          
          {featuredPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPets.map(pet => (
                <PetMiniCard key={pet.id} pet={pet} isFeatured={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No featured pets available at the moment.
            </div>
          )}
        </div>

        {/* Top Rated Pets Section */}
        <div>
          <div className="flex items-center mb-6">
            <Award className="w-6 h-6 text-purple-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Top Rated Pets</h2>
            <div className="ml-auto bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              Community Choice
            </div>
          </div>
          
          {topRatedPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topRatedPets.map(pet => (
                <PetMiniCard key={pet.id} pet={pet} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No rated pets available yet. Start discovering pets to see top picks!
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Want to feature your pet?</h3>
          <p className="text-gray-600 mb-4">
            Featured listings get 5x more visibility and appear in Top Picks
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Upgrade to Featured
          </button>
        </div>
      </div>
    </div>
  );
}