import React, { useState, useEffect } from "react";
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
  Clock,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  FileText,
  Calendar,
  Layers,
  HeartPulse,
  Droplets,
  MessageCircle,
  Headphones
} from "lucide-react";
import confetti from "canvas-confetti";
import { APP_IMAGES, FALLBACK_IMAGES } from "../assets/images";
import { 
  MINI_AUDIENCE_LIST, 
  MINI_PROGRAM_PHASES, 
  MINI_PACKAGE_ITEMS 
} from "../data/miniLandingData";
import { FAQ_DATA, COMPARISON_TABLE_DATA } from "../data/landingPageData";
import { LegalModal, LegalTabType } from "./LegalModal";
import { LEGAL_REQUISITES } from "../data/legalDocuments";

export const ClientLandingPage: React.FC = () => {
  // Legal modal state
  const [legalModalOpen, setLegalModalOpen] = useState<boolean>(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTabType>("offer");

  const openLegalModal = (tab: LegalTabType) => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#offer" || hash === "#oferta") {
        openLegalModal("offer");
      } else if (hash === "#privacy" || hash === "#policy") {
        openLegalModal("privacy");
      } else if (hash === "#requisites" || hash === "#rekvizity") {
        openLegalModal("requisites");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // 1. Countdown timer (urgent discount state)
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 18, seconds: 29 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 3, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = () => {
    const h = String(timeLeft.hours).padStart(2, "0");
    const m = String(timeLeft.minutes).padStart(2, "0");
    const s = String(timeLeft.seconds).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  // 2. Interactive Symptoms Checker
  const [checkedAudience, setCheckedAudience] = useState<string[]>(["aud-1", "aud-3"]);

  const toggleAudienceItem = (id: string) => {
    setCheckedAudience(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // 3. Inline Payment Form State
  const [payName, setPayName] = useState<string>("");
  const [payPhone, setPayPhone] = useState<string>("");
  const [payEmail, setPayEmail] = useState<string>("");
  const [payMethod, setPayMethod] = useState<string>("sbp");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>("");

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
          particleCount: 130,
          spread: 85,
          origin: { y: 0.5 },
          colors: ["#10B981", "#F59E0B", "#F3EBD9"]
        });
      } catch (err) {
        console.error(err);
      }
    }, 900);
  };

  // 5. FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setExpandedFaq(prev => (prev === index ? null : index));
  };

  // 6. Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-emerald-900 selection:text-emerald-100">
      
      {/* 1. TOP URGENCY NOTICE BAR */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-amber-950 border-b border-emerald-900/50 py-2.5 px-4 text-center text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Flame className="h-4 w-4 text-amber-400 shrink-0" />
            <span>Спец-цена со скидкой 60%: 990 ₽ вместо 2 500 ₽</span>
          </span>
          <span className="hidden sm:inline text-stone-600">•</span>
          <div className="flex items-center gap-1.5 font-mono text-stone-200">
            <Clock className="h-3.5 w-3.5 text-emerald-400" />
            <span>До закрытия набора:</span>
            <span className="bg-stone-950/80 px-2 py-0.5 rounded border border-stone-800 text-emerald-400 font-bold">
              {formatTimer()}
            </span>
          </div>
          <span className="hidden md:inline text-stone-600">•</span>
          <a
            href="#checkout"
            className="text-emerald-400 hover:text-emerald-300 font-bold underline underline-offset-2"
          >
            Зафиксировать скидку →
          </a>
        </div>
      </div>

      {/* 2. STICKY CLIENT HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-stone-950/90 border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="h-11 w-11 rounded-2xl overflow-hidden bg-stone-900 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-lg shadow-emerald-950/60 group-hover:border-emerald-400 transition-all p-0.5">
              <img 
                src="./taezhny-logo.svg" 
                alt="Таёжный Перезапуск"  
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div>
              <div className="font-['Cinzel'] font-bold text-base sm:text-lg text-stone-100 tracking-wider">
                ТАЁЖНЫЙ ПЕРЕЗАПУСК
              </div>
              <div className="text-[11px] text-emerald-400 tracking-wide flex items-center gap-1">
                <span>Оздоровительный курс • Горный Алтай</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-stone-300">
            <a href="#about" className="hover:text-emerald-400 transition-colors">О методе</a>
            <a href="#symptoms" className="hover:text-emerald-400 transition-colors">Симптомы</a>
            <a href="#program" className="hover:text-emerald-400 transition-colors">Программа 14 дней</a>
            <a href="#package" className="hover:text-emerald-400 transition-colors">Что внутри</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">Вопросы</a>
          </nav>

          {/* Action CTA */}
          <div className="flex items-center gap-3">
            <a
              href="#checkout"
              className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl transition-all shadow-lg shadow-emerald-950/60 flex items-center gap-2 active:scale-95"
            >
              <span>Получить протокол за 990 ₽</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-stone-800 text-stone-300 hover:bg-stone-900"
              aria-label="Меню"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className="w-full h-0.5 bg-stone-300 rounded"></span>
                <span className="w-full h-0.5 bg-stone-300 rounded"></span>
                <span className="w-full h-0.5 bg-stone-300 rounded"></span>
              </div>
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-stone-950 border-b border-stone-800 px-4 py-4 space-y-3 text-sm">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-stone-300 hover:text-emerald-400 font-medium"
            >
              О методе
            </a>
            <a
              href="#symptoms"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-stone-300 hover:text-emerald-400 font-medium"
            >
              Симптомы застоя желчи
            </a>
            <a
              href="#program"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-stone-300 hover:text-emerald-400 font-medium"
            >
              Программа на 14 дней
            </a>
            <a
              href="#package"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-stone-300 hover:text-emerald-400 font-medium"
            >
              Что входит в комплект
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-stone-300 hover:text-emerald-400 font-medium"
            >
              Частые вопросы (FAQ)
            </a>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION (ГЛАВНЫЙ ЭКРАН) */}
      <section id="about" className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-emerald-950/20 blur-3xl pointer-events-none rounded-full"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-amber-950/20 blur-3xl pointer-events-none rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Offer & Core Value */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-4 py-1.5 text-xs font-semibold text-emerald-300">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>14-дневный авторский протокол «Таёжный Перезапуск»</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-['Cinzel'] text-3xl sm:text-5xl lg:text-5xl font-extrabold text-stone-100 leading-[1.15] tracking-tight">
                Очистите ЖКТ, перезапустите печень и{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                  верните лёгкость в теле
                </span>{" "}
                за 14 дней
              </h1>

              {/* Subheadline */}
              <p className="text-stone-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal">
                Пошаговый физиологический запуск оттока желчи на алтайских дикоросах. Без голодовок, без аптечной химии и жестких диет.
              </p>

              {/* 4 Outcome Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-200">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-950 border border-emerald-500/60 text-emerald-400">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span>Минус 2–4 кг скрытых токсических отеков</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-200">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-950 border border-emerald-500/60 text-emerald-400">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span>Чистый розовый язык без налета и горечи</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-200">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-950 border border-emerald-500/60 text-emerald-400">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span>Плоский спокойный живот без вечернего вздутия</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-200">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-950 border border-emerald-500/60 text-emerald-400">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span>Бодрость с 6:30 утра без 3-х чашек кофе</span>
                </div>
              </div>

              {/* CTA Button Block */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#checkout"
                  className="inline-flex justify-center items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-base px-8 py-4 shadow-xl shadow-emerald-950/80 transition-all hover:scale-[1.02] active:scale-98 text-center"
                >
                  <span>ПОЛУЧИТЬ ВЕСЬ КОМПЛЕКТ ЗА 990 ₽</span>
                  <ArrowRight className="h-5 w-5" />
                </a>

                <div className="text-left space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-stone-100">990 ₽</span>
                    <span className="text-xs text-stone-500 line-through">2 500 ₽</span>
                    <span className="bg-emerald-950 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-800">
                      -60% Скидка
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400">Травы из аптеки на весь курс: ~650–850 ₽</p>
                </div>
              </div>

              {/* Additional materials podcast note */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-stone-300 text-xs">
                  <Headphones className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>В дополнительных материалах: <span className="text-emerald-300 font-semibold">подкаст-разбор методики курса</span></span>
                </div>
              </div>

            </div>

            {/* Right Column: Author Photo & Credibility Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-3xl border border-stone-800 bg-stone-900/90 p-4 sm:p-5 shadow-2xl backdrop-blur-md">
                
                {/* Photo / Visual Emblem - Compact and proportional */}
                <div className="relative overflow-hidden rounded-2xl border border-stone-800 h-60 sm:h-72 w-full bg-gradient-to-b from-emerald-950/50 to-stone-950 flex flex-col items-center justify-center p-6 text-center">
                  <img
                    src="./taezhny-logo.svg"
                    alt="Таёжный Перезапуск" 
                    className="w-32 h-32 object-contain drop-shadow-2xl mb-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none"></div>
                  
                  {/* Photo Badges */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                    <div className="text-left">
                      <div className="font-['Cinzel'] font-bold text-base sm:text-lg text-stone-100">
                        Таёжный Перезапуск
                      </div>
                      <div className="text-xs text-emerald-400 font-medium">
                        Оздоровительный курс на дикоросах
                      </div>
                    </div>
                    <span className="bg-emerald-950/90 text-emerald-300 border border-emerald-600/60 px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0">
                      Алтайские травы
                    </span>
                  </div>
                </div>

                {/* Direct quote / Essence */}
                <div className="mt-3.5 p-3.5 rounded-xl bg-stone-950 border border-stone-800/80 space-y-1.5">
                  <p className="text-xs text-stone-300 italic leading-relaxed">
                    «Тайга пустых советов не даёт. Здоровье человека начинается не со сложных лекарств, а с чистоты желчных протоков и лада с собственным телом. Разжижите желчь — и организм очистит себя сам.»
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1 border-t border-stone-900">
                    <span className="text-emerald-400 font-medium">Горный Алтай, р. Катунь</span>
                    <span>✓ Сибирская натуропатия</span>
                  </div>
                </div>

                {/* Highlights bar */}
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-stone-950/60 border border-stone-800/60">
                    <div className="text-sm sm:text-base font-bold text-amber-300 font-['Cinzel']">14 дней</div>
                    <div className="text-[10px] text-stone-400">Длительность</div>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-950/60 border border-stone-800/60">
                    <div className="text-sm sm:text-base font-bold text-emerald-400 font-['Cinzel']">15 мин</div>
                    <div className="text-[10px] text-stone-400">Утренний ритуал</div>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-950/60 border border-stone-800/60">
                    <div className="text-sm sm:text-base font-bold text-stone-200 font-['Cinzel']">0 голода</div>
                    <div className="text-[10px] text-stone-400">Сытное меню</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. ИНТЕРАКТИВНАЯ САМОДИАГНОСТИКА: ДЛЯ КОГО ЭТО */}
      <section id="symptoms" className="py-16 bg-stone-900/50 border-y border-stone-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/80">
              Интерактивная самодиагностика
            </span>
            <h2 className="font-['Cinzel'] text-2xl sm:text-4xl font-bold text-stone-100">
              Знакомы эти сигналы тела?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Печень не болит — в ней нет болевых нервных окончаний. О застое густой желчи и интоксикации организм сообщает косвенно. <span className="text-emerald-400 font-semibold">Отметьте симптомы, которые есть у вас:</span>
            </p>
          </div>

          {/* Grid of Interactive Checklist items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MINI_AUDIENCE_LIST.map((item) => {
              const isChecked = checkedAudience.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleAudienceItem(item.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer select-none space-y-2.5 ${
                    isChecked
                      ? "border-emerald-500/80 bg-emerald-950/30 shadow-lg shadow-emerald-950/40 scale-[1.01]"
                      : "border-stone-800 bg-stone-900/80 hover:border-stone-700 hover:bg-stone-900"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <h3 className="font-bold text-sm text-stone-100">{item.title}</h3>
                    </div>
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-xs transition-all ${
                        isChecked
                          ? "bg-emerald-600 border-emerald-500 text-white"
                          : "border-stone-700 bg-stone-950 text-transparent"
                      }`}
                    >
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-stone-800/80 text-[11px] text-stone-400">
                    <span className="text-emerald-400 font-semibold">Причина: </span>
                    {item.detail}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Diagnostic Result Callout */}
          <div className="p-6 rounded-2xl border border-emerald-500/50 bg-gradient-to-r from-emerald-950/60 via-stone-900 to-stone-950 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-900/80 border border-emerald-500/60 text-emerald-300 font-bold text-lg font-['Cinzel']">
                {checkedAudience.length}/6
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-stone-100">
                  {checkedAudience.length === 0 && "Нажмите на карточки выше для индивидуальной оценки"}
                  {checkedAudience.length >= 1 && checkedAudience.length <= 2 && "Начальная стадия застоя желчи (устраняется за 5–7 дней)"}
                  {checkedAudience.length >= 3 && "Выраженная перегрузка печени и кишечника — вам срочно нужен 14-дневный протокол"}
                </p>
                <p className="text-xs text-stone-400 mt-0.5">
                  {checkedAudience.length >= 1
                    ? "Уже на 3–4 день протокола уходят утренние отеки, очищается язык и спадает вздутие."
                    : "Отметьте симптомы выше, чтобы получить заключение."}
                </p>
              </div>
            </div>

            <a
              href="#checkout"
              className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <span>Устранить эти симптомы за 990 ₽</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

        </div>
      </section>

      {/* 5. ПОЧЕМУ ТРАДИЦИОННЫЕ МЕТОДЫ НЕ РАБОТАЮТ (ТАБЛИЦА) */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Честное сравнение
            </span>
            <h2 className="font-['Cinzel'] text-2xl sm:text-4xl font-bold text-stone-100">
              Почему таблетки не решают проблему
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              Синтетические ферменты и слабительные лишь заглушают сигнал тревоги, делая кишечник «ленивым». Протокол «Таёжный Перезапуск» работает с первопричиной — физиологией оттока желчи:
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-stone-800 bg-stone-900/70 shadow-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-800 bg-stone-950/80 text-stone-300 font-bold">
                  <th className="p-4 sm:p-5">Критерий</th>
                  <th className="p-4 sm:p-5 text-stone-400">Аптечные ферменты и таблетки</th>
                  <th className="p-4 sm:p-5 text-stone-400 hidden md:table-cell">Голодные детоксы на смузи</th>
                  <th className="p-4 sm:p-5 text-emerald-400 bg-emerald-950/40">Протокол «Таёжный Перезапуск»</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800 text-stone-300">
                {COMPARISON_TABLE_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-stone-800/30 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-stone-200">{row.criteria}</td>
                    <td className="p-4 sm:p-5 text-stone-400">{row.pharmacy}</td>
                    <td className="p-4 sm:p-5 text-stone-400 hidden md:table-cell">{row.extremeDetox}</td>
                    <td className="p-4 sm:p-5 text-emerald-300 font-medium bg-emerald-950/30">
                      {row.zhdanMethod}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. ПОШАГОВАЯ ПРОГРАММА НА 14 ДНЕЙ */}
      <section id="program" className="py-16 bg-stone-900/50 border-t border-stone-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Пошаговый маршрут к здоровью
            </span>
            <h2 className="font-['Cinzel'] text-2xl sm:text-4xl font-bold text-stone-100">
              14 дней: Что конкретно вы будете делать
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              Всего 15 минут в день: утренний теплый запуск, правильный сбор в термосе и легкая коррекция меню без отказа от любимой еды.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MINI_PROGRAM_PHASES.map((phase) => (
              <div
                key={phase.phaseNumber}
                className="p-6 sm:p-8 rounded-3xl border border-stone-800 bg-stone-900/90 shadow-xl flex flex-col justify-between space-y-5 hover:border-emerald-500/50 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                      {phase.daysRange}
                    </span>
                    <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-0.5 rounded-full font-bold">
                      {phase.badge}
                    </span>
                  </div>

                  <h3 className="font-['Cinzel'] font-bold text-lg sm:text-xl text-stone-100 leading-snug">
                    {phase.title}
                  </h3>

                  <p className="text-xs text-stone-400 italic leading-relaxed">
                    {phase.focus}
                  </p>

                  <div className="space-y-2.5 pt-3 border-t border-stone-800">
                    <span className="text-xs font-bold text-stone-300 block">Шаги каждого дня:</span>
                    <ul className="space-y-2">
                      {phase.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-300">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 text-xs text-emerald-300">
                  <span className="font-bold text-stone-200 block mb-0.5">Ощутимый результат этапа:</span>
                  {phase.result}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. ЧТО ВХОДИТ В КОМПЛЕКТ ЗА 990 ₽ */}
      <section id="package" className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Состав комплекта
            </span>
            <h2 className="font-['Cinzel'] text-2xl sm:text-4xl font-bold text-stone-100">
              Что вы получаете сразу после оплаты
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              Никаких ежемесячных списаний или скрытых платежей. Доступ ко всем материалам открывается навсегда:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MINI_PACKAGE_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-emerald-500/40 transition-all space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 text-emerald-400">
                      <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-800/80">
                        {item.badge === "Аудио-подкаст" ? (
                          <Headphones className="h-4 w-4 text-amber-400" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4" />
                        )}
                      </div>
                      <h3 className="font-bold text-sm text-stone-100">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {item.badge && (
                  <div className="pt-2 border-t border-stone-800/60">
                    <span className={`inline-block text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                      item.badge === "Аудио-подкаст" 
                        ? "bg-amber-950 text-amber-300 border border-amber-800" 
                        : "bg-stone-950 text-stone-400 border border-stone-800"
                    }`}>
                      {item.badge}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Reassurance Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-stone-900 to-amber-950/30 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <Gift className="h-6 w-6 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold text-stone-200 block">
                  Все травы покупаются в аптеке у вашего дома
                </span>
                <span className="text-stone-400">
                  Общая стоимость сырья на весь 14-дневный курс составит всего 650–850 ₽.
                </span>
              </div>
            </div>
            <a
              href="#checkout"
              className="shrink-0 text-emerald-400 hover:text-emerald-300 font-bold underline text-xs"
            >
              Перейти к оформлению заказа →
            </a>
          </div>

        </div>
      </section>

      {/* 9. ФОРМА БЫСТРОЙ И БЕЗОПАСНОЙ ОПЛАТЫ (CHECKOUT) */}
      <section id="checkout" className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="rounded-3xl border-2 border-emerald-500 bg-gradient-to-b from-emerald-950/90 via-stone-900 to-stone-950 p-6 sm:p-10 shadow-2xl space-y-6">
            
            {/* Header of Payment Card */}
            <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 border-b border-stone-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-800">
                  Мгновенный доступ
                </span>
                <h2 className="font-['Cinzel'] text-2xl sm:text-3xl font-extrabold text-stone-100 mt-2">
                  Оформление заказа: 990 ₽
                </h2>
                <p className="text-xs text-stone-300 mt-1">
                  14-дневный протокол «Таёжный Перезапуск» + Веб-трекер + Рецептурник дикоросов + Подкаст-разбор методики
                </p>
              </div>

              <div className="text-right">
                <div className="flex items-baseline gap-2 justify-end">
                  <span className="text-4xl sm:text-5xl font-extrabold text-stone-100 font-['Cinzel']">
                    990 ₽
                  </span>
                  <span className="text-lg text-stone-500 line-through">
                    2 500 ₽
                  </span>
                </div>
                <span className="text-[11px] text-emerald-400 font-bold block mt-0.5">
                  Разовая оплата • Без подписок
                </span>
              </div>
            </div>

            {/* If Payment Succeeded */}
            {paymentSuccess ? (
              <div className="p-8 rounded-2xl bg-emerald-950/90 border border-emerald-500 space-y-5 text-center">
                <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400">
                  <Check className="h-9 w-9 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-bold text-stone-100 font-['Cinzel']">
                  Оплата прошла успешно!
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 max-w-md mx-auto leading-relaxed">
                  Номер вашего заказа: <span className="font-mono font-bold text-emerald-300">{orderNumber}</span>. 
                  Все материалы протокола и ссылка на электронный трекер уже отправлены на e-mail:{" "}
                  <span className="text-emerald-300 font-bold">{payEmail || "ваш адрес"}</span>.
                </p>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="https://t.me/Stas_Kosmos1"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-7 py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Служба заботы в Telegram (@Stas_Kosmos1)</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setPaymentSuccess(false)}
                    className="w-full sm:w-auto bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold px-5 py-3.5 rounded-xl"
                  >
                    Вернуться к форме
                  </button>
                </div>
              </div>
            ) : (
              /* Order Form */
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
                    Email (сюда придут материалы и персональный доступ) <span className="text-emerald-400">*</span>:
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
                    Выберите способ оплаты:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label
                      onClick={() => setPayMethod("sbp")}
                      className={`flex items-center gap-2.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        payMethod === "sbp"
                          ? "border-emerald-500 bg-emerald-950/60 text-stone-100 shadow-md"
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
                        <span className="text-[10px] text-emerald-400">Без комиссии (0%)</span>
                      </div>
                    </label>

                    <label
                      onClick={() => setPayMethod("card")}
                      className={`flex items-center gap-2.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        payMethod === "card"
                          ? "border-emerald-500 bg-emerald-950/60 text-stone-100 shadow-md"
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
                          ? "border-emerald-500 bg-emerald-950/60 text-stone-100 shadow-md"
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
                        <span className="text-[10px] text-stone-400">Быстро в 1 клик</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 sm:py-5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 shadow-2xl shadow-emerald-950/80 hover:scale-[1.01] active:scale-98 disabled:opacity-70 mt-4 cursor-pointer"
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

                {/* Legal Consent Notice for Moderation */}
                <p className="text-[11px] text-stone-400 text-center leading-relaxed pt-2 px-2">
                  Нажимая кнопку «Оплатить», вы соглашаетесь с условиями{" "}
                  <button
                    type="button"
                    onClick={() => openLegalModal("offer")}
                    className="text-emerald-400 hover:text-emerald-300 underline font-medium cursor-pointer"
                  >
                    Договора оферты
                  </button>{" "}
                  и даете согласие на обработку персональных данных в соответствии с{" "}
                  <button
                    type="button"
                    onClick={() => openLegalModal("privacy")}
                    className="text-emerald-400 hover:text-emerald-300 underline font-medium cursor-pointer"
                  >
                    Политикой конфиденциальности
                  </button>
                  .
                </p>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-stone-400 pt-2">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    Безопасный 256-bit платеж
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Send className="h-3.5 w-3.5 text-emerald-400" />
                    Моментальная выдача доступа
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <HeartHandshake className="h-3.5 w-3.5 text-emerald-400" />
                    Гарантия возврата 3 дня
                  </span>
                </div>
              </form>
            )}

          </div>
        </div>
      </section>

      {/* 10. ЧАСТЫЕ ВОПРОСЫ (FAQ) */}
      <section id="faq" className="py-16 bg-stone-900/50 border-t border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Ответы на вопросы
            </span>
            <h2 className="font-['Cinzel'] text-2xl sm:text-4xl font-bold text-stone-100">
              Часто задаваемые вопросы
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              Всё, что важно знать перед началом 14-дневного протокола:
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_DATA.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-stone-800 bg-stone-900/80 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-stone-100 hover:text-emerald-300 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-stone-950 border border-stone-800 text-stone-400">
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs text-stone-300 leading-relaxed border-t border-stone-800/80 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 12. КЛИЕНТСКИЙ ФУТЕР С ОБЯЗАТЕЛЬНЫМИ ЮРИДИЧЕСКИМИ ДОКУМЕНТАМИ И РЕКВИЗИТАМИ */}
      <footer className="border-t border-stone-800/80 bg-stone-950 py-12 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Top Brand & Navigation Line */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-800">
                        <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-2xl overflow-hidden bg-stone-900 border border-emerald-500/40 p-1 flex items-center justify-center shrink-0 shadow-md shadow-emerald-950/40">
                <img src="./taezhny-logo.svg" alt="Логотип Таёжный Перезапуск" className="w-full h-full object-contain" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-stone-200">
                  <span className="font-['Cinzel'] font-bold text-stone-100 text-base tracking-wide">ТАЁЖНЫЙ ПЕРЕЗАПУСК</span>
                  <span className="text-stone-400 text-xs hidden sm:inline">• Оздоровительный онлайн-курс</span>
                </div>
                <p className="text-[11px] text-stone-400">
                  Горный Алтай • Натуральные дикоросы и физиологический запуск оттока желчи
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400">
              <a href="#about" className="hover:text-stone-200 transition-colors">О методе</a>
              <a href="#program" className="hover:text-stone-200 transition-colors">Программа</a>
              <a href="#faq" className="hover:text-stone-200 transition-colors">FAQ</a>
              <a
                href="https://t.me/Stas_Kosmos1"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 hover:bg-emerald-950/70 transition-all"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                <span>Служба заботы в Telegram: @Stas_Kosmos1</span>
              </a>
            </div>
          </div>

          {/* Official Requisites & Legal Navigation Panel for Bank Moderation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 sm:p-6 rounded-3xl bg-stone-900/60 border border-stone-800/80">
            
            {/* Requisites Block */}
            <div className="md:col-span-6 space-y-2 text-stone-300">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                Официальные реквизиты продавца:
              </span>
              <div className="space-y-1 text-xs text-stone-300">
                <p className="font-bold text-stone-100 flex items-center gap-2">
                  <span>Самозанятый {LEGAL_REQUISITES.fullName}</span>
                  <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                    НПД (ФЗ № 422-ФЗ)
                  </span>
                </p>
                <p className="text-stone-400">
                  ИНН: <span className="font-mono text-stone-200 font-semibold">{LEGAL_REQUISITES.inn}</span>
                </p>
                <p className="text-stone-400 flex items-center gap-1.5">
                  <span>Email для обращений:</span>
                  <a 
                    href={`mailto:${LEGAL_REQUISITES.email}`} 
                    className="text-emerald-400 hover:underline font-mono"
                  >
                    {LEGAL_REQUISITES.email}
                  </a>
                </p>
                <p className="text-stone-400 flex items-center gap-1.5">
                  <span>Служба заботы в Telegram:</span>
                  <a 
                    href="https://t.me/Stas_Kosmos1" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline font-mono font-semibold"
                  >
                    {LEGAL_REQUISITES.telegramSupport}
                  </a>
                </p>
                <p className="text-[11px] text-stone-400 pt-1">
                  Предмет реализации: доступ к цифровому контенту (электронный курс и веб-трекер «Таёжный Перезапуск»).
                </p>
              </div>
            </div>

            {/* Active Legal Links with Modal Triggers */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                  Юридические документы и оферта:
                </span>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2.5">
                  <a
                    href="#offer"
                    onClick={(e) => {
                      e.preventDefault();
                      openLegalModal("offer");
                    }}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 hover:border-emerald-500/50 hover:bg-stone-900 text-stone-200 hover:text-emerald-300 transition-colors text-xs font-medium cursor-pointer"
                  >
                    <FileText className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Договор публичной оферты</span>
                  </a>

                  <a
                    href="#privacy"
                    onClick={(e) => {
                      e.preventDefault();
                      openLegalModal("privacy");
                    }}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 hover:border-emerald-500/50 hover:bg-stone-900 text-stone-200 hover:text-emerald-300 transition-colors text-xs font-medium cursor-pointer"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Политика конфиденциальности</span>
                  </a>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-stone-500">
                <span>Чек формируется в сервисе «Мой налог» и отправляется в электронном виде. Без скрытых подписок.</span>
              </div>
            </div>

          </div>

          {/* Medical Disclaimer & Copyright */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-stone-400 leading-relaxed pt-2">
            <div>
              <p className="font-semibold text-stone-300 mb-1">Отказ от медицинской ответственности:</p>
              <p>
                Материалы курса носят исключительно общеоздоровительный и информационно-просветительский характер, основаны на традиционном травничестве и не заменяют консультации лечащего врача. Дикоросы и сборы не являются лекарственными средствами. При наличии желчнокаменной болезни проконсультируйтесь со специалистом.
              </p>
            </div>

            <div className="md:text-right space-y-1 text-stone-400">
              <p>© {new Date().getFullYear()} Курс «Таёжный Перезапуск». Все права защищены.</p>
              <p>Самозанятый {LEGAL_REQUISITES.fullName} • ИНН {LEGAL_REQUISITES.inn}</p>
              <p className="text-[10px] text-stone-500">
                Защита персональных данных согласно Федеральному закону РФ № 152-ФЗ
              </p>
            </div>
          </div>

        </div>
      </footer>

      {/* Legal Documents Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        activeTab={legalModalTab}
        onClose={() => setLegalModalOpen(false)}
        onTabChange={setLegalModalTab}
      />

    </div>
  );
};
