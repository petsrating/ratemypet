export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: 'google' | 'facebook' | 'email';
  location: {
    country: string;
    state: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  discoveryRadius: number;
  petProfiles: string[];
  createdAt: Date;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}