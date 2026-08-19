'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SplashScreen from '@/components/SplashScreen';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';

// Lazy load below-fold sections to reduce initial JS bundle
const ProkerSection = dynamic(() => import('@/components/ProkerSection'), {
  loading: () => <div className="py-20 flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" /></div>,
});
const GallerySection = dynamic(() => import('@/components/GallerySection'), {
  loading: () => <div className="py-20 flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" /></div>,
});
const ArticlesSection = dynamic(() => import('@/components/ArticlesSection'), {
  loading: () => <div className="py-20 flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" /></div>,
});
const ContactSection = dynamic(() => import('@/components/ContactSection'), {
  loading: () => <div className="py-20 flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" /></div>,
});
const Footer = dynamic(() => import('@/components/Footer'));

import { INITIAL_DATA } from '@/data/initialData';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [villageInfo] = useState(INITIAL_DATA.villageInfo);
  const [prokerList, setProkerList] = useState(INITIAL_DATA.prokerList);
  const [galleryList, setGalleryList] = useState(INITIAL_DATA.galleryList);
  const [articlesList, setArticlesList] = useState(INITIAL_DATA.articlesList);
  const [teamMembers, setTeamMembers] = useState(INITIAL_DATA.teamMembers);

  // Sync data with localStorage (from Admin edits) and Supabase
  useEffect(() => {
    // 1. Read from localStorage for local mode edits from Admin
    try {
      const localProker = localStorage.getItem('kkn_proker_list');
      const localGallery = localStorage.getItem('kkn_gallery_list');
      const localArticles = localStorage.getItem('kkn_articles_list');
      const localTeam = localStorage.getItem('kkn_team_list');

      if (localProker) setProkerList(JSON.parse(localProker));
      if (localGallery) setGalleryList(JSON.parse(localGallery));
      if (localArticles) setArticlesList(JSON.parse(localArticles));
      if (localTeam) setTeamMembers(JSON.parse(localTeam));
    } catch (e) {
      console.warn("Gagal membaca cache localStorage:", e);
    }

    // 2. Fetch Live Data from Supabase if Configured
    async function loadSupabaseData() {
      if (!isSupabaseConfigured || !supabase) return;
      try {
        const [prokerRes, galleryRes, articlesRes, teamRes] = await Promise.all([
          supabase.from('proker').select('*').order('created_at', { ascending: false }).limit(20),
          supabase.from('gallery').select('*').order('created_at', { ascending: false }).limit(30),
          supabase.from('articles').select('*').order('created_at', { ascending: false }).limit(10),
          supabase.from('team_members').select('*').order('created_at', { ascending: true })
        ]);

        if (prokerRes.data && prokerRes.data.length > 0) setProkerList(prokerRes.data);
        if (galleryRes.data && galleryRes.data.length > 0) setGalleryList(galleryRes.data);
        if (articlesRes.data && articlesRes.data.length > 0) setArticlesList(articlesRes.data);
        if (teamRes.data && teamRes.data.length > 0) setTeamMembers(teamRes.data);
      } catch (err) {
        console.warn("Sinkronisasi Supabase di Homepage menggunakan fallback data lokal:", err);
      }
    }
    loadSupabaseData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-brand-navy relative overflow-hidden">

      {/* Splash Screen Animation Intro */}
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <div className="animate-fade-in">
          {/* Sticky Glass Navbar */}
          <Navbar />

          {/* Hero Banner with Stats */}
          <HeroSection villageInfo={villageInfo} />

          {/* Profile Village & Team */}
          <AboutSection villageInfo={villageInfo} teamMembers={teamMembers} />

          {/* Proker Cards Grid & Filter */}
          <ProkerSection prokerList={prokerList} />

          {/* Documentation Gallery & Lightbox */}
          <GallerySection galleryList={galleryList} />

          {/* Module & Article Reader */}
          <ArticlesSection articlesList={articlesList} />

          {/* Contact & Map Section */}
          <ContactSection villageInfo={villageInfo} />

          {/* Footer */}
          <Footer villageInfo={villageInfo} />
        </div>
      )}

    </main>
  );
}
