import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  buildAnglesPrompt,
  buildContentPrompt,
  buildRegenerateDayPrompt,
  buildWeeklyCalendarPrompt
} from "../utils/prompts";

function extractJson(text) {
  const trimmed = text.trim();
  const fenced = trimmed.replace(/^```json\s*/i, "").replace(/```$/i, "");
  const firstBrace = fenced.indexOf("{");
  const lastBrace = fenced.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("Gemini returned a response without valid JSON.");
  }

  return fenced.slice(firstBrace, lastBrace + 1);
}

function parseJsonResponse(text) {
  try {
    return JSON.parse(extractJson(text));
  } catch {
    throw new Error("Gemini returned malformed JSON. Try generating again.");
  }
}

function ensureApiKey(apiKey) {
  if (!apiKey || !apiKey.trim()) {
    throw new Error("Add your Gemini API key in Settings before generating content.");
  }
}

function createModel(apiKey, selectedModel) {
  ensureApiKey(apiKey);
  const genAI = new GoogleGenerativeAI(apiKey.trim());
  return genAI.getGenerativeModel({ model: selectedModel || "gemini-2.5-flash" });
}

async function requestJson(apiKey, selectedModel, prompt) {
  try {
    const model = createModel(apiKey, selectedModel);
    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.();

    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    return parseJsonResponse(text);
  } catch (error) {
    console.error("Gemini API Full Error:", error);
    const message = error?.message || "Unable to reach Gemini right now.";

    if (/api key|permission|unauthorized|403|401/i.test(message)) {
      throw new Error("Your Gemini API key looks invalid or does not have access.");
    }

    if (/network|fetch|failed/i.test(message)) {
      throw new Error("Network error while talking to Gemini. Check your connection, VPN, or ad-blocker, and try again.");
    }

    throw new Error(message);
  }
}

export function useGemini(apiKey, selectedModel) {
  const generateContentIdeas = async (profile, dailyPrompt) => {
    const data = await requestJson(apiKey, selectedModel, buildContentPrompt(profile, dailyPrompt));

    if (!Array.isArray(data.items) || data.items.length !== 5) {
      throw new Error("Gemini did not return the expected 5 content ideas.");
    }

    return data.items;
  };

  const generateWeeklyCalendar = async (profile) => {
    const data = await requestJson(apiKey, selectedModel, buildWeeklyCalendarPrompt(profile));

    if (!Array.isArray(data.days) || data.days.length !== 7) {
      throw new Error("Gemini did not return a 7-day calendar.");
    }

    return data.days;
  };

  const regenerateCalendarDay = async (profile, existingCalendar, dayLabel) => {
    const data = await requestJson(
      apiKey,
      selectedModel,
      buildRegenerateDayPrompt(profile, existingCalendar, dayLabel)
    );

    if (!data?.day || !data?.post) {
      throw new Error("Gemini did not return a valid day entry.");
    }

    return data;
  };

  const generateAngles = async (profile, topic) => {
    const data = await requestJson(apiKey, selectedModel, buildAnglesPrompt(profile, topic));

    if (!Array.isArray(data.angles) || data.angles.length !== 10) {
      throw new Error("Gemini did not return the expected 10 content angles.");
    }

    return data.angles;
  };

  return {
    generateContentIdeas,
    generateWeeklyCalendar,
    regenerateCalendarDay,
    generateAngles
  };
}
