import React from 'react';
import { Search, Compass, Award, Plus, User } from 'lucide-react';

interface BottomNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function BottomNavigation({ activeSection, onSectionChange }: BottomNavigationProps) {
  const navItems = [
    { id: 'discover', label: 'Discover', icon: Search },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'top-picks', label: 'Top Picks', icon: Award },
    { id: 'add-profile', label: 'Add Pet', icon: Plus },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-500 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}