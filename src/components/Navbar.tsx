import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Menu, X, ChevronDown, LayoutDashboard } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
          <span className="text-xl font-bold">Boutique to Box</span>
        </Link>
        
        {/* Desktop Navigation */}
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
        
        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-sm hidden md:block">
                Welcome, <span className="font-medium">{user.name || user.email.split('@')[0]}</span>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    My Account <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center gap-2 w-full cursor-pointer">
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
                    <LogOut size={16} />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
                <Link to="/login">Sign In</Link>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    className="bg-gradient-to-r from-fashion-purple to-fashion-darkPurple hover:opacity-90 transition-opacity flex items-center gap-1"
                    size="sm"
                  >
                    Get Started <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/signup" className="w-full cursor-pointer">
                      Sign Up
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/design" className="w-full cursor-pointer">
                      Try Design Studio
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden" 
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-sm">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-base font-medium hover:text-fashion-purple transition-colors px-2 py-1"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/design" 
                className="text-base font-medium hover:text-fashion-purple transition-colors px-2 py-1"
                onClick={toggleMobileMenu}
              >
                Design Studio
              </Link>
              <Link 
                to="/about" 
                className="text-base font-medium hover:text-fashion-purple transition-colors px-2 py-1"
                onClick={toggleMobileMenu}
              >
                About
              </Link>
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-base font-medium hover:text-fashion-purple transition-colors px-2 py-1"
                    onClick={toggleMobileMenu}
                  >
                    Dashboard
                  </Link>
                  <button 
                    className="text-base font-medium hover:text-fashion-purple transition-colors px-2 py-1 text-left"
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-base font-medium hover:text-fashion-purple transition-colors px-2 py-1 sm:hidden"
                    onClick={toggleMobileMenu}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup" 
                    className="text-base font-medium hover:text-fashion-purple transition-colors px-2 py-1"
                    onClick={toggleMobileMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
