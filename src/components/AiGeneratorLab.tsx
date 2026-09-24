import React, { useState } from "react";
import { Sparkles, Send, Copy, Check, MessageSquare, Flame, BookOpen, Palette, RefreshCw, Bot, Trees, AlertCircle } from "lucide-react";

export const AiGeneratorLab: React.FC = () => {
  const [activeTool, setActiveTool] = useState<"reels" | "post" | "prompts" | "chat">("reels");

  // Reels Generator State
  const [reelsTopic, setReelsTopic] = useState("Как восстановить печень и сбросить отеки без голодания");
  const [reelsAudience, setReelsAudience] = useState("Мужчины и женщины 40-65 лет, уставшие от химии");
  const [reelsGoal, setReelsGoal] = useState("Перевести в Директ за кодовым словом ПЕЧЕНЬ");
  const [reelsResult, setReelsResult] = useState<string | null>(null);
  const [reelsLoading, setReelsLoading] = useState(false);

  // Post Generator State
  const [postTopic, setPostTopic] = useState("5 сибирских трав, которые нормализуют давление без скачков");
  const [postResult, setPostResult] = useState<string | null>(null);
  const [postLoading, setPostLoading] = useState(false);

  // Prompts Generator State
  const [promptScene, setPromptScene] = useState("Портрет Ждана в кедровом лесу на рассвете с чашкой парящего взвара");
  const [promptDetails, setPromptDetails] = useState("Мягкий золотистый свет, льняная рубашка, пар от чая, добрый мудрый взгляд");
  const [promptsResult, setPromptsResult] = useState<string | null>(null);
  const [promptsLoading, setPromptsLoading] = useState(false);

  // Live Persona Chat State
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "zhdan"; text: string }[]>([
    {
      sender: "zhdan",
      text: "Доброго здравия, друг мой! Я Ждан Таёжный. Спрашивай о сибирских травах, здоровье ЖКТ, бодрости духа или о том, как запустить этот блог. Чем могу пособить?"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // 1. Generate Reels
  const handleGenerateReels = async () => {
    setReelsLoading(true);
    setApiError(null);
    try {
      const res = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "reels",
          topic: reelsTopic,
          audience: reelsAudience,
          goal: reelsGoal,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setReelsResult(data.result);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || "Ошибка генерации. Проверьте подключение.");
    } finally {
      setReelsLoading(false);
    }
  };

  // 2. Generate Post / Carousel
  const handleGeneratePost = async () => {
    setPostLoading(true);
    setApiError(null);
    try {
      const res = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "post",
          topic: postTopic,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPostResult(data.result);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || "Ошибка генерации.");
    } finally {
      setPostLoading(false);
    }
  };

  // 3. Generate MJ/Flux Prompts
  const handleGeneratePrompts = async () => {
    setPromptsLoading(true);
    setApiError(null);
    try {
      const res = await fetch("/api/generate-prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sceneType: promptScene,
          details: promptDetails,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPromptsResult(data.result);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || "Ошибка генерации промптов.");
    } finally {
      setPromptsLoading(false);
    }
  };

  // 4. Live Chat with Zhdan
  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");
    setChatLoading(true);
    setApiError(null);

    try {
      const res = await fetch("/api/ask-zhdan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setChatMessages((prev) => [...prev, { sender: "zhdan", text: data.reply }]);
    } catch (err: any) {
      console.error(err);
      setChatMessages((prev) => [
        ...prev,
        { sender: "zhdan", text: "Прости, друг, в тайге ветер связь перебил. Но помни главное: держи голову в холоде, а печень в чистоте!" },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="rounded-2xl border border-stone-800 bg-stone-950 p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-300 border border-amber-500/30">
            Powered by Gemini 3.7 Flash
          </span>
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300 border border-emerald-500/30">
            Интерактивный ИИ-Генератор
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-stone-100 font-['Cinzel']">
          AI Лаборатория Контента и Промптов Ждана
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
          Генерируйте неограниченное количество сценариев Reels, текстов для каруселей, англоязычных промптов для Midjourney / HeyGen и ведите живой диалог с аватаром Ждана на базе Gemini AI.
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => setActiveTool("reels")}
          className={`rounded-xl p-3 text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
            activeTool === "reels"
              ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md"
              : "bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200"
          }`}
        >
          <Flame className="h-4 w-4" />
          <span>Генератор Reels</span>
        </button>

        <button
          onClick={() => setActiveTool("post")}
          className={`rounded-xl p-3 text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
            activeTool === "post"
              ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md"
              : "bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Карусели & Посты</span>
        </button>

        <button
          onClick={() => setActiveTool("prompts")}
          className={`rounded-xl p-3 text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
            activeTool === "prompts"
              ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md"
              : "bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200"
          }`}
        >
          <Palette className="h-4 w-4" />
          <span>Промпты Midjourney</span>
        </button>

        <button
          onClick={() => setActiveTool("chat")}
          className={`rounded-xl p-3 text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
            activeTool === "chat"
              ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md"
              : "bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200"
          }`}
        >
          <Trees className="h-4 w-4" />
          <span>Диалог со Жданом</span>
        </button>
      </div>

      {/* Error Alert */}
      {apiError && (
        <div className="rounded-xl border border-red-900/60 bg-red-950/30 p-3 text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{apiError}</span>
        </div>
      )}

      {/* 1. REELS GENERATOR TOOL */}
      {activeTool === "reels" && (
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 rounded-2xl border border-stone-800 bg-stone-950 p-5 space-y-4">
            <h3 className="text-sm font-bold text-stone-100 flex items-center gap-2">
              <Flame className="h-4 w-4 text-amber-400" />
              Параметры генерации сценариев Reels
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-stone-300 font-semibold block mb-1">Тема видео:</label>
                <input
                  type="text"
                  value={reelsTopic}
                  onChange={(e) => setReelsTopic(e.target.value)}
                  placeholder="Например: Саган-Дайля вместо кофе..."
                  className="w-full rounded-xl border border-stone-800 bg-stone-900 px-3 py-2 text-stone-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-stone-300 font-semibold block mb-1">Целевая аудитория:</label>
                <input
                  type="text"
                  value={reelsAudience}
                  onChange={(e) => setReelsAudience(e.target.value)}
                  className="w-full rounded-xl border border-stone-800 bg-stone-900 px-3 py-2 text-stone-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-stone-300 font-semibold block mb-1">Цель видео & Триггер в Директ:</label>
                <input
                  type="text"
                  value={reelsGoal}
                  onChange={(e) => setReelsGoal(e.target.value)}
                  className="w-full rounded-xl border border-stone-800 bg-stone-900 px-3 py-2 text-stone-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* Quick Preset buttons */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Быстрые темы:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Пихтовое масло от кашля и бронхов",
                    "Как за 3 дня убрать изжогу живицей",
                    "3 ошибки в бане, убивающие сосуды",
                    "Маралий корень для мужской силы"
                  ].map((t) => (
                    <button
                      key={t}
                      onClick={() => setReelsTopic(t)}
                      className="rounded-lg bg-stone-900 border border-stone-800 px-2 py-1 text-[10px] text-stone-400 hover:text-emerald-300"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                id="generate-reels-btn"
                disabled={reelsLoading}
                onClick={handleGenerateReels}
                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 py-2.5 text-xs font-bold text-white transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-950"
              >
                {reelsLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {reelsLoading ? "Создаю 3 сценария..." : "Сгенерировать сценарии Reels"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl border border-stone-800 bg-stone-950 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                Результат генерации (Gemini 3.7 Flash):
              </span>
              {reelsResult && (
                <button
                  onClick={() => copyText(reelsResult, "reels-result")}
                  className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-stone-200"
                >
                  {copiedKey === "reels-result" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedKey === "reels-result" ? "Скопировано" : "Копировать"}
                </button>
              )}
            </div>

            {reelsResult ? (
              <div className="rounded-xl bg-stone-900/80 border border-stone-800 p-4 text-xs text-stone-200 whitespace-pre-wrap font-mono leading-relaxed max-h-[480px] overflow-y-auto">
                {reelsResult}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-stone-500 text-xs border border-dashed border-stone-800 rounded-xl">
                <Sparkles className="h-8 w-8 text-stone-600 mb-2" />
                <p>Нажмите «Сгенерировать сценарии Reels», чтобы получить 3 вирусных видео со структурой хук-видео-войсовер-CTA.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. POSTS & CAROUSEL GENERATOR */}
      {activeTool === "post" && (
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 rounded-2xl border border-stone-800 bg-stone-950 p-5 space-y-4">
            <h3 className="text-sm font-bold text-stone-100 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-400" />
              Генератор экспертных постов и каруселей
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-stone-300 font-semibold block mb-1">Тема публикации:</label>
                <textarea
                  rows={3}
                  value={postTopic}
                  onChange={(e) => setPostTopic(e.target.value)}
                  className="w-full rounded-xl border border-stone-800 bg-stone-900 px-3 py-2 text-stone-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Быстрые темы для карусели:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Почему не усваивается магний и железо",
                    "7 признаков застоя лимфы по утрам",
                    "Чага против воспалений: рецепт",
                    "Как правильно пить горечи для желчного"
                  ].map((t) => (
                    <button
                      key={t}
                      onClick={() => setPostTopic(t)}
                      className="rounded-lg bg-stone-900 border border-stone-800 px-2 py-1 text-[10px] text-stone-400 hover:text-emerald-300"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                id="generate-post-btn"
                disabled={postLoading}
                onClick={handleGeneratePost}
                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 py-2.5 text-xs font-bold text-white transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-950"
              >
                {postLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {postLoading ? "Генерирую текст..." : "Сгенерировать пост и карусель"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl border border-stone-800 bg-stone-950 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                Текст карусели и публикации:
              </span>
              {postResult && (
                <button
                  onClick={() => copyText(postResult, "post-result")}
                  className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-stone-200"
                >
                  {copiedKey === "post-result" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedKey === "post-result" ? "Скопировано" : "Копировать"}
                </button>
              )}
            </div>

            {postResult ? (
              <div className="rounded-xl bg-stone-900/80 border border-stone-800 p-4 text-xs text-stone-200 whitespace-pre-wrap font-mono leading-relaxed max-h-[480px] overflow-y-auto">
                {postResult}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-stone-500 text-xs border border-dashed border-stone-800 rounded-xl">
                <BookOpen className="h-8 w-8 text-stone-600 mb-2" />
                <p>Заполните тему и нажмите кнопку для создания экспертного поста со слайдами для Instagram.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. PROMPT ENGINEER TOOL */}
      {activeTool === "prompts" && (
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 rounded-2xl border border-stone-800 bg-stone-950 p-5 space-y-4">
            <h3 className="text-sm font-bold text-stone-100 flex items-center gap-2">
              <Palette className="h-4 w-4 text-amber-400" />
              Генератор промптов Midjourney / Flux / Kling
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-stone-300 font-semibold block mb-1">Сцена / Сюжет фотосессии:</label>
                <input
                  type="text"
                  value={promptScene}
                  onChange={(e) => setPromptScene(e.target.value)}
                  className="w-full rounded-xl border border-stone-800 bg-stone-900 px-3 py-2 text-stone-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-stone-300 font-semibold block mb-1">Детали (свет, одежда, реквизит):</label>
                <textarea
                  rows={2}
                  value={promptDetails}
                  onChange={(e) => setPromptDetails(e.target.value)}
                  className="w-full rounded-xl border border-stone-800 bg-stone-900 px-3 py-2 text-stone-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Готовые сцены:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Ждан собирает чагу с березы",
                    "Ждан заваривает травы в деревянной избе",
                    "Ждан выходит из бревенчатой бани с веником",
                    "Макросъемка: руки Ждана перебирают сушеные травы"
                  ].map((s) => (
                    <button
                      key={s}
                      onClick={() => setPromptScene(s)}
                      className="rounded-lg bg-stone-900 border border-stone-800 px-2 py-1 text-[10px] text-stone-400 hover:text-emerald-300"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                id="generate-prompts-btn"
                disabled={promptsLoading}
                onClick={handleGeneratePrompts}
                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 py-2.5 text-xs font-bold text-white transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-950"
              >
                {promptsLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {promptsLoading ? "Составляю промпты..." : "Сгенерировать англоязычные промпты"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl border border-stone-800 bg-stone-950 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                Промпты для Midjourney, Flux & Kling:
              </span>
              {promptsResult && (
                <button
                  onClick={() => copyText(promptsResult, "prompts-result")}
                  className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-stone-200"
                >
                  {copiedKey === "prompts-result" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedKey === "prompts-result" ? "Скопировано" : "Копировать"}
                </button>
              )}
            </div>

            {promptsResult ? (
              <div className="rounded-xl bg-stone-900/80 border border-stone-800 p-4 text-xs text-stone-200 whitespace-pre-wrap font-mono leading-relaxed max-h-[480px] overflow-y-auto">
                {promptsResult}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-stone-500 text-xs border border-dashed border-stone-800 rounded-xl">
                <Palette className="h-8 w-8 text-stone-600 mb-2" />
                <p>Получите профессиональные промпты с правильными параметрами соотношения сторон, освещения и параметров консистентности лица.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. LIVE DIALOG WITH ZHDAN PERSONA */}
      {activeTool === "chat" && (
        <div className="rounded-2xl border border-stone-800 bg-stone-950 p-6 space-y-4">
          <div className="flex items-center gap-3 border-b border-stone-800 pb-4">
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-emerald-500/50 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                alt="Ждан"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-100 flex items-center gap-2">
                Ждан Таёжный (Живой диалог с AI-персоной)
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
              <p className="text-xs text-stone-400">
                Задайте любой вопрос по рецептам, травам или протестируйте подачу голоса персонажа
              </p>
            </div>
          </div>

          {/* Chat Container */}
          <div className="h-96 overflow-y-auto space-y-3 rounded-2xl bg-stone-900/60 p-4 border border-stone-800 text-xs">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 space-y-1 ${
                    msg.sender === "user"
                      ? "bg-emerald-700 text-white rounded-br-none"
                      : "bg-stone-800 border border-stone-700 text-stone-100 rounded-bl-none shadow-md"
                  }`}
                >
                  {msg.sender === "zhdan" && (
                    <span className="text-[10px] font-bold text-emerald-400 block mb-0.5">
                      Ждан Таёжный:
                    </span>
                  )}
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-stone-800 border border-stone-700 p-3 text-stone-400 text-xs flex items-center gap-2">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-emerald-400" />
                  <span>Ждан думает и заваривает взвар...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input & Quick questions */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                placeholder="Спросите у Ждана: «Как избавиться от усталости?» или «Какой сбор посоветуешь для печени?»"
                className="flex-1 rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-xs text-stone-200 placeholder-stone-500 focus:border-emerald-500 focus:outline-none"
              />
              <button
                disabled={chatLoading || !chatInput.trim()}
                onClick={handleSendChat}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 px-4 py-2.5 text-xs font-bold text-white transition-colors flex items-center gap-1.5 shrink-0 shadow-md"
              >
                <Send className="h-4 w-4" />
                <span>Спросить</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                "Ждан, с чего начать утро человеку в городе?",
                "Как отличить настоящую чагу от подделки?",
                "Что пить мужчине после 45 для энергии?",
                "Какой чай заварить на ночь от тревоги?"
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setChatInput(q);
                  }}
                  className="rounded-lg bg-stone-900 border border-stone-800 px-2.5 py-1 text-[11px] text-stone-400 hover:text-emerald-300 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
