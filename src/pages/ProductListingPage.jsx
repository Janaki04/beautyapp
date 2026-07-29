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
import { useWishlist } from '../components/WishlistContext';

const PRODUCTS_DATA = [
  { 
    id: 1, 
    name: 'Velvet Matte Lip Silk', 
    subtitle: 'Hydrating Long-Wear Liquid Lipstick',
    category: 'Makeup', 
    brand: 'Lunéva Atelier', 
    price: 34, 
    originalPrice: 42, 
    rating: 4.9, 
    reviewCount: 128,
    isNew: true, 
    isBestSeller: true, 
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800', 
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&q=80&w=800'
    ],
    shortDescription: 'A weightless, ultra-hydrating matte lip color that provides intense color payoff with a velvety, cushion-soft finish.',
    description: 'Weightless, hydrating matte formula infused with hyaluronic acid.',
    details: {
      description: 'Crafted with fine silk powder and botanical micro-oils, this liquid lip color glides effortlessly for full-coverage matte finish without drying.',
      howToUse: 'Apply directly to clean lips starting from the center and sweeping outward. Allow 30 seconds to set.',
      ingredients: 'Dimethicone, Isododecane, Synthetic Wax, Hyaluronic Acid, Tocopherol (Vitamin E), Rosa Canina Fruit Oil, Iron Oxides.'
    },
    reviews: [
      { id: 'r1', author: 'Sophia L.', rating: 5, date: '2 days ago', comment: 'Absolutely stunning texture! Doesn’t dry out my lips at all.' },
      { id: 'r2', author: 'Elena R.', rating: 5, date: '1 week ago', comment: 'The color intensity is amazing. Lasts through lunch easily.' }
    ],
    bundleItems: [
      { id: 'b1', name: 'Precision Lip Liner', price: 22, image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800' }
    ],
    relatedProducts: [
      { id: 4, name: 'Silk Elixir Hydrating Foundation', category: 'Makeup', price: 52, image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  { 
    id: 2, 
    name: 'Celestial Glow Niacinamide Serum', 
    subtitle: 'Barrier Repair & Radiance Elixir',
    category: 'Skincare', 
    brand: 'Aura Botanica', 
    price: 68, 
    originalPrice: 80, 
    rating: 4.8, 
    reviewCount: 94,
    isNew: false, 
    isBestSeller: true, 
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800', 
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608248597261-833258657640?auto=format&fit=crop&q=80&w=800'
    ],
    shortDescription: 'Concentrated Niacinamide serum designed to visibly refine pore structure, brighten dark spots, and strengthen the moisture barrier.',
    description: 'Restores skin barrier luminescence with concentrated vitamin B3.',
    details: {
      description: 'Formulated with 10% Niacinamide and Zinc PCA to regulate sebum production while enhancing natural luminescence.',
      howToUse: 'Dispense 3-4 drops onto cleansed face and neck morning and evening before creams.',
      ingredients: 'Aqua/Water, Niacinamide (10%), Glycerin, Zinc PCA, Sodium Hyaluronate, Centella Asiatica Extract, Phenoxyethanol.'
    },
    reviews: [
      { id: 'r3', author: 'Marcus V.', rating: 5, date: '3 days ago', comment: 'Game changer for my uneven texture. Noticed results in a week!' }
    ],
    bundleItems: [
      { id: 'b2', name: 'Rose Quartz Gua Sha Tool', price: 28, image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800' }
    ],
    relatedProducts: [
      { id: 6, name: 'Whipped Shea & Rose Body Butter', category: 'Body Care', price: 38, image: 'https://images.unsplash.com/photo-1608248597261-833258657640?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  { 
    id: 3, 
    name: 'Rose Oud Eau De Parfum', 
    subtitle: 'Artisanal Niche Fragrance',
    category: 'Fragrances', 
    brand: 'Maison de Rose', 
    price: 125, 
    originalPrice: 145, 
    rating: 5.0, 
    reviewCount: 42,
    isNew: true, 
    isBestSeller: false, 
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800', 
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800'
    ],
    shortDescription: 'A captivating blend of rare Damask rose petals and deep, smoky Cambodian oud wrapped in warm amber.',
    description: 'Deep Damask rose paired with velvety smoky oud notes.',
    details: {
      description: 'Handcrafted in small batches using sustainably sourced natural essential oils for maximum longevity and sillage.',
      howToUse: 'Spritz onto pulse points—wrists, neck, and inner elbows. Do not rub after application.',
      ingredients: 'Alcohol Denat., Parfum (Fragrance), Rosa Damascena Flower Extract, Aquilaria Agallocha (Oud) Oil, Benzyl Benzoate, Linalool.'
    },
    reviews: [
      { id: 'r4', author: 'Clara M.', rating: 5, date: '5 days ago', comment: 'Intense, romantic, and lasts all day on skin and clothes.' }
    ],
    bundleItems: [],
    relatedProducts: []
  },
  { 
    id: 4, 
    name: 'Silk Elixir Hydrating Foundation', 
    subtitle: 'Luminous Second-Skin Fluid',
    category: 'Makeup', 
    brand: 'Lunéva Atelier', 
    price: 52, 
    originalPrice: 60, 
    rating: 4.6, 
    reviewCount: 78,
    isNew: false, 
    isBestSeller: false, 
    image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=800', 
    images: [
      'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=800'
    ],
    shortDescription: 'Lightweight fluid foundation offering medium-to-buildable coverage with a natural dewiness.',
    description: 'Second-skin finish with medium buildable glow coverage.',
    details: {
      description: 'Infused with hydrating botanical extracts, this foundation blurs imperfections and evens tone seamlessly.',
      howToUse: 'Pump onto the back of your hand. Blend onto face using a dense foundation brush or damp beauty sponge.',
      ingredients: 'Water, Cyclopentasiloxane, Titanium Dioxide, Squalane, Glycerin, Silica, Mica, Triethoxycaprylylsilane.'
    },
    reviews: [
      { id: 'r5', author: 'Hannah T.', rating: 4, date: '2 weeks ago', comment: 'Looks completely natural! Very dewy and comfortable.' }
    ],
    bundleItems: [],
    relatedProducts: [
      { id: 1, name: 'Velvet Matte Lip Silk', category: 'Makeup', price: 34, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  { 
    id: 5, 
    name: 'Botanical Keratin Hair Treatment', 
    subtitle: 'Deep Conditioning Restorative Mask',
    category: 'Haircare', 
    brand: 'Hair Therapy Co.', 
    price: 42, 
    originalPrice: 50, 
    rating: 4.7, 
    reviewCount: 65,
    isNew: false, 
    isBestSeller: true, 
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=800', 
    images: [
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=800'
    ],
    shortDescription: 'Intensive weekly treatment mask that repairs broken hair bonds and seals split ends.',
    description: 'Intense reparative mask for silky smooth, frizz-free tresses.',
    details: {
      description: 'Formulated with plant-derived keratin and cold-pressed Argan oil to nourish compromised hair shafts.',
      howToUse: 'Apply generously from mid-lengths to ends after shampooing. Leave on for 5-10 minutes, then rinse thoroughly.',
      ingredients: 'Water, Cetearyl Alcohol, Argania Spinosa Kernel Oil, Hydrolyzed Wheat Protein, Behentrimonium Chloride, Fragrance.'
    },
    reviews: [
      { id: 'r6', author: 'Jessica B.', rating: 5, date: '1 month ago', comment: 'Saved my heat-damaged hair. Soft and smooth again!' }
    ],
    bundleItems: [],
    relatedProducts: []
  },
  { 
    id: 6, 
    name: 'Whipped Shea & Rose Body Butter', 
    subtitle: '48-Hour Ultra-Nourishing Cream',
    category: 'Body Care', 
    brand: 'Aura Botanica', 
    price: 38, 
    originalPrice: 45, 
    rating: 4.9, 
    reviewCount: 110,
    isNew: true, 
    isBestSeller: false, 
    image: 'https://images.unsplash.com/photo-1608248597261-833258657640?auto=format&fit=crop&q=80&w=800', 
    images: [
      'https://images.unsplash.com/photo-1608248597261-833258657640?auto=format&fit=crop&q=80&w=800'
    ],
    shortDescription: 'Rich, cloud-like body butter infused with raw African shea and organic Rosehip oil.',
    description: 'Rich, velvet-soft nourishment for deep 48-hour hydration.',
    details: {
      description: 'Melt-on-contact body moisturizer that absorbs quickly without feeling greasy.',
      howToUse: 'Massage over towel-dried body after bathing, focusing on dry areas like knees and elbows.',
      ingredients: 'Butyrospermum Parkii (Shea Butter), Cocos Nucifera (Coconut) Oil, Rosa Canina Fruit Oil, Tocopherol, Fragrance.'
    },
    reviews: [
      { id: 'r7', author: 'Amara K.', rating: 5, date: '3 weeks ago', comment: 'Smells divine and keeps my dry skin soft all day.' }
    ],
    bundleItems: [],
    relatedProducts: [
      { id: 2, name: 'Celestial Glow Niacinamide Serum', category: 'Skincare', price: 68, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  { 
    id: 7, 
    name: 'Rose Quartz Gua Sha Tool', 
    subtitle: 'Sculpting Facial Massage Stone',
    category: 'Beauty Accessories', 
    brand: 'Lunéva Atelier', 
    price: 28, 
    originalPrice: 35, 
    rating: 4.8, 
    reviewCount: 52,
    isNew: false, 
    isBestSeller: true, 
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800', 
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800'
    ],
    shortDescription: '100% natural Rose Quartz stone designed to boost lymphatic drainage and relieve facial tension.',
    description: 'Hand-carved crystal facial massage tool for sculpted radiance.',
    details: {
      description: 'Ergonomically contoured tool carved from grade-A crystal to contour jawlines, cheekbones, and brow bones.',
      howToUse: 'Apply facial oil first. Glide tool gently along face contours in upward and outward strokes.',
      ingredients: '100% Natural Rose Quartz Crystal.'
    },
    reviews: [
      { id: 'r8', author: 'Nadia P.', rating: 5, date: '2 weeks ago', comment: 'Cooling on the face and really helps with morning puffiness.' }
    ],
    bundleItems: [],
    relatedProducts: []
  }
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
  
  const { toggleWishlist, isInWishlist } = useWishlist();

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
                <button onClick={handleResetFilters} className="px-5 py-2 bg-[#71305D] text-white text-xs rounded-xl inline-flex items-center gap-1.5 cursor-pointer">
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
                    isWishlisted={isInWishlist(product.id)}
                    isInCart={cart.includes(product.id)}
                    onToggleWishlist={() => toggleWishlist(product)}
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