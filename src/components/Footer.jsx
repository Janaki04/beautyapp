import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const FacebookIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" />
  </svg>
);

export default function Footer() {
  const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const toggleAccordion = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const footerLinks = {
    shop: [
      { name: 'New Arrivals', href: 'products' },
      { name: 'Makeup', href: 'products' },
      { name: 'Skincare', href: 'products' },
      { name: 'Fragrances', href: 'products' },
      { name: 'Gift Sets', href: 'products' },
      { name: 'Best Sellers', href: 'products' },
    ],
    customerCare: [
      { name: 'About Us', href: 'info' },
      { name: 'Contact Us', href: 'info' },
      { name: 'FAQs', href: 'info' },
      { name: 'Shipping & Delivery', href: 'info' },
      { name: 'Returns & Refunds', href: 'info' },
      { name: 'Track Your Order', href: 'info' },
    ],
  };

  return (
    <footer className="bg-[#71305D] text-[#FAF4F7] pt-16 pb-8 border-t border-[#D282A8]/30 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#D282A8]/20">
          
          <div className="lg:col-span-4 space-y-4">
            <div>
              <h2 className="text-start text-2xl font-serif font-bold text-[#FAF4F7] tracking-[0.2em] uppercase">
                Man$JAN
              </h2>
              <span className="text-start text-[10px] tracking-[0.3em] text-[#FBAEB9] uppercase font-medium block mt-0.5">
                BEAUTY
              </span>
            </div>

            <p className="text-start text-xs text-[#FAF4F7]/80 leading-relaxed max-w-sm font-light">
              Man$JAN Beauty brings you the finest cosmetics and skincare products, crafted for timeless elegance and radiant confidence.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              {[
                { icon: InstagramIcon, href: '#instagram', label: 'Instagram' },
                { icon: FacebookIcon, href: '#facebook', label: 'Facebook' },
                { icon: YoutubeIcon, href: '#youtube', label: 'YouTube' },
              ].map((social, idx) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className="text-start flex p-2 rounded-full bg-[#8E507D] border border-[#D282A8]/40 text-[#FAF4F7] hover:bg-[#FBAEB9] hover:text-[#71305D] hover:scale-110 transition-all duration-300 flex items-center justify-center"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
              
              <a
                href="#pinterest"
                aria-label="Pinterest"
                className="p-2 rounded-full bg-[#8E507D] border border-[#D282A8]/40 text-[#FAF4F7] hover:bg-[#FBAEB9] hover:text-[#71305D] hover:scale-110 transition-all duration-300 flex items-center justify-center w-8 h-8"
              >
                <span className="text-xs font-bold font-serif leading-none">P</span>
              </a>
              <a
                href="#tiktok"
                aria-label="TikTok"
                className="p-2 rounded-full bg-[#8E507D] border border-[#D282A8]/40 text-[#FAF4F7] hover:bg-[#FBAEB9] hover:text-[#71305D] hover:scale-110 transition-all duration-300 flex items-center justify-center w-8 h-8"
              >
                <span className="text-[10px] font-bold leading-none">J</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
            
            <div className="border-b sm:border-none border-[#D282A8]/20 pb-4 sm:pb-0">
              <button
                onClick={() => toggleAccordion('shop')}
                className="w-full flex items-center justify-between sm:cursor-default text-xs font-bold tracking-[0.2em] text-[#FAF4F7] uppercase mb-3"
              >
                <span>Shop</span>
                <ChevronDown className={`w-4 h-4 text-[#FBAEB9] sm:hidden transition-transform ${openSection === 'shop' ? 'rotate-180' : ''}`} />
              </button>
              <ul className={`text-start space-y-2 text-xs text-[#FAF4F7]/80 font-light ${openSection === 'shop' ? 'block' : 'hidden sm:block'}`}>
                {footerLinks.shop.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.href} className="hover:text-[#FBAEB9] transition-colors duration-200 block py-0.5">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-b sm:border-none border-[#D282A8]/20 pb-4 sm:pb-0">
              <button
                onClick={() => toggleAccordion('care')}
                className="w-full flex items-center justify-between sm:cursor-default text-xs font-bold tracking-[0.2em] text-[#FAF4F7] uppercase mb-3"
              >
                <span>Customer Care</span>
                <ChevronDown className={`w-4 h-4 text-[#FBAEB9] sm:hidden transition-transform ${openSection === 'care' ? 'rotate-180' : ''}`} />
              </button>
              <ul className={`text-start space-y-2 text-xs text-[#FAF4F7]/80 font-light ${openSection === 'care' ? 'block' : 'hidden sm:block'}`}>
                {footerLinks.customerCare.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.href} className="hover:text-[#FBAEB9] transition-colors duration-200 block py-0.5">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-start text-xs font-bold tracking-[0.2em] text-[#FAF4F7] uppercase">
              Payment Options
            </h3>
            <p className="text-start text-xs text-[#FAF4F7]/80 font-light">
             Pay through your preferred payment method.
            </p>

            <div className="pt-4 flex items-center space-x-2">
              {['VISA', 'MC', 'AMEX', 'PayPal'].map((card, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-[#8E507D]/50 border border-[#D282A8]/30 rounded-xs text-[9px] font-bold text-[#FAF4F7] tracking-wider"
                >
                  {card}
                </span>
              ))}
            </div>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FAF4F7]/70 font-light gap-2">
          <p>© {new Date().getFullYear()} Man$JAN Beauty. All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="#privacy" className="hover:text-[#FBAEB9] transition-colors">Privacy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-[#FBAEB9] transition-colors">Terms</a>
            <span>•</span>
            <a href="#cookies" className="hover:text-[#FBAEB9] transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
}