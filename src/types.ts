export type Language = 'tl' | 'en';

export type AlertLevel = 'normal' | 'alert1' | 'alert2' | 'alert3';

export interface BarangayInfo {
  name: string;
  code: string;
  population: number;
  floodRisk: 'Low' | 'Medium' | 'High' | 'Very High';
  landslideRisk: 'Low' | 'Moderate' | 'High';
  primaryEvacCenter: string;
  coordinates: [number, number];
  vulnerablePuroks: string[];
  chairperson: string;
  hotline: string;
}

export interface EvacuationCenter {
  id: string;
  name: string;
  barangay: string;
  address: string;
  capacityPersons: number;
  currentOccupants: number;
  status: 'standby' | 'active_open' | 'full' | 'closed';
  coordinates: [number, number];
  amenities: string[];
  contactPerson: string;
  contactNumber: string;
  isProwdApproved: boolean;
}

export interface RiverStation {
  id: string;
  name: string;
  location: string;
  currentLevelMeters: number;
  normalLevelMeters: number;
  alert1Threshold: number; // Yellow / Standby
  alert2Threshold: number; // Orange / Preemptive Evac
  alert3Threshold: number; // Red / Forced Evac
  status: AlertLevel;
  trend: 'rising' | 'steady' | 'receding';
  dischargeRateCumecs: number;
  rainfall24hMm: number;
  lastUpdated: string;
  readingsHistory: { time: string; level: number }[];
}

export interface EmergencyContact {
  id: string;
  agency: string;
  agencyTagalog: string;
  role: string;
  landline: string;
  localExt?: string;
  mobileNumbers: string[];
  address: string;
  is24_7: boolean;
  category: 'rescue' | 'fire' | 'police' | 'health' | 'traffic';
  badgeColor: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  year: number;
  institution: string;
  category: 'Flood Modeling' | 'Urban Heat & Climate' | 'Landslide Analysis' | 'Community DRRM' | 'Watershed Protection';
  abstract: string;
  keyFindings: string[];
  policyImpact: string;
  fileSize: string;
  downloadsCount: number;
}

export interface GoBagItem {
  id: string;
  nameEn: string;
  nameTl: string;
  category: 'water_food' | 'medical' | 'tools_lights' | 'documents' | 'hygiene' | 'special';
  essential: boolean;
  descriptionEn: string;
  descriptionTl: string;
}

export interface CommunityIncidentReport {
  id: string;
  barangay: string;
  incidentType: 'flooding' | 'landslide' | 'fallen_tree' | 'clogged_canal' | 'rescue_needed' | 'medical';
  locationDetail: string;
  description: string;
  reporterName: string;
  contactNumber: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  status: 'verified' | 'dispatching' | 'resolved' | 'pending';
  waterLevelDepthCm?: number;
  imageUrl?: string;
}
