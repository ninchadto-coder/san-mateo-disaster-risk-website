import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Leaf, 
  Users2, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Award,
  Sprout,
  Activity
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface PillarsSectionProps {
  language: Language;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({ language }) => {
  const [expandedPillar, setExpandedPillar] = useState<number | null>(0);
  const t = translations[language].pillarsSection;

  const pillarsData = [
    {
      id: 0,
      pillarTag: 'Pilar 01',
      topBorder: 'border-[#E76F51]',
      tagColor: 'text-[#E76F51]',
      title: t.drrTitle,
      subtitle: t.drrDesc,
      icon: <ShieldAlert className="w-5 h-5 text-[#E76F51]" />,
      badge: 'Mitigation & Hydrology',
      items: [
        'Marikina & San Mateo River basin telemetry monitoring with DOST-PAGASA',
        'Local hazard mapping & 3D inundation depth modeling for 15 barangays',
        'Early warning sirens with telemetry triggered automatically at 15.0m level',
        'Vulnerability assessments & no-build easement enforcement along riverbanks',
        'Annual desilting and culvert widening in Guitnang Bayan and Banaba'
      ],
      currentInitiatives: [
        { name: 'Operation Bantay-Ilog 2026', status: 'Active Telemetry', target: 'River Corridor' },
        { name: 'Automated Dike Early Warning Sirens', status: '100% Operational', target: 'Banaba, Malanday, Ampid' }
      ]
    },
    {
      id: 1,
      pillarTag: 'Pilar 02',
      topBorder: 'border-[#2A9D8F]',
      tagColor: 'text-[#2A9D8F]',
      title: t.climateTitle,
      subtitle: t.climateDesc,
      icon: <Leaf className="w-5 h-5 text-[#2A9D8F]" />,
      badge: 'Urban & Ecological',
      items: [
        'Urban heat island (UHI) reduction research and pocket park expansion',
        'Luntiang San Mateo: 25,000 native endemic trees (Banaba, Narra) planted',
        'Solid waste segregation and anti-littering waterway bio-barriers',
        'Slope bioengineering with Vetiver grass and gabions in Sitio Patiis',
        'Solar-powered emergency lighting and rainwater harvesting systems'
      ],
      currentInitiatives: [
        { name: 'Sierra Madre Ridge Watershed Re-greening', status: 'Ongoing Phase 3', target: 'Pintong Bukawe' },
        { name: 'Creek Bio-Fencing & Trash Trap Netting', status: 'Deployed', target: 'Maly & Guinayang' }
      ]
    },
    {
      id: 2,
      pillarTag: 'Pilar 03',
      topBorder: 'border-[#134074]',
      tagColor: 'text-[#134074]',
      title: t.extensionTitle,
      subtitle: t.extensionDesc,
      icon: <Users2 className="w-5 h-5 text-[#134074]" />,
      badge: 'Capacity & Drills',
      items: [
        'Quarterly Barangay simultaneous flood evacuation and earthquake drills',
        'Water Search and Rescue (WASAR) & First Aid capacity training for 450 volunteers',
        'Distribution of family "E-Balde" emergency Go-Bag kits to high-risk households',
        'School-based disaster risk reduction curriculum with DepEd San Mateo',
        'Inclusive DRRM protocols specialized for senior citizens, PWDs, and infants'
      ],
      currentInitiatives: [
        { name: 'Q3 Municipal Flood & Earthquake Drill', status: 'Scheduled Nov 2026', target: 'All 15 Barangays' },
        { name: 'Barangay Responders WASAR Certification', status: 'Completed', target: '300 Tanods & Volunteers' }
      ]
    }
  ];

  return (
    <section id="pillars" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-300 text-slate-700 text-[10px] font-bold uppercase tracking-widest mb-2">
            <Award className="w-3.5 h-3.5 text-[#2A9D8F]" />
            <span>Strategic Framework</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545] uppercase tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pillarsData.map((pillar) => {
            const isExpanded = expandedPillar === pillar.id;

            return (
              <div
                key={pillar.id}
                className={`bg-white border-t-4 ${pillar.topBorder} p-6 shadow-xs border-x border-b border-slate-200 flex flex-col justify-between`}
              >
                <div>
                  {/* Top Tag & Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold ${pillar.tagColor} uppercase tracking-widest`}>
                      {pillar.pillarTag}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 uppercase tracking-wider">
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-[#0B2545] mb-2 leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                    {pillar.subtitle}
                  </p>

                  {/* Core List Items */}
                  <ul className="space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-4">
                    {pillar.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#2A9D8F] font-bold text-base leading-none">•</span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Expandable Active Initiatives */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-2.5">
                      <div className="text-[11px] font-bold text-[#0B2545] uppercase tracking-wider flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-[#E76F51]" />
                        <span>Flagship Projects:</span>
                      </div>
                      {pillar.currentInitiatives.map((init, i) => (
                        <div key={i} className="p-2.5 bg-slate-50 border border-slate-200 text-xs">
                          <div className="font-bold text-slate-900">{init.name}</div>
                          <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
                            <span>Target: <strong>{init.target}</strong></span>
                            <span className="text-emerald-700 font-bold bg-white px-2 py-0.5 border border-slate-200">
                              {init.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Expansion Toggle Button */}
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => setExpandedPillar(isExpanded ? null : pillar.id)}
                    className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider border border-slate-200 transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? t.hideDetails : t.viewDetails}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
