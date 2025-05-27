import { motion } from 'framer-motion';
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  ChevronDownIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { getPlaceholderImage } from '../../utils/placeholder-images';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const isWishlisted = isInWishlist(product.id);
  const [showDetails, setShowDetails] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Create product URL, handling potential missing category
  const productUrl = product.category 
    ? `/product/${product.category}/${product.id}`
    : `/product/${product.id}`;

  // Get placeholder image based on category
  const imageUrl = product.image.startsWith('http') 
    ? product.image 
    : getPlaceholderImage(product.image.split('/').pop().split('/')[0], product.id);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    // If image fails to load, replace with a fallback
    e.target.src = `https://picsum.photos/seed/fallback-${product.id}/400/400`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md custom-transition overflow-hidden"
    >
      <div className="relative">
        <Link to={productUrl}>
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}
          <img
            src={imageUrl}
            alt={product.name}
            className={`w-full h-48 object-cover ${imageLoaded ? 'loaded' : 'loading'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </Link>
        
        {/* Action Icons Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 custom-transition flex items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
            className="p-3 bg-white rounded-full shadow-md text-gray-700 hover:text-primary-600 custom-transition"
            title="Add to Cart"
          >
            <ShoppingCartIcon className="h-6 w-6" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
            className="p-3 bg-white rounded-full shadow-md text-gray-700 custom-transition"
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            {isWishlisted ? (
              <HeartIconSolid className="h-6 w-6 text-red-500" />
            ) : (
              <HeartIcon className="h-6 w-6 hover:text-red-500" />
            )}
          </motion.button>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to={productUrl}
              className="p-3 bg-white rounded-full shadow-md text-gray-700 hover:text-primary-600 custom-transition inline-block"
              title="View Details"
            >
              <EyeIcon className="h-6 w-6" />
            </Link>
          </motion.div>
        </div>
        
        {product.originalPrice && (
          <div className="absolute top-0 left-0 m-2 z-10">
            <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
              Save ${(product.originalPrice - product.price).toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <Link
          to={productUrl}
          className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors"
        >
          {product.name}
        </Link>
        
        <div className="mt-2 flex items-center">
          {[...Array(5)].map((_, i) => (
            i < Math.floor(product.rating) ? (
              <StarIconSolid key={i} className="h-5 w-5 text-yellow-400" />
            ) : (
              <StarIcon key={i} className="h-5 w-5 text-gray-300" />
            )
          ))}
          <span className="ml-2 text-sm text-gray-500">({product.reviewCount})</span>
        </div>
        
        <p className="text-sm text-gray-600 my-3 line-clamp-2">
          {product.description}
        </p>

        {/* Product Features */}
        <div className="mb-4">
          <button
            className="flex items-center text-sm text-gray-600 hover:text-primary-600"
            onClick={() => setShowDetails(!showDetails)}
          >
            <ChevronDownIcon
              className={`h-4 w-4 mr-1 transform transition-transform ${
                showDetails ? 'rotate-180' : ''
              }`}
            />
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
          
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 space-y-2"
            >
              {product.features && product.features.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Key Features:</h4>
                  <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-900">Specifications:</h4>
                  <dl className="mt-1 space-y-1 text-sm text-gray-600">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex">
                        <dt className="font-medium w-20">{key}:</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </motion.div>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(product)}
              className="p-2 bg-primary-600 rounded-full text-white hover:bg-primary-700 transition-colors"
              title="Add to Cart"
            >
              <ShoppingCartIcon className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
              className={`p-2 rounded-full transition-colors ${isWishlisted ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500 hover:text-red-500'}`}
              title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              {isWishlisted ? (
                <HeartIconSolid className="h-5 w-5" />
              ) : (
                <HeartIcon className="h-5 w-5" />
              )}
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to={productUrl}
                className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-primary-600 transition-colors inline-block"
                title="View Details"
              >
                <EyeIcon className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    rating: PropTypes.number.isRequired,
    reviewCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string),
    specs: PropTypes.object,
    category: PropTypes.string,
  }).isRequired,
};

export default ProductCard; 