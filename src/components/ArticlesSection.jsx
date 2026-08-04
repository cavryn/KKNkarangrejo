'use client';
import { useState, useEffect, useRef } from 'react';
import { Calendar, User, ArrowRight, X, BookMarked, FileText } from 'lucide-react';

export default function ArticlesSection({ articlesList }) {
  const [activeArticleModal, setActiveArticleModal] = useState(null);
  const sectionRef = useRef(null);

  const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?auto=format&fit=crop&w=800&q=80';

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
    <section id="artikel" ref={sectionRef} className="py-20 bg-slate-50 border-t border-slate-100 relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="reveal text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-brand-gold uppercase tracking-widest mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Modul & Artikel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            Materi Edukasi & <span className="text-gradient-gold">Panduan Proker</span>
          </h2>
          <p className="text-base text-slate-500">
            Kumpulan artikel edukatif dan modul praktis hasil proker KKN yang dapat dibaca dan dimanfaatkan secara gratis.
          </p>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articlesList.map((article) => (
            <div
              key={article.id}
              className="reveal p-6 rounded-3xl bg-white border border-slate-200 hover:border-brand-gold/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2 shadow-card hover:shadow-gold-lg"
            >
              <div className="space-y-4">
                <div className="relative h-52 rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={article.coverImage || article.coverimage || PLACEHOLDER_IMG}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = PLACEHOLDER_IMG; }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 text-xs font-bold rounded-lg bg-white/90 text-brand-navy border border-slate-200 backdrop-blur-md shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{article.date}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-gold transition-colors">
                  {article.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setActiveArticleModal(article)}
                  className="btn-shimmer w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-50 to-slate-50 hover:from-brand-gold hover:to-amber-500 text-brand-gold hover:text-white font-bold text-sm border border-amber-200 hover:border-transparent flex items-center justify-center gap-2 transition-all duration-300 group/btn shadow-card"
                >
                  <BookMarked className="w-4 h-4" />
                  <span>Baca Modul Selengkapnya</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl my-8">
            
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72 w-full">
              <img
                src={activeArticleModal.coverImage || activeArticleModal.coverimage || PLACEHOLDER_IMG}
                alt={activeArticleModal.title}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = PLACEHOLDER_IMG; }}
              />
              <button
                onClick={() => setActiveArticleModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-md"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 text-xs font-bold rounded-lg bg-brand-gold text-white shadow-md">
                  {activeArticleModal.category}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-10 space-y-6">
              <div>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold mb-2">
                  <span>Oleh: <strong className="text-brand-navy">{activeArticleModal.author}</strong></span>
                  <span>•</span>
                  <span>{activeArticleModal.date}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy leading-snug">
                  {activeArticleModal.title}
                </h2>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-brand-navy text-sm font-medium italic">
                "{activeArticleModal.summary}"
              </div>

              {/* Formatted Article Body */}
              <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
                {activeArticleModal.content}
              </div>

              <div className="pt-6 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setActiveArticleModal(null)}
                  className="px-6 py-2.5 rounded-full bg-brand-navy hover:bg-brand-navyHover text-white font-bold text-sm shadow-md"
                >
                  Selesai Membaca
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
