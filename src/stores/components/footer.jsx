import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const footerLinks = {
    'Shop': [
      { name: 'Electronics', path: '/mobiles' },
      { name: 'Computers', path: '/computers' },
      { name: 'Fashion', path: '/men' },
      { name: 'Home & Living', path: '/furniture' },
    ],
    'Customer Service': [
      { name: 'Contact Us', path: '/contact' },
      { name: 'Shipping Policy', path: '/shipping' },
      { name: 'Returns & Exchanges', path: '/returns' },
      { name: 'FAQs', path: '/faqs' },
    ],
    'About': [
      { name: 'Our Story', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
      { name: 'Blog', path: '/blog' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'fab fa-facebook-f', url: '#' },
    { name: 'Twitter', icon: 'fab fa-twitter', url: '#' },
    { name: 'Instagram', icon: 'fab fa-instagram', url: '#' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/">
              <motion.h2 
                className="text-2xl font-bold text-primary-500 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                E-Zone
              </motion.h2>
            </Link>
            <p className="text-gray-400 mb-6">
              Your one-stop shop for all things electronic. We bring you the latest
              technology at the best prices.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`${link.icon} text-xl`}></i>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2">
              Subscribe to our Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Stay updated with our latest products and offers
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <motion.button
                type="submit"
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} E-Zone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;