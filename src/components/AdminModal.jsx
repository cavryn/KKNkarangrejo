'use client';
import { useState } from 'react';
import { X, Plus, Trash2, Save, Shield } from 'lucide-react';
import { supabase, isSupabaseConfigured, uploadImage } from '@/lib/supabaseClient';

export default function AdminModal({ isOpen, onClose, prokerList, setProkerList, galleryList, setGalleryList, articlesList, setArticlesList }) {
  const [activeTab, setActiveTab] = useState('proker');
  const [isUploading, setIsUploading] = useState(false);

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

  if (!isOpen) return null;

  // Image File Upload Handler
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
        console.warn("Simpan ke Supabase error, fallback local:", err);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="p-6 bg-white border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-brand-gold border border-amber-200">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-navy flex items-center gap-2">
                Panel Admin Kelola Konten
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-brand-gold border border-amber-300">
                  {isSupabaseConfigured ? "Supabase Cloud Sync" : "Local State"}
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">Tambah, ubah, atau hapus data Proker, Foto Galeri & Modul Artikel KKN</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Admin Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 pt-3">
          <button
            onClick={() => setActiveTab('proker')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl border-b-2 transition-all ${
              activeTab === 'proker'
                ? 'border-brand-gold text-brand-gold bg-white'
                : 'border-transparent text-slate-600 hover:text-brand-navy'
            }`}
          >
            Kelola Program Kerja ({prokerList.length})
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl border-b-2 transition-all ${
              activeTab === 'gallery'
                ? 'border-brand-gold text-brand-gold bg-white'
                : 'border-transparent text-slate-600 hover:text-brand-navy'
            }`}
          >
            Kelola Galeri Foto ({galleryList.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          
          {/* TAB 1: PROKER */}
          {activeTab === 'proker' && (
            <div className="space-y-8">
              
              {/* Form Tambah Proker */}
              <form onSubmit={handleAddProker} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-sm font-bold text-brand-gold uppercase tracking-wider flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> Tambah Proker Baru
                </h4>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1">Judul Program Kerja *</label>
                    <input
                      type="text"
                      required
                      placeholder="contoh: Digitalisasi UMKM Pangan Lokal"
                      value={newProker.title}
                      onChange={(e) => setNewProker({ ...newProker, title: e.target.value })}
                      className="w-full bg-white border border-slate-300 text-brand-navy text-xs rounded-xl px-3 py-2 focus:border-brand-gold outline-none shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1">Kategori Proker</label>
                    <select
                      value={newProker.category}
                      onChange={(e) => setNewProker({ ...newProker, category: e.target.value })}
                      className="w-full bg-white border border-slate-300 text-brand-navy text-xs rounded-xl px-3 py-2 focus:border-brand-gold outline-none shadow-sm"
                    >
                      <option value="Proker Utama">Proker Utama</option>
                      <option value="Proker Tambahan">Proker Tambahan</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1">Status Proker</label>
                    <select
                      value={newProker.status}
                      onChange={(e) => setNewProker({ ...newProker, status: e.target.value })}
                      className="w-full bg-white border border-slate-300 text-brand-navy text-xs rounded-xl px-3 py-2 focus:border-brand-gold outline-none shadow-sm"
                    >
                      <option value="Selesai">Selesai</option>
                      <option value="Berjalan">Berjalan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1">Unggah Foto</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileChange(e, setNewProker)}
                      className="w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-amber-100 file:text-brand-gold font-semibold hover:file:bg-amber-200 cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Tujuan & Ringkasan Proker</label>
                  <textarea
                    rows={2}
                    placeholder="Tuliskan tujuan utama..."
                    value={newProker.description}
                    onChange={(e) => setNewProker({ ...newProker, description: e.target.value })}
                    className="w-full bg-white border border-slate-300 text-brand-navy text-xs rounded-xl px-3 py-2 focus:border-brand-gold outline-none shadow-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 hover:from-amber-600 hover:to-brand-gold text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>{isUploading ? 'Mengunggah Foto...' : 'Simpan Proker Baru'}</span>
                </button>
              </form>

              {/* List Proker */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Daftar Proker Tersimpan</h4>
                <div className="space-y-2">
                  {prokerList.map((item) => (
                    <div key={item.id} className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                        <div>
                          <h5 className="text-sm font-bold text-brand-navy">{item.title}</h5>
                          <span className="text-[11px] font-semibold text-brand-gold">{item.category} • {item.status}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteProker(item.id)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
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
              <form onSubmit={handleAddGallery} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-sm font-bold text-brand-gold uppercase tracking-wider flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> Tambah Foto Dokumentasi Baru
                </h4>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1">Judul Kegiatan Foto *</label>
                    <input
                      type="text"
                      required
                      placeholder="contoh: Penanaman Bibit Pohon Desa"
                      value={newGallery.title}
                      onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                      className="w-full bg-white border border-slate-300 text-brand-navy text-xs rounded-xl px-3 py-2 focus:border-brand-gold outline-none shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1">Pilih File Foto</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileChange(e, setNewGallery)}
                      className="w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-amber-100 file:text-brand-gold font-semibold hover:file:bg-amber-200 cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Keterangan / Caption Foto</label>
                  <input
                    type="text"
                    placeholder="Tuliskan cerita singkat tentang foto..."
                    value={newGallery.caption}
                    onChange={(e) => setNewGallery({ ...newGallery, caption: e.target.value })}
                    className="w-full bg-white border border-slate-300 text-brand-navy text-xs rounded-xl px-3 py-2 focus:border-brand-gold outline-none shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 hover:from-amber-600 hover:to-brand-gold text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>{isUploading ? 'Uploading...' : 'Tambah ke Galeri'}</span>
                </button>
              </form>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {galleryList.map((item) => (
                  <div key={item.id} className="relative group rounded-xl overflow-hidden border border-slate-200 h-36 shadow-sm">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-brand-navy/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                      <div>
                        <p className="text-xs font-bold text-white line-clamp-1">{item.title}</p>
                        <button
                          onClick={() => handleDeleteGallery(item.id)}
                          className="mt-2 p-1.5 rounded-lg bg-red-600 text-white"
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

        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 text-xs font-bold"
          >
            Tutup Panel Admin
          </button>
        </div>

      </div>
    </div>
  );
}
