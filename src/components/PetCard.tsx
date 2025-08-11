import React, { useState } from 'react';
import { Pet } from '../types/Pet';
import { StarRating } from './StarRating';
import { MapPin, Phone, DollarSign, Heart, Star } from 'lucide-react';

interface PetCardProps {
  pet: Pet;
  onRate?: (petId: string, rating: number) => void;
  showRating?: boolean;
  showDetailedView?: boolean;
  userRating?: number;
}

export function PetCard({ pet, onRate, showRating = true, showDetailedView = false, userRating }: PetCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleRate = (rating: number) => {
    if (onRate) {
      onRate(pet.id, rating);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % pet.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + pet.images.length) % pet.images.length);
  };

  const handleStarClick = (rating: number) => {
    if (userRating) return; // Prevent rating if already rated
    handleRate(rating);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-md mx-auto relative">
      {/* Image Carousel */}
      <div className="relative h-96 overflow-hidden group">
        <img
          src={pet.images[currentImageIndex]}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
        
        {/* Star Rating in top right */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-70 rounded-lg px-3 py-1 flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-sm font-medium">{pet.rating.toFixed(1)}</span>
        </div>

        {/* Navigation arrows for multiple images */}
        {pet.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
            >
              →
            </button>
          </>
        )}

        {/* Image indicators */}
        {pet.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {pet.images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Interactive Star Rating - Fixed Position */}
        {showRating && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black bg-opacity-50 rounded-full px-4 py-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => !userRating && handleStarClick(star)}
                onMouseEnter={() => !userRating && setHoveredStar(star)}
                onMouseLeave={() => !userRating && setHoveredStar(0)}
                className={`transition-all duration-200 ${!userRating ? 'hover:scale-125 cursor-pointer' : 'cursor-default'}`}
                disabled={!!userRating}
              >
                <Star
                  className={`w-8 h-8 ${
                    userRating && star <= userRating
                      ? 'text-yellow-400 fill-yellow-400'
                      : !userRating && star <= hoveredStar
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-white fill-transparent'
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        {/* User's Rating Display */}
        {userRating && (
          <div className="absolute top-16 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            You rated: {userRating} ⭐
          </div>
        )}

        {/* Heart icon */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 left-4 p-2 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 transition-all"
        >
          <Heart
            className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>

        {/* Featured badge */}
        {pet.featured && (
          <div className="absolute top-16 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
      </div>

      {/* Pet Details */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{pet.name}</h2>
            <p className="text-gray-600">{pet.age} years old</p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              {pet.petType}
            </span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-700">
            <span className="font-medium w-16">Breed:</span>
            <span>{pet.breed}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <span className="font-medium w-16">Purpose:</span>
            <span className={`px-2 py-1 rounded text-sm ${
              pet.purpose === 'For Sale' ? 'bg-green-100 text-green-800' :
              pet.purpose === 'For Adoption' ? 'bg-blue-100 text-blue-800' :
              'bg-orange-100 text-orange-800'
            }`}>
              {pet.purpose}
            </span>
          </div>

          {pet.price && (
            <div className="flex items-center text-gray-700">
              <DollarSign className="w-4 h-4 mr-1" />
              <span className="font-medium">Price: ${pet.price.toLocaleString()}</span>
            </div>
          )}

          <div className="flex items-center text-gray-700">
            <span className="font-medium w-16">Sex:</span>
            <span>{pet.sex}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{pet.location.city}, {pet.location.state}</span>
          </div>

          {pet.phone && (
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-1" />
              <span className="text-sm">{pet.phone}</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-6">{pet.description}</p>

        {/* Detailed view rating */}
        {showDetailedView && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <StarRating rating={pet.rating} size="sm" />
                <span className="text-sm text-gray-600">({pet.ratingCount} reviews)</span>
              </div>
              <span className="text-sm text-gray-500">
                Added {pet.createdAt.toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}