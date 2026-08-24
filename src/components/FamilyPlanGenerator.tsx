import React, { useState } from 'react';
import { 
  FileText, 
  CheckSquare, 
  Square, 
  Printer, 
  Sparkles, 
  MapPin, 
  Users, 
  AlertCircle, 
  Phone, 
  Download, 
  HeartHandshake,
  ShieldCheck
} from 'lucide-react';
import { Language, GoBagItem } from '../types';
import { SAN_MATEO_BARANGAYS, GO_BAG_ITEMS } from '../data/drrmData';
import { translations } from '../data/translations';

interface FamilyPlanGeneratorProps {
  language: Language;
}

export const FamilyPlanGenerator: React.FC<FamilyPlanGeneratorProps> = ({ language }) => {
  const t = translations[language].familyPlanSection;

  const [familyName, setFamilyName] = useState('Santos');
  const [selectedBarangay, setSelectedBarangay] = useState('Banaba');
  const [homeAddress, setHomeAddress] = useState('124 Riverside St., Sitio Gulod');
  const [contactNumber, setContactNumber] = useState('0917-555-4321');
  const [membersCount, setMembersCount] = useState(4);
  const [hasInfants, setHasInfants] = useState(false);
  const [hasElderly, setHasElderly] = useState(true);
  const [hasPets, setHasPets] = useState(true);
  const [meetingPrimary, setMeetingPrimary] = useState('Banaba Multi-Purpose Covered Court');
  const [meetingSecondary, setMeetingSecondary] = useState('Kamag-anak sa Batasan Hills / Antipolo High Ground');

  const [checkedItemIds, setCheckedItemIds] = useState<string[]>([
    'item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6', 'item-7'
  ]);

  const targetBarangay = SAN_MATEO_BARANGAYS.find(b => b.name === selectedBarangay) || SAN_MATEO_BARANGAYS[0];

  const handleToggleItem = (id: string) => {
    if (checkedItemIds.includes(id)) {
      setCheckedItemIds(checkedItemIds.filter(i => i !== id));
    } else {
      setCheckedItemIds([...checkedItemIds, id]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const completionPercent = Math.round((checkedItemIds.length / GO_BAG_ITEMS.length) * 100);

  return (
    <section id="family-plan" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 print:bg-white print:py-0 print:border-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 print:hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-bold uppercase tracking-widest mb-2">
            <FileText className="w-3.5 h-3.5 text-amber-700" />
            <span>Interactive Household Preparedness</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545] uppercase tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Form Controls (Hidden during direct print) */}
          <div className="lg:col-span-6 space-y-6 print:hidden">
            
            {/* Household Info Card */}
            <div className="bg-white border-t-4 border-[#0B2545] p-6 shadow-xs border-x border-b border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
                <Users className="w-4 h-4 text-[#E76F51]" />
                <span>{t.step1}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t.familyName}
                  </label>
                  <input
                    type="text"
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs font-semibold focus:border-[#2A9D8F] focus:outline-none"
                    placeholder="Hal. Dela Cruz"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t.barangaySelect}
                  </label>
                  <select
                    value={selectedBarangay}
                    onChange={(e) => setSelectedBarangay(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs font-semibold focus:border-[#2A9D8F] focus:outline-none"
                  >
                    {SAN_MATEO_BARANGAYS.map((b) => (
                      <option key={b.code} value={b.name}>
                        Brgy. {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t.address}
                  </label>
                  <input
                    type="text"
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs font-semibold focus:border-[#2A9D8F] focus:outline-none"
                    placeholder="House No., Street / Sitio"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Emergency Phone
                  </label>
                  <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs font-semibold focus:border-[#2A9D8F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t.members}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={membersCount}
                    onChange={(e) => setMembersCount(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs font-semibold focus:border-[#2A9D8F] focus:outline-none"
                  />
                </div>
              </div>

              {/* Special needs flags */}
              <div className="pt-2 flex flex-wrap gap-2">
                <label className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border cursor-pointer transition-colors ${
                  hasInfants ? 'bg-[#0B2545] text-white border-[#0B2545]' : 'bg-slate-50 text-slate-700 border-slate-300'
                }`}>
                  <input
                    type="checkbox"
                    checked={hasInfants}
                    onChange={(e) => setHasInfants(e.target.checked)}
                    className="sr-only"
                  />
                  <span>👶 {t.hasInfants}</span>
                </label>
                <label className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border cursor-pointer transition-colors ${
                  hasElderly ? 'bg-[#0B2545] text-white border-[#0B2545]' : 'bg-slate-50 text-slate-700 border-slate-300'
                }`}>
                  <input
                    type="checkbox"
                    checked={hasElderly}
                    onChange={(e) => setHasElderly(e.target.checked)}
                    className="sr-only"
                  />
                  <span>👵 {t.hasElderly}</span>
                </label>
                <label className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border cursor-pointer transition-colors ${
                  hasPets ? 'bg-[#0B2545] text-white border-[#0B2545]' : 'bg-slate-50 text-slate-700 border-slate-300'
                }`}>
                  <input
                    type="checkbox"
                    checked={hasPets}
                    onChange={(e) => setHasPets(e.target.checked)}
                    className="sr-only"
                  />
                  <span>🐕 {t.hasPets}</span>
                </label>
              </div>
            </div>

            {/* Meeting Points Card */}
            <div className="bg-white border-t-4 border-[#2A9D8F] p-6 shadow-xs border-x border-b border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
                <MapPin className="w-4 h-4 text-[#2A9D8F]" />
                <span>{t.step2}</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t.meetingOutside}
                  </label>
                  <input
                    type="text"
                    value={meetingPrimary}
                    onChange={(e) => setMeetingPrimary(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs font-semibold focus:border-[#2A9D8F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t.meetingOutTown}
                  </label>
                  <input
                    type="text"
                    value={meetingSecondary}
                    onChange={(e) => setMeetingSecondary(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs font-semibold focus:border-[#2A9D8F] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Go Bag Checklist Card */}
            <div className="bg-white border-t-4 border-[#E76F51] p-6 shadow-xs border-x border-b border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-[#E76F51]" />
                  <span>{t.step3}</span>
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#E76F51] font-mono">{completionPercent}%</span>
                </div>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {GO_BAG_ITEMS.map((item) => {
                  const isChecked = checkedItemIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleToggleItem(item.id)}
                      className={`p-2.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-300 text-slate-900'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <button className="mt-0.5 text-emerald-600 shrink-0">
                        {isChecked ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-slate-400" />}
                      </button>
                      <div className="text-xs">
                        <div className="font-bold text-slate-800">
                          {language === 'tl' ? item.nameTl : item.nameEn}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {language === 'tl' ? item.descriptionTl : item.descriptionEn}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right / Generated Printable Summary Plan Card */}
          <div className="lg:col-span-6 sticky top-20">
            <div className="bg-white p-6 sm:p-8 shadow-xs border-2 border-slate-300 print:shadow-none print:border-2 print:border-slate-800 relative overflow-hidden border-t-4 border-t-[#2A9D8F]">
              
              {/* Official Header */}
              <div className="flex items-start justify-between pb-4 border-b-2 border-[#0B2545] mb-4">
                <div>
                  <div className="text-[10px] font-bold text-[#E76F51] uppercase tracking-widest">
                    MDRRMO San Mateo • Family Disaster Action Plan
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-[#0B2545] uppercase tracking-tight">
                    Plano ng Pamilyang {familyName.toUpperCase()}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    Brgy. {selectedBarangay}, San Mateo, Rizal 1850
                  </p>
                </div>

                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono">
                    Kabuuan: {completionPercent}%
                  </span>
                </div>
              </div>

              {/* Household Details Table */}
              <div className="grid grid-cols-2 gap-3 text-xs mb-4 bg-slate-50 p-3.5 border border-slate-200 print:bg-white">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Address:</span>
                  <strong className="text-slate-800">{homeAddress}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Contact Phone:</span>
                  <strong className="text-slate-800 font-mono">{contactNumber}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Family Members:</span>
                  <strong className="text-slate-800">{membersCount} katao</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Special Needs:</span>
                  <strong className="text-slate-800">
                    {[hasInfants && 'Infant/Child', hasElderly && 'Senior/PWD', hasPets && 'Pets'].filter(Boolean).join(', ') || 'None'}
                  </strong>
                </div>
              </div>

              {/* Evacuation Routing Card */}
              <div className="p-3.5 bg-amber-50 border border-amber-200 text-xs mb-4 space-y-1.5 print:bg-white">
                <div className="font-bold text-[#0B2545] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E76F51]" />
                  <span>Itinalagang Rutang Lilikasan:</span>
                </div>
                <div className="pl-4 text-slate-800">
                  <strong>Pangunahing Silungan:</strong> {targetBarangay.primaryEvacCenter}
                </div>
                <div className="pl-4 text-slate-800">
                  <strong>Tagpuan sa Labas:</strong> {meetingPrimary}
                </div>
                <div className="pl-4 text-slate-800">
                  <strong>Secondary Safe Point:</strong> {meetingSecondary}
                </div>
              </div>

              {/* Prepared Go-Bag Items Summary */}
              <div className="mb-4">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>{t.completedItems}</span>
                  <span className="text-emerald-700 font-mono font-bold">({checkedItemIds.length}/{GO_BAG_ITEMS.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-700">
                  {GO_BAG_ITEMS.filter(item => checkedItemIds.includes(item.id)).map(item => (
                    <div key={item.id} className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0" />
                      <span className="truncate">{language === 'tl' ? item.nameTl : item.nameEn}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Hotline Reference Box */}
              <div className="p-3 bg-[#0B2545] text-white text-[11px] flex items-center justify-between gap-2 border-t-2 border-[#2A9D8F]">
                <div>
                  <span className="font-bold text-[#2A9D8F] block uppercase tracking-wider text-[10px]">MDRRMO San Mateo 24/7 Hotline:</span>
                  <span className="font-mono text-xs">(02) 8297-8100 loc 129 / (0917) 835-1234</span>
                </div>
                <div className="text-right text-[10px] uppercase font-mono">
                  <span className="text-slate-300 block">BFP: loc 136</span>
                  <span className="text-slate-300">PNP: loc 114</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex items-center gap-3 print:hidden">
                <button
                  onClick={handlePrint}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#0B2545] hover:bg-[#134074] text-white font-bold text-xs uppercase tracking-widest shadow-xs transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t.printPlan}</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
