import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); 
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1200);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#71305D] via-[#8E507D] to-[#71305D] text-white py-16 md:py-24">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#D282A8]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FBAEB9]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 backdrop-blur-md border border-[#FBAEB9]/30 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none z-10" />

          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8E507D]/40 border border-[#FBAEB9]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#FBAEB9]" />
              <span className="text-xs font-semibold tracking-[0.25em] text-[#FBAEB9] uppercase">
                Join the Lunéva Club
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-wide text-white">
              Unlock Your Exclusive{' '}
              <span className="block text-[#FBAEB9] italic font-normal mt-1">
                15% Off First Order
              </span>
            </h2>
            <p className="text-sm md:text-base text-[#FBAEB9]/90 font-light leading-relaxed max-w-lg mx-auto">
              Subscribe to receive private sale access, luxury skincare tips, and insider product drops directly to your inbox.
            </p>
            {status === 'success' ? (
              /* SUCCESS STATE */
              <div className="p-6 rounded-xl bg-[#8E507D]/50 border border-[#FBAEB9]/50 flex flex-col items-center justify-center space-y-2 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-[#FBAEB9]" />
                <h3 className="text-lg font-serif font-semibold text-white">
                  Welcome to the Club!
                </h3>
                <p className="text-xs text-[#FBAEB9]">
                  Check your inbox for your 15% discount code.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/80 hover:text-white underline"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                  <div className="relative w-full">
                    <Mail className="w-5 h-5 text-[#FBAEB9]/70 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder="Enter your email address"
                      className={`w-full pl-11 pr-4 py-3.5 bg-[#71305D]/60 border text-white placeholder-white/50 text-xs tracking-wider rounded-md focus:outline-none transition-all duration-300 ${
                        status === 'error'
                          ? 'border-red-400 focus:border-red-400'
                          : 'border-[#FBAEB9]/40 focus:border-[#FBAEB9] focus:ring-1 focus:ring-[#FBAEB9]'
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto min-w-[140px] px-6 py-3.5 bg-[#FBAEB9] text-[#71305D] text-xs font-bold tracking-widest uppercase rounded-md hover:bg-white hover:shadow-[0_0_20px_rgba(251,174,185,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group flex-shrink-0 disabled:opacity-70"
                  >
                    {status === 'loading' ? (
                      <span className="w-4 h-4 border-2 border-[#71305D] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
                {status === 'error' && (
                  <p className="text-xs text-red-300 font-medium animate-shake">
                    {errorMessage}
                  </p>
                )}
                <p className="text-[10px] text-white/60 tracking-wider">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}