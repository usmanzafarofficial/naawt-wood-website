import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">About NAAWT</h1>
            <p className="text-base sm:text-lg text-green-100">
              NAAWT (NADEEM AHMED ALUMINUM & WOOD TR LLC) is a UAE-based manufacturer, refurbisher and recycler of industrial pallets and timber products.
            </p>
          </div>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://picsum.photos/seed/who-we-are/600/400" 
                alt="NAAWT Manufacturing Facility" 
                className="rounded-lg shadow-md w-full h-auto object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Who We Are</h2>
              <p className="text-sm sm:text-base text-gray-700 mb-3">
                Established with a commitment to quality and environmental responsibility, NAAWT provides end-to-end pallet services — from bespoke manufacturing and heat treatment for export to large-scale refurbishment and sustainable disposal.
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                We serve manufacturers, distributors, retailers and exporters, supplying new pallets built to specification as well as inspected, grade-A refurbished pallets.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Values Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-8">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Quality</h3>
              <p className="text-sm text-gray-600">
                Delivering products that meet the highest standards of durability and performance.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-sm text-gray-600">
                Leading the industry in responsible sourcing, pallet refurbishment, and waste reduction.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Service</h3>
              <p className="text-sm text-gray-600">
                Building lasting partnerships through responsive, expert, and customer-focused service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Operations Section */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Our Operations</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
              State-of-the-art facilities and processes ensuring quality and efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Manufacturing</h3>
              <img 
                src="https://picsum.photos/seed/manufacturing/500/300" 
                alt="Pallet Manufacturing Process" 
                className="rounded-lg w-full h-32 object-cover mb-3"
              />
              <p className="text-sm text-gray-600">
                Utilising high-grade timber and precision engineering to create durable, custom pallets.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Sustainability</h3>
              <img 
                src="https://picsum.photos/seed/sustainability/500/300" 
                alt="Sustainable Pallet Recycling" 
                className="rounded-lg w-full h-32 object-cover mb-3"
              />
              <p className="text-sm text-gray-600">
                Committed to environmental responsibility through refurbishment and recycling programs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications & Accreditations (Updated) */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-8">Our Standards</h2>
          <p className="text-center text-sm sm:text-base text-gray-600 max-w-xl mx-auto mb-8">
            Adhering to international standards for quality and safety.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-5 rounded-lg text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">ISPM 15 Certified</h3>
              <p className="text-xs text-gray-600">
                International standard for wood packaging material.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Heat Treated</h3>
              <p className="text-xs text-gray-600">
                Strict heat treatment processes for export pallets.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Custom Solutions</h3>
              <p className="text-xs text-gray-600">
                Bespoke designs for unique logistical challenges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;