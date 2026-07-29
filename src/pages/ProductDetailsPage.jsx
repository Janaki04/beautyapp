import React, { useState } from 'react';
import { 
  Star, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  ChevronLeft,
  ChevronRight, 
  Plus, 
  Minus, 
  Check, 
  Sparkles
} from 'lucide-react';

export default function ProductDetailsPage({ productData }) {
  // If no productData is provided, render nothing
  if (!productData) return null;

  const images = productData.images || (productData.image ? [productData.image] : []);
  const shades = productData.shades || [];
  const details = productData.details || {};

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedShade, setSelectedShade] = useState(shades[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [bundleSelection, setBundleSelection] = useState([]);
  const [addedToast, setAddedToast] = useState(false);

  const handleNextImage = () => {
    if (images.length > 0) {
      setSelectedImage((prev) => (prev + 1) % images.length);
    }
  };

  const handlePrevImage = () => {
    if (images.length > 0) {
      setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const toggleBundleItem = (id) => {
    setBundleSelection((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const availableTabs = [];
  if (details.description || productData.description) {
    availableTabs.push({ id: 'details', label: 'Details', content: details.description || productData.description });
  }
  if (details.howToUse || productData.howToUse) {
    availableTabs.push({ id: 'howToUse', label: 'How to Use', content: details.howToUse || productData.howToUse });
  }
  if (details.ingredients || productData.ingredients) {
    availableTabs.push({ id: 'ingredients', label: 'Ingredients', content: details.ingredients || productData.ingredients });
  }

  const currentTabObj = availableTabs.find((t) => t.id === activeTab) || availableTabs[0];

  return (
    <div className="bg-[#FAF4F7] min-h-screen text-[#33182C] font-sans pb-16 pt-8">
      
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#71305D] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-[#FBAEB9] flex items-center justify-center text-[#71305D]">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <span className="text-xs font-semibold tracking-wide">Item added to your bag</span>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-6 space-y-8 min-w-0 w-full">
            
            <div className="flex flex-col-reverse sm:flex-row gap-4 items-center sm:items-start min-w-0 w-full">
              {images.length > 1 && (
                <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[500px] w-full sm:w-auto shrink-0 py-1 no-scrollbar">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden border shrink-0 transition-all cursor-pointer ${
                        selectedImage === idx 
                          ? 'ring-2 ring-[#71305D] border-[#71305D] scale-95' 
                          : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="relative w-full aspect-square bg-white border border-gray-100 rounded-2xl overflow-hidden flex items-center justify-center shrink min-w-0">
                {images.length > 0 && (
                  <img
                    src={images[selectedImage]}
                    alt={productData.name || 'Product Image'}
                    className="w-full h-full object-contain p-4"
                  />
                )}

                {images.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-black transition-colors"
                      aria-label="Previous Image"
                    >
                      <ChevronLeft className="w-8 h-8 stroke-[1.5]" />
                    </button>
                    <button 
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-black transition-colors"
                      aria-label="Next Image"
                    >
                      <ChevronRight className="w-8 h-8 stroke-[1.5]" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {availableTabs.length > 0 && (
              <div className="border border-[#D282A8]/20 rounded-2xl p-6 bg-white space-y-4">
                <div className="flex border-b border-[#D282A8]/20 gap-6 text-xs font-bold uppercase tracking-wider overflow-x-auto pb-1">
                  {availableTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                        (currentTabObj?.id === tab.id)
                          ? 'border-[#71305D] text-[#71305D]'
                          : 'border-transparent text-[#8E507D] hover:text-[#71305D]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="text-xs text-[#33182C] leading-relaxed min-h-[60px]">
                  {currentTabObj?.id === 'ingredients' ? (
                    <p className="font-mono text-[11px] bg-[#FAF4F7] p-3 rounded-lg border border-[#D282A8]/20 text-[#8E507D]">
                      {currentTabObj?.content}
                    </p>
                  ) : (
                    <p>{currentTabObj?.content}</p>
                  )}
                </div>
              </div>
            )}

          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <div>
                {productData.brand && (
                  <span className="text-xs font-bold uppercase tracking-widest text-[#8E507D]">
                    {productData.brand}
                  </span>
                )}
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#71305D] mt-1">
                  {productData.name}
                </h1>
                {productData.subtitle && (
                  <p className="text-xs text-[#8E507D] font-light mt-0.5">{productData.subtitle}</p>
                )}
              </div>

              {(productData.rating || productData.reviewCount) && (
                <div className="flex items-center gap-3">
                  {productData.rating && (
                    <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-[#D282A8]/20 shadow-xs">
                      <Star className="w-3.5 h-3.5 fill-[#FBAEB9] text-[#FBAEB9]" />
                      <span className="text-xs font-bold text-[#71305D]">{productData.rating}</span>
                    </div>
                  )}
                  {productData.reviewCount && (
                    <span className="text-xs text-[#8E507D]">{productData.reviewCount} Reviews</span>
                  )}
                  <span className="text-[#D282A8]/40">•</span>
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3 stroke-[3]" /> In Stock
                  </span>
                </div>
              )}

              <div className="flex items-baseline gap-3 pt-2">
                {productData.price && (
                  <span className="text-3xl font-serif font-bold text-[#71305D]">
                    ${productData.price}.00
                  </span>
                )}
                {productData.originalPrice && (
                  <span className="text-base text-[#8E507D]/60 line-through">
                    ${productData.originalPrice}.00
                  </span>
                )}
              </div>

              {productData.shortDescription && (
                <p className="text-xs text-[#33182C]/80 font-light leading-relaxed border-t border-[#D282A8]/15 pt-3">
                  {productData.shortDescription}
                </p>
              )}

              {shades.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-bold text-[#71305D] uppercase tracking-wider block">
                    Shade: <span className="font-normal text-[#8E507D]">{selectedShade?.name}</span>
                  </span>
                  <div className="flex items-center gap-3">
                    {shades.map((shade) => (
                      <button
                        key={shade.id || shade.name}
                        onClick={() => setSelectedShade(shade)}
                        className={`relative w-8 h-8 rounded-full transition-all flex items-center justify-center cursor-pointer ${
                          selectedShade?.id === shade.id || selectedShade?.name === shade.name
                            ? 'ring-2 ring-offset-2 ring-[#71305D] scale-110'
                            : 'hover:scale-105 opacity-85'
                        }`}
                        style={{ backgroundColor: shade.hex }}
                        title={shade.name}
                      >
                        {(selectedShade?.id === shade.id || selectedShade?.name === shade.name) && (
                          <Check className="w-3.5 h-3.5 text-white drop-shadow-xs" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-[#71305D] uppercase tracking-wider block">Quantity</span>
                <div className="flex items-center bg-white border border-[#D282A8]/30 rounded-xl w-fit p-1 shadow-xs">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-1.5 text-[#8E507D] hover:text-[#71305D] rounded-lg cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-[#71305D]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-1.5 text-[#8E507D] hover:text-[#71305D] rounded-lg cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2.5 pt-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 bg-[#FBAEB9] text-[#71305D] font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-[#71305D] hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add To Shopping Bag
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 bg-[#71305D] text-white font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-[#8E507D] transition-all shadow-md cursor-pointer"
                >
                  Buy It Now
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 border-t border-[#D282A8]/15 pt-5 text-center text-[10px] text-[#8E507D]">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-[#71305D]" />
                  <span>Free Express Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#71305D]" />
                  <span>100% Authentic Formula</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-[#71305D]" />
                  <span>30-Day Returns</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {productData.bundleItems && productData.bundleItems.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-[#D282A8]/20 mt-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D282A8]/20 shadow-xs space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#71305D]" />
              <h3 className="text-lg font-serif font-bold text-[#71305D]">Frequently Bought Together</h3>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 flex-1">
                <div className="flex items-center gap-3 bg-[#FAF4F7] p-3 rounded-2xl border border-[#D282A8]/20">
                  <img src={images[0]} alt={productData.name} className="w-16 h-16 object-cover rounded-xl" />
                  <div className="text-xs">
                    <div className="font-bold text-[#71305D] line-clamp-1">{productData.name}</div>
                    <div className="text-[#8E507D]">${productData.price}.00</div>
                  </div>
                </div>

                {productData.bundleItems.map((item) => {
                  const isSelected = bundleSelection.includes(item.id);
                  return (
                    <React.Fragment key={item.id}>
                      <Plus className="w-4 h-4 text-[#8E507D]" />
                      <div 
                        onClick={() => toggleBundleItem(item.id)}
                        className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-[#FAF4F7] border-[#71305D]' 
                            : 'bg-white border-gray-200 opacity-60'
                        }`}
                      >
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                        <div className="text-xs">
                          <div className="font-bold text-[#71305D]">{item.name}</div>
                          <div className="text-[#8E507D]">${item.price}.00</div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {productData.relatedProducts && productData.relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <h3 className="text-lg font-serif font-bold text-[#71305D] uppercase tracking-wider text-center">
              You May Also Love
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productData.relatedProducts.map((prod) => (
                <div key={prod.id} className="bg-white rounded-2xl border border-[#D282A8]/20 p-4 space-y-3 hover:shadow-lg transition-all group">
                  <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF4F7]">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#8E507D]">{prod.category}</span>
                    <h4 className="text-xs font-serif font-bold text-[#71305D] line-clamp-1">{prod.name}</h4>
                    <div className="text-xs font-bold text-[#71305D]">${prod.price}.00</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}