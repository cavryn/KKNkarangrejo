'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Plus, Trash2, Save, ArrowLeft, Image as ImageIcon, CheckCircle, Lock, User, LogOut, Eye, EyeOff, Sparkles, Pencil, X, MessageSquare, Mail } from 'lucide-react';
import { INITIAL_DATA } from '@/data/initialData';
import { supabase, isSupabaseConfigured, uploadImage } from '@/lib/supabaseClient';

export default function AdminPage() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Admin Dashboard State
  const [activeTab, setActiveTab] = useState('proker');
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Toast notification state
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: string }

  const [prokerList, setProkerList] = useState([]);
  const [galleryList, setGalleryList] = useState([]);
  const [articlesList, setArticlesList] = useState([]);
  const [contactsList, setContactsList] = useState([]);

  // Edit Mode State
  const [editingProkerId, setEditingProkerId] = useState(null);
  const [editingGalleryId, setEditingGalleryId] = useState(null);

  // Form State Proker
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

  // Form State Gallery
  const [newGallery, setNewGallery] = useState({
    title: '',
    prokerCategory: 'Lingkungan',
    caption: '',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'
  });

  // Show toast helper
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  // Centralized data fetcher — used on mount and after every CRUD operation
  const fetchAllData = async () => {
    if (!isSupabaseConfigured || !supabase) {
      // Fallback ke data lokal jika Supabase belum dikonfigurasi
      setProkerList(INITIAL_DATA.prokerList);
      setGalleryList(INITIAL_DATA.galleryList);
      setArticlesList(INITIAL_DATA.articlesList);
      setIsLoadingData(false);
      return;
    }
    try {
      const [prokerRes, galleryRes, articlesRes, contactsRes] = await Promise.all([
        supabase.from('proker').select('*').order('created_at', { ascending: false }),
        supabase.from('gallery').select('*').order('created_at', { ascending: false }),
        supabase.from('articles').select('*').order('created_at', { ascending: false }),
        supabase.from('contacts').select('*').order('created_at', { ascending: false })
      ]);

      if (prokerRes.error) throw prokerRes.error;
      if (galleryRes.error) throw galleryRes.error;
      if (articlesRes.error) throw articlesRes.error;

      setProkerList(prokerRes.data || []);
      setGalleryList(galleryRes.data || []);
      setArticlesList(articlesRes.data || []);
      setContactsList(contactsRes?.data || []);
    } catch (err) {
      console.error('Gagal mengambil data dari Supabase:', err);
      showToast('error', 'Gagal mengambil data dari Supabase: ' + (err.message || err));
      // Fallback ke data lokal
      setProkerList(INITIAL_DATA.prokerList);
      setGalleryList(INITIAL_DATA.galleryList);
      setArticlesList(INITIAL_DATA.articlesList);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Check login session on client mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('kkn_admin_auth');
    if (savedAuth === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Load live data when logged in
  useEffect(() => {
    if (!isLoggedIn) return;
    setIsLoadingData(true);
    fetchAllData();
  }, [isLoggedIn]);

  // Login Handler with micro-animation delay
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);

    setTimeout(() => {
      if (usernameInput === 'kknkelompok3uisi' && passwordInput === 'kelompok3istimewa') {
        sessionStorage.setItem('kkn_admin_auth', 'true');
        setIsLoggedIn(true);
        setUsernameInput('');
        setPasswordInput('');
      } else {
        setLoginError('Username atau Password yang Anda masukkan salah!');
      }
      setIsSubmitting(false);
    }, 400);
  };

  // Logout Handler
  const handleLogout = () => {
    sessionStorage.removeItem('kkn_admin_auth');
    setIsLoggedIn(false);
  };

  // Placeholder image for broken images
  const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?auto=format&fit=crop&w=800&q=80';

  // Image Upload Handler
  const handleImageFileChange = async (e, setTargetState) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      if (url) {
        setTargetState(prev => ({ ...prev, image: url, coverImage: url }));
        showToast('success', 'Foto berhasil diunggah!');
      } else {
        showToast('error', 'Gagal mendapatkan URL foto yang diunggah.');
      }
    } catch (err) {
      console.error("Gagal mengunggah foto:", err);
      showToast('error', 'Gagal mengunggah foto: ' + (err.message || err));
    } finally {
      setIsUploading(false);
    }
  };

  // Reset Proker Form
  const resetProkerForm = () => {
    setEditingProkerId(null);
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

  // Add / Edit Proker Handler
  const handleSaveProker = async (e) => {
    e.preventDefault();
    if (!newProker.title) return;

    if (editingProkerId) {
      // UPDATE Mode — JANGAN kirim `id` di body update!
      const { title, category, status, date, description, objective, target, impact, image } = newProker;
      const updatePayload = { title, category, status, date, description, objective, target, impact, image };

      if (isSupabaseConfigured && supabase) {
        try {
          const { error } = await supabase.from('proker').update(updatePayload).eq('id', editingProkerId);
          if (error) throw error;
          showToast('success', `Proker "${title}" berhasil diperbarui!`);
        } catch (err) {
          showToast('error', 'Gagal update proker: ' + (err.message || err));
          return;
        }
      }

      resetProkerForm();
      await fetchAllData();
    } else {
      // INSERT Mode
      const item = { ...newProker, id: `proker-${Date.now()}` };

      if (isSupabaseConfigured && supabase) {
        try {
          const { error } = await supabase.from('proker').insert([item]);
          if (error) throw error;
          showToast('success', `Proker "${item.title}" berhasil ditambahkan!`);
        } catch (err) {
          showToast('error', 'Gagal menambah proker: ' + (err.message || err));
          return;
        }
      }

      resetProkerForm();
      await fetchAllData();
    }
  };

  // Start Editing Proker
  const handleStartEditProker = (item) => {
    setEditingProkerId(item.id);
    setNewProker({
      title: item.title || '',
      category: item.category || 'Ekonomi & UMKM',
      status: item.status || 'Selesai',
      date: item.date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      description: item.description || '',
      objective: item.objective || '',
      target: item.target || '',
      impact: item.impact || '',
      image: item.image || 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete Proker
  const handleDeleteProker = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus proker ini?')) return;
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('proker').delete().eq('id', id);
        if (error) throw error;
        showToast('success', 'Proker berhasil dihapus!');
      } catch (err) {
        showToast('error', 'Gagal menghapus proker: ' + (err.message || err));
        return;
      }
    }
    if (editingProkerId === id) resetProkerForm();
    await fetchAllData();
  };

  // Reset Gallery Form
  const resetGalleryForm = () => {
    setEditingGalleryId(null);
    setNewGallery({
      title: '',
      prokerCategory: 'Lingkungan',
      caption: '',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'
    });
  };

  // Add / Edit Gallery Photo Handler
  const handleSaveGallery = async (e) => {
    e.preventDefault();
    if (!newGallery.title) return;

    if (editingGalleryId) {
      // UPDATE Mode — kirim nama kolom lowercase sesuai Supabase
      const updatePayload = {
        title: newGallery.title,
        prokercategory: newGallery.prokerCategory,
        caption: newGallery.caption,
        image: newGallery.image
      };

      if (isSupabaseConfigured && supabase) {
        try {
          const { error } = await supabase.from('gallery').update(updatePayload).eq('id', editingGalleryId);
          if (error) throw error;
          showToast('success', `Foto "${newGallery.title}" berhasil diperbarui!`);
        } catch (err) {
          showToast('error', 'Gagal update galeri: ' + (err.message || err));
          return;
        }
      }

      resetGalleryForm();
      await fetchAllData();
    } else {
      // INSERT Mode
      const item = {
        id: `gal-${Date.now()}`,
        title: newGallery.title,
        prokercategory: newGallery.prokerCategory,
        caption: newGallery.caption,
        image: newGallery.image
      };

      if (isSupabaseConfigured && supabase) {
        try {
          const { error } = await supabase.from('gallery').insert([item]);
          if (error) throw error;
          showToast('success', `Foto "${item.title}" berhasil ditambahkan!`);
        } catch (err) {
          showToast('error', 'Gagal menambah foto: ' + (err.message || err));
          return;
        }
      }

      resetGalleryForm();
      await fetchAllData();
    }
  };

  // Start Editing Gallery
  const handleStartEditGallery = (item) => {
    setEditingGalleryId(item.id);
    setNewGallery({
      title: item.title || '',
      prokerCategory: item.prokercategory || item.prokerCategory || 'Lingkungan',
      caption: item.caption || '',
      image: item.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete Contact Message
  const handleDeleteContact = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pesan ini?')) return;
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('contacts').delete().eq('id', id);
        if (error) throw error;
        showToast('success', 'Pesan berhasil dihapus!');
      } catch (err) {
        showToast('error', 'Gagal menghapus pesan: ' + (err.message || err));
        return;
      }
    }
    setContactsList(contactsList.filter(c => c.id !== id));
    await fetchAllData();
  };

  // -------------------------------------------------------------
  // RENDER: LOGIN FORM
  // -------------------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-brand-gold/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-600/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20 space-y-6 animate-fade-in-up">
          
          <div className="text-center space-y-3">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-100 to-amber-50 border border-amber-300 flex items-center justify-center text-brand-gold shadow-inner transform transition-transform hover:scale-105 duration-300">
              <Shield className="w-8 h-8" />
            </div>
            <img 
              src="/logo/KKNteks.png" 
              alt="Logo KKN" 
              className="h-10 w-auto mx-auto object-contain transition-all hover:opacity-90" 
              onError={(e) => { e.target.src = '/logo/logoonlyKKN.png'; }} 
            />
            <h1 className="text-xl font-extrabold text-brand-navy tracking-tight">Login Panel Admin</h1>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Masukkan akun tim KKN Kelompok 3 Karangrejo untuk mengelola konten website
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-scale-in">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Username Admin</label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Masukkan username..."
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Password Admin</label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Masukkan password..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl pl-10 pr-10 py-3 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 hover:from-amber-600 hover:to-brand-gold text-white font-bold text-sm shadow-lg shadow-amber-500/25 transition-all transform active:scale-98 flex items-center justify-center gap-2 btn-shimmer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Dashboard Admin</span>
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center border-t border-slate-100">
            <Link 
              href="/" 
              className="text-xs font-semibold text-slate-500 hover:text-brand-navy inline-flex items-center gap-1.5 transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Kembali ke Website Utama</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: DASHBOARD ADMIN
  // -------------------------------------------------------------
  // Loading state saat pertama kali fetch data
  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-bold text-slate-600">Memuat data dari Supabase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-brand-navy animate-fade-in-up">

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[100] px-5 py-3 rounded-2xl shadow-xl border text-sm font-bold flex items-center gap-2 animate-slide-down ${
          toast.type === 'success'
            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
            : 'bg-red-50 border-red-300 text-red-800'
        }`}>
          {toast.type === 'success' ? '✅' : '❌'} {toast.message}
        </div>
      )}
      
      {/* Top Admin Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <img src="/logo/KKNteks.png" alt="Logo KKN" className="h-9 w-auto object-contain" onError={(e) => { e.target.src = '/logo/logoonlyKKN.png'; }} />
              <div className="border-l border-slate-200 pl-3 hidden sm:block">
                <h1 className="text-base font-bold text-brand-navy flex items-center gap-2">
                  Panel Kelola Konten KKN
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-brand-gold border border-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 animate-spin" />
                    {isSupabaseConfigured ? "Supabase Live" : "Local Mode"}
                  </span>
                </h1>
                <p className="text-xs text-slate-500 font-medium">Pengelola: kknkelompok3uisi</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" className="px-4 py-2 rounded-full bg-brand-navy hover:bg-brand-navyHover text-white text-xs sm:text-sm font-bold shadow-md transition-all hidden sm:inline-flex">
              Lihat Website Utama &rarr;
            </Link>
            
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all active:scale-95"
              title="Keluar dari Panel Admin"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-white rounded-2xl p-2 border shadow-sm gap-2 animate-scale-in">
          <button
            onClick={() => { setActiveTab('proker'); resetProkerForm(); }}
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
            onClick={() => { setActiveTab('gallery'); resetGalleryForm(); }}
            className={`flex-1 py-3 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'gallery'
                ? 'bg-gradient-to-r from-brand-gold to-amber-600 text-white shadow-md'
                : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Kelola Galeri Foto ({galleryList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex-1 py-3 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'contacts'
                ? 'bg-gradient-to-r from-brand-gold to-amber-600 text-white shadow-md'
                : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Pesan & Masukan Warga ({contactsList.length})</span>
          </button>
        </div>

        {/* TAB 1: PROKER */}
        {activeTab === 'proker' && (
          <div className="space-y-8 animate-fade-in-up">
            
            {/* Form Tambah / Edit Proker */}
            <form onSubmit={handleSaveProker} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 relative">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-brand-gold uppercase tracking-wider flex items-center gap-2">
                  {editingProkerId ? (
                    <>
                      <Pencil className="w-5 h-5 text-amber-500 animate-bounce" />
                      <span>Edit Program Kerja</span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-mono">ID: {editingProkerId}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Tambah Program Kerja Baru</span>
                    </>
                  )}
                </h2>

                {editingProkerId && (
                  <button
                    type="button"
                    onClick={resetProkerForm}
                    className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Batal Edit</span>
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Judul Program Kerja *</label>
                  <input
                    type="text"
                    required
                    placeholder="contoh: Digitalisasi UMKM Pangan Lokal"
                    value={newProker.title}
                    onChange={(e) => setNewProker({ ...newProker, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none shadow-sm transition-all focus:ring-2 focus:ring-brand-gold/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Kategori Proker</label>
                  <select
                    value={newProker.category}
                    onChange={(e) => setNewProker({ ...newProker, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none shadow-sm transition-all focus:ring-2 focus:ring-brand-gold/20"
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
                    className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none shadow-sm transition-all focus:ring-2 focus:ring-brand-gold/20"
                  >
                    <option value="Selesai">Selesai</option>
                    <option value="Berjalan">Berjalan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Unggah Foto Dokumentasi Baru (Opsional)</label>
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
                  className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none shadow-sm transition-all focus:ring-2 focus:ring-brand-gold/20"
                ></textarea>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="py-3 px-6 rounded-2xl bg-gradient-to-r from-brand-gold to-amber-600 hover:from-amber-600 hover:to-brand-gold text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>
                    {isUploading 
                      ? 'Mengunggah Foto...' 
                      : editingProkerId 
                        ? 'Simpan Perubahan Proker' 
                        : 'Simpan Proker Baru'}
                  </span>
                </button>

                {editingProkerId && (
                  <button
                    type="button"
                    onClick={resetProkerForm}
                    className="py-3 px-5 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs sm:text-sm transition-all"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>

            {/* List Proker Terdaftar */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Daftar Proker Tersimpan ({prokerList.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prokerList.map((item) => (
                  <div 
                    key={item.id} 
                    className={`p-4 rounded-2xl bg-white border transition-all flex items-center justify-between shadow-sm hover:shadow-md ${
                      editingProkerId === item.id 
                        ? 'border-brand-gold ring-2 ring-brand-gold/30 bg-amber-50/30' 
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={item.image || PLACEHOLDER_IMG} alt={item.title} className="w-14 h-14 rounded-xl object-cover border border-slate-200" onError={(e) => { e.target.src = PLACEHOLDER_IMG; }} />
                      <div>
                        <h4 className="text-sm font-bold text-brand-navy line-clamp-1">{item.title}</h4>
                        <span className="text-xs font-semibold text-brand-gold">{item.category} • {item.status}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStartEditProker(item)}
                        className="p-2.5 rounded-xl bg-amber-50 text-brand-gold hover:bg-amber-100 border border-amber-200 transition-colors active:scale-95"
                        title="Edit Proker ini"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProker(item.id)}
                        className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors active:scale-95"
                        title="Hapus Proker ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-8 animate-fade-in-up">
            
            {/* Form Tambah / Edit Gallery */}
            <form onSubmit={handleSaveGallery} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-brand-gold uppercase tracking-wider flex items-center gap-2">
                  {editingGalleryId ? (
                    <>
                      <Pencil className="w-5 h-5 text-amber-500 animate-bounce" />
                      <span>Edit Foto Galeri</span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-mono">ID: {editingGalleryId}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Tambah Foto Dokumentasi Baru</span>
                    </>
                  )}
                </h2>

                {editingGalleryId && (
                  <button
                    type="button"
                    onClick={resetGalleryForm}
                    className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Batal Edit</span>
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Judul Kegiatan Foto *</label>
                  <input
                    type="text"
                    required
                    placeholder="contoh: Gotong Royong Warga Desa"
                    value={newGallery.title}
                    onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none shadow-sm transition-all focus:ring-2 focus:ring-brand-gold/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Pilih File Foto Baru (Opsional)</label>
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
                  className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none shadow-sm transition-all focus:ring-2 focus:ring-brand-gold/20"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="py-3 px-6 rounded-2xl bg-gradient-to-r from-brand-gold to-amber-600 hover:from-amber-600 hover:to-brand-gold text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>
                    {isUploading 
                      ? 'Uploading...' 
                      : editingGalleryId 
                        ? 'Simpan Perubahan Foto' 
                        : 'Tambah ke Galeri'}
                  </span>
                </button>

                {editingGalleryId && (
                  <button
                    type="button"
                    onClick={resetGalleryForm}
                    className="py-3 px-5 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs sm:text-sm transition-all"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {galleryList.map((item) => (
                <div 
                  key={item.id} 
                  className={`relative group rounded-2xl overflow-hidden border h-44 shadow-sm transition-all ${
                    editingGalleryId === item.id 
                      ? 'border-brand-gold ring-4 ring-brand-gold/40' 
                      : 'border-slate-200'
                  }`}
                >
                  <img src={item.image || PLACEHOLDER_IMG} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.src = PLACEHOLDER_IMG; }} />
                  <div className="absolute inset-0 bg-brand-navy/85 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                    <div>
                      <p className="text-xs font-bold text-white line-clamp-2 mb-3">{item.title}</p>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleStartEditGallery(item)}
                          className="p-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors active:scale-95"
                          title="Edit Foto Ini"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteGallery(item.id)}
                          className="p-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors active:scale-95"
                          title="Hapus Foto Ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: CONTACT MESSAGES */}
        {activeTab === 'contacts' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-lg font-bold text-brand-navy flex items-center gap-2">
                  <Mail className="w-5 h-5 text-brand-gold" />
                  <span>Daftar Pesan & Aspirasi Masuk</span>
                </h2>
                <p className="text-xs text-slate-500 font-medium">Pesan yang dikirimkan oleh warga atau pengunjung dari formulir website</p>
              </div>
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-100 text-brand-gold border border-amber-300">
                Total: {contactsList.length} Pesan
              </span>
            </div>

            {contactsList.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-700">Belum Ada Pesan Masuk</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  Pesan yang dikirimkan oleh warga lewat formulir di halaman utama akan muncul di sini.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactsList.map((item) => (
                  <div key={item.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3 relative group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 text-brand-gold font-bold flex items-center justify-center text-sm border border-amber-200">
                          {item.name ? item.name.charAt(0).toUpperCase() : 'W'}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-brand-navy">{item.name}</h4>
                          <span className="text-xs text-slate-500 font-medium block">
                            {item.email || 'Tanpa Kontak HP/Email'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteContact(item.id)}
                        className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors active:scale-95"
                        title="Hapus Pesan Ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      "{item.message}"
                    </div>

                    {item.created_at && (
                      <div className="text-[11px] text-slate-400 font-semibold text-right">
                        {new Date(item.created_at).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
