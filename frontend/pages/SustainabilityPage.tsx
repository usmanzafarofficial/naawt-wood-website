import React, { useState, useEffect } from 'react';

const SustainabilityPage: React.FC = () => {
    const [isVisible, setIsVisible] = useState({
        approach: false,
        stats: false,
        certifications: false
    });

    const stats = [
        { value: "98%", label: "Waste Timber Recycled", description: "Almost all timber waste from our manufacturing and repair processes is recycled into biomass fuel or animal bedding." },
        { value: "250,000+", label: "Pallets Refurbished Annually", description: "We give pallets a second life, extending their usability and significantly reducing the need for new timber." },
        { value: "7,500 Tonnes", label: "Timber Saved From Landfill", description: "Our repair and reuse program prevents thousands of tonnes of wood from ending up in landfills each year." }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const approachSection = document.getElementById('approach-section');
            const statsSection = document.getElementById('stats-section');
            const certificationsSection = document.getElementById('certifications-section');
            
            if (approachSection && window.scrollY > approachSection.offsetTop - 500) {
                setIsVisible(prev => ({ ...prev, approach: true }));
            }
            if (statsSection && window.scrollY > statsSection.offsetTop - 500) {
                setIsVisible(prev => ({ ...prev, stats: true }));
            }
            if (certificationsSection && window.scrollY > certificationsSection.offsetTop - 500) {
                setIsVisible(prev => ({ ...prev, certifications: true }));
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on initial load
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-green-800 text-white">
                <div className="absolute inset-0">
                    <img 
                        src="https://thearchitectsdiary.com/wp-content/uploads/2021/06/Screenshot-2021-06-17-at-12.02.54-PM-1024x538.png" 
                        alt="Sustainable pallets in warehouse" 
                        className="w-full h-full object-cover opacity-40" 
                    />
                </div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold animate-fadeInDown">Our Commitment to a Greener Planet</h1>
                    <p className="mt-3 sm:mt-4 max-w-3xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-green-100 animate-fadeInDown animation-delay-300">
                        Sustainability isn't just a buzzword for us; it's at the core of everything we do.
                    </p>
                </div>
            </div>

            {/* Our Approach Section */}
            <div id="approach-section" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6 sm:mb-8 animate-fadeInUp">A Circular Economy for Pallets</h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 animate-fadeInUp animation-delay-200">
                        We believe in a sustainable business model that minimizes waste and maximizes resource efficiency. Our operations are built around the principles of the circular economy: Reduce, Reuse, and Recycle.
                    </p>
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center mt-8 sm:mt-12 transition-all duration-700 ${isVisible.approach ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="p-4 sm:p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-green-700">Reduce</h3>
                            <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-600">By providing durable, high-quality new and refurbished pallets, we reduce the frequency of replacement and the overall demand for virgin timber.</p>
                        </div>
                        <div className="p-4 sm:p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-green-700">Reuse</h3>
                            <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-600">Our pallet collection and refurbishment program is the heart of our green policy. We inspect, repair, and return pallets to service, extending their lifespan significantly.</p>
                        </div>
                        <div className="p-4 sm:p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-green-700">Recycle</h3>
                            <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-600">For pallets beyond repair, we ensure the timber is responsibly recycled, preventing it from going to landfill and turning it into valuable new products.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Impact Stats Section */}
            <div id="stats-section" className="bg-gray-50 py-12 sm:py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12 animate-fadeInUp">Our Environmental Impact by the Numbers</h2>
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 transition-all duration-700 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {stats.map((stat, index) => (
                            <div 
                                key={index} 
                                className="bg-white p-6 sm:p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className="w-20 sm:w-24 h-20 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500 hover:bg-green-200">
                                    <p className="text-2xl sm:text-3xl font-bold text-green-600">{stat.value}</p>
                                </div>
                                <p className="text-base sm:text-lg md:text-xl font-bold text-gray-800">{stat.label}</p>
                                <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-gray-600">{stat.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Certifications Section */}
            <div id="certifications-section" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
                 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8 animate-fadeInUp">Our Environmental Credentials</h2>
                <div className={`flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 transition-all duration-700 ${isVisible.certifications ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                     <div className="text-center p-4 sm:p-6 bg-white rounded-lg border-2 border-green-200 max-w-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                        </div>
                        <p className="font-bold text-base sm:text-lg text-green-700">ISO 14001 Certified</p>
                        <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-600">This certification demonstrates our commitment to an effective Environmental Management System (EMS), ensuring we continuously improve our environmental performance.</p>
                    </div>
                     <div className="text-center p-4 sm:p-6 bg-white rounded-lg border-2 border-green-200 max-w-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                            </svg>
                        </div>
                        <p className="font-bold text-base sm:text-lg text-green-700">FSC® & PEFC™ Available</p>
                        <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-600">We can source timber from responsibly managed forests, ensuring the sustainability of our new pallet production upon request.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SustainabilityPage;