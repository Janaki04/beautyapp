import React, { use, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate= useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(1);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'PRODUCTS', path: '/products' },
  ];

  return (
    <header className="bg-[#FAF4F7] border-b border-[#D282A8]/30 sticky top-0 z-50 font-sans shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer">
            <Link to="/" className="flex flex-col items-center leading-none">
              <span className="text-2xl md:text-3xl font-serif tracking-[0.25em] text-[#71305D] font-bold uppercase">
                Man$JAN
              </span>
              <span className="text-[9px] tracking-[0.3em] font-medium text-[#8E507D] mt-1 uppercase">
                BEAUTY
              </span>
            </Link>
          </div>
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs font-semibold tracking-widest relative py-1 transition-colors duration-200 ${
                    isActive ? 'text-[#71305D] font-bold' : 'text-[#8E507D] hover:text-[#71305D]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#71305D] rounded-full transition-all duration-300" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center space-x-4 sm:space-x-5">
           
            <Link 
              to="/wishlist"
              aria-label="Wishlist"
              className="text-[#71305D] hover:text-[#8E507D] transition-colors p-1.5 rounded-full hover:bg-[#8E507D]/10 hidden sm:block"
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
            </Link>

            <Link 
              to="/cart"
              aria-label="Shopping Bag"
              className="relative text-[#71305D] hover:text-[#8E507D] transition-colors p-1.5 rounded-full hover:bg-[#8E507D]/10"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#FBAEB9] text-[#71305D] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#FAF4F7] translate-x-1 -translate-y-1">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link 
              to="/login"
              className="hidden sm:inline-block bg-[#71305D] text-[#FAF4F7] text-xs font-semibold tracking-widest px-5 py-2.5 hover:bg-[#8E507D] transition-all duration-200 uppercase rounded-sm shadow-xs"
            >
              Signup/Login
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-[#71305D] hover:text-[#8E507D] p-1.5 rounded-sm"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[2]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[2]" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#71305D] border-t border-[#D282A8]/30 px-6 pt-4 pb-6 space-y-4 shadow-xl transition-all duration-300">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-xs font-semibold tracking-widest py-3 border-b border-[#8E507D]/40 transition-colors ${
                    isActive ? 'text-[#FBAEB9] font-bold' : 'text-[#FAF4F7]/90 hover:text-[#FBAEB9]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          
          <div className="pt-2 flex flex-col space-y-3">
            <Link
              to="/wishlist"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#FAF4F7] hover:text-[#FBAEB9] p-1 flex items-center gap-2 text-xs font-medium tracking-wider"
            >
              <Heart className="w-4 h-4 stroke-[1.75]" />
              WISHLIST
            </Link>

            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full sm:hidden text-center bg-[#FBAEB9] text-[#71305D] text-xs font-bold tracking-widest py-3 uppercase mt-2 rounded-sm"
            >
              Signup/Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}