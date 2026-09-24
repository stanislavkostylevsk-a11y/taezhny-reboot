import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  Circle, 
  Flame, 
  Droplets, 
  Wind, 
  Coffee, 
  Moon, 
  PhoneOff, 
  Sparkles, 
  RotateCcw, 
  Calendar, 
  Clock, 
  Play, 
  Pause, 
  Volume2, 
  ChevronRight, 
  ChevronLeft, 
  Award, 
  Check, 
  Info,
  Download,
  Share2,
  HeartPulse
} from "lucide-react";
import confetti from "canvas-confetti";

export interface HabitItem {
  id: string;
  title: string;
  timeWindow: string;
  category: "morning" | "day" | "evening" | "night";
  description: string;
  scientificWhy: string;
  icon: any;
  defaultChecked?: boolean;
}

export interface DayLog {
  dayNumber: number;
  completedHabitIds: string[];
  energyScore: number; // 1-10
  tongueState: "clean" | "light_coating" | "thick_coating" | "yellow_bitter";
  gutState: "comfort" | "mild_bloat" | "heavy_sibr";
  weight?: string;
  notes: string;
}

const PROTOCOL_HABITS: HabitItem[] = [
  {
    id: "habit-water-resin",
    title: "400 мл горячей воды (45–50°C) с кедровой живицей 5% (или соком лимона)",
    timeWindow: "06:30 – 08:00 (натощак)",
    category: "morning",
    description: "Медленными глотками выпить структурированную теплую воду с 1/4 ч. л. живицы или долькой лимона.",
    scientificWhy: "Терпены живицы растворяют холестериновый осадок в желчи, а температура 45–50°C снимает спазм со сфинктера Одди.",
    icon: Droplets
  },
  {
    id: "habit-breathing",
    title: "5 минут диафрагмального дыхания «Таёжный вдох»",
    timeWindow: "07:00 – 08:15 (до завтрака)",
    category: "morning",
    description: "Дыхание животом: глубокий вдох носом (4 сек), мягкая задержка (2 сек), плавный выдох ртом (6 сек).",
    scientificWhy: "Диафрагма опускается вниз и физически выжимает застоявшуюся за ночь желчь из печени и пузыря в кишечник.",
    icon: Wind
  },
  {
    id: "habit-herbal-tea",
    title: "150–200 мл дневного сбора «Таёжный перезапуск»",
    timeWindow: "13:30 – 15:00 (после обеда)",
    category: "day",
    description: "Настой из термоса: 2 части чаги, 1 часть брусники, 1 часть курильского чая, 1 часть корня одуванчика (60–70°C).",
    scientificWhy: "Полифенолы чаги латают слизистую ЖКТ, лапчатка подавляет СИБР, а одуванчик стимулирует свежий холерез.",
    icon: Sparkles
  },
  {
    id: "habit-no-coffee",
    title: "Полный запрет на кофеин после 14:00",
    timeWindow: "После 14:00",
    category: "day",
    description: "Замена кофе на травяной настой чаги, иван-чай или чистую теплую воду.",
    scientificWhy: "Кофеин во второй половине дня истощает надпочечники, спазмирует желчевыводящие протоки и сбивает синтез мелатонина.",
    icon: Coffee
  },
  {
    id: "habit-clean-plate",
    title: "Чистая тарелка без рафинированного сахара и белой муки",
    timeWindow: "В течение всего дня",
    category: "day",
    description: "Исключить булки, скрытый сахар и фастфуд. Основа: овощи, правильные жиры (кедровое масло, семена) и чистый белок.",
    scientificWhy: "Рафинированные углеводы делают желчь вязкой, как мазут, и служат кормом для патогенных бактерий в тонкой кишке.",
    icon: Flame
  },
  {
    id: "habit-evening-infusion",
    title: "Теплый вечерний взвар (душица + иван-чай + шиповник + мед)",
    timeWindow: "20:30 – 21:30",
    category: "evening",
    description: "Стакан ароматного сбора вприкуску с 1 ч. л. таёжного дягилевого мёда.",
    scientificWhy: "Успокаивает нервную систему, устраняет микроспазмы сосудов и дает мозгу медленную глюкозу для ночной регенерации.",
    icon: Moon
  },
  {
    id: "habit-foot-bath",
    title: "Горячая ножная ванна со смоляной/пихтовой солью (15 минут)",
    timeWindow: "21:30 – 22:00",
    category: "evening",
    description: "Вода 39–41°C с добавлением хвойного экстракта или морской соли.",
    scientificWhy: "Расширяет периферические капилляры, оттягивает кровь от перегруженных внутренних органов и включает парасимпатику.",
    icon: HeartPulse
  },
  {
    id: "habit-digital-detox",
    title: "Строгий цифровой детокс за 60 минут до сна",
    timeWindow: "22:00 – 23:00 (отбой)",
    category: "night",
    description: "Полное отключение синих экранов, смартфонов, ТВ и ноутбуков. Приглушенный теплый свет свечи или ночника.",
    scientificWhy: "Синий свет блокирует мелатонин. Без него печень не переключится с пищеварения на ночной детокс 2000 литров крови.",
    icon: PhoneOff
  }
];

const DAYS_TITLES = [
  "День 1: Запуск желчеоттока и эмульгации жиров",
  "День 2: Разжижение желчного мазута терпенами живицы",
  "День 3: Почечный дренаж брусникой и снятие отеков",
  "День 4: Механический массаж печени дыханием",
  "День 5: Защита слизистой желудка полифенолами чаги",
  "День 6: Купирование СИБР курильским чаем (лапчаткой)",
  "День 7: Экватор: разгрузка и оценка легкости в животе",
  "День 8: Восстановление дружественной микрофлоры ЖКТ",
  "День 9: Лимфатический дренаж и вечерняя пихтовая ванна",
  "День 10: Укрепление сосудов и нормализация давления",
  "День 11: Адаптоген Саган-Дайля: энергия без кофеина",
  "День 12: Синхронизация циркадных ритмов и мелатонин",
  "День 13: Закрепление навыка чистой желчи и питания",
  "День 14: Выпускной: замеры, чистый язык и бодрость"
];

const STORAGE_KEY = "zhdan_tayozhny_habit_tracker_v1";

export const HabitTrackerApp: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [logs, setLogs] = useState<Record<number, DayLog>>({});
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(300); // 5 minutes
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale" | "pause">("inhale");
  const [breathCountdown, setBreathCountdown] = useState<number>(4);
  const [showDayNotes, setShowDayNotes] = useState<boolean>(false);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setLogs(JSON.parse(saved));
      } else {
        // Initial mock state for Day 1
        setLogs({
          1: {
            dayNumber: 1,
            completedHabitIds: ["habit-water-resin", "habit-breathing"],
            energyScore: 7,
            tongueState: "light_coating",
            gutState: "mild_bloat",
            weight: "74.5",
            notes: "Начал протокол. Горячая вода с лимоном дала приятное тепло в животе. Дыхание помогло проснуться быстрее кофе!"
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save to local storage
  const saveLogs = (updated: Record<number, DayLog>) => {
    setLogs(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const currentLog = logs[activeDay] || {
    dayNumber: activeDay,
    completedHabitIds: [],
    energyScore: 6,
    tongueState: "light_coating",
    gutState: "mild_bloat",
    weight: "",
    notes: ""
  };

  const toggleHabit = (habitId: string) => {
    const isCompleted = currentLog.completedHabitIds.includes(habitId);
    let newCompleted: string[];
    if (isCompleted) {
      newCompleted = currentLog.completedHabitIds.filter(id => id !== habitId);
    } else {
      newCompleted = [...currentLog.completedHabitIds, habitId];
      if (newCompleted.length === PROTOCOL_HABITS.length) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#10B981", "#D97706", "#34D399", "#F59E0B"]
        });
      }
    }

    const updated = {
      ...logs,
      [activeDay]: {
        ...currentLog,
        completedHabitIds: newCompleted
      }
    };
    saveLogs(updated);
  };

  const updateLogField = <K extends keyof DayLog>(field: K, val: DayLog[K]) => {
    const updated = {
      ...logs,
      [activeDay]: {
        ...currentLog,
        [field]: val
      }
    };
    saveLogs(updated);
  };

  // Breathing timer loop
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
        setBreathCountdown(prev => {
          if (prev <= 1) {
            // cycle to next phase: inhale (4) -> hold (2) -> exhale (6) -> pause (2)
            if (breathPhase === "inhale") {
              setBreathPhase("hold");
              return 2;
            } else if (breathPhase === "hold") {
              setBreathPhase("exhale");
              return 6;
            } else if (breathPhase === "exhale") {
              setBreathPhase("pause");
              return 2;
            } else {
              setBreathPhase("inhale");
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      // Auto-check breathing habit
      if (!currentLog.completedHabitIds.includes("habit-breathing")) {
        toggleHabit("habit-breathing");
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, breathPhase, breathCountdown, currentLog]);

  const handleResetDay = () => {
    if (window.confirm(`Сбросить отметки за День ${activeDay}?`)) {
      const updated = {
        ...logs,
        [activeDay]: {
          dayNumber: activeDay,
          completedHabitIds: [],
          energyScore: 5,
          tongueState: "clean",
          gutState: "comfort",
          weight: "",
          notes: ""
        }
      };
      saveLogs(updated);
    }
  };

  // Statistics
  const totalHabitsCompletedAcrossAllDays: number = (Object.values(logs) as any[]).reduce(
    (acc: number, item: any) => acc + (item && Array.isArray(item.completedHabitIds) ? Number(item.completedHabitIds.length) : 0),
    0
  );
  const totalPossibleHabits = 14 * PROTOCOL_HABITS.length;
  const overallProgressPercent = Math.round((Number(totalHabitsCompletedAcrossAllDays) / totalPossibleHabits) * 100);
  const currentDayProgressPercent = Math.round((currentLog.completedHabitIds.length / PROTOCOL_HABITS.length) * 100);

  return (
    <div className="space-y-8 animate-fadeIn text-stone-200">
      {/* App Header Banner */}
      <div className="rounded-3xl border border-stone-800 bg-gradient-to-br from-stone-900 via-stone-950 to-emerald-950/60 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Электронное Веб-Приложение
              </span>
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/30">
                14-Дневный Протокол ЖКТ и Печени
              </span>
              <span className="rounded-full bg-stone-800 px-3 py-1 text-xs text-stone-300 font-medium">
                Входит в единый тариф 990 ₽
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-100 font-['Cinzel'] tracking-tight">
              Интерактивный Трекер Таёжных Привычек
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Ваш персональный карманный помощник для отслеживания утреннего желчеоттока, приёма алтайских травяных сборов, таймера диафрагмального дыхания и вечернего детокса без кофеина.
            </p>
          </div>

          {/* Quick Stats Pill Box */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-stone-900/80 p-4 rounded-2xl border border-stone-800 shrink-0">
            <div className="text-center p-2 rounded-xl bg-stone-950/60 border border-stone-800/80">
              <p className="text-[10px] uppercase font-bold text-stone-400">Сегодня</p>
              <p className="text-xl font-extrabold text-emerald-400">
                {currentLog.completedHabitIds.length} <span className="text-xs text-stone-500 font-normal">/ {PROTOCOL_HABITS.length}</span>
              </p>
            </div>
            <div className="text-center p-2 rounded-xl bg-stone-950/60 border border-stone-800/80">
              <p className="text-[10px] uppercase font-bold text-stone-400">Прогресс</p>
              <p className="text-xl font-extrabold text-amber-400">
                {currentDayProgressPercent}%
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1 text-center p-2 rounded-xl bg-stone-950/60 border border-stone-800/80">
              <p className="text-[10px] uppercase font-bold text-stone-400">Весь курс</p>
              <p className="text-xl font-extrabold text-stone-100">
                {overallProgressPercent}%
              </p>
            </div>
          </div>
        </div>

        {/* 14-Day Selector Bar */}
        <div className="mt-8 pt-6 border-t border-stone-800/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-emerald-400" />
              Выберите день протокола (1 – 14):
            </span>
            <span className="text-xs text-emerald-400 font-medium">
              Текущий: День {activeDay} из 14
            </span>
          </div>

          <div className="grid grid-cols-7 sm:grid-cols-14 gap-1.5 sm:gap-2">
            {Array.from({ length: 14 }).map((_, idx) => {
              const dayNum = idx + 1;
              const dayData = logs[dayNum];
              const completedCount = dayData ? dayData.completedHabitIds.length : 0;
              const isDone = completedCount === PROTOCOL_HABITS.length;
              const isCurrent = activeDay === dayNum;

              return (
                <button
                  key={dayNum}
                  onClick={() => setActiveDay(dayNum)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all relative ${
                    isCurrent
                      ? "bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-950 border border-emerald-400"
                      : isDone
                      ? "bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/60"
                      : completedCount > 0
                      ? "bg-stone-900 border border-amber-500/40 text-stone-200 hover:bg-stone-800"
                      : "bg-stone-900/60 border border-stone-800 text-stone-400 hover:bg-stone-800"
                  }`}
                >
                  <span className="text-xs">{dayNum}</span>
                  <div className="mt-1 h-1.5 w-1.5 rounded-full">
                    {isDone ? (
                      <span className="block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    ) : completedCount > 0 ? (
                      <span className="block h-1.5 w-1.5 rounded-full bg-amber-400" />
                    ) : (
                      <span className="block h-1.5 w-1.5 rounded-full bg-stone-700" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Interactive Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Habits Checklist (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-900/60 p-4 rounded-2xl border border-stone-800">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                День {activeDay} из 14
              </span>
              <h2 className="text-base sm:text-lg font-bold text-stone-100 font-['Cinzel']">
                {DAYS_TITLES[activeDay - 1]}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveDay(prev => Math.max(1, prev - 1))}
                disabled={activeDay === 1}
                className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-400 hover:text-stone-200 disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setActiveDay(prev => Math.min(14, prev + 1))}
                disabled={activeDay === 14}
                className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-400 hover:text-stone-200 disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={handleResetDay}
                title="Сбросить день"
                className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-500 hover:text-red-400 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Habit Cards List */}
          <div className="space-y-3">
            {PROTOCOL_HABITS.map((habit) => {
              const isChecked = currentLog.completedHabitIds.includes(habit.id);
              const IconComp = habit.icon;

              return (
                <div
                  key={habit.id}
                  onClick={() => toggleHabit(habit.id)}
                  className={`group rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer select-none flex items-start gap-4 ${
                    isChecked
                      ? "bg-emerald-950/40 border-emerald-500/60 text-stone-200 shadow-md shadow-emerald-950/30"
                      : "bg-stone-900/70 border-stone-800 hover:border-stone-700 text-stone-300"
                  }`}
                >
                  {/* Checkbox Icon */}
                  <div className="shrink-0 mt-0.5">
                    {isChecked ? (
                      <div className="h-6 w-6 rounded-lg bg-emerald-500 flex items-center justify-center text-stone-950 shadow-md shadow-emerald-500/30">
                        <Check className="h-4 w-4 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="h-6 w-6 rounded-lg border-2 border-stone-700 group-hover:border-emerald-500/60 transition-colors flex items-center justify-center bg-stone-950" />
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        habit.category === "morning"
                          ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                          : habit.category === "day"
                          ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                          : "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                      }`}>
                        {habit.timeWindow}
                      </span>
                      <span className="text-[11px] text-stone-500 flex items-center gap-1">
                        <IconComp className="h-3 w-3" />
                      </span>
                    </div>

                    <h3 className={`text-sm sm:text-base font-bold transition-colors ${
                      isChecked ? "text-emerald-300 line-through opacity-85" : "text-stone-100"
                    }`}>
                      {habit.title}
                    </h3>

                    <p className="text-xs text-stone-400 leading-relaxed">
                      {habit.description}
                    </p>

                    <div className="pt-2 mt-2 border-t border-stone-800/60 text-[11px] text-stone-400 flex items-start gap-1.5">
                      <Info className="h-3 w-3 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong className="text-stone-300 font-medium">Физиология: </strong>{habit.scientificWhy}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Celebration Banner when Day Finished */}
          {currentDayProgressPercent === 100 && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 to-stone-900 border border-emerald-500/50 flex items-center gap-4 animate-fadeIn">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0">
                <Award className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-100 font-['Cinzel']">
                  День {activeDay} завершен на 100%!
                </h4>
                <p className="text-xs text-stone-300">
                  Ваша печень разгружена, желчные протоки свободны, а организм готов к ночному обновлению клеток. Завтра — новый шаг к богатырскому здравию!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Widgets & Daily Health Diary (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">

          {/* WIDGET 1: Interactive Diaphragmatic Breathing Timer */}
          <div className="rounded-3xl border border-stone-800 bg-stone-900/80 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Wind className="h-4 w-4" />
                Таймер «Таёжный вдох»
              </span>
              <span className="text-[11px] text-stone-400 bg-stone-950 px-2 py-0.5 rounded-md border border-stone-800">
                5 минут
              </span>
            </div>

            <p className="text-xs text-stone-400">
              Механический насос: движение диафрагмы физически сжимает печень и выжимает разжиженную желчь.
            </p>

            {/* Breathing Animation Circle */}
            <div className="py-4 flex flex-col items-center justify-center">
              <div className={`relative flex items-center justify-center rounded-full transition-all duration-1000 ${
                breathPhase === "inhale"
                  ? "h-36 w-36 bg-emerald-500/30 border-2 border-emerald-400 scale-110 shadow-xl shadow-emerald-500/20"
                  : breathPhase === "hold"
                  ? "h-36 w-36 bg-amber-500/30 border-2 border-amber-400 scale-110"
                  : breathPhase === "exhale"
                  ? "h-28 w-28 bg-teal-500/20 border-2 border-teal-400 scale-95"
                  : "h-24 w-24 bg-stone-800 border-2 border-stone-600 scale-90"
              }`}>
                <div className="text-center">
                  <p className="text-xs uppercase font-extrabold tracking-widest text-stone-200">
                    {breathPhase === "inhale" && "Вдох животом"}
                    {breathPhase === "hold" && "Задержка"}
                    {breathPhase === "exhale" && "Выдох ртом"}
                    {breathPhase === "pause" && "Пауза"}
                  </p>
                  <p className="text-2xl font-black text-stone-100 font-mono">
                    {breathCountdown}s
                  </p>
                </div>
              </div>

              {/* Total timer display */}
              <div className="mt-4 text-center">
                <span className="text-xs text-stone-400 font-mono">
                  Осталось: {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  isTimerRunning
                    ? "bg-amber-600 hover:bg-amber-500 text-stone-950"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950"
                }`}
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Приостановить
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Начать 5-минутный комплекс
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(300);
                  setBreathPhase("inhale");
                  setBreathCountdown(4);
                }}
                className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-400 hover:text-stone-200"
                title="Сброс таймера"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* WIDGET 2: Daily Health Metrics & Self-Diagnosis Diary */}
          <div className="rounded-3xl border border-stone-800 bg-stone-900/80 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <HeartPulse className="h-4 w-4" />
                Дневник самочувствия
              </span>
              <span className="text-[11px] text-stone-400">
                День {activeDay}
              </span>
            </div>

            {/* Energy Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-stone-400">Уровень энергии:</span>
                <span className="font-bold text-amber-400">{currentLog.energyScore} / 10</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={currentLog.energyScore} 
                onChange={(e) => updateLogField("energyScore", Number(e.target.value))}
                className="w-full accent-amber-500 bg-stone-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Tongue status */}
            <div className="space-y-1.5">
              <label className="text-xs text-stone-400 block">Налет на языке утром:</label>
              <select
                value={currentLog.tongueState}
                onChange={(e) => updateLogField("tongueState", e.target.value as any)}
                className="w-full text-xs rounded-xl bg-stone-950 border border-stone-800 p-2.5 text-stone-200 focus:border-emerald-500 focus:outline-none"
              >
                <option value="clean">Чистый, розовый (идеал)</option>
                <option value="light_coating">Легкий прозрачно-белый налет</option>
                <option value="thick_coating">Плотный белый налет (признак СИБР)</option>
                <option value="yellow_bitter">Желтоватый с горечью (застой желчи)</option>
              </select>
            </div>

            {/* Gut bloating status */}
            <div className="space-y-1.5">
              <label className="text-xs text-stone-400 block">Состояние кишечника:</label>
              <select
                value={currentLog.gutState}
                onChange={(e) => updateLogField("gutState", e.target.value as any)}
                className="w-full text-xs rounded-xl bg-stone-950 border border-stone-800 p-2.5 text-stone-200 focus:border-emerald-500 focus:outline-none"
              >
                <option value="comfort">Комфорт и легкость весь день</option>
                <option value="mild_bloat">Небольшое вздутие после еды</option>
                <option value="heavy_sibr">Сильное бурление и газы к вечеру</option>
              </select>
            </div>

            {/* Weight / notes */}
            <div className="space-y-1.5">
              <label className="text-xs text-stone-400 block">Утренний вес (кг, опционально):</label>
              <input
                type="text"
                placeholder="Например, 73.8"
                value={currentLog.weight || ""}
                onChange={(e) => updateLogField("weight", e.target.value)}
                className="w-full text-xs rounded-xl bg-stone-950 border border-stone-800 p-2.5 text-stone-200 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-stone-400 block">Заметки и ощущения дня:</label>
              <textarea
                rows={3}
                placeholder="Как отреагировал ЖКТ на сбор? Легче ли было проснуться утром?"
                value={currentLog.notes || ""}
                onChange={(e) => updateLogField("notes", e.target.value)}
                className="w-full text-xs rounded-xl bg-stone-950 border border-stone-800 p-2.5 text-stone-200 focus:border-emerald-500 focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* WIDGET 3: Quick Herb Brewing Reminder from files */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-xs space-y-2">
            <span className="font-bold text-emerald-400 block flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Золотое правило заваривания чаги:
            </span>
            <p className="text-stone-400 leading-relaxed">
              Никогда не заливайте чагу крутым кипятком! Оптимальная температура — <strong>60–70°C</strong> в термосе со стеклянной колбой на 6–8 часов. Так сохраняются полифенолы и хромогенный комплекс.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
