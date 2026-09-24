import React, { useState, useEffect } from "react";
import { 
  SYMPTOMS_TEST_DATA, 
  COURSE_MODULES_DETAILED, 
  PRICING_PLANS, 
  SINGLE_PRODUCT_OFFER,
  CHAGA_VS_TINDER_DATA,
  HERBAL_CARD_5_DIRECTIONS,
  FIVE_BREWING_LAWS,
  TEN_ZHDAN_QUESTIONS,
  SEVEN_GOLDEN_RULES,
  FAQ_DATA, 
  COMPARISON_TABLE_DATA, 
  generateLandingPageHtml,
  PricingPlan,
  CourseModuleDetail
} from "../data/landingPageData";
import { generateMiniLandingPageHtml } from "../data/miniLandingData";
import { MiniLandingView } from "./MiniLandingView";
import { APP_IMAGES, FALLBACK_IMAGES } from "../assets/images";
import { 
  Trees, 
  Sparkles, 
  Check, 
  Copy, 
  Download, 
  ExternalLink, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Maximize2, 
  Minimize2, 
  Clock, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  AlertCircle, 
  Gift, 
  ChevronDown, 
  ChevronUp, 
  CreditCard, 
  Send, 
  Layers, 
  FileText, 
  TrendingUp, 
  Zap,
  HelpCircle,
  Flame,
  Award,
  Droplets,
  Wind,
  Coffee,
  Moon,
  PhoneOff,
  Activity,
  BookOpen,
  HeartPulse,
  CheckSquare,
  ListCheck,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";
import confetti from "canvas-confetti";

type ViewMode = "mini" | "preview" | "copy" | "code" | "analytics";
type DeviceView = "desktop" | "tablet" | "mobile";

export const LandingPageStudio: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("mini");
  const [codeExportType, setCodeExportType] = useState<"mini" | "full">("mini");
  const [deviceView, setDeviceView] = useState<DeviceView>("desktop");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedCopy, setCopiedCopy] = useState<boolean>(false);

  // Landing Page Interactive State
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(["sym-1", "sym-3"]);
  const [activeModuleTab, setActiveModuleTab] = useState<string>("mod-1");
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PricingPlan | null>(PRICING_PLANS[0]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("sbp");

  // Rich Content Interactive State
  const [activeHerbalTab, setActiveHerbalTab] = useState<string>("herb-5");
  const [expandedZhdanQuestion, setExpandedZhdanQuestion] = useState<number | null>(0);
  const [demoTrackerDay, setDemoTrackerDay] = useState<number>(1);
  const [demoCheckedHabits, setDemoCheckedHabits] = useState<string[]>([
    "habit-water-resin",
    "habit-diaphragm"
  ]);
  const [isBreathingRunning, setIsBreathingRunning] = useState<boolean>(false);
  const [breathingPhase, setBreathingPhase] = useState<string>("Вдох носом в живот");
  const [breathingSeconds, setBreathingSeconds] = useState<number>(4);
  const [checkedRules, setCheckedRules] = useState<number[]>([1, 2, 3]);

  // Breathing simulation effect for Habit Tracker Demo
  useEffect(() => {
    let interval: any;
    if (isBreathingRunning) {
      interval = setInterval(() => {
        setBreathingSeconds(prev => {
          if (prev <= 1) {
            setBreathingPhase(curr => {
              if (curr.startsWith("Вдох")) return "Задержка на вдохе";
              if (curr.startsWith("Задержка")) return "Выдох ртом через трубочку";
              if (curr.startsWith("Выдох")) return "Пауза на выдохе";
              return "Вдох носом в живот";
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathingSeconds(4);
      setBreathingPhase("Вдох носом в живот");
    }
    return () => clearInterval(interval);
  }, [isBreathingRunning]);

  // Countdown timer state (hours, mins, secs)
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

  // Symptoms Score Calculation
  const calculateSymptomScore = () => {
    return selectedSymptoms.reduce((acc, id) => {
      const sym = SYMPTOMS_TEST_DATA.find(s => s.id === id);
      return acc + (sym ? sym.weight : 0);
    }, 0);
  };

  const currentScore = calculateSymptomScore();

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  // Voice speech simulation
  const handlePlayZhdanVoice = () => {
    if (isPlayingAudio) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = "Доброго здравия, друзья. Тайга пустых советов не даёт. Если с утра нет сил, а живот к вечеру надувается — не торопитесь глушить сигнал таблетками. Давайте разжижим желчь, очистим кишечник чагой и вернем телу природную легкость за 14 дней.";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ru-RU";
      utterance.rate = 0.92;
      utterance.pitch = 0.85;

      const voices = window.speechSynthesis.getVoices();
      const ruMaleVoice = voices.find(v => v.lang.includes("ru") && (v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("dmitry") || v.name.toLowerCase().includes("pavel")));
      if (ruMaleVoice) {
        utterance.voice = ruMaleVoice;
      }

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 5000);
    }
  };

  const handleOpenCheckout = (plan: PricingPlan) => {
    setSelectedPlanForCheckout(plan);
    setOrderComplete(false);
    setIsCheckoutOpen(true);
  };

  const handleFinishPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.4 },
      colors: ["#10B981", "#F59E0B", "#F3EBD9"]
    });
  };

  const handleDownloadHtml = () => {
    const isMini = viewMode === "mini" || codeExportType === "mini";
    const html = isMini ? generateMiniLandingPageHtml() : generateLandingPageHtml();
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = isMini ? "zhdan_mini_landing.html" : "zhdan_landing_page.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    const isMini = viewMode === "mini" || codeExportType === "mini";
    navigator.clipboard.writeText(isMini ? generateMiniLandingPageHtml() : generateLandingPageHtml());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Studio Control Bar */}
      <div className="rounded-2xl border border-stone-800 bg-stone-900/90 p-4 sm:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/30">
              Мини-лендинг (5 блоков)
            </span>
            <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-300 border border-amber-500/30">
              Без воды • 990 ₽
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-100 font-['Cinzel'] mt-1">
            Продающий Лендинг: «Таёжный Перезапуск за 14 дней»
          </h1>
          <p className="text-xs text-stone-400 mt-0.5">
            Ждан Таёжный (63 года). Структура: заголовок-обещание, для кого это, программа трипваера, отзывы/скриншоты, форма быстрой оплаты.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode tabs */}
          <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
            <button
              onClick={() => setViewMode("mini")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                viewMode === "mini" 
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/60 font-bold" 
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <Zap className="h-3.5 w-3.5 text-amber-300" />
              <span>Мини-лендинг</span>
            </button>
            <button
              onClick={() => setViewMode("preview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                viewMode === "preview" 
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/60 font-bold" 
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              <span>Полная версия</span>
            </button>
            <button
              onClick={() => setViewMode("copy")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                viewMode === "copy" 
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/60 font-bold" 
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Тексты (AIDA)</span>
            </button>
            <button
              onClick={() => setViewMode("code")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                viewMode === "code" 
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/60 font-bold" 
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>HTML Код</span>
            </button>
            <button
              onClick={() => setViewMode("analytics")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                viewMode === "analytics" 
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/60 font-bold" 
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Воронка & ROMI</span>
            </button>
          </div>

          {/* Quick download HTML button */}
          <button
            onClick={handleDownloadHtml}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold px-3.5 py-2 rounded-xl text-xs shadow-lg shadow-amber-950/40 transition-all active:scale-95 cursor-pointer"
            title="Скачать готовый автономный файл HTML"
          >
            <Download className="h-3.5 w-3.5 text-stone-950" />
            <span>Скачать .HTML</span>
          </button>
        </div>
      </div>

      {/* VIEW: MINI-LANDING (5 KEY BLOCKS WITHOUT FLUFF) */}
      {viewMode === "mini" && (
        <div className="space-y-4">
          {/* Viewport Width Toolbar */}
          <div className="flex items-center justify-between bg-stone-900 border border-stone-800 rounded-xl px-4 py-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-medium">Режим просмотра:</span>
              <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-lg border border-stone-800">
                <button
                  onClick={() => setDeviceView("desktop")}
                  className={`p-1.5 rounded flex items-center gap-1 text-[11px] ${
                    deviceView === "desktop" ? "bg-stone-800 text-emerald-400 font-bold" : "text-stone-400 hover:text-stone-200"
                  }`}
                  title="Десктоп (100% ширина)"
                >
                  <Monitor className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Десктоп</span>
                </button>
                <button
                  onClick={() => setDeviceView("tablet")}
                  className={`p-1.5 rounded flex items-center gap-1 text-[11px] ${
                    deviceView === "tablet" ? "bg-stone-800 text-emerald-400 font-bold" : "text-stone-400 hover:text-stone-200"
                  }`}
                  title="Планшет (768px)"
                >
                  <Tablet className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Планшет</span>
                </button>
                <button
                  onClick={() => setDeviceView("mobile")}
                  className={`p-1.5 rounded flex items-center gap-1 text-[11px] ${
                    deviceView === "mobile" ? "bg-stone-800 text-emerald-400 font-bold" : "text-stone-400 hover:text-stone-200"
                  }`}
                  title="Смартфон iPhone (390px)"
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Мобильный</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Короткая страница без воды (5 блоков)
              </span>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="flex items-center gap-1 text-stone-400 hover:text-stone-200 text-xs cursor-pointer"
              >
                {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline">{isFullscreen ? "Свернуть" : "На весь экран"}</span>
              </button>
            </div>
          </div>

          {/* Device Frame Container */}
          <div className={`mx-auto transition-all duration-300 ${
            deviceView === "mobile" 
              ? "max-w-[420px] shadow-2xl rounded-3xl border-4 border-stone-800 p-2 bg-stone-900 overflow-hidden" 
              : deviceView === "tablet"
              ? "max-w-[800px] shadow-2xl rounded-2xl border-2 border-stone-800 p-2 overflow-hidden"
              : "w-full"
          } ${isFullscreen ? "fixed inset-0 z-50 max-w-none rounded-none border-none bg-stone-950 overflow-y-auto p-4 sm:p-8" : ""}`}>
            {isFullscreen && (
              <div className="sticky top-0 z-50 bg-stone-900 border-b border-stone-800 px-4 py-2 flex justify-between items-center text-xs mb-4 rounded-xl">
                <div className="flex items-center gap-2 text-emerald-400 font-bold font-['Cinzel']">
                  <Trees className="h-4 w-4" />
                  <span>Мини-лендинг (Ждан Таёжный, 63 года • 990 ₽)</span>
                </div>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="bg-stone-800 hover:bg-stone-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Minimize2 className="h-3.5 w-3.5" />
                  <span>Выйти</span>
                </button>
              </div>
            )}
            <MiniLandingView onOpenFullTracker={() => setViewMode("preview")} />
          </div>
        </div>
      )}

      {/* VIEW 1: LIVE INTERACTIVE PREVIEW */}
      {viewMode === "preview" && (
        <div className="space-y-4">
          {/* Viewport Width Toolbar */}
          <div className="flex items-center justify-between bg-stone-900 border border-stone-800 rounded-xl px-4 py-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-medium">Режим просмотра:</span>
              <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-lg border border-stone-800">
                <button
                  onClick={() => setDeviceView("desktop")}
                  className={`p-1.5 rounded flex items-center gap-1 text-[11px] ${
                    deviceView === "desktop" ? "bg-stone-800 text-emerald-400 font-bold" : "text-stone-400 hover:text-stone-200"
                  }`}
                  title="Десктоп (100% ширина)"
                >
                  <Monitor className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Десктоп</span>
                </button>
                <button
                  onClick={() => setDeviceView("tablet")}
                  className={`p-1.5 rounded flex items-center gap-1 text-[11px] ${
                    deviceView === "tablet" ? "bg-stone-800 text-emerald-400 font-bold" : "text-stone-400 hover:text-stone-200"
                  }`}
                  title="Планшет (768px)"
                >
                  <Tablet className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Планшет</span>
                </button>
                <button
                  onClick={() => setDeviceView("mobile")}
                  className={`p-1.5 rounded flex items-center gap-1 text-[11px] ${
                    deviceView === "mobile" ? "bg-stone-800 text-emerald-400 font-bold" : "text-stone-400 hover:text-stone-200"
                  }`}
                  title="Смартфон iPhone (390px)"
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Мобильный</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Живой интерактив (все кнопки работают)
              </span>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="flex items-center gap-1 text-stone-400 hover:text-stone-200 text-xs"
              >
                {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline">{isFullscreen ? "Свернуть" : "На весь экран"}</span>
              </button>
            </div>
          </div>

          {/* Device Frame Container */}
          <div className={`mx-auto transition-all duration-300 ${
            deviceView === "mobile" 
              ? "max-w-[420px] shadow-2xl rounded-3xl border-4 border-stone-800 p-1 bg-stone-900 overflow-hidden" 
              : deviceView === "tablet"
              ? "max-w-[800px] shadow-2xl rounded-2xl border-2 border-stone-800 overflow-hidden"
              : "w-full rounded-2xl border border-stone-800 overflow-hidden"
          } ${isFullscreen ? "fixed inset-0 z-50 max-w-none rounded-none border-none bg-stone-950 overflow-y-auto" : ""}`}>
            
            {isFullscreen && (
              <div className="sticky top-0 z-50 bg-stone-900 border-b border-stone-800 px-4 py-2 flex justify-between items-center text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-bold font-['Cinzel']">
                  <Trees className="h-4 w-4" />
                  <span>Полноэкранный просмотр продающего сайта</span>
                </div>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="bg-stone-800 hover:bg-stone-700 text-white px-3 py-1 rounded-lg flex items-center gap-1"
                >
                  <Minimize2 className="h-3.5 w-3.5" />
                  <span>Выйти из полноэкранного режима</span>
                </button>
              </div>
            )}

            {/* THE ACTUAL HIGH-CONVERTING LANDING PAGE */}
            <div className="bg-stone-950 text-stone-100 min-h-screen font-['Plus_Jakarta_Sans',sans-serif] selection:bg-emerald-600 selection:text-white relative">
              
              {/* STICKY TOP ANNOUNCEMENT BAR */}
              <aside aria-label="Специальное предложение" className="sticky top-0 z-30 bg-gradient-to-r from-emerald-950 via-stone-900 to-amber-950 border-b border-emerald-500/30 px-3 sm:px-4 py-2 text-[11px] sm:text-xs text-center text-stone-200">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-medium">
                  <span className="inline-flex items-center gap-1.5 text-amber-400 font-bold">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Единый цифровой комплект:</span>
                  </span>
                  <span className="text-emerald-300">14-дневный протокол + Интерактивный веб-трекер</span>
                  <span className="hidden sm:inline text-stone-600">•</span>
                  <span className="text-stone-300 font-bold">990 ₽</span>
                  <a 
                    href="#landing-pricing" 
                    className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] transition-all"
                  >
                    Получить за 990 ₽ →
                  </a>
                </div>
              </aside>

              {/* NAVIGATION HEADER */}
              <header className="border-b border-stone-800/80 bg-stone-950/95 backdrop-blur-md sticky top-8 z-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                      <Trees className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-['Cinzel'] font-bold text-sm tracking-wider leading-none text-emerald-300">ЖДАН ТАЁЖНЫЙ</p>
                      <p className="text-[10px] text-stone-400 leading-tight">Сибирский натуропат & травник</p>
                    </div>
                  </div>

                  <nav className="hidden lg:flex items-center gap-4 text-xs font-semibold text-stone-300">
                    <a href="#landing-symptoms" className="hover:text-emerald-400 transition-colors">Тест симптомов</a>
                    <a href="#landing-program" className="hover:text-emerald-400 transition-colors">Программа</a>
                    <a href="#landing-tracker" className="hover:text-amber-400 text-amber-300 transition-colors">📱 Трекер</a>
                    <a href="#landing-blood" className="hover:text-emerald-400 transition-colors">2000 л крови</a>
                    <a href="#landing-chaga-atlas" className="hover:text-emerald-400 transition-colors">Атлас чаги</a>
                    <a href="#landing-herbal" className="hover:text-emerald-400 transition-colors">5 Сборов</a>
                    <a href="#landing-zhdan-qa" className="hover:text-emerald-400 transition-colors">Вопросы травнику</a>
                    <a href="#landing-pricing" className="hover:text-emerald-400 font-bold transition-colors">Комплект 990 ₽</a>
                  </nav>

                  <a 
                    href="#landing-pricing" 
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-lg shadow-emerald-950/50 flex items-center gap-1.5"
                  >
                    <span>Забрать за 990 ₽</span>
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </header>

              {/* HERO SECTION */}
              <section className="relative overflow-hidden pt-10 sm:pt-16 pb-16 sm:pb-20 border-b border-stone-800/80 bg-gradient-to-b from-stone-950 via-stone-900/60 to-stone-950">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* Left: Offer & Value */}
                    <div className="lg:col-span-7 space-y-5">
                      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/70 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
                        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                        <span>14-дневный пошаговый протокол + Интерактивный веб-трекер</span>
                      </div>

                      <h1 className="font-['Cinzel'] text-2xl sm:text-4xl lg:text-5xl font-extrabold text-stone-100 leading-tight">
                        Очистите ЖКТ, перезапустите печень и <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">верните лёгкость в теле</span> за 14 дней
                      </h1>

                      <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                        Авторская сибирская методика на природных дикоросах и физиологическом запуске оттока желчи — <b>без голодовок, клизм и аптечной химии</b>.
                      </p>

                      {/* 4 Core Bullets */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-200">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span>Минус 2–4 кг скрытых токсических отеков</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-200">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span>Чистый язык и плоский живот к вечеру</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-200">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span>Бодрость с 6:30 утра без 3-х чашек кофе</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-200">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span>Все сборы из аптеки за 650–850 ₽ на курс</span>
                        </div>
                      </div>

                      {/* CTA & Trust Badges */}
                      <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <a 
                          href="#landing-pricing" 
                          className="inline-flex justify-center items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-7 py-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-emerald-950/80 hover:from-emerald-500 hover:to-teal-500 transition-all active:scale-95"
                        >
                          <span>Получить весь комплект за 990 ₽</span>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                        <div className="text-left">
                          <p className="text-xs text-stone-200 font-bold">Разовая оплата • 990 ₽</p>
                          <p className="text-[11px] text-stone-400">14 дней • Веб-приложение • Травы из аптеки</p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Visual Card with Zhdan + Audio Button */}
                    <div className="lg:col-span-5 relative">
                      <div className="rounded-3xl border border-stone-800 bg-stone-900/90 p-4 sm:p-5 shadow-2xl relative overflow-hidden">
                        <div className="relative rounded-2xl overflow-hidden border border-stone-800">
                          <img 
                            src={APP_IMAGES.zhdan}
                            onError={(e) => {
                              e.currentTarget.src = FALLBACK_IMAGES.zhdan;
                            }}
                            alt="Ждан Таёжный на рассвете" 
                            className="w-full h-72 sm:h-80 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>

                          {/* Audio greeting button overlay */}
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-stone-950/85 backdrop-blur-md rounded-xl p-2.5 border border-stone-800">
                            <button
                              onClick={handlePlayZhdanVoice}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                isPlayingAudio 
                                  ? "bg-amber-500 text-stone-950 animate-pulse" 
                                  : "bg-emerald-600 hover:bg-emerald-500 text-white"
                              }`}
                            >
                              {isPlayingAudio ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                              <span>{isPlayingAudio ? "Остановить голос" : "Слушать напутствие Ждана (1 мин)"}</span>
                            </button>
                            <span className="text-[10px] text-stone-400">Голос Ждана</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div>
                            <p className="font-bold text-sm text-stone-100">Ждан Таёжный (63 года)</p>
                            <p className="text-xs text-emerald-400">Потомственный травник, Горный Алтай</p>
                          </div>
                          <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded-full text-[11px] font-semibold">
                            30+ лет практики
                          </span>
                        </div>

                        <p className="mt-3 p-3 bg-stone-950/90 rounded-xl border border-stone-800/80 text-xs text-stone-300 italic leading-relaxed">
                          «Тайга пустых советов не даёт. Здоровье человека начинается не с аптеки, а с чистоты желчных протоков и лада с телом.»
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* INTERACTIVE SYMPTOMS CHECKER (DIAGNOSTICS) */}
              <section id="landing-symptoms" className="py-16 sm:py-20 border-b border-stone-800 bg-stone-900/40">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Интерактивная Диагностика за 1 минуту</span>
                  <h2 className="font-['Cinzel'] text-xl sm:text-3xl font-bold text-stone-100 mt-2">
                    Узнайте ваш уровень застоя желчи и токсической нагрузки
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-400 mt-2 max-w-xl mx-auto">
                    Отметьте симптомы, которые вы замечаете у себя хотя бы 2-3 раза в неделю:
                  </p>

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                    {SYMPTOMS_TEST_DATA.map((symptom) => {
                      const isChecked = selectedSymptoms.includes(symptom.id);
                      return (
                        <div
                          key={symptom.id}
                          onClick={() => toggleSymptom(symptom.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                            isChecked 
                              ? "border-emerald-500 bg-emerald-950/30 shadow-md shadow-emerald-950/40" 
                              : "border-stone-800 bg-stone-950/80 hover:border-stone-700"
                          }`}
                        >
                          <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                            isChecked ? "bg-emerald-500 border-emerald-400 text-stone-950" : "border-stone-700 bg-stone-900"
                          }`}>
                            {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs sm:text-sm text-stone-200 leading-snug">
                            {symptom.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Diagnostic Result Box */}
                  <div className="mt-8 p-6 rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/70 via-stone-900 to-stone-950 text-left shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                            Результат анализа симптомов:
                          </span>
                          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-300">
                            Балл: {currentScore.toFixed(1)}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-stone-100 mt-1 font-['Cinzel']">
                          {currentScore === 0 && "Отметьте симптомы выше для персонализированного расчета"}
                          {currentScore > 0 && currentScore < 4 && "Начальная стадия застоя желчи (легкая степень)"}
                          {currentScore >= 4 && currentScore < 8 && "Умеренно-тяжелый токсический застой ЖКТ и печени"}
                          {currentScore >= 8 && "Критическая токсическая перегрузка печени и лимфы"}
                        </h3>

                        <p className="text-xs text-stone-300 mt-1.5 leading-relaxed max-w-2xl">
                          {currentScore === 0 && "Система определит степень перегрузки желчевыводящей системы и подберет подходящий шаг программы."}
                          {currentScore > 0 && currentScore < 4 && "Хорошая новость: организм быстро откликнется. Достаточно 14 дней мягкого детокса на теплых взварах, чтобы убрать утреннюю тяжесть и вздутия навсегда."}
                          {currentScore >= 4 && currentScore < 8 && "Протоки печени спазмированы, микрофлора кишечника смещена в сторону брожения. Вам необходим полный 14-дневный протокол с чагой, горечами и висцеральными упражнениями."}
                          {currentScore >= 8 && "Организм подает сигналы SOS: печень не справляется с фильтрацией, страдают сосуды и сон. Рекомендуется участие по тарифу с куратором-травником для мягкого сопровождения."}
                        </p>
                      </div>

                      <a 
                        href="#landing-pricing" 
                        className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all text-center shadow-lg shadow-emerald-950/50"
                      >
                        Подобрать тариф →
                      </a>
                    </div>
                  </div>

                </div>
              </section>

              {/* WHY CONVENTIONAL METHODS FAIL (COMPARISON TABLE) */}
              <section className="py-16 sm:py-20 border-b border-stone-800">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                  <div className="text-center max-w-2xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Физиология против маркетинга</span>
                    <h2 className="font-['Cinzel'] text-xl sm:text-3xl font-bold text-stone-100 mt-2">
                      Почему аптечные таблетки и соковые детоксы не дают стойкого результата
                    </h2>
                  </div>

                  <div className="mt-10 overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="border-b border-stone-800 text-xs text-stone-400">
                          <th className="py-3 px-4">Критерий</th>
                          <th className="py-3 px-4">Аптечные таблетки</th>
                          <th className="py-3 px-4">Детоксы на смузи/соках</th>
                          <th className="py-3 px-4 bg-emerald-950/40 text-emerald-300 font-bold rounded-t-xl">Метод Ждана Таёжного</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs divide-y divide-stone-800">
                        {COMPARISON_TABLE_DATA.map((row, idx) => (
                          <tr key={idx} className="hover:bg-stone-900/40 transition-colors">
                            <td className="py-4 px-4 font-bold text-stone-200">{row.criteria}</td>
                            <td className="py-4 px-4 text-stone-400">{row.pharmacy}</td>
                            <td className="py-4 px-4 text-stone-400">{row.extremeDetox}</td>
                            <td className="py-4 px-4 bg-emerald-950/20 text-emerald-200 font-medium">
                              {row.zhdanMethod}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* 14-DAY DETAILED PROGRAM */}
              <section id="landing-program" className="py-16 sm:py-20 border-b border-stone-800 bg-stone-900/40">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                  <div className="text-center max-w-2xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Структура интенсива</span>
                    <h2 className="font-['Cinzel'] text-xl sm:text-3xl font-bold text-stone-100 mt-2">
                      14 Дней к Новому Здравию: Пошаговый План
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-400 mt-2">
                      Каждый день занимает не более 15 минут и органично встраивается в привычный рабочий график.
                    </p>
                  </div>

                  {/* Module Selector Tabs */}
                  <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {COURSE_MODULES_DETAILED.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          setActiveModuleTab(m.id);
                          setExpandedDay(m.days[0].dayNumber);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          activeModuleTab === m.id 
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/60" 
                            : "bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200"
                        }`}
                      >
                        {m.daysRange} • {m.badge}
                      </button>
                    ))}
                  </div>

                  {/* Active Module Content */}
                  {COURSE_MODULES_DETAILED.filter(m => m.id === activeModuleTab).map((m) => (
                    <div key={m.id} className="mt-8 space-y-6">
                      <div className="p-6 rounded-3xl border border-stone-800 bg-stone-900/80 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                            {m.daysRange}
                          </span>
                          <span className="bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                            {m.badge}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-stone-100 font-['Cinzel']">{m.title}</h3>
                        <p className="text-xs sm:text-sm text-stone-300">{m.subtitle}</p>

                        <div className="pt-2 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {m.outcomes.map((outcome, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{outcome}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Days inside the Module */}
                      <div className="space-y-3">
                        <p className="text-xs font-bold text-stone-400 uppercase tracking-wider px-1">
                          Расписание уроков модуля:
                        </p>
                        {m.days.map((day) => {
                          const isDayOpen = expandedDay === day.dayNumber;
                          return (
                            <div 
                              key={day.dayNumber}
                              className="rounded-2xl border border-stone-800 bg-stone-950/80 overflow-hidden transition-all"
                            >
                              <button
                                onClick={() => setExpandedDay(isDayOpen ? null : day.dayNumber)}
                                className="w-full p-4 flex items-center justify-between text-left hover:bg-stone-900/40 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-900 text-emerald-400 text-xs font-bold border border-stone-800">
                                    {day.dayNumber}
                                  </span>
                                  <div>
                                    <p className="text-xs sm:text-sm font-bold text-stone-200">{day.title}</p>
                                    <p className="text-[10px] text-stone-500">{day.audioDuration}</p>
                                  </div>
                                </div>
                                {isDayOpen ? <ChevronUp className="h-4 w-4 text-stone-400" /> : <ChevronDown className="h-4 w-4 text-stone-400" />}
                              </button>

                              {isDayOpen && (
                                <div className="p-4 pt-0 border-t border-stone-800/80 text-xs space-y-2.5 bg-stone-900/30">
                                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800/80">
                                    <span className="text-amber-400 font-bold block mb-0.5">☀️ Утренний ритуал:</span>
                                    <span className="text-stone-300">{day.morningRitual}</span>
                                  </div>
                                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800/80">
                                    <span className="text-emerald-400 font-bold block mb-0.5">🌿 Рецепт целебного сбора:</span>
                                    <span className="text-stone-300">{day.herbalRecipe}</span>
                                  </div>
                                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800/80">
                                    <span className="text-teal-400 font-bold block mb-0.5">🥣 Правило тарелки:</span>
                                    <span className="text-stone-300">{day.dietTip}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                </div>
              </section>

              {/* INTERACTIVE HABIT TRACKER APP DEMO */}
              <section id="landing-tracker" className="py-16 sm:py-20 border-b border-stone-800 bg-stone-900/60">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                  <div className="text-center max-w-3xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                      Входит в комплект за 990 ₽ • Интерактивное веб-приложение
                    </span>
                    <h2 className="font-['Cinzel'] text-xl sm:text-3xl font-bold text-stone-100 mt-2">
                      Электронный Трекер Таёжных Привычек
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-300 mt-2">
                      Попробуйте живое демо прямо сейчас. Работает в любом браузере на телефоне и компьютере без скачивания из App Store / Google Play!
                    </p>
                  </div>

                  {/* Tracker Interactive Mockup Frame */}
                  <div className="mt-10 max-w-4xl mx-auto rounded-3xl border-2 border-emerald-500/40 bg-stone-950 p-5 sm:p-7 shadow-2xl shadow-emerald-950/60 relative overflow-hidden">
                    
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-stone-800/80">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                          <CheckSquare className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-stone-100 font-['Cinzel']">
                            День {demoTrackerDay} из 14: Протокол очищения
                          </p>
                          <p className="text-[11px] text-emerald-400">
                            Выполнено {demoCheckedHabits.length} из 6 привычек ({Math.round((demoCheckedHabits.length / 6) * 100)}%)
                          </p>
                        </div>
                      </div>

                      {/* Day selector pills */}
                      <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((d) => (
                          <button
                            key={d}
                            onClick={() => setDemoTrackerDay(d)}
                            className={`h-7 w-7 rounded-lg text-xs font-bold shrink-0 transition-all ${
                              demoTrackerDay === d 
                                ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/60" 
                                : "bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left column: Habits Checklist */}
                      <div className="lg:col-span-7 space-y-3">
                        <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                          Ежедневный чек-лист протокола:
                        </p>

                        {[
                          {
                            id: "habit-water-resin",
                            time: "06:30 – 08:00 (натощак)",
                            title: "400 мл горячей воды (45–50°C) с кедровой живицей 5%",
                            why: "Терпены растворяют холестериновый осадок в желчи, тепло снимает спазм со сфинктера Одди."
                          },
                          {
                            id: "habit-diaphragm",
                            time: "07:30 – 08:00 (до завтрака)",
                            title: "5 минут диафрагмального дыхания «Таёжный вдох»",
                            why: "Механический насос: диафрагма мягко сжимает печень и выжимает застоявшуюся желчь."
                          },
                          {
                            id: "habit-herbal-tea",
                            time: "11:00 – 16:00 (между едой)",
                            title: "1–2 чашки дневного сбора (чага + курильский чай + одуванчик)",
                            why: "Полифенолы чаги заживляют слизистую, горечи одуванчика стимулируют свежую желчь."
                          },
                          {
                            id: "habit-no-coffee",
                            time: "После 14:00 (железное правило)",
                            title: "Отказ от кофеина во второй половине дня",
                            why: "Предотвращает истощение надпочечников и спазм сфинктеров протоков."
                          },
                          {
                            id: "habit-evening-tea",
                            time: "20:30 – 21:30 (за час до сна)",
                            title: "Вечерний успокаивающий взвар (душица + иван-чай + дягилевый мед)",
                            why: "Снимает дневной тонус с внутренних органов, готовит выработку ночного мелатонина."
                          },
                          {
                            id: "habit-digital-detox",
                            time: "21:30 – 22:30 (перед сном)",
                            title: "Цифровой детокс: убрать телефон за 60 минут до сна",
                            why: "Синий свет блокирует мелатонин. Без него печень не включит ночную фильтрацию 2000 л крови."
                          }
                        ].map((habit) => {
                          const isChecked = demoCheckedHabits.includes(habit.id);
                          return (
                            <div
                              key={habit.id}
                              onClick={() => {
                                setDemoCheckedHabits((prev) =>
                                  prev.includes(habit.id)
                                    ? prev.filter((h) => h !== habit.id)
                                    : [...prev, habit.id]
                                );
                              }}
                              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                                isChecked
                                  ? "border-emerald-500/60 bg-emerald-950/30"
                                  : "border-stone-800 bg-stone-900/60 hover:border-stone-700"
                              }`}
                            >
                              <div
                                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                                  isChecked
                                    ? "bg-emerald-500 border-emerald-400 text-stone-950"
                                    : "border-stone-700 bg-stone-900"
                                }`}
                              >
                                {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                              </div>
                              <div className="space-y-0.5">
                                <span className="text-[10px] font-bold text-amber-400 block">{habit.time}</span>
                                <p className={`text-xs font-semibold ${isChecked ? "text-emerald-200" : "text-stone-200"}`}>
                                  {habit.title}
                                </p>
                                <p className="text-[11px] text-stone-400 leading-snug">{habit.why}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Right column: Breathing Simulator Widget */}
                      <div className="lg:col-span-5 space-y-4">
                        <div className="p-5 rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/60 via-stone-900 to-stone-950 text-center space-y-3">
                          <div className="flex items-center justify-between text-xs text-stone-400">
                            <span className="font-bold text-emerald-300 flex items-center gap-1">
                              <Wind className="h-3.5 w-3.5" />
                              «Таёжный вдох» (4-2-6-2)
                            </span>
                            <span className="text-[10px] bg-emerald-900/50 px-2 py-0.5 rounded text-emerald-300">
                              Таймер
                            </span>
                          </div>

                          {/* Animated Breathing Circle */}
                          <div className="relative py-4 flex flex-col items-center justify-center">
                            <div
                              className={`h-32 w-32 rounded-full flex flex-col items-center justify-center border-4 transition-all duration-1000 ${
                                isBreathingRunning
                                  ? breathingPhase.startsWith("Вдох")
                                    ? "scale-110 border-emerald-400 bg-emerald-950/80 shadow-2xl shadow-emerald-500/30"
                                    : breathingPhase.startsWith("Задержка")
                                    ? "scale-110 border-amber-400 bg-amber-950/60"
                                    : breathingPhase.startsWith("Выдох")
                                    ? "scale-90 border-teal-400 bg-teal-950/60"
                                    : "scale-90 border-stone-600 bg-stone-900"
                                  : "border-emerald-600/40 bg-stone-900/80"
                              }`}
                            >
                              <span className="text-3xl font-extrabold text-stone-100 font-mono">
                                {isBreathingRunning ? breathingSeconds : "05:00"}
                              </span>
                              <span className="text-[10px] text-stone-300 font-medium px-2 text-center mt-1">
                                {isBreathingRunning ? breathingPhase : "Нажмите Старт"}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => setIsBreathingRunning(!isBreathingRunning)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                isBreathingRunning
                                  ? "bg-amber-500 hover:bg-amber-400 text-stone-950"
                                  : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/60"
                              }`}
                            >
                              {isBreathingRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                              <span>{isBreathingRunning ? "Пауза" : "Запустить дыхание"}</span>
                            </button>
                            {isBreathingRunning && (
                              <button
                                onClick={() => {
                                  setIsBreathingRunning(false);
                                  setBreathingSeconds(4);
                                }}
                                className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs"
                                title="Сбросить"
                              >
                                <RotateCcw className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>

                          <p className="text-[11px] text-stone-400 leading-tight">
                            Вдох носом в живот (4 с) → Пауза (2 с) → Медленный выдох ртом через трубочку (6 с) → Пауза (2 с).
                          </p>
                        </div>

                        {/* Quick Diary preview */}
                        <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                          <p className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                            <Activity className="h-3.5 w-3.5 text-amber-400" />
                            Дневник самочувствия в приложении:
                          </p>
                          <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                            <div className="p-2 rounded-xl bg-stone-950 border border-stone-800">
                              <span className="text-stone-500 block">Энергия</span>
                              <span className="text-emerald-400 font-bold text-xs">8 из 10</span>
                            </div>
                            <div className="p-2 rounded-xl bg-stone-950 border border-stone-800">
                              <span className="text-stone-500 block">Язык с утра</span>
                              <span className="text-stone-200 font-bold text-xs">Чистый розовый</span>
                            </div>
                            <div className="p-2 rounded-xl bg-stone-950 border border-stone-800">
                              <span className="text-stone-500 block">Живот к 21:00</span>
                              <span className="text-emerald-300 font-bold text-xs">Плоский, без газов</span>
                            </div>
                          </div>
                        </div>

                        {/* Direct CTA box */}
                        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 to-emerald-950/40 border border-amber-500/40 text-center space-y-2">
                          <p className="text-xs font-bold text-amber-300">
                            Полный доступ к веб-приложению входит в единый комплект
                          </p>
                          <a
                            href="#landing-pricing"
                            className="block w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-950/60 transition-all"
                          >
                            Получить трекер и все материалы за 990 ₽ →
                          </a>
                        </div>

                      </div>

                    </div>

                  </div>
                </div>
              </section>

              {/* DEEP DIVE PODCAST BREAKDOWN (2000L BLOOD, SIBO, BILE) */}
              <section id="landing-blood" className="py-16 sm:py-20 border-b border-stone-800 bg-stone-950">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                  <div className="text-center max-w-3xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                      Биохимия здоровья из аудио-подкаста Ждана
                    </span>
                    <h2 className="font-['Cinzel'] text-xl sm:text-3xl font-bold text-stone-100 mt-2">
                      Почему 2 000 литров крови в сутки задыхаются без текучей желчи
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-300 mt-2">
                      Разбор физиологии на пальцах: почему при застое желчи гниет пища, не работают дорогие витамины и сыплет лицо.
                    </p>
                  </div>

                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    
                    <div className="p-5 rounded-2xl border border-stone-800 bg-stone-900/60 space-y-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-400 font-extrabold text-sm font-['Cinzel']">
                        2000л
                      </div>
                      <h3 className="font-bold text-stone-100 text-sm font-['Cinzel']">
                        Колоссальный фильтр крови
                      </h3>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        За сутки печень прокачивает через себя свыше 2 000 литров крови! Все токсины, гормоны и продукты распада она сбрасывает в желчь.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl border border-stone-800 bg-stone-900/60 space-y-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-400 font-extrabold text-sm font-['Cinzel']">
                        Мазут
                      </div>
                      <h3 className="font-bold text-stone-100 text-sm font-['Cinzel']">
                        3 причины загущения желчи
                      </h3>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        Хронический стресс (спазм сфинктера Одди) + обезвоживание + рафинированный сахар превращают жидкую желчь в вязкий мазут.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl border border-stone-800 bg-stone-900/60 space-y-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-950/60 border border-red-500/40 text-red-400 font-extrabold text-sm font-['Cinzel']">
                        СИБР
                      </div>
                      <h3 className="font-bold text-stone-100 text-sm font-['Cinzel']">
                        Каскад разрушений и дефицитов
                      </h3>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        Жиры не эмульгируются, гниют в тонкой кишке (СИБР, вздутия). Витамины A, D, E, K не всасываются и уходят транзитом в унитаз.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl border border-stone-800 bg-stone-900/60 space-y-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-extrabold text-sm font-['Cinzel']">
                        Решение
                      </div>
                      <h3 className="font-bold text-stone-100 text-sm font-['Cinzel']">
                        3-фазный таёжный цикл
                      </h3>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        Утро: вода 45–50°C + живица + дыхание. День: чага и одуванчик без кофе. Вечер: душица, ножная ванна и сон без синего экрана.
                      </p>
                    </div>

                  </div>

                  {/* Audio excerpt player callout */}
                  <div className="mt-8 p-5 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-stone-900 to-stone-950 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
                        <Volume2 className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-100 font-['Cinzel']">
                          Аудио-разбор подкаста входит в комплект за 990 ₽
                        </p>
                        <p className="text-[11px] text-stone-400">
                          15 аудио-треков: теория физиологии 2000 л крови + 14 утренних напутствий Ждана Таёжного
                        </p>
                      </div>
                    </div>

                    <a
                      href="#landing-pricing"
                      className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg"
                    >
                      Получить весь аудио-комплект →
                    </a>
                  </div>

                </div>
              </section>

              {/* AUTHOR DOSSIER */}
              <section id="landing-author" className="py-16 sm:py-20 border-b border-stone-800">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    <div className="lg:col-span-5">
                      <div className="rounded-3xl border border-stone-800 bg-stone-900 p-3 shadow-2xl relative">
                        <img 
                          src={APP_IMAGES.zhdan}
                          onError={(e) => {
                            e.currentTarget.src = FALLBACK_IMAGES.zhdan;
                          }}
                          alt="Ждан Таёжный сбор трав" 
                          className="w-full h-80 object-cover rounded-2xl border border-stone-800"
                        />
                        <div className="mt-3 text-center">
                          <p className="font-['Cinzel'] font-bold text-stone-100">Ждан Таёжный</p>
                          <p className="text-xs text-stone-400">Натуропат, потомственный травник в 3-м поколении</p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-7 space-y-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Кто ведёт курс</span>
                      <h2 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold text-stone-100">
                        «Я не лечу болезни — я помогаю телу вспомнить его природную силу»
                      </h2>
                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                        Мне 63 года. Более 30 лет я живу и изучаю силу сибирских трав на Алтае и в Саянской тайге. Через мои руки прошли тысячи сборов и сотни людей, страдавших от тяжести в боку, бессонницы и хронической усталости.
                      </p>
                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                        Мой подход — это строгая биохимия человеческого тела в союзе с вековой мудростью сибирского травничества. Без эзотерики, запугивания и дорогих добавок.
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                        <div className="p-3 bg-stone-900/80 rounded-2xl border border-stone-800">
                          <p className="text-xl font-extrabold text-emerald-400 font-['Cinzel']">30+</p>
                          <p className="text-[11px] text-stone-400">Лет практики травничества</p>
                        </div>
                        <div className="p-3 bg-stone-900/80 rounded-2xl border border-stone-800">
                          <p className="text-xl font-extrabold text-emerald-400 font-['Cinzel']">63 года</p>
                          <p className="text-[11px] text-stone-400">Здравие и личный опыт</p>
                        </div>
                        <div className="p-3 bg-stone-900/80 rounded-2xl border border-stone-800">
                          <p className="text-xl font-extrabold text-emerald-400 font-['Cinzel']">100%</p>
                          <p className="text-[11px] text-stone-400">Натуральные дикоросы</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* CHAGA VS TINDER FUNGUS ATLAS (PDF 2) */}
              <section id="landing-chaga-atlas" className="py-16 sm:py-20 border-b border-stone-800 bg-stone-900/40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                  <div className="text-center max-w-3xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                      Памятка для горожан • Из методички Ждана (PDF 2)
                    </span>
                    <h2 className="font-['Cinzel'] text-xl sm:text-3xl font-bold text-stone-100 mt-2">
                      Атлас Определения: Настоящая Чага vs Ложные Трутовики
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-300 mt-2">
                      80% аптечной чаги собрано с мертвых берез или заменено пустым трутовиком. Научитесь отличать целебный гриб за 30 секунд.
                    </p>
                  </div>

                  {/* Comparison Grid */}
                  <div className="mt-10 overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[650px]">
                      <thead>
                        <tr className="border-b border-stone-800 text-xs text-stone-400">
                          <th className="py-3.5 px-4">Признак</th>
                          <th className="py-3.5 px-4 bg-emerald-950/40 text-emerald-300 font-bold rounded-tl-xl">
                            🌿 Настоящая берёзовая чага (Inonotus obliquus)
                          </th>
                          <th className="py-3.5 px-4 bg-stone-900/80 text-rose-300 font-bold rounded-tr-xl">
                            ⚠️ Ложный трутовик (Phellinus igniarius)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-xs divide-y divide-stone-800">
                        {CHAGA_VS_TINDER_DATA.map((row, idx) => (
                          <tr key={idx} className="hover:bg-stone-900/30 transition-colors">
                            <td className="py-3.5 px-4 font-bold text-stone-200">{row.criterion}</td>
                            <td className="py-3.5 px-4 bg-emerald-950/20 text-emerald-200 font-medium leading-relaxed">
                              {row.chaga}
                            </td>
                            <td className="py-3.5 px-4 bg-stone-900/30 text-stone-400 leading-relaxed">
                              {row.tinder}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Warning Callout Box */}
                  <div className="mt-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 flex items-start gap-3 text-xs">
                    <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-rose-200">
                        Строгое медицинское предостережение от Ждана:
                      </p>
                      <p className="text-rose-300/90 mt-0.5 leading-relaxed">
                        Берёзовая чага <span className="font-bold underline">абсолютно несовместима</span> с одновременным приёмом антибиотиков пенициллинового ряда и внутривенным введением глюкозы! При совместном приеме их действие нейтрализуется.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5 HERBAL DIRECTIONS & BREWING LAWS (PDF 4) */}
              <section id="landing-herbal" className="py-16 sm:py-20 border-b border-stone-800 bg-stone-950">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                  <div className="text-center max-w-3xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                      Сибирский Травник • Из сборника рецептов (PDF 4)
                    </span>
                    <h2 className="font-['Cinzel'] text-xl sm:text-3xl font-bold text-stone-100 mt-2">
                      Рецептурная Карта 5 Целебных Направлений
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-300 mt-2">
                      Точные весовые пропорции трав, граммовка и протоколы заваривания для восстановления всех систем организма.
                    </p>
                  </div>

                  {/* Direction Tabs */}
                  <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {HERBAL_CARD_5_DIRECTIONS.map((herb) => (
                      <button
                        key={herb.id}
                        onClick={() => setActiveHerbalTab(herb.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          activeHerbalTab === herb.id
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/60"
                            : "bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200"
                        }`}
                      >
                        {herb.title}
                      </button>
                    ))}
                  </div>

                  {/* Active Direction Card */}
                  {HERBAL_CARD_5_DIRECTIONS.filter((h) => h.id === activeHerbalTab).map((herb) => (
                    <div
                      key={herb.id}
                      className="mt-8 p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950 shadow-2xl space-y-6"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-800">
                        <div>
                          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                            Назначение: {herb.purpose}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-stone-100 font-['Cinzel'] mt-1">
                            {herb.title}
                          </h3>
                        </div>
                        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
                          Курс: 14 дней
                        </span>
                      </div>

                      {/* Formula & Protocol Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <p className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Layers className="h-4 w-4 text-emerald-400" />
                            Точный весовой состав сбора:
                          </p>
                          <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-stone-800 text-xs text-stone-200 leading-relaxed">
                            <p className="font-semibold text-emerald-300">{herb.composition}</p>
                          </div>

                          <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-stone-300 space-y-1">
                            <span className="font-bold text-emerald-400 block text-[11px] uppercase tracking-wider">
                              Биохимическое действие на органы:
                            </span>
                            <p className="text-stone-300 leading-relaxed">{herb.action}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <p className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                            <FileText className="h-4 w-4 text-amber-400" />
                            Рецептура и схема приёма:
                          </p>
                          <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-3 text-xs">
                            <div>
                              <span className="text-stone-400 block text-[11px]">Пошаговый протокол заваривания:</span>
                              <span className="text-stone-200 font-medium leading-relaxed block mt-1">{herb.recipe}</span>
                            </div>
                            <div className="pt-2 border-t border-stone-800/80">
                              <span className="text-amber-400 block text-[11px] font-bold">Совет от Ждана:</span>
                              <span className="text-stone-400">
                                Заваривайте только в термосе со стеклянной колбой или керамике при температуре до 70°C.
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}

                  {/* 5 Laws of Chaga Brewing Callout */}
                  <div className="mt-10 p-6 sm:p-7 rounded-3xl border border-amber-500/30 bg-stone-900/60 space-y-4">
                    <h3 className="text-base sm:text-lg font-bold text-amber-400 font-['Cinzel'] flex items-center gap-2">
                      <Flame className="h-5 w-5" />
                      5 Непреложных Законов Заваривания Чаги от Ждана Таёжного
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                      {FIVE_BREWING_LAWS.map((law, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5"
                        >
                          <div className="flex items-center gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded bg-amber-500/20 text-amber-400 font-bold text-[11px]">
                              {idx + 1}
                            </span>
                            <p className="text-xs font-bold text-stone-200">{law.title}</p>
                          </div>
                          <p className="text-[11px] text-stone-400 leading-snug">{law.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </section>

              {/* 10 QUESTIONS TO ZHDAN TAYOZHNY (PDF 1) */}
              <section id="landing-zhdan-qa" className="py-16 sm:py-20 border-b border-stone-800 bg-stone-900/40">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                  <div className="text-center max-w-2xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                      Ответы травника • Из методички Ждана (PDF 1)
                    </span>
                    <h2 className="font-['Cinzel'] text-xl sm:text-3xl font-bold text-stone-100 mt-2">
                      10 Главных Вопросов Ждану Таёжному
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-300 mt-2">
                      Честные ответы без замалчиваний: тошнота в первые дни, камни в желчном, аптечные аналоги и совместимость с лекарствами.
                    </p>
                  </div>

                  <div className="mt-8 space-y-3">
                    {TEN_ZHDAN_QUESTIONS.map((item, idx) => {
                      const isOpen = expandedZhdanQuestion === idx;
                      return (
                        <div
                          key={idx}
                          className="rounded-2xl border border-stone-800 bg-stone-950 overflow-hidden transition-all"
                        >
                          <button
                            onClick={() => setExpandedZhdanQuestion(isOpen ? null : idx)}
                            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone-900/50 transition-colors"
                          >
                            <div className="flex items-center gap-3 pr-2">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-950 border border-emerald-800/80 text-emerald-400 text-xs font-bold font-mono">
                                {idx + 1}
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-stone-200">
                                {item.q}
                              </span>
                            </div>
                            {isOpen ? (
                              <ChevronUp className="h-4 w-4 text-emerald-400 shrink-0" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-stone-500 shrink-0" />
                            )}
                          </button>

                          {isOpen && (
                            <div className="p-4 sm:p-5 pt-0 border-t border-stone-800/80 text-xs sm:text-sm text-stone-300 leading-relaxed bg-stone-900/30">
                              <p className="italic text-stone-200 bg-stone-950/80 p-3.5 rounded-xl border border-stone-800">
                                «{item.a}»
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* 7 GOLDEN RULES OF CITY HERBALIST CHECKLIST (PDF 3) */}
              <section id="landing-rules" className="py-16 sm:py-20 border-b border-stone-800 bg-stone-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                  <div className="text-center max-w-2xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                      Интерактивный чек-лист • Из руководства (PDF 3)
                    </span>
                    <h2 className="font-['Cinzel'] text-xl sm:text-3xl font-bold text-stone-100 mt-2">
                      7 Золотых Правил Городского Травника
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-300 mt-2">
                      Как закупать травы в аптеке и хранить их в условиях обычной квартиры без потери эфирных масел.
                    </p>
                  </div>

                  <div className="mt-8 space-y-3">
                    {SEVEN_GOLDEN_RULES.map((rule) => {
                      const isChecked = checkedRules.includes(rule.num);
                      return (
                        <div
                          key={rule.num}
                          onClick={() => {
                            setCheckedRules((prev) =>
                              prev.includes(rule.num)
                                ? prev.filter((n) => n !== rule.num)
                                : [...prev, rule.num]
                            );
                          }}
                          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                            isChecked
                              ? "border-emerald-500/60 bg-emerald-950/30"
                              : "border-stone-800 bg-stone-900/60 hover:border-stone-700"
                          }`}
                        >
                          <div
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition-all ${
                              isChecked
                                ? "bg-emerald-500 border-emerald-400 text-stone-950 font-bold"
                                : "border-stone-700 bg-stone-950 text-stone-500 text-xs"
                            }`}
                          >
                            {isChecked ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : rule.num}
                          </div>
                          <div>
                            <p
                              className={`text-xs sm:text-sm font-bold ${
                                isChecked ? "text-emerald-200 line-through opacity-80" : "text-stone-100"
                              }`}
                            >
                              Правило #{rule.num}: {rule.title}
                            </p>
                            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                              {rule.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* SINGLE PRODUCT HIGH-CONVERTING OFFER (990 RUB) */}
              <section id="landing-pricing" className="py-16 sm:py-24 border-b border-stone-800 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 relative overflow-hidden">
                
                {/* Decorative background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                  
                  <span className="inline-block bg-amber-500 text-stone-950 text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-wider mb-3 shadow-lg shadow-amber-500/20">
                    Единый Комплекс • Все Материалы и Приложение
                  </span>

                  <h2 className="font-['Cinzel'] text-2xl sm:text-4xl font-extrabold text-stone-100 mt-1">
                    Цифровой Комплект «Таёжный Перезапуск»
                  </h2>

                  <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-xl mx-auto">
                    Полный 14-дневный протокол очищения печени и желчевыводящих путей со всеми методичками, рецептами и веб-трекером.
                  </p>

                  {/* Main Single Product Card */}
                  <div className="mt-10 rounded-3xl border-2 border-emerald-500 bg-gradient-to-b from-emerald-950/80 via-stone-900 to-stone-950 p-6 sm:p-10 shadow-2xl shadow-emerald-950/80 text-left">
                    
                    <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 border-b border-stone-800">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-4xl sm:text-5xl font-extrabold text-stone-100 font-['Cinzel']">
                            990 ₽
                          </span>
                          <span className="text-base sm:text-lg text-stone-500 line-through">
                            2 500 ₽
                          </span>
                          <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded-full text-xs font-bold">
                            Разовая оплата
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 mt-2 font-medium">
                          Полный комплект материалов с постоянным доступом без скрытых подписок.
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-stone-400 block">Доступ:</span>
                        <span className="text-xs font-bold text-emerald-400">Навсегда, в браузере и PDF</span>
                      </div>
                    </div>

                    {/* All Included Modules */}
                    <div className="mt-6">
                      <p className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-4">
                        Что входит в цифровой комплект за 990 ₽:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {SINGLE_PRODUCT_OFFER.packageContents.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800/80 flex items-start justify-between gap-3 text-xs"
                          >
                            <div className="flex items-start gap-2.5">
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="text-stone-200 font-semibold block">{item.title}</span>
                                <span className="text-[11px] text-stone-400 block mt-0.5 leading-snug">{item.desc}</span>
                              </div>
                            </div>
                            <span className="text-[10px] text-emerald-400 shrink-0 font-mono bg-stone-900 px-2 py-0.5 rounded border border-stone-800 self-start font-bold">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Instant Inclusion Strip */}
                    <div className="mt-6 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-xs flex items-center gap-3">
                      <Gift className="h-5 w-5 text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-bold text-emerald-300">
                          В комплекте:
                        </span>{" "}
                        <span className="text-stone-300">
                          Интерактивный электронный веб-трекер с фиксацией привычек в браузере, протокол 14 дней и атлас сборов.
                        </span>
                      </div>
                    </div>

                    {/* High-Converting CTA Button */}
                    <div className="mt-8 space-y-3">
                      <button
                        onClick={() => handleOpenCheckout(PRICING_PLANS[0])}
                        className="w-full py-4 sm:py-5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-sm sm:text-base transition-all flex items-center justify-center gap-3 shadow-2xl shadow-emerald-950/80 hover:scale-[1.01]"
                      >
                        <Zap className="h-5 w-5 text-amber-300" />
                        <span>ПОЛУЧИТЬ ВЕСЬ КОМПЛЕКТ ЗА 990 ₽</span>
                        <ArrowRight className="h-5 w-5" />
                      </button>

                      <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-stone-400 pt-1">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                          Безопасная оплата (СБП / Карта)
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Send className="h-3.5 w-3.5 text-emerald-400" />
                          Мгновенный доступ к трекеру и урокам
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Award className="h-3.5 w-3.5 text-emerald-400" />
                          Пожизненный доступ без доплат
                        </span>
                      </div>
                    </div>

                  </div>

                </div>
              </section>


              {/* 100% MONEY-BACK GUARANTEE */}
              <section className="py-12 border-b border-stone-800">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                  <div className="p-6 rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-stone-900 to-stone-950 flex flex-col sm:flex-row items-center gap-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                      <ShieldCheck className="h-9 w-9" />
                    </div>
                    <div className="text-center sm:text-left space-y-1">
                      <h3 className="text-base font-bold text-stone-100 font-['Cinzel']">
                        100% Гарантия возврата средств в течение 3-х дней
                      </h3>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        Если за первые 3 дня вы выполните рекомендации Ждана и почувствуете, что курс вам не подходит — просто напишите в службу заботы. Мы вернем вам 100% оплаты без лишних вопросов и претензий.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ ACCORDION */}
              <section id="landing-faq" className="py-16 sm:py-20 border-b border-stone-800 bg-stone-900/30">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                  <div className="text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Ответы на вопросы</span>
                    <h2 className="font-['Cinzel'] text-xl sm:text-3xl font-bold text-stone-100 mt-2">
                      Часто задаваемые вопросы
                    </h2>
                  </div>

                  <div className="mt-8 space-y-3">
                    {FAQ_DATA.map((faq, index) => {
                      const isOpen = expandedFaq === index;
                      return (
                        <div key={index} className="rounded-2xl border border-stone-800 bg-stone-950 overflow-hidden transition-all">
                          <button
                            onClick={() => setExpandedFaq(isOpen ? null : index)}
                            className="w-full p-4 text-left flex justify-between items-center gap-3 font-bold text-xs sm:text-sm text-stone-100 hover:text-emerald-400 transition-colors"
                          >
                            <span>{faq.question}</span>
                            <ChevronDown className={`h-4 w-4 text-emerald-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                          </button>
                          {isOpen && (
                            <div className="p-4 pt-0 text-xs text-stone-300 leading-relaxed border-t border-stone-800/80 pt-3">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* FOOTER */}
              <footer className="border-t border-stone-800 bg-stone-950 py-10 text-xs text-stone-500">
                <div className="max-w-6xl mx-auto px-4 text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-stone-400">
                    <Trees className="h-4 w-4 text-emerald-400" />
                    <span className="font-['Cinzel'] font-bold text-stone-300">ЖДАН ТАЁЖНЫЙ</span>
                    <span>• Сибирский природный биохакинг</span>
                  </div>
                  <p>ИП Таёжный Ж. В. • ОГРНИП 321547600012345 • Все права защищены 2026</p>
                  <p className="text-[11px] text-stone-600 max-w-xl mx-auto">
                    Отказ от ответственности: материалы курса носят информационно-просветительский характер. Не являются медицинской услугой или фармакологическим назначением.
                  </p>
                </div>
              </footer>

              {/* STICKY BOTTOM BAR (Mobile conversion booster) */}
              <div className="sticky bottom-0 z-30 bg-stone-950/95 border-t border-stone-800 p-3 backdrop-blur-md flex items-center justify-between sm:hidden">
                <div>
                  <p className="text-[10px] text-stone-400">Скидка 72% сгорает</p>
                  <p className="text-xs font-bold text-emerald-400">от 990 ₽</p>
                </div>
                <a
                  href="#landing-pricing"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Занять место →
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: COPYWRITING & AIDA TEXT BREAKDOWN */}
      {viewMode === "copy" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/80 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h2 className="text-lg font-bold text-stone-100 font-['Cinzel']">
                  Маркетинговый бриф & Тексты (Формула AIDA)
                </h2>
                <p className="text-xs text-stone-400">
                  Все тексты блоков готовы для копирования в Tilda, Taplink, Notion или Telegram.
                </p>
              </div>

              <button
                onClick={() => {
                  const copyText = `ТАЁЖНЫЙ ПЕРЕЗАПУСК: Очищение ЖКТ и печени за 14 дней
Главный оффер: Очистите ЖКТ, перезапустите печень и верните лёгкость в теле за 14 дней по авторской сибирской методике.
Продукт: Единый цифровой комплект (14-дневный протокол + Интерактивный трекер) за 990 ₽.
Автор: Ждан Таёжный (63 года), сибирский натуропат.
Формат: Мгновенный доступ, травы из аптеки, без голодовок и клизм.`;
                  navigator.clipboard.writeText(copyText);
                  setCopiedCopy(true);
                  setTimeout(() => setCopiedCopy(false), 2000);
                }}
                className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
              >
                {copiedCopy ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedCopy ? "Скопировано!" : "Копировать краткий бриф"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  [A] Attention (Внимание)
                </span>
                <p className="font-bold text-stone-200">Главный заголовок H1:</p>
                <p className="text-stone-300 italic">«Очистите ЖКТ, перезапустите печень и верните лёгкость в теле за 14 дней»</p>
                <p className="font-bold text-stone-200 mt-2">Триггеры доверия:</p>
                <p className="text-stone-400">30+ лет опыта травничества, Ждан Таёжный (63 года), травы из любой аптеки за 650–850 ₽ без экзотики.</p>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  [I] Interest (Интерес)
                </span>
                <p className="font-bold text-stone-200">Интерактивный тест симптомов:</p>
                <p className="text-stone-300">Человек сам нажимает на свои боли (тяжесть в правом боку, белый налет на языке, вздутия к вечеру, упадок сил в 15:00) и моментально получает свой индекс интоксикации.</p>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">
                  [D] Desire (Желание)
                </span>
                <p className="font-bold text-stone-200">Логическое обоснование:</p>
                <p className="text-stone-300">Сравнение «Аптека vs Смузи-голод vs Метод Ждана». Разрушение мифа о том, что нужно голодать или пить клизмы. 5 законов заваривания трав и атлас правильной чаги.</p>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                  [A] Action (Действие)
                </span>
                <p className="font-bold text-stone-200">Единое предложение:</p>
                <p className="text-stone-300">Полный комплект (14-дневный протокол + Интерактивный трекер привычек + рецепты) за 990 ₽ с разовой оплатой.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: HTML/CSS EXPORT */}
      {viewMode === "code" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/80 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full">
                  Standalone Single-File HTML
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {codeExportType === "mini" ? "zhdan_mini_landing.html" : "zhdan_full_landing.html"}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-stone-100 font-['Cinzel']">
                {codeExportType === "mini" ? "Код Мини-Лендинга (5 блоков без воды)" : "Код Полного Лендинга (Справочник травника)"}
              </h2>
              <p className="text-xs text-stone-400">
                Полный автономный HTML-файл с Tailwind CSS CDN, шрифтами Cinzel, интерактивными формами и адаптивностью.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Toggle Mini vs Full */}
              <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
                <button
                  type="button"
                  onClick={() => setCodeExportType("mini")}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    codeExportType === "mini" 
                      ? "bg-emerald-600 text-white font-bold" 
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  Мини (5 блоков)
                </button>
                <button
                  type="button"
                  onClick={() => setCodeExportType("full")}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    codeExportType === "full" 
                      ? "bg-emerald-600 text-white font-bold" 
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  Полный
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedCode ? "Скопировано!" : "Копировать код"}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadHtml}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Скачать .HTML</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-950 p-4 max-h-[500px] overflow-y-auto font-mono text-xs text-stone-300">
            <pre className="whitespace-pre-wrap">
              {codeExportType === "mini" ? generateMiniLandingPageHtml() : generateLandingPageHtml()}
            </pre>
          </div>
        </div>
      )}

      {/* VIEW 4: CONVERSION & REVENUE ANALYTICS */}
      {viewMode === "analytics" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/80 p-5 space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-stone-100 font-['Cinzel']">
              Прогноз Конверсии & Модель Окупаемости Трафика (ROMI)
            </h2>
            <p className="text-xs text-stone-400">
              Расчет экономики запуска на базе органического трафика из Instagram Reels и Stories AI-блогера Ждана Таёжного.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="p-4 rounded-2xl border border-stone-800 bg-stone-950">
                <span className="text-[10px] text-stone-500 uppercase font-bold">Охват Reels в месяц</span>
                <p className="text-xl font-bold text-stone-100 font-['Cinzel'] mt-1">150 000</p>
                <p className="text-[11px] text-emerald-400">Органический охват</p>
              </div>

              <div className="p-4 rounded-2xl border border-stone-800 bg-stone-950">
                <span className="text-[10px] text-stone-500 uppercase font-bold">Переходы на сайт (CTR 4.5%)</span>
                <p className="text-xl font-bold text-stone-100 font-['Cinzel'] mt-1">6 750</p>
                <p className="text-[11px] text-stone-400">Посетителей лендинга</p>
              </div>

              <div className="p-4 rounded-2xl border border-stone-800 bg-stone-950">
                <span className="text-[10px] text-stone-500 uppercase font-bold">Конверсия лендинга (CR)</span>
                <p className="text-xl font-bold text-amber-400 font-['Cinzel'] mt-1">4.2%</p>
                <p className="text-[11px] text-stone-400">283 оплаты потока</p>
              </div>

              <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-950/30">
                <span className="text-[10px] text-emerald-400 uppercase font-bold">Прогноз выручки / поток</span>
                <p className="text-xl font-bold text-emerald-300 font-['Cinzel'] mt-1">594 300 ₽</p>
                <p className="text-[11px] text-stone-400">Средний чек ~2 100 ₽</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-stone-800 bg-stone-950 text-xs space-y-2">
              <p className="font-bold text-stone-200">Ключевые точки конверсии одностраничника:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-stone-400">
                <div className="p-2.5 bg-stone-900/70 rounded-xl">
                  <span className="text-emerald-400 font-bold block mb-1">1. Интерактивный тест</span>
                  Вовлекает 68% холодных посетителей в самодиагностику и осознание проблемы застоя желчи.
                </div>
                <div className="p-2.5 bg-stone-900/70 rounded-xl">
                  <span className="text-amber-400 font-bold block mb-1">2. Голосовое напутствие</span>
                  Снимает барьер недоверия к AI-персоне, демонстрируя глубокий баритон и отцовскую заботу.
                </div>
                <div className="p-2.5 bg-stone-900/70 rounded-xl">
                  <span className="text-teal-400 font-bold block mb-1">3. Трипваер за 990 ₽</span>
                  Позволяет новому подписчику сделать первую микро-покупку без раздумий и риска.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL SIMULATION */}
      {isCheckoutOpen && selectedPlanForCheckout && (
        <div className="fixed inset-0 bg-stone-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-emerald-500/40 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-200 text-sm p-1 rounded-lg"
            >
              ✕
            </button>

            {!orderComplete ? (
              <form onSubmit={handleFinishPayment} className="space-y-4 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    Оформление участия в интенсиве
                  </span>
                  <h3 className="text-lg font-bold text-stone-100 font-['Cinzel'] mt-0.5">
                    {selectedPlanForCheckout.name}
                  </h3>
                </div>

                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-between">
                  <span className="text-stone-400">Стоимость со скидкой 72%:</span>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-emerald-400">
                      {selectedPlanForCheckout.discountPrice.toLocaleString()} ₽
                    </span>
                    <span className="text-[10px] text-stone-500 line-through block">
                      {selectedPlanForCheckout.originalPrice.toLocaleString()} ₽
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <label className="block text-stone-300 mb-1 font-medium">Ваше имя:</label>
                    <input
                      required
                      type="text"
                      placeholder="Иван"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-stone-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 mb-1 font-medium">Email (для доступа к курсу):</label>
                    <input
                      required
                      type="email"
                      placeholder="ivan@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-stone-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 mb-1 font-medium">Телефон / Telegram:</label>
                    <input
                      required
                      type="tel"
                      placeholder="+7 (999) 000-00-00"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-stone-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Payment Method Select */}
                <div>
                  <label className="block text-stone-300 mb-1 font-medium">Способ оплаты:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("sbp")}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        paymentMethod === "sbp" ? "border-emerald-500 bg-emerald-950/40 text-emerald-300" : "border-stone-800 bg-stone-950 text-stone-400"
                      }`}
                    >
                      СБП (0% комиссии)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        paymentMethod === "card" ? "border-emerald-500 bg-emerald-950/40 text-emerald-300" : "border-stone-800 bg-stone-950 text-stone-400"
                      }`}
                    >
                      Карта РФ / МИР
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-950/60"
                  >
                    Оплатить {selectedPlanForCheckout.discountPrice.toLocaleString()} ₽ безопасно
                  </button>
                  <p className="text-[10px] text-stone-500 text-center mt-2">
                    🔒 256-битное шифрование • Гарантия возврата 100%
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-4 py-3">
                <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-100 font-['Cinzel']">
                    Поздравляем, {customerName || "Друг"}!
                  </h3>
                  <p className="text-xs text-stone-300 mt-1">
                    Ваше участие в тарифе «{selectedPlanForCheckout.name}» подтверждено.
                  </p>
                </div>

                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-xs text-left space-y-1.5">
                  <p className="text-stone-400">Ссылка для входа в закрытый Telegram-канал и доступ к веб-приложению отправлены на:</p>
                  <p className="font-bold text-emerald-400">{customerEmail || "ivan@example.com"}</p>
                  <p className="text-[11px] text-amber-300">
                    🌿 Веб-трекер привычек и все 14 уроков активированы на ваш аккаунт!
                  </p>
                  <p className="text-[11px] text-stone-500 pt-1 border-t border-stone-800">
                    Номер заказа: #ZD-{Math.floor(100000 + Math.random() * 900000)}
                  </p>
                </div>

                <div className="space-y-2">
                  <a
                    href="#landing-tracker"
                    onClick={() => setIsCheckoutOpen(false)}
                    className="block w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold text-center shadow-lg shadow-emerald-950/60"
                  >
                    Перейти к Трекеру Привычек (День 1) →
                  </a>
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-medium"
                  >
                    Закрыть окно
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
