import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Droplet,
  Rabbit,
  ArrowRight,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  Eye,
  ArrowLeft
} from 'lucide-react';
import ProductDetailsPage from './ProductDetailsPage';
import { useWishlist } from '../components/WishlistContext'; 
import image1 from "../assets/lipsticl.png"
import image2 from "../assets/foundations.png"
import image3 from "../assets/cosemetics.png"
import image4 from "../assets/perfumeblue.png"
import image5 from "../assets/serum.png"
import image6 from "../assets/redfondation.png"
import image7 from "../assets/perfume.png"
import image8 from "../assets/foundation.jpeg"

export default function Bestseller() {
  const { toggleWishlist, isInWishlist } = useWishlist(); 
  const [activeProduct, setActiveProduct] = useState(null);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate('/products', { state: { selectedCategory: categoryName } });
  };

  const handleQuickView = (product) => {
    const fullProductData = {
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      category: product.category || 'Makeup',
      brand: 'Man$JAN Atelier',
      price: parseFloat(product.price.replace('$', '')),
      originalPrice: parseFloat(product.price.replace('$', '')) + 12,
      rating: product.rating,
      reviewCount: product.reviews,
      isNew: product.badge === 'NEW ARRIVAL',
      isBestSeller: true,
      image: product.image,
      images: [product.image],
      shortDescription: `Experience unmatched quality with ${product.name}. Carefully formulated for a radiant finish and long-lasting comfort.`,
      description: `${product.subtitle} with high-potency ingredients.`,
      details: {
        description: `${product.name} blends premium botanical extracts and silk proteins to deliver effortless, weightless beauty.`,
        howToUse: 'Apply evenly over targeted areas. Reapply as desired throughout the day for continuous hydration.',
        ingredients: 'Hyaluronic Acid, Vitamin E, Botanical Oils, Mica, Titanium Dioxide, Rose Water, Squalane.'
      },
      reviews: [
        {
          id: 'r1',
          author: 'Verified Customer',
          rating: product.rating,
          date: '1 week ago',
          comment: 'Absolutely love this product! The quality exceeded my expectations.'
        }
      ],
      bundleItems: [],
      relatedProducts: []
    };

    setActiveProduct(fullProductData);
  };

  const shopCategories = [
    {
      name: 'LIPSTICKS',
      filterName: 'Makeup',
      image: image1,
    },
    {
      name: 'FOUNDATIONS',
      filterName: 'Makeup',
      image: image2,
    },
    {
      name: 'SKINCARE',
      filterName: 'Skincare',
      image: image3,
    },
    {
      name: 'PERFUMES',
      filterName: 'Fragrances',
      image: image4,
    },
    {
      name: 'SERUMS',
      filterName: 'Skincare',
      image: image5,
    },
    {
      name: 'EYE MAKEUP',
      filterName: 'Makeup',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const bestSellers = [
    {
      id: 1,
      badge: 'TRENDING',
      name: 'Man$JAN MATTE LIPSTICK',
      subtitle: 'Velvet Rose',
      category: 'Makeup',
      price: '$28.00',
      rating: 4.9,
      reviews: 128,
      image: image1,
    },
    {
      id: 2,
      badge: 'NEW ARRIVAL',
      name: 'Man$JAN GLOW SERUM',
      subtitle: 'Radiance Boost',
      category: 'Skincare',
      price: '$56.00',
      rating: 5.0,
      reviews: 94,
      image: image5,
    },
    {
      id: 3,
      badge: 'LUXURY PICK',
      name: 'Man$JAN RADIANCE CREAM',
      subtitle: 'Hydrate & Glow',
      category: 'Skincare',
      price: '$68.00',
      rating: 4.8,
      reviews: 210,
      image: image6,
    },
    {
      id: 4,
      badge: 'POPULAR',
      name: 'Man$JAN EAU DE PARFUM',
      subtitle: 'Signature Scent',
      category: 'Fragrances',
      price: '$72.00',
      rating: 4.9,
      reviews: 65,
      image: image7,
    },
    {
      id: 5,
      badge: 'EXCLUSIVE',
      name: 'Man$JAN SILK FOUNDATION',
      subtitle: 'Flawless Finish',
      category: 'Makeup',
      price: '$42.00',
      rating: 4.7,
      reviews: 88,
      image: image8,
    },
  ];

  if (activeProduct) {
    return (
      <div className="bg-[#FAF4F7] min-h-screen">
        <div className="bg-white border-b border-[#D282A8]/20 sticky top-0 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <button
              onClick={() => setActiveProduct(null)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#71305D] text-white text-xs font-bold rounded-xl hover:bg-[#8E507D] transition-colors shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Best Sellers
            </button>
            <span className="text-xs font-serif font-bold text-[#71305D] uppercase tracking-wider hidden sm:block">
              {activeProduct.brand} — {activeProduct.name}
            </span>
          </div>
        </div>

        <ProductDetailsPage productData={activeProduct} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#71305D] text-[#33182C] selection:bg-[#FBAEB9] selection:text-[#71305D]">
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
              <button
                key={idx}
                onClick={() => handleCategoryClick(cat.filterName || cat.name)}
                className="group flex flex-col items-center text-center focus:outline-none cursor-pointer"
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
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="bestsellers" className="py-16 md:py-24 bg-white text-[#33182C] relative z-10 border-t border-[#FBAEB9]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#FAF4F7] pb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif tracking-[0.15em] text-[#71305D] uppercase font-bold mt-1">
                Best Sellers
              </h2>
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <button
                onClick={() => navigate('/products')}
                className="text-xs font-bold tracking-widest text-[#71305D] hover:text-[#D282A8] transition-colors uppercase flex items-center gap-1 group cursor-pointer"
              >
                View All Products
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {bestSellers.map((product) => {
              const isWishlisted = isInWishlist(product.id);
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
                      onClick={() => toggleWishlist(product)}
                      aria-label="Add to Wishlist"
                      className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:text-[#71305D] transition-colors shadow-sm cursor-pointer"
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
                      <button
                        onClick={() => handleQuickView(product)}
                        className="w-full py-2 bg-white text-[#71305D] text-[10px] font-bold tracking-widest uppercase rounded-xs hover:bg-[#FBAEB9] transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                      >
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