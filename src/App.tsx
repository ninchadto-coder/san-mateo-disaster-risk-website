import React, { useState } from 'react';
import { Header } from './components/Header';
import { AnnouncementBar } from './components/AnnouncementBar';
import { HeroSection } from './components/HeroSection';
import { RiverBasinMonitor } from './components/RiverBasinMonitor';
import { InteractiveMap } from './components/InteractiveMap';
import { HotlinesSection } from './components/HotlinesSection';
import { PillarsSection } from './components/PillarsSection';
import { FamilyPlanGenerator } from './components/FamilyPlanGenerator';
import { CommunityIncidentReport } from './components/CommunityIncidentReport';
import { ResourceHub } from './components/ResourceHub';
import { AiDisasterAssistant } from './components/AiDisasterAssistant';
import { Footer } from './components/Footer';
import { Language, AlertLevel } from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>('tl');
  const [currentWaterLevel, setCurrentWaterLevel] = useState<number>(13.8);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState<boolean>(false);

  // Determine alert level based on gauge threshold
  const computeAlertLevel = (level: number): AlertLevel => {
    if (level >= 18.0) return 'alert3';
    if (level >= 16.0) return 'alert2';
    if (level >= 15.0) return 'alert1';
    return 'normal';
  };

  const currentAlertLevel = computeAlertLevel(currentWaterLevel);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-[#E76F51] selection:text-white">
      {/* Dynamic Announcement Bar */}
      <AnnouncementBar
        language={language}
        currentAlertLevel={currentAlertLevel}
        currentWaterLevel={currentWaterLevel}
      />

      {/* Main Header & Nav */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        currentAlertLevel={currentAlertLevel}
        onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          language={language}
          onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
        />

        {/* Real-time River Basin Monitor & Drill Simulation */}
        <RiverBasinMonitor
          language={language}
          currentWaterLevel={currentWaterLevel}
          onWaterLevelChange={setCurrentWaterLevel}
          currentAlertLevel={currentAlertLevel}
        />

        {/* Interactive Hazard & Evacuation Center GIS Map */}
        <InteractiveMap
          language={language}
        />

        {/* Emergency Hotlines & First Responders */}
        <HotlinesSection
          language={language}
        />

        {/* Family Emergency Preparedness Plan & Go-Bag Generator */}
        <FamilyPlanGenerator
          language={language}
        />

        {/* Pillars of Resilience & DRRM Strategic Framework */}
        <PillarsSection
          language={language}
        />

        {/* Community Incident Reporting & Live Feed */}
        <CommunityIncidentReport
          language={language}
        />

        {/* Academic Research Papers & Resource Hub */}
        <ResourceHub
          language={language}
        />
      </main>

      {/* AI Disaster Assistant / Emergency Advisor Modal */}
      <AiDisasterAssistant
        isOpen={isAiAdvisorOpen}
        onClose={() => setIsAiAdvisorOpen(false)}
        language={language}
        currentWaterLevel={currentWaterLevel}
        currentAlertLevel={currentAlertLevel}
      />

      {/* Official Municipal Footer */}
      <Footer
        language={language}
      />
    </div>
  );
}
