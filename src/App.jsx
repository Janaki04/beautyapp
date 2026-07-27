import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import ProductListingPage from './pages/ProductListingPage';



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
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/about" element={<EmptyPage />} />
            <Route path="/contacts" element={<EmptyPage />} />
            <Route path="/signup" element={<EmptyPage />} />
            <Route path="/login" element={<EmptyPage />} />
            <Route path="/cart" element={<EmptyPage />} />
            <Route path="/wishlist" element={<EmptyPage />} />
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
  );
}