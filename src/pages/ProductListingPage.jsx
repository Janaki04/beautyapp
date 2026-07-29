import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles, Search, RotateCcw, ArrowLeft } from 'lucide-react';
import { 
  SearchAndSortBar, 
  FilterSidebar, 
  ProductCard, 
  Pagination 
} from './ProductListingComponents';
import ProductDetailsPage from './ProductDetailsPage';
import { useLocation } from 'react-router-dom';

const PRODUCTS_DATA = [
  { id: 1, name: 'Velvet Matte Lip Silk', category: 'Makeup', brand: 'Lunéva Atelier', price: 34, originalPrice: 42, rating: 4.9, isNew: true, isBestSeller: true, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800', description: 'Weightless, hydrating matte formula infused with hyaluronic acid.' },
  { id: 2, name: 'Celestial Glow Niacinamide Serum', category: 'Skincare', brand: 'Aura Botanica', price: 68, originalPrice: 80, rating: 4.8, isNew: false, isBestSeller: true, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800', description: 'Restores skin barrier luminescence with concentrated vitamin B3.' },
  { id: 3, name: 'Rose Oud Eau De Parfum', category: 'Fragrances', brand: 'Maison de Rose', price: 125, originalPrice: 145, rating: 5.0, isNew: true, isBestSeller: false, image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800', description: 'Deep Damask rose paired with velvety smoky oud notes.' },
  { id: 4, name: 'Silk Elixir Hydrating Foundation', category: 'Makeup', brand: 'Lunéva Atelier', price: 52, originalPrice: 60, rating: 4.6, isNew: false, isBestSeller: false, image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=800', description: 'Second-skin finish with medium buildable glow coverage.' },
  { id: 5, name: 'Botanical Keratin Hair Treatment', category: 'Haircare', brand: 'Hair Therapy Co.', price: 42, originalPrice: 50, rating: 4.7, isNew: false, isBestSeller: true, image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=800', description: 'Intense reparative mask for silky smooth, frizz-free tresses.' },
  { id: 6, name: 'Whipped Shea & Rose Body Butter', category: 'Body Care', brand: 'Aura Botanica', price: 38, originalPrice: 45, rating: 4.9, isNew: true, isBestSeller: false, image: 'https://images.unsplash.com/photo-1608248597261-833258657640?auto=format&fit=crop&q=80&w=800', description: 'Rich, velvet-soft nourishment for deep 48-hour hydration.' },
  { id: 7, name: 'Rose Quartz Gua Sha Tool', category: 'Beauty Accessories', brand: 'Lunéva Atelier', price: 28, originalPrice: 35, rating: 4.8, isNew: false, isBestSeller: true, image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800', description: 'Hand-carved crystal facial massage tool for sculpted radiance.' }
];

const CATEGORIES = ['Skincare', 'Makeup', 'Haircare', 'Fragrances', 'Body Care', 'Beauty Accessories'];
const BRANDS = ['Lunéva Atelier', 'Aura Botanica', 'Maison de Rose', 'Hair Therapy Co.'];

export default function ProductListingPage() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(150);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  
  const [activeProduct, setActiveProduct] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleToggleBrand = (brand) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  useEffect(() => {
    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
    }
  }, [location.state]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedBrands([]);
    setPriceRange(150);
    setMinRating(0);
    setSortBy('featured');
    setCurrentPage(1);
  };

  const hasActiveFilters = Boolean(selectedCategory || selectedBrands.length || priceRange < 150 || minRating > 0);

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesPrice = product.price <= priceRange;
      const matchesRating = product.rating >= minRating;
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.id - b.id;
    });
  }, [searchQuery, selectedCategory, selectedBrands, priceRange, minRating, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
              Back to Catalog
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
    <div className="bg-[#FAF4F7] min-h-screen text-[#33182C]">
      <section className="bg-gradient-to-b from-[#71305D] to-[#8E507D] text-white py-12 text-center">
        <div className="max-w-7xl mx-auto space-y-2 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FBAEB9] text-xs font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Curated Collection
          </div>
          <h1 className="text-3xl font-serif font-bold">Luxury Product Catalog</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SearchAndSortBar 
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          viewMode={viewMode} setViewMode={setViewMode}
          sortBy={sortBy} setSortBy={setSortBy}
          onOpenMobileFilter={() => setIsMobileFilterOpen(true)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          <div className="hidden lg:block lg:col-span-1 sticky top-24 h-fit">
            <FilterSidebar 
              categories={CATEGORIES} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory}
              brands={BRANDS} selectedBrands={selectedBrands} onToggleBrand={handleToggleBrand}
              priceRange={priceRange} setPriceRange={setPriceRange}
              minRating={minRating} setMinRating={setMinRating}
              onReset={handleResetFilters} hasActiveFilters={hasActiveFilters}
            />
          </div>

          <main className="lg:col-span-3 space-y-6">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#D282A8]/20 space-y-3">
                <Search className="w-8 h-8 text-[#71305D] mx-auto" />
                <h3 className="text-lg font-serif font-bold text-[#71305D]">No Products Found</h3>
                <button onClick={handleResetFilters} className="px-5 py-2 bg-[#71305D] text-white text-xs rounded-xl inline-flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
                </button>
              </div>
            ) : (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {paginatedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    isWishlisted={wishlist.includes(product.id)}
                    isInCart={cart.includes(product.id)}
                    onToggleWishlist={(id) => setWishlist(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id])}
                    onToggleCart={(id) => setCart(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id])}
                    onQuickView={(selectedProd) => setActiveProduct(selectedProd)}
                  />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}