import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Heart,
  RotateCcw,
  User,
  Lock
} from 'lucide-react';

import { useCart } from '../components/CartContext';
import { useWishlist } from '../components/WishlistContext';
import CheckoutModal from '../components/CheckoutModal';

const VALID_COUPONS = {
  'LUNEVA10': { discountPercent: 10, label: '10% OFF' },
  'GLOW20': { discountPercent: 20, label: '20% OFF' },
  'FREESHIP': { freeShipping: true, label: 'Free Shipping' }
};

const RECOMMENDED_PRODUCTS = [
  {
    id: 'rec-1',
    name: 'Hydrating Peptide Lip Oil',
    brand: 'Man$JAN',
    price: 24,
    image: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&q=80&w=400',
    category: 'Lip Care'
  },
  {
    id: 'rec-2',
    name: 'Velvet Matte Setting Spray',
    brand: 'Man$JAN',
    price: 32,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=400',
    category: 'Complexion'
  },
  {
    id: 'rec-3',
    name: 'Rose Quartz Facial Roller',
    brand: 'Man$JAN',
    price: 28,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400',
    category: 'Tools'
  }
];

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, addToCart, cartSubtotal, clearCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [authError, setAuthError] = useState('');

  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const FREE_SHIPPING_THRESHOLD = 75;
  const STANDARD_SHIPPING_FEE = 8.00;

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discountPercent) {
      return (cartSubtotal * appliedCoupon.discountPercent) / 100;
    }
    return 0;
  };

  const discount = calculateDiscount();
  const isFreeShippingApplied = (appliedCoupon && appliedCoupon.freeShipping) || cartSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = cart.length === 0 ? 0 : (isFreeShippingApplied ? 0 : STANDARD_SHIPPING_FEE);
  const finalTotal = Math.max(0, cartSubtotal - discount + shippingFee);

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  // Check login status and open checkout or show login prompt
  const handleProceedToCheckout = () => {
    const currentUser = sessionStorage.getItem('currentUser');

    if (!currentUser) {
      setAuthError('Please log in or sign up to complete your checkout.');
      return;
    }

    setAuthError('');
    setIsCheckoutOpen(true);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const cleanedCode = couponInput.trim().toUpperCase();

    if (!cleanedCode) {
      setCouponError('Please enter a code');
      return;
    }

    if (VALID_COUPONS[cleanedCode]) {
      setAppliedCoupon({ code: cleanedCode, ...VALID_COUPONS[cleanedCode] });
      setCouponInput('');
    } else {
      setCouponError('Invalid code. Try "LUNEVA10" or "GLOW20"');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  return (
    <div className="bg-[#FAF4F7] min-h-screen text-[#33182C] font-sans py-8">
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        cartSubtotal={cartSubtotal}
        appliedCoupon={appliedCoupon}
        discount={discount}
        onClearCart={clearCart}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Auth Required Alert Banner */}
        {authError && (
          <div className="bg-[#71305D] text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Account Login Required</h4>
                <p className="text-xs text-white/80">{authError}</p>
              </div>
            </div>
            <a
              href="/login"
              className="px-5 py-2.5 bg-[#FBAEB9] text-[#71305D] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white transition-all shadow-xs whitespace-nowrap flex items-center gap-1.5"
            >
              <User className="w-4 h-4" /> Log In / Sign Up
            </a>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D282A8]/20 pb-5 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#71305D]">
              Shopping Bag
            </h1>
            <p className="text-xs text-[#8E507D] font-light mt-1">
              {cart.length > 0 
                ? `You have ${cart.reduce((total, i) => total + i.quantity, 0)} item(s) in your bag` 
                : 'Your bag is currently empty'}
            </p>
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-[#8E507D] hover:text-[#71305D] underline font-medium cursor-pointer self-start sm:self-auto"
            >
              Clear Entire Bag
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-[#D282A8]/20 shadow-xs text-center space-y-5 max-w-md mx-auto my-12">
            <div className="w-16 h-16 bg-[#FAF4F7] text-[#71305D] rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-serif font-bold text-[#71305D]">Your bag feels light!</h2>
              <p className="text-xs text-[#8E507D]">Explore our collection and discover your new favorites.</p>
            </div>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#71305D] text-white font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-[#8E507D] transition-all shadow-md"
            >
              Start Shopping
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              
              <div className="bg-white rounded-2xl p-5 border border-[#D282A8]/20 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#71305D] flex items-center gap-1.5">
                    <Truck className="w-4 h-4" />
                    {amountToFreeShipping > 0
                      ? `Add $${amountToFreeShipping.toFixed(2)} more for FREE Express Shipping!`
                      : "You've unlocked FREE Express Shipping!"}
                  </span>
                  <span className="font-semibold text-[#8E507D]">{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full bg-[#FAF4F7] h-2.5 rounded-full overflow-hidden border border-[#D282A8]/20">
                  <div
                    className="bg-[#71305D] h-full transition-all duration-500 ease-out"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#D282A8]/20 shadow-xs divide-y divide-[#D282A8]/15 overflow-hidden">
                {cart.map((item) => {
                  const isWish = isInWishlist(item.id);

                  return (
                    <div 
                      key={`${item.id}-${item.shadeKey}`}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all hover:bg-[#FAF4F7]/40"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border border-[#D282A8]/15 bg-[#FAF4F7] shrink-0"
                      />

                      <div className="flex-1 space-y-1 min-w-0">
                        {item.brand && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E507D]">
                            {item.brand}
                          </span>
                        )}
                        <h3 className="font-serif font-bold text-sm text-[#71305D] truncate">
                          {item.name}
                        </h3>
                        {item.selectedShade && (
                          <p className="text-xs text-[#8E507D]">
                            Variant: <span className="font-semibold text-[#71305D]">{item.selectedShade.name || item.selectedShade.title}</span>
                          </p>
                        )}
                        <div className="text-xs font-bold text-[#71305D] sm:hidden pt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D282A8]/15">
                        
                        <div className="flex items-center bg-[#FAF4F7] border border-[#D282A8]/30 rounded-xl p-1 shadow-xs">
                          <button
                            onClick={() => updateQuantity(item.id, item.shadeKey, item.quantity - 1)}
                            className="p-1.5 text-[#8E507D] hover:text-[#71305D] rounded-lg cursor-pointer transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-[#71305D]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.shadeKey, item.quantity + 1)}
                            className="p-1.5 text-[#8E507D] hover:text-[#71305D] rounded-lg cursor-pointer transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right hidden sm:block min-w-[70px]">
                          <div className="text-sm font-serif font-bold text-[#71305D]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-[10px] text-[#8E507D]">
                              ${item.price.toFixed(2)} each
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleWishlist(item)}
                            title={isWish ? 'Remove from Wishlist' : 'Move to Wishlist'}
                            className={`p-2 rounded-xl transition-colors cursor-pointer ${
                              isWish ? 'text-[#71305D] bg-[#FAF4F7]' : 'text-[#8E507D] hover:text-[#71305D]'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isWish ? 'fill-[#71305D]' : ''}`} />
                          </button>

                          <button
                            onClick={() => removeFromCart(item.id, item.shadeKey)}
                            title="Remove item"
                            className="p-2 text-rose-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            <div className="lg:col-span-5 xl:col-span-4 space-y-6 sticky top-24">
              
              <div className="bg-white rounded-3xl p-6 border border-[#D282A8]/20 shadow-xs space-y-6">
                <h2 className="text-base font-serif font-bold text-[#71305D] border-b border-[#D282A8]/20 pb-3">
                  Order Summary
                </h2>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#71305D] uppercase tracking-wider block">
                    Promo / Coupon Code
                  </label>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold">{appliedCoupon.code}</span>
                        <span className="text-[11px] bg-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                          {appliedCoupon.label}
                        </span>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-xs text-emerald-700 hover:underline font-bold cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Try LUNEVA10 or GLOW20"
                          className="w-full px-3.5 py-2.5 bg-[#FAF4F7] border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] placeholder-[#8E507D]/50 focus:outline-none focus:ring-2 focus:ring-[#71305D]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-[#71305D] text-white text-xs font-bold rounded-xl hover:bg-[#8E507D] transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {couponError && (
                    <p className="text-[11px] text-rose-500 font-medium pt-1">{couponError}</p>
                  )}
                </div>

                <div className="space-y-3 text-xs border-t border-[#D282A8]/15 pt-4">
                  <div className="flex justify-between text-[#8E507D]">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#71305D]">${cartSubtotal.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" /> Discount ({appliedCoupon?.code})
                      </span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#8E507D]">
                    <span>Estimated Shipping</span>
                    <span className="font-bold text-[#71305D]">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-600 uppercase font-bold text-[11px]">Free</span>
                      ) : (
                        `$${shippingFee.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="border-t border-[#D282A8]/20 pt-3 flex justify-between items-baseline text-sm font-serif font-bold text-[#71305D]">
                    <span>Total</span>
                    <span className="text-xl">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 bg-[#71305D] text-white font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-[#8E507D] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  Proceed To Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-3 gap-2 border-t border-[#D282A8]/15 pt-4 text-center text-[10px] text-[#8E507D]">
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4 text-[#71305D]" />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-[#71305D]" />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RotateCcw className="w-4 h-4 text-[#71305D]" />
                    <span>30-Day Returns</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        <section className="border-t border-[#D282A8]/20 pt-10 mt-12 space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#71305D]" />
            <h2 className="text-lg font-serif font-bold text-[#71305D]">
              Complete Your Beauty Routine
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RECOMMENDED_PRODUCTS.map((prod) => (
              <div 
                key={prod.id}
                className="bg-white rounded-2xl border border-[#D282A8]/20 p-4 flex gap-4 items-center shadow-xs hover:shadow-md transition-all group"
              >
                <img 
                  src={prod.image} 
                  alt={prod.name} 
                  className="w-20 h-20 object-cover rounded-xl bg-[#FAF4F7] shrink-0 group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#8E507D]">{prod.category}</span>
                  <h4 className="text-xs font-serif font-bold text-[#71305D] truncate">{prod.name}</h4>
                  <div className="text-xs font-bold text-[#71305D]">${prod.price}.00</div>
                  <button
                    onClick={() => addToCart(prod, 1)}
                    className="mt-1 px-3 py-1.5 bg-[#FBAEB9] text-[#71305D] hover:bg-[#71305D] hover:text-white rounded-xl text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add To Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}