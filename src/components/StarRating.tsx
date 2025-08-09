import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating?: number;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onRate?: (rating: number) => void;
  showCount?: number;
}

export function StarRating({ 
  rating = 0, 
  interactive = false, 
  size = 'md', 
  onRate,
  showCount 
}: StarRatingProps) {
  const [hoveredStar, setHoveredStar] = React.useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const handleStarClick = (starValue: number) => {
    if (interactive && onRate) {
      onRate(starValue);
    }
  };

  const getStarFill = (starIndex: number) => {
    const currentRating = interactive ? (hoveredStar || rating) : rating;
    
    if (starIndex <= Math.floor(currentRating)) {
      return '#FFD700'; // Gold for full stars
    } else if (starIndex === Math.ceil(currentRating) && currentRating % 1 !== 0) {
      return `url(#gradient-${starIndex})`; // Partial fill for half stars
    } else {
      return interactive && hoveredStar >= starIndex ? '#FFD700' : '#E5E7EB'; // Gray for empty stars
    }
  };

  return (
    <div className="flex items-center space-x-1">
      <svg width="0" height="0">
        <defs>
          {[1, 2, 3, 4, 5].map(i => (
            <linearGradient key={i} id={`gradient-${i}`}>
              <stop offset={`${(rating % 1) * 100}%`} stopColor="#FFD700" />
              <stop offset={`${(rating % 1) * 100}%`} stopColor="#E5E7EB" />
            </linearGradient>
          ))}
        </defs>
      </svg>
      
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${interactive ? 'cursor-pointer transition-all duration-200' : ''}`}
          fill={getStarFill(star)}
          stroke={getStarFill(star)}
          onMouseEnter={() => interactive && setHoveredStar(star)}
          onMouseLeave={() => interactive && setHoveredStar(0)}
          onClick={() => handleStarClick(star)}
        />
      ))}
      
      {showCount && (
        <span className="text-sm text-gray-600 ml-2">({showCount})</span>
      )}
    </div>
  );
}