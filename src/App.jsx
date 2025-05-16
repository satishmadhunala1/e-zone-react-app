import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { StoreProvider } from './stores/context/StoreContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Pages
import LandingPage from './stores/pages/LandingPage';
import CategoryPage from './stores/pages/CategoryPage';
import SingleProductPage from './stores/pages/SingleProductPage';
import CartPage from './stores/pages/CartPage';
import WishlistPage from './stores/pages/WishlistPage';
import AccountPage from './stores/pages/AccountPage';
import NotFoundPage from './stores/pages/NotFoundPage';

// Components
import Navbar from './stores/components/Navbar';
import Footer from './stores/components/Footer';

// Auth
import Login from './stores/Login';
import CreateAccount from './stores/CreateAccount';

const App = () => {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Routes>
                <Route path="/" element={<LandingPage />} />
                
                {/* Specific Category Routes - these will take precedence over the generic route */}
                <Route path="/mobiles" element={<CategoryPage category="mobiles" />} />
                <Route path="/computers" element={<CategoryPage category="computers" />} />
                <Route path="/tv" element={<CategoryPage category="tv" />} />
                <Route path="/audio" element={<CategoryPage category="audio" />} />
                <Route path="/fashion" element={<CategoryPage category="fashion" />} />
                <Route path="/home" element={<CategoryPage category="home" />} />
                <Route path="/watches" element={<CategoryPage category="watches" />} />
                <Route path="/books" element={<CategoryPage category="books" />} />
                
                {/* Generic Category Route - handles all other categories */}
                <Route path="/:category" element={<CategoryPage />} />
                
                {/* Gaming Routes */}
                <Route path="/gaming/consoles" element={<CategoryPage category="gaming-consoles" />} />
                <Route path="/gaming/accessories" element={<CategoryPage category="gaming-accessories" />} />
                <Route path="/gaming/pcs" element={<CategoryPage category="gaming-pcs" />} />
                
                {/* Audio Routes */}
                <Route path="/audio/headphones" element={<CategoryPage category="headphones" />} />
                <Route path="/audio/speakers" element={<CategoryPage category="speakers" />} />
                <Route path="/audio/earphones" element={<CategoryPage category="earphones" />} />
                
                {/* Single Product Routes */}
                <Route path="/product/:category/:id" element={<SingleProductPage />} />
                
                {/* User Routes */}
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-account" element={<CreateAccount />} />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </StoreProvider>
  );
};

export default App;