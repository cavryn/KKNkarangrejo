'use client';
import { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProkerSection from '@/components/ProkerSection';
import GallerySection from '@/components/GallerySection';
import ArticlesSection from '@/components/ArticlesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

import { INITIAL_DATA } from '@/data/initialData';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [villageInfo] = useState(INITIAL_DATA.villageInfo);
  const [prokerList, setProkerList] = useState(INITIAL_DATA.prokerList);
  const [galleryList, setGalleryList] = useState(INITIAL_DATA.galleryList);
  const [articlesList, setArticlesList] = useState(INITIAL_DATA.articlesList);
  const [teamMembers] = useState(INITIAL_DATA.teamMembers);

  // Fetch Live Data from Supabase if Configured
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
