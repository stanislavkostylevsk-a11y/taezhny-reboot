import React from "react";
import { Trees, Download, Sparkles, Instagram, Flame, FileText, Cpu, BookOpen, Globe } from "lucide-react";
import confetti from "canvas-confetti";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenExport }) => {
  const tabs = [
    { id: "landing-page", label: "Продающий Лендинг", icon: Globe },
    { id: "google-ai", label: "Google AI Промпты & Стек", icon: Sparkles },
    { id: "persona", label: "Паспорт Ждана", icon: Trees },
    { id: "instagram", label: "Instagram Профиль", icon: Instagram },
    { id: "reels", label: "Сценарии Reels", icon: Flame },
    { id: "infoproduct", label: "Инфопродукты & Воронка", icon: BookOpen },
    { id: "ai-lab", label: "AI Генератор", icon: Cpu },
    { id: "tech-stack", label: "Технологии & Пайплайн", icon: FileText },
  ];

  const handleExportClick = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.2 },
      colors: ["#1B3B2B", "#D97706", "#F3EBD9", "#4D6B53"]
    });
    onOpenExport();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-stone-800/80 bg-stone-950/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-3.5">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-900 via-stone-900 to-amber-950 p-0.5 shadow-lg shadow-emerald-950/50">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-stone-900 border border-emerald-500/20">
                <Trees className="h-6 w-6 text-emerald-400" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-stone-950">
                AI
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-['Cinzel'] text-xl font-bold tracking-wide text-stone-100 sm:text-2xl">
                  ЖДАН ТАЁЖНЫЙ
                </h1>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-950/60 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                  63 года • Health AI Creator
                </span>
              </div>
              <p className="text-xs text-stone-400 hidden sm:block">
                Сибирское здоровье, таёжный биохакинг & запуск инфопродукта
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportClick}
              id="export-strategy-btn"
              className="inline-flex items-center gap-2 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-600/20 to-amber-500/10 px-3.5 py-2 text-xs font-semibold text-amber-300 transition-all hover:border-amber-400 hover:bg-amber-500/20 hover:text-amber-200 active:scale-95 shadow-sm"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Экспорт всей стратегии</span>
              <span className="sm:hidden">Экспорт</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto scrollbar-none gap-1 border-t border-stone-800/40 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`group inline-flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-950"
                    : "text-stone-400 hover:bg-stone-900 hover:text-stone-200"
                }`}
              >
                <Icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? "text-emerald-400" : "text-stone-500"}`} />
                <span>{tab.label}</span>
                {tab.id === "landing-page" && (
                  <span className="rounded bg-gradient-to-r from-emerald-500/20 to-amber-500/20 px-1.5 py-0.2 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                    Сайт 990 ₽
                  </span>
                )}
                {tab.id === "google-ai" && (
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                    Imagen 3 + Veo 2
                  </span>
                )}
                {tab.id === "ai-lab" && (
                  <span className="rounded bg-amber-500/20 px-1 py-0.2 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                    Gemini 3.7
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
