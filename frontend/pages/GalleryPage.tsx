import React, { useState, useEffect } from 'react';

interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  title: string; // Keeping for data structure, but won't be displayed
  url: string;
  thumbnail?: string;
  description: string; // Keeping for data structure, but won't be displayed
}

const GalleryPage: React.FC = () => {
  // Removed selectedItem state
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null); // New state for in-line video play
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

  const handleItemClick = (item: GalleryItem) => {
    if (item.type === 'video') {
      setActiveVideoId(item.id === activeVideoId ? null : item.id); // Toggle video play
    }
    // Images do nothing on click besides hover effects (unless you want them to open their full-size version, but that would require a modal-like behavior)
  };

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
                onClick={() => handleItemClick(item)} // Use the new click handler
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Media Container */}
                <div className="relative aspect-[9/16] bg-gray-200 overflow-hidden">
                  
                  {/* Conditional rendering for Video Player or Thumbnail */}
                  {item.type === 'video' && item.id === activeVideoId ? (
                    // Video Player (In-line)
                    <video
                      controls
                      autoPlay
                      // Add w-full h-full object-cover to make it fill the container
                      className="w-full h-full object-cover" 
                      onClick={(e) => e.stopPropagation()} // Prevent closing on video controls interaction
                    >
                      <source src={item.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    // Thumbnail (for Images and inactive Videos)
                    <img
                      src={item.thumbnail}
                      alt={`Thumbnail for ${item.type}`} // Simplified alt text
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}

                  {/* Video Play Icon Overlay (only for videos that aren't currently active) */}
                  {item.type === 'video' && item.id !== activeVideoId && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                      <div className="bg-green-600 rounded-full p-3 transform transition-transform duration-300 group-hover:scale-110">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}

                </div>
                {/* Removed the entire p-6 div containing title, type tag, and description */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Removed the entire Modal section */}
    </div>
  );
};

export default GalleryPage;