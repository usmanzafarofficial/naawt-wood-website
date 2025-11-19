import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { getProducts, createQuote } from '../services/api'; // Add createQuote import

interface Product {
  id: number;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  imageUrl: string;
  specifications: any;
}

interface QuotePageProps {
  navigateTo: (page: Page) => void;
  initialProduct?: string;
}

const QuotePage: React.FC<QuotePageProps> = ({ navigateTo, initialProduct = '' }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>(initialProduct ? [parseInt(initialProduct)] : []);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerCompany: '',
    details: '',
    deliveryDate: '',
    specialRequirements: '',
    address: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        // If initialProduct is provided and it's an ID, pre-select it
        if (initialProduct) {
          const productId = parseInt(initialProduct);
          if (!isNaN(productId) && data.some(p => p.id === productId)) {
            setSelectedProducts([productId]);
          }
        }
      } catch (err) {
        setError('Failed to load products');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [initialProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductToggle = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setError('');

    if (selectedProducts.length === 0) {
      setError('Please select at least one product for the quote');
      setIsSubmitting(false);
      return;
    }

    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || !formData.address) {
      setError('Please fill in all required fields (Name, Email, Phone, Address)');
      setIsSubmitting(false);
      return;
    }

    try {
      const quoteData = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        customerCompany: formData.customerCompany,
        productIds: selectedProducts,
        details: formData.details,
        deliveryDate: formData.deliveryDate,
        specialRequirements: formData.specialRequirements,
        address: formData.address,
      };

      // Use the createQuote function from api.ts
      await createQuote(quoteData);

      setIsSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      // Provide a more user-friendly error message
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('Network error: Could not connect to the server. Please check if your backend is running.');
      } else if (err instanceof SyntaxError && err.message.includes('JSON')) {
        setError('Server response error: The server returned an unexpected response format. Please check the server logs.');
      } else {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred while submitting the quote.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Your quote request has been submitted successfully. Our team will contact you within 24 hours.
            </p>
            <button
              onClick={() => navigateTo('products')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition duration-300 text-sm sm:text-base"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Request a Quote</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Fill out the form below and we'll get back to you with a competitive quote
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gray-50 p-4 sm:p-6 md:p-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Selected Products</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {selectedProducts.length === 0 ? (
                  <p className="text-gray-500 italic">No products selected yet</p>
                ) : (
                  selectedProducts.map(productId => {
                    const product = products.find(p => p.id === productId);
                    return product ? (
                      <div key={product.id} className="border-b border-gray-200 pb-3">
                        <h3 className="font-semibold text-sm sm:text-base text-gray-700">{product.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{product.description}</p>
                      </div>
                    ) : null;
                  })
                )}
              </div>
            </div>
            
            <div className="md:w-2/3 p-4 sm:p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Selection Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Products *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                    {products.map(product => (
                      <div 
                        key={product.id}
                        className={`p-3 rounded cursor-pointer transition-all ${
                          selectedProducts.includes(product.id)
                            ? 'bg-green-100 border-2 border-green-500'
                            : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                        }`}
                        onClick={() => handleProductToggle(product.id)}
                      >
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => handleProductToggle(product.id)}
                            className="mt-1 mr-2 h-4 w-4 text-green-600 rounded focus:ring-green-500"
                          />
                          <div>
                            <h3 className="font-medium text-slate-800 text-sm">{product.name}</h3>
                            <p className="text-xs text-gray-600 truncate">{product.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                    <input
                      type="date"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
                    <input
                      type="text"
                      name="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={handleChange}
                      placeholder="e.g. Heat treated, custom color"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Information *</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input
                        type="text"
                        name="customerCompany"
                        value={formData.customerCompany}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                      <input
                        type="tel"
                        name="customerPhone"
                        value={formData.customerPhone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    ></textarea>
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
                    <textarea
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us more about your requirements..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    ></textarea>
                  </div>
                </div>
                
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-bold py-3 px-4 rounded-lg transition duration-300 ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePage;