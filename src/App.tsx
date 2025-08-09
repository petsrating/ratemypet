import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/auth/LandingPage';
import { AuthModal } from './components/auth/AuthModal';
import { BottomNavigation } from './components/BottomNavigation';
import { DiscoverSection } from './components/sections/DiscoverSection';
import { ExploreSection } from './components/sections/ExploreSection';
import { TopPicksSection } from './components/sections/TopPicksSection';
import { AddProfileSection } from './components/sections/AddProfileSection';
import { ProfileSection } from './components/sections/ProfileSection';
import { mockPets, mockUser } from './data/mockData';
import { Pet, Rating } from './types/Pet';
import { AuthUser, AuthState } from './types/Auth';

function App() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeSection, setActiveSection] = useState('discover');
  const [pets, setPets] = useState<Pet[]>(mockPets);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [filters, setFilters] = useState<{ petType?: string; purpose?: string }>({});
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  // Get user's pets
  const userPets = authState.user ? pets.filter(pet => authState.user!.petProfiles.includes(pet.id)) : [];

  const handleAuth = (user: AuthUser) => {
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false
    });
    setShowAuthModal(false);
  };

  const handleShowAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleCloseAuth = () => {
    setShowAuthModal(false);
  };

  const handleSwitchAuthMode = (mode: 'login' | 'register') => {
    setAuthMode(mode);
  };

  const handleRate = (petId: string, stars: number) => {
    if (!authState.user) return;

    const newRating: Rating = {
      userId: authState.user.id,
      petId,
      stars,
      timestamp: new Date()
    };

    setRatings(prev => [...prev, newRating]);

    // Update pet's rating
    setPets(prev => prev.map(pet => {
      if (pet.id === petId) {
        const petRatings = [...ratings.filter(r => r.petId === petId), newRating];
        const avgRating = petRatings.reduce((sum, r) => sum + r.stars, 0) / petRatings.length;
        
        return {
          ...pet,
          rating: avgRating,
          ratingCount: petRatings.length
        };
      }
      return pet;
    }));
  };

  const handleRadiusChange = (radius: number) => {
    if (authState.user) {
      setAuthState(prev => ({
        ...prev,
        user: prev.user ? { ...prev.user, discoveryRadius: radius } : null
      }));
    }
  };

  const handleFilterChange = (newFilters: { petType?: string; purpose?: string }) => {
    setFilters(newFilters);
    setSelectedPet(null); // Clear selected pet when filters change
    // Automatically switch to discover section when filters are applied
    if (Object.keys(newFilters).length > 0) {
      setActiveSection('discover');
    }
  };

  const handlePetClick = (pet: Pet) => {
    setSelectedPet(pet);
    setActiveSection('discover');
  };

  const handleBackToDiscover = () => {
    setSelectedPet(null);
  };

  // Show landing page if not authenticated
  if (!authState.isAuthenticated) {
    return (
      <>
        <LandingPage onShowAuth={handleShowAuth} />
        {showAuthModal && (
          <AuthModal
            mode={authMode}
            onClose={handleCloseAuth}
            onAuth={handleAuth}
            onSwitchMode={handleSwitchAuthMode}
          />
        )}
      </>
    );
  }
  const renderSection = () => {
    switch (activeSection) {
      case 'discover':
        return (
          <DiscoverSection
            pets={pets}
            onRate={handleRate}
            filters={filters}
            selectedPet={selectedPet}
            onBackToDiscover={handleBackToDiscover}
          />
        );
      case 'explore':
        return (
          <ExploreSection
            onFilterChange={handleFilterChange}
            activeFilters={filters}
          />
        );
      case 'top-picks':
        return <TopPicksSection pets={pets} onPetClick={handlePetClick} />;
      case 'add-profile':
        return <AddProfileSection />;
      case 'profile':
        return (
          <ProfileSection
            user={authState.user!}
            userPets={userPets}
            onRadiusChange={handleRadiusChange}
          />
        );
      default:
        return (
          <DiscoverSection
            pets={pets}
            onRate={handleRate}
            filters={filters}
            selectedPet={selectedPet}
            onBackToDiscover={handleBackToDiscover}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderSection()}
      <BottomNavigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
    </div>
  );
}

export default App;