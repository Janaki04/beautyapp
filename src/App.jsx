import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import ProductListingPage from './pages/ProductListingPage';
import { WishlistProvider } from './components/WishlistContext';
import WishlistPage from './pages/WishlistPage';
import CartPage from './components/CartPage';
import { CartProvider } from './components/CartContext';
import AuthPages from './components/AuthPages';
import FooterInfo from './components/FooterInfo';



const NotFoundPage = () => (
  <div className="p-12 text-center text-gray-800">
    <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
  </div>
);
const EmptyPage = () => (
  <div className="p-12 text-center text-[#000]">
    <h1 className="text-3xl font-bold text-[#000]">Screen Still in progress</h1>
  </div>
);

export default function App() {
  return (
    <CartProvider>
    <WishlistProvider>
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/signup" element={<EmptyPage />} />
            <Route path="/login" element={<AuthPages />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/info" element={<FooterInfo />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer/>
          <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      </div>
    </Router>
    </WishlistProvider>
    </CartProvider>
  );
}