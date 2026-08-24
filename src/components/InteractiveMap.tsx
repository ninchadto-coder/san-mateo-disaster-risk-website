import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  Layers, 
  Navigation, 
  Building, 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  Phone, 
  Compass, 
  CheckCircle2, 
  Waves
} from 'lucide-react';
import { Language, BarangayInfo, EvacuationCenter, RiverStation } from '../types';
import { SAN_MATEO_BARANGAYS, EVACUATION_CENTERS, RIVER_STATIONS } from '../data/drrmData';
import { translations } from '../data/translations';

interface InteractiveMapProps {
  language: Language;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ language }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);

  const [selectedBarangay, setSelectedBarangay] = useState<string>('all');
  const [selectedEvacCenter, setSelectedEvacCenter] = useState<EvacuationCenter | null>(EVACUATION_CENTERS[0]);
  const [activeLayer, setActiveLayer] = useState<'all' | 'flood' | 'landslide' | 'evac'>('all');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const t = translations[language].mapSection;

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Prevent double init

    // Center on San Mateo, Rizal
    const sanMateoCenter: [number, number] = [14.6961, 121.1219];
    const map = L.map(mapContainerRef.current, {
      center: sanMateoCenter,
      zoom: 13,
      zoomControl: true,
    });

    // CartoDB Positron / OpenStreetMap high contrast clean tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    markersGroupRef.current = markersGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers & Polygons when filters change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;

    const group = markersGroupRef.current;
    group.clearLayers();

    // 1. Add Evacuation Centers
    if (activeLayer === 'all' || activeLayer === 'evac') {
      EVACUATION_CENTERS.forEach((center) => {
        if (selectedBarangay !== 'all' && center.barangay !== selectedBarangay) return;

        const iconHtml = `
          <div style="background-color: #2A9D8F; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-evac-marker',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -16],
        });

        const marker = L.marker(center.coordinates, { icon: customIcon });
        marker.bindPopup(`
          <div style="padding: 4px; font-family: sans-serif;">
            <h4 style="margin: 0 0 4px 0; color: #0B2545; font-weight: bold; font-size: 14px;">${center.name}</h4>
            <p style="margin: 0 0 6px 0; color: #666; font-size: 11px;">📍 ${center.address}</p>
            <div style="font-size: 11px; margin-bottom: 6px;">
              <strong>Capacity:</strong> ${center.capacityPersons} persons | <strong>Status:</strong> Standby
            </div>
            <p style="margin: 0; font-size: 11px; color: #2A9D8F; font-weight: bold;">Camp Mgr: ${center.contactPerson} (${center.contactNumber})</p>
          </div>
        `);

        marker.on('click', () => {
          setSelectedEvacCenter(center);
        });

        group.addLayer(marker);
      });
    }

    // 2. Add River Gauges
    if (activeLayer === 'all' || activeLayer === 'flood') {
      RIVER_STATIONS.forEach((station) => {
        const gaugeIconHtml = `
          <div style="background-color: #0B2545; color: white; width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid #0284c7; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5"><path d="M2 12h20M2 6h20M2 18h20"></path></svg>
          </div>
        `;

        const gaugeIcon = L.divIcon({
          html: gaugeIconHtml,
          className: 'custom-gauge-marker',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          popupAnchor: [0, -15],
        });

        const marker = L.marker([station.id === 'sta-sm-bridge' ? 14.6961 : station.id === 'sta-ampid' ? 14.6865 : station.id === 'sta-banaba' ? 14.6750 : 14.7200, 121.1219], { icon: gaugeIcon });
        marker.bindPopup(`
          <div style="padding: 4px; font-family: sans-serif;">
            <h4 style="margin: 0 0 4px 0; color: #0B2545; font-weight: bold; font-size: 13px;">🌊 ${station.name}</h4>
            <p style="margin: 0; font-size: 12px; color: #0369a1; font-weight: bold;">Current Level: ${station.currentLevelMeters}m</p>
            <p style="margin: 2px 0 0 0; font-size: 10px; color: #64748b;">Thresholds: 15m (Alert 1) / 16m (Alert 2) / 18m (Alert 3)</p>
          </div>
        `);
        group.addLayer(marker);
      });
    }

    // 3. Add Barangay Boundary Circles & Hazard Highlights
    SAN_MATEO_BARANGAYS.forEach((brgy) => {
      if (selectedBarangay !== 'all' && brgy.name !== selectedBarangay) return;

      const isHighFlood = brgy.floodRisk === 'Very High' || brgy.floodRisk === 'High';
      const isHighLandslide = brgy.landslideRisk === 'High';

      let circleColor = '#2A9D8F';
      if (activeLayer === 'flood' || (activeLayer === 'all' && isHighFlood)) {
        circleColor = '#E76F51';
      } else if (activeLayer === 'landslide' || isHighLandslide) {
        circleColor = '#d97706';
      }

      const circle = L.circle(brgy.coordinates, {
        color: circleColor,
        fillColor: circleColor,
        fillOpacity: 0.15,
        radius: 650,
        weight: 2,
      });

      circle.bindPopup(`
        <div style="font-family: sans-serif; padding: 2px;">
          <h4 style="margin: 0 0 4px 0; color: #0B2545; font-weight: bold; font-size: 13px;">Barangay ${brgy.name}</h4>
          <p style="margin: 0 0 4px 0; font-size: 11px;">Pop: <strong>${brgy.population.toLocaleString()}</strong></p>
          <div style="font-size: 11px; margin-bottom: 4px;">
            <span style="color: ${brgy.floodRisk === 'Very High' ? '#dc2626' : '#d97706'}; font-weight: bold;">Flood Risk: ${brgy.floodRisk}</span><br/>
            <span style="color: ${brgy.landslideRisk === 'High' ? '#ea580c' : '#16a34a'}; font-weight: bold;">Landslide Risk: ${brgy.landslideRisk}</span>
          </div>
          <p style="margin: 0; font-size: 10px; color: #64748b;">Primary Shelter: ${brgy.primaryEvacCenter}</p>
        </div>
      `);

      group.addLayer(circle);
    });

  }, [activeLayer, selectedBarangay]);

  // Geolocation Handler
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(coords);

        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo(coords, 15);

          const userIconHtml = `
            <div style="background-color: #3b82f6; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.4); animation: pulse 2s infinite;"></div>
          `;
          const userIcon = L.divIcon({
            html: userIconHtml,
            className: 'user-loc-marker',
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          });

          L.marker(coords, { icon: userIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup('<strong>📍 You are here</strong>')
            .openPopup();
        }
      },
      (err) => {
        console.warn('Geolocation failed or denied:', err);
        // Default to San Mateo Municipal Hall
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([14.6961, 121.1219], 14);
        }
      }
    );
  };

  const handleBarangaySelect = (name: string) => {
    setSelectedBarangay(name);
    if (name === 'all') {
      mapInstanceRef.current?.flyTo([14.6961, 121.1219], 13);
    } else {
      const found = SAN_MATEO_BARANGAYS.find((b) => b.name === name);
      if (found && mapInstanceRef.current) {
        mapInstanceRef.current.flyTo(found.coordinates, 15);
      }
    }
  };

  return (
    <section id="map-section" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold uppercase tracking-widest mb-2">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>GIS Hazard & Shelter Mapping</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545] uppercase tracking-tight">
              {t.title}
            </h2>
            <p className="mt-1 text-slate-600 text-sm">
              {t.subtitle}
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleLocateMe}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0B2545] hover:bg-[#134074] text-white font-bold text-xs uppercase tracking-widest shadow-xs transition-colors cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{t.locateMe}</span>
            </button>

            <select
              value={selectedBarangay}
              onChange={(e) => handleBarangaySelect(e.target.value)}
              aria-label="Filter by Barangay"
              className="px-3 py-2 bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold uppercase tracking-wider focus:outline-none focus:border-[#2A9D8F]"
            >
              <option value="all">{t.filterAll}</option>
              {SAN_MATEO_BARANGAYS.map((b) => (
                <option key={b.code} value={b.name}>
                  Brgy. {b.name} ({b.floodRisk} Flood Risk)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Layer Toggles Pill Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button
            onClick={() => setActiveLayer('all')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
              activeLayer === 'all'
                ? 'bg-[#0B2545] text-white border-[#0B2545]'
                : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            All Layers
          </button>
          <button
            onClick={() => setActiveLayer('flood')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1 border ${
              activeLayer === 'flood'
                ? 'bg-[#E76F51] text-white border-[#E76F51]'
                : 'bg-orange-50 text-[#E76F51] border-orange-200 hover:bg-orange-100'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            <span>{t.layerFlood}</span>
          </button>
          <button
            onClick={() => setActiveLayer('landslide')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1 border ${
              activeLayer === 'landslide'
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{t.layerLandslide}</span>
          </button>
          <button
            onClick={() => setActiveLayer('evac')}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1 border ${
              activeLayer === 'evac'
                ? 'bg-[#2A9D8F] text-white border-[#2A9D8F]'
                : 'bg-emerald-50 text-[#2A9D8F] border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>{t.layerEvac}</span>
          </button>
        </div>

        {/* Map + Detail Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Map Viewport Canvas */}
          <div className="lg:col-span-2 relative h-[420px] sm:h-[480px] overflow-hidden shadow-xs border-2 border-slate-300">
            <div ref={mapContainerRef} className="w-full h-full" />
            
            {/* Map Legend Overlay */}
            <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur-xs p-3 border border-slate-300 text-[11px] space-y-1.5 hidden sm:block shadow-xs">
              <div className="font-bold text-[#0B2545] uppercase tracking-wider text-[10px] mb-1">Map Legend</div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#2A9D8F] inline-block"></span>
                <span>Evacuation Center (Ready)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#E76F51] inline-block"></span>
                <span>High Flood Zone (Riverside)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-amber-500 inline-block"></span>
                <span>Landslide Slope Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#0B2545] inline-block"></span>
                <span>River Telemetry Gauge</span>
              </div>
            </div>
          </div>

          {/* Right Column: Selected Evacuation Center / Barangay Profile */}
          <div className="bg-slate-50 border-t-4 border-[#2A9D8F] p-5 sm:p-6 border-x border-b border-slate-200 shadow-xs flex flex-col justify-between">
            {selectedEvacCenter ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300">
                    🟢 Standby Ready
                  </span>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Brgy. {selectedEvacCenter.barangay}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#0B2545] uppercase tracking-wide leading-snug">
                    {selectedEvacCenter.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    📍 {selectedEvacCenter.address}
                  </p>
                </div>

                {/* Capacity Card */}
                <div className="grid grid-cols-2 gap-2.5 p-3 bg-white border border-slate-200">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{t.capacity}</div>
                    <div className="text-lg font-black font-mono text-[#0B2545]">
                      {selectedEvacCenter.capacityPersons.toLocaleString()} <span className="text-xs font-normal text-slate-500">pax</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{t.occupants}</div>
                    <div className="text-lg font-black font-mono text-emerald-600">
                      {selectedEvacCenter.currentOccupants} <span className="text-xs font-normal text-slate-500">pax</span>
                    </div>
                  </div>
                </div>

                {/* Facilities List */}
                <div>
                  <div className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mb-2">
                    {t.amenities}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedEvacCenter.amenities.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-white text-slate-700 border border-slate-200"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#2A9D8F]" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Camp Manager Contact */}
                <div className="p-3 bg-sky-50 border border-sky-200 text-xs text-sky-900">
                  <div className="font-bold uppercase tracking-wider text-[11px]">{t.contact}: {selectedEvacCenter.contactPerson}</div>
                  <div className="flex items-center gap-1.5 mt-1 font-semibold text-sky-800 font-mono">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedEvacCenter.contactNumber}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-sm">
                Click any evacuation center icon on the map to view facility details and capacity.
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 mt-4">
              <a
                href="#family-plan"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-[#2A9D8F] hover:bg-[#238276] text-white font-bold text-xs uppercase tracking-widest transition-colors shadow-xs"
              >
                <span>Add this shelter to your Family Emergency Plan</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
