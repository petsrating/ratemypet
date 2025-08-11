import React, { useState } from 'react';
import { User, Pet } from '../../types/Pet';
import { Settings, MapPin, Edit, Trash2, Plus } from 'lucide-react';

interface ProfileSectionProps {
  user: User;
  userPets: Pet[];
  onRadiusChange: (radius: number) => void;
  onLogout: () => void;
}

export function ProfileSection({ user, userPets, onRadiusChange, onLogout }: ProfileSectionProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [discoveryRadius, setDiscoveryRadius] = useState(user.discoveryRadius);

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRadius = parseInt(e.target.value);
    setDiscoveryRadius(newRadius);
    onRadiusChange(newRadius);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-20 pt-4">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          <div className="flex items-center justify-center text-gray-500 mt-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{user.location.city}, {user.location.state}</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-2xl font-bold text-purple-600 mb-1">{userPets.length}</div>
            <div className="text-sm text-gray-600">Pet Profiles</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-2xl font-bold text-pink-600 mb-1">
              {userPets.reduce((sum, pet) => sum + pet.ratingCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Ratings</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {userPets.length > 0 
                ? (userPets.reduce((sum, pet) => sum + pet.rating, 0) / userPets.length).toFixed(1)
                : '0.0'
              }
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
        </div>

        {/* Discovery Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Discovery Settings
            </h2>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-purple-600 hover:text-purple-700"
            >
              {showSettings ? 'Hide' : 'Show'}
            </button>
          </div>
          
          {showSettings && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discovery Radius: {discoveryRadius} km
              </label>
              <input
                type="range"
                min="5"
                max="200"
                value={discoveryRadius}
                onChange={handleRadiusChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${(discoveryRadius / 200) * 100}%, #E5E7EB ${(discoveryRadius / 200) * 100}%, #E5E7EB 100%)`
                }}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>5 km</span>
                <span>200 km</span>
              </div>
            </div>
          )}
        </div>

        {/* My Pet Profiles */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">My Pet Profiles</h2>
            <button className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Add Pet
            </button>
          </div>
          
          {userPets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userPets.map(pet => (
                <div key={pet.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="flex">
                    <img
                      src={pet.images[0]}
                      alt={pet.name}
                      className="w-32 h-32 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{pet.name}</h3>
                          <p className="text-gray-600 text-sm">{pet.breed} • {pet.age} years</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-500 hover:text-purple-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${
                          pet.purpose === 'For Sale' ? 'bg-green-100 text-green-800' :
                          pet.purpose === 'For Adoption' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {pet.purpose}
                        </span>
                        <div className="text-gray-600">
                          ⭐ {pet.rating.toFixed(1)} ({pet.ratingCount})
                        </div>
                      </div>
                      
                      {pet.featured && (
                        <div className="mt-2">
                          <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">🐾</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No pet profiles yet</h3>
              <p className="text-gray-600 mb-6">Create your first pet profile to get started</p>
              <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Add Your First Pet
              </button>
            </div>
          )}
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Account</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
              Edit Profile Information
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
              Privacy Settings
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
              Notification Preferences
            </button>
            <button 
              onClick={onLogout}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 transition-colors text-red-600"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}