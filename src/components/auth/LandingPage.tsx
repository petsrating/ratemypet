import React from 'react';
import { Heart, Star, Users, MapPin } from 'lucide-react';

interface LandingPageProps {
  onShowAuth: (mode: 'login' | 'register') => void;
}

export function LandingPage({ onShowAuth }: LandingPageProps) {
  const features = [
    {
      icon: Heart,
      title: 'Find Perfect Pets',
      description: 'Discover amazing pets in your area looking for homes or breeding'
    },
    {
      icon: Star,
      title: 'Rate & Review',
      description: 'Help the community by rating pets and sharing your experience'
    },
    {
      icon: Users,
      title: 'Connect with Owners',
      description: 'Connect directly with pet owners and breeders in your area'
    },
    {
      icon: MapPin,
      title: 'Location Based',
      description: 'Find pets within your preferred distance radius'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
                Pets<span className="text-purple-600">Rating</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              The ultimate platform to discover, rate, and connect with amazing pets in your area. 
              Find your perfect companion or help others find theirs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onShowAuth('register')}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Started Free
              </button>
              <button
                onClick={() => onShowAuth('login')}
                className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg border-2 border-purple-200 hover:border-purple-300 transition-all duration-300"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* App Preview */}
          <div className="max-w-md mx-auto mb-16">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full"></div>
                    <span className="font-medium">Rate My Pet</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=500"
                  alt="Sample pet"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="w-8 h-8 text-white fill-yellow-400 cursor-pointer hover:scale-110 transition-transform" />
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Luna</h3>
                <p className="text-gray-600 mb-2">Golden Retriever • 3 years</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  Los Angeles, CA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose PetMatch?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Perfect Pet?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of pet lovers already using PetMatch
          </p>
          <button
            onClick={() => onShowAuth('register')}
            className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
}