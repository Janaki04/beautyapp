import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare, Plus, Sparkles, X } from 'lucide-react';

export default function CustomerReviews() {
  const [selectedRating, setSelectedRating] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '', product: 'Radiance Serum' });
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Sophia Martinez',
      rating: 5,
      date: '2 days ago',
      verified: true,
      product: 'Radiance Serum',
      title: 'Obsessed with the glow!',
      comment: 'My skin has never felt this hydrated and luminous. It absorbs quickly without leaving any oily residue. A absolute staple in my night routine.',
      likes: 24,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 2,
      author: 'Elena Rostova',
      rating: 5,
      date: '1 week ago',
      verified: true,
      product: 'Matte Lipstick (Velvet Rose)',
      title: 'Long-lasting & Non-drying',
      comment: 'Finding a matte lipstick that does not dry out your lips is rare. Man$JAN nailed the formula. Staying power is incredible through dinner.',
      likes: 18,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 3,
      author: 'Chloe Bennett',
      rating: 4,
      date: '2 weeks ago',
      verified: true,
      product: 'Hydrating Tonic',
      title: 'Extremely Refreshing',
      comment: 'Smells divine and gives an instant pick-me-up throughout the day. Only giving 4 stars because I wish the bottle was slightly larger!',
      likes: 9,
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    },
  ]);
  const handleLike = (id) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r));
  };
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const reviewToAdd = {
      id: Date.now(),
      author: newReview.name,
      rating: Number(newReview.rating),
      date: 'Just now',
      verified: true,
      product: newReview.product,
      title: 'Verified Customer Review',
      comment: newReview.comment,
      likes: 0,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    };

    setReviews([reviewToAdd, ...reviews]);
    setIsModalOpen(false);
    setNewReview({ name: '', rating: 5, comment: '', product: 'Radiance Serum' });
  };
  const filteredReviews = selectedRating 
    ? reviews.filter(r => r.rating === selectedRating) 
    : reviews;

  return (
    <section className="py-16 md:py-24 bg-[#FAF4F7] text-[#33182C] relative z-10 border-t border-[#FBAEB9]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8E507D]/10 border border-[#71305D]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#71305D]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#71305D] uppercase">
              Loved By Thousands
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-wide text-[#71305D] font-bold">
            Real Beauty, Real Reviews
          </h2>
          <div className="w-12 h-[2px] bg-[#D282A8] mx-auto mt-3" />
        </div>
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#FBAEB9]/30 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="text-4xl font-serif font-bold text-[#71305D]">4.9</div>
            <div>
              <div className="flex items-center text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">Based on 1,248 verified customer reviews</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedRating(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedRating === null 
                  ? 'bg-[#71305D] text-white' 
                  : 'bg-[#FAF4F7] text-[#71305D] hover:bg-[#8E507D]/20'
              }`}
            >
              All Reviews
            </button>
            {[5, 4, 3].map((stars) => (
              <button
                key={stars}
                onClick={() => setSelectedRating(stars)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                  selectedRating === stars 
                    ? 'bg-[#71305D] text-white' 
                    : 'bg-[#FAF4F7] text-[#71305D] hover:bg-[#8E507D]/20'
                }`}
              >
                {stars} <Star className="w-3 h-3 fill-current" />
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3 bg-[#FBAEB9] text-[#71305D] text-xs font-bold tracking-widest uppercase rounded-md hover:bg-[#71305D] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Write a Review
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl p-6 border border-[#FBAEB9]/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-10 h-10 rounded-full object-cover border border-[#FBAEB9]"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-[#71305D] uppercase">{review.author}</h4>
                        {review.verified && (
                          <CheckCircle className="w-3.5 h-3.5 text-[#8E507D] fill-[#FAF4F7]" />
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400">{review.date}</span>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-sm bg-[#FAF4F7] text-[10px] font-semibold text-[#8E507D] mb-3">
                  Product: {review.product}
                </div>
                <h5 className="text-sm font-bold text-[#71305D] mb-1">{review.title}</h5>
                <p className="text-xs text-gray-600 font-light leading-relaxed mb-6">
                  "{review.comment}"
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] text-gray-400">Was this review helpful?</span>
                <button
                  onClick={() => handleLike(review.id)}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#71305D] transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium">{review.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full border border-[#FBAEB9]/50 shadow-2xl relative">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#71305D] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-bold text-[#71305D] mb-1">
              Share Your Experience
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              We value your honest feedback on Man$JAN products.
            </p>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#71305D] uppercase mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="e.g. Isabella Rossi"
                  className="w-full px-4 py-2.5 bg-[#FAF4F7] border border-[#FBAEB9]/40 rounded-md text-xs text-[#71305D] focus:outline-none focus:border-[#71305D]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#71305D] uppercase mb-1">
                  Rating
                </label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#FAF4F7] border border-[#FBAEB9]/40 rounded-md text-xs text-[#71305D] focus:outline-none focus:border-[#71305D]"
                >
                  <option value={5}>5 Stars - Exceptional</option>
                  <option value={4}>4 Stars - Great</option>
                  <option value={3}>3 Stars - Average</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#71305D] uppercase mb-1">
                  Review
                </label>
                <textarea
                  required
                  rows={4}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Tell us what you loved about the product..."
                  className="w-full px-4 py-2.5 bg-[#FAF4F7] border border-[#FBAEB9]/40 rounded-md text-xs text-[#71305D] focus:outline-none focus:border-[#71305D]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#71305D] text-white text-xs font-bold tracking-widest uppercase rounded-md hover:bg-[#8E507D] transition-colors shadow-md"
              >
                Submit Review
              </button>
            </form>

          </div>
        </div>
      )}
    </section>
  );
}