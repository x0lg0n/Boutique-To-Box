import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="space-y-3 md:space-y-4 col-span-2 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
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
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered fashion designs, 
              <br className="hidden md:inline" />tailored to your unique style.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-2 md:mb-4">Product</h4>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <Link to="/design" className="text-xs sm:text-sm text-muted-foreground hover:text-fashion-purple">
                  AI Design Generator
                </Link>
              </li>
              <li>
                <Link to="/try-on" className="text-xs sm:text-sm text-muted-foreground hover:text-fashion-purple">
                  3D Try On
                </Link>
              </li>
              <li>
                <Link to="/tailors" className="text-xs sm:text-sm text-muted-foreground hover:text-fashion-purple">
                  Find Tailors
                </Link>
              </li>
              <li>
                <Link to="/trend" className="text-xs sm:text-sm text-muted-foreground hover:text-fashion-purple">
                  Trend Engine
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-2 md:mb-4">Company</h4>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <Link to="/about" className="text-xs sm:text-sm text-muted-foreground hover:text-fashion-purple">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-xs sm:text-sm text-muted-foreground hover:text-fashion-purple">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-xs sm:text-sm text-muted-foreground hover:text-fashion-purple">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-xs sm:text-sm text-muted-foreground hover:text-fashion-purple">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-2 md:mb-4">Legal</h4>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <Link to="/privacy" className="text-xs sm:text-sm text-muted-foreground hover:text-fashion-purple">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-xs sm:text-sm text-muted-foreground hover:text-fashion-purple">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-xs sm:text-sm text-muted-foreground hover:text-fashion-purple">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Boutique to Box. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-fashion-purple">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-fashion-purple">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-fashion-purple">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
