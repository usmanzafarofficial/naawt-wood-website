
export type Page = 
  | 'home' 
  | 'about' 
  | 'products' 
  | 'sustainability' 
  | 'contact' 
  | 'quote'
  | 'gallery'
  | 'admin';

export interface Product {
  id: number;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  imageUrl: string;
  specifications: {
    dimensions: string;
    material: 'Wood' | 'Plastic' | 'Presswood';
    loadCapacity: string;
    treatment?: 'Heat-Treated (ISPM15)';
    weight?: string;
    entryPoints?: '2-way' | '4-way';
    notes?: string;
  };
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}