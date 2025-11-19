import React, { useState, useEffect } from 'react';

interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  title: string;
  url: string;
  thumbnail?: string;
  description: string;
}

const GalleryPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const galleryItems: GalleryItem[] = [
    { id: 1, type: 'image', title: 'Image 1', url: '/images/pic1.jpeg', thumbnail: '/images/pic1.jpeg', description: 'Image 1 description.' },
    { id: 2, type: 'image', title: 'Image 2', url: '/images/pic2.jpeg', thumbnail: '/images/pic2.jpeg', description: 'Image 2 description.' },
    { id: 3, type: 'image', title: 'Image 3', url: '/images/pic3.jpeg', thumbnail: '/images/pic3.jpeg', description: 'Image 3 description.' },
    { id: 4, type: 'image', title: 'Image 4', url: '/images/pic4.jpeg', thumbnail: '/images/pic4.jpeg', description: 'Image 4 description.' },
    { id: 5, type: 'image', title: 'Image 5', url: '/images/pic5.jpeg', thumbnail: '/images/pic5.jpeg', description: 'Image 5 description.' },
    { id: 6, type: 'image', title: 'Image 6', url: '/images/pic6.jpeg', thumbnail: '/images/pic6.jpeg', description: 'Image 6 description.' },
    { id: 7, type: 'video', title: 'Video 1', url: '/videos/vid1.MOV', thumbnail: '/images/th1.png', description: 'Video 1 description.' },
    { id: 8, type: 'video', title: 'Video 2', url: '/videos/vid2.MOV', thumbnail: '/images/th2.png', description: 'Video 2 description.' },
    { id: 9, type: 'video', title: 'Video 3', url: '/videos/vid3.MOV', thumbnail: '/images/th3.png', description: 'Video 3 description.' },
    { id: 10, type: 'video', title: 'Video 4', url: '/videos/vid4.MOV', thumbnail: '/images/th4.png', description: 'Video 4 description.' },
    { id: 11, type: 'video', title: 'Video 5', url: '/videos/vid5.MOV', thumbnail: '/images/th5.png', description: 'Video 5 description.' },
    { id: 12, type: 'video', title: 'Video 6', url: '/videos/vid6.MOV', thumbnail: '/images/th6.png', description: 'Video 6 description.' },
  ];

  // Handle smooth scrolling behavior
  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
        window.requestAnimationFrame(() => {
          setIsScrolling(false);
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolling]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">Gallery</h1>
          <p className="text-lg max-w-2xl mx-auto text-green-100 text-center">
            View highlights of our operations, infrastructure, and production excellence.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Adjusted aspect ratio for vertical content */}
                <div className="relative aspect-[9/16] bg-gray-200 overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                      <div className="bg-green-600 rounded-full p-3 transform transition-transform duration-300 group-hover:scale-110">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                    item.type === 'image' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {item.type === 'image' ? 'Photo' : 'Video'}
                  </span>
                  <p className="mt-3 text-gray-600 text-sm line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 transition-opacity duration-300"
          onClick={(e) => e.target === e.currentTarget && setSelectedItem(null)}
        >
          <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center overflow-hidden">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 bg-gray-900 text-white rounded-full p-2 hover:bg-gray-800 z-10 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-full h-full flex items-center justify-center p-4 bg-black">
              {selectedItem.type === 'image' ? (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              ) : (
                <video
                  controls
                  autoPlay
                  className="max-w-full max-h-[70vh] rounded-lg"
                >
                  <source src={selectedItem.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            <div className="p-6 w-full bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedItem.title}</h2>
              <p className="text-gray-700">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;