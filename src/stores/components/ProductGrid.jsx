import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu } from '@headlessui/react';
import PropTypes from 'prop-types';
import { 
  ChevronDownIcon,
  FunnelIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import ProductCard from './ProductCard';

const FilterButton = ({ label, options, value, onChange }) => (
  <Menu as="div" className="relative">
    <Menu.Button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
      {label}
      <ChevronDownIcon className="w-4 h-4" />
    </Menu.Button>
    <Menu.Items className="absolute z-10 w-48 mt-2 origin-top-left bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div className="py-1">
        {options.map((option) => (
          <Menu.Item key={option.value}>
            {({ active }) => (
              <button
                className={`${
                  active ? 'bg-gray-100' : ''
                } ${
                  value === option.value ? 'text-primary-600' : 'text-gray-700'
                } block w-full text-left px-4 py-2 text-sm`}
                onClick={() => onChange(option.value)}
              >
                {option.label}
              </button>
            )}
          </Menu.Item>
        ))}
      </div>
    </Menu.Items>
  </Menu>
);

FilterButton.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const ProductGrid = ({ products: initialProducts }) => {
  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    category: 'all',
    rating: 'all',
    brand: 'all'
  });
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get unique brands from products
  const brands = [...new Set(initialProducts.map(product => product.brand))];
  
  // Price range options
  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: 'Over $200', value: '200-plus' }
  ];

  // Rating options
  const ratingOptions = [
    { label: 'All Ratings', value: 'all' },
    { label: '4★ & up', value: '4' },
    { label: '3★ & up', value: '3' },
    { label: '2★ & up', value: '2' }
  ];

  // Sort options
  const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Highest Rated', value: 'rating-desc' },
    { label: 'Most Reviewed', value: 'reviews-desc' }
  ];

  useEffect(() => {
    let filteredProducts = [...initialProducts];

    // Apply filters
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-');
      filteredProducts = filteredProducts.filter(product => {
        if (max === 'plus') {
          return product.price >= Number(min);
        }
        return product.price >= Number(min) && product.price <= Number(max);
      });
    }

    if (filters.rating !== 'all') {
      filteredProducts = filteredProducts.filter(
        product => product.rating >= Number(filters.rating)
      );
    }

    if (filters.brand !== 'all') {
      filteredProducts = filteredProducts.filter(
        product => product.brand === filters.brand
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews-desc':
        filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // 'featured' - maintain original order
        break;
    }

    setProducts(filteredProducts);
  }, [filters, sortBy, initialProducts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Mobile filter dialog */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          isFilterOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-y-0 right-0 flex max-w-xs w-full bg-white shadow-xl">
          <div className="h-full w-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium">Filters</h2>
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setIsFilterOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-900">Price</label>
                  <div className="mt-2 space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range.value} className="flex items-center">
                        <input
                          type="radio"
                          name="price-range"
                          value={range.value}
                          checked={filters.priceRange === range.value}
                          onChange={(e) =>
                            setFilters({ ...filters, priceRange: e.target.value })
                          }
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900">Rating</label>
                  <div className="mt-2 space-y-2">
                    {ratingOptions.map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          value={option.value}
                          checked={filters.rating === option.value}
                          onChange={(e) =>
                            setFilters({ ...filters, rating: e.target.value })
                          }
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-900">Brand</label>
                  <div className="mt-2 space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="brand"
                        value="all"
                        checked={filters.brand === 'all'}
                        onChange={(e) =>
                          setFilters({ ...filters, brand: e.target.value })
                        }
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">All Brands</span>
                    </label>
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="radio"
                          name="brand"
                          value={brand}
                          checked={filters.brand === brand}
                          onChange={(e) =>
                            setFilters({ ...filters, brand: e.target.value })
                          }
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => setIsFilterOpen(true)}
            >
              <FunnelIcon className="w-4 h-4" />
              Filters
            </button>
            <div className="hidden lg:flex items-center gap-2">
              <FilterButton
                label="Price"
                options={priceRanges}
                value={filters.priceRange}
                onChange={(value) => setFilters({ ...filters, priceRange: value })}
              />
              <FilterButton
                label="Rating"
                options={ratingOptions}
                value={filters.rating}
                onChange={(value) => setFilters({ ...filters, rating: value })}
              />
              <FilterButton
                label="Brand"
                options={[
                  { label: 'All Brands', value: 'all' },
                  ...brands.map((brand) => ({ label: brand, value: brand })),
                ]}
                value={filters.brand}
                onChange={(value) => setFilters({ ...filters, brand: value })}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by</span>
            <FilterButton
              label={sortOptions.find((option) => option.value === sortBy).label}
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
            />
          </div>
        </div>

        {/* Active filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (value === 'all') return null;
            const label = (() => {
              switch (key) {
                case 'priceRange':
                  return priceRanges.find((range) => range.value === value)?.label;
                case 'rating':
                  return ratingOptions.find((option) => option.value === value)?.label;
                case 'brand':
                  return value;
                default:
                  return null;
              }
            })();
            if (!label) return null;
            return (
              <button
                key={key}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700"
                onClick={() => setFilters({ ...filters, [key]: 'all' })}
              >
                {label}
                <XMarkIcon className="w-4 h-4 ml-1" />
              </button>
            );
          })}
        </div>

        {/* Product grid */}
        <div className="mt-6">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
          {products.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your filters to find what you&apos;re looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      reviewCount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ProductGrid; 