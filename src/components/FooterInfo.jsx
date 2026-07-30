import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  HelpCircle, 
  Truck, 
  RotateCcw, 
  PackageSearch, 
  ChevronDown, 
  Clock, 
  CheckCircle2, 
  Search, 
  MessageSquare
} from 'lucide-react';

export default function FooterInfo() {
  const [activeTab, setActiveTab] = useState('about');
  const [openFaq, setOpenFaq] = useState(null);
  const [trackingId, setTrackingId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  const tabs = [
    { id: 'about', label: 'About Us', icon: Sparkles },
    { id: 'customer-care', label: 'Customer Care', icon: HeartHandshake },
    { id: 'contact', label: 'Contact Us', icon: Mail },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
    { id: 'returns', label: 'Returns & Refunds', icon: RotateCcw },
    { id: 'track', label: 'Track Order', icon: PackageSearch },
  ];

  const faqs = [
    {
      q: 'Are Man$JAN BEAUTY products cruelty-free and vegan?',
      a: 'Yes! 100% of our products are certified cruelty-free. Over 90% of our formulas are completely vegan and made without parabens or harsh sulfates.'
    },
    {
      q: 'How do I know which shade is right for me?',
      a: 'You can check our online shade finder tool on the product page or send a clear selfie in natural light to our beauty advisors at shadefinder@mansjanbeauty.com.'
    },
    {
      q: 'Can I change or cancel my order after placing it?',
      a: 'Orders are processed within 1–2 hours. Please contact customer support immediately. Once an order reaches "Dispatched" status, it cannot be canceled.'
    },
    {
      q: 'Do you offer international shipping?',
      a: 'Yes, we ship globally! Standard shipping usually takes 7–14 business days depending on customs processing in your destination country.'
    }
  ];

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setTrackingResult({
      orderId: trackingId.toUpperCase(),
      status: 'In Transit',
      estimatedDelivery: '3–5 Business Days',
      carrier: 'Express Beauty Logistics',
      steps: [
        { title: 'Order Confirmed', completed: true, date: 'Jul 28' },
        { title: 'Dispatched from Warehouse', completed: true, date: 'Jul 29' },
        { title: 'Out for Delivery', completed: false, date: 'Pending' },
        { title: 'Delivered', completed: false, date: 'Pending' },
      ]
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF4F7] text-[#71305D] font-sans">
      
      <div className="bg-gradient-to-r from-[#71305D] via-[#8E507D] to-[#71305D] text-[#FAF4F7] py-12 px-4 sm:px-6 lg:px-8 text-center shadow-md">
        <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-widest uppercase">
          Help & Information Center
        </h1>
        <p className="text-xs sm:text-sm tracking-wider text-[#FAF4F7]/80 mt-2 max-w-xl mx-auto">
          Everything you need to know about Man$JAN BEAUTY products, orders, shipping, and support.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="flex overflow-x-auto gap-2 pb-4 border-b border-[#D282A8]/30 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#71305D] text-white shadow-md'
                    : 'bg-white/80 text-[#8E507D] hover:bg-[#8E507D]/10 hover:text-[#71305D]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-[#D282A8]/20 shadow-xl transition-all">
          
          {activeTab === 'about' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-[#D282A8]/20 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E507D]">Our Story</span>
                <h2 className="text-2xl font-serif font-bold text-[#71305D]">About Man$JAN BEAUTY</h2>
              </div>
              <p className="text-sm leading-relaxed text-[#8E507D]">
                Founded with a passion for effortless elegance, **Man$JAN BEAUTY** crafts premium, high-performance cosmetics and skincare formulated to enhance your natural radiant glow. We believe beauty should be accessible, empowering, and uncompromising on quality.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="p-5 bg-[#FAF4F7] rounded-2xl border border-[#D282A8]/20 text-center space-y-2">
                  <Sparkles className="w-6 h-6 text-[#71305D] mx-auto" />
                  <h3 className="font-bold text-xs uppercase tracking-wider">Clean Formulas</h3>
                  <p className="text-xs text-[#8E507D]">Formulated without parabens, sulfates, or harsh artificial toxins.</p>
                </div>
                <div className="p-5 bg-[#FAF4F7] rounded-2xl border border-[#D282A8]/20 text-center space-y-2">
                  <HeartHandshake className="w-6 h-6 text-[#71305D] mx-auto" />
                  <h3 className="font-bold text-xs uppercase tracking-wider">Cruelty-Free</h3>
                  <p className="text-xs text-[#8E507D]">Never tested on animals. Proudly Leaping Bunny certified.</p>
                </div>
                <div className="p-5 bg-[#FAF4F7] rounded-2xl border border-[#D282A8]/20 text-center space-y-2">
                  <Truck className="w-6 h-6 text-[#71305D] mx-auto" />
                  <h3 className="font-bold text-xs uppercase tracking-wider">Sustainable</h3>
                  <p className="text-xs text-[#8E507D]">Eco-friendly packaging designed to minimize plastic waste.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'customer-care' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-[#D282A8]/20 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E507D]">Here for You</span>
                <h2 className="text-2xl font-serif font-bold text-[#71305D]">Customer Care Service</h2>
              </div>
              <p className="text-sm text-[#8E507D]">
                At Man$JAN BEAUTY, your satisfaction is our priority. Our dedicated support team is ready to assist you with beauty consultation, order inquiries, or account help.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-[#D282A8]/30 bg-[#FAF4F7]/50 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#71305D] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider">Operating Hours</h4>
                    <p className="text-xs text-[#8E507D] mt-1">Monday – Saturday: 9:00 AM – 7:00 PM EST</p>
                    <p className="text-xs text-[#8E507D]">Sunday: Closed</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl border border-[#D282A8]/30 bg-[#FAF4F7]/50 flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-[#71305D] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider">Live Chat Assistance</h4>
                    <p className="text-xs text-[#8E507D] mt-1">Chat directly with a beauty consultant during working hours.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-[#D282A8]/20 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E507D]">Get in Touch</span>
                <h2 className="text-2xl font-serif font-bold text-[#71305D]">Contact Us</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF4F7] border border-[#D282A8]/20">
                    <Mail className="w-5 h-5 text-[#71305D]" />
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[#8E507D]">Email Us</p>
                      <p className="text-xs font-bold text-[#71305D]">support@mansjanbeauty.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF4F7] border border-[#D282A8]/20">
                    <Phone className="w-5 h-5 text-[#71305D]" />
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[#8E507D]">Call Us</p>
                      <p className="text-xs font-bold text-[#71305D]">+1 (800) 555-MANSJAN</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF4F7] border border-[#D282A8]/20">
                    <MapPin className="w-5 h-5 text-[#71305D]" />
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[#8E507D]">Headquarters</p>
                      <p className="text-xs font-bold text-[#71305D]">742 Beauty Blvd, Suite 400, NY 10001</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full p-3 bg-[#FAF4F7]/60 border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] focus:outline-none focus:ring-2 focus:ring-[#71305D]/50"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    className="w-full p-3 bg-[#FAF4F7]/60 border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] focus:outline-none focus:ring-2 focus:ring-[#71305D]/50"
                  />
                  <textarea
                    required
                    rows="3"
                    placeholder="How can we help?"
                    className="w-full p-3 bg-[#FAF4F7]/60 border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] focus:outline-none focus:ring-2 focus:ring-[#71305D]/50"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#71305D] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#8E507D] transition-all cursor-pointer shadow-md"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-[#D282A8]/20 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E507D]">Questions & Answers</span>
                <h2 className="text-2xl font-serif font-bold text-[#71305D]">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-[#D282A8]/30 rounded-2xl overflow-hidden bg-[#FAF4F7]/40">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full p-4 text-left font-bold text-xs uppercase tracking-wider flex items-center justify-between text-[#71305D] cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === index && (
                      <div className="px-4 pb-4 text-xs text-[#8E507D] leading-relaxed border-t border-[#D282A8]/10 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-[#D282A8]/20 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E507D]">Dispatch & Logistics</span>
                <h2 className="text-2xl font-serif font-bold text-[#71305D]">Shipping & Delivery Policy</h2>
              </div>
              <div className="space-y-4 text-xs text-[#8E507D] leading-relaxed">
                <div className="p-4 bg-[#FAF4F7] rounded-2xl border border-[#D282A8]/20 space-y-1">
                  <h3 className="font-bold text-[#71305D] text-sm">Standard Domestic Shipping</h3>
                  <p>Free on orders over $50. Arrives in 3–5 business days.</p>
                </div>
                <div className="p-4 bg-[#FAF4F7] rounded-2xl border border-[#D282A8]/20 space-y-1">
                  <h3 className="font-bold text-[#71305D] text-sm">Express Courier Shipping</h3>
                  <p>$12.00 flat rate. Guaranteed arrival in 1–2 business days when ordered before 12 PM EST.</p>
                </div>
                <div className="p-4 bg-[#FAF4F7] rounded-2xl border border-[#D282A8]/20 space-y-1">
                  <h3 className="font-bold text-[#71305D] text-sm">International Express</h3>
                  <p>Calculated at checkout. Delivered in 7–14 business days depending on region.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-[#D282A8]/20 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E507D]">Hassle-Free Returns</span>
                <h2 className="text-2xl font-serif font-bold text-[#71305D]">Returns & Refunds Policy</h2>
              </div>
              <div className="space-y-3 text-xs text-[#8E507D]">
                <p className="leading-relaxed">
                  We offer a **30-Day Happiness Guarantee**. If you are not completely in love with your purchase, you can return gently used products within 30 days of purchase for a full refund or store credit.
                </p>
                <div className="p-4 bg-[#FAF4F7] rounded-2xl border border-[#D282A8]/20 space-y-2">
                  <h4 className="font-bold text-[#71305D] uppercase text-[11px]">How to initiate a return:</h4>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Log in to your account and select "My Orders".</li>
                    <li>Select the order and click "Request Return".</li>
                    <li>Print the prepaid return shipping label and drop off the package at any authorized courier station.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'track' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-[#D282A8]/20 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E507D]">Real-Time Tracking</span>
                <h2 className="text-2xl font-serif font-bold text-[#71305D]">Track Your Order</h2>
              </div>

              <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#8E507D] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Enter Order ID (e.g. MSJ-10928)"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF4F7] border border-[#D282A8]/30 rounded-xl text-xs text-[#71305D] placeholder-[#8E507D]/50 focus:outline-none focus:ring-2 focus:ring-[#71305D]/50"
                  />
                </div>
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-[#71305D] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#8E507D] transition-all cursor-pointer shadow-md"
                >
                  Track Package
                </button>
              </form>

              {trackingResult && (
                <div className="p-6 bg-[#FAF4F7]/80 rounded-2xl border border-[#D282A8]/30 space-y-4 animate-in fade-in duration-200 mt-6">
                  <div className="flex flex-wrap justify-between items-center border-b border-[#D282A8]/20 pb-3 gap-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[#8E507D]">Tracking ID</p>
                      <p className="text-sm font-bold text-[#71305D]">{trackingResult.orderId}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[#8E507D]">Estimated Delivery</p>
                      <p className="text-sm font-bold text-[#71305D]">{trackingResult.estimatedDelivery}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    {trackingResult.steps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className={`w-4 h-4 ${step.completed ? 'text-emerald-600' : 'text-gray-300'}`} />
                        <span className={`text-xs font-semibold ${step.completed ? 'text-[#71305D]' : 'text-gray-400'}`}>
                          {step.title}
                        </span>
                        <span className="text-[10px] text-[#8E507D] ml-auto">{step.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}