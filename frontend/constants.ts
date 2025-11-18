import { Product, Testimonial, FAQItem } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'New Standard Wooden Pallet',
    category: 'New Wooden Pallets',
    categorySlug: 'new-wooden',
    description: 'Brand new, durable wooden pallets built to standard UK and EU sizes. Perfect for all general freight and storage needs.',
    imageUrl: '/images/newpallet.png',
    specifications: {
      dimensions: '1200 x 1000mm',
      material: 'Wood',
      loadCapacity: '1500kg Dynamic',
      weight: 'Approx. 25kg',
      entryPoints: '4-way',
      notes: 'Sturdy construction for heavy loads and repeated use.'
    },
  },
  {
    id: 2,
    name: 'Used Euro Wooden Pallet',
    category: 'Used Wooden Pallets',
    categorySlug: 'used-wooden',
    description: 'Cost-effective and refurbished Grade A Euro pallets. Inspected for quality and ready for immediate dispatch.',
    imageUrl: '/images/euroused.png',
    specifications: {
      dimensions: '1200 x 800mm',
      material: 'Wood',
      loadCapacity: '1200kg Dynamic',
      weight: 'Approx. 22kg',
      entryPoints: '4-way',
      notes: 'EPAL certified, suitable for European pallet pools.'
    },
  },
  {
    id: 3,
    name: 'Heavy-Duty Nestable Plastic Pallet',
    category: 'Plastic Pallets',
    categorySlug: 'plastic',
    description: 'Hygienic, easy-to-clean plastic pallets made from recycled materials. Ideal for food, pharmaceutical, and export industries.',
    imageUrl: '/images/heavyduty.png',
    specifications: {
      dimensions: '1200 x 1000mm',
      material: 'Plastic',
      loadCapacity: '2000kg Static',
      weight: '18kg',
      entryPoints: '4-way',
      notes: 'Nestable design saves space. Impervious to moisture.'
    },
  },
  {
    id: 4,
    name: 'Heat-Treated Export Pallet (ISPM15)',
    category: 'Heat Treated Pallets',
    categorySlug: 'heat-treated',
    description: 'ISPM15 certified heat-treated pallets, compliant with international shipping regulations. Safe for worldwide export.',
    imageUrl: '/images/heattreated.png',
    specifications: {
      dimensions: '1200 x 1000mm',
      material: 'Wood',
      loadCapacity: '1250kg Dynamic',
      treatment: 'Heat-Treated (ISPM15)',
      weight: 'Approx. 24kg',
      entryPoints: '4-way',
      notes: 'Stamped and certified for hassle-free customs clearance.'
    },
  },
  {
    id: 5,
    name: 'Wooden Pallet Collars',
    category: 'Pallet Collars & Cases',
    categorySlug: 'collars-cases',
    description: 'Flexible and stackable wooden pallet collars to create a secure box solution for your pallets. Heat-treated options available.',
    imageUrl: '/images/collersofpallets.png',
    specifications: {
      dimensions: '1200 x 1000mm & 1200 x 800mm',
      material: 'Wood',
      loadCapacity: 'N/A',
      weight: 'Approx. 8kg per collar',
      notes: 'Hinged design allows for easy storage when not in use.'
    },
  },
  {
    id: 6,
    name: 'Custom Size New Wooden Pallet',
    category: 'New Wooden Pallets',
    categorySlug: 'new-wooden',
    description: 'Bespoke pallets manufactured to your exact specifications. Contact us for a quote on custom sizes and designs.',
    imageUrl: '/images/customsize.png',
    specifications: {
      dimensions: 'Custom',
      material: 'Wood',
      loadCapacity: 'As per specification',
      notes: 'We can design pallets for unique loads or automated systems.'
    },
  },
  {
    id: 7,
    name: 'Lightweight Used Pallet',
    category: 'Used Wooden Pallets',
    categorySlug: 'used-wooden',
    description: 'An economical choice for one-way shipping or light-duty storage. Fully inspected and graded for performance.',
    imageUrl: '/images/lightweight.png',
    specifications: {
      dimensions: '1200 x 1000mm',
      material: 'Wood',
      loadCapacity: '500kg Dynamic',
      weight: 'Approx. 15kg',
      entryPoints: '4-way',
      notes: 'Ideal for reducing shipping weight and costs.'
    },
  },
  {
    id: 8,
    name: 'Rackable Plastic Pallet',
    category: 'Plastic Pallets',
    categorySlug: 'plastic',
    description: 'Designed for high-bay racking systems, offering exceptional strength and durability. Made from high-density polyethylene.',
    imageUrl: '/images/rackable.png',
    specifications: {
      dimensions: '1200 x 1000mm',
      material: 'Plastic',
      loadCapacity: '1500kg Racking',
      weight: '22kg',
      entryPoints: '4-way',
      notes: 'Reinforced for safe use in selective and drive-in racking.'
    },
  },
];

export const PRODUCT_CATEGORIES = [
    { name: 'New Wooden Pallets', slug: 'new-wooden' },
    { name: 'Used Wooden Pallets', slug: 'used-wooden' },
    { name: 'Plastic Pallets', slug: 'plastic' },
    { name: 'Heat Treated Pallets', slug: 'heat-treated' },
    { name: 'Pallet Collars & Cases', slug: 'collars-cases' },
    { name: 'Pallet Collection Service', slug: 'collection' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "PalletPro Solutions has been our go-to supplier for years. Their refurbished pallets are excellent quality and their service is always reliable and prompt.",
    author: "John Smith",
    company: "Logistics Manager, ABC Distribution Ltd"
  },
  {
    quote: "The team helped us switch to heat-treated pallets for our exports, ensuring we were fully compliant. The process was seamless. Highly recommended.",
    author: "Sarah Jones",
    company: "Operations Director, Export Goods Inc."
  },
  {
    quote: "Their pallet collection service is fantastic. It helps us manage our yard space and contributes to our sustainability goals. A true win-win.",
    author: "David Chen",
    company: "Warehouse Supervisor, UK Manufacturing Co."
  }
];

export const FAQ_DATA: FAQItem[] = [
    {
        question: "How do I place an order or get a quote?",
        answer: "The easiest way is to fill out our Quick Quote form on the Contact page. You can also call us directly at 01234 567 890 or email sales@palletpro.co.uk with your requirements."
    },
    {
        question: "What are your delivery times and charges?",
        answer: "We offer next-day delivery on most stock items for orders placed before 12 PM. Delivery charges vary based on location and order size. We will confirm all costs in your official quote."
    },
    {
        question: "Do you collect used or unwanted pallets?",
        answer: "Yes! We offer a nationwide pallet collection and recycling service. Depending on the type and condition of your pallets, we may offer payment or credit. Please visit our 'Pallet Collection' page for more details."
    },
    {
        question: "Are your export pallets ISPM15 compliant?",
        answer: "Absolutely. All our heat-treated pallets are fully compliant with ISPM15 regulations and come with the necessary certification for international shipping."
    },
    {
        question: "Can you make custom-sized pallets?",
        answer: "Yes, we specialise in manufacturing bespoke pallets to your exact dimensions and specifications. Contact our sales team with your requirements to get a custom quote."
    }
];