'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Download, FileText, Layers, ExternalLink, ArrowRight } from 'lucide-react';

export default function ModulSection({ modulesList = [] }) {
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

  const getModulePages = (modul) => {
    if (!modul) return [];
    if (Array.isArray(modul.images) && modul.images.length > 0) return modul.images;
    if (typeof modul.images === 'string' && modul.images.startsWith('[')) {
      try { return JSON.parse(modul.images); } catch (e) {}
    }
    if (modul.coverImage || modul.coverimage) return [modul.coverImage || modul.coverimage];
    return [PLACEHOLDER_IMG];
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
        {modulesList.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 max-w-md mx-auto">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm font-semibold">Belum ada modul edukasi yang diterbitkan.</p>
          </div>
        ) : (
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
              const filePdfUrl = modul.fileUrl || modul.fileurl;

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
                        <span>{modul.pages || `${pages.length} Halaman`}</span>
                      </span>
                    </div>

                    {/* Modul Preview Thumbnail */}
                    <Link
                      href={`/modul/${modul.id}`}
                      className="block relative w-full h-60 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer group/img"
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
                          <span>Buka Halaman Modul</span>
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>

                    {/* Modul Title */}
                    <Link href={`/modul/${modul.id}`}>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy group-hover:text-brand-gold transition-colors leading-snug">
                        {modul.title}
                      </h3>
                    </Link>

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
                    <Link
                      href={`/modul/${modul.id}`}
                      className="btn-shimmer py-3 px-4 rounded-2xl bg-brand-navy hover:bg-brand-navyHover text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 text-center"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Buka Modul</span>
                    </Link>

                    {filePdfUrl ? (
                      <a
                        href={filePdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        download
                        className="py-3 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-brand-gold font-bold text-xs sm:text-sm border border-amber-200 hover:border-amber-300 flex items-center justify-center gap-2 transition-all active:scale-95 text-center"
                      >
                        <Download className="w-4 h-4" />
                        <span>Unduh PDF</span>
                      </a>
                    ) : (
                      <Link
                        href={`/modul/${modul.id}`}
                        className="py-3 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-brand-gold font-bold text-xs sm:text-sm border border-amber-200 hover:border-amber-300 flex items-center justify-center gap-2 transition-all active:scale-95 text-center"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Lihat Detail</span>
                      </Link>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

    </section>
  );
}
