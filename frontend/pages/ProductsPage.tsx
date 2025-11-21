import React, { useState, useMemo, useEffect } from 'react';
import { Product, Page } from '../types';
import { PRODUCTS, PRODUCT_CATEGORIES } from '../constants';
import { getProducts } from '../services/api';

interface ProductsPageProps {
  initialCategory: string | null;
  searchTerm: string | null;
  navigateTo: (page: Page, category?: string, searchTerm?: string | null) => void;
}

// --- Loading Component (New) ---
const LoadingSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-200"></div>
        <div className="p-6">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
          <div className="h-10 bg-green-200 rounded-md mt-6"></div>
        </div>
      </div>
    ))}
  </div>
);
// --- End Loading Component ---


// --- ProductCard Component (Minor improvements) ---
const ProductCard: React.FC<{ product: Product; navigateTo: (page: Page) => void; }> = ({ product, navigateTo }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const hasMoreDetails = product.specifications.treatment || product.specifications.weight || product.specifications.entryPoints || product.specifications.notes;

  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="p-4 md:p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-800">{product.name}</h3>
        <p className="mt-2 text-gray-600 flex-grow text-sm">{product.description}</p>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <ul className="text-sm text-gray-600 space-y-2">
            <li><strong className="text-slate-700">Dimensions:</strong> {product.specifications.dimensions}</li>
            <li><strong className="text-slate-700">Material:</strong> {product.specifications.material}</li>
            <li><strong className="text-slate-700">Load Capacity:</strong> {product.specifications.loadCapacity}</li>
          </ul>
        </div>
        
        {hasMoreDetails && (
          <div className="mt-4">
            <button
              onClick={() => setIsDetailsVisible(!isDetailsVisible)}
              className="text-sm font-semibold text-green-600 hover:text-green-800 flex items-center transition-colors"
              aria-expanded={isDetailsVisible}
            >
              {isDetailsVisible ? 'Hide Specifications' : 'View Full Specifications'}
              <svg className={`w-4 h-4 ml-2 transform transition-transform duration-300 ${isDetailsVisible ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isDetailsVisible ? 'max-h-96 mt-2' : 'max-h-0'}`}>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <ul className="text-sm text-gray-600 space-y-2">
                  {product.specifications.treatment && <li><strong className="text-slate-700">Treatment:</strong> {product.specifications.treatment}</li>}
                  {product.specifications.weight && <li><strong className="text-slate-700">Approx. Weight:</strong> {product.specifications.weight}</li>}
                  {product.specifications.entryPoints && <li><strong className="text-slate-700">Entry Points:</strong> {product.specifications.entryPoints}</li>}
                  {product.specifications.notes && <li className="pt-2 italic"><strong>Note:</strong> {product.specifications.notes}</li>}
                </ul>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={() => navigateTo('quote')}
          // Unify CTA color to a strong green
          className="mt-6 w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 transform hover:scale-[1.01]"
        >
          Request a Quote
        </button>
      </div>
    </div>
  );
};
// --- End ProductCard Component ---


// --- PalletCollectionService Component (CTA color change) ---
const PalletCollectionService: React.FC<{ navigateTo: (page: Page) => void; }> = ({ navigateTo }) => (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl border border-gray-200 md:col-span-3 lg:col-span-4">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <img src="https://picsum.photos/seed/collection-page/800/600" alt="Pallet collection truck" className="rounded-lg shadow-lg w-full h-auto object-cover" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Pallet Collection & Recycling Service</h2>
              <p className="mt-4 text-base sm:text-lg text-gray-600">
                Have surplus, unwanted, or scrap pallets taking up valuable space? Our nationwide collection service is the perfect solution. We help you manage your waste stream responsibly and can even offer payment or credit for reusable pallets.
              </p>
              <ul className="mt-6 space-y-3 text-gray-700">
                <li className="flex items-start"><svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><strong className="font-semibold">Nationwide coverage</strong> for businesses of all sizes.</li>
                <li className="flex items-start"><svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><strong className="font-semibold">Competitive rebates</strong> for good quality reusable pallets.</li>
                <li className="flex items-start"><svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><strong className="font-semibold">Environmentally responsible</strong> disposal and recycling.</li>
              </ul>
              <button 
                onClick={() => navigateTo('quote')}
                // Unify CTA color to a strong green
                className="mt-8 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-xl"
              >
                Arrange a Collection
              </button>
            </div>
      </div>
    </div>
);
// --- End PalletCollectionService Component ---


const ProductsPage: React.FC<ProductsPageProps> = ({ initialCategory, searchTerm, navigateTo }) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'all');
  const [displayProducts, setDisplayProducts] = useState<Product[] | null>(null); // Initialize to null for loading state
  const [isLoading, setIsLoading] = useState(true); // New loading state

  // Load products from backend API, fallback to localStorage or constants
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const productsFromApi = await getProducts();
        
        const normalized = (productsFromApi || []).map((p: any) => ({
          ...p,
          specifications: typeof p.specifications === 'string' ? JSON.parse(p.specifications) : (p.specifications || {}),
        }));

        if (!mounted) return;
        setDisplayProducts(normalized);
        localStorage.setItem('appProducts', JSON.stringify(normalized));
      } catch (err) {
        // API failed — try localStorage
        const savedProducts = localStorage.getItem('appProducts');
        if (savedProducts) {
          try {
            setDisplayProducts(JSON.parse(savedProducts));
            return;
          } catch (_) {}
        }
        // Fallback to built-in constants
        setDisplayProducts(PRODUCTS);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (searchTerm) {
        setActiveCategory('all');
    } else {
      setActiveCategory(initialCategory || 'all');
    }
  }, [searchTerm, initialCategory]);

  const filteredProducts = useMemo(() => {
    if (!displayProducts) return []; // Handle loading state early
    
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      return displayProducts.filter(p => 
        p.name.toLowerCase().includes(lowercasedTerm) ||
        p.description.toLowerCase().includes(lowercasedTerm)
      );
    }
    if (activeCategory === 'all') {
      return displayProducts;
    }
    return displayProducts.filter(p => p.categorySlug === activeCategory);
  }, [activeCategory, searchTerm, displayProducts]);
  

  const handleCategoryClick = (slug: string) => {
    navigateTo('products', slug, null);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Our Products & Services</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
            Find the perfect pallet solution for your business needs.
          </p>
        </div>

        {searchTerm && (
          <div className="text-center mb-8 bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
              <p className="text-lg text-gray-800">
                  Showing results for: <strong className="font-extrabold text-slate-900">"{searchTerm}"</strong>
              </p>
              <button
                  onClick={() => navigateTo('products', 'all', null)}
                  className="mt-2 text-sm font-semibold text-red-600 hover:text-red-800 hover:underline"
              >
                  Clear Search
              </button>
          </div>
        )}

        {/* Category Filter Buttons (Enhanced Active State) */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => handleCategoryClick('all')}
            disabled={!!searchTerm}
            className={`px-5 py-2 text-sm font-bold rounded-full transition-all duration-200 shadow-sm
              ${activeCategory === 'all' && !searchTerm 
                ? 'bg-green-600 text-white shadow-lg border border-green-700' 
                : 'bg-white text-slate-700 hover:bg-gray-200 border border-gray-300'} 
              ${searchTerm ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            All Products
          </button>
          {PRODUCT_CATEGORIES.map(cat => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryClick(cat.slug)}
              disabled={!!searchTerm}
              className={`px-5 py-2 text-sm font-bold rounded-full transition-all duration-200 shadow-sm
                ${activeCategory === cat.slug && !searchTerm 
                  ? 'bg-green-600 text-white shadow-lg border border-green-700' 
                  : 'bg-white text-slate-700 hover:bg-gray-200 border border-gray-300'} 
                ${searchTerm ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        
        {/* Product/Service Display Area */}
        {activeCategory === 'collection' && !searchTerm ? (
          <PalletCollectionService navigateTo={navigateTo} />
        ) : (
          <>
            {isLoading ? (
              <LoadingSkeleton />
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} navigateTo={navigateTo} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-md border">
                <h3 className="text-2xl font-semibold text-gray-700">No Products Found</h3>
                <p className="mt-2 text-gray-500 max-w-md mx-auto">
                  We couldn't find any products matching your search "<strong className="text-gray-700">{searchTerm}</strong>". Try a different keyword or clear the search to browse all products.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;