import React from "react";
import { TECH_PIPELINE_STEPS } from "../data/zhdanData";
import { Cpu, ExternalLink, Sparkles, CheckCircle2, ShieldCheck, Zap, Layers, Video, Mic, Bot } from "lucide-react";

export const TechStackGuide: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="rounded-2xl border border-stone-800 bg-stone-950 p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300 border border-emerald-500/30">
            Производственный Пайплайн
          </span>
          <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-300 border border-amber-500/30">
            Google AI + Hybrid
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-stone-100 font-['Cinzel']">
          Технологический Стек Создания AI-Блогера Ждана
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
          Полное практическое руководство: генерация реалистичных фото в <b>Google Imagen 3</b>, видео в <b>Google Veo 2</b>, сценариев в <b>Gemini 2.5</b>, синтез голоса в <b>Google Cloud TTS</b> и упаковка курсов в <b>NotebookLM</b>.
        </p>
      </div>

      {/* Google AI Ecosystem 100% Path Comparison */}
      <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-stone-900 to-stone-950 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-bold text-stone-100 font-['Cinzel']">
              100% Google AI Workflow (Всё внутри Google)
            </h3>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
            Максимальная выгода
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
          <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-3.5 space-y-1.5">
            <span className="text-[10px] font-bold text-emerald-400 uppercase">1. Фотосессия</span>
            <p className="text-xs font-bold text-stone-200">Google Imagen 3</p>
            <p className="text-[11px] text-stone-400">Портреты Ждана, макросъемка дикоросов, сибирские пейзажи</p>
          </div>
          <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-3.5 space-y-1.5">
            <span className="text-[10px] font-bold text-amber-400 uppercase">2. B-Roll & Reels</span>
            <p className="text-xs font-bold text-stone-200">Google Veo 2</p>
            <p className="text-[11px] text-stone-400">9:16 видео тумана, пар от чая, река Катунь, треск огня</p>
          </div>
          <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-3.5 space-y-1.5">
            <span className="text-[10px] font-bold text-blue-400 uppercase">3. Тексты & Сценарии</span>
            <p className="text-xs font-bold text-stone-200">Gemini 2.5 Flash</p>
            <p className="text-[11px] text-stone-400">Виральные сценарии, посты, ответы в Директ и воронки</p>
          </div>
          <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-3.5 space-y-1.5">
            <span className="text-[10px] font-bold text-purple-400 uppercase">4. Озвучка</span>
            <p className="text-xs font-bold text-stone-200">Google Cloud TTS</p>
            <p className="text-[11px] text-stone-400">Голос ru-RU-Neural2-D, бархатный баритон 0.92x с SSML</p>
          </div>
          <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-3.5 space-y-1.5">
            <span className="text-[10px] font-bold text-teal-400 uppercase">5. Инфопродукты</span>
            <p className="text-xs font-bold text-stone-200">Google NotebookLM</p>
            <p className="text-[11px] text-stone-400">Воркбуки, чек-листы, методички и Audio Overviews</p>
          </div>
        </div>
      </div>

      {/* Tech Pipeline Steps (1 to 5) */}
      <div className="space-y-6">
        {TECH_PIPELINE_STEPS.map((step) => (
          <div
            key={step.stepNumber}
            className="rounded-2xl border border-stone-800 bg-stone-950 p-6 space-y-5 transition-all hover:border-stone-700 shadow-xl"
          >
            {/* Step Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-amber-600 text-stone-950 font-black text-sm shadow-md">
                  {step.stepNumber}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-stone-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300 border border-stone-800">
                      {step.badge}
                    </span>
                    <span className="text-xs text-stone-500">• Бюджет: {step.costEstimate}</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-100 mt-1">{step.title}</h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={step.toolUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition-colors"
                >
                  <span>{step.toolName}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Action Summary */}
            <p className="text-xs sm:text-sm font-medium text-stone-200 leading-relaxed bg-stone-900/60 rounded-xl p-3.5 border border-stone-800/80">
              💡 <span className="text-amber-300 font-bold">Суть шага:</span> {step.actionSummary}
            </p>

            {/* Detailed Instructions */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                Пошаговые действия:
              </span>
              <div className="space-y-2">
                {step.detailedInstructions.map((inst, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-stone-300 rounded-lg bg-stone-900/40 p-2.5 border border-stone-800/50">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{inst}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tips */}
            <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-4 space-y-1.5 text-xs">
              <span className="font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                Секреты мастерства (Pro-Tips):
              </span>
              <ul className="space-y-1 text-stone-300">
                {step.proTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-400">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
