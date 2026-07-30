import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Tag, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  ShoppingBag,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cart, 
  cartSubtotal, 
  appliedCoupon, 
  discount, 
  onClearCart 
}) {
  const [step, setStep] = useState('checkout'); 
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States'
  });

  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [placedOrder, setPlacedOrder] = useState(null);

  if (!isOpen) return null;

  const shippingRates = {
    standard: cartSubtotal >= 75 || appliedCoupon?.freeShipping ? 0 : 8.00,
    express: 15.00
  };

  const currentShipping = shippingRates[deliveryOption];
  const totalAmount = Math.max(0, cartSubtotal - discount + currentShipping);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    
    const orderDetails = {
      orderId: `LNV-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      customer: { ...formData },
      deliveryOption,
      paymentMethod,
      subtotal: cartSubtotal,
      discount,
      shipping: currentShipping,
      total: totalAmount
    };

    setPlacedOrder(orderDetails);
    onClearCart();
    setStep('confirmation');
  };

  const handleCloseModal = () => {
    setStep('checkout');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#71305D]/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF4F7] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-[#D282A8]/30 shadow-2xl relative my-auto">
        
        <button 
          onClick={handleCloseModal}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 text-[#71305D] cursor-pointer hover:bg-white shadow-xs transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'checkout' ? (
          <div className="p-5 sm:p-8 space-y-8">
            <div className="border-b border-[#D282A8]/20 pb-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8E507D]">
                Secure Checkout
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#71305D] mt-0.5">
                Complete Your Order
              </h2>
            </div>

            <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-6">
                
                <div className="bg-white p-5 rounded-2xl border border-[#D282A8]/20 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#71305D] flex items-center gap-2">
                    <User className="w-4 h-4" /> Customer Information
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address *"
                      className="w-full px-3.5 py-2 bg-[#FAF4F7] border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] focus:outline-none focus:ring-2 focus:ring-[#71305D]"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name *"
                        className="w-full px-3.5 py-2 bg-[#FAF4F7] border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] focus:outline-none focus:ring-2 focus:ring-[#71305D]"
                      />
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name *"
                        className="w-full px-3.5 py-2 bg-[#FAF4F7] border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] focus:outline-none focus:ring-2 focus:ring-[#71305D]"
                      />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number *"
                      className="w-full px-3.5 py-2 bg-[#FAF4F7] border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] focus:outline-none focus:ring-2 focus:ring-[#71305D]"
                    />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#D282A8]/20 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#71305D] flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Shipping Address
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street Address *"
                      className="w-full px-3.5 py-2 bg-[#FAF4F7] border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] focus:outline-none focus:ring-2 focus:ring-[#71305D]"
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City *"
                        className="w-full px-3.5 py-2 bg-[#FAF4F7] border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] focus:outline-none focus:ring-2 focus:ring-[#71305D]"
                      />
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State *"
                        className="w-full px-3.5 py-2 bg-[#FAF4F7] border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] focus:outline-none focus:ring-2 focus:ring-[#71305D]"
                      />
                      <input
                        type="text"
                        name="zip"
                        required
                        value={formData.zip}
                        onChange={handleInputChange}
                        placeholder="ZIP Code *"
                        className="w-full px-3.5 py-2 bg-[#FAF4F7] border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] focus:outline-none focus:ring-2 focus:ring-[#71305D]"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#D282A8]/20 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#71305D] flex items-center gap-2">
                    <Truck className="w-4 h-4" /> Delivery Method
                  </h3>
                  <div className="space-y-2">
                    <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      deliveryOption === 'standard' ? 'border-[#71305D] bg-[#FAF4F7]' : 'border-gray-200 bg-white'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="delivery"
                          checked={deliveryOption === 'standard'}
                          onChange={() => setDeliveryOption('standard')}
                          className="accent-[#71305D]"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#71305D]">Standard Shipping (3-5 Days)</p>
                          <p className="text-[10px] text-[#8E507D]">Reliable doorstep delivery</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#71305D]">
                        {shippingRates.standard === 0 ? 'FREE' : `$${shippingRates.standard.toFixed(2)}`}
                      </span>
                    </label>

                    <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      deliveryOption === 'express' ? 'border-[#71305D] bg-[#FAF4F7]' : 'border-gray-200 bg-white'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="delivery"
                          checked={deliveryOption === 'express'}
                          onChange={() => setDeliveryOption('express')}
                          className="accent-[#71305D]"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#71305D]">Express Priority Shipping (1-2 Days)</p>
                          <p className="text-[10px] text-[#8E507D]">Fastest shipping guarantee</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#71305D]">$15.00</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#D282A8]/20 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#71305D] flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> Payment Method
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'card', name: 'Credit Card' },
                      { id: 'apple', name: 'Apple Pay' },
                      { id: 'paypal', name: 'PayPal' }
                    ].map((pm) => (
                      <button
                        type="button"
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          paymentMethod === pm.id
                            ? 'border-[#71305D] bg-[#71305D] text-white shadow-xs'
                            : 'border-gray-200 bg-white text-[#71305D] hover:border-[#71305D]'
                        }`}
                      >
                        {pm.name}
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="pt-2 space-y-2">
                      <input
                        type="text"
                        required
                        placeholder="Card Number (0000 0000 0000 0000)"
                        className="w-full px-3.5 py-2 bg-[#FAF4F7] border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] focus:outline-none focus:ring-2 focus:ring-[#71305D]"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="MM / YY"
                          className="w-full px-3.5 py-2 bg-[#FAF4F7] border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] focus:outline-none focus:ring-2 focus:ring-[#71305D]"
                        />
                        <input
                          type="text"
                          required
                          placeholder="CVC / CVV"
                          className="w-full px-3.5 py-2 bg-[#FAF4F7] border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] focus:outline-none focus:ring-2 focus:ring-[#71305D]"
                        />
                      </div>
                    </div>
                  )}
                </div>

              </div>

              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#D282A8]/20 shadow-xs space-y-5 sticky top-4">
                <h3 className="text-sm font-serif font-bold text-[#71305D] border-b border-[#D282A8]/20 pb-3">
                  Order Summary ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
                </h3>

                <div className="max-h-48 overflow-y-auto space-y-3 pr-1 divide-y divide-[#D282A8]/10">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.shadeKey}`} className="pt-2 first:pt-0 flex items-center justify-between text-xs gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg bg-[#FAF4F7] border border-[#D282A8]/20 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-bold text-[#71305D] truncate">{item.name}</p>
                          <p className="text-[10px] text-[#8E507D]">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-[#71305D] shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#D282A8]/20 pt-4 space-y-2 text-xs">
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
                    <span>Shipping</span>
                    <span className="font-bold text-[#71305D]">
                      {currentShipping === 0 ? 'FREE' : `$${currentShipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="border-t border-[#D282A8]/20 pt-3 flex justify-between items-baseline text-sm font-serif font-bold text-[#71305D]">
                    <span>Total Due</span>
                    <span className="text-xl">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#71305D] text-white font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-[#8E507D] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  Place Order (${totalAmount.toFixed(2)})
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#8E507D]">
                  <ShieldCheck className="w-4 h-4 text-[#71305D]" />
                  <span>256-Bit SSL Encrypted Payment</span>
                </div>
              </div>

            </form>
          </div>
        ) : (
          <div className="p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8E507D]">
                Thank you for your order!
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#71305D]">
                Order Confirmed
              </h2>
              <p className="text-xs text-[#8E507D]">
                Order Reference: <span className="font-bold text-[#71305D]">{placedOrder?.orderId}</span>
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#D282A8]/20 text-left space-y-4 shadow-xs">
              <div className="flex justify-between items-center border-b border-[#D282A8]/15 pb-3 text-xs">
                <div>
                  <p className="text-[#8E507D]">Shipped To:</p>
                  <p className="font-bold text-[#71305D]">
                    {placedOrder?.customer.firstName} {placedOrder?.customer.lastName}
                  </p>
                  <p className="text-[#8E507D] text-[11px]">
                    {placedOrder?.customer.address}, {placedOrder?.customer.city}, {placedOrder?.customer.state}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#8E507D]">Total Charged:</p>
                  <p className="font-serif font-bold text-[#71305D] text-base">
                    ${placedOrder?.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <p className="text-[11px] font-bold text-[#71305D] uppercase tracking-wider">Items Ordered:</p>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {placedOrder?.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs items-center">
                      <span className="text-[#8E507D] truncate max-w-[240px]">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-bold text-[#71305D]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleCloseModal}
                className="px-8 py-3.5 bg-[#71305D] text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-[#8E507D] transition-all cursor-pointer shadow-md"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}