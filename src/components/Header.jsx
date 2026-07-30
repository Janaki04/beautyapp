import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useWishlist } from '../components/WishlistContext';
import { useCart } from '../components/CartContext';

export default function Header() {
  const navigate = useNavigate();
  const { wishlistCount } = useWishlist();
  const { totalItemsCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const syncUserSession = () => {
    const sessionData = sessionStorage.getItem('currentUser');
    if (sessionData) {
      setCurrentUser(JSON.parse(sessionData));
    } else {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    syncUserSession();

    const handleStorageChange = () => syncUserSession();
    window.addEventListener('storage', handleStorageChange);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

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
              className="relative text-[#71305D] hover:text-[#8E507D] transition-colors p-1.5 rounded-full hover:bg-[#8E507D]/10 hidden sm:block"
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#71305D] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#FAF4F7] translate-x-1 -translate-y-1">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link 
              to="/cart"
              aria-label="Shopping Bag"
              className="relative text-[#71305D] hover:text-[#8E507D] transition-colors p-1.5 rounded-full hover:bg-[#8E507D]/10"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {totalItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#FBAEB9] text-[#71305D] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#FAF4F7] translate-x-1 -translate-y-1">
                  {totalItemsCount}
                </span>
              )}
            </Link>

            {currentUser ? (
              <div className="relative hidden sm:block" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-[#71305D] text-[#FAF4F7] text-xs font-semibold tracking-wider px-4 py-2.5 rounded-sm hover:bg-[#8E507D] transition-all cursor-pointer shadow-xs"
                >
                  <User className="w-4 h-4" />
                  <span className="max-w-[120px] truncate uppercase">{currentUser.name}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[#D282A8]/30 rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-[#D282A8]/10">
                      <p className="text-[10px] uppercase font-bold tracking-wider text-[#8E507D]">Logged in as</p>
                      <p className="text-xs font-semibold text-[#71305D] truncate">{currentUser.email}</p>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      LOG OUT
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login"
                className="hidden sm:inline-block bg-[#71305D] text-[#FAF4F7] text-xs font-semibold tracking-widest px-5 py-2.5 hover:bg-[#8E507D] transition-all duration-200 uppercase rounded-sm shadow-xs"
              >
                Signup/Login
              </Link>
            )}

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
              className="text-[#FAF4F7] hover:text-[#FBAEB9] p-1 flex items-center justify-between text-xs font-medium tracking-wider"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 stroke-[1.75]" />
                WISHLIST
              </div>
              {wishlistCount > 0 && (
                <span className="bg-[#FBAEB9] text-[#71305D] px-2 py-0.5 rounded-full text-[10px] font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#FAF4F7] hover:text-[#FBAEB9] p-1 flex items-center justify-between text-xs font-medium tracking-wider"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
                SHOPPING BAG
              </div>
              {totalItemsCount > 0 && (
                <span className="bg-[#FBAEB9] text-[#71305D] px-2 py-0.5 rounded-full text-[10px] font-bold">
                  {totalItemsCount}
                </span>
              )}
            </Link>

            {currentUser ? (
              <div className="pt-2 border-t border-[#8E507D]/40 space-y-2">
                <div className="flex items-center gap-2 px-1 text-[#FBAEB9] text-xs font-bold uppercase tracking-wider">
                  <User className="w-4 h-4" />
                  <span>Hi, {currentUser.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left bg-rose-500/20 text-rose-200 border border-rose-400/30 text-xs font-bold tracking-widest py-3 px-3 uppercase rounded-sm flex items-center justify-between cursor-pointer"
                >
                  <span>Log Out</span>
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full sm:hidden text-center bg-[#FBAEB9] text-[#71305D] text-xs font-bold tracking-widest py-3 uppercase mt-2 rounded-sm"
              >
                Signup/Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}