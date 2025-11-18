import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import SustainabilityPage from './pages/SustainabilityPage';
import ContactPage from './pages/ContactPage';
import QuotePage from './pages/QuotePage';
import GalleryPage from './pages/GalleryPage';
import AdminPage from './pages/AdminPage';
import AdminLogin from './pages/AdminLogin';
import { Page } from './types';
import { PRODUCT_CATEGORIES } from './constants';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [productCategory, setProductCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [quoteProduct, setQuoteProduct] = useState<string>('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Handle URL routing and admin session on mount and URL change
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdminLoggedIn(true);
    }

    // Handle URL-based routing
    const handleRouting = () => {
      const path = window.location.pathname;
      const hash = window.location.hash.toLowerCase();

      // Check for /admin path or #admin hash
      if (path.includes('/admin') || hash.includes('admin')) {
        setCurrentPage('admin');
        return;
      }

      // Check for other routes
      if (path.includes('/about') || hash.includes('about')) {
        setCurrentPage('about');
      } else if (path.includes('/products') || hash.includes('products')) {
        setCurrentPage('products');
      } else if (path.includes('/sustainability') || hash.includes('sustainability')) {
        setCurrentPage('sustainability');
      } else if (path.includes('/contact') || hash.includes('contact')) {
        setCurrentPage('contact');
      } else if (path.includes('/quote') || hash.includes('quote')) {
        setCurrentPage('quote');
      } else if (path.includes('/gallery') || hash.includes('gallery')) {
        setCurrentPage('gallery');
      } else {
        setCurrentPage('home');
      }
    };

    // Handle initial route
    handleRouting();

    // Listen for URL changes
    window.addEventListener('hashchange', handleRouting);
    window.addEventListener('popstate', handleRouting);

    return () => {
      window.removeEventListener('hashchange', handleRouting);
      window.removeEventListener('popstate', handleRouting);
    };
  }, []);

  const handleAdminLogin = (token: string) => {
    setIsAdminLoggedIn(true);
    setCurrentPage('admin');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    setIsAdminLoggedIn(false);
    setCurrentPage('home');
  };

  const navigateTo = useCallback((page: Page, category: string | null = null, newSearchTerm: string | null = null) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);

    // Update URL based on page
    if (page === 'home') {
      window.history.pushState({}, '', '/');
    } else if (page === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else if (page === 'products') {
      window.history.pushState({}, '', '/products');
    } else if (page === 'about') {
      window.history.pushState({}, '', '/about');
    } else if (page === 'sustainability') {
      window.history.pushState({}, '', '/sustainability');
    } else if (page === 'contact') {
      window.history.pushState({}, '', '/contact');
    } else if (page === 'quote') {
      window.history.pushState({}, '', '/quote');
    } else if (page === 'gallery') {
      window.history.pushState({}, '', '/gallery');
    }

    // Handle quote navigation with product information
    if (page === 'quote' && category) {
      const productName = PRODUCT_CATEGORIES.find(cat => cat.slug === category)?.name || '';
      setQuoteProduct(productName);
    } else {
      setQuoteProduct('');
    }

    // If a new search is initiated, clear the category and set the search term.
    // If a category is chosen, clear the search term.
    if (newSearchTerm !== null && newSearchTerm !== undefined) {
      setSearchTerm(newSearchTerm.trim() === '' ? null : newSearchTerm);
      setProductCategory(null); // A search overrides the category
    } else {
      setSearchTerm(null);
      setProductCategory(category);
    }
  }, []);

  // If admin is logged in and trying to access admin, show admin page
  if (isAdminLoggedIn && currentPage === 'admin') {
    return (
      <div className="bg-white min-h-screen flex flex-col font-sans text-gray-800">
        <Header navigateTo={navigateTo} currentPage={currentPage} isAdminLoggedIn={isAdminLoggedIn} onAdminLogout={handleAdminLogout} />
        <main className="flex-grow">
          <AdminPage navigateTo={navigateTo} onLogout={handleAdminLogout} />
        </main>
        <Footer navigateTo={navigateTo} />
        <ChatWidget />
      </div>
    );
  }

  // If not logged in and trying to access admin, show login
  if (!isAdminLoggedIn && currentPage === 'admin') {
    return <AdminLogin onLoginSuccess={handleAdminLogin} navigateTo={navigateTo} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigateTo={navigateTo} />;
      case 'about':
        return <AboutPage />;
      case 'products':
        return <ProductsPage initialCategory={productCategory} searchTerm={searchTerm} navigateTo={navigateTo} />;
      case 'sustainability':
        return <SustainabilityPage />;
      case 'contact':
        return <ContactPage />;
      case 'quote':
        return <QuotePage navigateTo={navigateTo} initialProduct={quoteProduct} />;
      case 'gallery':
        return <GalleryPage />;
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans text-gray-800">
      <Header navigateTo={navigateTo} currentPage={currentPage} isAdminLoggedIn={isAdminLoggedIn} onAdminLogout={handleAdminLogout} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer navigateTo={navigateTo} />
      <ChatWidget />
    </div>
  );
};

export default App;