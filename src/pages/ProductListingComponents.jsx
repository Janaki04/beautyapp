import React from 'react';
import { 
  Search, SlidersHorizontal, X, Star, Heart, ShoppingBag, Eye, Check, 
  Grid, List, RotateCcw, ChevronLeft, ChevronRight, Filter 
} from 'lucide-react';

 export const SearchAndSortBar = ({ 
  searchQuery, setSearchQuery, viewMode, setViewMode, sortBy, setSortBy, onOpenMobileFilter 
}) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#D282A8]/20">
    <div className="relative flex-1 max-w-md">
      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E507D]" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products, ingredients, notes..."
        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D282A8]/30 rounded-xl text-xs text-[#33182C] placeholder-[#8E507D]/60 focus:outline-none focus:border-[#71305D] shadow-xs transition-all"
      />
      {searchQuery && (
        <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E507D]">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>

    <div className="flex items-center justify-between md:justify-end gap-3 flex-wrap">
      <button
        onClick={onOpenMobileFilter}
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-[#D282A8]/30 rounded-xl text-xs font-semibold text-[#71305D]"
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
      </button>

      <div className="hidden sm:flex items-center bg-white border border-[#D282A8]/30 rounded-xl p-1 shadow-xs">
        <button
          onClick={() => setViewMode('grid')}
          className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#71305D] text-white' : 'text-[#8E507D]'}`}
        >
          <Grid className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#71305D] text-white' : 'text-[#8E507D]'}`}
        >
          <List className="w-4 h-4" />
        </button>
      </div>

      <div className="relative flex items-center bg-white border border-[#D282A8]/30 rounded-xl px-3 py-2 shadow-xs">
        <span className="text-[11px] font-medium text-[#8E507D] mr-2">Sort:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-transparent text-xs font-semibold text-[#71305D] focus:outline-none cursor-pointer pr-4"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">New Arrivals</option>
        </select>
      </div>
    </div>
  </div>
);

export const FilterSidebar = ({ 
  categories, selectedCategory, onSelectCategory,
  brands, selectedBrands, onToggleBrand,
  priceRange, setPriceRange,
  minRating, setMinRating,
  onReset, hasActiveFilters
}) => (
  <aside className="space-y-6">
    <div className="flex items-center justify-between pb-3 border-b border-[#D282A8]/20">
      <h3 className="text-sm font-bold uppercase tracking-wider text-[#71305D] flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4" /> Filter Products
      </h3>
      {hasActiveFilters && (
        <button onClick={onReset} className="text-[11px] text-[#8E507D] hover:text-[#71305D] flex items-center gap-1">
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      )}
    </div>

    <div className="space-y-2">
      <h4 className="text-xs font-bold uppercase text-[#8E507D] tracking-wider">Category</h4>
      <div className="space-y-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`w-full text-left text-xs py-1.5 px-3 rounded-lg font-medium transition-all flex items-center justify-between ${
              selectedCategory === cat ? 'bg-[#71305D] text-white font-bold' : 'text-[#33182C] hover:bg-[#FAF4F7]'
            }`}
          >
            <span>{cat}</span>
            {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-[#FBAEB9]" />}
          </button>
        ))}
      </div>
    </div>

    <div className="space-y-2.5 pt-4 border-t border-[#D282A8]/20">
      <h4 className="text-xs font-bold uppercase text-[#8E507D] tracking-wider">Brand</h4>
      <div className="space-y-2">
        {brands.map((brand) => (
          <label key={brand} className="flex items-center gap-2.5 text-xs text-[#33182C] cursor-pointer">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => onToggleBrand(brand)}
              className="rounded border-[#D282A8] text-[#71305D] focus:ring-[#71305D]"
            />
            <span>{brand}</span>
          </label>
        ))}
      </div>
    </div>

    <div className="space-y-3 pt-4 border-t border-[#D282A8]/20">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold uppercase text-[#8E507D]">Max Price</span>
        <span className="font-bold text-[#71305D]">${priceRange}.00</span>
      </div>
      <input
        type="range"
        min="20"
        max="150"
        step="5"
        value={priceRange}
        onChange={(e) => setPriceRange(Number(e.target.value))}
        className="w-full accent-[#71305D] cursor-pointer"
      />
    </div>

    <div className="space-y-2 pt-4 border-t border-[#D282A8]/20">
      <h4 className="text-xs font-bold uppercase text-[#8E507D]">Rating</h4>
      <div className="flex items-center gap-1">
        {[4, 3, 2, 1].map((stars) => (
          <button
            key={stars}
            onClick={() => setMinRating(minRating === stars ? 0 : stars)}
            className={`flex-1 py-1.5 rounded-lg border text-xs flex items-center justify-center gap-1 ${
              minRating === stars ? 'bg-[#71305D] text-white' : 'bg-white text-[#8E507D] border-[#D282A8]/30'
            }`}
          >
            <span>{stars}</span>
            <Star className="w-3 h-3 fill-[#FBAEB9] text-[#FBAEB9]" />
          </button>
        ))}
      </div>
    </div>
  </aside>
);

export const ProductCard = ({ product, viewMode, isWishlisted, isInCart, onToggleWishlist, onToggleCart, onQuickView }) => (
  <div className={`group bg-white rounded-2xl border border-[#D282A8]/20 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex ${
    viewMode === 'list' ? 'flex-col sm:flex-row' : 'flex-col'
  }`}>
    <div className={`relative overflow-hidden bg-[#FAF4F7] ${viewMode === 'list' ? 'sm:w-1/3 aspect-square' : 'aspect-square'}`}>
      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      
      <div className="absolute top-3 left-3 flex flex-col gap-1">
        {product.isNew && <span className="bg-[#71305D] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">New</span>}
        {product.isBestSeller && <span className="bg-[#FBAEB9] text-[#71305D] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">Best Seller</span>}
      </div>

      <button
        onClick={() => onToggleWishlist(product.id)}
        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-[#71305D] hover:bg-white transition-all shadow-xs"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#71305D] text-[#71305D]' : ''}`} />
      </button>

      <div className="absolute inset-0 bg-[#71305D]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
        <button
          onClick={() => onQuickView(product)}
          className="px-4 py-2 bg-white text-[#71305D] rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 hover:bg-[#FBAEB9]"
        >
          <Eye className="w-3.5 h-3.5" /> Quick View
        </button>
      </div>
    </div>

    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
      <div>
        <div className="flex items-center justify-between text-[11px] text-[#8E507D] font-medium mb-1">
          <span>{product.brand}</span>
          <div className="flex items-center gap-1 text-[#71305D]">
            <Star className="w-3 h-3 fill-[#FBAEB9] text-[#FBAEB9]" />
            <span className="font-bold">{product.rating}</span>
          </div>
        </div>
        <h3 className="font-serif font-bold text-base text-[#33182C] group-hover:text-[#71305D] transition-colors">{product.name}</h3>
        <p className="text-xs text-[#8E507D] mt-1 font-light line-clamp-2">{product.description}</p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#D282A8]/15">
        <span className="text-lg font-bold text-[#71305D]">${product.price}.00</span>
        <button
          onClick={() => onToggleCart(product.id)}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            isInCart ? 'bg-[#8E507D] text-white' : 'bg-[#FBAEB9] text-[#71305D] hover:bg-[#71305D] hover:text-white'
          }`}
        >
          {isInCart ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
          <span>{isInCart ? 'In Bag' : 'Add'}</span>
        </button>
      </div>
    </div>
  </div>
);

export const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-between pt-8 border-t border-[#D282A8]/20">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 rounded-xl border border-[#D282A8]/30 bg-white text-xs font-semibold text-[#71305D] disabled:opacity-40 flex items-center gap-1"
    >
      <ChevronLeft className="w-4 h-4" /> Previous
    </button>

    <div className="flex items-center gap-1 text-xs font-semibold">
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
            currentPage === i + 1 ? 'bg-[#71305D] text-white font-bold' : 'bg-white text-[#8E507D] border border-[#D282A8]/20'
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>

    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-4 py-2 rounded-xl border border-[#D282A8]/30 bg-white text-xs font-semibold text-[#71305D] disabled:opacity-40 flex items-center gap-1"
    >
      Next <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);

export const QuickViewModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#71305D]/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#D282A8]/30 relative flex flex-col md:flex-row">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 text-[#71305D]">
          <X className="w-5 h-5" />
        </button>
        <div className="md:w-1/2 aspect-square bg-[#FAF4F7]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 md:w-1/2 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#8E507D]">{product.category}</span>
            <h3 className="text-2xl font-serif font-bold text-[#71305D] mt-1">{product.name}</h3>
            <p className="text-xs text-[#8E507D] mt-2 font-light">{product.description}</p>
          </div>
          <div className="space-y-3 pt-4 border-t border-[#D282A8]/20">
            <div className="text-2xl font-bold text-[#71305D]">${product.price}.00</div>
            <button
              onClick={() => { onAddToCart(product.id); onClose(); }}
              className="w-full py-3 bg-[#71305D] text-white rounded-xl text-xs font-bold hover:bg-[#8E507D] flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};