import React, { useState } from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  MapPin, 
  Waves, 
  BookOpen, 
  FileText, 
  Bot, 
  Menu, 
  X, 
  Globe2, 
  AlertTriangle,
  Radio
} from 'lucide-react';
import { Language, AlertLevel } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currentAlertLevel: AlertLevel;
  onOpenAiAdvisor: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  currentAlertLevel,
  onOpenAiAdvisor
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[language];

  const getAlertBadge = () => {
    switch (currentAlertLevel) {
      case 'alert3':
        return { text: 'Alert 3: Forced Evac', bg: 'bg-red-600 text-white animate-pulse' };
      case 'alert2':
        return { text: 'Alert 2: Pre-emptive', bg: 'bg-amber-600 text-white' };
      case 'alert1':
        return { text: 'Alert 1: Standby', bg: 'bg-yellow-400 text-slate-900 font-bold' };
      default:
        return { text: 'Normal Condition', bg: 'bg-emerald-600 text-white' };
    }
  };

  const alertBadge = getAlertBadge();

  return (
    <header className="sticky top-0 z-40 bg-[#0B2545] text-white shadow-md border-b-4 border-[#2A9D8F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Seal Branding */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#2A9D8F] flex items-center justify-center font-bold text-lg text-white tracking-wider shadow-xs group-hover:bg-[#238276] transition-colors shrink-0">
              SM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold leading-none tracking-tight text-white">
                  SAN MATEO <span className="text-[#2A9D8F]">DRRM HUB</span>
                </h1>
                <span className="text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wider bg-[#E76F51] text-white">
                  DRRMC
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-300 font-medium hidden sm:block mt-1 opacity-80">
                Disaster Risk Reduction & Management
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs font-bold uppercase tracking-wider text-slate-200">
            <a 
              href="#home" 
              className="py-1 hover:text-white hover:border-b-2 hover:border-[#2A9D8F] transition-all"
            >
              {t.nav.home}
            </a>
            <a 
              href="#river-monitor" 
              className="py-1 hover:text-white hover:border-b-2 hover:border-[#2A9D8F] transition-all flex items-center gap-1.5"
            >
              <Waves className="w-3.5 h-3.5 text-[#2A9D8F]" />
              {t.nav.riverMonitor}
            </a>
            <a 
              href="#map-section" 
              className="py-1 hover:text-white hover:border-b-2 hover:border-[#2A9D8F] transition-all flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {t.nav.map}
            </a>
            <a 
              href="#hotlines" 
              className="py-1 hover:text-white hover:border-b-2 hover:border-[#2A9D8F] transition-all flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#E76F51]" />
              {t.nav.hotlines}
            </a>
            <a 
              href="#family-plan" 
              className="py-1 hover:text-white hover:border-b-2 hover:border-[#2A9D8F] transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              {t.nav.familyPlan}
            </a>
            <a 
              href="#pillars" 
              className="py-1 hover:text-white hover:border-b-2 hover:border-[#2A9D8F] transition-all"
            >
              {t.nav.pillars}
            </a>
            <a 
              href="#resources" 
              className="py-1 hover:text-white hover:border-b-2 hover:border-[#2A9D8F] transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-teal-400" />
              {t.nav.resources}
            </a>
          </nav>

          {/* Right Action Tools: Language Toggle + AI Advisor Button */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Switcher */}
            <button
              onClick={() => onLanguageChange(language === 'tl' ? 'en' : 'tl')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Palitan ang Wika / Switch Language"
            >
              <Globe2 className="w-3.5 h-3.5 text-[#2A9D8F]" />
              <span>{language === 'tl' ? 'English' : 'Tagalog'}</span>
            </button>

            {/* AI Advisor Modal Trigger */}
            <button
              onClick={onOpenAiAdvisor}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest bg-[#2A9D8F] hover:bg-[#238276] text-white shadow-xs transition-all cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>{t.nav.aiAdvisor}</span>
            </button>

            {/* Quick Hotline Dial */}
            <a
              href="tel:0282978100"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-[#E76F51] hover:bg-[#d45e41] text-white shadow-xs font-mono transition-colors"
            >
              <PhoneCall className="w-3 h-3 animate-pulse" />
              <span>(02) 8297-8100</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onLanguageChange(language === 'tl' ? 'en' : 'tl')}
              className="px-2 py-1 text-xs font-semibold rounded bg-slate-800 text-slate-200"
            >
              {language === 'tl' ? 'EN' : 'TL'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0a1e38] border-t border-slate-800 px-4 pt-3 pb-6 space-y-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
            <span className="text-slate-400">San Mateo Alert Level:</span>
            <span className={`px-2 py-0.5 rounded font-bold ${alertBadge.bg}`}>
              {alertBadge.text}
            </span>
          </div>

          <a 
            href="#home" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
          >
            {t.nav.home}
          </a>
          <a 
            href="#river-monitor" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
          >
            {t.nav.riverMonitor}
          </a>
          <a 
            href="#map-section" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
          >
            {t.nav.map}
          </a>
          <a 
            href="#hotlines" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
          >
            {t.nav.hotlines}
          </a>
          <a 
            href="#family-plan" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
          >
            {t.nav.familyPlan}
          </a>
          <a 
            href="#reports-section" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
          >
            {t.nav.reports}
          </a>
          <a 
            href="#pillars" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
          >
            {t.nav.pillars}
          </a>
          <a 
            href="#resources" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
          >
            {t.nav.resources}
          </a>

          <div className="pt-3 space-y-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAiAdvisor();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#E76F51] text-white font-bold text-sm"
            >
              <Bot className="w-4 h-4" />
              {t.nav.aiAdvisor}
            </button>
            <a
              href="tel:0282978100"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-600 text-white font-bold text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              MDRRMO: (02) 8297-8100 loc 129
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
