'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { BookOpen, Download, X, FileText, Layers, ZoomIn, ZoomOut, ArrowUp } from 'lucide-react';

export default function ModulSection({ modulesList = [] }) {
  const [activeModuleModal, setActiveModuleModal] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100); // percentage: 100%, 125%, 150%
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef(null);
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

  // Handle ESC key to close modal
  useEffect(() => {
    if (!activeModuleModal) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModuleModal(null);
        setZoomLevel(100);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModuleModal]);

  // Handle scroll in modal to show/hide "Scroll to Top" button
  const handleModalScroll = () => {
    if (!scrollContainerRef.current) return;
    if (scrollContainerRef.current.scrollTop > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
    setZoomLevel(100);
    setShowScrollTop(false);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 175));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 75));
  };

  return (
    <section id="modul" ref={sectionRef} className="py-20 bg-white border-t border-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="reveal text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Modul &amp; <span className="text-gradient-gold">Panduan Edukasi</span>
          </h2>
          <p className="text-base text-slate-500">
            Kumpulan panduan praktis, modul pelatihan proker, dan SOP terstruktur yang dapat dipelajari langsung di halaman web.
          </p>
        </div>

        {/* Modules Cards Grid */}
        <div className={`grid gap-8 ${
          modulesList.length === 1 
            ? 'max-w-xl mx-auto grid-cols-1' 
            : modulesList.length === 2 
              ? 'max-w-5xl mx-auto grid-cols-1 md:grid-cols-2' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
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
                    {modul.category && (
                      <span className="px-3.5 py-1 text-xs font-extrabold rounded-full bg-amber-100 text-brand-gold border border-amber-200">
                        {modul.category}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 ml-auto">
                      <Layers className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{pages.length} Halaman</span>
                    </span>
                  </div>

                  {/* Modul Preview Thumbnail */}
                  <div 
                    onClick={() => handleOpenModal(modul)}
                    className="relative w-full h-60 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer group/img"
                  >
                    <Image
                      src={cover}
                      alt={modul.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent flex items-end p-4">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-sm text-brand-navy text-xs sm:text-sm font-bold shadow-lg group-hover/img:bg-brand-gold group-hover/img:text-white transition-colors">
                        <BookOpen className="w-4 h-4 text-brand-gold group-hover/img:text-white" />
                        <span>Buka &amp; Baca Modul ({pages.length} Halaman)</span>
                      </span>
                    </div>
                  </div>

                  {/* Modul Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy group-hover:text-brand-gold transition-colors leading-snug">
                    {modul.title}
                  </h3>

                  {/* Summary */}
                  {modul.summary && (
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {modul.summary}
                    </p>
                  )}

                  {/* Author */}
                  {modul.author && (
                    <div className="flex items-center gap-2.5 pt-2">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-brand-gold flex items-center justify-center font-bold text-xs">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-semibold leading-tight">Disusun Oleh</p>
                        <p className="text-xs font-bold text-brand-navy leading-tight">{modul.author}</p>
                      </div>
                    </div>
                  )}

                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-slate-200/80 mt-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleOpenModal(modul)}
                    className="btn-shimmer py-3 px-4 rounded-2xl bg-brand-navy hover:bg-brand-navyHover text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Baca Lengkap</span>
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
                      <span>Buka Modul</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Large Continuous Vertical Scroll Document Reader Modal */}
      {activeModuleModal && (() => {
        const pages = getModulePages(activeModuleModal);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md overflow-hidden">
            <div className="relative w-full h-full max-w-6xl mx-auto flex flex-col bg-slate-900 shadow-2xl overflow-hidden">
              
              {/* Sticky Top Bar */}
              <div className="px-4 sm:px-6 py-3.5 bg-brand-navy text-white flex items-center justify-between gap-4 border-b border-white/10 flex-shrink-0 z-20 shadow-md">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-amber-400 text-brand-navy flex-shrink-0">
                      MODUL EDUKASI
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white truncate">
                      {activeModuleModal.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-300 truncate mt-0.5">
                    {activeModuleModal.author ? `Oleh: ${activeModuleModal.author} • ` : ''} Total {pages.length} Halaman (Scroll ke bawah untuk membaca)
                  </p>
                </div>

                {/* Reader Controls */}
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  
                  {/* Zoom Controls */}
                  <div className="hidden sm:flex items-center gap-1 bg-white/10 rounded-xl p-1 border border-white/10">
                    <button
                      onClick={handleZoomOut}
                      disabled={zoomLevel <= 75}
                      className="p-1.5 rounded-lg hover:bg-white/20 disabled:opacity-30 text-white transition-all"
                      title="Perkecil Tampilan"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-[11px] font-mono font-bold px-1.5 text-amber-300 select-none">
                      {zoomLevel}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      disabled={zoomLevel >= 175}
                      className="p-1.5 rounded-lg hover:bg-white/20 disabled:opacity-30 text-white transition-all"
                      title="Perbesar Tampilan"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Download PDF button if available */}
                  {(activeModuleModal.fileUrl || activeModuleModal.fileurl) && (
                    <a
                      href={activeModuleModal.fileUrl || activeModuleModal.fileurl}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="px-3 py-2 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 hover:from-amber-600 hover:to-brand-gold text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Unduh PDF</span>
                    </a>
                  )}

                  {/* Close button */}
                  <button
                    onClick={() => { setActiveModuleModal(null); setZoomLevel(100); }}
                    className="p-2 rounded-xl bg-white/10 hover:bg-red-500 text-white transition-all flex items-center gap-1 font-bold text-xs"
                    title="Tutup (Esc)"
                  >
                    <X className="w-5 h-5" />
                    <span className="hidden sm:inline">Tutup</span>
                  </button>
                </div>
              </div>

              {/* Continuous Vertical Scroll Pages Container */}
              <div 
                ref={scrollContainerRef}
                onScroll={handleModalScroll}
                className="flex-1 overflow-y-auto overflow-x-auto p-3 sm:p-8 bg-slate-950 flex flex-col items-center space-y-6 sm:space-y-10 scrollbar-thin"
              >
                {pages.map((pageUrl, idx) => (
                  <div 
                    key={idx}
                    id={`module-page-${idx + 1}`}
                    style={{ width: `${zoomLevel}%`, maxWidth: zoomLevel === 100 ? '900px' : `${(900 * zoomLevel) / 100}px` }}
                    className="relative rounded-2xl overflow-hidden bg-white shadow-2xl border border-slate-700 transition-all duration-200 flex flex-col"
                  >
                    {/* Page Header Bar */}
                    <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500 font-semibold select-none">
                      <span className="flex items-center gap-1.5 text-brand-navy font-bold">
                        <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                        Halaman {idx + 1}
                      </span>
                      <span>{idx + 1} dari {pages.length}</span>
                    </div>

                    {/* Full Page High-Resolution Image */}
                    <div className="w-full bg-white flex items-center justify-center p-2 sm:p-4">
                      <img
                        src={pageUrl}
                        alt={`${activeModuleModal.title} - Halaman ${idx + 1}`}
                        className="w-full h-auto object-contain rounded-lg select-none"
                        loading={idx <= 2 ? "eager" : "lazy"}
                      />
                    </div>
                  </div>
                ))}

                {/* Bottom End indicator */}
                <div className="py-6 text-center text-slate-500 text-xs font-semibold select-none">
                  — Akhir dari Modul ({pages.length} Halaman Selesai) —
                </div>
              </div>

              {/* Floating Scroll to Top Button */}
              {showScrollTop && (
                <button
                  onClick={scrollToTop}
                  className="absolute bottom-6 right-6 p-3 rounded-full bg-brand-gold hover:bg-amber-500 text-white shadow-2xl transition-all hover:scale-110 active:scale-95 z-30 flex items-center gap-1.5 font-bold text-xs"
                >
                  <ArrowUp className="w-4 h-4" />
                  <span className="hidden sm:inline">Ke Atas</span>
                </button>
              )}

            </div>
          </div>
        );
      })()}

    </section>
  );
}
