import React, { useState } from "react";
import { GOOGLE_AI_MASTER_PACK, ZHDAN_PERSONA } from "../data/zhdanData";
import { 
  Sparkles, 
  Camera, 
  Video, 
  Brain, 
  BookOpen, 
  Mic, 
  Copy, 
  Check, 
  Download, 
  Play, 
  Square, 
  Sliders, 
  FileText, 
  ExternalLink,
  Layers,
  Flame,
  Trees,
  Volume2
} from "lucide-react";
import confetti from "canvas-confetti";

export const GoogleAiProductionSuite: React.FC = () => {
  const [subTab, setSubTab] = useState<"imagen" | "veo" | "gemini" | "notebooklm" | "tts">("imagen");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [selectedImagenCategory, setSelectedImagenCategory] = useState<string>("all");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSpeakSample = () => {
    if ("speechSynthesis" in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }

      const cleanText = "Доброго здравия, друзья. Тайга пустых советов не даёт. Если с утра нет сил, а голова тяжелая — не торопитесь глушить сигнал третьей чашкой кофе. Дайте клетке напиться живой силы. Начните день с теплого хвойного взвара и чистой воды. Тело обязательно ответит вам благодарностью. Крепкого вам сибирского здравия!";
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.88;
      utterance.pitch = 0.85; // lower pitch for baritone

      // Try to find Russian voice
      const voices = window.speechSynthesis.getVoices();
      const ruVoice = voices.find(v => v.lang.startsWith("ru"));
      if (ruVoice) {
        utterance.voice = ruVoice;
      }

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const downloadAllGoogleAiPack = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.3 },
      colors: ["#10B981", "#F59E0B", "#3B82F6", "#EC4899"]
    });

    let doc = `# GOOGLE AI PRODUCTION MASTER PACK — ЖДАН ТАЁЖНЫЙ (63 года)
Сгенерировано для полного цикла создания AI-блогера в экосистеме Google AI
Дата: ${new Date().toLocaleDateString("ru-RU")}

===================================================================
1. GOOGLE IMAGEN 3 — ФОТОСЕССИЯ И ПОРТРЕТЫ ЖДАНА
===================================================================
`;

    GOOGLE_AI_MASTER_PACK.imagen3Prompts.forEach((p, idx) => {
      doc += `\n--- [${idx + 1}] ${p.title.toUpperCase()} ---
Категория: ${p.category} | Формат: ${p.aspectRatio}
Настройки: ${p.recommendedSettings}

PROMPT:
${p.prompt}

NEGATIVE PROMPT:
${p.negativePrompt || "N/A"}
\n`;
    });

    doc += `\n===================================================================
2. GOOGLE VEO 2 — ВИДЕО ФУТАЖИ ДЛЯ REELS И B-ROLL (9:16)
===================================================================
`;

    GOOGLE_AI_MASTER_PACK.veo2VideoPrompts.forEach((v, idx) => {
      doc += `\n--- [${idx + 1}] ${v.title.toUpperCase()} ---
Длительность: ${v.duration} | Движение камеры: ${v.cameraMotion}
Применение: ${v.usage}

PROMPT:
${v.prompt}
\n`;
    });

    doc += `\n===================================================================
3. GOOGLE GEMINI 2.5/1.5 — СИСТЕМНЫЕ ИНСТРУКЦИИ (AI STUDIO)
===================================================================
`;

    GOOGLE_AI_MASTER_PACK.geminiSystemPrompts.forEach((g, idx) => {
      doc += `\n--- [${idx + 1}] ${g.title.toUpperCase()} ---
Модель: ${g.modelRecommended} | Роль: ${g.role}

SYSTEM INSTRUCTION:
${g.systemInstruction}
\n`;
    });

    doc += `\n===================================================================
4. GOOGLE NOTEBOOKLM — БАЗА ЗНАНИЙ ДЛЯ ИНФОПРОДУКТОВ
===================================================================
`;

    GOOGLE_AI_MASTER_PACK.notebookLmPacks.forEach((n, idx) => {
      doc += `\n--- [${idx + 1}] ${n.title.toUpperCase()} ---
Для продукта: ${n.targetCourse}

ИСТОЧНИК ЗНАНИЙ (СКОПИРОВАТЬ В NOTEBOOKLM):
${n.fullKnowledgeSourceText}

ГОТОВЫЕ ПРОМПТЫ ДЛЯ NOTEBOOKLM:
`;
      n.readyPrompts.forEach((rp, rIdx) => {
        doc += `  ${rIdx + 1}. [${rp.action}]:\n  ${rp.prompt}\n\n`;
      });
    });

    doc += `\n===================================================================
5. GOOGLE CLOUD TEXT-TO-SPEECH — ГОЛОС И SSML ОЗВУЧКА
===================================================================
Голос: ${GOOGLE_AI_MASTER_PACK.googleTtsVoiceConfig.voiceModel}
Скорость: ${GOOGLE_AI_MASTER_PACK.googleTtsVoiceConfig.speakingRate}
Высота тона: ${GOOGLE_AI_MASTER_PACK.googleTtsVoiceConfig.pitch}

SSML КОД:
${GOOGLE_AI_MASTER_PACK.googleTtsVoiceConfig.ssmlSample}
`;

    const blob = new Blob([doc], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ZHDAN_GOOGLE_AI_MASTER_PACK.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredImagen = selectedImagenCategory === "all" 
    ? GOOGLE_AI_MASTER_PACK.imagen3Prompts 
    : GOOGLE_AI_MASTER_PACK.imagen3Prompts.filter(p => p.category === selectedImagenCategory);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/90 via-stone-900/90 to-amber-950/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              100% Google AI Ecosystem Workflow
            </div>
            <h2 className="font-['Cinzel'] text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-100 tracking-wide">
              Google AI Production Hub
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              Полный комплект протестированных мастер-промптов, системных инструкций для Google AI Studio, 
              видео-шаблонов Veo 2, базы знаний для NotebookLM и параметров голоса Google Cloud TTS для блогера Ждана Таёжного.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={downloadAllGoogleAiPack}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-950/50 hover:from-emerald-500 hover:to-teal-500 transition-all active:scale-95"
            >
              <Download className="h-4 w-4" />
              Скачать весь Google AI Пак (.MD)
            </button>
            <a
              href="https://aistudio.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-700 bg-stone-800/80 px-3.5 py-3 text-xs font-medium text-stone-300 hover:bg-stone-700 hover:text-white transition-all"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Google AI Studio
            </a>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-800 pb-3">
        {[
          { id: "imagen", label: "Google Imagen 3 (Фото & Портреты)", icon: Camera, count: GOOGLE_AI_MASTER_PACK.imagen3Prompts.length },
          { id: "veo", label: "Google Veo 2 (Reels & B-roll Видео)", icon: Video, count: GOOGLE_AI_MASTER_PACK.veo2VideoPrompts.length },
          { id: "gemini", label: "Gemini System Prompts (AI Studio)", icon: Brain, count: GOOGLE_AI_MASTER_PACK.geminiSystemPrompts.length },
          { id: "notebooklm", label: "Google NotebookLM (Инфопродукты)", icon: BookOpen, count: GOOGLE_AI_MASTER_PACK.notebookLmPacks.length },
          { id: "tts", label: "Google Cloud TTS (Озвучка)", icon: Volume2, count: 1 },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40 shadow-sm"
                  : "bg-stone-900/60 text-stone-400 hover:bg-stone-900 hover:text-stone-200 border border-stone-800/60"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-emerald-400" : "text-stone-500"}`} />
              <span>{tab.label}</span>
              <span className="rounded-full bg-stone-800 px-1.5 py-0.2 text-[10px] text-stone-300">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: GOOGLE IMAGEN 3 */}
      {subTab === "imagen" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Category Filter & Guidelines */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-900/40 rounded-2xl border border-stone-800 p-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-stone-400 mr-1">Фильтр:</span>
              {[
                { id: "all", label: "Все промпты" },
                { id: "portrait", label: "Портреты Ждана" },
                { id: "lifestyle", label: "Лаборатория трав" },
                { id: "nature", label: "Природа & Сбор" },
                { id: "banya", label: "Баня" },
                { id: "macro", label: "Макро Чага/Чай" },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedImagenCategory(cat.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    selectedImagenCategory === cat.id
                      ? "bg-emerald-900/80 text-emerald-200 border border-emerald-500/30"
                      : "bg-stone-800/60 text-stone-400 hover:text-stone-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="text-xs text-amber-300/90 flex items-center gap-1.5 shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Формат для Instagram: 4:5 (Посты) или 9:16 (Reels Cover)</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredImagen.map(item => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/70 p-5 sm:p-6 transition-all hover:border-emerald-500/40 hover:bg-stone-900/90 shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-emerald-950 px-2 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-800/40">
                          {item.aspectRatio}
                        </span>
                        <span className="rounded-md bg-stone-800 px-2 py-0.5 text-[11px] text-stone-300">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="mt-2 text-base font-bold text-stone-100 group-hover:text-emerald-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-stone-400">
                        {item.description}
                      </p>
                    </div>

                    <button
                      onClick={() => copyToClipboard(item.prompt, item.id)}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/60 hover:text-emerald-100 transition-all active:scale-95"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Скопировано!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Копировать</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Prompt Box */}
                  <div className="relative rounded-xl border border-stone-800/90 bg-stone-950/90 p-3.5 text-xs font-mono text-stone-300 leading-relaxed">
                    <p className="select-all">{item.prompt}</p>
                  </div>

                  {/* Negative Prompt */}
                  {item.negativePrompt && (
                    <div className="rounded-xl border border-red-900/20 bg-red-950/10 p-2.5 text-[11px] text-stone-400">
                      <span className="font-semibold text-red-400">Negative Prompt: </span>
                      <span className="text-stone-400 select-all">{item.negativePrompt}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Режим: {item.recommendedSettings}</span>
                  <span className="text-emerald-400/80 font-medium">Google Imagen 3 Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: GOOGLE VEO 2 */}
      {subTab === "veo" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-950/10 p-4 text-xs text-amber-200/90 flex items-center gap-3">
            <Video className="h-5 w-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-amber-300">Как использовать Google Veo 2 для Reels Ждана:</p>
              <p className="text-stone-300 mt-0.5">
                Генерируйте 5-секундные вертикальные ролики (9:16) в разрешении 1080p/4K. Используйте их как B-roll перебивки между фразами говорящей головы Ждана каждые 3 секунды.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {GOOGLE_AI_MASTER_PACK.veo2VideoPrompts.map(v => (
              <div
                key={v.id}
                className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/70 p-6 hover:border-amber-500/40 hover:bg-stone-900 transition-all shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-amber-950 px-2 py-0.5 text-[11px] font-bold text-amber-400 border border-amber-800/30">
                          9:16 Vertical
                        </span>
                        <span className="rounded bg-stone-800 px-2 py-0.5 text-[11px] text-stone-400">
                          {v.duration}
                        </span>
                      </div>
                      <h3 className="mt-2 text-base font-bold text-stone-100">
                        {v.title}
                      </h3>
                      <p className="mt-1 text-xs text-stone-400">
                        {v.visualAtmosphere}
                      </p>
                    </div>

                    <button
                      onClick={() => copyToClipboard(v.prompt, v.id)}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-950/40 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-900/60 hover:text-amber-100 transition-all active:scale-95"
                    >
                      {copiedId === v.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Скопировано!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Копировать</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Prompt */}
                  <div className="rounded-xl border border-stone-800/90 bg-stone-950/90 p-3.5 text-xs font-mono text-stone-300 leading-relaxed">
                    <p className="select-all">{v.prompt}</p>
                  </div>

                  <div className="space-y-1.5 text-xs text-stone-400">
                    <p><span className="text-amber-400 font-medium">Движение камеры: </span>{v.cameraMotion}</p>
                    <p><span className="text-emerald-400 font-medium">Где использовать: </span>{v.usage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: GEMINI SYSTEM PROMPTS */}
      {subTab === "gemini" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="rounded-2xl border border-blue-500/20 bg-blue-950/20 p-4 text-xs text-blue-200/90 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Brain className="h-5 w-5 text-blue-400 shrink-0" />
              <div>
                <p className="font-semibold text-blue-300">Как запустить в Google AI Studio:</p>
                <p className="text-stone-300 mt-0.5">
                  1. Откройте <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="underline text-blue-300">Google AI Studio</a> ➡️ 2. Выберите модель <b>Gemini 2.5 Flash</b> ➡️ 3. Вставьте текст в поле <b>System Instructions</b>.
                </p>
              </div>
            </div>
            <a
              href="https://aistudio.google.com"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-500"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Открыть AI Studio
            </a>
          </div>

          <div className="space-y-6">
            {GOOGLE_AI_MASTER_PACK.geminiSystemPrompts.map(g => (
              <div
                key={g.id}
                className="rounded-2xl border border-stone-800 bg-stone-900/80 p-6 hover:border-emerald-500/30 transition-all shadow-lg space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-blue-950 px-2.5 py-0.5 text-[11px] font-bold text-blue-300 border border-blue-800/30">
                        {g.modelRecommended}
                      </span>
                      <span className="text-xs text-stone-400 font-medium">
                        {g.role}
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-stone-100">
                      {g.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => copyToClipboard(g.systemInstruction, g.id)}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/60 px-3.5 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-900 hover:text-emerald-100 transition-all active:scale-95"
                  >
                    {copiedId === g.id ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span>Скопировано в буфер!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Копировать System Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                {/* System Prompt Code Box */}
                <div className="relative rounded-xl border border-stone-800 bg-stone-950 p-4 text-xs font-mono text-stone-300 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                  {g.systemInstruction}
                </div>

                <div className="rounded-xl border border-stone-800/80 bg-stone-900/60 p-3 text-xs text-stone-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-amber-400 font-semibold">Пример запроса пользователя: </span>
                    <span className="text-stone-300 italic">"{g.sampleUserQuery}"</span>
                  </div>
                  <span className="text-[11px] text-emerald-400/90 font-medium shrink-0">
                    {g.expectedResponseSummary}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: NOTEBOOKLM */}
      {subTab === "notebooklm" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="rounded-2xl border border-teal-500/20 bg-teal-950/20 p-4 text-xs text-teal-200/90 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-teal-400 shrink-0" />
              <div>
                <p className="font-semibold text-teal-300">Как создать инфопродукт в Google NotebookLM за 5 минут:</p>
                <p className="text-stone-300 mt-0.5">
                  1. Откройте <a href="https://notebooklm.google.com" target="_blank" rel="noreferrer" className="underline text-teal-300">NotebookLM</a> ➡️ 2. Создайте новый блокнот ➡️ 3. Вставьте исходный текст базы знаний Ждана ➡️ 4. Запустите готовые промпты.
                </p>
              </div>
            </div>
            <a
              href="https://notebooklm.google.com"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-500"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Открыть NotebookLM
            </a>
          </div>

          <div className="space-y-6">
            {GOOGLE_AI_MASTER_PACK.notebookLmPacks.map(n => (
              <div
                key={n.id}
                className="rounded-2xl border border-stone-800 bg-stone-900/80 p-6 space-y-5 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="rounded bg-teal-950 px-2.5 py-0.5 text-[11px] font-bold text-teal-300 border border-teal-800/40">
                      Для продукта: {n.targetCourse}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-stone-100">
                      {n.title}
                    </h3>
                    <p className="text-xs text-stone-400 mt-1">
                      {n.sourceDocumentSummary}
                    </p>
                  </div>

                  <button
                    onClick={() => copyToClipboard(n.fullKnowledgeSourceText, `${n.id}-source`)}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-teal-500/40 bg-teal-950/60 px-3.5 py-2 text-xs font-semibold text-teal-300 hover:bg-teal-900 hover:text-teal-100 transition-all active:scale-95"
                  >
                    {copiedId === `${n.id}-source` ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span>Текст источника скопирован!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Копировать Базу Знаний</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Source Preview Box */}
                <div className="rounded-xl border border-stone-800 bg-stone-950 p-4 text-xs font-mono text-stone-300 whitespace-pre-wrap max-h-52 overflow-y-auto">
                  {n.fullKnowledgeSourceText}
                </div>

                {/* Ready Prompts for NotebookLM */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Готовые промпты для запуска в NotebookLM Chat:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {n.readyPrompts.map((rp, rIdx) => (
                      <div
                        key={rIdx}
                        className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3.5 space-y-2.5 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-emerald-400">
                              {rp.action}
                            </span>
                            <button
                              onClick={() => copyToClipboard(rp.prompt, `${n.id}-prompt-${rIdx}`)}
                              className="text-stone-400 hover:text-stone-100 p-1"
                              title="Копировать промпт"
                            >
                              {copiedId === `${n.id}-prompt-${rIdx}` ? (
                                <Check className="h-3.5 w-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </div>
                          <p className="text-xs text-stone-300 mt-1 italic">
                            "{rp.prompt}"
                          </p>
                        </div>
                        <p className="text-[10px] text-stone-500 border-t border-stone-800/60 pt-2">
                          Результат: {rp.expectedOutput}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: GOOGLE CLOUD TTS */}
      {subTab === "tts" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Parameters & Live Test */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-stone-800 bg-stone-900/80 p-6 space-y-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="rounded bg-purple-950 px-2.5 py-0.5 text-[11px] font-bold text-purple-300 border border-purple-800/40">
                      Google Cloud TTS Neural2
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-stone-100">
                      Конфигурация голоса Ждана Таёжного
                    </h3>
                  </div>

                  <button
                    onClick={handleSpeakSample}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shadow-lg active:scale-95 ${
                      isPlayingAudio
                        ? "bg-red-600 text-white hover:bg-red-500"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-purple-950/50"
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <Square className="h-4 w-4 fill-current" />
                        <span>Остановить</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 fill-current" />
                        <span>Прослушать голос (Синтез)</span>
                      </>
                    )}
                  </button>
                </div>

                {/* SSML Code */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-300">
                      Готовая SSML-разметка для озвучки:
                    </span>
                    <button
                      onClick={() => copyToClipboard(GOOGLE_AI_MASTER_PACK.googleTtsVoiceConfig.ssmlSample, "ssml-sample")}
                      className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300"
                    >
                      {copiedId === "ssml-sample" ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Скопировано!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Копировать SSML</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="rounded-xl border border-stone-800 bg-stone-950 p-4 text-xs font-mono text-stone-300 whitespace-pre-wrap leading-relaxed">
                    {GOOGLE_AI_MASTER_PACK.googleTtsVoiceConfig.ssmlSample}
                  </pre>
                </div>

                {/* Params Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="rounded-xl bg-stone-950/60 border border-stone-800 p-3 text-center">
                    <p className="text-[10px] text-stone-400 uppercase">Voice ID</p>
                    <p className="text-xs font-bold text-stone-200 mt-0.5">ru-RU-Neural2-D</p>
                  </div>
                  <div className="rounded-xl bg-stone-950/60 border border-stone-800 p-3 text-center">
                    <p className="text-[10px] text-stone-400 uppercase">Темп (Rate)</p>
                    <p className="text-xs font-bold text-amber-400 mt-0.5">0.92x (Неспешный)</p>
                  </div>
                  <div className="rounded-xl bg-stone-950/60 border border-stone-800 p-3 text-center">
                    <p className="text-[10px] text-stone-400 uppercase">Высота (Pitch)</p>
                    <p className="text-xs font-bold text-purple-400 mt-0.5">-2 semitones (Баритон)</p>
                  </div>
                  <div className="rounded-xl bg-stone-950/60 border border-stone-800 p-3 text-center">
                    <p className="text-[10px] text-stone-400 uppercase">Паузы</p>
                    <p className="text-xs font-bold text-emerald-400 mt-0.5">400-600 ms</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-6 space-y-4">
              <h4 className="text-sm font-bold text-stone-100 flex items-center gap-2">
                <Sliders className="h-4 w-4 text-purple-400" />
                Пошаговая настройка в Google Cloud:
              </h4>

              <div className="space-y-3">
                {GOOGLE_AI_MASTER_PACK.googleTtsVoiceConfig.instructions.map((inst, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-stone-300 leading-relaxed">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-950 text-[10px] font-bold text-purple-400 border border-purple-800/40">
                      {i + 1}
                    </span>
                    <span>{inst.replace(/^\d+\.\s*/, "")}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-800 text-xs text-stone-400">
                <p className="font-semibold text-stone-300">💡 Альтернатива:</p>
                <p className="mt-1">
                  Вы также можете использовать <b>Gemini Live Voice</b> (голос <i>Fenrir</i> или <i>Aoede</i> с русским акцентом) в Vertex AI для мгновенных интерактивных консультаций подписчиков.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
