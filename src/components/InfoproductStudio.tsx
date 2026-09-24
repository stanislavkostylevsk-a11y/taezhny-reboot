import React, { useState } from "react";
import { INFOPRODUCT_CONCEPTS } from "../data/zhdanData";
import { InfoproductConcept } from "../types";
import { BookOpen, Sparkles, Check, Copy, TrendingUp, Calculator, ShieldCheck, Gift, ArrowRight, DollarSign, Zap } from "lucide-react";
import confetti from "canvas-confetti";

export const InfoproductStudio: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<InfoproductConcept>(INFOPRODUCT_CONCEPTS[0]);
  const [copiedPitch, setCopiedPitch] = useState(false);

  // Revenue Calculator state
  const [monthlyReelsViews, setMonthlyReelsViews] = useState(250000);
  const [directConversionRate, setDirectConversionRate] = useState(3.5); // % who DM trigger word
  const [tripwireConversionRate, setTripwireConversionRate] = useState(6.0); // % who buy tripwire
  const [upsellConversionRate, setUpsellConversionRate] = useState(18.0); // % who upgrade to main offer

  // Math
  const totalLeads = Math.round((monthlyReelsViews * directConversionRate) / 100);
  const tripwireSalesCount = Math.round((totalLeads * tripwireConversionRate) / 100);
  const tripwireRevenue = tripwireSalesCount * selectedProduct.tripwirePrice;
  const upsellSalesCount = Math.round((tripwireSalesCount * upsellConversionRate) / 100);
  const upsellRevenue = upsellSalesCount * selectedProduct.mainOfferPrice;
  const totalMonthlyRevenue = tripwireRevenue + upsellRevenue;

  const handleCopySalesLetter = () => {
    const text = `🔥 ${selectedProduct.title}\n\n${selectedProduct.subtitle}\n\n📌 ДЛЯ КОГО:\n${selectedProduct.targetAudience}\n\n⚠️ БОЛЬ И ПРОБЛЕМА:\n${selectedProduct.coreProblem}\n\n🌿 РЕШЕНИЕ:\n${selectedProduct.solution}\n\n📦 ЧТО ВНУТРИ ПРОГРАММЫ:\n${selectedProduct.modules.map((m, i) => `${i + 1}. ${m.title}\n${m.lessons.map((l) => `   - ${l}`).join("\n")}`).join("\n\n")}\n\n🎁 БОНУСЫ:\n${selectedProduct.bonuses.join("\n")}\n\n💰 СТОИМОСТЬ:\nТрипваер (быстрый старт): ${selectedProduct.tripwirePrice} ₽\nОсновной пакет: ${selectedProduct.mainOfferPrice} ₽`;
    navigator.clipboard.writeText(text);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="rounded-2xl border border-stone-800 bg-gradient-to-r from-stone-900 via-stone-950 to-emerald-950/50 p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-300 border border-amber-500/30">
            Экосистема Монетизации
          </span>
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300 border border-emerald-500/30">
            4 Готовых Инфопродукта
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-stone-100 font-['Cinzel']">
          Студия Инфопродуктов и Воронки Продаж Ждана
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
          Готовые упакованные концепции мини-курсов, трипваеров и гайдов с пошаговой программой уроков, лид-магнитами, ценообразованием и расчетом окупаемости.
        </p>
      </div>

      {/* Product Selection Tabs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {INFOPRODUCT_CONCEPTS.map((prod) => (
          <button
            key={prod.id}
            onClick={() => setSelectedProduct(prod)}
            className={`rounded-2xl p-4 text-left transition-all border flex flex-col justify-between ${
              selectedProduct.id === prod.id
                ? "bg-emerald-950/80 border-emerald-500 text-emerald-100 shadow-lg shadow-emerald-950"
                : "bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200"
            }`}
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                {prod.tag}
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-stone-100 line-clamp-2 leading-snug">
                {prod.title}
              </h3>
            </div>
            <div className="mt-4 pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-400">Трипваер:</span>
              <span className="font-bold text-emerald-400">{prod.tripwirePrice} ₽</span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Product Blueprint Dossier */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Product Blueprint */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Card */}
          <div className="rounded-2xl border border-stone-800 bg-stone-950 p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {selectedProduct.tag}
                </span>
                <h3 className="text-lg font-bold text-stone-100 mt-0.5">{selectedProduct.title}</h3>
                <p className="text-xs text-stone-300 mt-1 italic">{selectedProduct.subtitle}</p>
              </div>
              <button
                id="copy-sales-letter-btn"
                onClick={handleCopySalesLetter}
                className="inline-flex items-center gap-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 px-3 py-2 text-xs font-semibold text-stone-200 transition-colors shrink-0"
              >
                {copiedPitch ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copiedPitch ? "Скопировано!" : "Копировать оффер"}
              </button>
            </div>

            {/* Target & Problem */}
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-3.5 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Целевая аудитория:</span>
                <p className="text-stone-300 leading-relaxed">{selectedProduct.targetAudience}</p>
              </div>
              <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-3.5 space-y-1">
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Главная боль клиента:</span>
                <p className="text-stone-300 leading-relaxed">{selectedProduct.coreProblem}</p>
              </div>
            </div>

            {/* Pricing Model */}
            <div className="rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 to-stone-900 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                  Двухуровневая модель монетизации
                </span>
                <p className="text-xs text-stone-300 mt-0.5">
                  Формат: {selectedProduct.format}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-stone-950/80 px-3 py-1.5 border border-stone-700 text-center">
                  <span className="text-[10px] text-stone-400 block">Трипваер</span>
                  <span className="text-sm font-bold text-emerald-400">{selectedProduct.tripwirePrice} ₽</span>
                </div>
                <div className="rounded-lg bg-stone-950/80 px-3 py-1.5 border border-stone-700 text-center">
                  <span className="text-[10px] text-stone-400 block">Основной курс</span>
                  <span className="text-sm font-bold text-amber-400">{selectedProduct.mainOfferPrice} ₽</span>
                </div>
              </div>
            </div>

            {/* Free Lead Magnet */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <Gift className="h-4 w-4" />
                <span>Бесплатный лид-магнит для входа в воронку:</span>
              </div>
              <h4 className="text-xs sm:text-sm font-semibold text-stone-100">{selectedProduct.leadMagnet.title}</h4>
              <p className="text-xs text-stone-300">{selectedProduct.leadMagnet.hook}</p>
              <span className="inline-block text-[10px] font-mono text-emerald-400 bg-stone-950 px-2 py-0.5 rounded border border-emerald-500/20">
                Формат: {selectedProduct.leadMagnet.format}
              </span>
            </div>

            {/* Modules Breakdown */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-300 block">
                Программа курса по модулям:
              </span>
              <div className="space-y-2.5">
                {selectedProduct.modules.map((m, idx) => (
                  <div key={idx} className="rounded-xl border border-stone-800 bg-stone-900/60 p-3.5 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-200">{m.title}</span>
                    </div>
                    <ul className="space-y-1 text-stone-400">
                      {m.lessons.map((lesson, lIdx) => (
                        <li key={lIdx} className="flex items-start gap-1.5">
                          <span className="text-emerald-400">•</span>
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-[11px] text-amber-300 font-medium pt-1 border-t border-stone-800/60">
                      ✨ Результат модуля: {m.outcome}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bonuses */}
            <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4 space-y-2 text-xs">
              <span className="font-bold text-stone-300 uppercase tracking-wider block">
                Включенные бонусы для закрытия возражений:
              </span>
              <ul className="space-y-1.5 text-stone-300">
                {selectedProduct.bonuses.map((bonus, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span>{bonus}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Funnel & Revenue Simulator */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-stone-800 bg-stone-950 p-6 space-y-5 shadow-xl">
            <div className="flex items-center gap-2 text-stone-100 font-bold text-base border-b border-stone-800 pb-3">
              <Calculator className="h-5 w-5 text-amber-400" />
              <span>Калькулятор Окупаемости и Выручки</span>
            </div>

            {/* Sliders */}
            <div className="space-y-4 text-xs">
              {/* Monthly Reels views */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-400">Просмотров Reels в месяц:</span>
                  <span className="font-bold text-stone-100">{monthlyReelsViews.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="1000000"
                  step="25000"
                  value={monthlyReelsViews}
                  onChange={(e) => setMonthlyReelsViews(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-stone-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* DM Trigger conversion */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-400">Конверсия в запрос лид-магнита (Direct):</span>
                  <span className="font-bold text-emerald-400">{directConversionRate}% ({totalLeads.toLocaleString()} чел.)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={directConversionRate}
                  onChange={(e) => setDirectConversionRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-stone-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Tripwire conversion */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-400">Конверсия в покупку трипваера ({selectedProduct.tripwirePrice} ₽):</span>
                  <span className="font-bold text-amber-400">{tripwireConversionRate}% ({tripwireSalesCount} продаж)</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="15"
                  step="0.5"
                  value={tripwireConversionRate}
                  onChange={(e) => setTripwireConversionRate(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-stone-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Upsell conversion */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-400">Апселл в основной курс ({selectedProduct.mainOfferPrice} ₽):</span>
                  <span className="font-bold text-emerald-300">{upsellConversionRate}% ({upsellSalesCount} продаж)</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={upsellConversionRate}
                  onChange={(e) => setUpsellConversionRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-stone-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Total Forecast Box */}
            <div className="rounded-2xl border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-950/80 via-stone-900 to-stone-950 p-5 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block">
                Прогноз ежемесячной выручки:
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono flex items-baseline gap-2">
                <span>{totalMonthlyRevenue.toLocaleString()} ₽</span>
                <span className="text-xs font-normal text-stone-400">
                  (~${Math.round(totalMonthlyRevenue / 90).toLocaleString()})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-900/60 text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px]">Трипваер:</span>
                  <span className="font-bold text-stone-200">{tripwireRevenue.toLocaleString()} ₽</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Апселл:</span>
                  <span className="font-bold text-stone-200">{upsellRevenue.toLocaleString()} ₽</span>
                </div>
              </div>
            </div>

            {/* Funnel Roadmap steps */}
            <div className="space-y-2 text-xs text-stone-300">
              <span className="font-bold text-stone-200 uppercase tracking-wider text-[11px] block">
                Архитектура воронки (ManyChat ➡️ Prodamus):
              </span>
              <div className="space-y-2">
                <div className="flex items-center gap-2 rounded-lg bg-stone-900 p-2 border border-stone-800">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stone-800 text-[10px] font-bold text-emerald-400">1</span>
                  <span>Зритель видит Reels Ждана ➡️ Пишет кодовое слово в комменты</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-stone-900 p-2 border border-stone-800">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stone-800 text-[10px] font-bold text-emerald-400">2</span>
                  <span>Чат-бот ManyChat мгновенно присылает лид-магнит в Direct</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-stone-900 p-2 border border-stone-800">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stone-800 text-[10px] font-bold text-emerald-400">3</span>
                  <span>Через 15 мин бот предлагает спец-оффер на трипваер ({selectedProduct.tripwirePrice} ₽)</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-stone-900 p-2 border border-stone-800">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stone-800 text-[10px] font-bold text-emerald-400">4</span>
                  <span>На странице спасибо или в Telegram-канале предлагается апселл</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
