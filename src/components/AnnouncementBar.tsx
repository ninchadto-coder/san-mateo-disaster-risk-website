import React from 'react';
import { AlertCircle, Radio, PhoneCall, Volume2, VolumeX, ShieldAlert } from 'lucide-react';
import { Language, AlertLevel } from '../types';
import { translations } from '../data/translations';

interface AnnouncementBarProps {
  language: Language;
  currentAlertLevel: AlertLevel;
  currentWaterLevel: number;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  language,
  currentAlertLevel,
  currentWaterLevel
}) => {
  const t = translations[language].announcement;

  const getAlertConfig = () => {
    switch (currentAlertLevel) {
      case 'alert3':
        return {
          bg: 'bg-red-700 text-white',
          text: t.alert3,
          dot: 'bg-white animate-ping',
          urgent: true,
          actionNotice: 'MANDATORY FORCED EVACUATION in low-lying riverside areas!'
        };
      case 'alert2':
        return {
          bg: 'bg-amber-600 text-white',
          text: t.alert2,
          dot: 'bg-yellow-200 animate-pulse',
          urgent: true,
          actionNotice: 'Pre-emptive evacuation underway for Banaba, Malanday, & Ampid riverside.'
        };
      case 'alert1':
        return {
          bg: 'bg-amber-500 text-slate-950 font-bold',
          text: t.alert1,
          dot: 'bg-slate-950',
          urgent: false,
          actionNotice: 'Standby mode: Keep emergency Go-Bags accessible.'
        };
      default:
        return {
          bg: 'bg-[#E76F51] text-white',
          text: t.normal,
          dot: 'bg-emerald-300',
          urgent: false,
          actionNotice: null
        };
    }
  };

  const config = getAlertConfig();

  return (
    <aside aria-label="Disaster Announcement Bar" className={`${config.bg} px-4 py-2 sm:py-2.5 transition-colors duration-500 shadow-xs border-b border-black/10`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-semibold tracking-wide">
        
        {/* Live Status indicator */}
        <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-xs"></div>
            <span className="uppercase tracking-wider font-bold text-[11px] sm:text-xs">
              {t.statusLabel}: <span className="font-extrabold">{config.text}</span>
            </span>
          </div>

          {config.actionNotice && (
            <span className="hidden md:inline-block px-2 py-0.5 bg-black/20 text-white font-bold text-[11px] uppercase tracking-wider">
              ⚠️ {config.actionNotice}
            </span>
          )}
        </div>

        {/* Action Link to Hotlines and River Monitor */}
        <div className="flex items-center gap-3">
          <a
            href="#river-monitor"
            className="flex items-center gap-1.5 opacity-90 hover:opacity-100 text-[11px] font-mono font-bold uppercase tracking-wider text-white"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>RIVER: {currentWaterLevel.toFixed(1)}M</span>
          </a>

          <span className="bg-white text-[#E76F51] px-2 py-0.5 text-[10px] font-black uppercase tracking-widest shadow-2xs">
            LIVE UPDATES
          </span>

          <a
            href="#hotlines"
            className="flex items-center gap-1 px-2.5 py-0.5 bg-slate-900/40 hover:bg-slate-900/60 text-white font-bold text-[11px] uppercase tracking-wider border border-white/20 transition-colors"
          >
            <PhoneCall className="w-3 h-3" />
            <span>{t.fastHotline}</span>
          </a>
        </div>

      </div>
    </aside>
  );
};
