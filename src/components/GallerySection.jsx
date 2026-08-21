'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GallerySection({ galleryList }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const sectionRef = useRef(null);

  const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?auto=format&fit=crop&w=800&q=80';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll('.reveal');
            reveals.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 60));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryList.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryList.length) % galleryList.length);
    }
  };

  return (
    <section id="dokumentasi" ref={sectionRef} className="py-20 bg-white border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="reveal text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            Galeri <span className="text-gradient-gold">Foto &amp; Visual KKN</span>
          </h2>
          <p className="text-base text-slate-500">
            Kumpulan momen dan kebersamaan tim KKN Kelompok 3 bersama masyarakat Desa Karangrejo.
          </p>
        </div>

        {/* Gallery Grid */}
        {galleryList.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
            <p className="text-slate-400 font-medium text-sm">Belum ada foto galeri. Tambahkan dari panel Admin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {galleryList.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => openLightbox(idx)}
                className="reveal group relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 cursor-pointer shadow-card hover:shadow-gold-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <Image
                  src={item.image || PLACEHOLDER_IMG}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute top-4 right-4 p-2 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 text-brand-gold group-hover:scale-110 transition-transform shadow-sm">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-1">
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
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && galleryList[lightboxIndex] && (
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
            <div className="relative w-full max-h-[70vh] rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-black" style={{ aspectRatio: '16/10' }}>
              <Image
                src={galleryList[lightboxIndex].image || PLACEHOLDER_IMG}
                alt={galleryList[lightboxIndex].title}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-contain"
                priority
              />
            </div>

            <div className="text-center space-y-1 bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-lg max-w-xl">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                {lightboxIndex + 1} / {galleryList.length}
              </span>
              <h3 className="text-lg font-bold text-brand-navy">
                {galleryList[lightboxIndex].title}
              </h3>
              {galleryList[lightboxIndex].caption && (
                <p className="text-xs text-slate-600">
                  {galleryList[lightboxIndex].caption}
                </p>
              )}
            </div>
          </div>

        </div>
      )}

    </section>
  );
}
