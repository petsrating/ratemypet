import React, { useState, useEffect } from 'react';
import { Pet, Rating } from '../../types/Pet';
import { AuthUser } from '../../types/Auth';
import { PetCard } from '../PetCard';
import { ArrowLeft, MapPin, Globe } from 'lucide-react';

interface DiscoverSectionProps {
  pets: Pet[];
  onRate: (petId: string, rating: number) => void;
  filters: {
    petType?: string;
    purpose?: string;
  };
  selectedPet?: Pet | null;
  onBackToDiscover?: () => void;
  userRatings: Rating[];
  user: AuthUser;
  onRadiusChange: (radius: number) => void;
}

export function DiscoverSection({ pets, onRate, filters, selectedPet, onBackToDiscover, userRatings, user, onRadiusChange }: DiscoverSectionProps) {
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [filteredPets, setFilteredPets] = useState<Pet[]>(pets);
  const [showNoMorePets, setShowNoMorePets] = useState(false);
  const [isGlobal, setIsGlobal] = useState(false);

  // If a specific pet is selected, show only that pet
  useEffect(() => {
    if (selectedPet) {
      setFilteredPets([selectedPet]);
      setCurrentPetIndex(0);
      setShowNoMorePets(false);
      return;
    }

    let filtered = pets;
    
    if (filters.petType && filters.petType !== 'All') {
      filtered = filtered.filter(pet => pet.petType === filters.petType);
    }
    
    if (filters.purpose && filters.purpose !== 'All') {
      filtered = filtered.filter(pet => pet.purpose === filters.purpose);
    }
    
    setFilteredPets(filtered);
    setCurrentPetIndex(0);
    setShowNoMorePets(false);
  }, [pets, filters, selectedPet]);

  const handleRate = (petId: string, rating: number) => {
    // Check if user has already rated this pet
    const existingRating = userRatings.find(r => r.petId === petId);
    if (existingRating) return;

    onRate(petId, rating);
    
    // If viewing a selected pet, go back to discover
    if (selectedPet && onBackToDiscover) {
      onBackToDiscover();
    } else {
      // Move to next pet
      if (currentPetIndex < filteredPets.length - 1) {
        setCurrentPetIndex(prev => prev + 1);
      } else {
        // Show no more pets message
        setShowNoMorePets(true);
      }
    }
  };

  const handleIncreaseRadius = () => {
    const newRadius = Math.min(user.discoveryRadius + 50, 200);
    onRadiusChange(newRadius);
    setShowNoMorePets(false);
    setCurrentPetIndex(0);
  };

  const handleGoGlobal = () => {
    setIsGlobal(true);
    setShowNoMorePets(false);
    setCurrentPetIndex(0);
  };

  const handleNextProfile = () => {
    if (currentPetIndex < filteredPets.length - 1) {
      setCurrentPetIndex(prev => prev + 1);
    } else {
      setShowNoMorePets(true);
    }
  };

  // Get unrated pets for the current user
  const unratedPets = filteredPets.filter(pet => 
    !userRatings.some(rating => rating.petId === pet.id)
  );

  // Show no more pets message if no unrated pets and not viewing selected pet
  if (!selectedPet && (unratedPets.length === 0 || showNoMorePets)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 pb-20">
        <div className="text-center p-8 max-w-md mx-auto">
          <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">🐾</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No more pets in your area</h2>
          <p className="text-gray-600 mb-6">
            You've seen all available pets within {user.discoveryRadius}km radius.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleIncreaseRadius}
              className="w-full flex items-center justify-center px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              disabled={user.discoveryRadius >= 200}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Increase Radius to {Math.min(user.discoveryRadius + 50, 200)}km
            </button>
            <button
              onClick={handleGoGlobal}
              className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Globe className="w-5 h-5 mr-2" />
              Search Globally
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (filteredPets.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 pb-20">
        <div className="text-center p-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">🐾</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No pets found</h2>
          <p className="text-gray-600">Try adjusting your filters or check back later for new pets!</p>
        </div>
      </div>
    );
  }

  // Use unrated pets if not viewing selected pet, otherwise use filtered pets
  const petsToShow = selectedPet ? filteredPets : unratedPets;
  const currentPet = petsToShow[currentPetIndex] || filteredPets[currentPetIndex];
  
  if (!currentPet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 pb-20">
        <div className="text-center p-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">🐾</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No pets available</h2>
          <p className="text-gray-600">Check back later for new pets!</p>
        </div>
      </div>
    );
  }

  // Check if current pet has been rated by user
  const userRating = userRatings.find(r => r.petId === currentPet.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          {selectedPet && onBackToDiscover && (
            <button
              onClick={onBackToDiscover}
              className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Discover Pets</h1>
          <p className="text-gray-600">
            {selectedPet 
              ? 'Rate this pet to help others find the best companions'
              : 'Rate pets in your area to help others find the best companions'
            }
          </p>
        </div>

        {/* Show next button if user has already rated */}
        {userRating && !selectedPet && (
          <div className="mb-4 text-center">
            <button
              onClick={handleNextProfile}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Next Profile
            </button>
          </div>
        )}

        {/* Current Pet Card */}
        <div className="flex justify-center">
          <PetCard
            key={currentPet.id}
            pet={currentPet}
            onRate={handleRate}
            showRating={true}
            showDetailedView={!!selectedPet}
            userRating={userRating?.stars}
          />
        </div>
      </div>
    </div>
  );
}