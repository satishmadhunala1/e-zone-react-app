import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  StarIcon, 
  ShoppingCartIcon, 
  HeartIcon, 
  ShareIcon,
  ArrowLeftIcon,
  TruckIcon,
  ShieldCheckIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useStore } from '../context/StoreContext';
import { getProductsByCategory, categories } from '../data/products';

const SingleProductPage = () => {
  const { id, category } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        // Get all products for the category
        const categoryProducts = getProductsByCategory(category);
        
        // Find the specific product
        const foundProduct = categoryProducts.find(p => p.id === id);
        
        if (!foundProduct) {
          navigate('/404');
          return;
        }
        
        setProduct(foundProduct);
        
        // Get related products (different products from same category)
        const related = categoryProducts
          .filter(p => p.id !== id)
          .sort(() => 0.5 - Math.random()) // Shuffle
          .slice(0, 4); // Get 4 random products
          
        setRelatedProducts(related);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        navigate('/404');
      }
    }, 500);
  }, [id, category, navigate]);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(10, quantity + value));
    setQuantity(newQuantity);
  };
  
  const handleAddToCart = () => {
    if (product) {
      // Add the product to cart multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };
  
  const toggleWishlist = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Generate a few product images for the gallery
  const productImages = Array.from({ length: 4 }, (_, i) => 
    product.image.replace(/(\d+)\.jpg$/, (match, number) => 
      `${Math.max(1, (parseInt(number) + i) % 12 || 1)}.jpg`
    )
  );
  
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            </li>
            <li>
              <span className="text-gray-400 mx-2">/</span>
              <Link to={`/${category}`} className="text-gray-500 hover:text-gray-700 capitalize">{category.replace(/-/g, ' ')}</Link>
            </li>
            <li>
              <span className="text-gray-400 mx-2">/</span>
              <span className="text-gray-900">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-200"
            >
              <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-primary-500 scale-105' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-center object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 lg:p-8 space-y-6"
            >
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="mt-2 text-lg text-gray-600">{product.description}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    i < Math.floor(product.rating) ? (
                      <StarIconSolid key={i} className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <StarIcon key={i} className="h-5 w-5 text-gray-300" />
                    )
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  {product.rating} ({product.reviewCount} reviews)
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                {product.originalPrice && (
                  <p className="text-xl text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </p>
                )}
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <TruckIcon className="h-6 w-6 text-primary-600" />
                  <span className="text-sm text-gray-600">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ShieldCheckIcon className="h-6 w-6 text-primary-600" />
                  <span className="text-sm text-gray-600">2 Year Warranty</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckBadgeIcon className="h-6 w-6 text-primary-600" />
                  <span className="text-sm text-gray-600">In Stock: {product.stock}</span>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center space-x-3">
                <span className="text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-gray-700">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={toggleWishlist}
                    className={`flex items-center justify-center space-x-2 border rounded-md px-6 py-3 transition-colors ${
                      isWishlisted 
                        ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {isWishlisted ? (
                      <>
                        <HeartIconSolid className="h-5 w-5 text-red-500" />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <HeartIcon className="h-5 w-5" />
                        <span>Save</span>
                      </>
                    )}
                  </button>
                  <button className="flex items-center justify-center space-x-2 border border-gray-300 rounded-md px-6 py-3 hover:bg-gray-50 transition-colors">
                    <ShareIcon className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mt-8">
                <nav className="flex space-x-8" aria-label="Tabs">
                  {['description', 'features', 'specifications'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`
                        py-4 px-1 border-b-2 font-medium text-sm capitalize
                        ${selectedTab === tab
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }
                      `}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="prose prose-sm max-w-none py-4">
                {selectedTab === 'description' && (
                  <p className="text-gray-700">{product.description}</p>
                )}
                {selectedTab === 'features' && (
                  <ul className="space-y-2 list-disc pl-5">
                    {product.features?.map((feature, index) => (
                      <li key={index} className="text-gray-700">{feature}</li>
                    ))}
                  </ul>
                )}
                {selectedTab === 'specifications' && (
                  <dl className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="font-medium text-gray-900">Brand</dt>
                        <dd className="mt-1 text-gray-600">{product.brand || 'Unknown'}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Model</dt>
                        <dd className="mt-1 text-gray-600">{product.name}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Category</dt>
                        <dd className="mt-1 text-gray-600 capitalize">{product.category.replace(/-/g, ' ')}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Stock</dt>
                        <dd className="mt-1 text-gray-600">{product.stock} units</dd>
                      </div>
                    </div>
                    {/* Add other specifications if available */}
                    {product.specs && Object.entries(product.specs).map(([key, value]) => (
                      <div key={key}>
                        <dt className="font-medium text-gray-900 capitalize">{key.replace(/_/g, ' ')}</dt>
                        <dd className="mt-1 text-gray-600">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <Link to={`/product/${category}/${relatedProduct.id}`}>
                    <div className="aspect-w-1 aspect-h-1 w-full">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{relatedProduct.name}</h3>
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          i < Math.floor(relatedProduct.rating) ? (
                            <StarIconSolid key={i} className="h-4 w-4 text-yellow-400" />
                          ) : (
                            <StarIcon key={i} className="h-4 w-4 text-gray-300" />
                          )
                        ))}
                        <span className="text-xs text-gray-500">({relatedProduct.reviewCount})</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">${relatedProduct.price.toFixed(2)}</span>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(relatedProduct);
                          }}
                          className="p-2 bg-primary-600 rounded-full text-white hover:bg-primary-700 transition-colors"
                        >
                          <ShoppingCartIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProductPage; 