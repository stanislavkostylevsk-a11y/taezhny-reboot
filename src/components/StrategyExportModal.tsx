import React, { useState } from "react";
import { ZHDAN_PERSONA, INSTAGRAM_BIO_OPTIONS, HIGHLIGHTS_DATA, INSTAGRAM_FEED_POSTS, INFOPRODUCT_CONCEPTS, REELS_SCRIPTS_DATA, TECH_PIPELINE_STEPS, GOOGLE_AI_MASTER_PACK } from "../data/zhdanData";
import { PRICING_PLANS } from "../data/landingPageData";
import { X, Copy, Check, Download, Printer, FileText, Trees } from "lucide-react";

interface StrategyExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StrategyExportModal: React.FC<StrategyExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateFullStrategyMarkdown = () => {
    return `# 🌲 ПАСПОРТ И ПОЛНАЯ УПАКОВКА AI-БЛОГЕРА «ЖДАН ТАЁЖНЫЙ»
Создано: 2026 | Ниша: Здоровье, Натуропатия, Природный Биохакинг | Возраст: 63 года
Экосистема: 100% Google AI + Hybrid Production

---

## 1. ПАСПОРТ ПЕРСОНАЖА (BRAND IDENTITY)
- **Имя**: ${ZHDAN_PERSONA.name}
- **Возраст**: ${ZHDAN_PERSONA.age} года
- **Локация**: ${ZHDAN_PERSONA.location}
- **Позиционирование**: ${ZHDAN_PERSONA.tagline}
- **Архетип**: ${ZHDAN_PERSONA.archetype}
- **Миссия**: ${ZHDAN_PERSONA.coreMission}

### 🎨 Визуальный код:
- **Лицо и образ**: ${ZHDAN_PERSONA.visualIdentity.faceDescription}
- **Одежда**: ${ZHDAN_PERSONA.visualIdentity.clothingStyle}
- **Атмосфера**: ${ZHDAN_PERSONA.visualIdentity.atmosphere}

---

## 2. GOOGLE AI MASTER PROMPT PACK

### 📸 Google Imagen 3 (Фотосессия & Портреты):
${GOOGLE_AI_MASTER_PACK.imagen3Prompts.map(p => `#### ${p.title} [${p.aspectRatio}]
- **Промпт**: \`${p.prompt}\`
- **Negative Prompt**: \`${p.negativePrompt || "N/A"}\`
- **Настройки**: ${p.recommendedSettings}
`).join("\n")}

### 🎥 Google Veo 2 (Видео для Reels & B-roll):
${GOOGLE_AI_MASTER_PACK.veo2VideoPrompts.map(v => `#### ${v.title} [${v.duration} | 9:16 Vertical]
- **Промпт**: \`${v.prompt}\`
- **Движение камеры**: ${v.cameraMotion}
- **Где применять**: ${v.usage}
`).join("\n")}

### 🧠 Google Gemini 2.5 / 1.5 System Instructions:
${GOOGLE_AI_MASTER_PACK.geminiSystemPrompts.map(g => `#### ${g.title} (${g.modelRecommended})
\`\`\`text
${g.systemInstruction}
\`\`\`
`).join("\n")}

### 📚 Google NotebookLM (База знаний и инфопродукты):
${GOOGLE_AI_MASTER_PACK.notebookLmPacks.map(n => `#### ${n.title} (Для: ${n.targetCourse})
\`\`\`markdown
${n.fullKnowledgeSourceText}
\`\`\`
`).join("\n")}

### 🎙 Google Cloud TTS (Голос Ждана):
- **Модель**: ${GOOGLE_AI_MASTER_PACK.googleTtsVoiceConfig.voiceModel}
- **Темп**: ${GOOGLE_AI_MASTER_PACK.googleTtsVoiceConfig.speakingRate}
- **Pitch**: ${GOOGLE_AI_MASTER_PACK.googleTtsVoiceConfig.pitch}
\`\`\`xml
${GOOGLE_AI_MASTER_PACK.googleTtsVoiceConfig.ssmlSample}
\`\`\`

---

## 3. ШАПКИ ПРОФИЛЯ INSTAGRAM (5 ВАРИАНТОВ BIO)
${INSTAGRAM_BIO_OPTIONS.map((b, i) => `### ${b.name}\n${b.line1}\n${b.line2}\n${b.line3}\n${b.cta}\n🔗 ${b.linkText}\n`).join("\n")}

---

## 4. СЮЖЕТЫ И АКТУАЛЬНОЕ (HIGHLIGHTS)
${HIGHLIGHTS_DATA.map((h) => `### 📌 ${h.title} (${h.slidesCount} слайдов)\n${h.description}\n${h.slides.map((s) => `- Слайд ${s.stepNumber} [${s.title}]: ${s.text} (Визуал: ${s.visualTip})`).join("\n")}\n`).join("\n")}

---

## 5. СТАРТОВЫЙ КОНТЕНТ-ПАК (ПУБЛИКАЦИИ & REELS)
${INSTAGRAM_FEED_POSTS.map((p, i) => `### Пост ${i + 1} [${p.type.toUpperCase()}]: ${p.title}\n- **Хук**: ${p.hook}\n- **Текст**:\n${p.caption}\n- **Prompt**: \`${p.midjourneyPrompt}\`\n`).join("\n---\n\n")}

---

## 6. БАНК СЦЕНАРИЕВ ВИРУСНЫХ REELS
${REELS_SCRIPTS_DATA.map((r, i) => `### Reels #${i + 1}: ${r.title} (${r.duration})\n- **Хук**: ${r.hook}\n- **Покадровый план**:\n${r.shotList.map((s) => `  * ${s.timestamp} [${s.onScreenText}]: ${s.visualAction} -> Голос: "${s.voiceoverText}"`).join("\n")}\n- **Триггер в Direct**: «${r.ctaTriggerWord}»\n- **Автоворонка**: ${r.funnelAction}\n`).join("\n---\n\n")}

---

## 7. ЛИНЕЙКА МИНИ-ИНФОПРОДУКТОВ И ЦЕНООБРАЗОВАНИЕ
${INFOPRODUCT_CONCEPTS.map((c) => `### 📦 ${c.title}\n- **Подзаголовок**: ${c.subtitle}\n- **Формат**: ${c.format}\n- **Цены**: Трипваер ${c.tripwirePrice} ₽ | Основной ${c.mainOfferPrice} ₽\n- **Лид-магнит**: ${c.leadMagnet.title} (${c.leadMagnet.hook})\n- **Программа**:\n${c.modules.map((m) => `  * ${m.title}:\n${m.lessons.map((l) => `    - ${l}`).join("\n")}\n    Результат: ${m.outcome}`).join("\n")}\n`).join("\n---\n\n")}

---

## 8. ТЕХНОЛОГИЧЕСКИЙ ПАЙПЛАЙН (5 ШАГОВ СОЗДАНИЯ)
${TECH_PIPELINE_STEPS.map((s) => `### Шаг ${s.stepNumber}: ${s.title} (${s.toolName})\n- **Суть**: ${s.actionSummary}\n${s.detailedInstructions.map((d) => `- ${d}`).join("\n")}\n`).join("\n\n")}

---

## 9. ПРОДАЮЩИЙ ОДНОСТРАНИЧНЫЙ САЙТ (LANDING PAGE)
- **Главный оффер**: «Очистите ЖКТ, перезапустите печень и верните лёгкость в теле за 14 дней»
- **Формула**: AIDA + Интерактивная самодиагностика симптомов застоя желчи
- **Тарифная сетка**:
${PRICING_PLANS.map(p => `  * **${p.name}** [${p.discountPrice} ₽ вместо ${p.originalPrice} ₽]: ${p.tagline}\n    Включает: ${p.features.join(", ")}`).join("\n")}
- **Экспорт**: Автономный файл \`landing_page.html\` доступен для скачивания во вкладке «Продающий Лендинг».`;
  };


  const handleCopyAll = () => {
    navigator.clipboard.writeText(generateFullStrategyMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/90 backdrop-blur-md p-4 animate-fadeIn">
      <div className="relative w-full max-w-4xl rounded-3xl border border-stone-800 bg-stone-900 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 p-5 bg-stone-950">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400">
              <Trees className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100 font-['Cinzel']">
                Полный Экспорт Стратегии и Упаковки Ждана Таёжного
              </h3>
              <p className="text-xs text-stone-400">
                Готовый единый документ (Markdown / Текст / Печать)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAll}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white transition-all shadow-md shadow-emerald-950"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Всё скопировано!" : "Скопировать всё"}
            </button>
            <button
              onClick={handlePrint}
              className="rounded-xl bg-stone-800 hover:bg-stone-700 p-2 text-stone-300 hover:text-white transition-colors"
              title="Печать"
            >
              <Printer className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="rounded-xl bg-stone-800 hover:bg-stone-700 p-2 text-stone-300 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="overflow-y-auto p-6 bg-stone-950 text-xs font-mono text-stone-300 whitespace-pre-wrap leading-relaxed select-all">
          {generateFullStrategyMarkdown()}
        </div>
      </div>
    </div>
  );
};
