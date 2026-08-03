'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProkerSection from '@/components/ProkerSection';
import GallerySection from '@/components/GallerySection';
import ArticlesSection from '@/components/ArticlesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

import { INITIAL_DATA } from '@/data/initialData';

export default function Home() {
  const [villageInfo] = useState(INITIAL_DATA.villageInfo);
  const [prokerList] = useState(INITIAL_DATA.prokerList);
  const [galleryList] = useState(INITIAL_DATA.galleryList);
  const [articlesList] = useState(INITIAL_DATA.articlesList);
  const [teamMembers] = useState(INITIAL_DATA.teamMembers);

  return (
    <main className="min-h-screen bg-slate-50 text-brand-navy relative overflow-hidden">
      
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

    </main>
  );
}
