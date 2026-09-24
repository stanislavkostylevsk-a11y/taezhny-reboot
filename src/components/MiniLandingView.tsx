import React, { useState } from "react";
import { 
  MINI_AUDIENCE_LIST, 
  MINI_PROGRAM_PHASES, 
  MINI_PACKAGE_ITEMS, 
  MINI_REVIEWS_SCREENSHOTS 
} from "../data/miniLandingData";
import { APP_IMAGES, FALLBACK_IMAGES } from "../assets/images";
import { 
  Trees, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Send, 
  CreditCard, 
  Zap, 
  Lock, 
  Smartphone, 
  Gift, 
  HeartHandshake, 
  Check, 
  Flame, 
  Star,
  Clock
} from "lucide-react";
import confetti from "canvas-confetti";

interface MiniLandingViewProps {
  onOpenFullTracker?: () => void;
}

export const MiniLandingView: React.FC<MiniLandingViewProps> = ({ onOpenFullTracker }) => {
  // 1. Interactive "Для кого это" Checked State
  const [checkedAudience, setCheckedAudience] = useState<string[]>(["aud-1", "aud-3"]);

  // 2. Inline Payment Form State
  const [payName, setPayName] = useState<string>("");
  const [payPhone, setPayPhone] = useState<string>("");
  const [payEmail, setPayEmail] = useState<string>("");
  const [payMethod, setPayMethod] = useState<string>("sbp");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>("");

  const toggleAudienceItem = (id: string) => {
    setCheckedAudience(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      const generatedOrder = "TZ-" + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(generatedOrder);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }
    }, 900);
  };

  return (
    <div className="space-y-16 py-2">
      
      {/* 1. СТРУКТУРА: ЗАГОЛОВОК-ОБЕЩАНИЕ (HERO) */}
      <section className="relative overflow-hidden rounded-3xl border border-stone-800 bg-gradient-to-b from-stone-900/90 via-stone-950 to-stone-950 p-6 sm:p-10 shadow-2xl">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Badge & Quick Offer */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/70 px-3.5 py-1 text-xs font-semibold text-emerald-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Единый комплект за 990 ₽: Протокол 14 дней + Интерактивный веб-трекер</span>
            </span>
            <span className="text-xs text-stone-400 hidden sm:inline">•</span>
            <span className="text-xs text-amber-300 font-medium hidden sm:inline">Без голодовок и аптечной химии</span>
          </div>

          {/* Core H1 Promise */}
          <h1 className="font-['Cinzel'] text-2xl sm:text-4xl lg:text-5xl font-extrabold text-stone-100 leading-tight">
            Очистите ЖКТ, перезапустите печень и <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">верните лёгкость в теле</span> за 14 дней
          </h1>

          {/* Subtitle explanation */}
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-3xl">
            Сибирская оздоровительная методика на дикоросах и физиологическом запуске оттока желчи. Все травы покупаются в любой аптеке у дома за 650–850 ₽ на весь курс.
          </p>

          {/* 4 Outcome Bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Минус 2–4 кг скрытых токсических отеков</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Чистый розовый язык без белого налета и горечи</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Плоский спокойный живот без вечернего вздутия</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Бодрость с 6:30 утра без 3-х чашек кофе</span>
            </div>
          </div>

          {/* Quick CTA to Payment Form */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a 
              href="#fast-checkout" 
              className="inline-flex justify-center items-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-8 py-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-emerald-950/80 hover:from-emerald-500 hover:to-teal-500 transition-all active:scale-95"
            >
              <span>Получить весь комплект за 990 ₽</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <div className="text-left">
              <p className="text-xs text-stone-200 font-bold">Разовая оплата • 990 ₽ вместо 2 500 ₽</p>
              <p className="text-[11px] text-stone-400">Мгновенный доступ на e-mail и в веб-приложение</p>
            </div>
          </div>

          {/* Methodology Snapshot */}
          <div className="mt-6 pt-6 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-3">
              <img 
                src={APP_IMAGES.zhdan} 
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMAGES.zhdan;
                }}
                alt="Курс Таёжный Перезапуск" 
                className="w-full aspect-square object-cover rounded-2xl border border-stone-800"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="sm:col-span-9 space-y-2">
              <div>
                <p className="font-bold text-sm text-stone-100 font-['Cinzel']">Таёжный Перезапуск</p>
                <p className="text-xs text-emerald-400">Оздоровительный курс • Горный Алтай</p>
              </div>
              <p className="text-xs text-stone-300 italic leading-relaxed">
                «Здоровье человека начинается не с аптеки, а со свободного оттока желчи и чистоты печеночных протоков. Без голодовок и насилия над телом.»
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. СТРУКТУРА: ДЛЯ КОГО ЭТО */}
      <section id="for-whom" className="space-y-6">
        <div className="max-w-4xl mx-auto space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
            <span>Проверьте себя</span>
          </div>
          <h2 className="font-['Cinzel'] text-xl sm:text-3xl font-bold text-stone-100">
            Для кого этот 14-дневный перезапуск
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 max-w-2xl">
            Печень не болит — в ней нет нервных окончаний. О застое желчи и токсической перегрузке организм сообщает через понятные симптомы. Отметьте то, что знакомо вам:
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {MINI_AUDIENCE_LIST.map((item) => {
            const isChecked = checkedAudience.includes(item.id);
            return (
              <div 
                key={item.id}
                onClick={() => toggleAudienceItem(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer select-none space-y-2 ${
                  isChecked 
                    ? "border-emerald-500/70 bg-emerald-950/30 shadow-lg shadow-emerald-950/40" 
                    : "border-stone-800 bg-stone-900/60 hover:border-stone-700"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{item.icon}</span>
                    <h3 className="font-bold text-sm text-stone-100">{item.title}</h3>
                  </div>
                  <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border text-xs transition-all ${
                    isChecked 
                      ? "bg-emerald-600 border-emerald-500 text-white" 
                      : "border-stone-700 bg-stone-950 text-transparent"
                  }`}>
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {item.description}
                </p>
                <p className="text-[11px] text-stone-400 pt-1 border-t border-stone-800/80">
                  <span className="text-emerald-400 font-medium">Физиология: </span>{item.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive summary for Audience */}
        <div className="max-w-4xl mx-auto p-4 rounded-2xl border border-stone-800 bg-stone-900/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-bold font-['Cinzel']">
              {checkedAudience.length}/6
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-stone-100">
                {checkedAudience.length === 0 && "Отметьте ваши пункты выше для самопроверки"}
                {checkedAudience.length >= 1 && checkedAudience.length <= 2 && "Начальные признаки застоя желчи (легкая коррекция)"}
                {checkedAudience.length >= 3 && "Выраженная перегрузка печени и кишечника — 14-дневный курс даст быстрое облегчение"}
              </p>
              <p className="text-[11px] text-stone-400">
                {checkedAudience.length >= 1 ? "Первые результаты (уменьшение отеков, чистый язык) заметны уже на 3–4 день." : "Нажмите на карточки с симптомами, чтобы оценить состояние."}
              </p>
            </div>
          </div>
          <a 
            href="#fast-checkout" 
            className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md"
          >
            Перейти к программе за 990 ₽ →
          </a>
        </div>
      </section>

      {/* 3. СТРУКТУРА: ПРОГРАММА ТРИПВАЕРА */}
      <section id="program" className="space-y-6">
        <div className="max-w-4xl mx-auto space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
            <span>Пошаговый алгоритм</span>
          </div>
          <h2 className="font-['Cinzel'] text-xl sm:text-3xl font-bold text-stone-100">
            Программа трипваера: 14 дней к чистому телу
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 max-w-2xl">
            Никаких голодовок. Всего 15 минут в день: утренний теплый ритуал, правильный сбор в термосе и поддержка микробиоты.
          </p>
        </div>

        {/* 2 Phases Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
          {MINI_PROGRAM_PHASES.map((phase) => (
            <div 
              key={phase.phaseNumber} 
              className="p-6 rounded-3xl border border-stone-800 bg-stone-900/80 flex flex-col justify-between space-y-4 shadow-lg hover:border-emerald-500/40 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                    {phase.daysRange}
                  </span>
                  <span className="text-[11px] bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2.5 py-0.5 rounded-full font-semibold">
                    {phase.badge}
                  </span>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-stone-100 font-['Cinzel'] leading-snug">
                  {phase.title}
                </h3>

                <p className="text-xs text-stone-400 leading-relaxed italic">
                  {phase.focus}
                </p>

                <ul className="space-y-2.5 pt-2.5 border-t border-stone-800/80">
                  {phase.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-tight">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-stone-950/90 rounded-2xl border border-stone-800 text-xs text-emerald-300">
                <span className="font-bold block text-stone-200 mb-0.5">Итог недели:</span>
                {phase.result}
              </div>
            </div>
          ))}
        </div>

        {/* Exact Package Contents */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 via-stone-900 to-stone-950 p-6 sm:p-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-bold text-sm sm:text-base text-emerald-300 font-['Cinzel']">
                Что входит в цифровой комплект за 990 ₽:
              </p>
              <p className="text-xs text-stone-400">Все материалы открываются сразу после оплаты навсегда</p>
            </div>
            <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Разово 990 ₽
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {MINI_PACKAGE_ITEMS.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-stone-200">{item.title}</span>
                  </div>
                  <p className="text-[11px] text-stone-400 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-300 border-t border-stone-800">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <Gift className="h-4 w-4 text-amber-400" />
              <span>Травы из аптеки на курс обойдутся в ~650–850 ₽ (никаких скрытых трат)</span>
            </span>
            <a 
              href="#fast-checkout" 
              className="text-emerald-400 hover:text-emerald-300 font-bold underline"
            >
              Заказать комплект за 990 ₽ →
            </a>
          </div>
        </div>
      </section>

      {/* 4. СТРУКТУРА: ОТЗЫВЫ / СКРИНШОТЫ */}
      <section id="reviews" className="space-y-6">
        <div className="max-w-4xl mx-auto space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
            <span>Честные результаты</span>
          </div>
          <h2 className="font-['Cinzel'] text-xl sm:text-3xl font-bold text-stone-100">
            Отзывы и скриншоты участников
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 max-w-2xl">
            Сообщения из закрытого Telegram-чата потока и отчеты интерактивного веб-трекера привычек.
          </p>
        </div>

        {/* Telegram Screenshot Style Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MINI_REVIEWS_SCREENSHOTS.map((review) => (
            <div 
              key={review.id}
              className="p-5 rounded-3xl border border-stone-800 bg-stone-900/90 shadow-xl space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header of message */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={review.avatarUrl} 
                      onError={(e) => {
                        if (review.fallbackAvatarUrl) {
                          e.currentTarget.src = review.fallbackAvatarUrl;
                        }
                      }}
                      alt={review.authorName} 
                      className="w-10 h-10 rounded-full object-cover border border-emerald-500/40"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-stone-100">{review.authorName}</p>
                      <p className="text-[10px] text-stone-400">{review.city} • {review.timeAgo}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded-full font-bold">
                    {review.tag}
                  </span>
                </div>

                {/* Telegram Bubble */}
                <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800/80 text-xs text-stone-200 leading-relaxed space-y-2">
                  <p>«{review.messageText}»</p>
                  <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1 border-t border-stone-900">
                    <span className="text-emerald-400 font-medium">{review.metricsBadge}</span>
                    <span>✓✓ Прочитано</span>
                  </div>
                </div>
              </div>

              {/* Telegram Reactions Bar */}
              <div className="flex items-center gap-2 pt-1 text-xs">
                <span className="inline-flex items-center gap-1 bg-stone-950 px-2.5 py-1 rounded-full border border-stone-800 text-[11px] text-stone-300">
                  <span>🔥</span> {review.fireCount}
                </span>
                <span className="inline-flex items-center gap-1 bg-stone-950 px-2.5 py-1 rounded-full border border-stone-800 text-[11px] text-stone-300">
                  <span>❤️</span> {review.likesCount}
                </span>
                <span className="ml-auto text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Подтвержденный результат
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. СТРУКТУРА: ФОРМА БЫСТРОЙ ОПЛАТЫ */}
      <section id="fast-checkout" className="max-w-4xl mx-auto">
        <div className="rounded-3xl border-2 border-emerald-500 bg-gradient-to-b from-emerald-950/80 via-stone-900 to-stone-950 p-6 sm:p-10 shadow-2xl space-y-6">
          
          {/* Header of Payment Card */}
          <div className="flex flex-wrap items-baseline justify-between gap-4 pb-5 border-b border-stone-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Форма Быстрой Оплаты
              </span>
              <h2 className="font-['Cinzel'] text-xl sm:text-3xl font-extrabold text-stone-100 mt-0.5">
                Цифровой Комплект «Таёжный Перезапуск»
              </h2>
              <p className="text-xs text-stone-300 mt-1">
                14-дневный пошаговый протокол + Интерактивный электронный веб-трекер + Рецептурник
              </p>
            </div>

            <div className="text-right">
              <div className="flex items-baseline gap-2 justify-end">
                <span className="text-4xl sm:text-5xl font-extrabold text-stone-100 font-['Cinzel']">
                  990 ₽
                </span>
                <span className="text-base sm:text-lg text-stone-500 line-through">
                  2 500 ₽
                </span>
              </div>
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded-full text-xs font-bold inline-block mt-1">
                Разовая оплата • Без подписок
              </span>
            </div>
          </div>

          {/* If Payment Succeeded */}
          {paymentSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-950/90 border border-emerald-500 space-y-4 text-center">
              <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400">
                <Check className="h-8 w-8 stroke-[3]" />
              </div>
              <h3 className="text-xl font-bold text-stone-100 font-['Cinzel']">
                Заказ {orderNumber} успешно оформлен!
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 max-w-md mx-auto leading-relaxed">
                Доступ к 14-дневному протоколу и веб-трекеру активирован. Мы также продублировали данные на указанный адрес: <span className="text-emerald-300 font-bold">{payEmail || "ваш email"}</span>.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                {onOpenFullTracker && (
                  <button
                    type="button"
                    onClick={onOpenFullTracker}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Smartphone className="h-4 w-4" />
                    <span>Открыть интерактивный трекер сейчас</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setPaymentSuccess(false)}
                  className="w-full sm:w-auto bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold px-4 py-3 rounded-xl"
                >
                  Оформить еще один заказ
                </button>
              </div>
            </div>
          ) : (
            /* Direct Inline Form */
            <form onSubmit={handlePaymentSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-300 mb-1.5 font-bold">
                    Ваше имя <span className="text-emerald-400">*</span>:
                  </label>
                  <input 
                    required 
                    type="text" 
                    value={payName}
                    onChange={(e) => setPayName(e.target.value)}
                    placeholder="Например, Алексей" 
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-stone-100 focus:outline-none focus:border-emerald-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 mb-1.5 font-bold">
                    Телефон или Telegram <span className="text-emerald-400">*</span>:
                  </label>
                  <input 
                    required 
                    type="tel" 
                    value={payPhone}
                    onChange={(e) => setPayPhone(e.target.value)}
                    placeholder="+7 (999) 000-00-00" 
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-stone-100 focus:outline-none focus:border-emerald-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 mb-1.5 font-bold">
                  Email (для отправки ссылки на трекер и PDF-руководство) <span className="text-emerald-400">*</span>:
                </label>
                <input 
                  required 
                  type="email" 
                  value={payEmail}
                  onChange={(e) => setPayEmail(e.target.value)}
                  placeholder="alexey@example.com" 
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-stone-100 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              {/* Payment Methods */}
              <div className="pt-2">
                <label className="block text-stone-300 mb-2 font-bold">
                  Способ оплаты:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label 
                    onClick={() => setPayMethod("sbp")}
                    className={`flex items-center gap-2.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      payMethod === "sbp" 
                        ? "border-emerald-500 bg-emerald-950/50 text-stone-100 shadow-md" 
                        : "border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700"
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={payMethod === "sbp"} 
                      onChange={() => setPayMethod("sbp")}
                      className="accent-emerald-500" 
                    />
                    <div>
                      <span className="font-bold block text-xs text-stone-100">⚡ СБП</span>
                      <span className="text-[10px] text-emerald-400">Без комиссии</span>
                    </div>
                  </label>

                  <label 
                    onClick={() => setPayMethod("card")}
                    className={`flex items-center gap-2.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      payMethod === "card" 
                        ? "border-emerald-500 bg-emerald-950/50 text-stone-100 shadow-md" 
                        : "border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700"
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={payMethod === "card"} 
                      onChange={() => setPayMethod("card")}
                      className="accent-emerald-500" 
                    />
                    <div>
                      <span className="font-bold block text-xs text-stone-100">💳 Карта</span>
                      <span className="text-[10px] text-stone-400">МИР, Visa, MC</span>
                    </div>
                  </label>

                  <label 
                    onClick={() => setPayMethod("sber")}
                    className={`flex items-center gap-2.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      payMethod === "sber" 
                        ? "border-emerald-500 bg-emerald-950/50 text-stone-100 shadow-md" 
                        : "border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700"
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={payMethod === "sber"} 
                      onChange={() => setPayMethod("sber")}
                      className="accent-emerald-500" 
                    />
                    <div>
                      <span className="font-bold block text-xs text-stone-100">📱 SberPay / Т-Банк</span>
                      <span className="text-[10px] text-stone-400">В 1 клик</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full py-4 sm:py-5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 shadow-2xl shadow-emerald-950/80 hover:scale-[1.01] active:scale-98 disabled:opacity-70 mt-3 cursor-pointer"
              >
                {isProcessing ? (
                  <span className="animate-pulse">Обработка защищенного платежа...</span>
                ) : (
                  <>
                    <Zap className="h-5 w-5 text-amber-300" />
                    <span>ОПЛАТИТЬ 990 ₽ И ПОЛУЧИТЬ ДОСТУП</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-stone-400 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Безопасное 256-bit соединение
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Send className="h-3.5 w-3.5 text-emerald-400" />
                  Мгновенный доступ на почту и телефон
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <HeartHandshake className="h-3.5 w-3.5 text-emerald-400" />
                  Честная гарантия качества
                </span>
              </div>
            </form>
          )}

        </div>
      </section>

    </div>
  );
};
