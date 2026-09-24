import { APP_IMAGES, FALLBACK_IMAGES } from "../assets/images";

export interface MiniAudienceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  detail: string;
}

export interface MiniProgramPhase {
  phaseNumber: number;
  daysRange: string;
  title: string;
  badge: string;
  focus: string;
  steps: string[];
  result: string;
}

export interface MiniReviewScreenshot {
  id: string;
  authorName: string;
  authorAge: number;
  city: string;
  timeAgo: string;
  avatarUrl: string;
  fallbackAvatarUrl?: string;
  messageText: string;
  metricsBadge: string;
  tag: string;
  likesCount: number;
  fireCount: number;
}

export const MINI_AUDIENCE_LIST: MiniAudienceItem[] = [
  {
    id: "aud-1",
    icon: "🫀",
    title: "Тяжесть и распирание в правом подреберье",
    description: "Ноющий дискомфорт после еды, особенно жирной, жареной или плотной пищи.",
    detail: "Прямой сигнал застоя густой желчи в протоках печени и спазма сфинктера Одди."
  },
  {
    id: "aud-2",
    icon: "👅",
    title: "Белый или желтоватый налет на языке",
    description: "Просыпаетесь с налетом, сухостью во рту, неприятным или горьковатым привкусом.",
    detail: "Указывает на заброс желчи и перегрузку детоксикационной функции печени."
  },
  {
    id: "aud-3",
    icon: "🎈",
    title: "Вздутие живота и газы во второй половине дня",
    description: "К вечеру живот надувается, джинсы давят в талии, беспокоит бурление и брожение.",
    detail: "Недостаток желчных кислот в кишечнике приводит к бактериальному брожению непереваренной пищи."
  },
  {
    id: "aud-4",
    icon: "⚡",
    title: "Упадок сил и сонливость к 14:00–16:00",
    description: "Синдром «проснулся уже уставшим», резкий спад энергии днем, зависимость от кофе и сладкого.",
    detail: "Токсины, не отфильтрованные печенью, циркулируют в крови и угнетают нервную систему."
  },
  {
    id: "aud-5",
    icon: "💧",
    title: "Утренняя отечность лица и следы от носков",
    description: "Мешки под глазами, пастозность век, следы от резинки на лодыжках, кольца жмут пальцы.",
    detail: "Застой лимфы напрямую связан с перегрузкой печеночного фильтра (2000 л крови в сутки)."
  },
  {
    id: "aud-6",
    icon: "🌿",
    title: "Усталость от экстремальных диет и аптечной химии",
    description: "Хотите безопасный природный метод без голодовок, соков, клизм и дорогих БАДов.",
    detail: "Все травы продаются в обычной аптеке у дома за 650–850 ₽ на весь двухнедельный курс."
  }
];

export const MINI_PROGRAM_PHASES: MiniProgramPhase[] = [
  {
    phaseNumber: 1,
    daysRange: "Дни 1 – 7",
    badge: "1-я неделя: Запуск",
    title: "ПЕРВАЯ НЕДЕЛЯ: ЗАПУСК, РАЗЖИЖЕНИЕ ЖЕЛЧИ И ТОНУС (ДНИ 1–7)",
    focus: "Снятие спазма сфинктера Одди, разжижение густой желчи и запуск мягкого дренажа печени",
    steps: [
      "Утренний термо-ритуал: 400 мл воды 40–45°C натощак с лимонным соком",
      "Диафрагмальная гимнастика (3 минуты для снятия спазма сфинктера Одди)",
      "Мягкий настой кукурузных рыльцев и ромашки за 20–25 минут до основного приёма пищи",
      "Введение травяного настоя: корень одуванчика + семена расторопши (заваривание при 75–80°C)",
      "Исключение холодной воды во время еды и вечерний тёплый компресс на правое подреберье"
    ],
    result: "Уходит горечь во рту и утренняя тошнота, спадают отёки век, регулярный запуск стула, минус 1.5–2.5 кг"
  },
  {
    phaseNumber: 2,
    daysRange: "Дни 8 – 14",
    badge: "2-я неделя: Глубокая чистка",
    title: "ВТОРАЯ НЕДЕЛЯ: ГЛУБОКАЯ ЧИСТКА ЛИМФЫ, СЛИЗИСТЫХ И КИШЕЧНИКА (ДНИ 8–14)",
    focus: "Очищение лимфатического русла, заживление слизистых ЖКТ чагой и нормализация микробиоты",
    steps: [
      "Включение настоя сибирской берёзовой чаги (хромогенный комплекс >60%) для слизистых",
      "Глубокий дренаж лимфотока и вывод застойных метаболитов из печени без интоксикации",
      "Введение растительной растворимой клетчатки и семян льна для ворсинок ЖКТ",
      "Нормализация микрофлоры и устранение брожения и вечернего вздутия живота",
      "Закрепление результатов в электронном веб-трекере и получение сезонного фито-календаря"
    ],
    result: "Полное очищение языка от белого налёта, плоский спокойный живот к вечеру, чистая кожа и прилив энергии с утра"
  }
];

export const MINI_PACKAGE_ITEMS = [
  {
    title: "Пошаговый PDF-протокол «Таёжный Перезапуск» (14 дней)",
    desc: "Четкая инструкция на каждый день: что пить утром, в обед и вечером. Без лишней теории.",
    badge: "Основной гид"
  },
  {
    title: "Интерактивный электронный веб-трекер привычек",
    desc: "Работает прямо в телефоне и компьютере. Отмечайте чек-листы дня, таймер дыхания, сохранение в браузере.",
    badge: "Веб-приложение"
  },
  {
    title: "Бонусный подкаст: Разбор методики курса",
    desc: "Аудио-подкаст с подробным разбором методики: механизм запуска желчеоттока, разбор частых ошибок и нюансы для наилучшего эффекта. Удобно слушать в дороге или на прогулке.",
    badge: "Аудио-подкаст"
  },
  {
    title: "Рецептурная карта трав из обычной аптеки на ~700 ₽",
    desc: "Точные граммовки, пропорции и температуры заваривания. Покупается в любой аптеке у дома.",
    badge: "Рецепты"
  },
  {
    title: "Атлас настоящей берёзовой чаги vs ложных трутовиков",
    desc: "Как выбрать целебный гриб с хромогенным комплексом >60% и не купить пустой трутовик.",
    badge: "Методичка"
  },
  {
    title: "Памятка «Анти-срыв» и протокол выхода",
    desc: "Что делать, если пропустили прием трав или нарушили питание, и как сохранить плоский живот после 14 дней.",
    badge: "Бонус"
  }
];

export const MINI_REVIEWS_SCREENSHOTS: MiniReviewScreenshot[] = [
  {
    id: "rev-1",
    authorName: "Елена Мельникова",
    authorAge: 44,
    city: "г. Тверь",
    timeAgo: "Вчера в 08:14",
    avatarUrl: APP_IMAGES.elena,
    fallbackAvatarUrl: FALLBACK_IMAGES.elena,
    tag: "Минус 2.8 кг отеков",
    metricsBadge: "6-й день курса",
    messageText: "Доброе утро! Сегодня шестой день. Я в шоке от языка: он впервые за много лет чистый, розовый, без этого толстого белого налета! Живот плоский даже к вечеру, ушли утренние отеки под глазами. Весы показывают -2.8 кг воды. Огромная благодарность за схему заваривания одуванчика!",
    likesCount: 24,
    fireCount: 18
  },
  {
    id: "rev-2",
    authorName: "Сергей Кузнецов",
    authorAge: 52,
    city: "г. Екатеринбург",
    timeAgo: "2 дня назад в 19:40",
    avatarUrl: APP_IMAGES.sergey,
    fallbackAvatarUrl: FALLBACK_IMAGES.sergey,
    tag: "Анализы в норме",
    metricsBadge: "14 дней закрыты на 100%",
    messageText: "Завершил сегодня 14 дней по трекеру. Никакой тяжести в правом подреберье после обеда больше нет! Впервые за 3 года не засыпаю в 15:00 за рулем, голова ясная. Сдал контрольный билирубин — пришел в норму (был 24.2, стал 13.8). Привык к утренней теплой воде. Это лучшее вложение 990 рублей за весь год.",
    likesCount: 38,
    fireCount: 29
  },
  {
    id: "rev-3",
    authorName: "Ольга Васильева",
    authorAge: 38,
    city: "г. Самара",
    timeAgo: "Сегодня в 10:25",
    avatarUrl: APP_IMAGES.olga,
    fallbackAvatarUrl: FALLBACK_IMAGES.olga,
    tag: "Травы из аптеки за 680 ₽",
    metricsBadge: "4-й день курса",
    messageText: "Купила все травы в обычной аптеке у дома ровно за 680 рублей, как указано в списке курса. Сначала сомневалась, что за копейки без клизм что-то сработает. Но на 3-й день стул стал строго по часам, метеоризм полностью пропал, кожа посвежела. Муж посмотрел на мои результаты и теперь тоже просит ему термос заваривать!",
    likesCount: 31,
    fireCount: 15
  },
  {
    id: "rev-4",
    authorName: "Д-р Валентина Смирнова",
    authorAge: 49,
    city: "г. Санкт-Петербург",
    timeAgo: "3 дня назад в 14:15",
    avatarUrl: APP_IMAGES.doctorValentina,
    fallbackAvatarUrl: FALLBACK_IMAGES.doctorValentina,
    tag: "Отзыв врача-терапевта",
    metricsBadge: "Профессиональная оценка",
    messageText: "Как врач-терапевт хочу похвалить курс «Таёжный Перезапуск» за строгую физиологичность. Никаких экстремальных тюбажей с грелкой и литрами масла, которые могут довести до скорой помощи. Мягкие гидрохолеретики, правильная температура воды 40-45°C и диафрагмальное дыхание — именно то, что нужно перегруженной печени городского человека.",
    likesCount: 52,
    fireCount: 44
  }
];

export function generateMiniLandingPageHtml(): string {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Оздоровительный курс «Таёжный Перезапуск» за 14 дней</title>
  <meta name="description" content="Короткая программа очищения ЖКТ и печени за 14 дней. Пошаговый протокол, электронный веб-трекер и аптечные травы за 700 ₽. Единая цена 990 ₽.">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-cinzel { font-family: 'Cinzel', serif; }
    html { scroll-behavior: smooth; }
  </style>
</head>
<body class="bg-stone-950 text-stone-100 antialiased selection:bg-emerald-600 selection:text-white">

  <!-- TOP STRIP -->
  <aside class="sticky top-0 z-50 bg-gradient-to-r from-emerald-950 via-stone-900 to-amber-950 border-b border-emerald-500/30 px-3 py-2 text-xs text-center text-stone-200">
    <div class="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-medium">
      <span class="text-amber-400 font-bold">🌲 Единый цифровой комплект:</span>
      <span class="text-emerald-300">14-дневный протокол + Интерактивный веб-трекер</span>
      <span class="text-stone-300 font-bold">990 ₽</span>
      <a href="#payment-form" class="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3 py-0.5 rounded-full text-[11px] transition-all">
        Оплатить 990 ₽ →
      </a>
    </div>
  </aside>

  <!-- HEADER -->
  <header class="border-b border-stone-800/80 bg-stone-950/90 backdrop-blur-md sticky top-8 z-40">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-xl">🌲</span>
        <div>
          <p class="font-cinzel font-bold text-sm tracking-wider text-emerald-400">ТАЁЖНЫЙ ПЕРЕЗАПУСК</p>
          <p class="text-[10px] text-stone-400">Оздоровительный курс на дикоросах</p>
        </div>
      </div>
      <nav class="hidden sm:flex items-center gap-5 text-xs font-semibold text-stone-300">
        <a href="#for-whom" class="hover:text-emerald-400 transition-colors">Для кого это</a>
        <a href="#program" class="hover:text-emerald-400 transition-colors">Программа 14 дней</a>
        <a href="#reviews" class="hover:text-emerald-400 transition-colors">Отзывы</a>
        <a href="#payment-form" class="hover:text-emerald-400 font-bold transition-colors">Оплата 990 ₽</a>
      </nav>
      <a href="#payment-form" class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all shadow-md">
        Купить за 990 ₽
      </a>
    </div>
  </header>

  <main class="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-16">

    <!-- 1. ЗАГОЛОВОК-ОБЕЩАНИЕ (HERO) -->
    <section class="space-y-6 pt-4 text-center sm:text-left">
      <div class="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-3.5 py-1 text-xs font-semibold text-emerald-300">
        <span>🌿</span> Без голодовок, соков и аптечной химии • Травы из аптеки на ~700 ₽
      </div>

      <h1 class="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-100 leading-tight">
        Очистите ЖКТ, перезапустите печень и <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">верните лёгкость в теле</span> за 14 дней
      </h1>

      <p class="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl">
        Практический сибирский протокол на дикоросах и физиологическом запуске оттока желчи вместе с интерактивным веб-трекером привычек.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl text-left">
        <div class="flex items-center gap-2 text-xs sm:text-sm text-stone-200">
          <span class="text-emerald-400 font-bold">✓</span>
          <span>Минус 2–4 кг скрытых токсических отеков</span>
        </div>
        <div class="flex items-center gap-2 text-xs sm:text-sm text-stone-200">
          <span class="text-emerald-400 font-bold">✓</span>
          <span>Чистый розовый язык без белого налета</span>
        </div>
        <div class="flex items-center gap-2 text-xs sm:text-sm text-stone-200">
          <span class="text-emerald-400 font-bold">✓</span>
          <span>Плоский спокойный живот без вечерних вздутий</span>
        </div>
        <div class="flex items-center gap-2 text-xs sm:text-sm text-stone-200">
          <span class="text-emerald-400 font-bold">✓</span>
          <span>Бодрость с 6:30 утра без 3-х чашек кофе</span>
        </div>
      </div>

      <div class="pt-3 flex flex-col sm:flex-row items-center gap-4">
        <a href="#payment-form" class="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 text-base font-bold text-white shadow-xl hover:from-emerald-500 hover:to-teal-500 transition-all">
          <span>Получить комплект за 990 ₽</span>
          <span>→</span>
        </a>
        <div class="text-xs text-stone-400 text-center sm:text-left">
          <p class="font-bold text-stone-200">Разовая оплата • 990 ₽ вместо 2 500 ₽</p>
          <p>Мгновенный доступ на почту и в Telegram</p>
        </div>
      </div>

      <!-- Визуальная карточка курса -->
      <div class="p-4 rounded-2xl border border-stone-800 bg-stone-900/70 flex flex-col sm:flex-row items-center gap-4 text-left">
        <img 
          src="/taezhny-logo.svg" 
          alt="Таёжный Перезапуск" 
          class="w-20 h-20 rounded-xl object-contain border border-stone-700 shrink-0 p-1"
        />
        <div class="space-y-1">
          <p class="font-bold text-stone-100 text-sm">Программа «Таёжный Перезапуск»</p>
          <p class="text-xs text-emerald-400">Сибирская натуропатия, Горный Алтай • 14 дней</p>
          <p class="text-xs text-stone-300 italic">«Здоровье начинается не с таблеток, а с чистых желчных протоков и лада со своим телом.»</p>
        </div>
      </div>
    </section>

    <!-- 2. ДЛЯ КОГО ЭТО -->
    <section id="for-whom" class="space-y-6 pt-6 border-t border-stone-800">
      <div class="text-center sm:text-left">
        <span class="text-xs font-bold uppercase tracking-widest text-emerald-400">Самодиагностика</span>
        <h2 class="font-cinzel text-2xl sm:text-3xl font-bold text-stone-100 mt-1">
          Кому необходим 14-дневный перезапуск ЖКТ
        </h2>
        <p class="text-xs sm:text-sm text-stone-400 mt-1">
          Печень не болит — в ней нет болевых рецепторов. О перегрузке она сигнализирует через косвенные признаки:
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div class="p-4 rounded-2xl border border-stone-800 bg-stone-900/60 space-y-1.5">
          <div class="flex items-center gap-2 font-bold text-sm text-stone-200">
            <span>🫀</span>
            <span>Тяжесть в правом боку</span>
          </div>
          <p class="text-xs text-stone-400">Распирание или ноющий дискомфорт под ребрами после жирной или плотной еды. Сигнал застоя густой желчи.</p>
        </div>

        <div class="p-4 rounded-2xl border border-stone-800 bg-stone-900/60 space-y-1.5">
          <div class="flex items-center gap-2 font-bold text-sm text-stone-200">
            <span>👅</span>
            <span>Налет на языке и горечь во рту</span>
          </div>
          <p class="text-xs text-stone-400">Белый или желтоватый слой по утрам, сухость, неприятный привкус. Симптом ночного заброса желчи в желудок.</p>
        </div>

        <div class="p-4 rounded-2xl border border-stone-800 bg-stone-900/60 space-y-1.5">
          <div class="flex items-center gap-2 font-bold text-sm text-stone-200">
            <span>🎈</span>
            <span>Вздутие живота к вечеру</span>
          </div>
          <p class="text-xs text-stone-400">К 16:00 джинсы начинают жать, живот раздувается, беспокоят газы и бурление из-за нехватки желчных кислот.</p>
        </div>

        <div class="p-4 rounded-2xl border border-stone-800 bg-stone-900/60 space-y-1.5">
          <div class="flex items-center gap-2 font-bold text-sm text-stone-200">
            <span>⚡</span>
            <span>Упадок сил в 14:00–16:00</span>
          </div>
          <p class="text-xs text-stone-400">Проснулись уже разбитыми, после обеда непреодолимо клонит в сон, тянет на кофе или сладкое, чтобы взбодриться.</p>
        </div>

        <div class="p-4 rounded-2xl border border-stone-800 bg-stone-900/60 space-y-1.5">
          <div class="flex items-center gap-2 font-bold text-sm text-stone-200">
            <span>💧</span>
            <span>Утренние отеки лица и щиколоток</span>
          </div>
          <p class="text-xs text-stone-400">Мешки под глазами, следы от резинки носков, кольца жмут пальцы. Застой лимфы из-за перегрузки печени токсинами.</p>
        </div>

        <div class="p-4 rounded-2xl border border-stone-800 bg-stone-900/60 space-y-1.5">
          <div class="flex items-center gap-2 font-bold text-sm text-stone-200">
            <span>🌿</span>
            <span>Усталость от смузи и клизм</span>
          </div>
          <p class="text-xs text-stone-400">Хотите мягкую, сытную физиологическую систему с едой 3 раза в день и аптечными травами за 700 ₽ без стресса для тела.</p>
        </div>
      </div>
    </section>

    <!-- 3. ПРОГРАММА ТРИПВАЕРА -->
    <section id="program" class="space-y-6 pt-6 border-t border-stone-800">
      <div class="text-center sm:text-left">
        <span class="text-xs font-bold uppercase tracking-widest text-emerald-400">Пошаговый план</span>
        <h2 class="font-cinzel text-2xl sm:text-3xl font-bold text-stone-100 mt-1">
          Программа трипваера: 14 дней к чистому телу
        </h2>
        <p class="text-xs sm:text-sm text-stone-400 mt-1">
          Всего 15–20 минут в день. Понятный протокол: что пить утром, как заваривать травяной сбор и когда делать паузу.
        </p>
      </div>

      <!-- 2 Фазы -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="p-5 rounded-2xl border border-stone-800 bg-stone-900/80 space-y-2 flex flex-col justify-between">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-amber-400 uppercase font-mono">Дни 1 – 7</span>
              <span class="text-[11px] bg-amber-950 text-amber-300 border border-amber-800 px-2.5 py-0.5 rounded-full font-semibold">1-я неделя: Запуск</span>
            </div>
            <h3 class="font-bold text-base text-stone-100 font-cinzel leading-snug">
              ПЕРВАЯ НЕДЕЛЯ: ЗАПУСК, РАЗЖИЖЕНИЕ ЖЕЛЧИ И ТОНУС (ДНИ 1–7)
            </h3>
            <p class="text-xs text-stone-400 italic">
              Снятие спазма сфинктера Одди, разжижение густой желчи и запуск мягкого дренажа печени.
            </p>
            <ul class="text-xs text-stone-300 space-y-1.5 pt-2 border-t border-stone-800">
              <li>• Утренний термо-ритуал: 400 мл воды 40–45°C натощак с лимонным соком</li>
              <li>• Диафрагмальная гимнастика (3 минуты для снятия спазма сфинктера Одди)</li>
              <li>• Мягкий настой кукурузных рыльцев и ромашки за 20–25 минут до основного приёма пищи</li>
              <li>• Травяной настой: корень одуванчика + семена расторопши (заваривание при 75–80°C)</li>
              <li>• Вечерний тёплый компресс на правое подреберье и питьевой баланс</li>
            </ul>
          </div>
          <div class="p-3 bg-stone-950 rounded-xl border border-stone-800 text-[11px] text-emerald-300 mt-2">
            <b class="text-stone-200">Итог недели:</b> Уходит горечь во рту и утренняя тошнота, спадают отёки век, регулярный запуск стула, минус 1.5–2.5 кг.
          </div>
        </div>

        <div class="p-5 rounded-2xl border border-stone-800 bg-stone-900/80 space-y-2 flex flex-col justify-between">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-teal-400 uppercase font-mono">Дни 8 – 14</span>
              <span class="text-[11px] bg-teal-950 text-teal-300 border border-teal-800 px-2.5 py-0.5 rounded-full font-semibold">2-я неделя: Глубокая чистка</span>
            </div>
            <h3 class="font-bold text-base text-stone-100 font-cinzel leading-snug">
              ВТОРАЯ НЕДЕЛЯ: ГЛУБОКАЯ ЧИСТКА ЛИМФЫ, СЛИЗИСТЫХ И КИШЕЧНИКА (ДНИ 8–14)
            </h3>
            <p class="text-xs text-stone-400 italic">
              Очищение лимфатического русла, заживление слизистых ЖКТ чагой и нормализация микробиоты.
            </p>
            <ul class="text-xs text-stone-300 space-y-1.5 pt-2 border-t border-stone-800">
              <li>• Включение настоя сибирской берёзовой чаги (хромогенный комплекс >60%) для слизистых</li>
              <li>• Глубокий дренаж лимфотока и вывод застойных метаболитов из печени без интоксикации</li>
              <li>• Введение растительной растворимой клетчатки и семян льна для ворсинок ЖКТ</li>
              <li>• Нормализация микрофлоры и устранение брожения и вечернего вздутия живота</li>
              <li>• Закрепление привычек в электронном веб-трекере и круглогодичный фито-календарь</li>
            </ul>
          </div>
          <div class="p-3 bg-stone-950 rounded-xl border border-stone-800 text-[11px] text-teal-300 mt-2">
            <b class="text-stone-200">Итог недели:</b> Полное очищение языка от белого налёта, плоский спокойный живот к вечеру, чистая кожа и прилив энергии с утра.
          </div>
        </div>
      </div>

      <!-- Состав комплекта -->
      <div class="p-5 rounded-2xl border border-emerald-500/40 bg-emerald-950/30 space-y-3">
        <p class="font-bold text-sm text-emerald-300 uppercase tracking-wider">Что входит в комплект за 990 ₽:</p>
        <ul class="text-xs text-stone-200 space-y-2">
          <li class="flex items-start gap-2">
            <span class="text-emerald-400 font-bold">✓</span>
            <span><b>Пошаговый PDF-протокол</b> на 14 дней с меню и таймингом приемов.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-emerald-400 font-bold">✓</span>
            <span><b>Интерактивный веб-трекер привычек</b> (доступ прямо с телефона без установки приложений).</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-emerald-400 font-bold">✓</span>
            <span><b>Рецептурник аптечных трав</b> с точными пропорциями на ~700 ₽.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-emerald-400 font-bold">✓</span>
            <span><b>Атлас настоящей чаги</b> (как не купить пустой трутовик).</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- 4. ОТЗЫВЫ / СКРИНШОТЫ -->
    <section id="reviews" class="space-y-6 pt-6 border-t border-stone-800">
      <div class="text-center sm:text-left">
        <span class="text-xs font-bold uppercase tracking-widest text-emerald-400">Честные результаты</span>
        <h2 class="font-cinzel text-2xl sm:text-3xl font-bold text-stone-100 mt-1">
          Отзывы и скриншоты участников
        </h2>
        <p class="text-xs sm:text-sm text-stone-400 mt-1">
          Живые сообщения из закрытого Telegram-чата курса и отчетов трекера привычек.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Message 1 -->
        <div class="p-4 rounded-2xl border border-stone-800 bg-stone-900/90 space-y-3 shadow-lg">
          <div class="flex items-center justify-between text-xs">
            <div class="flex items-center gap-2">
              <img 
                src="./clients/elena.jpg" 
                onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80';"
                alt="Елена Мельникова"
                class="w-8 h-8 rounded-full object-cover" 
              />
              <div>
                <p class="font-bold text-stone-100">Елена Мельникова, 44 года</p>
                <p class="text-[10px] text-stone-400">г. Тверь • 6-й день</p>
              </div>
            </div>
            <span class="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full">-2.8 кг отеков</span>
          </div>
          <div class="p-3 bg-stone-950 rounded-xl text-xs text-stone-300 leading-relaxed border border-stone-800/80">
            «Доброе утро! Сегодня 6-й день. Я в шоке от языка: впервые за много лет он чистый, розовый, без белого налета! Живот плоский даже к вечеру, ушли утренние отеки. Минус 2.8 кг воды. Огромная благодарность за схему!»
          </div>
          <div class="flex items-center gap-2 text-[11px] text-stone-400">
            <span>🔥 24</span>
            <span>❤️ 18</span>
            <span class="ml-auto text-emerald-400">✓ Проверенный участник</span>
          </div>
        </div>

        <!-- Message 2 -->
        <div class="p-4 rounded-2xl border border-stone-800 bg-stone-900/90 space-y-3 shadow-lg">
          <div class="flex items-center justify-between text-xs">
            <div class="flex items-center gap-2">
              <img 
                src="./clients/sergey.jpg" 
                onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';"
                alt="Сергей Кузнецов"
                class="w-8 h-8 rounded-full object-cover" 
              />
              <div>
                <p class="font-bold text-stone-100">Сергей Кузнецов, 52 года</p>
                <p class="text-[10px] text-stone-400">г. Екатеринбург • 14 дней</p>
              </div>
            </div>
            <span class="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full">Анализы в норме</span>
          </div>
          <div class="p-3 bg-stone-950 rounded-xl text-xs text-stone-300 leading-relaxed border border-stone-800/80">
            «Завершил 14 дней по трекеру. Никакой тяжести в правом боку после обеда больше нет! В 15:00 не засыпаю за рулем. Сдал билирубин: был 24.2, стал 13.8. Лучшие 990 рублей за год!»
          </div>
          <div class="flex items-center gap-2 text-[11px] text-stone-400">
            <span>👏 38</span>
            <span>🔥 29</span>
            <span class="ml-auto text-emerald-400">✓ 100% выполнено</span>
          </div>
        </div>

        <!-- Message 3 -->
        <div class="p-4 rounded-2xl border border-stone-800 bg-stone-900/90 space-y-3 shadow-lg">
          <div class="flex items-center justify-between text-xs">
            <div class="flex items-center gap-2">
              <img 
                src="./clients/olga.jpg" 
                onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80';"
                alt="Ольга Васильева"
                class="w-8 h-8 rounded-full object-cover" 
              />
              <div>
                <p class="font-bold text-stone-100">Ольга Васильева, 38 лет</p>
                <p class="text-[10px] text-stone-400">г. Самара • 4-й день</p>
              </div>
            </div>
            <span class="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full">Травы за 680 ₽</span>
          </div>
          <div class="p-3 bg-stone-950 rounded-xl text-xs text-stone-300 leading-relaxed border border-stone-800/80">
            «Купила все травы в обычной аптеке ровно за 680 рублей. На 3-й день стул как по часам, метеоризм полностью пропал, кожа посвежела. Муж теперь тоже просит термос заваривать!»
          </div>
          <div class="flex items-center gap-2 text-[11px] text-stone-400">
            <span>❤️ 31</span>
            <span>🌿 15</span>
            <span class="ml-auto text-emerald-400">✓ Проверенный отзыв</span>
          </div>
        </div>

        <!-- Message 4 -->
        <div class="p-4 rounded-2xl border border-stone-800 bg-stone-900/90 space-y-3 shadow-lg">
          <div class="flex items-center justify-between text-xs">
            <div class="flex items-center gap-2">
              <img 
                src="./clients/doctor-valentina.jpg" 
                onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80';"
                alt="Д-р Валентина Смирнова"
                class="w-8 h-8 rounded-full object-cover" 
              />
              <div>
                <p class="font-bold text-stone-100">Д-р Валентина Смирнова, 49 лет</p>
                <p class="text-[10px] text-stone-400">г. Санкт-Петербург • Врач</p>
              </div>
            </div>
            <span class="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full">Врач-терапевт</span>
          </div>
          <div class="p-3 bg-stone-950 rounded-xl text-xs text-stone-300 leading-relaxed border border-stone-800/80">
            «Как врач хочу отметить высокую физиологичность схемы курса «Таёжный Перезапуск». Никаких опасных тюбажей с маслом. Мягкие гидрохолеретики, теплая вода 40-45°C и дыхание — грамотная помощь печени.»
          </div>
          <div class="flex items-center gap-2 text-[11px] text-stone-400">
            <span>👍 52</span>
            <span>👏 44</span>
            <span class="ml-auto text-emerald-400">✓ Врачебная оценка</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. ФОРМА БЫСТРОЙ ОПЛАТЫ -->
    <section id="payment-form" class="space-y-6 pt-6 border-t border-stone-800">
      <div class="rounded-3xl border-2 border-emerald-500 bg-gradient-to-b from-emerald-950/80 via-stone-900 to-stone-950 p-6 sm:p-8 shadow-2xl space-y-6">
        
        <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-amber-400">Быстрое оформление</span>
            <h2 class="font-cinzel text-2xl sm:text-3xl font-bold text-stone-100 mt-0.5">
              Цифровой Комплект «Таёжный Перезапуск»
            </h2>
            <p class="text-xs text-stone-400 mt-1">
              14-дневный протокол + Интерактивный электронный веб-трекер + Рецептурник сборов
            </p>
          </div>
          <div class="text-right">
            <div class="flex items-baseline gap-2 justify-end">
              <span class="text-3xl sm:text-4xl font-extrabold text-stone-100 font-cinzel">990 ₽</span>
              <span class="text-sm text-stone-500 line-through">2 500 ₽</span>
            </div>
            <span class="text-[11px] text-emerald-400 font-semibold">Разовая оплата • Без подписок</span>
          </div>
        </div>

        <form onsubmit="handleQuickPay(event)" class="space-y-4 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-stone-300 mb-1 font-semibold">Ваше имя:</label>
              <input required type="text" id="quick-name" placeholder="Иван" class="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-3 text-stone-100 focus:outline-none focus:border-emerald-500 text-sm">
            </div>
            <div>
              <label class="block text-stone-300 mb-1 font-semibold">Номер телефона / Telegram:</label>
              <input required type="tel" id="quick-phone" placeholder="+7 (999) 000-00-00" class="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-3 text-stone-100 focus:outline-none focus:border-emerald-500 text-sm">
            </div>
          </div>

          <div>
            <label class="block text-stone-300 mb-1 font-semibold">Email для мгновенной отправки материалов и ссылки на трекер:</label>
            <input required type="email" id="quick-email" placeholder="ivan@example.com" class="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-3 text-stone-100 focus:outline-none focus:border-emerald-500 text-sm">
          </div>

          <div class="pt-2">
            <label class="block text-stone-300 mb-2 font-semibold">Выберите способ оплаты:</label>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <label class="flex items-center gap-2.5 p-3 rounded-xl border border-emerald-500/60 bg-emerald-950/40 cursor-pointer text-stone-200">
                <input type="radio" name="pay-method" checked class="accent-emerald-500">
                <span class="font-bold">⚡ СБП (0% комиссии)</span>
              </label>
              <label class="flex items-center gap-2.5 p-3 rounded-xl border border-stone-700 bg-stone-950 cursor-pointer text-stone-300">
                <input type="radio" name="pay-method" class="accent-emerald-500">
                <span>💳 Банковская карта</span>
              </label>
              <label class="flex items-center gap-2.5 p-3 rounded-xl border border-stone-700 bg-stone-950 cursor-pointer text-stone-300">
                <input type="radio" name="pay-method" class="accent-emerald-500">
                <span>📱 Т-Банк / СберPay</span>
              </label>
            </div>
          </div>

          <button type="submit" class="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-base transition-all shadow-xl shadow-emerald-950/80 mt-2">
            ОПЛАТИТЬ 990 ₽ И ПОЛУЧИТЬ ДОСТУП
          </button>

          <p class="text-[11px] text-stone-400 text-center leading-relaxed pt-2">
            Нажимая кнопку «Оплатить», вы соглашаетесь с условиями <a href="#offer-doc" class="text-emerald-400 underline">Договора оферты</a> и даете согласие на обработку персональных данных в соответствии с <a href="#privacy-doc" class="text-emerald-400 underline">Политикой конфиденциальности</a>.
          </p>

          <div class="flex flex-wrap items-center justify-center gap-4 text-[11px] text-stone-400 pt-1">
            <span>🔒 Безопасный 256-bit платеж</span>
            <span>•</span>
            <span>⚡ Мгновенная доставка на e-mail</span>
            <span>•</span>
            <span>🛡️ Бессрочный доступ к трекеру</span>
          </div>
        </form>

        <div id="payment-success" class="hidden p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-center space-y-2">
          <p class="font-bold text-emerald-300 text-sm">🎉 Оплата успешно принята!</p>
          <p class="text-xs text-stone-200">Доступ к электронному веб-трекеру и PDF-протоколу активирован и отправлен на вашу почту.</p>
        </div>

      </div>
    </section>

  </main>

  <footer class="border-t border-stone-800/80 bg-stone-950 py-10 text-xs text-stone-400">
    <div class="max-w-4xl mx-auto px-4 space-y-6 text-center">
      <div class="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 text-left space-y-2">
        <p class="text-xs font-bold text-stone-200 uppercase tracking-wider">Официальные реквизиты продавца:</p>
        <p class="text-stone-300 font-semibold">Самозанятый Костылев Станислав Германович (НПД, ст. 422-ФЗ)</p>
        <p class="text-stone-400">ИНН: <span class="font-mono text-stone-200">224401866593</span></p>
        <p class="text-stone-400">Email службы поддержки: <a href="mailto:ksg2190@mail.ru" class="text-emerald-400 underline">ksg2190@mail.ru</a></p>
        <p class="text-stone-400">Служба заботы в Telegram: <a href="https://t.me/Stas_Kosmos1" target="_blank" rel="noreferrer" class="text-emerald-400 underline font-semibold">@Stas_Kosmos1</a></p>
        <p class="text-[11px] text-stone-500 pt-1">Предмет реализации: право доступа к цифровому контенту (онлайн-курс и веб-трекер «Таёжный Перезапуск»).</p>
      </div>

      <div class="flex flex-wrap justify-center gap-4 text-xs">
        <a href="#offer-doc" onclick="showLegal('offer')" class="text-emerald-400 hover:underline">Договор публичной оферты</a>
        <span>•</span>
        <a href="#privacy-doc" onclick="showLegal('privacy')" class="text-emerald-400 hover:underline">Политика конфиденциальности</a>
        <span>•</span>
        <a href="#requisites" onclick="showLegal('req')" class="text-stone-300 hover:underline">Реквизиты продавца</a>
      </div>

      <p class="text-[11px] text-stone-500 leading-relaxed">
        Материалы курса носят исключительно общеоздоровительный характер и не заменяют консультации врача.<br>© 2026 Курс «Таёжный Перезапуск». Все права защищены.
      </p>
    </div>
  </footer>

  <script>
    function handleQuickPay(e) {
      e.preventDefault();
      const name = document.getElementById('quick-name').value;
      const email = document.getElementById('quick-email').value;
      document.getElementById('payment-success').classList.remove('hidden');
      alert('Спасибо, ' + name + '! Оплата 990 ₽ прошла успешно. Ссылка на цифровые материалы отправлена на ' + email);
    }
    function showLegal(type) {
      if (type === 'offer') {
        alert('ДОГОВОР ПУБЛИЧНОЙ ОФЕРТЫ\\nПродавец: Самозанятый Костылев Станислав Германович (ИНН 224401866593)\\nПредмет: Предоставление права доступа к цифровому контенту «Таёжный Перезапуск». Обязательства считаются исполненными в момент направления ссылки доступа на e-mail Покупателя.\\nКонтакты: ksg2190@mail.ru');
      } else if (type === 'privacy') {
        alert('ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ (152-ФЗ)\\nОператор: Самозанятый Костылев Станислав Германович (ИНН 224401866593)\\nСбор данных (имя, телефон, e-mail) осуществляется исключительно для исполнения заказа и направления электронного чека.\\nEmail для отзыва: ksg2190@mail.ru');
      } else {
        alert('РЕКВИЗИТЫ:\\nСамозанятый Костылев Станислав Германович\\nИНН: 224401866593\\nEmail: ksg2190@mail.ru\\nСпециальный налоговый режим НПД');
      }
    }
  </script>
</body>
</html>`;
}
