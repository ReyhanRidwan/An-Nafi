import React, { useState, useEffect } from 'react';
import { Compass, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navbar({ currentTab, onTabChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if header should be transparent (Kondisi 1)
  // Transparent only when we are on 'home' and have not scrolled
  const isTransparent = currentTab === 'home' && !isScrolled;

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'packages', label: 'PACKAGES' },
    { id: 'why', label: 'WHY US' },
    { id: 'galery', label: 'GALLERY' },
    { id: 'open-trip', label: 'OPEN TRIP' },
    { id: 'private-trip', label: 'PRIVATE TRIP' },
  ];

  const handleNavClick = (tabId: string) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
    // Automatic scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent border-transparent py-6'
          : 'bg-stone-900/95 backdrop-blur-md border-b border-stone-800 py-4 shadow-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img 
            src="https://res.cloudinary.com/di6ziqvtp/image/upload/v1783322977/1563e4c7-4c01-40ec-ac41-a1a6a7772691.png"
            alt="An nafi Logo"
            className={`object-contain transition-all duration-300 ${
              isTransparent ? 'h-9 w-auto' : 'h-10 w-auto'
            }`}
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-white tracking-wider leading-none text-base uppercase">
              An nafi
            </span>
            <span className="text-[9px] font-sans text-stone-400 tracking-widest mt-0.5 uppercase">
              Premium Tour & Travel
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-all duration-300 cursor-pointer ${
                  isTransparent
                    ? `text-[11px] font-normal tracking-widest hover:text-amber-400 ${
                        isActive ? 'text-amber-500 font-medium' : 'text-white'
                      }`
                    : `text-xs font-semibold tracking-wider hover:text-amber-500 ${
                        isActive ? 'text-amber-500' : 'text-stone-300'
                      }`
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Toggle Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:text-amber-500 transition-colors p-1"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-b border-stone-850 px-6 py-4 absolute top-full left-0 right-0 shadow-xl z-30">
          <div className="flex flex-col gap-4 py-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-xs font-semibold tracking-wider py-2 transition-all uppercase ${
                    isActive ? 'text-amber-500 border-l-2 border-amber-500 pl-2' : 'text-stone-300 pl-2'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
