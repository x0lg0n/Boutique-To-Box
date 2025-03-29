
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Navbar = () => {
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
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button 
            className="bg-gradient-to-r from-fashion-purple to-fashion-darkPurple hover:opacity-90 transition-opacity"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
