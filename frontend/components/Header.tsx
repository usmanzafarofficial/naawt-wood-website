import React, { useState } from 'react';
import { Page } from '../types';
import { PRODUCT_CATEGORIES } from '../constants';

interface HeaderProps {
  navigateTo: (page: Page, category?: string | null, searchTerm?: string | null) => void;
  currentPage: Page;
  isAdminLoggedIn: boolean;
  onAdminLogout: () => void;
}

const NavLink: React.FC<{
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ onClick, isActive, children, className = '' }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 text-sm font-semibold transition-colors duration-200 whitespace-nowrap flex-shrink-0 ${
      isActive
        ? 'text-green-500'
        : 'text-gray-700 hover:text-green-500'
    } ${className}`}
  >
    {children}
  </button>
);

const SearchBar: React.FC<{ navigateTo: (page: Page, category?: string | null, searchTerm?: string | null) => void; onSearch?: () => void; }> = ({ navigateTo, onSearch }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchValue.trim()) {
            navigateTo('products', null, searchValue.trim());
            setSearchValue('');
            if (onSearch) onSearch();
        }
    };
    
    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search Wooden Pallets, Plastic Crates..."
                className="bg-gray-100 border-2 border-gray-200 text-gray-800 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                aria-label="Search products"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </div>
        </form>
    );
};

const AdminLogin: React.FC<{ onLogin: (isLoggedIn: boolean) => void }> = ({ onLogin }) => {
  return null; // Admin login is now only accessible via /admin route
};

const Header: React.FC<HeaderProps> = ({ navigateTo, currentPage, isAdminLoggedIn, onAdminLogout }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setProductsDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50" role="banner">
      {/* Main Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* UPDATED: Changed h-20 to h-24 to accommodate bigger logo */}
        <div className="flex items-center justify-between h-24"> 
          <div className="flex-shrink-0">
            <button onClick={() => navigateTo('home')} className="flex items-center space-x-3">
              <img 
                src="/images/logofinaltrans.png" 
                alt="NAAWT Logo" 
                // UPDATED: Significantly increased height/width classes for visibility
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain" 
              />
              <span className="lg:hidden text-slate-800 text-base font-extrabold lowercase">nawat</span>
              <span className="hidden lg:inline-block text-slate-800 text-base sm:text-lg md:text-2xl lg:text-3xl font-extrabold tracking-tight">NADEEM AHMED ALUMINUM & WOOD TR LLC</span>
            </button>
          </div>
          <div className="hidden md:flex justify-center flex-grow px-4 md:px-8">
            <SearchBar navigateTo={navigateTo} />
          </div>
          <div className="hidden md:flex items-center space-x-4">
             <button
                onClick={() => navigateTo('quote')}
                className="px-6 py-3 bg-green-500 text-white font-bold rounded-md shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
              >
                GET A QUOTE
              </button>
              {isAdminLoggedIn && (
                <>
                  <button
                    onClick={() => navigateTo('admin')}
                    className="px-4 py-2 bg-green-700 text-white font-bold rounded-md shadow-sm hover:bg-green-800 transition-colors"
                  >
                    Admin
                  </button>
                  <button
                    onClick={onAdminLogout}
                    className="px-4 py-2 bg-red-600 text-white font-bold rounded-md shadow-sm hover:bg-red-700 transition-colors text-sm"
                  >
                    Logout
                  </button>
                </>
              )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

       {/* Navigation Bar */}
      <nav aria-label="Main navigation" className="hidden md:flex container mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-200 items-center h-12">
        <div className="flex items-baseline space-x-4">
            <NavLink onClick={() => navigateTo('home')} isActive={currentPage === 'home'}>Home</NavLink>
            <NavLink onClick={() => navigateTo('about')} isActive={currentPage === 'about'}>About Us</NavLink>
             <div className="relative" onMouseEnter={() => setProductsDropdownOpen(true)} onMouseLeave={() => setProductsDropdownOpen(false)}>
                <NavLink onClick={() => navigateTo('products')} isActive={currentPage === 'products'}>
                  Products & Services
                </NavLink>
                {isProductsDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 animate-fadeInUp" style={{animationDuration: '0.2s'}}>
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      {PRODUCT_CATEGORIES.map(cat => (
                         <button
                           key={cat.slug}
                           onClick={() => { navigateTo('products', cat.slug); setProductsDropdownOpen(false); }}
                           className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                           role="menuitem"
                         >
                           {cat.name}
                         </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            <NavLink onClick={() => navigateTo('sustainability')} isActive={currentPage === 'sustainability'}>Sustainability</NavLink>
            <NavLink onClick={() => navigateTo('gallery')} isActive={currentPage === 'gallery'}>Gallery</NavLink>
            <NavLink onClick={() => navigateTo('contact')} isActive={currentPage === 'contact'}>Contact</NavLink>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-gray-200" role="navigation" aria-label="Mobile menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="px-1 py-2"><SearchBar navigateTo={navigateTo} onSearch={() => setMobileMenuOpen(false)} /></div>
            <button onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }} className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium w-full text-left">Home</button>
            <button onClick={() => { navigateTo('about'); setMobileMenuOpen(false); }} className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium w-full text-left">About Us</button>
            <button onClick={() => { navigateTo('products'); setMobileMenuOpen(false); }} className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium w-full text-left">Products & Services</button>
            <button onClick={() => { navigateTo('sustainability'); setMobileMenuOpen(false); }} className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium w-full text-left">Sustainability</button>
            <button onClick={() => { navigateTo('gallery'); setMobileMenuOpen(false); }} className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium w-full text-left">Gallery</button>
            <button onClick={() => { navigateTo('contact'); setMobileMenuOpen(false); }} className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium w-full text-left">Contact Us</button>
            {isAdminLoggedIn && (
              <>
                <button onClick={() => { navigateTo('admin'); setMobileMenuOpen(false); }} className="mt-4 w-full text-left bg-green-700 text-white font-bold px-3 py-2 rounded-md shadow-sm hover:bg-green-800">Admin</button>
                <button onClick={onAdminLogout} className="mt-2 w-full text-left bg-red-600 text-white font-bold px-3 py-2 rounded-md shadow-sm hover:bg-red-700">Logout</button>
              </>
            )}
            <button onClick={() => { navigateTo('quote'); setMobileMenuOpen(false); }} className="mt-4 w-full text-left bg-green-500 text-white font-bold px-3 py-2 rounded-md shadow-sm hover:bg-green-600">GET A QUOTE</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;