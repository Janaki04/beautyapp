import React from 'react';
import { Sparkles, Droplet, Rabbit, ArrowRight, ShoppingBag, Search, Menu } from 'lucide-react';
import Bestseller from './Bestseller';
import Newsletter from './Newsletter';
import CustomerReviews from './CustomerReviews';
import NewArrivals from './NewArrivals';

export default function Home() {
  const features = [
    {
      icon: Sparkles,
      title: 'PREMIUM INGREDIENTS',
    },
    {
      icon: Droplet,
      title: 'DERMATOLOGICALLY TESTED',
    },
    {
      icon: Rabbit,
      title: 'CRUELTY FREE',
    },
  ];
  const categories = [
    {
      name: 'Skincare',
      desc: 'Radiance Serums & Hydrating Toners',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Makeup',
      desc: 'Velvet Lipsticks & Luminous Foundations',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Haircare',
      desc: 'Nourishing Oils & Restorative Masks',
      image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Fragrances',
      desc: 'Signature Botanical Eau De Parfum',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Body Care',
      desc: 'Exfoliating Scrubs & Silky Lotions',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Beauty Accessories',
      desc: 'Jade Rollers & Luxury Applicators',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    },
  ];
  const carouselItems = [...categories, ...categories];

  return (
    <>
    <div className="min-h-screen bg-[#71305D] selection:bg-[#FBAEB9] selection:text-[#71305D]">
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.08); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(20px) scale(1.12); }
        }
        @keyframes scroll-infinite {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out 2s infinite;
        }
        .animate-scroll {
          animation: scroll-infinite 28s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#71305D] via-[#8E507D] to-[#71305D] text-white py-12 md:py-20 lg:py-16">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#D282A8]/20 rounded-full blur-3xl pointer-events-none animate-float-slow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FBAEB9]/15 rounded-full blur-3xl pointer-events-none animate-float-delayed" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8E507D]/30 border border-[#FBAEB9]/20 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBAEB9] animate-pulse" />
                <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-[#FBAEB9] uppercase">
                  New Luxury Collection
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight tracking-wide text-white">
                Reveal Your{' '}
                <span className="block text-[#FBAEB9] italic font-normal transition-all duration-500 hover:tracking-wider">
                  Timeless Glow
                </span>
              </h1>

              <p className="text-sm md:text-base text-[#FBAEB9]/90 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
                Premium skincare, makeup, and beauty essentials crafted with perfection for radiant, confident beauty.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#shop"
                  className="relative inline-flex items-center justify-center overflow-hidden w-full sm:w-auto bg-[#FBAEB9] text-[#71305D] text-xs font-bold tracking-widest px-8 py-4 uppercase transition-all duration-300 rounded-sm shadow-lg hover:shadow-[0_10px_25px_rgba(251,174,185,0.4)] hover:-translate-y-0.5 group"
                >
                  <span className="absolute inset-0 w-full h-full bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-[#71305D]">
                    Shop Now
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </a>
              </div>

              <div className="pt-8 border-t border-[#8E507D]/50 grid grid-cols-3 gap-4">
                {features.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2 group cursor-pointer"
                    >
                      <div className="p-2.5 rounded-full bg-[#8E507D]/40 text-[#FBAEB9] border border-[#FBAEB9]/20 group-hover:border-[#FBAEB9] group-hover:bg-[#8E507D]/80 group-hover:shadow-[0_0_15px_rgba(251,174,185,0.4)] transform group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-300">
                        <IconComponent className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      <span className="text-[10px] sm:text-xs tracking-wider font-medium text-[#FBAEB9]/90 group-hover:text-white uppercase leading-snug transition-colors duration-200">
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="lg:col-span-6 relative flex justify-center items-center">
              <div className="relative w-full max-w-lg lg:max-w-none h-[480px] sm:h-[550px] overflow-hidden rounded-2xl shadow-2xl bg-[#71305D]/40 backdrop-blur-sm">
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#71305D] to-transparent z-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#71305D] to-transparent z-20 pointer-events-none" />
                <div className="animate-scroll space-y-6 p-4">
                  {carouselItems.map((cat, idx) => (
                    <div
                      key={idx}
                      className="relative w-full h-[380px] sm:h-[440px] rounded-xl overflow-hidden  group cursor-pointer transition-all duration-500 hover:border-[#FBAEB9] hover:shadow-[0_0_30px_rgba(251,174,185,0.3)]"
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none z-10" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#71305D]/90 via-[#71305D]/30 to-transparent pointer-events-none" />
                      <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#71305D]/80 backdrop-blur-md border border-[#FBAEB9]/30 rounded-xl flex items-center justify-between shadow-lg transition-all duration-300 group-hover:bg-[#71305D]/95 group-hover:border-[#FBAEB9]/60">
                        <div>
                          <p className="text-xs font-serif text-[#FBAEB9] font-semibold tracking-wider uppercase">
                            {cat.name}
                          </p>
                          <p className="text-[11px] text-white/90 font-light mt-0.5">
                            {cat.desc}
                          </p>
                        </div>
                        <a
                          href={`#${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                          aria-label={`Shop ${cat.name}`}
                          className="p-2.5 bg-[#FBAEB9] text-[#71305D] rounded-full hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200 shadow-md flex-shrink-0"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
    <NewArrivals/>
    <Bestseller/>

    <Newsletter/>
    <CustomerReviews/>
    </>
  );
}