'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { BookOpen, Download, ArrowRight, X, FileText, CheckCircle2, ChevronLeft, ChevronRight, Maximize2, Layers } from 'lucide-react';

export default function ModulSection({ modulesList = [] }) {
  const [activeModuleModal, setActiveModuleModal] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const sectionRef = useRef(null);

  const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80';

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

  // Keyboard navigation for page slider
  useEffect(() => {
    if (!activeModuleModal) return;
    const handleKeyDown = (e) => {
      const pages = getModulePages(activeModuleModal);
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentPageIndex(prev => Math.min(prev + 1, pages.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentPageIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        setActiveModuleModal(null);
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModuleModal]);

  const getModulePages = (modul) => {
    if (!modul) return [];
    if (Array.isArray(modul.images) && modul.images.length > 0) return modul.images;
    if (typeof modul.images === 'string' && modul.images.startsWith('[')) {
      try { return JSON.parse(modul.images); } catch (e) {}
    }
    if (modul.coverImage || modul.coverimage) return [modul.coverImage || modul.coverimage];
    return [PLACEHOLDER_IMG];
  };

  const handleOpenModal = (modul) => {
    setActiveModuleModal(modul);
    setCurrentPageIndex(0);
    setIsFullscreen(false);
  };

  return (
    <section id="modul" ref={sectionRef} className="py-20 bg-white border-t border-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="reveal text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Modul & <span className="text-gradient-gold">Panduan Edukasi</span>
          </h2>
          <p className="text-base text-slate-500">
            Kumpulan panduan praktis, modul pelatihan proker, dan SOP terstruktur yang dapat dipelajari secara interaktif langsung di halaman web.
          </p>
        </div>

        {/* Modules Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modulesList.map((modul) => {
            const pages = getModulePages(modul);
            const cover = pages[0] || modul.coverImage || modul.coverimage || PLACEHOLDER_IMG;

            return (
              <div
                key={modul.id}
                className="reveal p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-amber-50/30 border border-slate-200 hover:border-brand-gold/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-card hover:shadow-gold-lg"
              >
                <div className="space-y-5">
                  
                  {/* Top Badge & Meta */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="px-3.5 py-1 text-xs font-extrabold rounded-full bg-amber-100 text-brand-gold border border-amber-200">
                      {modul.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{modul.pages || `${pages.length} Halaman`}</span>
                    </span>
                  </div>

                  {/* Modul Preview Thumbnail */}
                  <div 
                    onClick={() => handleOpenModal(modul)}
                    className="relative w-full h-56 rounded-2xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer group/img"
                  >
                    <Image
                      src={cover}
                      alt={modul.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm text-brand-navy text-xs font-bold shadow-md">
                        <BookOpen className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Buka & Baca Interaktif ({pages.length} Lembar)</span>
                      </span>
                    </div>
                  </div>

                  {/* Modul Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy group-hover:text-brand-gold transition-colors leading-snug">
                    {modul.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {modul.summary}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-2.5 pt-2">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-brand-gold flex items-center justify-center font-bold text-xs">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 font-semibold leading-tight">Disusun Oleh</p>
                      <p className="text-xs font-bold text-brand-navy leading-tight">{modul.author}</p>
                    </div>
                  </div>

                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-slate-200/80 mt-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleOpenModal(modul)}
                    className="btn-shimmer py-3 px-4 rounded-2xl bg-brand-navy hover:bg-brand-navyHover text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Buka Modul</span>
                  </button>

                  {modul.fileUrl || modul.fileurl ? (
                    <a
                      href={modul.fileUrl || modul.fileurl}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="py-3 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-brand-gold font-bold text-xs sm:text-sm border border-amber-200 hover:border-amber-300 flex items-center justify-center gap-2 transition-all active:scale-95 text-center"
                    >
                      <Download className="w-4 h-4" />
                      <span>Unduh PDF</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => handleOpenModal(modul)}
                      className="py-3 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-brand-gold font-bold text-xs sm:text-sm border border-amber-200 hover:border-amber-300 flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Lihat Lembar</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Flipbook / Booklet Reader Modal */}
      {activeModuleModal && (() => {
        const pages = getModulePages(activeModuleModal);
        const currentPage = pages[currentPageIndex] || pages[0] || PLACEHOLDER_IMG;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <div className={`relative w-full ${isFullscreen ? 'max-w-7xl h-[94vh]' : 'max-w-4xl'} bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300`}>
              
              {/* Modal Top Bar */}
              <div className="px-5 py-3.5 bg-gradient-to-r from-brand-navy to-slate-900 text-white flex items-center justify-between gap-4 border-b border-white/10 flex-shrink-0">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-amber-400 text-brand-navy">
                      {activeModuleModal.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white truncate">
                      {activeModuleModal.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-300 truncate">
                    Oleh: {activeModuleModal.author} • Halaman {currentPageIndex + 1} dari {pages.length}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all hidden sm:flex items-center"
                    title={isFullscreen ? "Kecilkan" : "Layar Penuh"}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => { setActiveModuleModal(null); setIsFullscreen(false); }}
                    className="p-2 rounded-xl bg-white/10 hover:bg-red-500 text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Viewer Stage */}
              <div className="relative flex-1 bg-slate-100 flex items-center justify-center overflow-hidden min-h-[360px] sm:min-h-[500px] p-2 sm:p-6">
                
                {/* Page Image */}
                <div className="relative max-w-full max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl border border-slate-300 bg-white flex items-center justify-center">
                  <img
                    src={currentPage}
                    alt={`${activeModuleModal.title} - Halaman ${currentPageIndex + 1}`}
                    className="max-h-[68vh] w-auto object-contain select-none"
                  />
                </div>

                {/* Left Navigation Arrow */}
                {currentPageIndex > 0 && (
                  <button
                    onClick={() => setCurrentPageIndex(prev => Math.max(prev - 1, 0))}
                    className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-brand-navy/90 hover:bg-brand-gold text-white shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95"
                    title="Halaman Sebelumnya (Panah Kiri)"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                {/* Right Navigation Arrow */}
                {currentPageIndex < pages.length - 1 && (
                  <button
                    onClick={() => setCurrentPageIndex(prev => Math.min(prev + 1, pages.length - 1))}
                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-brand-navy/90 hover:bg-brand-gold text-white shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95"
                    title="Halaman Berikutnya (Panah Kanan)"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}

                {/* Floating Page Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold shadow-lg border border-white/10">
                  Halaman {currentPageIndex + 1} / {pages.length}
                </div>
              </div>

              {/* Bottom Thumbnail Strip & Actions */}
              <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex-shrink-0 space-y-3">
                
                {/* Thumbnails if multiple pages */}
                {pages.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                    {pages.map((pageUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPageIndex(idx)}
                        className={`relative w-14 h-18 sm:w-16 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${currentPageIndex === idx ? 'border-brand-gold ring-2 ring-brand-gold/40 scale-105 shadow-md' : 'border-slate-200 opacity-60 hover:opacity-100'}`}
                      >
                        <img
                          src={pageUrl}
                          alt={`Thumbnail hal ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-white text-[9px] font-bold text-center py-0.5">
                          {idx + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Footer Controls */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentPageIndex === 0}
                      onClick={() => setCurrentPageIndex(prev => Math.max(prev - 1, 0))}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-amber-100 disabled:opacity-30 text-brand-navy font-bold text-xs flex items-center gap-1 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Sebelumnya</span>
                    </button>

                    <button
                      disabled={currentPageIndex === pages.length - 1}
                      onClick={() => setCurrentPageIndex(prev => Math.min(prev + 1, pages.length - 1))}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-amber-100 disabled:opacity-30 text-brand-navy font-bold text-xs flex items-center gap-1 transition-all"
                    >
                      <span>Berikutnya</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {(activeModuleModal.fileUrl || activeModuleModal.fileurl) && (
                      <a
                        href={activeModuleModal.fileUrl || activeModuleModal.fileurl}
                        target="_blank"
                        rel="noreferrer"
                        download
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 hover:from-amber-600 hover:to-brand-gold text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Unduh PDF Lengkap</span>
                      </a>
                    )}

                    <button
                      onClick={() => { setActiveModuleModal(null); setIsFullscreen(false); }}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
                    >
                      Tutup
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        );
      })()}

    </section>
  );
}
