import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Eye, 
  Star, 
  X, 
  Check, 
  Sparkles
} from 'lucide-react';
import { useWishlist } from '../components/WishlistContext';
import { useCart } from '../components/CartContext';
import image1 from "../assets/foundation.jpeg"
import image2 from "../assets/redfondation.png"
import image3 from "../assets/cosemetics.png"
import image4 from "../assets/perfume.png"

const PRODUCTS = [
  {
    id: 1,
    name: 'Velvet Matte Lipstick',
    category: 'Makeup',
    shade: 'Rose Dusk',
    price: 34,
    rating: 4.9,
    reviews: 128,
    badge: 'Best Seller',
    image: image2,
    description: 'Infused with hydrating hyaluronic acid and rich pigments for a featherweight, all-day matte finish.'
  },
  {
    id: 2,
    name: 'Luminous Glow Serum',
    category: 'Skincare',
    shade: '30ml / 1.0 fl oz',
    price: 68,
    rating: 5.0,
    reviews: 94,
    badge: 'New Formula',
    image: image3,
    description: 'A botanical Niacinamide and Rose Extract serum engineered to restore natural radiance and deep moisture.'
  },
  {
    id: 3,
    name: 'Celestial Eau de Parfum',
    category: 'Fragrance',
    shade: '50ml Spray',
    price: 110,
    rating: 4.8,
    reviews: 62,
    badge: 'Limited Edition',
    image: image4,
    description: 'Notes of Jasmine Sambac, Warm Amber, and Fresh Bergamot create an unforgettable, romantic sillage.'
  },
  {
    id: 4,
    name: 'Silk Elixir Foundation',
    category: 'Makeup',
    shade: 'Warm Honey (Shade 04)',
    price: 52,
    rating: 4.7,
    reviews: 215,
    badge: 'Trending',
    image: image1,
    description: 'Medium-to-full buildable coverage with a seamless natural satin finish that breathes with your skin.'
  }
];

const CATEGORIES = ['All', 'Makeup', 'Skincare', 'Fragrance'];

export default function NewArrivals() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [addedToast, setAddedToast] = useState('');

  const { toggleWishlist, isInWishlist } = useWishlist();
  const { cart, addToCart } = useCart();

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedToast(`${product.name} added to bag!`);
    setTimeout(() => setAddedToast(''), 3000);
  };

  return (
    <section className="bg-[#fff] text-[#33182C] py-20 px-4 sm:px-6 lg:px-8 font-sans transition-colors relative">
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#71305D] text-[#FAF4F7] px-5 py-3 rounded-full shadow-xl border border-[#D282A8]/40 text-xs font-medium animate-bounce">
          <Check className="w-4 h-4 text-[#FBAEB9]" />
          <span>{addedToast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-start text-3xl sm:text-4xl font-serif font-bold text-[#71305D] tracking-tight">
              New Arrivals
            </h2>
            <p className="text-start text-xs sm:text-sm text-[#8E507D] mt-2 font-light max-w-md">
              Discover our latest formulations and bespoke beauty essentials crafted for radiant, timeless elegance.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                  activeCategory === category
                    ? 'bg-[#71305D] text-[#FAF4F7] shadow-md shadow-[#71305D]/20 scale-105'
                    : 'bg-[#FAF4F7] text-[#8E507D] border border-[#D282A8]/30 hover:border-[#71305D] hover:text-[#71305D]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = isInWishlist(product.id);
            const isInCart = cart.some((item) => item.id === product.id);

            return (
              <div 
                key={product.id}
                className="group bg-white rounded-2xl border border-[#D282A8]/20 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-square overflow-hidden bg-[#FAF4F7]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badge */}
                  <span className="absolute top-3 left-3 z-10 bg-[#71305D] text-[#FAF4F7] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#D282A8]/40">
                    {product.badge}
                  </span>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    aria-label="Wishlist"
                    className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 backdrop-blur-md text-[#71305D] hover:bg-white hover:text-[#FBAEB9] transition-all shadow-sm cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-[#71305D] text-[#71305D]' : ''}`} />
                  </button>

                  <div className="absolute inset-0 bg-[#71305D]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-10 pointer-events-none">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="pointer-events-auto px-4 py-2.5 bg-white text-[#71305D] rounded-full text-xs font-bold shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#FBAEB9] cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#8E507D] font-medium mb-1">
                      <span>{product.category}</span>
                      <div className="flex items-center gap-1 text-[#71305D]">
                        <Star className="w-3 h-3 fill-[#FBAEB9] text-[#FBAEB9]" />
                        <span>{product.rating}</span>
                        <span className="text-[#8E507D]/60">({product.reviews})</span>
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-base text-[#33182C] group-hover:text-[#71305D] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#8E507D] mt-0.5">{product.shade}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#D282A8]/15">
                    <span className="text-lg font-bold text-[#71305D]">
                      ${product.price}.00
                    </span>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                        isInCart 
                          ? 'bg-[#8E507D] text-[#FAF4F7]'
                          : 'bg-[#FBAEB9] text-[#71305D] hover:bg-[#71305D] hover:text-[#FAF4F7]'
                      }`}
                    >
                      {isInCart ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick View Modal */}
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#71305D]/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#D282A8]/30 relative flex flex-col md:flex-row">
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 text-[#71305D] hover:bg-[#FAF4F7] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="md:w-1/2 aspect-square md:aspect-auto bg-[#FAF4F7] relative">
                <img 
                  src={quickViewProduct.image} 
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(quickViewProduct);
                  }}
                  aria-label="Wishlist"
                  className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-md text-[#71305D] hover:bg-white hover:text-[#FBAEB9] transition-all shadow-sm cursor-pointer"
                >
                  <Heart className={`w-4 h-4 transition-colors ${isInWishlist(quickViewProduct.id) ? 'fill-[#71305D] text-[#71305D]' : ''}`} />
                </button>
              </div>

              <div className="p-6 md:w-1/2 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#8E507D]">
                    {quickViewProduct.category}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#71305D] mt-1">
                    {quickViewProduct.name}
                  </h3>
                  <p className="text-xs text-[#D282A8] font-medium mt-0.5">{quickViewProduct.shade}</p>

                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex text-[#FBAEB9]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FBAEB9]" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#33182C]">{quickViewProduct.rating}</span>
                    <span className="text-xs text-[#8E507D]">({quickViewProduct.reviews} reviews)</span>
                  </div>

                  <p className="text-xs text-[#8E507D] leading-relaxed mt-4 font-light">
                    {quickViewProduct.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#D282A8]/20">
                  <div className="text-2xl font-bold text-[#71305D]">
                    ${quickViewProduct.price}.00
                  </div>

                  <button
                    onClick={() => {
                      handleAddToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="w-full py-3 bg-[#71305D] text-[#FAF4F7] rounded-xl text-xs font-bold hover:bg-[#8E507D] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}