import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy init Gemini SDK
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

const ZHDAN_SYSTEM_PROMPT = `
Ты — Ждан Таёжный (52 года), сибирский натуропат, потомственный травник и современный исследователь природного долголетия и здорового биохакинга.
Твой образ:
- Мужчина 50-55 лет, крепкий, с мудрым спокойным взглядом, ухоженной бородой с благородной сединой, открытой доброй улыбкой.
- Живет на Алтае/в Прибайкалье в деревянном доме из кедра, совмещает вековые рецепты сибирских травников с доказательной физиологией (сон, митохондрии, лимфа, очищение ЖКТ, микробиота, гормональный баланс).
- Голос бренда: уверенный, теплый, отеческий, без агрессивного инфоцыганства, без мата, с уважением к традициям предков и науке.
- Характерные речевые обороты: «Доброго здравия, друзья», «Тайга пустых советов не даёт», «Здоровье — это не таблетка, а ежедневный лад с телом», «Держи голову в холоде, а печень в чистоте».
- Всегда давай практические, безопасные и глубокие советы по травам (чага, саган-дайля, родиола розовая, иван-чай, хвоя, кедровая живица), режимам дня, бане, питанию и мягкому очищению.
- При генерации постов/Reels делай цепляющие хуки для Instagram, четкую структуру, хронометраж и призывы к действию (CTA для набора базы и продажи инфопродукта).
`;

// API Routes
app.post("/api/generate-content", async (req, res) => {
  try {
    const { type, topic, audience, goal } = req.body;
    const ai = getGeminiClient();

    let prompt = "";
    if (type === "reels") {
      prompt = `Напиши 3 готовых вирусных сценария Instagram Reels для блога Ждана Таёжного на тему: "${topic || 'Утренний напиток вместо кофе для бодрости и печени'}".
Целевая аудитория: ${audience || 'Люди 30-60 лет, уставшие от химии и стресса'}.
Цель видео: ${goal || 'Перевести зрителя в Директ за кодовым словом на бесплатный гайд'}.

Для каждого сценария укажи:
1. Заголовок (Хук на экране в первые 3 сек)
2. Визуальный ряд для AI-генератора видео (что делает Ждан в кадре, локация, свет)
3. Закадровый текст (Voiceover) Ждана с таймингом (15-30 сек)
4. Текст на экране (Captions)
5. Призыв к действию (CTA) и кодовое слово для чат-бота (например: «Напиши ТАЙГА в Директ»).
Форматируй ответ красиво с эмодзи и разметкой.`;
    } else if (type === "post") {
      prompt = `Напиши экспертный вовлекающий пост для Instagram Ждана Таёжного на тему: "${topic || 'Почему аптечные витамины не усваиваются и как восстановить кишечник'}".
Включи:
1. Цепляющий заголовок (карусель 1-й слайд)
2. Основной текст с таёжным рецептом / научным объяснением простыми словами
3. Слайды для карусели (5-7 слайдов)
4. Вопрос для комментариев (вовлечение)
5. Набор хэштегов.`;
    } else if (type === "stories") {
      prompt = `Создай 5-шаговую прогревающую цепочку Stories (Сторитейлинг на 1 день) для Ждана Таёжного по теме: "${topic || 'Как за 14 дней вернуть энергию и очистить лимфу'}".
Каждая сторис должна содержать:
- Описание фото/видео фона (из жизни Ждана в тайге)
- Текст на сторис
- Интерактив (опрос, ползунок, окошко вопроса)
- Финальный перевод на инфопродукт или лид-магнит.`;
    } else if (type === "infoproduct") {
      prompt = `Разработай полную концепцию мини-инфопродукта (трипваера) для Ждана Таёжного на тему: "${topic || '14 дней таёжного детокса и перезапуска обмена веществ'}".
Включи:
1. Убойное название и подзаголовок (оффер)
2. Формат (PDF-гайд + 3 аудио-подкаста + чек-лист травника)
3. Рекомендуемая цена (трипваер 990-1490 руб, основной пакет 3900 руб)
4. Программа по дням/модулям (минимум 4 модуля)
5. Бесплатный лид-магнит (пробник) для входа в воронку
6. Продающий текст для первого экрана мини-лендинга (Заголовок, 3 боли, 3 результата, кнопка).`;
    } else {
      prompt = `Составь контент-материал для блога Ждана Таёжного по запросу: ${topic || 'Советы по здоровью'}.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: ZHDAN_SYSTEM_PROMPT,
        temperature: 0.85,
      },
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("Generate error:", error);
    res.status(500).json({ error: error.message || "Failed to generate content" });
  }
});

app.post("/api/generate-prompts", async (req, res) => {
  try {
    const { sceneType, details } = req.body;
    const ai = getGeminiClient();

    const prompt = `Создай набор детальных англоязычных промптов для генерации фото и видео Ждана Таёжного в Midjourney v6, Flux.1 и Kling AI / HeyGen.
Сцена: ${sceneType || 'Портрет на фоне таёжного леса с кружкой травяного чая'}.
Дополнительные детали: ${details || 'Утренний мягкий свет, льняная рубашка, пар от чая, добрый взгляд'}.

Опиши:
1. Midjourney v6 Prompt (с параметрами --ar 4:5 --v 6.1 --style raw)
2. Flux.1 Schnell / Dev Prompt
3. Видео-промпт для Kling AI / Luma / Runway (анимация дыхания, пара, моргания)
4. Рекомендации по сохранению постоянного лица (Face Consistency / LoRA / Reference photo)
5. Подсказка для настройки голоса в ElevenLabs (тембр, глубина, акцент).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert AI art prompter and AI avatar engineer specialized in realistic 50-55 year old male character generation with consistent face and natural outdoor Siberian lighting.",
        temperature: 0.7,
      },
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("Prompts error:", error);
    res.status(500).json({ error: error.message || "Failed to generate prompts" });
  }
});

app.post("/api/ask-zhdan", async (req, res) => {
  try {
    const { message, history } = req.body;
    const ai = getGeminiClient();

    const chat = ai.chats.create({
      model: "gemini-3.7-flash",
      config: {
        systemInstruction: ZHDAN_SYSTEM_PROMPT + `
Ты отвечаешь пользователю лично, как Ждан Таёжный. Отвечай с теплотой, заботой, делись сибирской мудростью и конкретными проверенными рецептами (травы, закаливание, питание, сон, дыхание). Держи баланс между натуропатией и здравым смыслом. Всегда подчеркивай, что ты за бережное отношение к организму.`,
        temperature: 0.9,
      },
    });

    // Optionally replay history if provided
    if (Array.isArray(history) && history.length > 0) {
      for (const h of history.slice(-4)) {
        // Just keep recent context in prompt
      }
    }

    const response = await chat.sendMessage({
      message: message || "Здравствуй, Ждан! Расскажи о себе и с чего начать утро для здоровья.",
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Ask Zhdan error:", error);
    res.status(500).json({ error: error.message || "Failed to talk to Zhdan" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
