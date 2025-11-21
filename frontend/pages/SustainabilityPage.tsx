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
            // const standardsSection = document.getElementById('standards-section'); // Removed reference

            if (approachSection && window.scrollY > approachSection.offsetTop - 400) {
                setIsVisible(prev => ({ ...prev, approach: true }));
            }
            // Removed standards check
            // if (standardsSection && window.scrollY > standardsSection.offsetTop - 400) {
            //     setIsVisible(prev => ({ ...prev, standards: true }));
            // }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Function to animate the counters
    const animateCounters = () => {
        stats.forEach((stat, index) => {
            const el = countRefs.current[index];
            if (!el) return;

            const target = stat.value.replace(/[^\d]/g, '');
            const isPercentage = stat.value.includes('%');
            const isTonne = stat.value.includes('Tonnes');
            const isPlus = stat.value.includes('+');
            const targetValue = parseInt(target, 10);

            if (isNaN(targetValue)) {
                el.textContent = stat.value;
                return;
            }

            let start = 0;
            const increment = targetValue / 100;
            const duration = 2000;
            const stepDuration = duration / 100;

            const timer = setInterval(() => {
                start += increment;
                if (start >= targetValue) {
                    start = targetValue;
                    clearInterval(timer);
                }

                let displayValue = Math.floor(start).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                el.textContent = displayValue + (isPercentage ? '%' : '') + (isTonne ? ' Tonnes' : '') + (isPlus ? '+' : '');
            }, stepDuration);
        });
    };

    // Set initial refs to null
    countRefs.current = stats.map((_, i) => countRefs.current[i] || null);

    return (
        <div className="bg-gray-50">

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-green-700 to-green-900 text-white">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1738598625611-757cdbcb5d9c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Stack of sustainable wooden pallets in a warehouse"
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>
                <div className="relative container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Driving Circularity in the UAE</h1>
                    <p className="mt-4 text-lg text-green-100 max-w-3xl mx-auto">
                        Our commitment to environmental responsibility in Dubai and Sharjah, focusing on waste reduction, wood and aluminum recycling, and responsible sourcing.
                    </p>
                </div>
            </div>
            {/* --- */}

            {/* Our Approach Section */}
            <div id="approach-section" className="container mx-auto px-4 py-16">
                {/* Image added above the content for context */}
                <div className="max-w-4xl mx-auto mb-12">
                    <img
                        src="https://images.unsplash.com/photo-1706027554815-ae587412dbef?q=80&w=984&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="A large, neat stack of wooden pallets representing efficient logistics and reuse."
                        className="w-full h-64 object-cover rounded-xl shadow-xl border-4 border-white"
                    />
                </div>
                {/* End Image */}

                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Circular Economy: Reduce, Reuse, Recycle</h2>
                    <p className="text-base text-gray-600 mb-8 text-center">
                        Based in Dubai and Sharjah, our model minimizes waste for timber and aluminum products, maximizing their life cycle within the UAE logistics ecosystem.
                    </p>
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 text-center transition-all duration-700 ${isVisible.approach ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="p-6 bg-white border-t-4 border-green-600 rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl">
                            <div className="relative w-full h-24 mb-4">
                                <img src="https://images.unsplash.com/photo-1737056668502-9706974cf360?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Close-up of freshly cut wood planks, representing material efficiency." className="w-full h-full object-cover rounded-md opacity-70" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-green-800">Reduce</h3>
                            <p className="mt-3 text-sm text-gray-700">Manufacturing <strong className="font-semibold">extra-durable</strong> products to increase lifespan and reduce replacement frequency.</p>
                        </div>
                        <div className="p-6 bg-white border-t-4 border-green-600 rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl">
                            <div className="relative w-full h-24 mb-4">
                                <img src="https://images.unsplash.com/photo-1561435351-c668934d89de?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Worker repairing a wooden pallet with tools." className="w-full h-full object-cover rounded-md opacity-70" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-green-800">Reuse</h3>
                            <p className="mt-3 text-sm text-gray-700"><strong className="font-semibold">Refurbishing millions</strong> of wood pallets and aluminum components annually in our dedicated facilities.</p>
                        </div>
                        <div className="p-6 bg-white border-t-4 border-green-600 rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl">
                            <div className="relative w-full h-24 mb-4">
                                <img src="https://images.unsplash.com/photo-1599652039863-6408923a6057?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Piles of processed wood chips ready for recycling." className="w-full h-full object-cover rounded-md opacity-70" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5L9 14l5-5M12 21a9 9 0 100-18 9 9 0 000 18z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-green-800">Recycle</h3>
                            <p className="mt-3 text-sm text-gray-700"><strong className="font-semibold">98% waste diversion</strong> by responsibly recycling end-of-life materials into raw goods or fuel.</p>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-gray-300 mx-auto max-w-6xl" />

            {/* Impact Stats Section - Thematic Background */}
            <div
                id="stats-section"
                className="py-16 bg-cover bg-center relative"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1598144203130-10f760f38b25?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="absolute inset-0 bg-gray-900/80"></div> {/* Dark overlay */}
                <div className="relative container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-white text-center mb-10">Our Environmental Impact in Numbers</h2>
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white/95 p-6 rounded-lg shadow-2xl text-center backdrop-blur-sm transform transition-all duration-500 hover:scale-[1.03] border-b-4 border-green-600"
                            >
                                <div className="h-24 flex items-center justify-center mb-4">
                                    <div className="relative z-10">
                                        <p className="text-4xl md:text-5xl font-extrabold text-green-700 tracking-tight">
                                            <span ref={el => countRefs.current[index] = el}>0</span>
                                        </p>
                                    </div>
                                </div>
                                <p className="text-lg font-bold text-gray-800 mt-2">{stat.label}</p>
                                <p className="mt-3 text-sm text-gray-600">{stat.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* --- */}

            {/* Standards & Practices Section */}
           
        </div>
    );
};

export default SustainabilityPage;