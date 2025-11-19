import React from 'react';

const ContactPage: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8 sm:py-12">
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                        We're here to assist you. Reach out for quotes, support, or any inquiries.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                    {/* Left Column - Contact Form */}
                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm" 
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm" 
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <input 
                                    type="text" 
                                    id="subject" 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm" 
                                    placeholder="How can we help?"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea 
                                    id="message" 
                                    rows={5} 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm" 
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 sm:py-3 px-4 rounded-lg transition duration-300 text-sm sm:text-base"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Right Column - Contact Info and Map */}
                    <div className="space-y-6 sm:space-y-8">
                        {/* Contact Information */}
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Phone</h3>
                                        <p className="text-gray-600 mt-1">
                                            <a href="tel:+971555302154" className="hover:text-green-600 font-semibold text-sm sm:text-base">
                                                055 530 2154
                                            </a>
                                        </p>
                                        <p className="text-gray-600">
                                            <a href="tel:+971502242084" className="hover:text-green-600 font-semibold text-sm sm:text-base">
                                                050 224 2084
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Email</h3>
                                        <p className="text-gray-600 mt-1 text-sm sm:text-base">info@naawt.com</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Address</h3>
                                        <a 
                                            href="https://www.google.com/maps/place/25%C2%B018'40.9%22N+55%C2%B038'01.0%22E/@25.3113539,55.6310422,665m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d25.3113539!4d55.6336171?entry=ttu&g_ep=EgoyMDI1MTEwOS4wIKXMDSoASAFQAw%3D%3D"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 mt-1 hover:text-green-600 hover:underline inline-block text-sm sm:text-base"
                                        >
                                            Plot.1898 Al Sajaa, Industrial 148<br />
                                            Sharjah<br />
                                            United Arab Emirates
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Section */}
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Our Location</h2>
                            {/* The surrounding div handles the height (h-64 sm:h-80), 
                                so we keep width/height at 100% for responsiveness */}
                            <div className="rounded-lg overflow-hidden shadow-md h-64 sm:h-80">
                                <iframe 
                                    title="Company Location"
                                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2897.6402100848536!2d55.631042175385524!3d25.311353877637618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDE4JzQwLjkiTiA1NcKwMzgnMDEuMCJF!5e1!3m2!1sen!2s!4v1763471412415!5m2!1sen!2s"
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;