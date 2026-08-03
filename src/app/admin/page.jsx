'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Plus, Trash2, Save, ArrowLeft, Image as ImageIcon, BookOpen, CheckCircle, Database } from 'lucide-react';
import { INITIAL_DATA } from '@/data/initialData';
import { supabase, isSupabaseConfigured, uploadImage } from '@/lib/supabaseClient';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('proker');
  const [isUploading, setIsUploading] = useState(false);

  const [prokerList, setProkerList] = useState(INITIAL_DATA.prokerList);
  const [galleryList, setGalleryList] = useState(INITIAL_DATA.galleryList);
  const [articlesList, setArticlesList] = useState(INITIAL_DATA.articlesList);

  // Form State Proker Baru
  const [newProker, setNewProker] = useState({
    title: '',
    category: 'Ekonomi & UMKM',
    status: 'Selesai',
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    description: '',
    objective: '',
    target: '',
    impact: '',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80'
  });

  // Form State Gallery Baru
  const [newGallery, setNewGallery] = useState({
    title: '',
    prokerCategory: 'Lingkungan',
    caption: '',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'
  });

  // Load live data if Supabase is connected
  useEffect(() => {
    async function loadSupabaseData() {
      if (!isSupabaseConfigured || !supabase) return;
      try {
        const { data: prokerData } = await supabase.from('proker').select('*').order('created_at', { ascending: false });
        if (prokerData && prokerData.length > 0) setProkerList(prokerData);

        const { data: galleryData } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
        if (galleryData && galleryData.length > 0) setGalleryList(galleryData);

        const { data: articlesData } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
        if (articlesData && articlesData.length > 0) setArticlesList(articlesData);
      } catch (err) {
        console.warn("Menggunakan data lokal:", err);
      }
    }
    loadSupabaseData();
  }, []);

  // Image Upload Handler
  const handleImageFileChange = async (e, setTargetState) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      if (url) {
        setTargetState(prev => ({ ...prev, image: url, coverImage: url }));
      }
    } catch (err) {
      console.error("Gagal mengunggah foto:", err);
    } finally {
      setIsUploading(false);
    }
  };

  // Add Proker
  const handleAddProker = async (e) => {
    e.preventDefault();
    if (!newProker.title) return;

    const item = { ...newProker, id: `proker-${Date.now()}` };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('proker').insert([item]);
      } catch (err) {
        console.warn("Supabase save fallback:", err);
      }
    }

    setProkerList([item, ...prokerList]);
    setNewProker({
      title: '',
      category: 'Ekonomi & UMKM',
      status: 'Selesai',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      description: '',
      objective: '',
      target: '',
      impact: '',
      image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80'
    });
  };

  // Delete Proker
  const handleDeleteProker = (id) => {
    setProkerList(prokerList.filter(p => p.id !== id));
  };

  // Add Gallery Photo
  const handleAddGallery = async (e) => {
    e.preventDefault();
    if (!newGallery.title) return;

    const item = { ...newGallery, id: `gal-${Date.now()}` };
    setGalleryList([item, ...galleryList]);
    setNewGallery({
      title: '',
      prokerCategory: 'Lingkungan',
      caption: '',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'
    });
  };

  // Delete Gallery
  const handleDeleteGallery = (id) => {
    setGalleryList(galleryList.filter(g => g.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-brand-navy">
      
      {/* Top Admin Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-navy transition-colors" title="Kembali ke Website Utama">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <img src="/logo/KKNteks.png" alt="Logo KKN" className="h-9 w-auto object-contain" onError={(e) => { e.target.src = '/logo/logoonlyKKN.png'; }} />
              <div className="border-l border-slate-200 pl-3 hidden sm:block">
                <h1 className="text-base font-bold text-brand-navy flex items-center gap-2">
                  Panel Kelola Konten KKN
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-brand-gold border border-amber-300">
                    {isSupabaseConfigured ? "Supabase Live" : "Local Mode"}
                  </span>
                </h1>
                <p className="text-xs text-slate-500 font-medium">Halaman Tersembunyi (/admin)</p>
              </div>
            </div>
          </div>

          <Link href="/" className="px-4 py-2 rounded-full bg-brand-navy hover:bg-brand-navyHover text-white text-xs sm:text-sm font-bold shadow-md transition-all">
            Lihat Website Utama &rarr;
          </Link>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-white rounded-2xl p-2 border shadow-sm gap-2">
          <button
            onClick={() => setActiveTab('proker')}
            className={`flex-1 py-3 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'proker'
                ? 'bg-gradient-to-r from-brand-gold to-amber-600 text-white shadow-md'
                : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Kelola Program Kerja ({prokerList.length})</span>
          </button>
          
          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex-1 py-3 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'gallery'
                ? 'bg-gradient-to-r from-brand-gold to-amber-600 text-white shadow-md'
                : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Kelola Galeri Foto ({galleryList.length})</span>
          </button>
        </div>

        {/* TAB 1: PROKER */}
        {activeTab === 'proker' && (
          <div className="space-y-8">
            
            {/* Form Tambah Proker Baru */}
            <form onSubmit={handleAddProker} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-brand-gold uppercase tracking-wider flex items-center gap-2">
                <Plus className="w-5 h-5" /> Tambah Program Kerja Baru
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Judul Program Kerja *</label>
                  <input
                    type="text"
                    required
                    placeholder="contoh: Digitalisasi UMKM Pangan Lokal"
                    value={newProker.title}
                    onChange={(e) => setNewProker({ ...newProker, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Kategori Proker</label>
                  <select
                    value={newProker.category}
                    onChange={(e) => setNewProker({ ...newProker, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none shadow-sm"
                  >
                    <option value="Ekonomi & UMKM">Ekonomi & UMKM</option>
                    <option value="Lingkungan">Lingkungan</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Kesehatan">Kesehatan</option>
                    <option value="Teknologi">Teknologi</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Status Proker</label>
                  <select
                    value={newProker.status}
                    onChange={(e) => setNewProker({ ...newProker, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none shadow-sm"
                  >
                    <option value="Selesai">Selesai</option>
                    <option value="Berjalan">Berjalan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Unggah Foto Dokumentasi</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageFileChange(e, setNewProker)}
                    className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:bg-amber-100 file:text-brand-gold font-bold hover:file:bg-amber-200 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Tujuan & Deskripsi Ringkas Proker</label>
                <textarea
                  rows={3}
                  placeholder="Tuliskan penjelasan program kerja..."
                  value={newProker.description}
                  onChange={(e) => setNewProker({ ...newProker, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none shadow-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-brand-gold to-amber-600 hover:from-amber-600 hover:to-brand-gold text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>{isUploading ? 'Mengunggah Foto...' : 'Simpan Proker Baru'}</span>
              </button>
            </form>

            {/* List Proker Terdaftar */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Daftar Proker Tersimpan ({prokerList.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prokerList.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.title} className="w-14 h-14 rounded-xl object-cover border border-slate-200" />
                      <div>
                        <h4 className="text-sm font-bold text-brand-navy line-clamp-1">{item.title}</h4>
                        <span className="text-xs font-semibold text-brand-gold">{item.category} • {item.status}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteProker(item.id)}
                      className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors"
                      title="Hapus Proker"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <form onSubmit={handleAddGallery} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-brand-gold uppercase tracking-wider flex items-center gap-2">
                <Plus className="w-5 h-5" /> Tambah Foto Dokumentasi Baru
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Judul Kegiatan Foto *</label>
                  <input
                    type="text"
                    required
                    placeholder="contoh: Gotong Royong Warga Desa"
                    value={newGallery.title}
                    onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Pilih File Foto</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageFileChange(e, setNewGallery)}
                    className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:bg-amber-100 file:text-brand-gold font-bold hover:file:bg-amber-200 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Keterangan / Caption Foto</label>
                <input
                  type="text"
                  placeholder="Tuliskan cerita singkat..."
                  value={newGallery.caption}
                  onChange={(e) => setNewGallery({ ...newGallery, caption: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-brand-gold to-amber-600 hover:from-amber-600 hover:to-brand-gold text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>{isUploading ? 'Uploading...' : 'Tambah ke Galeri'}</span>
              </button>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {galleryList.map((item) => (
                <div key={item.id} className="relative group rounded-2xl overflow-hidden border border-slate-200 h-44 shadow-sm">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-brand-navy/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                    <div>
                      <p className="text-xs font-bold text-white line-clamp-2 mb-2">{item.title}</p>
                      <button
                        onClick={() => handleDeleteGallery(item.id)}
                        className="p-2 rounded-xl bg-red-600 text-white font-bold text-xs"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
