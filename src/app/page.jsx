'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SplashScreen from '@/components/SplashScreen';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';

const LOADING_SPINNER = (
  <div className="py-24 flex flex-col items-center justify-center space-y-3">
    <div className="w-14 h-14 border-4 border-amber-200/50 border-t-brand-gold rounded-full animate-spin shadow-gold" />
    <span className="text-xs font-bold text-slate-400 animate-pulse">Memuat konten...</span>
  </div>
);

// Lazy load below-fold sections to reduce initial JS bundle
const ProkerSection = dynamic(() => import('@/components/ProkerSection'), { loading: () => LOADING_SPINNER });
const GallerySection = dynamic(() => import('@/components/GallerySection'), { loading: () => LOADING_SPINNER });
const NewsSection = dynamic(() => import('@/components/NewsSection'), { loading: () => LOADING_SPINNER });
const ModulSection = dynamic(() => import('@/components/ModulSection'), { loading: () => LOADING_SPINNER });
const ContactSection = dynamic(() => import('@/components/ContactSection'), { loading: () => LOADING_SPINNER });
const Footer = dynamic(() => import('@/components/Footer'));

import { INITIAL_DATA } from '@/data/initialData';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [villageInfo] = useState(INITIAL_DATA.villageInfo);
  const [prokerList, setProkerList] = useState(INITIAL_DATA.prokerList);
  const [galleryList, setGalleryList] = useState(INITIAL_DATA.galleryList);
  const [newsList, setNewsList] = useState(INITIAL_DATA.newsList || []);
  const [modulesList, setModulesList] = useState(INITIAL_DATA.modulesList || []);
  const [teamMembers, setTeamMembers] = useState(INITIAL_DATA.teamMembers);

  // Sync data with localStorage (from Admin edits) and Supabase
  useEffect(() => {
    // 1. Read from localStorage for local mode edits from Admin
    try {
      const localProker = localStorage.getItem('kkn_proker_list');
      const localGallery = localStorage.getItem('kkn_gallery_list');
      const localNews = localStorage.getItem('kkn_news_list');
      const localModules = localStorage.getItem('kkn_modules_list');
      const localTeam = localStorage.getItem('kkn_team_list');

      if (localProker) setProkerList(JSON.parse(localProker));
      if (localGallery) setGalleryList(JSON.parse(localGallery));
      if (localNews) setNewsList(JSON.parse(localNews));
      if (localModules) setModulesList(JSON.parse(localModules));
      if (localTeam) setTeamMembers(JSON.parse(localTeam));
    } catch (e) {
      console.warn("Gagal membaca cache localStorage:", e);
    }

    // 2. Fetch Live Data from Supabase if Configured
    async function loadSupabaseData() {
      if (!isSupabaseConfigured || !supabase) return;
      try {
        const [prokerRes, galleryRes, newsRes, modulesRes, teamRes] = await Promise.all([
          supabase.from('proker').select('*').order('created_at', { ascending: false }).limit(20),
          supabase.from('gallery').select('*').order('created_at', { ascending: false }).limit(30),
          supabase.from('news').select('*').order('created_at', { ascending: false }).limit(10),
          supabase.from('modules').select('*').order('created_at', { ascending: true }).limit(10),
          supabase.from('team_members').select('*').order('created_at', { ascending: true })
        ]);

        if (prokerRes.data && !prokerRes.error) {
          setProkerList(prokerRes.data);
          localStorage.setItem('kkn_proker_list', JSON.stringify(prokerRes.data));
        }
        if (galleryRes.data && !galleryRes.error) {
          setGalleryList(galleryRes.data);
          localStorage.setItem('kkn_gallery_list', JSON.stringify(galleryRes.data));
        }
        if (newsRes.data && !newsRes.error) {
          setNewsList(newsRes.data);
          localStorage.setItem('kkn_news_list', JSON.stringify(newsRes.data));
        }
        if (modulesRes.data && !modulesRes.error) {
          setModulesList(modulesRes.data);
          localStorage.setItem('kkn_modules_list', JSON.stringify(modulesRes.data));
        }
        if (teamRes.data && !teamRes.error) {
          setTeamMembers(teamRes.data);
          localStorage.setItem('kkn_team_list', JSON.stringify(teamRes.data));
        }
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

          {/* Berita & Kabar KKN */}
          <NewsSection newsList={newsList} />

          {/* Modul & Panduan Edukasi */}
          <ModulSection modulesList={modulesList} />

          {/* Contact & Map Section */}
          <ContactSection villageInfo={villageInfo} />

          {/* Footer */}
          <Footer villageInfo={villageInfo} />
        </div>
      )}

    </main>
  );
}
