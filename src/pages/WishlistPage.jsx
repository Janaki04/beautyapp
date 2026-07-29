import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Star,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Package
} from 'lucide-react';
import { useWishlist } from '../components/WishlistContext';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, clearWishlist, wishlistCount } = useWishlist();
  const [toastMessage, setToastMessage] = useState(null);
  const navigate = useNavigate();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleMoveToCart = (product) => {
    
    toggleWishlist(product);
    showToast(`"${product.name}" moved to your bag!`);
  };

  const handleMoveAllToCart = () => {
    if (wishlist.length === 0) return;
    
    clearWishlist();
    showToast('All items moved to your bag!');
  };

  return (
    <div className="min-h-screen bg-[#FAF4F7] text-[#33182C] selection:bg-[#FBAEB9] selection:text-[#71305D] pb-20">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#71305D] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-bounce border border-[#FBAEB9]/30">
          <CheckCircle2 className="w-5 h-5 text-[#FBAEB9]" />
          <span className="text-xs font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

      <div className="bg-white border-b border-[#D282A8]/20 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#71305D] hover:text-[#D282A8] transition-colors mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#71305D] fill-[#71305D]" />
                <span className="text-xs font-bold tracking-[0.2em] text-[#D282A8] uppercase">
                  Your Saved Treasures
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif text-[#71305D] font-bold uppercase tracking-wider mt-1">
                My Wishlist
              </h1>
            </div>

            {wishlistCount > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={clearWishlist}
                  className="px-4 py-2 border border-gray-200 text-xs font-bold tracking-wider uppercase text-gray-500 rounded-xl hover:bg-gray-50 hover:text-red-600 transition-colors cursor-pointer"
                >
                  Clear All
                </button>
                <button
                  onClick={handleMoveAllToCart}
                  className="px-5 py-2.5 bg-[#71305D] text-white text-xs font-bold tracking-wider uppercase rounded-xl hover:bg-[#8E507D] transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Move All To Bag
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {wishlistCount === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center max-w-lg mx-auto my-12 border border-[#D282A8]/20 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-[#FAF4F7] text-[#71305D] flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 stroke-[1.5]" />
            </div>
            
            <h2 className="text-xl font-serif font-bold text-[#71305D] uppercase tracking-wider">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-gray-500 font-light mt-2 max-w-sm mx-auto leading-relaxed">
              Explore our boutique collection and tap the heart icon on any product to save your luxury beauty favorites here.
            </p>

            <button
              onClick={() => navigate('/products')}
              className="mt-8 px-8 py-3.5 bg-[#71305D] text-white text-xs font-bold tracking-widest uppercase rounded-xl hover:bg-[#8E507D] transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-[#FBAEB9]" />
              Explore Products
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {wishlist.map((item) => {
                const product = typeof item === 'object' ? item : { id: item };
                const priceFormatted = typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : (product.price || '$0.00');

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl border border-gray-100 hover:border-[#FBAEB9]/50 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative">
                      <button
                        onClick={() => toggleWishlist(product)}
                        title="Remove from wishlist"
                        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-xs text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-xs cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {product.badge && (
                        <span className="absolute top-3 left-3 z-10 text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 bg-[#71305D] text-white rounded-md shadow-xs">
                          {product.badge}
                        </span>
                      )}

                      <div className="w-full h-56 bg-[#FAF4F7] overflow-hidden relative">
                        <img
                          src={product.image || 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80'}
                          alt={product.name || 'Product'}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-[#D282A8] uppercase">
                          {product.category || 'Atelier Collection'}
                        </span>
                        <h3 className="text-xs font-bold tracking-wider text-[#71305D] uppercase mt-0.5 line-clamp-1">
                          {product.name || `Luxury Product #${product.id}`}
                        </h3>
                        {product.subtitle && (
                          <p className="text-[11px] text-gray-500 font-light mt-0.5 line-clamp-1">
                            {product.subtitle}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-sm font-bold text-[#71305D]">
                          {priceFormatted}
                        </span>
                        
                        {product.rating && (
                          <div className="flex items-center gap-1 text-amber-400">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span className="text-[10px] font-medium text-gray-600">
                              {product.rating}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4">
                        <button
                          onClick={() => handleMoveToCart(product)}
                          className="w-full py-2.5 bg-[#71305D] text-white text-[11px] font-bold tracking-widest uppercase rounded-xl hover:bg-[#8E507D] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Move To Bag
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs sticky top-8">
                <h3 className="text-sm font-serif font-bold text-[#71305D] uppercase tracking-wider pb-3 border-b border-gray-100">
                  Wishlist Overview
                </h3>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Saved Items</span>
                    <span className="font-bold text-[#71305D]">{wishlistCount}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Availability</span>
                    <span className="text-emerald-600 font-semibold">In Stock</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Complimentary Gift</span>
                    <span className="text-[#D282A8] font-semibold">Eligible</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
                  <button
                    onClick={handleMoveAllToCart}
                    className="w-full py-3 bg-[#71305D] text-white text-xs font-bold tracking-widest uppercase rounded-xl hover:bg-[#8E507D] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Move All To Bag
                  </button>
                  <button
                    onClick={() => navigate('/products')}
                    className="w-full py-2.5 bg-[#FAF4F7] text-[#71305D] text-xs font-bold tracking-widest uppercase rounded-xl hover:bg-[#FBAEB9]/20 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>

                <div className="mt-6 bg-[#FAF4F7] p-3.5 rounded-xl flex items-center gap-3">
                  <Package className="w-5 h-5 text-[#71305D] shrink-0" />
                  <p className="text-[10px] text-gray-600 leading-tight">
                    Enjoy complimentary signature gift wrapping & free delivery on orders over $50.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}