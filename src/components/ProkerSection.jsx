'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { CheckCircle, Clock, Calendar, Filter, Search, Eye, X, Target } from 'lucide-react';

export default function ProkerSection({ prokerList }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProker, setActiveModalProker] = useState(null);
  const sectionRef = useRef(null);

  const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?auto=format&fit=crop&w=800&q=80';

  const categories = ['Semua', 'Proker Utama', 'Proker Tambahan'];

  const filteredProker = prokerList.filter(item => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
    <section id="proker" ref={sectionRef} className="py-20 bg-slate-50 border-t border-slate-100 relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="reveal text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            Daftar <span className="text-gradient-gold">Program Kerja KKN</span>
          </h2>
          <p className="text-base text-slate-500">
            Dokumentasi rencana, pelaksanaan, dan capaian hasil proker Kelompok 3 di Desa Karangrejo.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-brand-gold to-amber-600 text-white shadow-md shadow-brand-gold/20'
                    : 'bg-white text-brand-navy hover:text-brand-gold hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama proker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 text-brand-navy text-sm rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 shadow-card transition-all"
            />
          </div>

        </div>

        {/* Proker Grid */}
        {filteredProker.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">Tidak ada program kerja yang cocok dengan pencarian.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProker.map((proker) => (
              <div
                key={proker.id}
                className="reveal group rounded-3xl bg-white border border-slate-200 hover:border-brand-gold/60 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 shadow-card hover:shadow-gold-lg"
              >
                <div>
                  {/* Image & Status Badge */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={proker.image || PLACEHOLDER_IMG}
                      alt={proker.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md border ${
                        proker.status === 'Selesai'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}>
                        {proker.status === 'Selesai' ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-emerald-600" /> Selesai
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-600" /> Berjalan
                          </span>
                        )}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-white/90 text-brand-navy border border-slate-200 backdrop-blur-md shadow-sm">
                        {proker.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{proker.date}</span>
                    </div>

                    <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-gold transition-colors line-clamp-2">
                      {proker.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {proker.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => setActiveModalProker(proker)}
                    className="w-full py-2.5 px-4 rounded-xl btn-shimmer bg-gradient-to-r from-slate-50 to-amber-50 hover:from-brand-gold hover:to-amber-500 hover:text-white text-brand-navy text-xs sm:text-sm font-bold border border-slate-200 hover:border-transparent flex items-center justify-center gap-2 transition-all duration-300 shadow-card"
                  >
                    <Eye className="w-4 h-4 text-brand-gold" />
                    <span>Lihat Detail Proker</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Proker Detail Modal */}
      {activeModalProker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl my-8">
            
            {/* Modal Image Header */}
            <div className="relative h-64 w-full">
              <Image
                src={activeModalProker.image || PLACEHOLDER_IMG}
                alt={activeModalProker.title}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
              <button
                onClick={() => setActiveModalProker(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-md"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 text-xs font-bold rounded-lg bg-brand-gold text-white shadow-md">
                  {activeModalProker.category}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-1">
                  <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Pelaksanaan: {activeModalProker.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy">{activeModalProker.title}</h3>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block mb-1">Tujuan Program</span>
                  <p className="text-brand-navy font-medium">{activeModalProker.objective}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block mb-1">Sasaran Peserta / Warga</span>
                  <p className="text-brand-navy font-medium">{activeModalProker.target}</p>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Deskripsi Lengkap</span>
                  <p>{activeModalProker.description}</p>
                </div>

                {activeModalProker.impact && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                    <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block mb-1">Dampak & Capaian Result</span>
                    <p className="text-brand-navy font-medium">{activeModalProker.impact}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setActiveModalProker(null)}
                  className="px-6 py-2.5 rounded-full bg-brand-navy hover:bg-brand-navyHover text-white font-bold text-sm shadow-md"
                >
                  Tutup Detail
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
