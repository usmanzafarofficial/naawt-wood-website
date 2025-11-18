
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">About NAAWT</h1>
          <p className="mt-3 sm:mt-4 max-w-3xl mx-auto text-sm sm:text-base md:text-xl text-gray-600">
            NAAWT (NADEEM AHMED ALUMINUM & WOOD TR LLC) is a UAE-based manufacturer, refurbisher and recycler of industrial pallets and timber products. We combine traditional craftsmanship with modern manufacturing standards to deliver reliable, compliant and sustainable pallet solutions across the GCC and international markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-12 sm:mb-16">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4">Who We Are</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4">
              Established with a commitment to quality and environmental responsibility, NAAWT provides end-to-end pallet services — from bespoke manufacturing and heat treatment for export to large-scale refurbishment and sustainable disposal. Our experienced team works with businesses of every size to optimise logistics, reduce costs and minimise environmental impact.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              We serve manufacturers, distributors, retailers and exporters, supplying new pallets built to specification as well as inspected, grade-A refurbished pallets that extend timber life and lower the total cost of ownership for our customers.
            </p>
          </div>
          <div>
            <img src="https://picsum.photos/seed/history/800/600" alt="Company operations" className="rounded-lg shadow-xl w-full h-auto" />
          </div>
        </div>

        <div className="bg-gray-50 p-6 sm:p-8 md:p-12 rounded-lg mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Quality</h3>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-600">Delivering products that meet the highest standards of durability and performance, every single time.</p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Sustainability</h3>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-600">Leading the industry in responsible sourcing, pallet refurbishment, and waste reduction.</p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Service</h3>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-600">Building lasting partnerships through responsive, expert, and customer-focused service.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">Certifications & Accreditations</h2>
          <p className="text-center text-sm sm:text-base md:text-lg text-gray-600 mb-8 sm:mb-12">We are proud to be certified by leading industry bodies, reflecting our commitment to quality and environmental management.</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-16">
            <div className="text-center p-3 sm:p-4 bg-white rounded-lg border min-w-0">
                <p className="font-bold text-base sm:text-lg">ISO 9001</p>
                <p className="text-xs sm:text-sm text-gray-500">Quality Management</p>
            </div>
            <div className="text-center p-3 sm:p-4 bg-white rounded-lg border min-w-0">
                <p className="font-bold text-base sm:text-lg">ISO 14001</p>
                <p className="text-xs sm:text-sm text-gray-500">Environmental Management</p>
            </div>
            <div className="text-center p-3 sm:p-4 bg-white rounded-lg border min-w-0">
                <p className="font-bold text-base sm:text-lg">ISPM 15 Certified</p>
                <p className="text-xs sm:text-sm text-gray-500">International Export Standards</p>
            </div>
             <div className="text-center p-3 sm:p-4 bg-white rounded-lg border min-w-0">
                <p className="font-bold text-base sm:text-lg">Made in Britain</p>
                <p className="text-xs sm:text-sm text-gray-500">Official Member</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
