'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Calendar, User, ArrowRight, X, Newspaper, Clock, Sparkles } from 'lucide-react';

export default function NewsSection({ newsList = [] }) {
  const [activeNewsModal, setActiveNewsModal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const sectionRef = useRef(null);

  const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?auto=format&fit=crop&w=800&q=80';

  const categories = ['Semua', 'Liputan Proker', 'Kabar Desa', 'Edukasi & Lingkungan'];

  const filteredNews = selectedCategory === 'Semua'
    ? newsList
    : newsList.filter(n => n.category === selectedCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll('.reveal');
            reveals.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 80));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="berita" ref={sectionRef} className="py-20 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="reveal text-center max-w-3xl mx-auto mb-10 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Berita & <span className="text-gradient-gold">Kabar KKN</span>
          </h2>
          <p className="text-base text-slate-500">
            Liputan berita terkini, dinamika pengabdian, dan informasi kegiatan harian mahasiswa KKN Kelompok 3 di Desa Karangrejo.
          </p>
        </div>

        {/* Category Filters */}
        <div className="reveal flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-brand-navy text-white shadow-navy scale-105'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news) => (
            <article
              key={news.id}
              className="reveal p-6 rounded-3xl bg-white border border-slate-200 hover:border-brand-gold/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2 shadow-card hover:shadow-gold-lg cursor-pointer"
              onClick={() => setActiveNewsModal(news)}
            >
              <div className="space-y-4">
                {/* News Image */}
                <div className="relative h-48 sm:h-52 rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src={news.coverImage || news.coverimage || PLACEHOLDER_IMG}
                    alt={news.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 text-xs font-bold rounded-lg bg-white/95 text-brand-navy border border-slate-200 backdrop-blur-md shadow-sm">
                      {news.category}
                    </span>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold pt-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{news.date}</span>
                  </div>
                  {news.readTime && (
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{news.readTime}</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-brand-navy group-hover:text-brand-gold transition-colors leading-snug line-clamp-2">
                  {news.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {news.summary}
                </p>
              </div>

              {/* Read Action Button */}
              <div className="pt-6 border-t border-slate-100 mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{news.author}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-gold group-hover:translate-x-1 transition-transform">
                  Baca Berita
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 max-w-md mx-auto">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm font-semibold">Belum ada berita pada kategori ini.</p>
          </div>
        )}

      </div>

      {/* Reader Modal */}
      {activeNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl my-8 animate-fade-in-up">
            
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-80 w-full">
              <Image
                src={activeNewsModal.coverImage || activeNewsModal.coverimage || PLACEHOLDER_IMG}
                alt={activeNewsModal.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
              <button
                onClick={() => setActiveNewsModal(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-md transition-transform hover:scale-105"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-brand-navy text-white shadow-md border border-white/20 backdrop-blur-md">
                  {activeNewsModal.category}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-10 space-y-6">
              <div>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold mb-2">
                  <span>Ditulis oleh: <strong className="text-brand-navy">{activeNewsModal.author}</strong></span>
                  <span>•</span>
                  <span>{activeNewsModal.date}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy leading-snug">
                  {activeNewsModal.title}
                </h2>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-brand-navy text-sm font-medium italic">
                &quot;{activeNewsModal.summary}&quot;
              </div>

              {/* Formatted News Body */}
              <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
                {activeNewsModal.content}
              </div>

              <div className="pt-6 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setActiveNewsModal(null)}
                  className="px-6 py-2.5 rounded-full bg-brand-navy hover:bg-brand-navyHover text-white font-bold text-sm shadow-md transition-all active:scale-95"
                >
                  Tutup Berita
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
