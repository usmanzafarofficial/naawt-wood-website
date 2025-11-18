import React from 'react';
import { Page } from '../types';
import { PRODUCT_CATEGORIES } from '../constants';

interface FooterProps {
  navigateTo: (page: Page, category?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  return (
    <footer className="bg-slate-800 text-gray-300" role="contentinfo">
      <div className="container mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/logofinaltrans.png" 
                alt="NAAWT Logo" 
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain" 
              />
              <span className="text-white text-xl sm:text-2xl font-extrabold">NAAWT.COM</span>
            </div>
            <p className="text-gray-400 text-sm">
              Securing a sustainable future with quality pallets and reliable service. Made in UAE.
            </p>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <h4 className="font-bold text-gray-800 text-center text-sm mb-2">Trusted & Reviewed</h4>
                 <div className="flex justify-center items-center space-x-4">
                    <div className="text-center text-xs text-gray-600">
                        <p className="font-bold text-lg">ISO 9001</p>
                        <p>Quality</p>
                    </div>
                     <div className="text-center text-xs text-gray-600">
                        <p className="font-bold text-lg">ISO 14001</p>
                        <p>Environmental</p>
                    </div>
                 </div>
            </div>
          </div>

          {/* Our Products */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-white tracking-wider uppercase">Our Products</h3>
            <ul className="mt-3 sm:mt-4 space-y-2">
              {PRODUCT_CATEGORIES.map(cat => (
                <li key={cat.slug}>
                  <button onClick={() => navigateTo('products', cat.slug)} className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">{cat.name}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-white tracking-wider uppercase">Company</h3>
            <ul className="mt-3 sm:mt-4 space-y-2">
              <li><button onClick={() => navigateTo('about')} className="text-sm sm:text-base text-gray-400 hover:text-white">About Us</button></li>
              <li><button onClick={() => navigateTo('sustainability')} className="text-sm sm:text-base text-gray-400 hover:text-white">Sustainability</button></li>
              <li><button onClick={() => navigateTo('contact')} className="text-sm sm:text-base text-gray-400 hover:text-white">Contact Us</button></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-sm sm:text-base text-gray-400 hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>
          
          {/* Contact Us */}
            <div>
            <h3 className="text-sm sm:text-base font-semibold text-white tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-3 sm:mt-4 space-y-3 text-gray-400">
              <li className="flex items-start">
                    <svg className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <a href="https://www.google.com/maps/place/25%C2%B018'40.9%22N+55%C2%B038'01.0%22E/@25.3113539,55.6310422,665m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d25.3113539!4d55.6336171?entry=ttu&g_ep=EgoyMDI1MTEwOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors text-sm sm:text-base">
                  Plot.1898 Al Sajaa, Industrial 148, Sharjah
                </a>
                </li>
                <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    <a href="tel:+971555302154" className="hover:text-green-400 transition-colors text-sm sm:text-base">055 530 2154</a>
                </li>
                <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    <a href="tel:+971502242084" className="hover:text-green-400 transition-colors text-sm sm:text-base">050 224 2084</a>
                </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 border-t border-gray-700 pt-6 sm:pt-8 text-center text-sm">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} NAAWT.COM Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;