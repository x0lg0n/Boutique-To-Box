
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-fashion-purple text-white p-1 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scissors">
              <circle cx="6" cy="6" r="3" />
              <circle cx="18" cy="18" r="3" />
              <path d="M8.12 8.12 18 18" />
              <path d="M6 14a8 8 0 0 0 8 8" />
              <path d="M18 10a8 8 0 0 0-8-8" />
            </svg>
          </div>
          <span className="text-xl font-bold">ThreadTailor</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-fashion-purple transition-colors">
            Home
          </Link>
          <Link to="/design" className="text-sm font-medium hover:text-fashion-purple transition-colors">
            Design Studio
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-fashion-purple transition-colors">
            About
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-sm hidden md:block">
                Welcome, <span className="font-medium">{user.name || user.email.split('@')[0]}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="flex items-center gap-1"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button 
                className="bg-gradient-to-r from-fashion-purple to-fashion-darkPurple hover:opacity-90 transition-opacity"
                asChild
              >
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
