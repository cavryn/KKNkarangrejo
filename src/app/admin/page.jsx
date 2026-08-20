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
  const [newsList, setNewsList] = useState([]);
  const [modulesList, setModulesList] = useState([]);
  const [contactsList, setContactsList] = useState([]);
  const [teamList, setTeamList] = useState([]);

  // Form State Berita
  const [newNews, setNewNews] = useState({
    title: '',
    category: 'Liputan Proker',
    author: 'Humas KKN Kelompok 3',
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    readTime: '3 menit',
    summary: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80'
  });
  const [editingNewsId, setEditingNewsId] = useState(null);

  // Form State Modul
  const [newModul, setNewModul] = useState({
    title: '',
    category: 'Lingkungan & Pengolahan Limbah',
    author: 'Tim KKN Kelompok 3',
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    pages: '',
    fileSize: '',
    fileUrl: '',
    images: [],
    summary: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'
  });
  const [editingModulId, setEditingModulId] = useState(null);

  // Edit Mode State
  const [editingProkerId, setEditingProkerId] = useState(null);
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [editingTeamId, setEditingTeamId] = useState(null);

  // Form State Team Member
  const [newTeam, setNewTeam] = useState({
    name: '',
    role: '',
    division: 'Ketua',
    major: '',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    quote: '',
    instagram: '',
    email: ''
  });

  // Form State Proker
  const [newProker, setNewProker] = useState({
    title: '',
    category: 'Acara',
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

  // Centralized data fetcher — used on mount and after Supabase CRUD operations
  const fetchAllData = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setIsLoadingData(false);
      return;
    }
    try {
      const [prokerRes, galleryRes, newsRes, modulesRes, contactsRes, teamRes] = await Promise.all([
        supabase.from('proker').select('*').order('created_at', { ascending: false }),
        supabase.from('gallery').select('*').order('created_at', { ascending: false }),
        supabase.from('news').select('*').order('created_at', { ascending: false }),
        supabase.from('modules').select('*').order('created_at', { ascending: true }),
        supabase.from('contacts').select('*').order('created_at', { ascending: false }),
        supabase.from('team_members').select('*').order('created_at', { ascending: true })
      ]);

      if (prokerRes.error) throw prokerRes.error;
      if (galleryRes.error) throw galleryRes.error;

      const fetchedProker = prokerRes.data || [];
      const fetchedGallery = galleryRes.data || [];
      const fetchedNews = newsRes?.data || [];
      const fetchedModules = modulesRes?.data || [];
      const fetchedContacts = contactsRes?.data || [];
      const fetchedTeam = teamRes?.data || [];

      setProkerList(fetchedProker);
      setGalleryList(fetchedGallery);
      setNewsList(fetchedNews);
      setModulesList(fetchedModules);
      setContactsList(fetchedContacts);
      setTeamList(fetchedTeam);

      localStorage.setItem('kkn_proker_list', JSON.stringify(fetchedProker));
      localStorage.setItem('kkn_gallery_list', JSON.stringify(fetchedGallery));
      localStorage.setItem('kkn_news_list', JSON.stringify(fetchedNews));
      localStorage.setItem('kkn_modules_list', JSON.stringify(fetchedModules));
      localStorage.setItem('kkn_team_list', JSON.stringify(fetchedTeam));
    } catch (err) {
      console.error('Gagal mengambil data dari Supabase:', err);
      showToast('error', 'Gagal mengambil data dari Supabase: ' + (err.message || err));
    } finally {
      setIsLoadingData(false);
    }
  };

  // Set initial data on first load with localStorage sync
  useEffect(() => {
    try {
      const localProker = localStorage.getItem('kkn_proker_list');
      const localGallery = localStorage.getItem('kkn_gallery_list');
      const localNews = localStorage.getItem('kkn_news_list');
      const localModules = localStorage.getItem('kkn_modules_list');
      const localTeam = localStorage.getItem('kkn_team_list');

      setProkerList(localProker ? JSON.parse(localProker) : (INITIAL_DATA.prokerList || []));
      setGalleryList(localGallery ? JSON.parse(localGallery) : (INITIAL_DATA.galleryList || []));
      setNewsList(localNews ? JSON.parse(localNews) : (INITIAL_DATA.newsList || []));
      setModulesList(localModules ? JSON.parse(localModules) : (INITIAL_DATA.modulesList || []));
      setTeamList(localTeam ? JSON.parse(localTeam) : (INITIAL_DATA.teamMembers || []));
    } catch (e) {
      setProkerList(INITIAL_DATA.prokerList || []);
      setGalleryList(INITIAL_DATA.galleryList || []);
      setNewsList(INITIAL_DATA.newsList || []);
      setModulesList(INITIAL_DATA.modulesList || []);
      setTeamList(INITIAL_DATA.teamMembers || []);
    }
  }, []);

  // Auto-sync mutations to localStorage for instant reflect on Home page
  useEffect(() => {
    if (prokerList) localStorage.setItem('kkn_proker_list', JSON.stringify(prokerList));
  }, [prokerList]);

  useEffect(() => {
    if (galleryList) localStorage.setItem('kkn_gallery_list', JSON.stringify(galleryList));
  }, [galleryList]);

  useEffect(() => {
    if (newsList) localStorage.setItem('kkn_news_list', JSON.stringify(newsList));
  }, [newsList]);

  useEffect(() => {
    if (modulesList) localStorage.setItem('kkn_modules_list', JSON.stringify(modulesList));
  }, [modulesList]);

  useEffect(() => {
    if (teamList) localStorage.setItem('kkn_team_list', JSON.stringify(teamList));
  }, [teamList]);

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
      category: 'Acara',
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
          await fetchAllData();
        } catch (err) {
          showToast('error', 'Gagal update proker: ' + (err.message || err));
          return;
        }
      } else {
        setProkerList(prev => prev.map(p => p.id === editingProkerId ? { ...p, ...updatePayload } : p));
        showToast('success', `Proker "${title}" berhasil diperbarui!`);
      }

      resetProkerForm();
    } else {
      // INSERT Mode
      const item = { ...newProker, id: `proker-${Date.now()}` };

      if (isSupabaseConfigured && supabase) {
        try {
          const { error } = await supabase.from('proker').insert([item]);
          if (error) throw error;
          showToast('success', `Proker "${item.title}" berhasil ditambahkan!`);
          await fetchAllData();
        } catch (err) {
          showToast('error', 'Gagal menambah proker: ' + (err.message || err));
          return;
        }
      } else {
        setProkerList(prev => [item, ...prev]);
        showToast('success', `Proker "${item.title}" berhasil ditambahkan!`);
      }

      resetProkerForm();
    }
  };

  // Start Editing Proker
  const handleStartEditProker = (item) => {
    setEditingProkerId(item.id);
    setNewProker({
      title: item.title || '',
      category: item.category || 'Acara',
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
        await fetchAllData();
      } catch (err) {
        showToast('error', 'Gagal menghapus proker: ' + (err.message || err));
        return;
      }
    } else {
      setProkerList(prev => prev.filter(p => p.id !== id));
      showToast('success', 'Proker berhasil dihapus!');
    }
    if (editingProkerId === id) resetProkerForm();
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
          await fetchAllData();
        } catch (err) {
          showToast('error', 'Gagal update galeri: ' + (err.message || err));
          return;
        }
      } else {
        setGalleryList(prev => prev.map(g => g.id === editingGalleryId ? { ...g, ...updatePayload, prokerCategory: newGallery.prokerCategory } : g));
        showToast('success', `Foto "${newGallery.title}" berhasil diperbarui!`);
      }

      resetGalleryForm();
    } else {
      // INSERT Mode — gunakan nama kolom prokercategory yang sesuai dengan tabel Supabase
      const dbItem = {
        id: `gal-${Date.now()}`,
        title: newGallery.title,
        prokercategory: newGallery.prokerCategory || 'Lingkungan',
        caption: newGallery.caption,
        image: newGallery.image
      };

      if (isSupabaseConfigured && supabase) {
        try {
          const { error } = await supabase.from('gallery').insert([dbItem]);
          if (error) throw error;
          showToast('success', `Foto "${dbItem.title}" berhasil ditambahkan!`);
          await fetchAllData();
        } catch (err) {
          showToast('error', 'Gagal menambah foto: ' + (err.message || err));
          return;
        }
      } else {
        const localItem = { ...dbItem, prokerCategory: newGallery.prokerCategory || 'Lingkungan' };
        setGalleryList(prev => [localItem, ...prev]);
        showToast('success', `Foto "${dbItem.title}" berhasil ditambahkan!`);
      }

      resetGalleryForm();
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

  // Delete Gallery Photo
  const handleDeleteGallery = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus foto galeri ini?')) return;
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('gallery').delete().eq('id', id);
        if (error) throw error;
        showToast('success', 'Foto galeri berhasil dihapus!');
        await fetchAllData();
      } catch (err) {
        showToast('error', 'Gagal menghapus foto galeri: ' + (err.message || err));
        return;
      }
    } else {
      setGalleryList(prev => prev.filter(g => g.id !== id));
      showToast('success', 'Foto galeri berhasil dihapus!');
    }
    if (editingGalleryId === id) resetGalleryForm();
  };

  // Reset Team Form
  const resetTeamForm = () => {
    setEditingTeamId(null);
    setNewTeam({
      name: '',
      role: '',
      division: 'Ketua',
      major: '',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      quote: '',
      instagram: '',
      email: ''
    });
  };

  // Add / Edit Team Member Handler
  const handleSaveTeam = async (e) => {
    e.preventDefault();
    if (!newTeam.name) return;

    if (editingTeamId) {
      // UPDATE Mode
      const updatePayload = {
        name: newTeam.name,
        role: newTeam.role,
        division: newTeam.division,
        major: newTeam.major,
        photo: newTeam.photo,
        quote: newTeam.quote,
        instagram: newTeam.instagram,
        email: newTeam.email
      };

      if (isSupabaseConfigured && supabase) {
        try {
          const { error } = await supabase.from('team_members').update(updatePayload).eq('id', editingTeamId);
          if (error) throw error;
          showToast('success', `Anggota "${newTeam.name}" berhasil diperbarui!`);
          await fetchAllData();
        } catch (err) {
          showToast('error', 'Gagal update anggota: ' + (err.message || err));
          return;
        }
      } else {
        setTeamList(prev => prev.map(m => m.id === editingTeamId ? { ...m, ...updatePayload } : m));
        showToast('success', `Anggota "${newTeam.name}" diperbarui!`);
      }

      resetTeamForm();
    } else {
      // INSERT Mode
      const item = {
        id: `tm-${Date.now()}`,
        name: newTeam.name,
        role: newTeam.role,
        division: newTeam.division,
        major: newTeam.major,
        photo: newTeam.photo,
        quote: newTeam.quote,
        instagram: newTeam.instagram,
        email: newTeam.email
      };

      if (isSupabaseConfigured && supabase) {
        try {
          const { error } = await supabase.from('team_members').insert([item]);
          if (error) throw error;
          showToast('success', `Anggota "${item.name}" berhasil ditambahkan!`);
          await fetchAllData();
        } catch (err) {
          showToast('error', 'Gagal menambah anggota: ' + (err.message || err));
          return;
        }
      } else {
        setTeamList(prev => [item, ...prev]);
        showToast('success', `Anggota "${item.name}" ditambahkan!`);
      }

      resetTeamForm();
    }
  };

  // Start Editing Team Member
  const handleStartEditTeam = (item) => {
    setEditingTeamId(item.id);
    
    // Normalize division if it was legacy 'Badan Pengurus Harian' or empty
    let initialDivision = item.division;
    const validDivisions = ['Ketua', 'Wakil', 'Bendahara', 'Sekretaris', 'Humas', 'Acara', 'Konsumsi', 'Logtrans', 'PDD'];
    
    if (!initialDivision || !validDivisions.includes(initialDivision)) {
      const lowerRole = (item.role || '').toLowerCase();
      if (lowerRole.includes('wakil')) initialDivision = 'Wakil';
      else if (lowerRole.includes('ketua')) initialDivision = 'Ketua';
      else if (lowerRole.includes('sekretaris')) initialDivision = 'Sekretaris';
      else if (lowerRole.includes('bendahara')) initialDivision = 'Bendahara';
      else if (lowerRole.includes('humas')) initialDivision = 'Humas';
      else if (lowerRole.includes('acara')) initialDivision = 'Acara';
      else if (lowerRole.includes('konsumsi')) initialDivision = 'Konsumsi';
      else if (lowerRole.includes('logtrans') || lowerRole.includes('logistik')) initialDivision = 'Logtrans';
      else if (lowerRole.includes('pdd') || lowerRole.includes('desain') || lowerRole.includes('web')) initialDivision = 'PDD';
      else initialDivision = 'Ketua';
    }

    setNewTeam({
      name: item.name || '',
      role: item.role || '',
      division: initialDivision,
      major: item.major || '',
      photo: item.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      quote: item.quote || '',
      instagram: item.instagram || '',
      email: item.email || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete Team Member
  const handleDeleteTeam = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus anggota tim ini?')) return;
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('team_members').delete().eq('id', id);
        if (error) throw error;
        showToast('success', 'Anggota tim berhasil dihapus!');
        await fetchAllData();
      } catch (err) {
        showToast('error', 'Gagal menghapus anggota tim: ' + (err.message || err));
        return;
      }
    } else {
      setTeamList(prev => prev.filter(m => m.id !== id));
      showToast('success', 'Anggota tim berhasil dihapus!');
    }
    if (editingTeamId === id) resetTeamForm();
  };

  // Delete Contact Message
  const handleDeleteContact = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pesan ini?')) return;
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('contacts').delete().eq('id', id);
        if (error) throw error;
        showToast('success', 'Pesan berhasil dihapus!');
        await fetchAllData();
      } catch (err) {
        showToast('error', 'Gagal menghapus pesan: ' + (err.message || err));
        return;
      }
    } else {
      setContactsList(prev => prev.filter(c => c.id !== id));
      showToast('success', 'Pesan berhasil dihapus!');
    }
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-5 animate-fade-in-up p-8 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-sm w-full">
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-amber-100 animate-ping opacity-50" />
            <div className="w-20 h-20 border-4 border-amber-200 border-t-brand-gold rounded-full animate-spin" />
            <Shield className="w-8 h-8 text-brand-gold absolute" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-brand-navy">Memuat Panel Admin</h3>
            <p className="text-xs font-semibold text-slate-400">Menghubungkan ke Supabase Live Database...</p>
          </div>
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
        <div className="flex flex-wrap border-b border-slate-200 bg-white rounded-2xl p-2 border shadow-sm gap-2 animate-scale-in">
          <button
            onClick={() => { setActiveTab('proker'); resetProkerForm(); }}
            className={`flex-1 min-w-[120px] py-3 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'proker'
                ? 'bg-gradient-to-r from-brand-gold to-amber-600 text-white shadow-md'
                : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Proker ({prokerList.length})</span>
          </button>
          
          <button
            onClick={() => { setActiveTab('gallery'); resetGalleryForm(); }}
            className={`flex-1 min-w-[120px] py-3 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'gallery'
                ? 'bg-gradient-to-r from-brand-gold to-amber-600 text-white shadow-md'
                : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Galeri ({galleryList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('berita')}
            className={`flex-1 min-w-[120px] py-3 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'berita'
                ? 'bg-gradient-to-r from-brand-gold to-amber-600 text-white shadow-md'
                : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Berita ({newsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('modul')}
            className={`flex-1 min-w-[120px] py-3 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'modul'
                ? 'bg-gradient-to-r from-brand-gold to-amber-600 text-white shadow-md'
                : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Modul ({modulesList.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('team'); resetTeamForm(); }}
            className={`flex-1 min-w-[120px] py-3 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'team'
                ? 'bg-gradient-to-r from-brand-gold to-amber-600 text-white shadow-md'
                : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Anggota ({teamList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex-1 min-w-[120px] py-3 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'contacts'
                ? 'bg-gradient-to-r from-brand-gold to-amber-600 text-white shadow-md'
                : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Pesan ({contactsList.length})</span>
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

        {/* TAB 3: KELOLA BERITA */}
        {activeTab === 'berita' && (
          <div className="space-y-8 animate-fade-in-up">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!newNews.title) return;
                const payload = { ...newNews };

                if (editingNewsId) {
                  const { id: _id, ...updatePayload } = payload;
                  if (isSupabaseConfigured && supabase) {
                    try {
                      const { error } = await supabase.from('news').update(updatePayload).eq('id', editingNewsId);
                      if (error) throw error;
                      showToast('success', `Berita diperbarui!`);
                      await fetchAllData();
                    } catch (err) { showToast('error', 'Gagal update berita: ' + (err.message || err)); return; }
                  } else {
                    setNewsList(prev => prev.map(n => n.id === editingNewsId ? { ...n, ...updatePayload } : n));
                    showToast('success', 'Berita diperbarui!');
                  }
                  setEditingNewsId(null);
                } else {
                  const item = { ...payload, id: `news-${Date.now()}` };
                  if (isSupabaseConfigured && supabase) {
                    try {
                      const { error } = await supabase.from('news').insert([item]);
                      if (error) throw error;
                      showToast('success', `Berita ditambahkan!`);
                      await fetchAllData();
                    } catch (err) { showToast('error', 'Gagal tambah berita: ' + (err.message || err)); return; }
                  } else {
                    setNewsList(prev => [item, ...prev]);
                    showToast('success', 'Berita ditambahkan!');
                  }
                }
                setNewNews({ title: '', category: 'Liputan Proker', author: 'Humas KKN Kelompok 3', date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), readTime: '3 menit', summary: '', content: '', coverImage: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80' });
              }}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-brand-gold uppercase tracking-wider flex items-center gap-2">
                  {editingNewsId ? <><Pencil className="w-5 h-5" /><span>Edit Berita</span></> : <><Plus className="w-5 h-5" /><span>Tambah Berita Baru</span></>}
                </h2>
                {editingNewsId && (
                  <button type="button" onClick={() => setEditingNewsId(null)} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold flex items-center gap-1">
                    <X className="w-4 h-4" /> Batal Edit
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Judul Berita *</label>
                  <input type="text" required placeholder="Judul berita..." value={newNews.title} onChange={e => setNewNews({...newNews, title: e.target.value})} className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Kategori</label>
                  <select value={newNews.category} onChange={e => setNewNews({...newNews, category: e.target.value})} className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none">
                    <option>Liputan Proker</option>
                    <option>Kabar Desa</option>
                    <option>Edukasi &amp; Lingkungan</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Penulis</label>
                  <input type="text" placeholder="Nama penulis..." value={newNews.author} onChange={e => setNewNews({...newNews, author: e.target.value})} className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Unggah Foto Cover (Opsional)</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageFileChange(e, setNewNews)} className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:bg-amber-100 file:text-brand-gold font-bold" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Ringkasan / Summary *</label>
                <textarea rows={2} required placeholder="Ringkasan singkat berita..." value={newNews.summary} onChange={e => setNewNews({...newNews, summary: e.target.value})} className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none" />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Isi Berita Lengkap</label>
                <textarea rows={5} placeholder="Tulis konten berita lengkap..." value={newNews.content} onChange={e => setNewNews({...newNews, content: e.target.value})} className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none font-mono" />
              </div>

              <button type="submit" disabled={isUploading} className="py-3 px-6 rounded-2xl bg-gradient-to-r from-brand-gold to-amber-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95">
                <Save className="w-4 h-4" />
                <span>{isUploading ? 'Uploading...' : editingNewsId ? 'Simpan Perubahan Berita' : 'Simpan Berita'}</span>
              </button>
            </form>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Daftar Berita Tersimpan ({newsList.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {newsList.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-sm hover:shadow-md transition-all gap-3">
                    <div className="flex items-center gap-3">
                      <img src={item.coverImage || item.coverimage || 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=400&q=80'} alt={item.title} className="w-14 h-14 rounded-xl object-cover border border-slate-200 flex-shrink-0" onError={(e) => { e.target.src = PLACEHOLDER_IMG; }} />
                      <div>
                        <h4 className="text-sm font-bold text-brand-navy line-clamp-1">{item.title}</h4>
                        <span className="text-xs font-semibold text-brand-gold">{item.category} • {item.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => { setEditingNewsId(item.id); setNewNews({ title: item.title || '', category: item.category || 'Liputan Proker', author: item.author || '', date: item.date || '', readTime: item.readTime || '3 menit', summary: item.summary || '', content: item.content || '', coverImage: item.coverImage || item.coverimage || '' }); window.scrollTo({top:0,behavior:'smooth'}); }} className="p-2.5 rounded-xl bg-amber-50 text-brand-gold hover:bg-amber-100 border border-amber-200 transition-colors" title="Edit"><Pencil className="w-4 h-4" /></button>
                      <button onClick={async () => { if (!confirm('Hapus berita ini?')) return; if (isSupabaseConfigured && supabase) { try { const { error } = await supabase.from('news').delete().eq('id', item.id); if (error) throw error; showToast('success', 'Berita dihapus!'); await fetchAllData(); } catch (err) { showToast('error', 'Gagal hapus: ' + (err.message || err)); } } else { setNewsList(prev => prev.filter(n => n.id !== item.id)); showToast('success', 'Berita dihapus!'); } }} className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors" title="Hapus"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: KELOLA MODUL EDUKASI */}
        {activeTab === 'modul' && (
          <div className="space-y-8 animate-fade-in-up">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!newModul.title) return;
                const payload = { ...newModul };

                if (editingModulId) {
                  const { id: _id, ...updatePayload } = payload;
                  if (updatePayload.images && Array.isArray(updatePayload.images)) {
                    updatePayload.images = JSON.stringify(updatePayload.images);
                  }
                  if (isSupabaseConfigured && supabase) {
                    try {
                      let { error } = await supabase.from('modules').update(updatePayload).eq('id', editingModulId);
                      if (error && error.message && (error.message.includes('fileUrl') || error.message.includes('images') || error.message.includes('schema cache'))) {
                        const fallback = { ...updatePayload };
                        if (error.message.includes('fileUrl')) {
                          fallback.fileurl = updatePayload.fileUrl;
                          delete fallback.fileUrl;
                        }
                        if (error.message.includes('images')) {
                          delete fallback.images;
                        }
                        const res = await supabase.from('modules').update(fallback).eq('id', editingModulId);
                        error = res.error;
                      }
                      if (error) throw error;
                      showToast('success', 'Modul diperbarui!');
                      await fetchAllData();
                    } catch (err) { showToast('error', 'Gagal update modul: ' + (err.message || err)); return; }
                  } else {
                    setModulesList(prev => prev.map(m => m.id === editingModulId ? { ...m, ...payload } : m));
                    showToast('success', 'Modul diperbarui!');
                  }
                  setEditingModulId(null);
                } else {
                  const item = { ...payload, id: `mod-${Date.now()}` };
                  const insertItem = { ...item };
                  if (insertItem.images && Array.isArray(insertItem.images)) {
                    insertItem.images = JSON.stringify(insertItem.images);
                  }
                  if (isSupabaseConfigured && supabase) {
                    try {
                      let { error } = await supabase.from('modules').insert([insertItem]);
                      if (error && error.message && (error.message.includes('fileUrl') || error.message.includes('images') || error.message.includes('schema cache'))) {
                        const fallback = { ...insertItem };
                        if (error.message.includes('fileUrl')) {
                          fallback.fileurl = insertItem.fileUrl;
                          delete fallback.fileUrl;
                        }
                        if (error.message.includes('images')) {
                          delete fallback.images;
                        }
                        const res = await supabase.from('modules').insert([fallback]);
                        error = res.error;
                      }
                      if (error) throw error;
                      showToast('success', 'Modul ditambahkan!');
                      await fetchAllData();
                    } catch (err) { showToast('error', 'Gagal tambah modul: ' + (err.message || err)); return; }
                  } else {
                    setModulesList(prev => [item, ...prev]);
                    showToast('success', 'Modul ditambahkan!');
                  }
                }
                setNewModul({ title: '', category: 'Lingkungan & Pengolahan Limbah', author: 'Tim KKN Kelompok 3', date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), pages: '', fileSize: '', fileUrl: '', images: [], summary: '', content: '', coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80' });
              }}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-brand-gold uppercase tracking-wider flex items-center gap-2">
                  {editingModulId ? <><Pencil className="w-5 h-5" /><span>Edit Modul</span></> : <><Plus className="w-5 h-5" /><span>Tambah Modul Edukasi Baru</span></>}
                </h2>
                {editingModulId && (
                  <button type="button" onClick={() => { setEditingModulId(null); setNewModul({ title: '', category: 'Lingkungan & Pengolahan Limbah', author: 'Tim KKN Kelompok 3', date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), pages: '', fileSize: '', fileUrl: '', images: [], summary: '', content: '', coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80' }); }} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold flex items-center gap-1">
                    <X className="w-4 h-4" /> Batal Edit
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Judul Modul *</label>
                  <input type="text" required placeholder="Judul panduan / modul..." value={newModul.title} onChange={e => setNewModul({...newModul, title: e.target.value})} className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Kategori Modul</label>
                  <select value={newModul.category} onChange={e => setNewModul({...newModul, category: e.target.value})} className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none">
                    <option>Lingkungan &amp; Pengolahan Limbah</option>
                    <option>Kesehatan &amp; Gizi</option>
                    <option>Ekonomi &amp; UMKM</option>
                    <option>Pendidikan &amp; Literasi</option>
                    <option>Teknologi &amp; Digital</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Penyusun Modul</label>
                  <input type="text" placeholder="Nama tim penyusun..." value={newModul.author} onChange={e => setNewModul({...newModul, author: e.target.value})} className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Jumlah Halaman</label>
                  <input type="text" placeholder="Contoh: 12 Halaman" value={newModul.pages} onChange={e => setNewModul({...newModul, pages: e.target.value})} className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none" />
                </div>
              </div>

              {/* Upload Lembar Halaman Modul (WebP / JPG / PNG) */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <label className="block text-xs font-bold text-brand-navy">
                      📖 Unggah Lembar Halaman Modul (Gambar .webp / .png / .jpg)
                    </label>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Bisa pilih beberapa file sekaligus. Gambar akan langsung tampil sebagai <strong>Slide Booklet Interaktif</strong> di web.
                    </p>
                  </div>
                  {newModul.images?.length > 0 && (
                    <span className="px-3 py-1 text-xs font-extrabold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Total: {newModul.images.length} Lembar Terunggah
                    </span>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*,.webp,.png,.jpg,.jpeg"
                  multiple
                  onChange={async (e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length === 0) return;
                    setIsUploading(true);
                    try {
                      const uploadedUrls = [];
                      for (const file of files) {
                        const url = await uploadImage(file);
                        if (url) uploadedUrls.push(url);
                      }
                      setNewModul(prev => {
                        const updatedImages = [...(prev.images || []), ...uploadedUrls];
                        return {
                          ...prev,
                          images: updatedImages,
                          pages: `${updatedImages.length} Halaman`,
                          coverImage: prev.coverImage && !prev.coverImage.includes('unsplash') ? prev.coverImage : updatedImages[0]
                        };
                      });
                      showToast('success', `${uploadedUrls.length} lembar halaman modul berhasil diunggah!`);
                    } catch (err) {
                      console.error("Upload lembar error:", err);
                      showToast('error', 'Gagal upload gambar lembar: ' + (err.message || err));
                    } finally {
                      setIsUploading(false);
                    }
                  }}
                  className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:bg-amber-100 file:text-brand-gold font-bold hover:file:bg-amber-200 cursor-pointer"
                />

                {/* Thumbnails of Uploaded Pages */}
                {newModul.images?.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-amber-200/60">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Daftar Lembar Slide:</span>
                      <button
                        type="button"
                        onClick={() => setNewModul(prev => ({ ...prev, images: [], pages: '' }))}
                        className="text-[11px] font-bold text-red-600 hover:underline"
                      >
                        Hapus Semua Lembar
                      </button>
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                      {newModul.images.map((imgUrl, i) => (
                        <div key={i} className="relative w-16 h-20 rounded-xl overflow-hidden border-2 border-amber-300 shadow-sm flex-shrink-0 group">
                          <img src={imgUrl} alt={`Hal ${i + 1}`} className="w-full h-full object-cover" />
                          <span className="absolute bottom-0 inset-x-0 bg-slate-900/85 text-white text-[9px] font-bold text-center py-0.5">
                            Hal {i + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setNewModul(prev => {
                                const filtered = prev.images.filter((_, idx) => idx !== i);
                                return {
                                  ...prev,
                                  images: filtered,
                                  pages: `${filtered.length} Halaman`
                                };
                              });
                            }}
                            className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white shadow-md transition-all hover:scale-110"
                            title="Hapus Halaman Ini"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Upload PDF Modul (Opsional) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-brand-navy">
                  Unggah Dokumen PDF Asli (.pdf) — Opsional untuk Tombol Unduh
                </label>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setIsUploading(true);
                    try {
                      const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
                      const formattedSize = `${sizeInMB} MB (PDF)`;
                      const url = await uploadImage(file);
                      if (url) {
                        setNewModul(prev => ({
                          ...prev,
                          fileUrl: url,
                          fileSize: prev.fileSize || formattedSize
                        }));
                        showToast('success', 'File PDF modul berhasil diunggah!');
                      }
                    } catch (err) {
                      console.error("Upload PDF error:", err);
                      showToast('error', 'Gagal mengunggah file PDF: ' + (err.message || err));
                    } finally {
                      setIsUploading(false);
                    }
                  }}
                  className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:bg-slate-200 file:text-slate-700 font-bold hover:file:bg-slate-300 cursor-pointer"
                />
                {newModul.fileUrl && (
                  <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 flex items-center justify-between gap-2">
                    <span className="truncate">✅ File PDF terhubung: <strong className="font-mono">{newModul.fileSize || 'PDF'}</strong></span>
                    <a href={newModul.fileUrl} target="_blank" rel="noreferrer" className="text-emerald-800 underline font-bold whitespace-nowrap hover:text-emerald-950">
                      Buka PDF &rarr;
                    </a>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Ringkasan Modul *</label>
                <textarea rows={2} required placeholder="Deskripsi singkat isi modul..." value={newModul.summary} onChange={e => setNewModul({...newModul, summary: e.target.value})} className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none" />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Isi Konten Modul Lengkap (Opsional untuk Dibaca di Web)</label>
                <textarea rows={5} placeholder="Tulis ringkasan bab / isi panduan modul..." value={newModul.content} onChange={e => setNewModul({...newModul, content: e.target.value})} className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold outline-none font-mono" />
              </div>

              <button type="submit" disabled={isUploading} className="py-3 px-6 rounded-2xl bg-gradient-to-r from-brand-gold to-amber-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95">
                <Save className="w-4 h-4" />
                <span>{isUploading ? 'Mengunggah File...' : editingModulId ? 'Simpan Perubahan Modul' : 'Simpan Modul Baru'}</span>
              </button>
            </form>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Daftar Modul Tersimpan ({modulesList.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modulesList.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-sm hover:shadow-md transition-all gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-brand-navy line-clamp-1">{item.title}</h4>
                      <span className="text-xs font-semibold text-brand-gold">{item.category} • {item.pages || 'PDF'}</span>
                      {item.fileUrl && <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold">PDF Ready</span>}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => {
                        let parsedImgs = [];
                        if (Array.isArray(item.images)) parsedImgs = item.images;
                        else if (typeof item.images === 'string' && item.images.startsWith('[')) {
                          try { parsedImgs = JSON.parse(item.images); } catch(e) {}
                        }
                        setEditingModulId(item.id);
                        setNewModul({
                          title: item.title || '',
                          category: item.category || 'Lingkungan & Pengolahan Limbah',
                          author: item.author || '',
                          date: item.date || '',
                          pages: item.pages || '',
                          fileSize: item.fileSize || item.filesize || '',
                          fileUrl: item.fileUrl || item.fileurl || '',
                          images: parsedImgs,
                          summary: item.summary || '',
                          content: item.content || '',
                          coverImage: item.coverImage || item.coverimage || ''
                        });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }} className="p-2.5 rounded-xl bg-amber-50 text-brand-gold hover:bg-amber-100 border border-amber-200 transition-colors" title="Edit"><Pencil className="w-4 h-4" /></button>
                      <button onClick={async () => { if (!confirm('Hapus modul ini?')) return; if (isSupabaseConfigured && supabase) { try { const { error } = await supabase.from('modules').delete().eq('id', item.id); if (error) throw error; showToast('success', 'Modul dihapus!'); await fetchAllData(); } catch (err) { showToast('error', 'Gagal hapus: ' + (err.message || err)); } } else { setModulesList(prev => prev.filter(m => m.id !== item.id)); showToast('success', 'Modul dihapus!'); } }} className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors" title="Hapus"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CONTACT MESSAGES */}
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

        {/* TAB 6: KELOLA ANGGOTA TIM */}
        {activeTab === 'team' && (
          <div className="space-y-8 animate-fade-in-up">
            
            {/* Form Tambah / Edit Anggota Tim */}
            <form onSubmit={handleSaveTeam} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 relative">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-brand-gold uppercase tracking-wider flex items-center gap-2">
                  <User className="w-5 h-5 text-brand-navy" />
                  <span>{editingTeamId ? 'Edit Data Anggota Tim' : 'Tambah Anggota Tim Baru'}</span>
                </h2>
                {editingTeamId && (
                  <button
                    type="button"
                    onClick={resetTeamForm}
                    className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-all"
                  >
                    Batal Edit
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">
                    Nama Lengkap Mahasiswa *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Rizky Ramadhan"
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">
                    Jabatan / Peran di KKN *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ketua Kelompok KKN"
                    value={newTeam.role}
                    onChange={(e) => setNewTeam({ ...newTeam, role: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">
                    Divisi Pengabdian *
                  </label>
                  <select
                    value={newTeam.division}
                    onChange={(e) => setNewTeam({ ...newTeam, division: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-semibold"
                  >
                    <option value="Ketua">Ketua</option>
                    <option value="Wakil">Wakil</option>
                    <option value="Bendahara">Bendahara</option>
                    <option value="Sekretaris">Sekretaris</option>
                    <option value="Humas">Humas</option>
                    <option value="Acara">Acara</option>
                    <option value="Konsumsi">Konsumsi</option>
                    <option value="Logtrans">Logtrans</option>
                    <option value="PDD">PDD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">
                    Program Studi / Jurusan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Teknik Informatika"
                    value={newTeam.major}
                    onChange={(e) => setNewTeam({ ...newTeam, major: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Upload Foto Profil */}
              <div>
                <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">
                  Foto Profil Anggota (URL atau Unggah) *
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="text"
                    required
                    placeholder="https://..."
                    value={newTeam.photo}
                    onChange={(e) => setNewTeam({ ...newTeam, photo: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                  />
                  <label className={`w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-brand-gold border border-amber-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all flex-shrink-0 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <ImageIcon className="w-4 h-4" />
                    <span>{isUploading ? 'Mengunggah...' : 'Unggah Foto'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isUploading}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setIsUploading(true);
                        try {
                          const url = await uploadImage(file);
                          if (url) {
                            setNewTeam(prev => ({ ...prev, photo: url }));
                            showToast('success', 'Foto profil berhasil diunggah!');
                          } else {
                            showToast('error', 'Gagal mendapatkan URL foto.');
                          }
                        } catch (err) {
                          console.error("Gagal mengunggah foto:", err);
                          showToast('error', 'Gagal mengunggah foto: ' + (err.message || err));
                        } finally {
                          setIsUploading(false);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">
                    Instagram Handle (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: @rizky.ramadhan"
                    value={newTeam.instagram}
                    onChange={(e) => setNewTeam({ ...newTeam, instagram: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">
                    Email Kontak (Opsional)
                  </label>
                  <input
                    type="email"
                    placeholder="Contoh: nama@domain.com"
                    value={newTeam.email}
                    onChange={(e) => setNewTeam({ ...newTeam, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">
                  Kutipan / Misi Pengabdian *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Contoh: Memimpin dengan aksi, mengabdi untuk kemajuan Desa Karangrejo..."
                  value={newTeam.quote}
                  onChange={(e) => setNewTeam({ ...newTeam, quote: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 text-brand-navy text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl bg-gradient-to-r from-brand-gold to-amber-600 hover:from-amber-600 hover:to-brand-gold text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 btn-shimmer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingTeamId ? 'Simpan Perubahan Anggota' : 'Tambah Anggota Tim Baru'}</span>
                </button>
              </div>
            </form>

            {/* List Anggota Tim */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
                  <User className="w-5 h-5 text-brand-gold" />
                  <span>Daftar Anggota Tim Terdaftar</span>
                </h3>
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-100 text-brand-gold border border-amber-300">
                  Total: {teamList.length} Mahasiswa
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...teamList].sort((a, b) => {
                  const divOrder = ['Ketua', 'Wakil', 'Bendahara', 'Sekretaris', 'Humas', 'Acara', 'Konsumsi', 'Logtrans', 'PDD'];
                  const rankA = divOrder.indexOf(a.division);
                  const rankB = divOrder.indexOf(b.division);
                  const safeA = rankA !== -1 ? rankA : 999;
                  const safeB = rankB !== -1 ? rankB : 999;
                  return safeA - safeB;
                }).map((item) => (
                  <div key={item.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3 relative group flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={item.photo}
                          alt={item.name}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-brand-gold/40 flex-shrink-0"
                          onError={(e) => { e.target.src = PLACEHOLDER_IMG; }}
                        />
                        <div>
                          <h4 className="text-sm font-bold text-brand-navy">{item.name}</h4>
                          <p className="text-xs font-bold text-brand-gold">{item.role}</p>
                          <span className="text-[11px] text-slate-500 font-medium">{item.major}</span>
                        </div>
                      </div>

                      {item.quote && (
                        <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100 line-clamp-2">
                          "{item.quote}"
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-slate-100 text-slate-600">
                        {item.division || 'Anggota Tim'}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStartEditTeam(item)}
                          className="p-1.5 rounded-lg bg-amber-50 text-brand-gold hover:bg-amber-100 border border-amber-200 transition-colors"
                          title="Edit Anggota"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTeam(item.id)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors"
                          title="Hapus Anggota"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
