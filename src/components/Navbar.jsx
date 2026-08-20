'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Beranda', href: '#beranda', id: 'beranda' },
  { name: 'Tentang Kami', href: '#tentang', id: 'tentang' },
  { name: 'Tim Anggota', href: '#anggota', id: 'anggota' },
  { name: 'Program Kerja', href: '#proker', id: 'proker' },
  { name: 'Dokumentasi', href: '#dokumentasi', id: 'dokumentasi' },
  { name: 'Berita', href: '#berita', id: 'berita' },
  { name: 'Modul Edukasi', href: '#modul', id: 'modul' },
  { name: 'Kontak', href: '#kontak', id: 'kontak' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const pathname = usePathname();

  // Scroll detector for Navbar background styling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync active section with current page pathname
  useEffect(() => {
    if (pathname === '/anggota') {
      setActiveSection('anggota');
    }
  }, [pathname]);

  // Active section detection using scroll position check on homepage
  useEffect(() => {
    if (pathname !== '/') return;

    const handleSectionScroll = () => {
      const sectionIds = navLinks.map(l => l.id);
      const scrollPosition = window.scrollY + 250;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const absoluteTop = el.getBoundingClientRect().top + window.pageYOffset;
          if (scrollPosition >= absoluteTop) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleSectionScroll, { passive: true });
    handleSectionScroll();

    return () => window.removeEventListener('scroll', handleSectionScroll);
  }, [pathname]);

  const handleNavClick = (e, id, href) => {
    if (pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }

    e.preventDefault();
    setActiveSection(id);
    setMobileMenuOpen(false);

    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${isScrolled
        ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 py-2.5 shadow-navy'
        : 'bg-white/80 backdrop-blur-md py-4 border-b border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">

          {/* Logo — using Next.js Image for optimization */}
          <a href="#beranda" onClick={(e) => handleNavClick(e, 'beranda', '#beranda')} className="flex items-center gap-3 group flex-shrink-0">
            <div className="h-10 sm:h-11 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo/KKNteks.png"
                alt="Logo KKN Karangrejo"
                width={160}
                height={44}
                className="h-10 sm:h-11 w-auto object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block border-l border-slate-200 pl-3">
              <div className="text-xs font-extrabold text-brand-navy tracking-tight uppercase leading-tight">
                Kelompok 3 • Karangrejo
              </div>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wide">Ujungpangkah, Kab. Gresik</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 px-3 py-1.5 rounded-full border border-slate-200/80">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id, link.href)}
                  className={`relative px-3.5 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${isActive
                    ? 'bg-brand-gold text-white shadow-gold'
                    : 'text-brand-navy hover:text-brand-gold hover:bg-white'
                    }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-brand-navy hover:bg-slate-100 border border-slate-200 transition-colors"
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            >
              {mobileMenuOpen
                ? <X className="w-5 h-5" />
                : <Menu className="w-5 h-5" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-slide-down bg-white border-t border-slate-200 shadow-navy-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id, link.href)}
                  style={{ animationDelay: `${idx * 50}ms` }}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all animate-fade-in ${isActive
                    ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/30 font-bold'
                    : 'text-brand-navy hover:bg-slate-50 hover:text-brand-gold'
                    }`}
                >
                  {isActive && <span className="w-2 h-2 rounded-full bg-brand-gold flex-shrink-0" />}
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
