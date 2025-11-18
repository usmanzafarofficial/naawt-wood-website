import React, { useState, useRef, useEffect } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  isFallback?: boolean;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Welcome to NAAWT.COM! How can I help you today?", sender: 'bot' },
    { text: "Ask about products, services, or request a quote.", sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isBotTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isBotTyping) return;

    const userMessage: Message = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsBotTyping(true);

    // Simulate bot response with a delay
    setTimeout(() => {
      // Check if the question is outside our knowledge base
      const fallbackKeywords = [
        'weather', 'joke', 'opinion', 'personal', 'love', 'hate', 
        'politics', 'religion', 'sports', 'movie', 'food', 'music',
        'time', 'date', 'math', 'calculate', 'history', 'science',
        'philosophy', 'meaning of life', 'advice', 'therapy'
      ];
      
      const isFallback = fallbackKeywords.some(keyword => 
        userMessage.text.toLowerCase().includes(keyword)
      );
      
      let botResponse: Message;
      if (isFallback) {
        botResponse = {
          text: "I am not able to answer that.",
          sender: 'bot',
          isFallback: true
        };
      } else {
        // Generate a generic response based on keywords
        const text = userMessage.text.toLowerCase();
        if (text.includes('quote') || text.includes('price') || text.includes('cost')) {
          botResponse = {
            text: "You can get a quote by clicking the 'Get a Quote' button on our website or by visiting our contact page.",
            sender: 'bot'
          };
        } else if (text.includes('product') || text.includes('pallet') || text.includes('order')) {
          botResponse = {
            text: "We offer a variety of pallets including new wooden, used wooden, plastic, and heat treated pallets. Visit our products page to see our full range.",
            sender: 'bot'
          };
        } else if (text.includes('contact') || text.includes('phone') || text.includes('email')) {
          botResponse = {
            text: "You can contact us at 01234 567 890 or email us at sales@naawt.com. For quick questions, you can also message us on WhatsApp.",
            sender: 'bot'
          };
        } else if (text.includes('delivery') || text.includes('shipping') || text.includes('dispatch')) {
          botResponse = {
            text: "We offer next day delivery on stock items placed before 12pm. For custom orders, delivery times may vary.",
            sender: 'bot'
          };
        } else if (text.includes('sustain') || text.includes('environment') || text.includes('recycle')) {
          botResponse = {
            text: "We are committed to sustainability. We refurbish and recycle pallets to minimize waste and offer environmentally friendly solutions.",
            sender: 'bot'
          };
        } else {
          botResponse = {
            text: "Thanks for your message! For more specific questions, please visit our contact page or message us on WhatsApp.",
            sender: 'bot'
          };
        }
      }
      
      setMessages(prev => [...prev, botResponse]);
      setIsBotTyping(false);
    }, 1000); // Simulate processing time
  };

  return (
    <>
      {/* Chat Window */}
      <div 
        className={`fixed bottom-20 right-4 z-50 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="w-[calc(100vw-2rem)] max-w-sm sm:w-96 h-[450px] bg-white rounded-lg shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-gray-800 text-white p-3 flex justify-between items-center rounded-t-lg">
            <h3 className="font-semibold text-base">Live Chat | NAAWT.COM</h3>
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto bg-gray-50 text-sm">
            <div className="space-y-3">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                    {msg.isFallback ? (
                      <p>
                        I am not able to answer that. For more specific questions, please message us on{' '}
                        <a href="https://wa.me/441234567890?text=Hello%20NAAWT.COM,%20I%20have%20a%20question." target="_blank" rel="noopener noreferrer" className="text-green-800 underline font-bold">
                          WhatsApp.
                        </a>
                      </p>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}
              {isBotTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] px-3 py-2 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
                    <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Form */}
          <div className="p-3 border-t border-gray-200 bg-white rounded-b-lg">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                aria-label="Chat message input"
              />
              <button type="submit" className="bg-green-600 text-white px-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center disabled:opacity-50" aria-label="Send message" disabled={isBotTyping}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 ring-offset-2 ring-green-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-50 w-14 h-14"
        aria-label={isOpen ? "Close live chat" : "Open live chat"}
      >
        <div className="relative w-7 h-7 overflow-hidden">
          {/* Chat Icon */}
          <div className={`absolute inset-0 transition-all duration-300 ease-in-out transform ${isOpen ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          {/* Close Icon */}
          <div className={`absolute inset-0 transition-all duration-300 ease-in-out transform ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </button>
    </>
  );
};

export default ChatWidget;