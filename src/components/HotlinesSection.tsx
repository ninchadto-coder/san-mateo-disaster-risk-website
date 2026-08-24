import React, { useState } from 'react';
import { 
  PhoneCall, 
  Copy, 
  Check, 
  MapPin, 
  ShieldAlert, 
  Flame, 
  ShieldCheck, 
  Car, 
  HeartPulse, 
  ExternalLink,
  Clock
} from 'lucide-react';
import { Language, EmergencyContact } from '../types';
import { EMERGENCY_CONTACTS } from '../data/drrmData';
import { translations } from '../data/translations';

interface HotlinesSectionProps {
  language: Language;
}

export const HotlinesSection: React.FC<HotlinesSectionProps> = ({ language }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const t = translations[language].hotlinesSection;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fire':
        return <Flame className="w-4 h-4 text-[#E76F51]" />;
      case 'police':
        return <ShieldCheck className="w-4 h-4 text-[#134074]" />;
      case 'traffic':
        return <Car className="w-4 h-4 text-amber-600" />;
      case 'health':
        return <HeartPulse className="w-4 h-4 text-[#2A9D8F]" />;
      default:
        return <ShieldAlert className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <section id="hotlines" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 border border-red-300 text-red-800 text-[10px] font-bold uppercase tracking-widest mb-2">
            <PhoneCall className="w-3.5 h-3.5 text-red-600" />
            <span>24/7 First Responders</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545] uppercase tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Hotlines Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {EMERGENCY_CONTACTS.map((contact, index) => {
            const isPrimaryMdrrmc = contact.id === 'mdrrmo-ops';

            return (
              <div
                key={contact.id}
                className={`p-6 shadow-xs border-x border-b border-slate-200 flex flex-col justify-between ${
                  isPrimaryMdrrmc 
                    ? 'bg-[#0B2545] text-white border-t-4 border-[#2A9D8F]' 
                    : 'bg-white text-slate-900 border-t-4 border-[#E76F51]'
                }`}
              >
                <div>
                  {/* Card Top */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 shrink-0 ${isPrimaryMdrrmc ? 'bg-white/10' : 'bg-slate-100'}`}>
                        {getCategoryIcon(contact.category)}
                      </div>
                      <div>
                        <h3 className={`font-bold text-sm sm:text-base leading-tight uppercase tracking-tight ${isPrimaryMdrrmc ? 'text-white' : 'text-slate-900'}`}>
                          {contact.agency}
                        </h3>
                        <p className={`text-xs mt-0.5 ${isPrimaryMdrrmc ? 'text-slate-300' : 'text-slate-500'}`}>
                          {contact.role}
                        </p>
                      </div>
                    </div>

                    {contact.is24_7 && (
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                        isPrimaryMdrrmc ? 'bg-[#2A9D8F] text-white' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {t.twentyFourSeven}
                      </span>
                    )}
                  </div>

                  {/* Numbers List */}
                  <div className="space-y-2 mt-4">
                    {/* Landline */}
                    <div className={`flex items-center justify-between p-3 border ${
                      isPrimaryMdrrmc ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                          isPrimaryMdrrmc ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          Trunkline / Direct:
                        </span>
                        <span className={`text-sm sm:text-base font-bold font-mono ${
                          isPrimaryMdrrmc ? 'text-white' : 'text-[#0B2545]'
                        }`}>
                          {contact.landline} {contact.localExt && <span className="text-[#E76F51]">loc. {contact.localExt}</span>}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopy(`${contact.landline} local ${contact.localExt || ''}`, `${contact.id}-landline`)}
                          className={`p-1.5 transition-colors ${
                            isPrimaryMdrrmc ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-200'
                          }`}
                          title={t.copyNumber}
                        >
                          {copiedId === `${contact.id}-landline` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <a
                          href={`tel:${contact.landline.replace(/[^0-9]/g, '')}`}
                          className="px-3 py-1 bg-[#E76F51] hover:bg-[#d45e41] text-white font-bold text-xs uppercase tracking-wider transition-colors"
                        >
                          {t.callNow}
                        </a>
                      </div>
                    </div>

                    {/* Mobile Numbers */}
                    {contact.mobileNumbers && contact.mobileNumbers.length > 0 && (
                      <div className={`p-3 border ${
                        isPrimaryMdrrmc ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                          isPrimaryMdrrmc ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          Mobile Emergency Dispatch:
                        </span>
                        <div className="space-y-1.5">
                          {contact.mobileNumbers.map((num, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs font-mono">
                              <span className={`font-semibold ${isPrimaryMdrrmc ? 'text-slate-200' : 'text-slate-800'}`}>{num}</span>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleCopy(num, `${contact.id}-mob-${idx}`)}
                                  className={`p-1 ${isPrimaryMdrrmc ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'}`}
                                  title={t.copyNumber}
                                >
                                  {copiedId === `${contact.id}-mob-${idx}` ? (
                                    <Check className="w-3 h-3 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                                <a
                                  href={`tel:${num.replace(/[^0-9]/g, '')}`}
                                  className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                    isPrimaryMdrrmc ? 'bg-[#2A9D8F] text-white hover:bg-[#238276]' : 'bg-slate-800 hover:bg-slate-900 text-white'
                                  }`}
                                >
                                  Call
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Address */}
                <div className={`mt-4 pt-3 border-t text-[11px] flex items-start gap-1.5 ${
                  isPrimaryMdrrmc ? 'border-white/10 text-slate-400' : 'border-slate-100 text-slate-500'
                }`}>
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-75" />
                  <span className="truncate">{contact.address}</span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Official Municipal Hall Address Banner */}
        <div className="bg-[#0B2545] text-white p-6 sm:p-8 shadow-xs border-t-4 border-[#2A9D8F] text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-[#2A9D8F] text-[10px] font-bold uppercase tracking-widest mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t.municipalHallTitle}</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
              Pamahalaang Bayan ng San Mateo
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              {t.municipalHallAddress}
            </p>
          </div>

          <a
            href="https://maps.google.com/?q=San+Mateo+Municipal+Hall+Gen+Luna+Ave+Guitnang+Bayan+1+San+Mateo+Rizal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0B2545] hover:bg-slate-100 font-bold text-xs uppercase tracking-widest shadow-xs transition-colors shrink-0"
          >
            <span>{t.openInMaps}</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#2A9D8F]" />
          </a>
        </div>

      </div>
    </section>
  );
};
