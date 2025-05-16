import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { mobileData } from '../data/mobiles';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const MobilePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const products = mobileData.map(item => ({
    id: item.id.toString(),
    name: `${item.company} ${item.model}`,
    brand: item.company,
    image: item.image,
    price: Number(item.price),
    rating: Number(item.rating) || 4.5,
    reviewCount: Number(item.reviewCount) || 100,
    originalPrice: item.originalPrice ? Number(item.originalPrice) : undefined,
    description: item.description,
    features: item.features || [],
    specs: item.specs || {}
  }));

  // Featured products (top 4 rated products)
  const featuredProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // Carousel data
  const carouselItems = [
    {
      image: "/assests/NewMobile/11.jpg",
      title: "iPhone 15 Pro Max",
      description: "Experience the power of innovation",
      color: "from-purple-500 to-indigo-700"
    },
    {
      image: "/assests/NewMobile/2.jpg",
      title: "Samsung Galaxy S24 Ultra",
      description: "Next-level AI capabilities",
      color: "from-blue-500 to-blue-700"
    },
    {
      image: "/assests/NewMobile/3.jpg",
      title: "Google Pixel 8 Pro",
      description: "The smartest Pixel yet",
      color: "from-green-500 to-green-700"
    }
  ];

  // Autoplay carousel
  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay, carouselItems.length]);

  // Group products by brand
  const brandGroups = products.reduce((acc, product) => {
    if (!acc[product.brand]) {
      acc[product.brand] = [];
    }
    acc[product.brand].push(product);
    return acc;
  }, {});

  return (
    <div className="bg-gray-50">
      {/* Hero Carousel */}
      <div className="relative h-[600px] overflow-hidden">
        {carouselItems.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 ${
              index === currentSlide ? 'z-10' : 'z-0'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-80`} />
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-6xl font-bold mb-4"
                >
                  {item.title}
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl"
                >
                  {item.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Carousel Controls */}
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => {
                setCurrentSlide(index);
                setAutoplay(false);
              }}
            />
          ))}
        </div>
        
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2"
          onClick={() => {
            setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
            setAutoplay(false);
          }}
        >
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2"
          onClick={() => {
            setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
            setAutoplay(false);
          }}
        >
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
            Featured Devices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      ({product.reviewCount})
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Brand Categories */}
      {Object.entries(brandGroups).map(([brand, brandProducts], index) => (
        <div
          key={brand}
          className={`${
            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
          } py-16`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
                {brand} Smartphones
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {brandProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                        <button className="bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700 transition-colors">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      ))}

      {/* Features Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="h-12 w-12 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-white/80">Get your device delivered within 24 hours</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-white/80">100% secure payment processing</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-white/80">Round the clock customer support</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MobilePage;
