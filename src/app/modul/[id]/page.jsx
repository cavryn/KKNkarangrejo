'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Download, FileText, BookOpen, ExternalLink, Calendar, User, Layers } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { INITIAL_DATA } from '@/data/initialData';

export default function ModulDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [modul, setModul] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const modulId = params?.id;

  useEffect(() => {
    async function loadModul() {
      setIsLoading(true);

      // 1. Cek dari localStorage (data terbaru dari admin)
      try {
        const cached = localStorage.getItem('kkn_modules_list');
        if (cached) {
          const list = JSON.parse(cached);
          const found = list.find(m => String(m.id) === String(modulId));
          if (found) {
            setModul(found);
            setIsLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn("Gagal membaca cache localStorage:", e);
      }

      // 2. Cek dari Supabase jika terhubung
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase
            .from('modules')
            .select('*')
            .eq('id', modulId)
            .single();

          if (data && !error) {
            setModul(data);
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.warn("Gagal fetch Supabase:", err);
        }
      }

      // 3. Fallback ke INITIAL_DATA
      const fallback = (INITIAL_DATA.modulesList || []).find(m => String(m.id) === String(modulId));
      if (fallback) {
        setModul(fallback);
      }
      setIsLoading(false);
    }

    if (modulId) {
      loadModul();
    }
  }, [modulId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 border-4 border-amber-400/30 border-t-brand-gold rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-300">Memuat Modul Edukasi...</p>
      </div>
    );
  }

  if (!modul) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center space-y-4">
        <FileText className="w-16 h-16 text-slate-400 mx-auto" />
        <h1 className="text-2xl font-bold text-brand-navy">Modul Tidak Ditemukan</h1>
        <p className="text-slate-500 text-sm max-w-md">
          Modul yang Anda cari mungkin telah dipindahkan atau belum diterbitkan.
        </p>
        <Link
          href="/#modul"
          className="px-6 py-3 rounded-full bg-brand-navy hover:bg-brand-gold text-white font-bold text-sm transition-colors shadow-md"
        >
          ← Kembali ke Halaman Utama
        </Link>
      </div>
    );
  }

  const filePdfUrl = modul.fileUrl || modul.fileurl;
  
  // Format pages if images array is provided
  let pageImages = [];
  if (Array.isArray(modul.images) && modul.images.length > 0) {
    pageImages = modul.images.filter(img => typeof img === 'string' && img.trim().length > 0);
  } else if (typeof modul.images === 'string' && modul.images.startsWith('[')) {
    try {
      const parsed = JSON.parse(modul.images);
      if (Array.isArray(parsed)) pageImages = parsed.filter(img => typeof img === 'string' && img.trim().length > 0);
    } catch (e) {}
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-30 bg-brand-navy text-white px-4 sm:px-8 py-3.5 shadow-md flex items-center justify-between gap-4 border-b border-white/10">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/#modul"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-1.5 text-xs font-bold flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali</span>
          </Link>

          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-extrabold text-white truncate">
              {modul.title}
            </h1>
            <p className="text-[11px] text-slate-300 truncate hidden xs:block sm:block">
              {modul.author ? `Penyusun: ${modul.author} • ` : ''} {modul.date || 'KKN Kelompok 3'}
            </p>
          </div>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {filePdfUrl && (
            <>
              <a
                href={filePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                title="Buka di Tab Baru"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Buka di Tab Baru</span>
              </a>

              <a
                href={filePdfUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 hover:from-amber-600 hover:to-brand-gold text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh PDF</span>
              </a>
            </>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Module Info Banner */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 font-semibold">
            {modul.category && (
              <span className="px-3 py-1 rounded-full bg-amber-50 text-brand-gold border border-amber-200 font-bold">
                {modul.category}
              </span>
            )}
            {modul.pages && (
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-brand-gold" />
                <span>{modul.pages}</span>
              </span>
            )}
            {modul.date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                <span>{modul.date}</span>
              </span>
            )}
            {modul.author && (
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-brand-gold" />
                <span>{modul.author}</span>
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy leading-tight">
            {modul.title}
          </h2>

          {modul.summary && (
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {modul.summary}
            </p>
          )}
        </div>

        {/* PDF Embedded Viewer (Jika ada berkas PDF) */}
        {filePdfUrl && (
          <div className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg flex flex-col">
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand-gold" />
                Dokumen Modul PDF
              </span>
              <a
                href={filePdfUrl}
                target="_blank"
                rel="noreferrer"
                className="text-brand-gold hover:underline flex items-center gap-1"
              >
                Buka Layar Penuh <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="w-full h-[75vh] sm:h-[85vh] bg-slate-900">
              <iframe
                src={`${filePdfUrl}#toolbar=1&navpanes=0`}
                className="w-full h-full border-0"
                title={modul.title}
              />
            </div>
          </div>
        )}

        {/* Page Images (Jika ada gambar halaman yang diunggah) */}
        {pageImages.length > 0 && (
          <div className="space-y-6">
            <div className="text-center py-2">
              <h3 className="text-lg font-bold text-brand-navy">Lembar Halaman Modul</h3>
              <p className="text-xs text-slate-500">Scroll ke bawah untuk membaca seluruh lembar</p>
            </div>

            {pageImages.map((imgUrl, idx) => (
              <div
                key={idx}
                className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md flex flex-col"
              >
                <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 font-bold">
                  <span>Halaman {idx + 1}</span>
                  <span>{idx + 1} dari {pageImages.length}</span>
                </div>
                <div className="p-2 sm:p-4 bg-slate-100 flex items-center justify-center">
                  <img
                    src={imgUrl}
                    alt={`Halaman ${idx + 1}`}
                    className="w-full h-auto object-contain rounded-xl shadow-sm max-h-[85vh]"
                    loading={idx <= 1 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Text Content (Jika ada isi materi teks) */}
        {modul.content && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-brand-navy border-b border-slate-100 pb-2">
              Materi &amp; Isi Lengkap Modul
            </h3>
            <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {modul.content}
            </div>
          </div>
        )}

        {/* Bottom Back Button */}
        <div className="py-6 flex items-center justify-center gap-4">
          <Link
            href="/#modul"
            className="px-6 py-3 rounded-full bg-brand-navy hover:bg-brand-navyHover text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          
          {filePdfUrl && (
            <a
              href={filePdfUrl}
              download
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-brand-gold to-amber-600 hover:from-amber-600 hover:to-brand-gold text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Berkas PDF</span>
            </a>
          )}
        </div>

      </main>

    </div>
  );
}
