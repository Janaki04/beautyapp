import React, { useState } from 'react';
import {
  Sparkles,
  Droplet,
  Rabbit,
  ArrowRight,
  ShoppingBag,
  Search,
  Menu,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';

export default function Bestseller() {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const features = [
    { icon: Sparkles, title: 'PREMIUM INGREDIENTS' },
    { icon: Droplet, title: 'DERMATOLOGICALLY TESTED' },
    { icon: Rabbit, title: 'CRUELTY FREE' },
  ];

  const shopCategories = [
    {
      name: 'LIPSTICKS',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'FOUNDATIONS',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'SKINCARE',
      image: 'https://images.unsplash.com/photo-1608248597263-00079e96447c?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'PERFUMES',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'SERUMS',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'EYE MAKEUP',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const bestSellers = [
    {
      id: 1,
      badge: 'TRENDING',
      name: 'LUNÉVA MATTE LIPSTICK',
      subtitle: 'Velvet Rose',
      price: '$28.00',
      rating: 4.9,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      badge: 'NEW ARRIVAL',
      name: 'LUNÉVA GLOW SERUM',
      subtitle: 'Radiance Boost',
      price: '$56.00',
      rating: 5.0,
      reviews: 94,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      badge: 'LUXURY PICK',
      name: 'LUNÉVA RADIANCE CREAM',
      subtitle: 'Hydrate & Glow',
      price: '$68.00',
      rating: 4.8,
      reviews: 210,
      image: 'https://images.unsplash.com/photo-1608248597263-00079e96447c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 4,
      badge: 'POPULAR',
      name: 'LUNÉVA EAU DE PARFUM',
      subtitle: 'Signature Scent',
      price: '$72.00',
      rating: 4.9,
      reviews: 65,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 5,
      badge: 'EXCLUSIVE',
      name: 'LUNÉVA SILK FOUNDATION',
      subtitle: 'Flawless Finish',
      price: '$42.00',
      rating: 4.7,
      reviews: 88,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-[#71305D] text-[#33182C] selection:bg-[#FBAEB9] selection:text-[#71305D]">
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.08); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(20px) scale(1.12); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out 2s infinite;
        }
      `}</style>
      <section id="categories" className="py-16 md:py-24 bg-[#FAF4F7] text-[#33182C] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif tracking-[0.2em] text-[#71305D] uppercase font-bold">
              Shop By Category
            </h2>
            <div className="w-12 h-[2px] bg-[#D282A8] mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {shopCategories.map((cat, idx) => (
              <a
                key={idx}
                href={`#${cat.name.toLowerCase()}`}
                className="group flex flex-col items-center text-center focus:outline-none"
              >
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 border-2 border-[#D282A8]/30 group-hover:border-[#71305D] transition-all duration-500 bg-white shadow-md group-hover:shadow-[0_10px_25px_rgba(113,48,93,0.25)] group-hover:-translate-y-1.5">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-[#71305D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <span className="mt-4 text-xs font-semibold tracking-widest text-[#71305D] group-hover:text-[#D282A8] transition-colors duration-200">
                  {cat.name}
                </span>
              </a>
            ))}
          </div>

        </div>
      </section>
      <section id="bestsellers" className="py-16 md:py-24 bg-white text-[#33182C] relative z-10 border-t border-[#FBAEB9]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#FAF4F7] pb-6">
            <div>
              <span className="text-xs tracking-[0.25em] text-[#D282A8] font-bold uppercase">Curated Favorites</span>
              <h2 className="text-2xl sm:text-3xl font-serif tracking-[0.15em] text-[#71305D] uppercase font-bold mt-1">
                Best Sellers
              </h2>
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a
                href="#all-products"
                className="text-xs font-bold tracking-widest text-[#71305D] hover:text-[#D282A8] transition-colors uppercase flex items-center gap-1 group"
              >
                View All Products
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-gray-200">
                <button
                  aria-label="Previous Products"
                  className="p-2 rounded-full border border-gray-200 hover:border-[#71305D] hover:bg-[#71305D] hover:text-white text-gray-600 transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  aria-label="Next Products"
                  className="p-2 rounded-full border border-gray-200 hover:border-[#71305D] hover:bg-[#71305D] hover:text-white text-gray-600 transition-all duration-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {bestSellers.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="group flex flex-col justify-between rounded-lg bg-[#FAF4F7]/40 p-3 border border-transparent hover:border-[#FBAEB9]/50 hover:bg-white hover:shadow-[0_15px_30px_rgba(113,48,93,0.08)] transition-all duration-300 relative"
                >
                  <div className="relative w-full h-64 sm:h-56 rounded-md overflow-hidden bg-white">
                    <span className="absolute top-2 left-2 z-10 text-[9px] font-bold tracking-wider uppercase px-2 py-1 bg-[#71305D] text-white rounded-xs shadow-sm">
                      {product.badge}
                    </span>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Add to Wishlist"
                      className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:text-[#71305D] transition-colors shadow-sm"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isWishlisted ? 'fill-[#71305D] text-[#71305D]' : ''
                        }`}
                      />
                    </button>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-[#71305D]/80 to-transparent flex justify-center">
                      <button className="w-full py-2 bg-white text-[#71305D] text-[10px] font-bold tracking-widest uppercase rounded-xs hover:bg-[#FBAEB9] transition-colors shadow-md flex items-center justify-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        Quick View
                      </button>
                    </div>

                  </div>
                  <div className="mt-4 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-xs font-bold tracking-wider text-[#71305D] uppercase line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-gray-500 font-light mt-0.5">
                        {product.subtitle}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#71305D]">
                        {product.price}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span className="text-[10px] font-medium text-gray-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}