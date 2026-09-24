import React, { useState } from "react";
import { ClientLandingPage } from "./components/ClientLandingPage";
import { LandingPageStudio } from "./components/LandingPageStudio";
import { GoogleAiProductionSuite } from "./components/GoogleAiProductionSuite";
import { PersonaDossier } from "./components/PersonaDossier";
import { InstagramMockup } from "./components/InstagramMockup";
import { ReelsEngine } from "./components/ReelsEngine";
import { InfoproductStudio } from "./components/InfoproductStudio";
import { AiGeneratorLab } from "./components/AiGeneratorLab";
import { TechStackGuide } from "./components/TechStackGuide";
import { StrategyExportModal } from "./components/StrategyExportModal";
import { Header } from "./components/Header";
import { ArrowLeft } from "lucide-react";

export default function App() {
  // Mode: "client" (default - 100% focused client sales landing page) or "creator-studio"
  const [appMode, setAppMode] = useState<"client" | "creator-studio">(() => {
    if (typeof window !== "undefined" && (window.location.search.includes("studio") || window.location.hash.includes("studio"))) {
      return "creator-studio";
    }
    return "client";
  });
  const [activeTab, setActiveTab] = useState<string>("landing-page");
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // If in creator studio mode, render the internal studio
  if (appMode === "creator-studio") {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Top return bar */}
        <div className="bg-emerald-950/80 border-b border-emerald-800/80 px-4 py-2 flex items-center justify-between text-xs">
          <span className="font-semibold text-emerald-300">
            Режим разработки и контент-студии (скрыт от клиентов)
          </span>
          <button
            onClick={() => setAppMode("client")}
            className="flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-stone-200 px-3 py-1 rounded-lg border border-stone-700 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Вернуться на сайт для клиентов</span>
          </button>
        </div>

        {/* Navigation Header for Studio */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenExport={() => setIsExportOpen(true)}
        />

        {/* Main Studio Area */}
        <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === "landing-page" && <LandingPageStudio />}
          {activeTab === "google-ai" && <GoogleAiProductionSuite />}
          {activeTab === "persona" && <PersonaDossier />}
          {activeTab === "instagram" && <InstagramMockup />}
          {activeTab === "reels" && <ReelsEngine />}
          {activeTab === "infoproduct" && <InfoproductStudio />}
          {activeTab === "ai-lab" && <AiGeneratorLab />}
          {activeTab === "tech-stack" && <TechStackGuide />}
        </main>

        <StrategyExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
        />
      </div>
    );
  }

  // DEFAULT: 100% Client-Facing High-Converting Landing Page
  return (
    <div className="relative">
      <ClientLandingPage />
    </div>
  );
}
