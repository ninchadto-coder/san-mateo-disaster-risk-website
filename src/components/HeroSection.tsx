import React from 'react';
import { 
  PhoneCall, 
  MapPin, 
  FileText, 
  Bot, 
  ShieldCheck, 
  Waves, 
  Building2, 
  Clock 
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeroSectionProps {
  language: Language;
  onOpenAiAdvisor: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onOpenAiAdvisor
}) => {
  const t = translations[language].hero;

  return (
    <section 
      id="home" 
      className="relative overflow-hidden bg-slate-100 text-[#1e293b] py-12 sm:py-16 border-b border-slate-300"
    >
      {/* Geometric Angle Decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-slate-200/70 -mr-24 -mt-24 rotate-45 pointer-events-none border border-slate-300/40" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#2A9D8F]/10 -ml-16 -mb-16 rotate-45 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Geometric Content Box */}
        <div className="bg-white p-6 sm:p-10 border border-slate-200 relative overflow-hidden shadow-xs mb-8">
          {/* Rotated corner accent */}
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#0B2545]/5 -mr-14 -mt-14 rotate-45 pointer-events-none" />

          <div className="max-w-3xl">
            {/* DRRMC Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-300 text-slate-700 text-[10px] font-bold uppercase tracking-widest mb-4">
              <span className="w-2 h-2 bg-[#E76F51]"></span>
              <span>MDRRMC • Municipality of San Mateo, Rizal</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2545] leading-tight mb-4 uppercase tracking-tight">
              {language === 'tl' ? (
                <>Pagtatag ng Matatag na<br /><span className="text-[#2A9D8F]">Pamayanan sa San Mateo</span></>
              ) : (
                <>Building a Resilient<br /><span className="text-[#2A9D8F]">Community in San Mateo</span></>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 max-w-2xl text-sm sm:text-base mb-8 leading-relaxed font-normal">
              {t.subtitle}
            </p>

            {/* Action Button Cluster */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#reports-section"
                className="bg-[#0B2545] hover:bg-[#134074] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors shadow-xs"
              >
                {language === 'tl' ? 'Mag-ulat ng Insidente' : 'Report Incident'}
              </a>

              <a
                href="#river-monitor"
                className="border-2 border-[#0B2545] text-[#0B2545] hover:bg-[#0B2545] hover:text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors"
              >
                {language === 'tl' ? 'Tuklasin ang Datos' : 'Explore Data'}
              </a>

              <a
                href="#hotlines"
                className="bg-[#E76F51] hover:bg-[#d45e41] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{t.btnHotlines}</span>
              </a>

              <button
                onClick={onOpenAiAdvisor}
                className="bg-[#2A9D8F] hover:bg-[#238276] text-white px-5 py-3 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>{t.btnAiGuide}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          <div className="bg-white border-t-4 border-[#2A9D8F] p-5 shadow-xs border-x border-b border-slate-200">
            <p className="text-[10px] font-bold text-[#2A9D8F] mb-1 uppercase tracking-wider">Metriko 01</p>
            <div className="text-2xl sm:text-3xl font-black text-[#0B2545]">15</div>
            <div className="text-xs text-slate-500 font-medium uppercase tracking-tight mt-1">{t.metricBarangays}</div>
          </div>

          <div className="bg-white border-t-4 border-[#134074] p-5 shadow-xs border-x border-b border-slate-200">
            <p className="text-[10px] font-bold text-[#134074] mb-1 uppercase tracking-wider">Metriko 02</p>
            <div className="text-2xl sm:text-3xl font-black text-[#0B2545]">4</div>
            <div className="text-xs text-slate-500 font-medium uppercase tracking-tight mt-1">{t.metricSensors}</div>
          </div>

          <div className="bg-white border-t-4 border-[#E76F51] p-5 shadow-xs border-x border-b border-slate-200">
            <p className="text-[10px] font-bold text-[#E76F51] mb-1 uppercase tracking-wider">Metriko 03</p>
            <div className="text-2xl sm:text-3xl font-black text-[#0B2545]">18</div>
            <div className="text-xs text-slate-500 font-medium uppercase tracking-tight mt-1">{t.metricEvac}</div>
          </div>

          <div className="bg-white border-t-4 border-slate-800 p-5 shadow-xs border-x border-b border-slate-200">
            <p className="text-[10px] font-bold text-slate-700 mb-1 uppercase tracking-wider">Metriko 04</p>
            <div className="text-2xl sm:text-3xl font-black text-[#0B2545] font-mono">24/7</div>
            <div className="text-xs text-slate-500 font-medium uppercase tracking-tight mt-1">{t.metricMdrrmo}</div>
          </div>
        </div>

      </div>
    </section>
  );
};
