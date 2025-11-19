import React, { useState, useEffect, useRef } from 'react';

// Define the stat type
interface Stat {
  value: string;
  label: string;
  description: string;
}

const SustainabilityPage: React.FC = () => {
    const [isVisible, setIsVisible] = useState({
        approach: false,
        stats: false,
        standards: false
    });

    const stats: Stat[] = [
        { value: "98%", label: "Waste Timber Recycled", description: "Almost all timber waste from our Dubai & Sharjah facilities is recycled into biomass fuel or animal bedding." },
        { value: "250,000+", label: "Pallets Refurbished Annually", description: "We give pallets a second life in the UAE, extending their usability and reducing the need for new timber." },
        { value: "7,500 Tonnes", label: "Timber Saved From Landfill", description: "Our UAE repair and reuse program prevents thousands of tonnes of wood from ending up in landfills annually." }
    ];

    // Refs for animated counters
    const countRefs = useRef<Array<HTMLSpanElement | null>>([]);

    // Animation for stats when they become visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible.stats) {
                    setIsVisible(prev => ({ ...prev, stats: true }));
                    // Trigger counter animation after a small delay
                    setTimeout(() => {
                        animateCounters();
                    }, 300);
                }
            },
            { threshold: 0.5 } // Trigger when 50% of the element is visible
        );

        const statsSection = document.getElementById('stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }

        return () => {
            if (statsSection) {
                observer.unobserve(statsSection);
            }
        };
    }, [isVisible.stats]);

    // Handle scroll for other sections
    useEffect(() => {
        const handleScroll = () => {
            const approachSection = document.getElementById('approach-section');
            const standardsSection = document.getElementById('standards-section');
            
            if (approachSection && window.scrollY > approachSection.offsetTop - 400) {
                setIsVisible(prev => ({ ...prev, approach: true }));
            }
            if (standardsSection && window.scrollY > standardsSection.offsetTop - 400) {
                setIsVisible(prev => ({ ...prev, standards: true }));
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on initial load
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Function to animate the counters
    const animateCounters = () => {
        stats.forEach((stat, index) => {
            const el = countRefs.current[index];
            if (!el) return;

            const target = stat.value.replace(/[^\d]/g, ''); // Extract numbers
            const isPercentage = stat.value.includes('%');
            const isTonne = stat.value.includes('Tonnes');
            const targetValue = parseInt(target, 10);

            if (isNaN(targetValue)) {
                el.textContent = stat.value; // Fallback if parsing fails
                return;
            }

            let start = 0;
            const increment = targetValue / 100; // Animate over 100 steps
            const duration = 2000; // Total duration in ms
            const stepDuration = duration / 100; // Duration per step

            const timer = setInterval(() => {
                start += increment;
                if (start >= targetValue) {
                    start = targetValue;
                    clearInterval(timer);
                }
                
                let displayValue = Math.floor(start).toString();
                if (isTonne && start >= 1000) {
                    displayValue = (start / 1000).toFixed(1) + 'K';
                }
                
                el.textContent = displayValue + (isPercentage ? '%' : (isTonne ? ' Tonnes' : '+'));
            }, stepDuration);
        });
    };

    // Set initial refs to null
    countRefs.current = stats.map((_, i) => countRefs.current[i] || null);

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-green-800 to-green-900 text-white">
                <div className="absolute inset-0">
                    <img 
                        src="https://picsum.photos/seed/uae-forest/1200/600" 
                        alt="UAE sustainable forestry concept" 
                        className="w-full h-full object-cover opacity-30" 
                    />
                </div>
                <div className="relative container mx-auto px-4 py-16 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Sustainability in Dubai & Sharjah</h1>
                    <p className="mt-3 text-base sm:text-lg text-green-100 max-w-2xl mx-auto">
                        Our commitment to environmental responsibility in the UAE, focusing on wood and aluminum recycling.
                    </p>
                </div>
            </div>

            {/* Our Approach Section */}
            <div id="approach-section" className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6">Circular Economy for Wood & Aluminum</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Based in Dubai and Sharjah, we implement a sustainable model minimizing waste for both timber and aluminum products. Our operations focus on the principles of Reduce, Reuse, and Recycle.
                    </p>
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-center mt-8 transition-all duration-700 ${isVisible.approach ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-green-700">Reduce</h3>
                            <p className="mt-2 text-xs sm:text-sm text-gray-600">Manufacturing durable wood and aluminum products in the UAE to reduce replacement frequency.</p>
                        </div>
                        <div className="p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-green-700">Reuse</h3>
                            <p className="mt-2 text-xs sm:text-sm text-gray-600">Refurbishing wood pallets and recycling aluminum components in our Dubai & Sharjah facilities.</p>
                        </div>
                        <div className="p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-green-700">Recycle</h3>
                            <p className="mt-2 text-xs sm:text-sm text-gray-600">Responsible recycling of end-of-life wood and aluminum materials in the UAE.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Impact Stats Section */}
            <div id="stats-section" className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-8">Our Environmental Impact in Numbers</h2>
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 transition-all duration-700 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {stats.map((stat, index) => (
                            <div 
                                key={index} 
                                className="bg-gray-50 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all duration-300"
                            >
                                {/* Wood-themed background image container */}
                                <div className="relative h-24 bg-amber-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                                    <img 
                                        src="https://picsum.photos/seed/wood-bg/400/200" 
                                        alt="Wood texture background" 
                                        className="absolute inset-0 w-full h-full object-cover opacity-20"
                                    />
                                    <div className="relative z-10">
                                        <p className="text-xl font-bold text-green-600">
                                            {/* Span element for the animated number */}
                                            <span ref={el => countRefs.current[index] = el}>0</span>
                                        </p>
                                    </div>
                                </div>
                                <p className="text-base font-bold text-gray-800">{stat.label}</p>
                                <p className="mt-3 text-xs sm:text-sm text-gray-600">{stat.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Standards & Practices Section */}
            <div id="standards-section" className="container mx-auto px-4 py-12">
                 <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">Our Environmental Standards & Practices</h2>
                 <p className="text-center text-sm sm:text-base text-gray-600 max-w-xl mx-auto mb-8">
                    Adhering to best practices for sustainable wood and aluminum processing in the UAE.
                </p>
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transition-all duration-700 ${isVisible.standards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                     <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                        </div>
                        <h3 className="font-bold text-base sm:text-lg text-green-700 text-center">ISPM 15 Certified</h3>
                        <p className="mt-2 text-xs sm:text-sm text-gray-600 text-center">
                            Ensuring pest-free wood packaging for international trade from UAE.
                        </p>
                    </div>
                     <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                            </svg>
                        </div>
                        <h3 className="font-bold text-base sm:text-lg text-blue-700 text-center">Responsible Sourcing</h3>
                        <p className="mt-2 text-xs sm:text-sm text-gray-600 text-center">
                            Commitment to sourcing timber and aluminum from sustainable suppliers.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SustainabilityPage;