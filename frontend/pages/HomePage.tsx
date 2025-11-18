import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Page } from '../types';
import { TESTIMONIALS } from '../constants';

interface HomePageProps {
  navigateTo: (page: Page, category?: string) => void;
}

const useAnimateOnScroll = (threshold = 0.1) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const currentRef = ref.current;
        if (!currentRef) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('opacity-0');
                    entry.target.classList.add('animate-fadeInUp');
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );
        observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, [threshold]);
    return ref;
};

const useCountUp = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLParagraphElement>(null);
    const animationFrameRef = useRef<number>();

    const startCounting = useCallback(() => {
        let startTime: number | null = null;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            // Ease-out cubic function for a smoother animation
            const easeOutProgress = 1 - Math.pow(1 - percentage, 3);
            const currentCount = Math.floor(end * easeOutProgress);
            
            setCount(currentCount);

            if (progress < duration) {
                animationFrameRef.current = requestAnimationFrame(animate);
            } else {
                setCount(end); // Ensure it ends on the exact number
            }
        };
        animationFrameRef.current = requestAnimationFrame(animate);
    }, [end, duration]);

    useEffect(() => {
        const currentRef = ref.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startCounting();
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(currentRef);

        return () => {
            observer.disconnect();
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [startCounting]);

    return { count, ref };
};

// Hero background images array - pallet/wood related
const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1626081063434-79a2169791b1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=876', // wooden pallets
  'https://plus.unsplash.com/premium_photo-1682146778731-a81b0f6e5d3c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=821', // warehouse pallets
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870', // wooden materials
];

// Texts for typing effect - smaller and better font
const TYPING_TEXTS = [
  "Sustainable",
  "Reliable",
  "Quality",
  "Brand"
];

const TypingText: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const nextWordDelay = 1500;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (subIndex < TYPING_TEXTS[textIndex].length) {
          setSubIndex(subIndex + 1);
        } else {
          // After full word is typed, wait then start deleting
          setTimeout(() => setIsDeleting(true), nextWordDelay);
        }
      } else {
        // Deleting
        if (subIndex > 0) {
          setSubIndex(subIndex - 1);
        } else {
          // After deleting, move to next word
          setIsDeleting(false);
          setOpacity(0);
          setTimeout(() => {
            setTextIndex((textIndex + 1) % TYPING_TEXTS.length);
            setOpacity(1);
          }, 200);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, textIndex]);

  return (
    <span className="transition-opacity duration-200 font-semibold" style={{ opacity }}>
      {TYPING_TEXTS[textIndex].substring(0, subIndex)}
      <span className="animate-pulse ml-1">|</span>
    </span>
  );
};

const StatCard: React.FC<{ value: string; title: string; description: string; }> = ({ value, title, description }) => {
    const endValue = parseInt(value.replace(/[,+]/g, ''), 10);
    const suffix = value.includes('+') ? '+' : '';
    const { count, ref } = useCountUp(endValue, 2000);

    return (
        <div className="bg-slate-800 bg-opacity-70 p-4 sm:p-6 md:p-8 rounded-lg text-center h-full">
            <p ref={ref} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                {count.toLocaleString()}{suffix}
            </p>
            <p className="mt-2 text-base sm:text-lg md:text-xl font-bold text-green-400">{title}</p>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-300">{description}</p>
        </div>
    );
};

const CATEGORY_DATA = [
    { 
        name: 'New Wooden Pallets', 
        slug: 'new-wooden',
        description: 'Durable, reliable pallets built to standard and custom specifications.',
        imageUrl: '/images/newwood.png',
    },
    { 
        name: 'Used Wooden Pallets', 
        slug: 'used-wooden',
        description: 'Cost-effective, refurbished Grade A pallets, inspected for quality.',
        imageUrl: '/images/Used Wooden Pallets.jpg',
    },
    { 
        name: 'Plastic Pallets', 
        slug: 'plastic',
        description: 'Hygienic and durable options perfect for food, pharma, and export.',
        imageUrl: '/images/plastic.png',
    },
    { 
        name: 'Heat Treated Pallets', 
        slug: 'heat-treated',
        description: 'ISPM15 compliant pallets for hassle-free international shipping.',
        imageUrl: '/images/heat.png',
    },
    { 
        name: 'Pallet Collection', 
        slug: 'collection',
        description: 'We buy your unwanted pallets, clearing space and aiding sustainability.',
        imageUrl: '/images/collections.png',
    },
];

const CategoryCard: React.FC<{
  name: string;
  description: string;
  imageUrl: string;
  onClick: () => void;
}> = ({ name, description, imageUrl, onClick }) => (
    <button
        onClick={onClick}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden group transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col h-full text-left"
    >
        <div className="h-32 sm:h-40 md:h-48 overflow-hidden">
            <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
            />
        </div>
        <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800">{name}</h3>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-600 flex-grow">{description}</p>
            <div className="mt-3 sm:mt-4">
                <span className="text-xs sm:text-sm font-semibold text-green-600 group-hover:underline transition-colors">
                    Get Quote &rarr;
                </span>
            </div>
        </div>
    </button>
);

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  const clientLogos = ["Harrods", "NetworkRail", "Sainsbury's", "vax", "BRITISH AIRWAYS", "co-op", "Domino's Pizza", "EDFENERGY", "GÜ"];
  
  const stats = [
    { value: "250,000+", title: "Pallets Refurbished", description: "We take pride in the importance of sustainable business practices." },
    { value: "300,000+", title: "Timber Saved", description: "Tonnes of timber saved from landfill through our recycling programs." },
    { value: "150,000+", title: "Collected From Customers", description: "Helping businesses manage waste and repurpose assets efficiently." },
  ];

  // State for background images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [imageTransition, setImageTransition] = useState(false);

  // Change background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setImageTransition(true);
      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((nextImageIndex + 1) % HERO_IMAGES.length);
        setImageTransition(false);
      }, 1000); // Match this to your transition duration
    }, 5000);

    return () => clearInterval(interval);
  }, [nextImageIndex]);

  const servicesTitleRef = useAnimateOnScroll();
  const categoriesRef = useAnimateOnScroll(0.2);
  const sustainabilityRef = useAnimateOnScroll(0.2);
  const statsRef = useAnimateOnScroll(0.2);
  const testimonialsTitleRef = useAnimateOnScroll();
  const testimonialsRef = useAnimateOnScroll(0.2);
  const clientsTitleRef = useAnimateOnScroll();
  const clientsRef = useAnimateOnScroll(0.1);

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        {/* Current image */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${imageTransition ? 'opacity-0' : 'opacity-100'}`}
          style={{ backgroundImage: `url(${HERO_IMAGES[currentImageIndex]})` }}
        ></div>
        
        {/* Next image (preloaded) */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${imageTransition ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${HERO_IMAGES[nextImageIndex]})` }}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-28 md:py-40 lg:py-48 text-center flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-4xl">
            Your Trusted <TypingText /> Pallet Supplier
          </h1>
          <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-gray-300">High-quality new and refurbished pallets, manufactured and recycled in Britain to support your supply chain.</p>
          <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigateTo('quote')}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-green-500 text-white text-sm sm:text-base font-bold rounded-md shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
            >
              Get a Quote &rarr;
            </button>
            <button
              onClick={() => navigateTo('products')}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-transparent border-2 border-white text-white text-sm sm:text-base font-bold rounded-md hover:bg-white hover:text-slate-900 transition-colors"
            >
              Browse Products
            </button>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={servicesTitleRef} className="text-center mb-8 sm:mb-12 opacity-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">Our Product Range</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600">Solutions for every logistics and storage need.</p>
          </div>
          <div ref={categoriesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 opacity-0">
             {CATEGORY_DATA.map((cat, index) => (
                <div key={cat.slug} style={{ animationDelay: `${index * 100}ms`}}>
                    <CategoryCard 
                        name={cat.name} 
                        description={cat.description}
                        imageUrl={cat.imageUrl}
                        onClick={() => navigateTo('quote', cat.slug)} 
                    />
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Highlight */}
      <section className="py-12 sm:py-16 md:py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div ref={sustainabilityRef} className={`grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center opacity-0`}>
                <div className="pr-0 md:pr-6">
                    <span className="text-green-600 font-semibold text-xs sm:text-sm uppercase">Sustainable Pallet Supplier</span>
                    <h2 className="mt-2 text-2xl sm:text-3xl md:text-3xl font-extrabold text-slate-900">Committed to Reducing Our Impact</h2>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-600">
                        We are dedicated to reducing waste and promoting a circular economy. As a result, we refurbish, repurpose and recycle many of our products, ensuring fewer pallets end up in landfill.
                    </p>
                    <ul className="mt-4 sm:mt-6 space-y-2">
                        <li className="flex items-center text-sm sm:text-base text-gray-700"><svg className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>Refurbished pallets to extend product life.</li>
                        <li className="flex items-center text-sm sm:text-base text-gray-700"><svg className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>Waste timber converted into biomass fuel.</li>
                    </ul>
                    <div className="mt-6 sm:mt-8">
                        <button onClick={() => navigateTo('sustainability')} className="text-sm sm:text-base font-bold text-green-600 hover:text-green-800 transition-colors">
                            Learn About Our Green Policy &rarr;
                        </button>
                    </div>
                </div>
                <div>
                    <img src="/images/hero1.png" alt="Hand holding a small plant" className="rounded-lg shadow-xl" />
                </div>
            </div>
        </div>
      </section>
      
      {/* Trust-building Stats */}
      <section className="py-12 sm:py-16 md:py-20 bg-slate-900 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/stats-bg/1920/1080')" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 opacity-0">
            {stats.map((stat, index) => (
                <div key={stat.title} style={{ animationDelay: `${index * 150}ms`}}>
                    <StatCard value={stat.value} title={stat.title} description={stat.description} />
                </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div ref={testimonialsTitleRef} className="text-center mb-8 sm:mb-12 opacity-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">What Our Customers Say</h2>
              </div>
              <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 opacity-0">
                  {TESTIMONIALS.map((testimonial, index) => (
                      <div key={index} className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg border border-gray-200" style={{ animationDelay: `${index * 150}ms` }}>
                          <div className="flex items-center mb-3 sm:mb-4">
                              {[...Array(5)].map((_, i) => <svg key={i} className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                          </div>
                          <p className="text-sm sm:text-base text-gray-600 italic">"{testimonial.quote}"</p>
                          <p className="mt-4 sm:mt-6 font-bold text-sm sm:text-base text-slate-800">{testimonial.author}</p>
                          <p className="text-xs sm:text-sm text-gray-500">{testimonial.company}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Client Logos */}
      <section className="py-12 sm:py-16 md:py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div ref={clientsTitleRef} className="text-center mb-8 sm:mb-12 opacity-0">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">Trusted By Big Brands</h3>
              </div>
              <div ref={clientsRef} className="opacity-0">
                  <div className="scrolling-wrapper overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                      <div className="flex animate-scroll">
                          {[...clientLogos, ...clientLogos].map((logo, index) => (
                              <div key={`${logo}-${index}`} className="flex-shrink-0 w-48 sm:w-56 md:w-64 h-20 sm:h-28 md:h-32 mx-2 sm:mx-3 md:mx-4 flex items-center justify-center p-2 sm:p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200">
                                  <span className="text-sm sm:text-base md:text-lg font-bold text-gray-500 text-center">{logo}</span>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default HomePage;