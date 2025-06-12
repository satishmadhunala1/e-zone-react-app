import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { getProductsByCategory, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  FunnelIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

// The CategoryPage component can receive the category either from URL params or from props
const CategoryPage = ({ category: categoryProp }) => {
  // Get category from URL params
  const { category: categoryParam } = useParams();
  
  // Use the prop if provided, otherwise use the URL param
  const category = categoryProp || categoryParam;
  
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    rating: 0,
    brands: []
  });
  const [error, setError] = useState(null);

  // Check if category exists in our defined categories
  const isValidCategory = category && categories.some(cat => cat.id === category);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // If the category doesn't exist in our predefined list, show error immediately
    if (!isValidCategory) {
      setError(`Category "${category || 'unknown'}" doesn't exist.`);
      setLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      try {
        const categoryProducts = getProductsByCategory(category);
        
        if (categoryProducts.length === 0) {
          setError(`No products found in the "${category}" category.`);
        }
        
        setFilters(prev => ({
          ...prev,
          brands: []
        }));
        
        setProducts(categoryProducts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    }, 500);
  }, [category, isValidCategory]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleBrandFilter = (brand) => {
    setFilters(prev => {
      const currentBrands = [...prev.brands];
      if (currentBrands.includes(brand)) {
        return {
          ...prev,
          brands: currentBrands.filter(b => b !== brand)
        };
      } else {
        return {
          ...prev,
          brands: [...currentBrands, brand]
        };
      }
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesPrice = product.price >= filters.priceRange[0] && 
                        product.price <= filters.priceRange[1];
    const matchesRating = product.rating >= filters.rating;
    const matchesBrand = filters.brands.length === 0 || 
                        filters.brands.includes(product.brand || 'Unknown');
    return matchesPrice && matchesRating && matchesBrand;
  });

  // Get unique brands for filter
  const uniqueBrands = [...new Set(products.map(product => product.brand || 'Unknown'))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <FunnelIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{error}</h2>
          <p className="text-gray-600 mb-6">
            {isValidCategory 
              ? "Try checking out our other categories or return to the homepage." 
              : "The category you're looking for doesn't exist. Please check our available categories."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            {!isValidCategory && (
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Category Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 capitalize mb-2 mt-6 ">
            {category.replace(/-/g, ' ')}
          </h1>
          <p className="text-gray-600">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="w-full lg:w-2/3">
              <SearchBar />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 h-fit"
            >
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <div className="flex items-center justify-between mb-6 border-b pb-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6 border-b pb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Price Range</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Min: ${filters.priceRange[0]}</span>
                      <span className="text-sm text-gray-600">Max: ${filters.priceRange[1]}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={filters.priceRange[0]}
                        onChange={(e) => handleFilterChange('priceRange', [Number(e.target.value), filters.priceRange[1]])}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                        placeholder="Min"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        value={filters.priceRange[1]}
                        onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6 border-b pb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Rating</h3>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                  >
                    <option value="0">Any Rating</option>
                    <option value="4">4★ & Up</option>
                    <option value="3">3★ & Up</option>
                    <option value="2">2★ & Up</option>
                    <option value="1">1★ & Up</option>
                  </select>
                </div>

                {/* Brand Filter */}
                {uniqueBrands.length > 0 && (
                  <div className="mb-6 border-b pb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Brand</h3>
                    <div className="space-y-3">
                      {uniqueBrands.map(brand => (
                        <div key={brand} className="flex items-center">
                          <input
                            id={`brand-${brand}`}
                            type="checkbox"
                            checked={filters.brands.includes(brand)}
                            onChange={() => toggleBrandFilter(brand)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`brand-${brand}`} className="ml-2 text-sm text-gray-600">
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setFilters({
                    priceRange: [0, 5000],
                    rating: 0,
                    brands: []
                  })}
                  className="w-full px-4 py-2 text-sm text-primary-600 border border-primary-600 rounded-md hover:bg-primary-50 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </motion.aside>
          )}

          {/* Product Grid */}
          <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            {filteredProducts.length > 0 ? (
              <div className={`grid grid-cols-1 md:grid-cols-2 ${showFilters ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="col-span-full flex items-center justify-center p-12 bg-white rounded-lg shadow-sm">
                <div className="text-center">
                  <FunnelIcon className="h-10 w-10 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No products match your filters</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or browsing another category</p>
                  <button
                    onClick={() => setFilters({
                      priceRange: [0, 5000],
                      rating: 0,
                      brands: []
                    })}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

CategoryPage.propTypes = {
  category: PropTypes.string
};

export default CategoryPage; 