import { BarangayInfo, EvacuationCenter, RiverStation, EmergencyContact, ResearchPaper, GoBagItem } from '../types';

export const SAN_MATEO_BARANGAYS: BarangayInfo[] = [
  {
    name: 'Ampid 1',
    code: 'AMP1',
    population: 34210,
    floodRisk: 'High',
    landslideRisk: 'Low',
    primaryEvacCenter: 'Ampid 1 Elementary School & Covered Court',
    coordinates: [14.6865, 121.1185],
    vulnerablePuroks: ['Purok Riverside', 'Sitio Balite', 'Kambal Road Lowland'],
    chairperson: 'PB Ferdinand Diaz',
    hotline: '(02) 8297-8100 loc 201'
  },
  {
    name: 'Ampid 2',
    code: 'AMP2',
    population: 26890,
    floodRisk: 'High',
    landslideRisk: 'Low',
    primaryEvacCenter: 'Ampid National High School Gymnasium',
    coordinates: [14.6812, 121.1210],
    vulnerablePuroks: ['Greenland Subd. Creek Area', 'Purok 5 Riverway'],
    chairperson: 'PB Maria Teresa Cruz',
    hotline: '(02) 8297-8100 loc 202'
  },
  {
    name: 'Banaba',
    code: 'BNB',
    population: 32450,
    floodRisk: 'Very High',
    landslideRisk: 'Low',
    primaryEvacCenter: 'Banaba Evacuation Center & Multi-Purpose Complex',
    coordinates: [14.6750, 121.1120],
    vulnerablePuroks: ['Armscor Compound Riverside', 'Sitio Gulod Creek', 'Purok 1 & 2 Dike Area'],
    chairperson: 'PB Eduardo Santos',
    hotline: '(02) 8297-8100 loc 203'
  },
  {
    name: 'Dulong Bayan 1',
    code: 'DB1',
    population: 18450,
    floodRisk: 'Medium',
    landslideRisk: 'Low',
    primaryEvacCenter: 'Dulong Bayan 1 Covered Court',
    coordinates: [14.6985, 121.1190],
    vulnerablePuroks: ['Gen. Luna Extension', 'Sitio Wawa'],
    chairperson: 'PB Carlos Mendoza',
    hotline: '(02) 8297-8100 loc 204'
  },
  {
    name: 'Dulong Bayan 2',
    code: 'DB2',
    population: 14780,
    floodRisk: 'Medium',
    landslideRisk: 'Low',
    primaryEvacCenter: 'Dulong Bayan 2 Multi-Purpose Hall',
    coordinates: [14.7040, 121.1175],
    vulnerablePuroks: ['Purok Riverside North', 'Ilaya Creek'],
    chairperson: 'PB Roberto Garcia',
    hotline: '(02) 8297-8100 loc 205'
  },
  {
    name: 'Guinayang',
    code: 'GNY',
    population: 22100,
    floodRisk: 'High',
    landslideRisk: 'Low',
    primaryEvacCenter: 'Guinayang National High School',
    coordinates: [14.7085, 121.1240],
    vulnerablePuroks: ['Sitio Ilaya', 'Guinayang Riverbed Alley'],
    chairperson: 'PB Noel Bautista',
    hotline: '(02) 8297-8100 loc 206'
  },
  {
    name: 'Guitnang Bayan 1',
    code: 'GB1',
    population: 31200,
    floodRisk: 'High',
    landslideRisk: 'Low',
    primaryEvacCenter: 'San Mateo Elementary School / Municipal Gymnasium',
    coordinates: [14.6961, 121.1219],
    vulnerablePuroks: ['P. Burgos Riverside', 'Public Market Peripheral Zone'],
    chairperson: 'PB Arthur Valerio',
    hotline: '(02) 8297-8100 loc 207'
  },
  {
    name: 'Guitnang Bayan 2',
    code: 'GB2',
    population: 19800,
    floodRisk: 'Medium',
    landslideRisk: 'Low',
    primaryEvacCenter: 'Guitnang Bayan 2 Covered Court',
    coordinates: [14.6940, 121.1270],
    vulnerablePuroks: ['Sta. Ines Corridor', 'Sitio Malalim'],
    chairperson: 'PB Danilo Rivera',
    hotline: '(02) 8297-8100 loc 208'
  },
  {
    name: 'Malanday',
    code: 'MLD',
    population: 28900,
    floodRisk: 'Very High',
    landslideRisk: 'Low',
    primaryEvacCenter: 'Malanday National High School',
    coordinates: [14.6890, 121.1140],
    vulnerablePuroks: ['Sitio Libis', 'Malanday Dike West', 'Purok 4 Low Ground'],
    chairperson: 'PB Vicente Reyes',
    hotline: '(02) 8297-8100 loc 209'
  },
  {
    name: 'Maly',
    code: 'MLY',
    population: 24600,
    floodRisk: 'High',
    landslideRisk: 'Low',
    primaryEvacCenter: 'Maly Elementary School Gymnasium',
    coordinates: [14.7150, 121.1280],
    vulnerablePuroks: ['San Mateo-Rodriguez Boundary Creek', 'Sitio Tabing Ilog'],
    chairperson: 'PB Jaime Torres',
    hotline: '(02) 8297-8100 loc 210'
  },
  {
    name: 'Pintong Bukawe',
    code: 'PBK',
    population: 12500,
    floodRisk: 'Low',
    landslideRisk: 'High',
    primaryEvacCenter: 'Pintong Bukawe Integrated School & Resilience Hub',
    coordinates: [14.6780, 121.1750],
    vulnerablePuroks: ['Upper Mountain Slope Sitio 1', 'Timberland Ridge Access', 'Purok 3 Ridge'],
    chairperson: 'PB Ernesto Flores',
    hotline: '(02) 8297-8100 loc 211'
  },
  {
    name: 'San Jose',
    code: 'SJS',
    population: 17800,
    floodRisk: 'Low',
    landslideRisk: 'Moderate',
    primaryEvacCenter: 'San Jose Covered Court',
    coordinates: [14.6880, 121.1450],
    vulnerablePuroks: ['Hillsview Zone 2', 'Sitio Elevated Creek'],
    chairperson: 'PB Corazon David',
    hotline: '(02) 8297-8100 loc 212'
  },
  {
    name: 'Santa Ana',
    code: 'STA',
    population: 30100,
    floodRisk: 'Very High',
    landslideRisk: 'Low',
    primaryEvacCenter: 'Santa Ana Elementary School / Covered Gym',
    coordinates: [14.6910, 121.1170],
    vulnerablePuroks: ['Riverbank Sitio Tabing Ilog', 'Parola Lowland', 'Purok 2'],
    chairperson: 'PB Gregorio Manalo',
    hotline: '(02) 8297-8100 loc 213'
  },
  {
    name: 'Silangan',
    code: 'SLN',
    population: 46200,
    floodRisk: 'Medium',
    landslideRisk: 'High',
    primaryEvacCenter: 'Silangan National High School & Evacuation Hub',
    coordinates: [14.6720, 121.1480],
    vulnerablePuroks: ['Sitio Patiis', 'Sitio Guitnang Bayan Slope', 'Modesta Low Creek'],
    chairperson: 'PB Manuel Alfonso',
    hotline: '(02) 8297-8100 loc 214'
  },
  {
    name: 'Sto. Niño',
    code: 'STN',
    population: 16400,
    floodRisk: 'High',
    landslideRisk: 'Low',
    primaryEvacCenter: 'Sto. Niño Multi-Purpose Gymnasium',
    coordinates: [14.6820, 121.1150],
    vulnerablePuroks: ['Batasan-San Mateo Bridge Boundary', 'Purok 1 Riverside'],
    chairperson: 'PB Rodrigo Pascual',
    hotline: '(02) 8297-8100 loc 215'
  }
];

export const EVACUATION_CENTERS: EvacuationCenter[] = [
  {
    id: 'evac-01',
    name: 'San Mateo Central Elementary School (Main Hub)',
    barangay: 'Guitnang Bayan 1',
    address: 'P. Burgos St., Brgy. Guitnang Bayan 1, San Mateo, Rizal',
    capacityPersons: 1500,
    currentOccupants: 0,
    status: 'standby',
    coordinates: [14.6968, 121.1225],
    amenities: ['Emergency Power Generator', 'Water Purification Station', 'Mobile Clinic', 'Breastfeeding Corner', 'Child-Friendly Space', 'Separate Restrooms'],
    contactPerson: 'Principal M. Ramos / Camp Manager',
    contactNumber: '0917-829-1001',
    isProwdApproved: true
  },
  {
    id: 'evac-02',
    name: 'Banaba Evacuation Center & Gymnasium',
    barangay: 'Banaba',
    address: 'Armscor Road, Brgy. Banaba, San Mateo, Rizal',
    capacityPersons: 1200,
    currentOccupants: 0,
    status: 'standby',
    coordinates: [14.6765, 121.1135],
    amenities: ['Elevated Flood Staging Deck', 'Community Kitchen', 'Medical Isolation Room', 'Solar Lighting System', 'Rescue Boat Slipway'],
    contactPerson: 'Kagawad B. Cruz',
    contactNumber: '0928-555-8822',
    isProwdApproved: true
  },
  {
    id: 'evac-03',
    name: 'Ampid National High School Gym',
    barangay: 'Ampid 2',
    address: 'Kambal Road, Brgy. Ampid 2, San Mateo, Rizal',
    capacityPersons: 950,
    currentOccupants: 0,
    status: 'standby',
    coordinates: [14.6825, 121.1220],
    amenities: ['Standby Generator', 'Deep Well Water System', 'Psychosocial Support Desk', 'Security Desk'],
    contactPerson: 'DRRM Focal Person L. Mendoza',
    contactNumber: '0995-123-4567',
    isProwdApproved: true
  },
  {
    id: 'evac-04',
    name: 'Silangan Multi-Purpose Evacuation Facility',
    barangay: 'Silangan',
    address: 'Modesta Village Phase 2, Brgy. Silangan, San Mateo, Rizal',
    capacityPersons: 1100,
    currentOccupants: 0,
    status: 'standby',
    coordinates: [14.6730, 121.1495],
    amenities: ['Reinforced Wind Shelters', 'Maternal Care Room', 'Relief Goods Storage Warehouse', 'Free Satellite Wi-Fi'],
    contactPerson: 'Camp Manager D. Santos',
    contactNumber: '0939-987-6543',
    isProwdApproved: true
  },
  {
    id: 'evac-05',
    name: 'Malanday Elementary School Evacuation Hub',
    barangay: 'Malanday',
    address: 'Gen. Luna Ave., Brgy. Malanday, San Mateo, Rizal',
    capacityPersons: 850,
    currentOccupants: 0,
    status: 'standby',
    coordinates: [14.6895, 121.1155],
    amenities: ['Emergency Water Tanks', 'Ambulance Access Bay', 'Pet Shelter Enclosure', 'Medical First Aid Post'],
    contactPerson: 'Kagawad R. Diaz',
    contactNumber: '0918-444-2211',
    isProwdApproved: true
  },
  {
    id: 'evac-06',
    name: 'Pintong Bukawe Integrated Disaster Center',
    barangay: 'Pintong Bukawe',
    address: 'Sitio Bukawe, Brgy. Pintong Bukawe, San Mateo, Rizal',
    capacityPersons: 600,
    currentOccupants: 0,
    status: 'standby',
    coordinates: [14.6790, 121.1760],
    amenities: ['Highland Slope Safe Zone', 'Helipad Access Point', 'Satellite Radio Link', 'Rainwater Harvesting'],
    contactPerson: 'Brgy. Sec. T. Aquino',
    contactNumber: '0947-111-3322',
    isProwdApproved: true
  }
];

export const RIVER_STATIONS: RiverStation[] = [
  {
    id: 'sta-sm-bridge',
    name: 'San Mateo Bridge Station (Guitnang Bayan)',
    location: 'Gen. Luna Ave. Bridge over San Mateo River',
    currentLevelMeters: 13.8,
    normalLevelMeters: 13.5,
    alert1Threshold: 15.0, // Yellow - Standby
    alert2Threshold: 16.0, // Orange - Preemptive Evacuation
    alert3Threshold: 18.0, // Red - Forced Evacuation (Critical Overflow)
    status: 'normal',
    trend: 'steady',
    dischargeRateCumecs: 145,
    rainfall24hMm: 12.4,
    lastUpdated: 'Just now (Live Telemetry)',
    readingsHistory: [
      { time: '04:00', level: 13.4 },
      { time: '05:00', level: 13.5 },
      { time: '06:00', level: 13.5 },
      { time: '07:00', level: 13.7 },
      { time: '08:00', level: 13.8 },
      { time: '09:00', level: 13.8 }
    ]
  },
  {
    id: 'sta-ampid',
    name: 'Ampid River Confluence Gauge',
    location: 'Ampid 1 - San Mateo River Junction',
    currentLevelMeters: 12.6,
    normalLevelMeters: 12.0,
    alert1Threshold: 14.5,
    alert2Threshold: 15.8,
    alert3Threshold: 17.5,
    status: 'normal',
    trend: 'steady',
    dischargeRateCumecs: 98,
    rainfall24hMm: 14.2,
    lastUpdated: '2 mins ago',
    readingsHistory: [
      { time: '04:00', level: 12.2 },
      { time: '05:00', level: 12.3 },
      { time: '06:00', level: 12.4 },
      { time: '07:00', level: 12.5 },
      { time: '08:00', level: 12.6 },
      { time: '09:00', level: 12.6 }
    ]
  },
  {
    id: 'sta-banaba',
    name: 'Banaba Dike / Batasan Boundary Station',
    location: 'Banaba Lower Basin (Near Armscor & Marikina Border)',
    currentLevelMeters: 13.1,
    normalLevelMeters: 12.8,
    alert1Threshold: 15.0,
    alert2Threshold: 16.5,
    alert3Threshold: 18.0,
    status: 'normal',
    trend: 'steady',
    dischargeRateCumecs: 180,
    rainfall24hMm: 11.0,
    lastUpdated: '1 min ago',
    readingsHistory: [
      { time: '04:00', level: 12.8 },
      { time: '05:00', level: 12.9 },
      { time: '06:00', level: 13.0 },
      { time: '07:00', level: 13.0 },
      { time: '08:00', level: 13.1 },
      { time: '09:00', level: 13.1 }
    ]
  },
  {
    id: 'sta-montalban-up',
    name: 'Upper Wawa / Montalban Inflow Station',
    location: 'Upstream Sierra Madre Catchment (Early Indicator)',
    currentLevelMeters: 20.4,
    normalLevelMeters: 20.0,
    alert1Threshold: 22.5,
    alert2Threshold: 24.0,
    alert3Threshold: 26.0,
    status: 'normal',
    trend: 'steady',
    dischargeRateCumecs: 260,
    rainfall24hMm: 18.5,
    lastUpdated: '3 mins ago',
    readingsHistory: [
      { time: '04:00', level: 20.1 },
      { time: '05:00', level: 20.2 },
      { time: '06:00', level: 20.3 },
      { time: '07:00', level: 20.4 },
      { time: '08:00', level: 20.4 },
      { time: '09:00', level: 20.4 }
    ]
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'cnt-mdrrmo',
    agency: 'MDRRMO San Mateo (Operations Center)',
    agencyTagalog: 'Tanggapang Tagapamahala sa Pagbawas ng Panganib sa Sakuna',
    role: 'Main 24/7 Command & Emergency Dispatch',
    landline: '(02) 8297-8100',
    localExt: '129',
    mobileNumbers: ['0917-835-1234', '0998-588-4321'],
    address: 'MDRRMO Building, Municipal Compound, Gen. Luna Ave., Brgy. Guitnang Bayan 1, San Mateo, Rizal',
    is24_7: true,
    category: 'rescue',
    badgeColor: 'bg-red-500'
  },
  {
    id: 'cnt-bfp',
    agency: 'Bureau of Fire Protection (BFP San Mateo)',
    agencyTagalog: 'Kawanihan ng Pamatay-Sunog ng San Mateo',
    role: 'Fire Suppression, Heavy Search & Flood Rescue',
    landline: '(02) 8297-8100',
    localExt: '136',
    mobileNumbers: ['0963-020-3591', '0977-605-5866'],
    address: 'BFP Station, Gen. Luna Ave., Brgy. Guitnang Bayan 1, San Mateo, Rizal',
    is24_7: true,
    category: 'fire',
    badgeColor: 'bg-orange-500'
  },
  {
    id: 'cnt-pnp',
    agency: 'Philippine National Police (PNP San Mateo)',
    agencyTagalog: 'Pambansang Pulisya ng Pilipinas - San Mateo',
    role: 'Law Enforcement, Perimeter Security & Evacuation Escort',
    landline: '(02) 8297-8100',
    localExt: '114',
    mobileNumbers: ['0998-598-5728', '0917-112-9995'],
    address: 'PNP Municipal Station, Gen. Luna Ave., San Mateo, Rizal',
    is24_7: true,
    category: 'police',
    badgeColor: 'bg-blue-600'
  },
  {
    id: 'cnt-dpos',
    agency: 'DPOS (Department of Public Order and Safety)',
    agencyTagalog: 'Kagawaran ng Kaayusan at Kaligtasang Pampubliko',
    role: 'Traffic Clearance, Road Barricades & Flood Warning Vans',
    landline: '(02) 8297-8100',
    localExt: '130',
    mobileNumbers: ['0920-945-8120'],
    address: 'DPOS Building, Municipal Hall Complex, San Mateo, Rizal',
    is24_7: true,
    category: 'traffic',
    badgeColor: 'bg-amber-600'
  },
  {
    id: 'cnt-mho',
    agency: 'San Mateo Municipal Health Office (MHO) & EMS Ambulance',
    agencyTagalog: 'Pambayang Tanggapan ng Pangkalusugan at Ambulansya',
    role: 'Emergency Medical Services, Leptospirosis Prophylaxis & First Aid',
    landline: '(02) 8297-8100',
    localExt: '121',
    mobileNumbers: ['0917-882-9911'],
    address: 'Rural Health Unit 1, Gen. Luna Ave., Brgy. Guitnang Bayan 1',
    is24_7: true,
    category: 'health',
    badgeColor: 'bg-emerald-600'
  },
  {
    id: 'cnt-redcross',
    agency: 'Philippine Red Cross - Rizal Chapter (San Mateo Branch)',
    agencyTagalog: 'Krus na Pula ng Pilipinas - San Mateo',
    role: 'Blood Bank, Relief Supplies Distribution & First Aid Stations',
    landline: '(02) 8697-3211',
    mobileNumbers: ['0917-883-7332'],
    address: 'Ampid 1 Road, San Mateo, Rizal',
    is24_7: true,
    category: 'rescue',
    badgeColor: 'bg-rose-600'
  }
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'res-01',
    title: 'Hydrological Modeling and Inundation Depth Simulation of the Marikina-San Mateo River Basin Under Extreme Monsoon Scenarios',
    authors: 'Dr. R. Alcantara, Engr. M. Dela Rosa, San Mateo DRRM Research Unit & UP Resilience Institute',
    year: 2025,
    institution: 'San Mateo DRRM Academic Partnership & DOST-PAGASA',
    category: 'Flood Modeling',
    abstract: 'This paper evaluates flood dynamics along the San Mateo River corridor, simulating water volume discharge under 50-year and 100-year return period storms. Findings pinpoint high-risk constriction points at the Batasan-San Mateo bridge and recommend dike elevation in Barangay Banaba and Malanday.',
    keyFindings: [
      'Peak discharge lag-time from Sierra Madre headwaters to San Mateo Bridge is approximately 3.2 hours.',
      'Constructing retention ponds in Upper Guinayang could reduce peak flood height in Banaba and Ampid 1 by up to 0.75 meters.',
      'Early warning sirens with telemetry triggered at 15.0m level increases safe evacuation compliance by 88%.'
    ],
    policyImpact: 'Directly adopted in the 2025-2028 Comprehensive Land Use Plan (CLUP) for San Mateo zoning & no-build riverbank buffers.',
    fileSize: '4.8 MB PDF',
    downloadsCount: 1420
  },
  {
    id: 'res-02',
    title: 'Microclimate Variation and Urban Heat Island (UHI) Mitigation through Barangay-Level Canopy Greening in San Mateo, Rizal',
    authors: 'Prof. L. Villafuerte, Dr. C. Santos, Rizal Climate Action Collaborative',
    year: 2025,
    institution: 'Municipal Environment and Natural Resources Office (MENRO) & Miriam College',
    category: 'Urban Heat & Climate',
    abstract: 'Spatial analysis of surface temperatures across high-density urban barangays (Guitnang Bayan, Santa Ana, Ampid) showing localized heat islands up to 4.2°C warmer than baseline. The study models the impact of planting 15,000 native endemic trees (Banaba, Narra, Katmon).',
    keyFindings: [
      'High density paved corridors in Guitnang Bayan 1 reach 38.6°C surface temperatures during dry season peaks.',
      'Targeted pocket parks and green roofs along Gen. Luna Ave reduce ambient temperatures by 1.8°C.',
      'Enhanced carbon sequestration of 320 metric tons CO2 equivalent annually through native riparian reforestation.'
    ],
    policyImpact: 'Integrated into the "Luntiang San Mateo" Municipal Ordinance No. 2025-08 requiring tree planting along right-of-way easements.',
    fileSize: '3.2 MB PDF',
    downloadsCount: 980
  },
  {
    id: 'res-03',
    title: 'Rain-Induced Landslide Susceptibility Mapping and Slope Stability Assessment in Upland Barangays Silangan and Pintong Bukawe',
    authors: 'Engr. J. Balagtas, Geologist F. Soriano, Mines and Geosciences Bureau (MGB-IV-A) & San Mateo DRRMC',
    year: 2024,
    institution: 'MGB Region IV-A & San Mateo Engineering Office',
    category: 'Landslide Analysis',
    abstract: 'Geotechnical investigation of volcanic tuff and clay soil profiles in the eastern foothills of San Mateo. Evaluates slope failure risks during prolonged typhoons and establishes soil moisture sensor thresholds for early hillside advisories.',
    keyFindings: [
      'Slope gradients exceeding 35% in Sitio Patiis (Silangan) require bioengineering with Vetiver grass and gabion wall reinforcement.',
      'Automated soil moisture saturation exceeding 85% strongly correlates with shallow translational slope failures.',
      'Demarcation of 4 critical danger zones with permanent warning signage installed.'
    ],
    policyImpact: 'Basis for pre-emptive evacuation triggers for 450 hillside households during Tropical Cyclone Wind Signal No. 2 or higher.',
    fileSize: '6.1 MB PDF',
    downloadsCount: 1150
  },
  {
    id: 'res-04',
    title: 'Community-Based Disaster Preparedness Index: Evaluating Barangay DRRM Capacity and Household Resilience in San Mateo',
    authors: 'Dr. E. Tan, S. Navarro, Center for Disaster Preparedness & San Mateo ABC Council',
    year: 2025,
    institution: 'Center for Disaster Preparedness (CDP) & DILG San Mateo',
    category: 'Community DRRM',
    abstract: 'Comprehensive survey of 3,200 households across all 15 barangays assessing Go-Bag readiness, flood warning comprehension, and participation in nationwide simultaneous earthquake drills (NSED).',
    keyFindings: [
      'Household Go-Bag preparedness increased from 42% (2022) to 79% (2025) following the municipal "E-Balde" kit campaign.',
      'Mobile SMS broadcasts achieve 94% reach within 8 minutes of official alert declaration.',
      'Women-led Barangay DRRM committees demonstrated 30% faster shelter intake registration and relief allocation.'
    ],
    policyImpact: 'Mandated annual Barangay DRRM fund allocation benchmarks for inclusive shelter supplies and special needs protocols.',
    fileSize: '2.9 MB PDF',
    downloadsCount: 860
  }
];

export const GO_BAG_ITEMS: GoBagItem[] = [
  {
    id: 'item-1',
    nameEn: 'Potable Drinking Water (3 Liters / Person / Day for 3 Days)',
    nameTl: 'Inuming Tubig (3 Litro bawat tao kada araw para sa 3 araw)',
    category: 'water_food',
    essential: true,
    descriptionEn: 'Essential for hydration. Stored in clean, sealed bottles or jugs.',
    descriptionTl: 'Pangunahing pangangailangan. Nakalagay sa malinis at nakasarang lalagyan.'
  },
  {
    id: 'item-2',
    nameEn: 'Non-Perishable Ready-to-Eat Food (Canned goods, biscuits, nuts)',
    nameTl: 'Pagkaing Hindi Madaling Mapanis (De-lata na may easy-open lid, biskwit, mani)',
    category: 'water_food',
    essential: true,
    descriptionEn: 'Sufficient for at least 72 hours without needing cooking gas.',
    descriptionTl: 'Sapat para sa 3 araw na hindi nangangailangan ng lutuan.'
  },
  {
    id: 'item-3',
    nameEn: 'First Aid Kit & Prescription Medications (Doxycycline, Maintenance meds)',
    nameTl: 'First Aid Kit at Maintenance na Gamot (Bandages, Alcohol, Doxycycline pang-Leptospirosis)',
    category: 'medical',
    essential: true,
    descriptionEn: 'Include antiseptics, sterile gauze, personal maintenance meds for 7 days, and Leptospirosis preventative.',
    descriptionTl: 'May kasamang panlinis ng sugat, gamot sa lagnat/sakit ng tiyan, at sariling maintenance.'
  },
  {
    id: 'item-4',
    nameEn: 'LED Flashlight, Extra Batteries & Glow Sticks',
    nameTl: 'Maliwanag na Flashlight, Ekstrang Baterya at Kandila/Posporo',
    category: 'tools_lights',
    essential: true,
    descriptionEn: 'Waterproof flashlight for nighttime navigation during power outages.',
    descriptionTl: 'Waterproof na ilaw kapag nawalan ng kuryente.'
  },
  {
    id: 'item-5',
    nameEn: 'Emergency Whistle & Heavy-Duty Multi-Tool / Swiss Knife',
    nameTl: 'Pito (Whistle) para sa Pagsaklolo at Multi-tool na Kutsilyo',
    category: 'tools_lights',
    essential: true,
    descriptionEn: 'Whistle for signaling location to rescue teams without exhausting voice.',
    descriptionTl: 'Pito para marinig agad ng rescue team nang hindi nauubos ang boses.'
  },
  {
    id: 'item-6',
    nameEn: 'Waterproof Pouch with Important Documents & Valid IDs',
    nameTl: 'Waterproof Pouch para sa Dokumento (Birth Certificates, Titulo, IDs, Insurance)',
    category: 'documents',
    essential: true,
    descriptionEn: 'Birth certificates, land titles, IDs, passports, ATM cards, and emergency cash in small bills.',
    descriptionTl: 'Nakatago sa selyadong plastic zip lock kasama ang emergency cash na barya/bente/singkwenta.'
  },
  {
    id: 'item-7',
    nameEn: 'Powerbank & Charging Cables (Pre-charged)',
    nameTl: 'Powerbank at Charging Cable (Puno ang karga)',
    category: 'tools_lights',
    essential: true,
    descriptionEn: 'Keep communications active with MDRRMO and loved ones.',
    descriptionTl: 'Para mapanatiling may baterya ang cellphone para sa balita at komunikasyon.'
  },
  {
    id: 'item-8',
    nameEn: 'AM/FM Battery-Operated Portable Radio',
    nameTl: 'Transistor Radio na de-baterya para sa Balita ng PAGASA/MDRRMO',
    category: 'tools_lights',
    essential: true,
    descriptionEn: 'Crucial when mobile cellular towers and internet connection go down.',
    descriptionTl: 'Mahalaga kapag nawalan ng signal ang internet at cellular network.'
  },
  {
    id: 'item-9',
    nameEn: 'Personal Hygiene Kit (Soap, Toothbrush, Sanitary Pads, Wet Wipes)',
    nameTl: 'Hygiene Kit (Sabon, Sepilyo, Sanitary Pads, Wet Wipes, Alcohol)',
    category: 'hygiene',
    essential: false,
    descriptionEn: 'Prevent spread of bacteria and skin infections in evacuation centers.',
    descriptionTl: 'Pang-iwas sa sakit at impeksyon sa balat sa loob ng evacuation center.'
  },
  {
    id: 'item-10',
    nameEn: 'Thermal Blanket, Raincoat & Extra Change of Clothes',
    nameTl: 'Kapote, Thermal Blanket o Kumot, at 2 pares ng Pamalit na Damit',
    category: 'special',
    essential: false,
    descriptionEn: 'Keeps body warm and dry against hypothermia.',
    descriptionTl: 'Panatilihing tuyo at mainit ang katawan laban sa ginaw at sipon.'
  },
  {
    id: 'item-11',
    nameEn: 'Infant / Elderly / Pet Care Supplies (Formula, Diapers, Leash)',
    nameTl: 'Gamit ng Sanggol / Matanda / Alagang Hayop (Gatas, Diapers, Tali/Kulungan)',
    category: 'special',
    essential: false,
    descriptionEn: 'Specialized milk, adult/baby diapers, feeding bottles, or pet pet carrier.',
    descriptionTl: 'Kung may kasamang baby, lolo/lola, o alagang aso/pusa.'
  }
];
