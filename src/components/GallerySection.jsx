'use client';
import { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GallerySection({ galleryList }) {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['Semua', 'Lingkungan', 'Ekonomi & UMKM', 'Kesehatan', 'Pendidikan', 'Teknologi'];

  const filteredGallery = galleryList.filter(item => 
    activeCategory === 'Semua' || item.prokerCategory === activeCategory
  );

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredGallery.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  return (
    <section id="dokumentasi" className="py-20 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy">
            Galeri <span className="text-brand-gold">Foto & Visual KKN</span>
          </h2>
          <p className="text-base text-slate-600">
            Kumpulan momen dan kebersamaan tim KKN Kelompok 3 bersama masyarakat Desa Karangrejo.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-brand-gold to-amber-600 text-white shadow-md shadow-brand-gold/20'
                  : 'bg-slate-100 text-brand-navy hover:text-brand-gold hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => openLightbox(idx)}
              className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer shadow-sm hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="absolute top-4 right-4 p-2 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 text-brand-gold group-hover:scale-110 transition-transform shadow-sm">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-brand-gold text-white shadow-sm">
                  {item.prokerCategory}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-xs text-slate-200 line-clamp-1 font-normal">
                    {item.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
          
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-white text-slate-800 hover:text-black border border-slate-200 shadow-lg z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevLightbox}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-white text-slate-800 hover:text-brand-gold border border-slate-200 shadow-lg z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextLightbox}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-white text-slate-800 hover:text-brand-gold border border-slate-200 shadow-lg z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center space-y-4">
            <div className="relative max-h-[70vh] rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-black">
              <img
                src={filteredGallery[lightboxIndex].image}
                alt={filteredGallery[lightboxIndex].title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="text-center space-y-1 bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-lg max-w-xl">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                {filteredGallery[lightboxIndex].prokerCategory} ({lightboxIndex + 1} / {filteredGallery.length})
              </span>
              <h3 className="text-lg font-bold text-brand-navy">
                {filteredGallery[lightboxIndex].title}
              </h3>
              <p className="text-xs text-slate-600">
                {filteredGallery[lightboxIndex].caption}
              </p>
            </div>
          </div>

        </div>
      )}

    </section>
  );
}
