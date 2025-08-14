
import React, { createContext, useContext, useState, useEffect } from 'react';
import { googleAuth, GoogleUser } from '@/services/googleAuth';

type User = {
  id?: string;
  name?: string;
  email: string;
  picture?: string;
  authProvider?: 'email' | 'google';
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: (googleUser: GoogleUser) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Check if user is authenticated with Google
    if (googleAuth.isAuthenticated()) {
      googleAuth.getCurrentUser().then(googleUser => {
        if (googleUser) {
          const user: User = {
            id: googleUser.id,
            name: googleUser.name,
            email: googleUser.email,
            picture: googleUser.picture,
            authProvider: 'google'
          };
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
        }
      }).catch(() => {
        // Google token might be invalid
        googleAuth.clearTokens();
      });
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, we would call an API here
    // For now, let's simulate a login
    const user: User = { email, authProvider: 'email' };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const signup = async (name: string, email: string, password: string) => {
    // In a real app, we would call an API here
    // For now, let's simulate a signup
    const user: User = { name, email, authProvider: 'email' };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const loginWithGoogle = async (googleUser: GoogleUser) => {
    const user: User = {
      id: googleUser.id,
      name: googleUser.name,
      email: googleUser.email,
      picture: googleUser.picture,
      authProvider: 'google'
    };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    
    // If user was authenticated with Google, sign out from Google too
    if (user?.authProvider === 'google') {
      googleAuth.signOut().catch(console.error);
    }
  };

  const value = {
    user,
    login,
    signup,
    loginWithGoogle,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
