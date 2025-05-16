import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const WishlistPage = () => {
  const {
    wishlist,
    removeFromWishlist,
    addToCart
  } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Save items you like to your wishlist for later.</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <div className="aspect-w-1 aspect-h-1 rounded-t-xl overflow-hidden">
                <Link to={`/product/${item.category}/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
              >
                <HeartIconSolid className="h-6 w-6 text-red-500" />
              </button>
            </div>
            
            <div className="p-6">
              <Link
                to={`/product/${item.category}/${item.id}`}
                className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors"
              >
                {item.name}
              </Link>
              
              <div className="mt-2 flex items-center">
                {[...Array(5)].map((_, i) => (
                  i < Math.floor(item.rating) ? (
                    <StarIconSolid key={i} className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <StarIcon key={i} className="h-5 w-5 text-gray-300" />
                  )
                ))}
                <span className="ml-2 text-sm text-gray-500">({item.reviewCount})</span>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-gray-900">${item.price.toFixed(2)}</p>
                  {item.originalPrice && (
                    <p className="text-sm text-gray-500 line-through">
                      ${item.originalPrice.toFixed(2)}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className="p-2 rounded-full bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage; 