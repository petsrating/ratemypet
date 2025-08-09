import React, { useState, useEffect } from 'react';
import { Pet } from '../../types/Pet';
import { PetCard } from '../PetCard';
import { ArrowLeft } from 'lucide-react';

interface DiscoverSectionProps {
  pets: Pet[];
  onRate: (petId: string, rating: number) => void;
  filters: {
    petType?: string;
    purpose?: string;
  };
  selectedPet?: Pet | null;
  onBackToDiscover?: () => void;
}

export function DiscoverSection({ pets, onRate, filters, selectedPet, onBackToDiscover }: DiscoverSectionProps) {
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [filteredPets, setFilteredPets] = useState<Pet[]>(pets);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // If a specific pet is selected, show only that pet
  useEffect(() => {
    if (selectedPet) {
      setFilteredPets([selectedPet]);
      setCurrentPetIndex(0);
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
  }, [pets, filters, selectedPet]);


  const handleRate = (petId: string, rating: number) => {
    onRate(petId, rating);
    setShowSuccessMessage(true);
    
    setTimeout(() => {
      setShowSuccessMessage(false);
      
      // If viewing a selected pet, go back to discover
      if (selectedPet && onBackToDiscover) {
        onBackToDiscover();
      } else {
        // Move to next pet
        if (currentPetIndex < filteredPets.length - 1) {
          setCurrentPetIndex(prev => prev + 1);
        } else {
          // Reset to first pet
          setCurrentPetIndex(0);
        }
      }
    }, 1000);
  };

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

  const currentPet = filteredPets[currentPetIndex];

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

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            <div className="animate-bounce">
              Rating submitted! {selectedPet ? 'Thank you!' : 'Moving to next pet...'}
            </div>
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
          />
        </div>
      </div>
    </div>
  );
}