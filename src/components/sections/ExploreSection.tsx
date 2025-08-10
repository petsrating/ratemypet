import React from 'react';

interface ExploreSectionProps {
  onFilterChange: (filters: { petType?: string; purpose?: string }) => void;
  activeFilters: { petType?: string; purpose?: string };
}

export function ExploreSection({ onFilterChange, activeFilters }: ExploreSectionProps) {
  const categories = [
    { id: 'dogs', label: 'Dogs', emoji: '🐕', type: 'petType', value: 'Dog', color: 'from-blue-400 to-blue-600' },
    { id: 'cats', label: 'Cats', emoji: '🐱', type: 'petType', value: 'Cat', color: 'from-purple-400 to-purple-600' },
    { id: 'birds', label: 'Birds', emoji: '🦜', type: 'petType', value: 'Bird', color: 'from-green-400 to-green-600' },
    { id: 'livestock', label: 'Livestock', emoji: '🐄', type: 'petType', value: 'Livestock', color: 'from-yellow-400 to-yellow-600' },
    { id: 'pet-services', label: 'Pet Services', emoji: '✂️', type: 'petType', value: 'Pet Services', color: 'from-indigo-400 to-indigo-600' },
    { id: 'pet-products', label: 'Pet Products', emoji: '🛍️', type: 'petType', value: 'Pet Products', color: 'from-red-400 to-red-600' },
    { id: 'others', label: 'Others', emoji: '🐾', type: 'petType', value: 'Other', color: 'from-gray-400 to-gray-600' },
    { id: 'for-sale', label: 'For Sale', emoji: '💰', type: 'purpose', value: 'For Sale', color: 'from-emerald-400 to-emerald-600' },
    { id: 'for-adoption', label: 'For Adoption', emoji: '❤️', type: 'purpose', value: 'For Adoption', color: 'from-pink-400 to-pink-600' },
    { id: 'for-breeding', label: 'For Breeding', emoji: '🏆', type: 'purpose', value: 'For Breeding', color: 'from-amber-400 to-amber-600' },
  ];

  const handleCategoryClick = (category: any) => {
    const newFilters = { ...activeFilters };
    
    if (category.type === 'petType') {
      newFilters.petType = newFilters.petType === category.value ? undefined : category.value;
    } else if (category.type === 'purpose') {
      newFilters.purpose = newFilters.purpose === category.value ? undefined : category.value;
    }
    
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Explore Categories</h1>
          <p className="text-gray-600">Find pets by type or purpose</p>
        </div>

        {/* Active Filters */}
        {(activeFilters.petType || activeFilters.purpose) && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Active filters:</span>
                {activeFilters.petType && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {activeFilters.petType}
                  </span>
                )}
                {activeFilters.purpose && (
                  <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
                    {activeFilters.purpose}
                  </span>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear all
              </button>
            </div>
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {categories.map((category) => {
            const isActive = 
              (category.type === 'petType' && activeFilters.petType === category.value) ||
              (category.type === 'purpose' && activeFilters.purpose === category.value);
            
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`group relative overflow-hidden rounded-2xl p-6 text-white transition-all duration-300 transform hover:scale-105 ${
                  isActive ? 'ring-4 ring-white ring-opacity-50 scale-105' : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} ${
                  isActive ? 'opacity-100' : 'opacity-90 group-hover:opacity-100'
                }`} />
                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-3">{category.emoji}</div>
                  <h3 className="text-lg font-bold mb-1">{category.label}</h3>
                </div>
                
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </button>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <button
            onClick={() => onFilterChange({})}
            className="px-8 py-3 bg-white text-purple-600 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Show All Pets
          </button>
        </div>
      </div>
    </div>
  );
}