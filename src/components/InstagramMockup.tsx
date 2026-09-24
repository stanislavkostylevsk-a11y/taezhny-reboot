import React, { useState } from "react";
import { INSTAGRAM_BIO_OPTIONS, HIGHLIGHTS_DATA, INSTAGRAM_FEED_POSTS } from "../data/zhdanData";
import { InstagramBioOption, HighlightStory, InstagramPost } from "../types";
import { APP_IMAGES, FALLBACK_IMAGES } from "../assets/images";
import { Check, Copy, Heart, MessageCircle, Bookmark, Play, Layers, X, Sparkles, Send, Bot, ShieldCheck, ChevronRight, ChevronLeft, ExternalLink } from "lucide-react";

export const InstagramMockup: React.FC = () => {
  const [selectedBio, setSelectedBio] = useState<InstagramBioOption>(INSTAGRAM_BIO_OPTIONS[0]);
  const [copiedBio, setCopiedBio] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState<HighlightStory | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [copiedPostPrompt, setCopiedPostPrompt] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);

  // Direct bot simulator state
  const [directMessages, setDirectMessages] = useState<{ sender: "user" | "bot"; text: string; link?: string }[]>([
    { sender: "bot", text: "🌲 Доброго здравия! Я помощник Ждана Таёжного. Напишите любое кодовое слово из Reels (например: ВЗВАР, ЧАГА, ВОДА или ПЕРЕЗАПУСК) — и я вышлю вам бесплатный материал!" }
  ]);
  const [inputDirectText, setInputDirectText] = useState("");

  const handleCopyBio = () => {
    const fullBioText = `${selectedBio.line1}\n${selectedBio.line2}\n${selectedBio.line3}\n${selectedBio.cta}\n${selectedBio.linkText}`;
    navigator.clipboard.writeText(fullBioText);
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2000);
  };

  const handleSendDirectMessage = (textToSend?: string) => {
    const query = (textToSend || inputDirectText).trim().toUpperCase();
    if (!query) return;

    const newMsgs = [...directMessages, { sender: "user" as const, text: query }];
    setDirectMessages(newMsgs);
    setInputDirectText("");

    setTimeout(() => {
      let botReply = "";
      let botLink = "";
      if (query.includes("ВЗВАР") || query.includes("РЕЦЕПТ")) {
        botReply = "🍵 Приветствую! Вот ваша памятка: «Рецепт утреннего сибирского взвара на Саган-Дайля и чаге». Скачивайте безоплатно!";
        botLink = "Открыть гайд (PDF, 2.4 MB)";
      } else if (query.includes("ВОДА") || query.includes("ЖКТ")) {
        botReply = "💧 Ловите протокол запуска желчеоттока и правильной температуры утренней воды. Уже через 3 дня уйдут вздутия!";
        botLink = "Скачать схему утренней воды";
      } else if (query.includes("ЧАГА")) {
        botReply = "🍄 Вот руководство: «Как заваривать дикую чагу в термосе при 70°C, чтобы не разрушить полифенолы».";
        botLink = "Открыть чек-лист по чаге";
      } else if (query.includes("ПЕРЕЗАПУСК") || query.includes("КУРС") || query.includes("ДЕТОКС")) {
        botReply = "🌲 Отличный выбор! Вы можете забрать полный 14-дневный курс «Таёжный Перезапуск» по специальной цене для подписчиков всего за 990 ₽!";
        botLink = "Оформить доступ к курсу за 990 ₽";
      } else if (query.includes("СИЛА") || query.includes("МУЖ")) {
        botReply = "🔥 Держите мужской протокол «Сибирский огонь 45+»: 3 дикороса для тестостерона и энергии.";
        botLink = "Забрать мужской протокол";
      } else {
        botReply = `🌲 Приветствую! Ждан передает поклон. Держите наш главный подарок — гайд «5 трав тайги, заменяющих 10 аптечных таблеток»!`;
        botLink = "Скачать гайд «5 трав» (PDF)";
      }

      setDirectMessages((prev) => [...prev, { sender: "bot", text: botReply, link: botLink }]);
    }, 600);
  };

  const openHighlight = (h: HighlightStory) => {
    setActiveHighlight(h);
    setCurrentSlideIndex(0);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Bio Selector Bar */}
      <div className="rounded-2xl border border-stone-800 bg-stone-900/50 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              Конструктор продающей шапки профиля (Bio Selector)
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Выберите целевую стратегию упаковки шапки. Мокап профиля обновится мгновенно.
            </p>
          </div>
          <button
            id="copy-active-bio-btn"
            onClick={handleCopyBio}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-semibold text-white transition-all shadow-md shadow-emerald-950"
          >
            {copiedBio ? (
              <>
                <Check className="h-4 w-4" />
                Шапка скопирована!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Скопировать Bio для Instagram
              </>
            )}
          </button>
        </div>

        {/* Bio Pills */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {INSTAGRAM_BIO_OPTIONS.map((bio) => (
            <button
              key={bio.id}
              onClick={() => setSelectedBio(bio)}
              className={`rounded-xl p-3 text-left transition-all border ${
                selectedBio.id === bio.id
                  ? "bg-emerald-950/80 border-emerald-500 text-emerald-100 shadow-sm"
                  : "bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-200">{bio.name}</span>
                {selectedBio.id === bio.id && <span className="h-2 w-2 rounded-full bg-emerald-400" />}
              </div>
              <p className="text-[11px] text-stone-400 mt-1 leading-snug">{bio.targetFocus}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Instagram Visual Mockup & Direct Bot Simulator */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Instagram Profile Canvas (Mobile App Style) */}
        <div className="lg:col-span-8 rounded-3xl border border-stone-800 bg-stone-950 shadow-2xl overflow-hidden">
          {/* Mockup Header Bar */}
          <div className="flex items-center justify-between border-b border-stone-800/80 bg-stone-900/60 px-4 py-3 text-xs text-stone-400">
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-200">zhdan_taezhny</span>
              <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[10px] font-bold text-emerald-400">
                Official AI Creator
              </span>
            </div>
            <div className="flex items-center gap-3 text-stone-300">
              <span className="text-[11px] font-mono">Интерактивный предпросмотр</span>
            </div>
          </div>

          {/* Profile Header */}
          <div className="p-5 sm:p-6 space-y-5">
            {/* Stats Row */}
            <div className="flex items-center gap-4 sm:gap-8">
              {/* Avatar with Story Gradient Ring */}
              <div className="relative group shrink-0 cursor-pointer" onClick={() => openHighlight(HIGHLIGHTS_DATA[0])}>
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-emerald-500 to-amber-300">
                  <div className="h-full w-full rounded-full border-2 border-stone-950 overflow-hidden bg-stone-900">
                    <img
                      src={APP_IMAGES.zhdan}
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGES.zhdan;
                      }}
                      alt="Ждан Таёжный"
                      className="h-full w-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-[12px] font-bold border-2 border-stone-950">
                  +
                </span>
              </div>

              {/* Counters */}
              <div className="flex flex-1 justify-around text-center text-xs">
                <div>
                  <div className="text-base sm:text-lg font-bold text-stone-100">112</div>
                  <div className="text-stone-400 text-[11px]">публикаций</div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-stone-100">48.2K</div>
                  <div className="text-stone-400 text-[11px]">подписчиков</div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-stone-100">42</div>
                  <div className="text-stone-400 text-[11px]">подписки</div>
                </div>
              </div>
            </div>

            {/* Profile Bio */}
            <div className="space-y-1 text-xs sm:text-sm">
              <div className="font-bold text-stone-100 text-sm">{selectedBio.line1}</div>
              <div className="text-stone-300">{selectedBio.line2}</div>
              <div className="text-stone-300">{selectedBio.line3}</div>
              <div className="text-amber-300 font-medium pt-1">{selectedBio.cta}</div>
              <div className="flex items-center gap-1 text-emerald-400 font-semibold pt-0.5 hover:underline cursor-pointer">
                <span>🔗 {selectedBio.linkText}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-xs font-semibold">
              <button
                onClick={() => handleSendDirectMessage("ПЕРЕЗАПУСК")}
                className="rounded-lg bg-emerald-700 hover:bg-emerald-600 py-2 text-white transition-colors text-center"
              >
                Подписаться
              </button>
              <button
                onClick={() => handleSendDirectMessage("ВЗВАР")}
                className="rounded-lg bg-stone-800 hover:bg-stone-700 py-2 text-stone-200 transition-colors text-center"
              >
                Сообщение
              </button>
              <button
                onClick={handleCopyBio}
                className="rounded-lg bg-stone-800 hover:bg-stone-700 py-2 text-stone-200 transition-colors text-center"
              >
                Поделиться
              </button>
            </div>

            {/* Highlights Stories Carousel */}
            <div className="space-y-2 pt-2 border-t border-stone-800/80">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  Актуальное (Highlights) • Нажмите для просмотра сторис
                </span>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                {HIGHLIGHTS_DATA.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => openHighlight(h)}
                    className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
                  >
                    <div className="h-16 w-16 rounded-full p-0.5 bg-gradient-to-tr from-amber-600/60 to-emerald-600/60 group-hover:from-amber-400 group-hover:to-emerald-400 transition-all">
                      <div className="h-full w-full rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-xs font-bold text-amber-200">
                        {h.title.split(" ")[0]}
                      </div>
                    </div>
                    <span className="text-[11px] text-stone-300 font-medium whitespace-nowrap max-w-[72px] truncate">
                      {h.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Feed Tabs */}
            <div className="flex border-t border-stone-800 pt-3">
              <div className="flex-1 flex justify-center pb-2 border-b-2 border-emerald-400 text-xs font-bold text-emerald-400">
                Публикации & Reels (9)
              </div>
            </div>

            {/* Posts Grid (3x3) */}
            <div className="grid grid-cols-3 gap-1 sm:gap-2">
              {INSTAGRAM_FEED_POSTS.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="group relative aspect-square overflow-hidden rounded-lg bg-stone-900 cursor-pointer border border-stone-800/50"
                >
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Badge top-right */}
                  <div className="absolute top-1.5 right-1.5 rounded bg-stone-950/80 p-1 text-white">
                    {post.type === "reels" && <Play className="h-3.5 w-3.5 fill-white" />}
                    {post.type === "carousel" && <Layers className="h-3.5 w-3.5" />}
                    {post.type === "single" && <Bookmark className="h-3.5 w-3.5" />}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-stone-950/80 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between text-white">
                    <span className="text-[10px] font-bold text-emerald-300 line-clamp-1">{post.category}</span>
                    <p className="text-[11px] font-semibold line-clamp-3 leading-tight text-stone-100">{post.title}</p>
                    <div className="flex items-center justify-between text-[10px] text-stone-300 pt-1 border-t border-stone-800">
                      <span>{post.viewsOrLikes}</span>
                      <span className="text-amber-400 font-bold">Подробнее →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Direct Funnel Bot Simulator */}
        <div className="lg:col-span-4 rounded-3xl border border-stone-800 bg-stone-950 p-5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2.5 border-b border-stone-800 pb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-100 flex items-center gap-1.5">
                ManyChat Direct Воронка
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </h4>
              <p className="text-[11px] text-stone-400">Симуляция автовыдачи лид-магнитов</p>
            </div>
          </div>

          {/* Chat Messages Container */}
          <div className="h-80 overflow-y-auto space-y-2.5 rounded-2xl bg-stone-900/60 p-3.5 border border-stone-800/80 text-xs">
            {directMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 space-y-1.5 ${
                    msg.sender === "user"
                      ? "bg-emerald-700 text-white rounded-br-none"
                      : "bg-stone-800 border border-stone-700/80 text-stone-200 rounded-bl-none shadow-sm"
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  {msg.link && (
                    <button
                      onClick={() => alert(`Симуляция: Пользователь переходит по ссылке "${msg.link}" на получение лид-магнита или оплату через Prodamus.`)}
                      className="mt-1 flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {msg.link}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Trigger Chips */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
              Нажмите триггерное слово для теста:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {["ВЗВАР", "ВОДА", "ЧАГА", "ПЕРЕЗАПУСК", "СИЛА"].map((word) => (
                <button
                  key={word}
                  onClick={() => handleSendDirectMessage(word)}
                  className="rounded-lg border border-stone-700 bg-stone-900 hover:bg-emerald-900/60 hover:border-emerald-500/50 px-2.5 py-1 text-[11px] font-semibold text-stone-300 hover:text-emerald-200 transition-colors"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input Box */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputDirectText}
              onChange={(e) => setInputDirectText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendDirectMessage()}
              placeholder="Напишите кодовое слово..."
              className="flex-1 rounded-xl border border-stone-800 bg-stone-900 px-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:border-emerald-500 focus:outline-none"
            />
            <button
              onClick={() => handleSendDirectMessage()}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Story Highlight Viewer Modal */}
      {activeHighlight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/90 backdrop-blur-md p-4 animate-fadeIn">
          <div className="relative w-full max-w-sm rounded-3xl border border-stone-800 bg-stone-900 shadow-2xl overflow-hidden flex flex-col h-[560px]">
            {/* Story Progress Bars */}
            <div className="absolute top-3 left-3 right-3 z-20 flex gap-1">
              {activeHighlight.slides.map((_, idx) => (
                <div key={idx} className="h-1 flex-1 rounded-full bg-stone-700 overflow-hidden">
                  <div
                    className={`h-full bg-emerald-400 transition-all duration-300 ${
                      idx <= currentSlideIndex ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Story Header */}
            <div className="absolute top-6 left-4 right-4 z-20 flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full overflow-hidden border border-emerald-400">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                    alt="Ждан"
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-bold">zhdan_taezhny</span>
                <span className="text-stone-400">• {activeHighlight.title}</span>
              </div>
              <button
                onClick={() => setActiveHighlight(null)}
                className="rounded-full bg-stone-950/60 p-1 text-stone-300 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Story Content Slide */}
            <div className="relative flex-1 flex flex-col justify-end p-6 bg-gradient-to-b from-stone-900 via-stone-950 to-emerald-950/80 text-white space-y-4">
              <div className="rounded-2xl border border-stone-800 bg-stone-900/90 p-4 space-y-2 backdrop-blur-md">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Слайд {currentSlideIndex + 1} из {activeHighlight.slides.length}: {activeHighlight.slides[currentSlideIndex].title}
                </span>
                <p className="text-sm font-medium leading-relaxed text-stone-100">
                  {activeHighlight.slides[currentSlideIndex].text}
                </p>
                <p className="text-[11px] text-emerald-300/90 italic pt-1 border-t border-stone-800">
                  📸 Визуал: {activeHighlight.slides[currentSlideIndex].visualTip}
                </p>
                {activeHighlight.slides[currentSlideIndex].interactiveElement && (
                  <div className="mt-2 rounded-xl bg-amber-500/20 border border-amber-500/40 p-2 text-center text-xs font-bold text-amber-200">
                    {activeHighlight.slides[currentSlideIndex].interactiveElement}
                  </div>
                )}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                  className="flex items-center gap-1 rounded-xl bg-stone-800 px-3 py-1.5 text-xs text-stone-300 disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" /> Назад
                </button>
                <button
                  onClick={() => {
                    if (currentSlideIndex < activeHighlight.slides.length - 1) {
                      setCurrentSlideIndex((prev) => prev + 1);
                    } else {
                      setActiveHighlight(null);
                    }
                  }}
                  className="flex items-center gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-md"
                >
                  {currentSlideIndex < activeHighlight.slides.length - 1 ? (
                    <>Далее <ChevronRight className="h-4 w-4" /></>
                  ) : (
                    "Завершить"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/90 backdrop-blur-md p-4 animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl border border-stone-800 bg-stone-900 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-800 p-4 bg-stone-950">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-950 border border-emerald-500/30 px-2 py-0.5 text-xs font-bold text-emerald-400">
                  {selectedPost.type.toUpperCase()}
                </span>
                <h4 className="text-sm font-bold text-stone-200 line-clamp-1">{selectedPost.title}</h4>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="rounded-lg bg-stone-800 p-1.5 text-stone-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 space-y-5 text-xs">
              {/* Hook Card */}
              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3.5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Вирусный хук (Первые 3 секунды):
                </span>
                <p className="text-xs font-semibold text-amber-200 italic font-serif">
                  {selectedPost.hook}
                </p>
              </div>

              {/* Carousel Slides if applicable */}
              {selectedPost.slides && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-stone-300 uppercase tracking-wider">
                    Слайды для карусели:
                  </span>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selectedPost.slides.map((slide, i) => (
                      <div key={i} className="rounded-lg bg-stone-950 border border-stone-800 p-2.5 text-stone-300 font-medium">
                        {slide}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Caption Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-300 uppercase tracking-wider">
                    Полный текст публикации (Caption):
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedPost.caption);
                      setCopiedCaption(true);
                      setTimeout(() => setCopiedCaption(false), 2000);
                    }}
                    className="inline-flex items-center gap-1 rounded bg-stone-800 hover:bg-stone-700 px-2 py-1 text-[11px] text-stone-200"
                  >
                    {copiedCaption ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    {copiedCaption ? "Скопировано" : "Копировать текст"}
                  </button>
                </div>
                <div className="rounded-xl border border-stone-800 bg-stone-950 p-4 font-mono text-[11px] text-stone-300 whitespace-pre-wrap leading-relaxed select-all">
                  {selectedPost.caption}
                </div>
              </div>

              {/* Midjourney Visual Prompt */}
              <div className="rounded-xl border border-stone-800 bg-stone-950 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                    <Sparkles className="h-3.5 w-3.5" />
                    Промпт для генерации обложки / кадра в Midjourney:
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedPost.midjourneyPrompt);
                      setCopiedPostPrompt(true);
                      setTimeout(() => setCopiedPostPrompt(false), 2000);
                    }}
                    className="text-[11px] text-stone-400 hover:text-stone-200 inline-flex items-center gap-1"
                  >
                    {copiedPostPrompt ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    {copiedPostPrompt ? "Скопировано" : "Копировать"}
                  </button>
                </div>
                <p className="font-mono text-[11px] text-stone-400 bg-stone-900 p-2.5 rounded-lg border border-stone-800 select-all">
                  {selectedPost.midjourneyPrompt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
