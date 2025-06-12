import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import {
  ShoppingCartIcon,
  UserIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const { getCartItemCount } = useStore();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const categories = [
    {
      name: 'Electronics',
      items: [
        { name: 'Smartphones', path: '/mobiles' },
        { name: 'Laptops', path: '/computers' },
        { name: 'Tablets', path: '/tv' },
        { name: 'Accessories', path: '/fashion' }
      ]
    },
    {
      name: 'Fashion',
      items: [
        { name: 'Clothing', path: '/fashion' },
        { name: 'Footwear', path: '/fashion' },
        { name: 'Accessories', path: '/fashion' }
      ]
    },
    {
      name: 'Audio',
      items: [
        { name: 'Headphones', path: '/audio' },
        { name: 'Speakers', path: '/audio' },
        { name: 'Earphones', path: '/audio' }
      ]
    }
  ];

  const handleDropdownClick = (categoryName) => {
    setActiveDropdown(activeDropdown === categoryName ? null : categoryName);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">E-Zone</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Categories Dropdown */}
            {categories.map((category) => (
              <div key={category.name} className="relative">
                <button
                  onClick={() => handleDropdownClick(category.name)}
                  className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                >
                  {category.name}
                  <ChevronDownIcon className="h-4 w-4 ml-1" />
                </button>
                <AnimatePresence>
                  {activeDropdown === category.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                    >
                      {category.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Search, Cart, and User Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-700 hover:text-primary-600 transition-colors">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            <Link to="/wishlist" className="text-gray-700 hover:text-primary-600 transition-colors">
              <HeartIcon className="h-6 w-6" />
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-primary-600 transition-colors relative">
              <ShoppingCartIcon className="h-6 w-6" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>
            <Link to="/account" className="text-gray-700 hover:text-primary-600 transition-colors">
              <UserIcon className="h-6 w-6" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-primary-600 transition-colors"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-2 space-y-1">
              {categories.map((category) => (
                <div key={category.name}>
                  <button
                    onClick={() => handleDropdownClick(category.name)}
                    className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    {category.name}
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === category.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-8"
                      >
                        {category.items.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <Link
                  to="/wishlist"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                >
                  <HeartIcon className="h-5 w-5 mr-2" />
                  Wishlist
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  Cart
                  {getCartItemCount() > 0 && (
                    <span className="ml-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getCartItemCount()}
                    </span>
                  )}
                </Link>
                <Link
                  to="/account"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                >
                  <UserIcon className="h-5 w-5 mr-2" />
                  Account
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;