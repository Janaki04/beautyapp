import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductListingPage from './pages/ProductListingPage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './components/CartPage';
import AuthPages from './components/AuthPages';
import FooterInfo from './components/FooterInfo';
import PageWrapper from './components/PageWrapper';

import { WishlistProvider } from './components/WishlistContext';
import { CartProvider } from './components/CartContext';

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
  const location = useLocation();

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
          <Header />
          
          <main className="flex-grow relative overflow-hidden">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route
                  path="/"
                  element={
                    <PageWrapper>
                      <Home />
                    </PageWrapper>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <PageWrapper>
                      <ProductListingPage />
                    </PageWrapper>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <PageWrapper>
                      <EmptyPage />
                    </PageWrapper>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PageWrapper>
                      <AuthPages />
                    </PageWrapper>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <PageWrapper>
                      <CartPage />
                    </PageWrapper>
                  }
                />
                <Route
                  path="/wishlist"
                  element={
                    <PageWrapper>
                      <WishlistPage />
                    </PageWrapper>
                  }
                />
                <Route
                  path="/info"
                  element={
                    <PageWrapper>
                      <FooterInfo />
                    </PageWrapper>
                  }
                />
                <Route
                  path="*"
                  element={
                    <PageWrapper>
                      <NotFoundPage />
                    </PageWrapper>
                  }
                />
              </Routes>
            </AnimatePresence>
          </main>

          <Footer />

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
      </WishlistProvider>
    </CartProvider>
  );
}