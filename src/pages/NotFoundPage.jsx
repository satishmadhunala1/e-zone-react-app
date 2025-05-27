import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon } from '@heroicons/react/24/outline';

const NotFoundPage = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* 404 Image or Fallback */}
          <div className="relative w-full aspect-[4/3] max-w-md mx-auto">
            {!imageError ? (
              <img
                src="/assets/404.svg"
                alt="404 Not Found"
                className="w-full h-full object-contain"
                onError={() => setImageError(true)}
                loading="eager"
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="text-8xl sm:text-9xl font-bold text-primary-600 select-none">
                  404
                </span>
              </motion.div>
            )}
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Page Not Found
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-sm"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
            >
              Go Back
            </button>
          </div>

          {/* Additional Help */}
          <div className="text-gray-600">
            <p className="mb-2">Need help finding something?</p>
            <Link
              to="/help"
              className="inline-flex text-primary-600 hover:text-primary-500 font-medium transition-colors"
            >
              Visit our Help Center
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage; 