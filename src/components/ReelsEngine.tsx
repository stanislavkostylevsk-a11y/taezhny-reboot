import React, { useState } from "react";
import { REELS_SCRIPTS_DATA } from "../data/zhdanData";
import { ReelsScript } from "../types";
import { Flame, Play, Clock, Eye, Copy, Check, Sparkles, MessageSquare, Video, ArrowRight, Layers } from "lucide-react";

export const ReelsEngine: React.FC = () => {
  const [selectedScript, setSelectedScript] = useState<ReelsScript>(REELS_SCRIPTS_DATA[0]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "Все сценарии (6)" },
    { id: "ЖКТ & Очищение", label: "ЖКТ & Очищение" },
    { id: "Иммунитет & Онкопротекция", label: "Иммунитет" },
    { id: "Долголетие & Гормоны", label: "Гормоны & Ужин" },
    { id: "Суставы & Позвоночник", label: "Суставы" },
    { id: "Сосуды & Давление", label: "Давление & Сосуды" },
  ];

  const filteredScripts = activeCategory === "all"
    ? REELS_SCRIPTS_DATA
    : REELS_SCRIPTS_DATA.filter((s) => s.category.includes(activeCategory) || activeCategory.includes(s.category));

  const handleCopyFullScript = (script: ReelsScript) => {
    const fullText = `🎬 СЦЕНАРИЙ REELS: ${script.title}\n⏱ Длительность: ${script.duration}\n🎯 Кодовое слово для чат-бота: «${script.ctaTriggerWord}»\n\n📌 ХУК (Первые 3 сек):\n${script.hook}\n\n🎬 ПОКАДРОВЫЙ ПЛАН (SHOT-BY-SHOT):\n${script.shotList.map((shot, idx) => `Кадр ${idx + 1} (${shot.timestamp}):\n- Визуал / AI Prompt: ${shot.visualAction}\n- Текст на экране (Captions): ${shot.onScreenText}\n- Голос Ждана (Voiceover): "${shot.voiceoverText}"\n- Подсказка для HeyGen/Kling: ${shot.aiPromptTip}`).join("\n\n")}\n\n🤖 ДЕЙСТВИЕ АВТОВОРОНКИ (ManyChat):\n${script.funnelAction}`;

    navigator.clipboard.writeText(fullText);
    setCopiedScriptId(script.id);
    setTimeout(() => setCopiedScriptId(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="rounded-2xl border border-stone-800 bg-stone-950 p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-300 border border-amber-500/30">
            Вирусный Трафик
          </span>
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300 border border-emerald-500/30">
            Хуки • Текст для ElevenLabs • Промпты для HeyGen
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-stone-100 font-['Cinzel']">
          Банк Вирусных Сценариев Instagram Reels Ждана
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
          Готовые покадровые режиссерские сценарии с секундомером, текстом для клонированного голоса, плашками на экране и кодовыми словами для запуска автопродаж в Direct.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all border ${
              activeCategory === cat.id
                ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-sm"
                : "bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Scripts Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Script Cards List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredScripts.map((script) => (
            <div
              key={script.id}
              onClick={() => setSelectedScript(script)}
              className={`rounded-2xl p-4 transition-all border cursor-pointer space-y-2.5 ${
                selectedScript.id === script.id
                  ? "bg-emerald-950/70 border-emerald-500 text-stone-100 shadow-lg shadow-emerald-950"
                  : "bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-stone-900 border border-stone-800 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                  {script.category}
                </span>
                <div className="flex items-center gap-3 text-[11px] text-stone-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {script.duration}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <Eye className="h-3 w-3" />
                    {script.estimatedViews}
                  </span>
                </div>
              </div>

              <h4 className="text-sm font-bold text-stone-100 leading-snug">{script.title}</h4>
              <p className="text-xs text-stone-400 italic line-clamp-2">«{script.hook}»</p>

              <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-stone-400">Триггер в Директ:</span>
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-300 border border-amber-500/40">
                  «{script.ctaTriggerWord}»
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Detailed Shot-By-Shot Storyboard View */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-stone-800 bg-stone-950 p-6 space-y-5 shadow-2xl">
            {/* Header of Selected Script */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  {selectedScript.category} • {selectedScript.duration}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-stone-100 mt-0.5">
                  {selectedScript.title}
                </h3>
              </div>
              <button
                id="copy-selected-reels-btn"
                onClick={() => handleCopyFullScript(selectedScript)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white transition-all shadow-md shadow-emerald-950 shrink-0"
              >
                {copiedScriptId === selectedScript.id ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Сценарий скопирован!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Скопировать сценарий целиком
                  </>
                )}
              </button>
            </div>

            {/* Hook Analysis */}
            <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5" />
                Вирусный Хук (0-3 сек):
              </span>
              <p className="text-sm font-semibold text-amber-100 font-serif italic">
                {selectedScript.hook}
              </p>
            </div>

            {/* Shot List (Storyboard) */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-300 block">
                Покадровый таймлайн (Shot-by-Shot Timeline):
              </span>

              <div className="space-y-3">
                {selectedScript.shotList.map((shot, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-stone-800 bg-stone-900/70 p-4 space-y-2.5 text-xs transition-all hover:border-stone-700"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-stone-800 px-2 py-0.5 text-[11px] font-bold text-emerald-400 font-mono">
                        ⏱ {shot.timestamp} • Кадр {idx + 1}
                      </span>
                      <span className="text-[11px] text-amber-300 font-semibold">
                        На экране: {shot.onScreenText}
                      </span>
                    </div>

                    {/* Action & Voiceover */}
                    <div className="grid sm:grid-cols-2 gap-3 pt-1">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                          Визуальный ряд (Видео):
                        </span>
                        <p className="text-stone-300 leading-relaxed">{shot.visualAction}</p>
                      </div>

                      <div className="space-y-1 rounded-lg bg-stone-950 p-2.5 border border-stone-800/80">
                        <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                          Голос Ждана (ElevenLabs):
                        </span>
                        <p className="text-stone-200 font-serif italic text-xs leading-relaxed">
                          «{shot.voiceoverText}»
                        </p>
                      </div>
                    </div>

                    {/* AI Prompt Tip */}
                    <div className="rounded-lg bg-stone-950 p-2 border border-stone-800 text-[11px] text-stone-400 flex items-start gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-stone-300">Промпт для HeyGen / Kling: </span>
                        <span className="font-mono text-[10px] text-stone-400">{shot.aiPromptTip}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct CTA & Funnel Info */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <MessageSquare className="h-4 w-4" />
                  Призыв к действию (CTA):
                </span>
                <span className="font-mono font-bold text-amber-300 text-sm">
                  «{selectedScript.ctaTriggerWord}»
                </span>
              </div>
              <p className="text-stone-300 leading-relaxed">
                🤖 <span className="font-semibold text-stone-200">Автоворонка ManyChat:</span> {selectedScript.funnelAction}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
