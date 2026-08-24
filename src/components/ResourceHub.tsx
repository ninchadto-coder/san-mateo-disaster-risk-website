import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Download, 
  FileText, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Language, ResearchPaper } from '../types';
import { RESEARCH_PAPERS } from '../data/drrmData';
import { translations } from '../data/translations';

interface ResourceHubProps {
  language: Language;
}

export const ResourceHub: React.FC<ResourceHubProps> = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedPaperId, setExpandedPaperId] = useState<string | null>(RESEARCH_PAPERS[0].id);
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const t = translations[language].resourcesSection;

  const categories = ['all', 'Flood Modeling', 'Urban Heat & Climate', 'Landslide Analysis', 'Community DRRM'];

  const filteredPapers = RESEARCH_PAPERS.filter((paper) => {
    const matchesCat = selectedCategory === 'all' || paper.category === selectedCategory;
    const matchesSearch = 
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleDownload = (id: string, title: string) => {
    setDownloadedId(id);
    const content = `SAN MATEO DRRM & CLIMATE RESILIENCE HUB
RESEARCH PAPER EXECUTIVE BRIEF
=====================================================
Title: ${title}
Source: San Mateo DRRMC Research Unit & DOST-PAGASA
Date of Retrieval: ${new Date().toLocaleDateString()}
=====================================================

This brief contains key empirical findings, flood modeling benchmarks, and municipal ordinance recommendations adopted by the Sangguniang Bayan of San Mateo, Rizal.

For full research copies and GIS shapefiles, contact:
MDRRMO Research Division: mdrrmo.sanmateo@rizal.gov.ph`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SanMateo_DRRM_${id}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloadedId(null), 3000);
  };

  return (
    <section id="resources" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-300 text-slate-700 text-[10px] font-bold uppercase tracking-widest mb-2">
            <BookOpen className="w-3.5 h-3.5 text-[#2A9D8F]" />
            <span>Academic Research & Policy Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545] uppercase tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Quick Resource Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="bg-white border-t-4 border-[#E76F51] p-6 shadow-xs border-x border-b border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-[#E76F51] uppercase tracking-widest mb-1">Official Document</div>
              <h4 className="font-bold text-[#0B2545] text-base leading-tight">
                Family Emergency Preparedness Plan (Tagalog/English)
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Step-by-step household action card, E-Balde kit checklist, and evacuation routes.
              </p>
            </div>
            <a
              href="#family-plan"
              className="mt-5 inline-flex items-center justify-between px-4 py-2.5 bg-[#0B2545] hover:bg-[#134074] text-white font-bold text-xs uppercase tracking-widest transition-colors"
            >
              <span>{language === 'tl' ? 'Buksan ang Tool' : 'Open Generator'}</span>
              <FileText className="w-4 h-4 text-amber-400" />
            </a>
          </div>

          <div className="bg-white border-t-4 border-[#2A9D8F] p-6 shadow-xs border-x border-b border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-[#2A9D8F] uppercase tracking-widest mb-1">Cartographic Atlas</div>
              <h4 className="font-bold text-[#0B2545] text-base leading-tight">
                San Mateo Hazard & Designated Evacuation Map
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Interactive GIS spatial map with high-risk flood zones and 18 shelter locations.
              </p>
            </div>
            <a
              href="#map-section"
              className="mt-5 inline-flex items-center justify-between px-4 py-2.5 bg-[#2A9D8F] hover:bg-[#238276] text-white font-bold text-xs uppercase tracking-widest transition-colors"
            >
              <span>{language === 'tl' ? 'Tingnan ang Mapa' : 'View GIS Map'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-white border-t-4 border-[#134074] p-6 shadow-xs border-x border-b border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-[#134074] uppercase tracking-widest mb-1">Health Guideline</div>
              <h4 className="font-bold text-[#0B2545] text-base leading-tight">
                Leptospirosis & Flood Water Contamination Advisory
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                DOH protocol on prophylaxis, wound hygiene, and immediate medical intervention.
              </p>
            </div>
            <button
              onClick={() => handleDownload('res-lepto-guide', 'Leptospirosis & Waterborne Disease Prevention Protocol')}
              className="mt-5 inline-flex items-center justify-between px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
            >
              <span>{language === 'tl' ? 'I-download ang Gabay' : 'Download Guide'}</span>
              <Download className="w-4 h-4 text-sky-400" />
            </button>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-slate-100 p-4 sm:p-5 border border-slate-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 text-xs font-semibold focus:border-[#2A9D8F] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0B2545] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? t.filterAll : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Research Papers Accordion List */}
        <div className="space-y-4">
          {filteredPapers.map((paper) => {
            const isExpanded = expandedPaperId === paper.id;

            return (
              <div
                key={paper.id}
                className="bg-white p-5 sm:p-6 shadow-xs border border-slate-200 hover:border-slate-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-800 uppercase tracking-wider border border-slate-200">
                        {paper.category}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        {paper.institution} • {paper.year}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#0B2545] leading-snug">
                      {paper.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      Authors: <span className="text-slate-800">{paper.authors}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleDownload(paper.id, paper.title)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-200 transition-colors cursor-pointer"
                    >
                      {downloadedId === paper.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Downloaded</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5 text-[#2A9D8F]" />
                          <span>{paper.fileSize}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setExpandedPaperId(isExpanded ? null : paper.id)}
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-colors cursor-pointer"
                      title="Toggle Abstract & Key Findings"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Abstract and Findings */}
                {isExpanded && (
                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-4">
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Abstract:
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 border border-slate-200">
                        {paper.abstract}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Key Empirical Findings:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {paper.keyFindings.map((finding, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#2A9D8F] font-bold text-base leading-none">•</span>
                            <span className="leading-snug">{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold uppercase tracking-wider text-[10px]">{t.policyBadge}:</strong> {paper.policyImpact}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
