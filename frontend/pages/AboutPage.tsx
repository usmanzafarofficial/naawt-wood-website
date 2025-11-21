import React from 'react';

const AboutPage: React.FC = () => {
  return (
    // Use a slightly darker gray for the body to make white cards pop
    <div className="bg-gray-100 min-h-screen">
      
      {/* 1. Hero Section - Industrial Green Theme (Reduced Padding/Font Size) */}
      <div className="bg-gradient-to-br from-green-800 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
              NAAWT: The Foundation of Logistics
            </h1>
            <p className="text-lg text-green-200 mt-4 font-light">
              NADEEM AHMED ALUMINUM & WOOD TR LLC is a UAE leader in industrial pallet manufacturing, refurbishment, and sustainable timber solutions.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Who We Are Section (Reduced Padding/Components) */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white p-6 rounded-lg shadow-lg">
            <div className="order-2 lg:order-1">
              {/* Image with a strong, relevant border */}
              <img 
                src="https://plus.unsplash.com/premium_photo-1682129210416-53fabe5b08da?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="NAAWT Manufacturing Facility" 
                className="rounded-lg shadow-xl w-full h-auto object-cover border-2 border-green-600/50 transition duration-300 hover:scale-[1.01]"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-green-500 pb-2">Who We Are</h2>
              <p className="text-base text-gray-700 mb-3 leading-relaxed">
                Established with a commitment to <strong className="font-semibold">quality</strong> and <strong className="font-semibold">environmental responsibility</strong>, NAAWT provides end-to-end pallet services — from bespoke manufacturing and heat treatment for export to large-scale refurbishment and sustainable disposal.
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                We serve manufacturers, distributors, retailers and exporters, supplying <strong className="font-semibold">new pallets</strong> built to specification as well as inspected, grade-A <strong className="font-semibold">refurbished pallets</strong>, ensuring efficient supply chains globally.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Mission & Values Section (Reduced Padding/Components) */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Our Core Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Value Card Template */}
            {[
              { title: 'Quality', icon: (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              ), description: 'Delivering products that meet the highest standards of durability and performance, backed by rigorous inspection.' },
              { title: 'Sustainability', icon: (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              ), description: 'Leading the industry in responsible sourcing, large-scale pallet refurbishment, and comprehensive wood waste reduction.' },
              { title: 'Service', icon: (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              ), description: 'Building lasting partnerships through responsive, expert consultations, flexible supply, and customer-focused logistics support.' },
            ].map((value, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-6 rounded-lg text-center shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-0.5 border-t-2 border-green-600"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Carpentry & Refurbishment Section (Reduced Padding/Components) */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">The Art of Woodwork & Renewal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Text and Features Column */}
            <div className="space-y-4 flex flex-col justify-center">
              <div className="bg-white p-5 rounded-lg shadow-md border-l-2 border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Precision Manufacturing</h3>
                <p className="text-sm text-gray-700">
                  Our new wooden pallets are crafted by skilled carpenters using <strong className="font-semibold">precision cutting</strong> and <strong className="font-semibold">durable fasteners</strong> to ensure they meet exact client specifications and withstand the rigors of global logistics.
                </p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md border-l-2 border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Sustainable Pallet Repair</h3>
                <p className="text-sm text-gray-700">
                  Refurbishment is key to our sustainability pledge. Our team carefully inspects, dismantles, and repairs damaged pallets, replacing only the necessary components with high-quality timber to extend their lifespan efficiently.
                </p>
              </div>
            </div>
            
            {/* Image Grid Column (Smaller Aspect Ratio) */}
            <div className="grid grid-cols-2 gap-3">
              {/* Image of Carpentry Tools (Project Plans) */}
              <div className="rounded-lg overflow-hidden shadow-md border border-white">
                <img 
                    src="https://images.unsplash.com/photo-1601002052861-8cd1485edf1f?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Woodworking project plans" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              {/* Image of Pallet Repair */}
              <div className="rounded-lg overflow-hidden shadow-md border border-white">
                <img 
                    src="https://images.unsplash.com/photo-1573209680076-bd7ec7007616?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Pallet Refurbishment worker" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Operations Section (Reduced Padding/Components) */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Core Manufacturing and Recycling</h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              State-of-the-art facilities and processes ensuring quality, efficiency, and environmental compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-5 rounded-lg shadow-md border-t-2 border-green-500">
              <h3 className="text-lg font-bold text-gray-900 mb-3">New Pallet Manufacturing</h3>
              <img 
                src="https://plus.unsplash.com/premium_photo-1661302828763-4ec9b91d9ce3?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Pallet Manufacturing Process" 
                className="rounded-lg w-full h-32 object-cover mb-3 shadow-sm"
              />
              <p className="text-sm text-gray-700">
                Utilising high-grade timber and precision engineering to create durable, custom pallets. This includes automated cutting and nailing processes for scale and consistency.
              </p>
            </div>
            <div className="bg-gray-50 p-5 rounded-lg shadow-md border-t-2 border-green-500">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Recycling & Sustainability</h3>
              <img 
                src="https://images.unsplash.com/photo-1729161632263-a0e0da501895?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Sustainable Pallet Recycling" 
                className="rounded-lg w-full h-32 object-cover mb-3 shadow-sm"
              />
              <p className="text-sm text-gray-700">
                Committed to environmental responsibility through refurbishment and recycling programs, minimizing waste and maximizing the life cycle of wood products.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Certifications & Accreditations (Reduced Padding/Components) */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Global Standards & Compliance</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'ISPM 15 Certified', icon: (
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              ), detail: 'International standard for wood packaging material <strong className="font-semibold">heat treatment</strong> for export.' },
              { title: 'Strict Heat Treated Protocols', icon: (
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              ), detail: 'Ensuring all export-bound wood products are free from pests and compliant with global shipping rules.' },
              { title: 'Custom Logistics Solutions', icon: (
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
              ), detail: 'Bespoke wood packaging and pallet designs for unique logistical challenges and cargo requirements.' },
            ].map((standard, index) => (
              <div 
                key={index}
                className="bg-white p-5 rounded-lg text-center shadow-md border-b-2 border-gray-400 hover:border-green-600 transition duration-300"
              >
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  {standard.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{standard.title}</h3>
                <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: standard.detail }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;