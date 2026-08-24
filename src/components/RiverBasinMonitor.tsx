import React, { useState } from 'react';
import { 
  Waves, 
  AlertTriangle, 
  Sliders, 
  RotateCcw, 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus, 
  Activity, 
  Info,
  Building,
  CloudRain
} from 'lucide-react';
import { Language, AlertLevel, RiverStation } from '../types';
import { RIVER_STATIONS, SAN_MATEO_BARANGAYS } from '../data/drrmData';
import { translations } from '../data/translations';

interface RiverBasinMonitorProps {
  language: Language;
  currentWaterLevel: number;
  onWaterLevelChange: (level: number) => void;
  currentAlertLevel: AlertLevel;
}

export const RiverBasinMonitor: React.FC<RiverBasinMonitorProps> = ({
  language,
  currentWaterLevel,
  onWaterLevelChange,
  currentAlertLevel
}) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedStationId, setSelectedStationId] = useState<string>('sta-sm-bridge');
  const t = translations[language].river;

  const activeStation = RIVER_STATIONS.find(s => s.id === selectedStationId) || RIVER_STATIONS[0];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSimulating(true);
    onWaterLevelChange(parseFloat(e.target.value));
  };

  const handleReset = () => {
    setIsSimulating(false);
    onWaterLevelChange(13.8); // Baseline normal
  };

  const getAlertDetails = (level: number) => {
    if (level >= 18.0) {
      return {
        levelKey: 'alert3' as AlertLevel,
        badge: 'Alert 3: Forced Evacuation',
        color: 'text-red-900 bg-red-50 border-red-300 font-mono font-bold',
        barColor: 'bg-red-600',
        directive: language === 'tl' 
          ? 'SAPILITANG PAGLIKAS: Agad na pumunta sa itinalagang evacuation centers. Ihanda ang E-Balde at patayin ang kuryente.' 
          : 'MANDATORY EVACUATION: Immediate evacuation required for low-lying and riverbank zones. Relocate to designated shelters.',
        affected: ['Banaba', 'Malanday', 'Santa Ana', 'Ampid 1', 'Guitnang Bayan 1', 'Sto. Niño', 'Guinayang']
      };
    }
    if (level >= 16.0) {
      return {
        levelKey: 'alert2' as AlertLevel,
        badge: 'Alert 2: Pre-emptive Evacuation',
        color: 'text-amber-900 bg-amber-50 border-amber-300 font-mono font-bold',
        barColor: 'bg-amber-500',
        directive: language === 'tl' 
          ? 'PRE-EMPTIVE EVACUATION: Lumikas na ang mga matatanda, bata, buntis, at may kapansanan mula sa tabing-ilog.' 
          : 'PRE-EMPTIVE EVACUATION: High-risk vulnerable sectors (children, elderly, PWDs) must relocate immediately.',
        affected: ['Banaba (Riverside)', 'Malanday (Lowland)', 'Santa Ana (Parola)', 'Ampid 1 (Riverside)']
      };
    }
    if (level >= 15.0) {
      return {
        levelKey: 'alert1' as AlertLevel,
        badge: 'Alert 1: Standby Alert',
        color: 'text-yellow-900 bg-yellow-50 border-yellow-300 font-mono font-bold',
        barColor: 'bg-yellow-400',
        directive: language === 'tl' 
          ? 'STANDBY ALERT: Ihanda ang Go-Bag, i-charge ang cellphone, at patuloy na makinig sa anunsyo ng MDRRMO.' 
          : 'STANDBY ALERT: Inspect Go-Bags, charge communication devices, and monitor official barangay sirens.',
        affected: ['Banaba Lower Dike', 'Malanday Creek Alley']
      };
    }
    return {
      levelKey: 'normal' as AlertLevel,
      badge: 'Normal Safe Condition',
      color: 'text-emerald-900 bg-emerald-50 border-emerald-300 font-mono font-bold',
      barColor: 'bg-emerald-500',
      directive: language === 'tl'
        ? 'Ligtas ang antas ng tubig. Patuloy ang 24/7 telemetry monitoring ng MDRRMO.'
        : 'Water level is within safe baseline threshold. Normal continuous telemetry monitoring active.',
      affected: []
    };
  };

  const alertInfo = getAlertDetails(currentWaterLevel);
  const gaugePercent = Math.min(100, Math.max(0, ((currentWaterLevel - 10) / (20 - 10)) * 100));

  return (
    <section id="river-monitor" className="py-12 sm:py-16 bg-[#f8fafc] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 border border-sky-200 text-sky-800 text-[10px] font-bold uppercase tracking-widest mb-2">
            <Waves className="w-3.5 h-3.5 text-sky-600" />
            <span>Telemetry & Early Warning</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545] uppercase tracking-tight">
            {t.title}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Top Control: Simulation & Drill Mode Slider */}
        <div className="bg-white border-t-4 border-[#0B2545] p-5 sm:p-6 shadow-xs border-x border-b border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#0B2545] uppercase tracking-wider text-sm sm:text-base">
                  {t.drillMode}
                </h3>
                <p className="text-xs text-slate-500">
                  {t.drillDesc}
                </p>
              </div>
            </div>

            {isSimulating && (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider font-mono">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                  Simulation Active
                </span>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border border-slate-300"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset (13.8m)
                </button>
              </div>
            )}
          </div>

          {/* Interactive Range Slider */}
          <div className="mt-5 space-y-3">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span className="font-mono">10.0m (Baseline)</span>
              <span className="text-xs font-extrabold text-[#0B2545] px-3 py-1 bg-slate-50 border border-slate-300 uppercase tracking-wide">
                Current Gauge Reading: <strong className="text-[#E76F51] text-sm font-mono">{currentWaterLevel.toFixed(1)} m</strong>
              </span>
              <span className="font-mono">20.0m (Extreme)</span>
            </div>

            <input
              type="range"
              min="11.0"
              max="19.5"
              step="0.1"
              value={currentWaterLevel}
              onChange={handleSliderChange}
              className="w-full h-2.5 bg-slate-200 appearance-none cursor-pointer accent-[#E76F51]"
            />

            {/* Threshold markers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 text-[10px] sm:text-xs font-bold pt-1 gap-1.5 text-center uppercase tracking-wider">
              <div className="p-1.5 bg-emerald-50 text-emerald-900 border border-emerald-300 font-mono">
                &lt; 15.0m: Normal
              </div>
              <div className="p-1.5 bg-yellow-50 text-yellow-900 border border-yellow-300 font-mono">
                15.0m: Alert 1
              </div>
              <div className="p-1.5 bg-amber-50 text-amber-900 border border-amber-300 font-mono">
                16.0m: Alert 2
              </div>
              <div className="p-1.5 bg-red-50 text-red-900 border border-red-300 font-mono">
                18.0m+: Alert 3
              </div>
            </div>
          </div>
        </div>

        {/* Main River Telemetry Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Visual Water Level Meter */}
          <div className="bg-white border-t-4 border-[#2A9D8F] p-6 shadow-xs border-x border-b border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">
                  San Mateo Gauge
                </span>
                <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider border ${alertInfo.color}`}>
                  {alertInfo.badge}
                </span>
              </div>

              {/* Graphical Vertical / Progress Water Cylinder */}
              <div className="relative w-full h-48 bg-slate-100 border-2 border-slate-300 p-2 flex flex-col justify-end">
                {/* Horizontal reference threshold lines */}
                <div className="absolute top-[20%] left-0 right-0 border-b border-dashed border-red-500 z-20 flex justify-between px-2 text-[10px] font-bold text-red-600 font-mono">
                  <span>18.0m Alert 3</span>
                  <span>Critical</span>
                </div>
                <div className="absolute top-[40%] left-0 right-0 border-b border-dashed border-amber-500 z-20 flex justify-between px-2 text-[10px] font-bold text-amber-600 font-mono">
                  <span>16.0m Alert 2</span>
                  <span>Pre-emptive</span>
                </div>
                <div className="absolute top-[50%] left-0 right-0 border-b border-dashed border-yellow-500 z-20 flex justify-between px-2 text-[10px] font-bold text-yellow-700 font-mono">
                  <span>15.0m Alert 1</span>
                  <span>Standby</span>
                </div>

                {/* Animated Water Fill */}
                <div 
                  className={`w-full transition-all duration-500 relative ${alertInfo.barColor}`}
                  style={{ height: `${gaugePercent}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  <div className="absolute top-2 left-0 right-0 text-center font-black text-white text-base font-mono drop-shadow-md">
                    {currentWaterLevel.toFixed(1)} m
                  </div>
                </div>
              </div>
            </div>

            {/* Directive Message Box */}
            <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200">
              <div className="flex items-start gap-2 text-xs text-slate-700">
                <Info className="w-4 h-4 text-[#0B2545] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#0B2545] font-bold uppercase tracking-wider text-[11px] mb-0.5">
                    {language === 'tl' ? 'Opisyal na Tagubilin ng DRRMC:' : 'Official DRRMC Action Protocol:'}
                  </strong>
                  {alertInfo.directive}
                </div>
              </div>
            </div>

          </div>

          {/* Center Column: Station Selector & Telemetry Cards */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Station Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {RIVER_STATIONS.map((st) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedStationId(st.id)}
                  className={`p-3 text-left border transition-all cursor-pointer ${
                    selectedStationId === st.id
                      ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider opacity-80 truncate">{st.name.split('(')[0]}</div>
                  <div className="text-base font-black font-mono mt-1">
                    {st.id === 'sta-sm-bridge' ? `${currentWaterLevel.toFixed(1)}m` : `${st.currentLevelMeters}m`}
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5 text-[#2A9D8F]">
                    <Activity className="w-3 h-3" />
                    <span>Active</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Station Deep Dive */}
            <div className="bg-white border-t-4 border-[#E76F51] p-5 sm:p-6 shadow-xs border-x border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-[#0B2545] uppercase tracking-wider text-base">
                    {activeStation.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    📍 {activeStation.location}
                  </p>
                </div>
                <div className="text-right sm:text-right font-mono">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Updated: </span>
                  <span className="text-xs font-bold text-[#2A9D8F]">
                    {activeStation.lastUpdated}
                  </span>
                </div>
              </div>

              {/* Station Stats Trio */}
              <div className="grid grid-cols-3 gap-3 my-4">
                <div className="p-3 bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{t.waterLevel}</div>
                  <div className="text-lg sm:text-xl font-black font-mono text-[#0B2545] mt-0.5">
                    {selectedStationId === 'sta-sm-bridge' ? `${currentWaterLevel.toFixed(1)}m` : `${activeStation.currentLevelMeters}m`}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{t.discharge}</div>
                  <div className="text-lg sm:text-xl font-black font-mono text-[#2A9D8F] mt-0.5">
                    {activeStation.dischargeRateCumecs} m³/s
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{t.rainfall24h}</div>
                  <div className="text-lg sm:text-xl font-black font-mono text-sky-600 mt-0.5 flex items-center gap-1">
                    <CloudRain className="w-4 h-4" />
                    <span>{activeStation.rainfall24hMm} mm</span>
                  </div>
                </div>
              </div>

              {/* Impacted Barangays List for Current Level */}
              <div>
                <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-2">
                  {t.affectedBarangays}
                </h4>
                {alertInfo.affected.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {alertInfo.affected.map((brgy) => (
                      <span
                        key={brgy}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-red-100 text-red-900 border border-red-300"
                      >
                        <Building className="w-3.5 h-3.5 text-red-700" />
                        <span>Barangay {brgy}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-emerald-800 bg-emerald-50 p-2.5 border border-emerald-300 font-semibold">
                    ✅ {t.normalNotice}
                  </p>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
