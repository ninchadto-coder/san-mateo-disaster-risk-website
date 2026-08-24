import React from 'react';
import { ShieldAlert, PhoneCall, MapPin, ArrowUp, Heart } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language].nav;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B2545] text-white/80 pt-12 pb-8 border-t-4 border-[#2A9D8F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/10">
          
          {/* Col 1: Branding & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#2A9D8F] flex items-center justify-center font-bold text-sm text-white">
                SM
              </div>
              <span className="font-bold text-base tracking-tight text-white uppercase">
                San Mateo <span className="text-[#2A9D8F]">DRRM Hub</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dedicated to building a disaster-resilient, climate-adaptive, and empowered community across all 15 barangays of San Mateo, Rizal.
            </p>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
              RA 10121 (DRRM ACT) • RA 9729 (CLIMATE ACT)
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-xs text-white mb-3 uppercase tracking-widest border-b border-[#2A9D8F] pb-1 inline-block">
              {language === 'tl' ? 'Mabilis na Link' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li><a href="#river-monitor" className="hover:text-[#2A9D8F] transition-colors">{t.riverMonitor}</a></li>
              <li><a href="#map-section" className="hover:text-[#2A9D8F] transition-colors">{t.map}</a></li>
              <li><a href="#hotlines" className="hover:text-[#2A9D8F] transition-colors">{t.hotlines}</a></li>
              <li><a href="#family-plan" className="hover:text-[#2A9D8F] transition-colors">{t.familyPlan}</a></li>
              <li><a href="#reports-section" className="hover:text-[#2A9D8F] transition-colors">{t.reports}</a></li>
              <li><a href="#pillars" className="hover:text-[#2A9D8F] transition-colors">{t.pillars}</a></li>
              <li><a href="#resources" className="hover:text-[#2A9D8F] transition-colors">{t.resources}</a></li>
            </ul>
          </div>

          {/* Col 3: Emergency Contacts */}
          <div>
            <h4 className="font-bold text-xs text-white mb-3 uppercase tracking-widest border-b border-[#2A9D8F] pb-1 inline-block">
              {language === 'tl' ? 'Emergency Dispatch' : 'Emergency Hotlines'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#E76F51]"></span>
                <span>MDRRMO: <strong>(02) 8297-8100 loc 129</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-orange-400"></span>
                <span>BFP Fire: <strong>(02) 8297-8100 loc 136</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-sky-400"></span>
                <span>PNP Police: <strong>(02) 8297-8100 loc 114</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#2A9D8F]"></span>
                <span>MHO / EMS: <strong>(02) 8297-8100 loc 121</strong></span>
              </li>
              <li className="text-[10px] uppercase tracking-wider text-slate-400 pt-1">
                24/7 Mobile: 0917-835-1234
              </li>
            </ul>
          </div>

          {/* Col 4: Municipal Headquarters */}
          <div>
            <h4 className="font-bold text-xs text-white mb-3 uppercase tracking-widest border-b border-[#2A9D8F] pb-1 inline-block">
              {language === 'tl' ? 'Pamahalaang Bayan' : 'Municipal Hall'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
              <span>Gen. Luna Ave., Brgy. Guitnang Bayan 1, San Mateo, Rizal 1850, Philippines</span>
            </p>
            <div className="mt-4">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider text-white border border-white/20 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>{language === 'tl' ? 'Bumalik sa Itaas' : 'Back to Top'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Copyright & Disclaimer Line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] uppercase tracking-wider text-slate-400">
          <p className="font-mono">
            &copy; 2026 SAN MATEO RIZAL DRRM HUB • RESILIENCE THROUGH DATA & CITIZEN ACTION
          </p>
          <p className="text-slate-400">
            PROVINCE OF RIZAL • REGION IV-A CALABARZON
          </p>
        </div>

      </div>
    </footer>
  );
};
