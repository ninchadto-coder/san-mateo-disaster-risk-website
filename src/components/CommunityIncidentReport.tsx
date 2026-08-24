import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Send, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Flame, 
  Waves, 
  TreePine, 
  AlertOctagon, 
  PlusCircle, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Language, CommunityIncidentReport as IncidentReportType } from '../types';
import { SAN_MATEO_BARANGAYS } from '../data/drrmData';
import { translations } from '../data/translations';

interface CommunityIncidentReportProps {
  language: Language;
}

export const CommunityIncidentReport: React.FC<CommunityIncidentReportProps> = ({ language }) => {
  const [reports, setReports] = useState<IncidentReportType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  // Form State
  const [barangay, setBarangay] = useState('Banaba');
  const [incidentType, setIncidentType] = useState<IncidentReportType['incidentType']>('flooding');
  const [locationDetail, setLocationDetail] = useState('');
  const [description, setDescription] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [urgency, setUrgency] = useState<IncidentReportType['urgency']>('high');
  const [waterDepth, setWaterDepth] = useState<number>(30);

  const t = translations[language].incidentSection;

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/reports');
      if (res.ok) {
        const data = await res.json();
        setReports(data.reports || []);
      }
    } catch (err) {
      console.warn('Failed to load live reports, using baseline', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !locationDetail.trim()) return;

    try {
      setIsSubmitting(true);
      const payload = {
        barangay,
        incidentType,
        locationDetail,
        description,
        reporterName,
        contactNumber,
        urgency,
        waterLevelDepthCm: incidentType === 'flooding' ? waterDepth : undefined,
      };

      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.report) {
          setReports([data.report, ...reports]);
        }
        setSuccessToast(true);
        setDescription('');
        setLocationDetail('');
        setShowForm(false);
        setTimeout(() => setSuccessToast(false), 5000);
      }
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIncidentBadge = (type: string) => {
    switch (type) {
      case 'flooding':
        return { label: 'Flooding', icon: <Waves className="w-3.5 h-3.5 text-sky-600" />, bg: 'bg-sky-50 text-sky-900 border-sky-300' };
      case 'landslide':
        return { label: 'Landslide', icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />, bg: 'bg-amber-50 text-amber-900 border-amber-300' };
      case 'fallen_tree':
        return { label: 'Fallen Tree', icon: <TreePine className="w-3.5 h-3.5 text-emerald-600" />, bg: 'bg-emerald-50 text-emerald-900 border-emerald-300' };
      case 'rescue_needed':
        return { label: 'Rescue Request', icon: <AlertOctagon className="w-3.5 h-3.5 text-red-600" />, bg: 'bg-red-50 text-red-900 border-red-300 font-bold' };
      default:
        return { label: 'Incident', icon: <AlertTriangle className="w-3.5 h-3.5 text-slate-600" />, bg: 'bg-slate-50 text-slate-900 border-slate-300' };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300">Verified by MDRRMO</span>;
      case 'dispatching':
        return <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">Responder En Route</span>;
      case 'resolved':
        return <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-300">Resolved</span>;
      default:
        return <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-yellow-100 text-yellow-900 border border-yellow-300">Pending Review</span>;
    }
  };

  return (
    <section id="reports-section" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-200 text-rose-800 text-[10px] font-bold uppercase tracking-widest mb-2">
              <MessageSquare className="w-3.5 h-3.5 text-rose-600" />
              <span>Community Early Warning Dispatch</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545] uppercase tracking-tight">
              {t.title}
            </h2>
            <p className="mt-1 text-slate-600 text-sm">
              {t.subtitle}
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#E76F51] hover:bg-[#d05c3f] text-white font-bold text-xs uppercase tracking-widest shadow-xs transition-colors cursor-pointer self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{showForm ? 'Cancel Report' : t.reportBtn}</span>
          </button>
        </div>

        {/* Success Toast Notification */}
        {successToast && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center gap-3 shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{t.successMsg}</span>
          </div>
        )}

        {/* Expandable Incident Submission Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-10 bg-slate-50 border-t-4 border-[#0B2545] p-6 sm:p-8 border-x border-b border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#0B2545] uppercase tracking-wider pb-3 border-b border-slate-200">
              {t.formTitle}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Barangay
                </label>
                <select
                  value={barangay}
                  onChange={(e) => setBarangay(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 text-xs font-semibold focus:border-[#2A9D8F] focus:outline-none"
                >
                  {SAN_MATEO_BARANGAYS.map((b) => (
                    <option key={b.code} value={b.name}>
                      Brgy. {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t.incidentType}
                </label>
                <select
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 text-xs font-semibold focus:border-[#2A9D8F] focus:outline-none"
                >
                  <option value="flooding">{t.flooding}</option>
                  <option value="landslide">{t.landslide}</option>
                  <option value="fallen_tree">{t.fallen_tree}</option>
                  <option value="clogged_canal">{t.clogged_canal}</option>
                  <option value="rescue_needed">{t.rescue_needed}</option>
                  <option value="medical">{t.medical}</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t.urgency}
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 text-xs font-semibold focus:border-[#2A9D8F] focus:outline-none"
                >
                  <option value="low">Low (For monitoring)</option>
                  <option value="medium">Medium (Requires attention)</option>
                  <option value="high">High (Flooding / Road blockage)</option>
                  <option value="critical">Critical (Immediate Rescue Needed)</option>
                </select>
              </div>

              <div className="sm:col-span-2 lg:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t.locationDetail}
                </label>
                <input
                  type="text"
                  required
                  placeholder="Hal. Kambal Road tapat ng Covered Court o Purok 3 Riverside"
                  value={locationDetail}
                  onChange={(e) => setLocationDetail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 text-xs font-semibold focus:border-[#2A9D8F] focus:outline-none"
                />
              </div>

              {incidentType === 'flooding' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tinatayang Taas ng Tubig ({waterDepth} cm)
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    step="5"
                    value={waterDepth}
                    onChange={(e) => setWaterDepth(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-[#E76F51]"
                  />
                  <div className="text-[10px] text-slate-500 mt-1 flex justify-between font-mono">
                    <span>Gulong (15cm)</span>
                    <span>Tuhod (45cm)</span>
                    <span>Baywang (90cm+)</span>
                  </div>
                </div>
              )}

              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t.desc}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ilarawan ang sitwasyon, bilang ng naapektuhang bahay, o partikular na tulong na kailangan..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 text-xs font-semibold focus:border-[#2A9D8F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t.reporter}
                </label>
                <input
                  type="text"
                  placeholder="Pangalan (Opsyonal)"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 text-xs font-semibold focus:border-[#2A9D8F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t.contact}
                </label>
                <input
                  type="text"
                  placeholder="Hal. 0917-xxx-xxxx"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 text-xs font-semibold focus:border-[#2A9D8F] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B2545] hover:bg-[#134074] text-white font-bold text-xs uppercase tracking-widest shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? t.submitting : t.submit}</span>
              </button>
            </div>
          </form>
        )}

        {/* Live Incident Reports Feed Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
            <span>{t.recentReports}</span>
            <span className="font-mono text-[10px] text-slate-400">Live Broadcast Feed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((rep) => {
              const badge = getIncidentBadge(rep.incidentType);

              return (
                <div
                  key={rep.id}
                  className="p-5 bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header line */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${badge.bg}`}>
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>
                      {getStatusBadge(rep.status)}
                    </div>

                    <h4 className="font-bold text-[#0B2545] text-sm">
                      Brgy. {rep.barangay} • <span className="font-normal text-slate-600 text-xs">{rep.locationDetail}</span>
                    </h4>

                    <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                      {rep.description}
                    </p>

                    {rep.waterLevelDepthCm && (
                      <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 text-[10px] font-bold uppercase tracking-wider font-mono">
                        <span>Depth: ~{rep.waterLevelDepthCm} cm water level</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Reported by: <strong className="text-slate-800">{rep.reporterName}</strong></span>
                    <span className="flex items-center gap-1 font-mono text-[10px]">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {new Date(rep.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
