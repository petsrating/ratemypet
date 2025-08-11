import React, { useState } from 'react';
import { X, Mail, Lock, User, MapPin, Eye, EyeOff } from 'lucide-react';
import { AuthUser } from '../../types/Auth';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onAuth: (user: AuthUser) => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
}

// Simple user database simulation
const USERS_KEY = 'pet_app_users';
const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUser = (user: any) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const findUser = (email: string, password: string) => {
  const users = getUsers();
  return users.find((u: any) => u.email === email && u.password === password);
};

const userExists = (email: string) => {
  const users = getUsers();
  return users.some((u: any) => u.email === email);
};

export function AuthModal({ mode, onClose, onAuth, onSwitchMode }: AuthModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    state: '',
    country: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(''); // Clear error when user types
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }

    if (mode === 'register') {
      if (!formData.name) {
        setError('Name is required');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
      if (userExists(formData.email)) {
        setError('User with this email already exists');
        return false;
      }
    }

    return true;
  };

  const handleSocialAuth = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    setError('');
    
    // Simulate social auth
    setTimeout(() => {
      const mockUser: AuthUser = {
        id: `user_${Date.now()}`,
        name: provider === 'google' ? 'John Doe' : 'Jane Smith',
        email: provider === 'google' ? 'john@gmail.com' : 'jane@facebook.com',
        avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100`,
        provider,
        location: {
          country: 'USA',
          state: 'California',
          city: 'Los Angeles',
          coordinates: { lat: 34.0522, lng: -118.2437 }
        },
        discoveryRadius: 50,
        petProfiles: [],
        createdAt: new Date()
      };
      
      onAuth(mockUser);
      setIsLoading(false);
    }, 1500);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');
    
    // Simulate API delay
    setTimeout(() => {
      try {
        if (mode === 'login') {
          // Login logic
          const user = findUser(formData.email, formData.password);
          if (!user) {
            setError('Invalid email or password');
            setIsLoading(false);
            return;
          }

          const authUser: AuthUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            provider: 'email',
            location: user.location,
            discoveryRadius: user.discoveryRadius || 50,
            petProfiles: user.petProfiles || [],
            createdAt: new Date(user.createdAt)
          };

          onAuth(authUser);
        } else {
          // Register logic
          const newUser = {
            id: `user_${Date.now()}`,
            name: formData.name,
            email: formData.email,
            password: formData.password,
            location: {
              country: formData.country || 'USA',
              state: formData.state || 'California',
              city: formData.city || 'Los Angeles',
              coordinates: { lat: 34.0522, lng: -118.2437 }
            },
            discoveryRadius: 50,
            petProfiles: [],
            createdAt: new Date()
          };

          saveUser(newUser);

          const authUser: AuthUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            provider: 'email',
            location: newUser.location,
            discoveryRadius: newUser.discoveryRadius,
            petProfiles: newUser.petProfiles,
            createdAt: newUser.createdAt
          };

          onAuth(authUser);
        }
        
        setIsLoading(false);
      } catch (err) {
        setError('An error occurred. Please try again.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {mode === 'login' ? 'Welcome Back' : 'Join PetMatch'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Social Auth Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialAuth('google')}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                className="w-5 h-5 mr-3"
              />
              Continue with Google
            </button>
            
            <button
              onClick={() => handleSocialAuth('facebook')}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <div className="w-5 h-5 bg-white rounded mr-3 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">f</span>
              </div>
              Continue with Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location (Optional)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder="City"
                    />
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder="State"
                    />
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder="Country"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => onSwitchMode(mode === 'login' ? 'register' : 'login')}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}