import React, { useState } from "react";
import { ZHDAN_PERSONA } from "../data/zhdanData";
import { APP_IMAGES, FALLBACK_IMAGES } from "../assets/images";
import { Check, Copy, Sparkles, User, Mic, Palette, ShieldCheck, HeartHandshake, BookOpen, Quote, Flame, Trees } from "lucide-react";

export const PersonaDossier: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-stone-800 bg-gradient-to-br from-stone-900 via-stone-950 to-emerald-950/40 p-6 sm:p-8">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 -mb-16 h-48 w-48 rounded-full bg-amber-500/10 blur-2xl" />

        <div className="relative z-10 grid gap-6 lg:grid-cols-12 lg:items-center">
          {/* Avatar & Visual Card */}
          <div className="lg:col-span-4 flex flex-col items-center text-center sm:flex-row sm:text-left lg:flex-col lg:text-center gap-4">
            <div className="relative group">
              <div className="relative h-44 w-44 overflow-hidden rounded-2xl border-2 border-amber-500/40 shadow-2xl shadow-emerald-950">
                <img
                  src={APP_IMAGES.zhdan}
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGES.zhdan;
                  }}
                  alt="Ждан Таёжный"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-semibold text-stone-200">
                  <span className="rounded bg-stone-900/90 px-2 py-0.5 border border-stone-700">Ждан • 63 года</span>
                  <span className="flex items-center gap-1 rounded bg-emerald-900/80 px-2 py-0.5 text-emerald-300 border border-emerald-500/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    AI Persona
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-['Cinzel'] text-2xl font-bold text-stone-100">{ZHDAN_PERSONA.name}</h2>
              <p className="text-xs font-medium text-amber-400 mt-1">{ZHDAN_PERSONA.location}</p>
              <div className="mt-3 flex flex-wrap justify-center sm:justify-start lg:justify-center gap-1.5">
                <span className="rounded-full bg-stone-800 px-2.5 py-0.5 text-[11px] text-stone-300 border border-stone-700">Травник-натуропат</span>
                <span className="rounded-full bg-stone-800 px-2.5 py-0.5 text-[11px] text-stone-300 border border-stone-700">Биохакинг 45+</span>
                <span className="rounded-full bg-stone-800 px-2.5 py-0.5 text-[11px] text-stone-300 border border-stone-700">Долголетие</span>
              </div>
            </div>
          </div>

          {/* Dossier Overview */}
          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Позиционирование & Миссия</span>
              <p className="mt-1 text-sm font-medium text-stone-200 leading-relaxed font-serif italic text-stone-300">
                «{ZHDAN_PERSONA.tagline}»
              </p>
              <p className="mt-2 text-xs text-stone-400 leading-relaxed">
                {ZHDAN_PERSONA.coreMission}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-stone-800/80 bg-stone-900/40 p-3.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                  <User className="h-4 w-4" />
                  <span>Архетип</span>
                </div>
                <p className="mt-1 text-xs text-stone-300 leading-relaxed">
                  {ZHDAN_PERSONA.archetype}
                </p>
              </div>

              <div className="rounded-xl border border-stone-800/80 bg-stone-900/40 p-3.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                  <Trees className="h-4 w-4" />
                  <span>Атмосфера & Локация</span>
                </div>
                <p className="mt-1 text-xs text-stone-300 leading-relaxed">
                  Кедровый хутор в Саянах, бревенчатый дом, пучки сушёных трав, утренний туман, баня, чай из самовара.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Identity & AI Master Prompts */}
      <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              Визуальный код и мастер-промпты для генерации лица
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Используйте эти точные промпты в Midjourney v6.1, Flux.1 и Stable Diffusion для создания консистентного образа
            </p>
          </div>
        </div>

        {/* Color Palette Tokens */}
        <div>
          <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider block mb-3">
            Фирменная цветовая палитра блога (Цвета сибирской тайги)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {ZHDAN_PERSONA.visualIdentity.colorPalette.map((color) => (
              <div key={color.name} className="rounded-xl border border-stone-800 bg-stone-950 p-3 space-y-2">
                <div
                  className="h-10 w-full rounded-lg border border-stone-700/50 shadow-inner"
                  style={{ backgroundColor: color.hex }}
                />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-200">{color.name}</span>
                    <button
                      onClick={() => copyToClipboard(color.hex, color.name)}
                      className="text-[10px] text-stone-400 hover:text-stone-200"
                    >
                      {copiedKey === color.name ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </div>
                  <span className="font-mono text-[10px] text-stone-400">{color.hex}</span>
                  <p className="text-[10px] text-stone-500 leading-tight mt-1">{color.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Master Prompts */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Midjourney Prompt */}
          <div className="rounded-xl border border-stone-800 bg-stone-950 p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" />
                Midjourney v6.1 Master Prompt (4:5 Portrait)
              </span>
              <button
                id="copy-mj-master-prompt"
                onClick={() => copyToClipboard(ZHDAN_PERSONA.visualIdentity.midjourneyMasterPrompt, "mj-prompt")}
                className="inline-flex items-center gap-1 rounded bg-stone-800 hover:bg-stone-700 px-2 py-1 text-[11px] font-medium text-stone-200 transition-colors"
              >
                {copiedKey === "mj-prompt" ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    Скопировано
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Копировать
                  </>
                )}
              </button>
            </div>
            <p className="font-mono text-[11px] text-stone-300 bg-stone-900/90 rounded-lg p-3 border border-stone-800 leading-relaxed break-words select-all">
              {ZHDAN_PERSONA.visualIdentity.midjourneyMasterPrompt}
            </p>
            <p className="text-[11px] text-stone-400">
              💡 <span className="font-semibold text-stone-300">Совет:</span> Сохраните полученное изображение как Master Reference и добавляйте <code className="text-amber-300 font-mono">--cref [URL] --cw 80</code> для других генераций.
            </p>
          </div>

          {/* Flux Prompt */}
          <div className="rounded-xl border border-stone-800 bg-stone-950 p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Palette className="h-3.5 w-3.5" />
                Flux.1 / Stable Diffusion Prompt
              </span>
              <button
                id="copy-flux-master-prompt"
                onClick={() => copyToClipboard(ZHDAN_PERSONA.visualIdentity.fluxPrompt, "flux-prompt")}
                className="inline-flex items-center gap-1 rounded bg-stone-800 hover:bg-stone-700 px-2 py-1 text-[11px] font-medium text-stone-200 transition-colors"
              >
                {copiedKey === "flux-prompt" ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    Скопировано
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Копировать
                  </>
                )}
              </button>
            </div>
            <p className="font-mono text-[11px] text-stone-300 bg-stone-900/90 rounded-lg p-3 border border-stone-800 leading-relaxed break-words select-all">
              {ZHDAN_PERSONA.visualIdentity.fluxPrompt}
            </p>
            <p className="text-[11px] text-stone-400">
              💡 <span className="font-semibold text-stone-300">Совет:</span> Подходит для генератора Kling AI и Luma Dream Machine при создании видео-анимаций.
            </p>
          </div>
        </div>
      </div>

      {/* Voice & Tone Of Voice */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* ElevenLabs Voice Profile */}
        <div className="lg:col-span-5 rounded-2xl border border-stone-800 bg-stone-900/40 p-6 space-y-4">
          <div className="flex items-center gap-2 text-stone-100 font-bold text-base border-b border-stone-800 pb-3">
            <Mic className="h-4 w-4 text-emerald-400" />
            <span>Настройка голоса в ElevenLabs</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-stone-800/60">
              <span className="text-stone-400">Имя пресета:</span>
              <span className="font-semibold text-stone-200">{ZHDAN_PERSONA.visualIdentity.elevenLabsVoicePreset.name}</span>
            </div>
            <div className="py-1.5 border-b border-stone-800/60">
              <span className="text-stone-400 block mb-1">Тембр и манера:</span>
              <span className="text-stone-200">{ZHDAN_PERSONA.visualIdentity.elevenLabsVoicePreset.timbre}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-stone-800/60">
              <div>
                <span className="text-stone-500 block text-[10px]">Скорость</span>
                <span className="font-mono font-bold text-amber-300">{ZHDAN_PERSONA.visualIdentity.elevenLabsVoicePreset.speed}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Stability</span>
                <span className="font-mono font-bold text-emerald-300">{ZHDAN_PERSONA.visualIdentity.elevenLabsVoicePreset.stability}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Exaggeration</span>
                <span className="font-mono font-bold text-stone-300">{ZHDAN_PERSONA.visualIdentity.elevenLabsVoicePreset.styleExaggeration}</span>
              </div>
            </div>

            <div className="rounded-xl border border-stone-800 bg-stone-950 p-3 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Тестовый текст для генерации:</span>
              <p className="font-serif italic text-stone-300 text-xs">
                «{ZHDAN_PERSONA.visualIdentity.elevenLabsVoicePreset.sampleText}»
              </p>
            </div>
          </div>
        </div>

        {/* Tone of Voice Rules */}
        <div className="lg:col-span-7 rounded-2xl border border-stone-800 bg-stone-900/40 p-6 space-y-4">
          <div className="flex items-center gap-2 text-stone-100 font-bold text-base border-b border-stone-800 pb-3">
            <Quote className="h-4 w-4 text-amber-400" />
            <span>Tone of Voice (Правила речи Ждана)</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            {/* DO */}
            <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-3.5 space-y-2">
              <span className="flex items-center gap-1.5 font-bold text-emerald-300 text-xs">
                <Check className="h-3.5 w-3.5" />
                ОБЯЗАТЕЛЬНО ДЕЛАТЬ:
              </span>
              <ul className="space-y-1.5 text-stone-300">
                {ZHDAN_PERSONA.toneOfVoice.doRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 shrink-0">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DONT */}
            <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-3.5 space-y-2">
              <span className="flex items-center gap-1.5 font-bold text-red-300 text-xs">
                <ShieldCheck className="h-3.5 w-3.5" />
                СТРОГО ЗАПРЕЩЕНО:
              </span>
              <ul className="space-y-1.5 text-stone-300">
                {ZHDAN_PERSONA.toneOfVoice.dontRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-red-400 shrink-0">✕</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Signature Quotes */}
          <div className="mt-4 pt-3 border-t border-stone-800/80">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
              Фирменные крылатые фразы Ждана:
            </span>
            <div className="flex flex-wrap gap-2">
              {ZHDAN_PERSONA.toneOfVoice.signaturePhrases.map((phrase, idx) => (
                <span
                  key={idx}
                  className="rounded-lg border border-stone-800 bg-stone-950 px-3 py-1.5 text-xs font-medium text-amber-200/90 font-serif italic"
                >
                  {phrase}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Pillars */}
      <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 space-y-4">
        <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-emerald-400" />
          4 ключевых столпа контент-стратегии (Матрица тем)
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ZHDAN_PERSONA.contentPillars.map((pillar) => (
            <div key={pillar.title} className="rounded-xl border border-stone-800 bg-stone-950 p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-950 px-2 py-0.5 text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
                  {pillar.percentage}% контента
                </span>
              </div>
              <h4 className="text-sm font-bold text-stone-100">{pillar.title}</h4>
              <p className="text-xs text-stone-400 leading-relaxed">{pillar.description}</p>
              <div className="pt-2 border-t border-stone-800/60">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">Примеры тем:</span>
                <ul className="space-y-1 text-[11px] text-amber-200/80">
                  {pillar.examples.map((ex, i) => (
                    <li key={i} className="leading-snug">{ex}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
