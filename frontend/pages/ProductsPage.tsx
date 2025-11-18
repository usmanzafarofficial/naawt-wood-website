import React, { useState, useMemo, useEffect } from 'react';
import { Product, Page } from '../types';
import { PRODUCTS, PRODUCT_CATEGORIES } from '../constants';
import { getProducts } from '../services/api';

interface ProductsPageProps {
  initialCategory: string | null;
  searchTerm: string | null;
  navigateTo: (page: Page, category?: string, searchTerm?: string | null) => void;
}

const ProductCard: React.FC<{ product: Product; navigateTo: (page: Page) => void; }> = ({ product, navigateTo }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const hasMoreDetails = product.specifications.treatment || product.specifications.weight || product.specifications.entryPoints || product.specifications.notes;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* Changed height from h-56 to h-48 for better mobile aspect ratio */}
      <div className="relative h-48 overflow-hidden">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      {/* Changed padding from p-6 to responsive p-4 md:p-6 */}
      <div className="p-4 md:p-6 flex flex-col flex-grow">
        {/* Changed text size to be responsive */}
        <h3 className="text-lg md:text-xl font-bold text-slate-800">{product.name}</h3>
        <p className="mt-2 text-gray-600 flex-grow text-sm md:text-base">{product.description}</p>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <ul className="text-sm text-gray-600 space-y-2">
            <li><strong>Dimensions:</strong> {product.specifications.dimensions}</li>
            <li><strong>Material:</strong> {product.specifications.material}</li>
            <li><strong>Load Capacity:</strong> {product.specifications.loadCapacity}</li>
          </ul>
        </div>
        
        {hasMoreDetails && (
          <div className="mt-4">
            <button
              onClick={() => setIsDetailsVisible(!isDetailsVisible)}
              className="text-sm font-semibold text-green-600 hover:text-green-800 flex items-center transition-colors"
              aria-expanded={isDetailsVisible}
            >
              {isDetailsVisible ? 'Hide Details' : 'View More Details'}
              <svg className={`w-4 h-4 ml-2 transform transition-transform duration-300 ${isDetailsVisible ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isDetailsVisible ? 'max-h-96 mt-2' : 'max-h-0'}`}>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <ul className="text-sm text-gray-600 space-y-2">
                  {product.specifications.treatment && <li><strong>Treatment:</strong> {product.specifications.treatment}</li>}
                  {product.specifications.weight && <li><strong>Approx. Weight:</strong> {product.specifications.weight}</li>}
                  {product.specifications.entryPoints && <li><strong>Entry Points:</strong> {product.specifications.entryPoints}</li>}
                  {product.specifications.notes && <li className="pt-2 italic"><strong>Note:</strong> {product.specifications.notes}</li>}
                </ul>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={() => navigateTo('quote')}
          className="mt-6 w-full bg-slate-800 text-white font-bold py-3 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
        >
          Get a Quote
        </button>
      </div>
    </div>
  );
};


const PalletCollectionService: React.FC<{ navigateTo: (page: Page) => void; }> = ({ navigateTo }) => (
    // Changed padding to be responsive
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl border border-gray-200 md:col-span-3 lg:col-span-4">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <img src="https://picsum.photos/seed/collection-page/800/600" alt="Pallet collection truck" className="rounded-lg shadow-lg w-full h-auto object-cover" />
            <div>
                {/* Changed text size to be responsive */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Pallet Collection & Recycling Service</h2>
                <p className="mt-4 text-base sm:text-lg text-gray-600">
                    Have surplus, unwanted, or scrap pallets taking up valuable space? Our nationwide collection service is the perfect solution. We help you manage your waste stream responsibly and can even offer payment or credit for reusable pallets.
                </p>
                <ul className="mt-6 space-y-3 text-gray-700">
                    <li className="flex items-start"><svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>Nationwide coverage for businesses of all sizes.</span></li>
                    <li className="flex items-start"><svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>Competitive rebates for good quality reusable pallets.</span></li>
                    <li className="flex items-start"><svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><span>Environmentally responsible disposal and recycling.</span></li>
                </ul>
                <button 
                  onClick={() => navigateTo('quote')}
                  className="mt-8 bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105 shadow-md"
                >
                    Arrange a Collection
                </button>
            </div>
        </div>
    </div>
);


const ProductsPage: React.FC<ProductsPageProps> = ({ initialCategory, searchTerm, navigateTo }) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'all');
  const [displayProducts, setDisplayProducts] = useState<Product[]>(PRODUCTS);

  // Load products from backend API, fallback to localStorage or constants
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const productsFromApi = await getProducts();

        // Ensure specifications are objects (API may store JSON string)
        const normalized = (productsFromApi || []).map((p: any) => ({
          ...p,
          specifications: typeof p.specifications === 'string' ? JSON.parse(p.specifications) : (p.specifications || {}),
        }));

        if (!mounted) return;
        setDisplayProducts(normalized);
        // cache to localStorage for faster loads / offline
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
    <div className="bg-gray-50">
      {/* Changed vertical padding to be responsive */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="text-center mb-12">
          {/* Changed header text size to be responsive */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Our Products & Services</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
            Find the perfect pallet solution for your business needs.
          </p>
        </div>

        {searchTerm && (
          <div className="text-center mb-8 bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
              <p className="text-lg text-gray-800">
                  Showing results for: <strong className="font-semibold text-slate-800">"{searchTerm}"</strong>
              </p>
              <button
                  onClick={() => navigateTo('products', 'all', null)}
                  className="mt-2 text-sm font-semibold text-red-600 hover:underline"
              >
                  Clear Search
              </button>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => handleCategoryClick('all')}
            disabled={!!searchTerm}
            className={`px-5 py-2 text-sm font-bold rounded-full transition-all duration-200 ${activeCategory === 'all' && !searchTerm ? 'bg-slate-800 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-gray-200 border border-gray-300'} ${searchTerm ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            All Products
          </button>
          {PRODUCT_CATEGORIES.map(cat => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryClick(cat.slug)}
              disabled={!!searchTerm}
              className={`px-5 py-2 text-sm font-bold rounded-full transition-all duration-200 ${activeCategory === cat.slug && !searchTerm ? 'bg-slate-800 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-gray-200 border border-gray-300'} ${searchTerm ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        
        {activeCategory === 'collection' && !searchTerm ? (
          <PalletCollectionService navigateTo={navigateTo} />
        ) : (
          <>
              {filteredProducts.length > 0 ? (
                  // Changed gap to be responsive
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                      {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} navigateTo={navigateTo} />
                      ))}
                  </div>
              ) : (
                  <div className="text-center py-16 bg-white rounded-lg shadow-md border">
                      <h3 className="text-2xl font-semibold text-gray-700">No Products Found</h3>
                      <p className="mt-2 text-gray-500 max-w-md mx-auto">
                          We couldn't find any products matching your search "{searchTerm}". Try a different keyword or clear the search to browse all products.
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