import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  PenSquare,
  CalendarRange,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Sidebar from "./components/Sidebar";
import OnboardingForm from "./components/OnboardingForm";
import ContentGenerator from "./components/ContentGenerator";
import WeeklyCalendar from "./components/WeeklyCalendar";
import ContentAngles from "./components/ContentAngles";
import Settings from "./components/Settings";
import Card from "./components/ui/Card";
import Button from "./components/ui/Button";
import Toast from "./components/ui/Toast";
import { useGemini } from "./hooks/useGemini";

const STORAGE_KEYS = {
  profile: "devale-profile",
  apiKey: "devale-gemini-api-key",
  contentIdeas: "devale-content-ideas",
  dailyPrompt: "devale-daily-prompt",
  weeklyCalendar: "devale-weekly-calendar",
  contentAngles: "devale-content-angles",
  anglesTopic: "devale-angles-topic",
  selectedModel: "devale-selected-model",
  theme: "devale-theme"
};

const emptyProfile = {
  name: "",
  techStack: [],
  currentProject: "",
  targetAudience: "",
  postingGoal: "",
  tone: ""
};

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function Dashboard({ profile, contentIdeas, calendar, angles, onNavigate, hasApiKey }) {
  const stats = [
    {
      label: "Profile ready",
      value: profile.name ? "Yes" : "No",
      detail: profile.name
        ? `${profile.name} | ${profile.postingGoal}`
        : "Complete onboarding to personalize outputs.",
      icon: LayoutDashboard
    },
    {
      label: "Generated ideas",
      value: String(contentIdeas.length),
      detail: "Ready-to-post ideas from your latest session.",
      icon: PenSquare
    },
    {
      label: "Calendar days",
      value: String(calendar.length),
      detail: "Days currently saved in your weekly plan.",
      icon: CalendarRange
    },
    {
      label: "Content angles",
      value: String(angles.length),
      detail: hasApiKey
        ? "Fresh angle inventory for future posts."
        : "Add your Gemini key to unlock this section.",
      icon: Sparkles
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden p-3 sm:p-6 lg:p-8 border-transparent shadow-none bg-transparent xl:border-white/10 xl:shadow-glow xl:bg-panel">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-sky-300">
              Dashboard
            </p>
            <h2 className="mt-3 max-w-2xl text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
              Build a developer content system that turns daily work into inbound credibility.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              Devale takes your stack, audience, and goals, then turns raw technical moments into social posts, full threads, and a weekly publishing plan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => onNavigate("generate")}>
                Start generating
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="secondary" onClick={() => onNavigate("settings")}>
                {hasApiKey ? "Manage settings" : "Add Gemini key"}
              </Button>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/8 bg-slate-950/40 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              Active profile snapshot
            </p>
            <div className="mt-5 space-y-4 text-sm">
              <div>
                <p className="text-slate-500">Name</p>
                <p className="mt-1 text-white">{profile.name || "Not set"}</p>
              </div>
              <div>
                <p className="text-slate-500">Current focus</p>
                <p className="mt-1 text-white">{profile.currentProject || "Not set"}</p>
              </div>
              <div>
                <p className="text-slate-500">Audience and tone</p>
                <p className="mt-1 text-white">
                  {[profile.targetAudience, profile.tone].filter(Boolean).join(" | ") || "Not set"}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Stack</p>
                <p className="mt-1 text-white">
                  {profile.techStack?.length ? profile.techStack.join(", ") : "Not set"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-3 text-sm text-slate-400">{stat.detail}</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/5 p-3">
                  <Icon className="h-5 w-5 text-sky-300" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [profile, setProfile] = useState(emptyProfile);
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash");
  const [theme, setTheme] = useState("light");
  const [dailyPrompt, setDailyPrompt] = useState("");
  const [contentIdeas, setContentIdeas] = useState([]);
  const [weeklyCalendar, setWeeklyCalendar] = useState([]);
  const [anglesTopic, setAnglesTopic] = useState("");
  const [angles, setAngles] = useState([]);
  const [loadingContent, setLoadingContent] = useState(false);
  const [loadingCalendar, setLoadingCalendar] = useState(false);
  const [loadingAngles, setLoadingAngles] = useState(false);
  const [regeneratingDay, setRegeneratingDay] = useState("");
  const [toasts, setToasts] = useState([]);

  const {
    generateContentIdeas,
    generateWeeklyCalendar,
    regenerateCalendarDay,
    generateAngles
  } = useGemini(apiKey, selectedModel);

  useEffect(() => {
    setProfile(readStorage(STORAGE_KEYS.profile, emptyProfile));
    setApiKey(readStorage(STORAGE_KEYS.apiKey, ""));
    setSelectedModel(readStorage(STORAGE_KEYS.selectedModel, "gemini-2.5-flash"));
    
    const savedTheme = readStorage(STORAGE_KEYS.theme, "light");
    setTheme(savedTheme);
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    
    setDailyPrompt(readStorage(STORAGE_KEYS.dailyPrompt, ""));
    setContentIdeas(readStorage(STORAGE_KEYS.contentIdeas, []));
    setWeeklyCalendar(readStorage(STORAGE_KEYS.weeklyCalendar, []));
    setAnglesTopic(readStorage(STORAGE_KEYS.anglesTopic, ""));
    setAngles(readStorage(STORAGE_KEYS.contentAngles, []));
  }, []);

  const hasProfile = useMemo(() => {
    return Boolean(
      profile.name &&
        profile.currentProject &&
        profile.targetAudience &&
        profile.postingGoal &&
        profile.tone &&
        profile.techStack?.length
    );
  }, [profile]);

  const hasApiKey = Boolean(apiKey);

  const pushToast = (type, title, message = "") => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;

    setToasts((current) => [...current, { id, type, title, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3500);
  };

  const dismissToast = (id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  const requireSetup = () => {
    if (!hasProfile) {
      pushToast("error", "Finish your profile first", "Complete onboarding so Devale has context.");
      setActiveView("dashboard");
      return false;
    }

    if (!hasApiKey) {
      pushToast("error", "Gemini API key missing", "Add your key in Settings before generating content.");
      setActiveView("settings");
      return false;
    }

    return true;
  };

  const handleSaveProfile = (nextProfile) => {
    setProfile(nextProfile);
    saveStorage(STORAGE_KEYS.profile, nextProfile);
    pushToast("success", "Profile saved", "Your content profile is ready to use.");
  };

  const handleSaveApiKey = (nextApiKey) => {
    const trimmed = nextApiKey.trim();
    setApiKey(trimmed);
    saveStorage(STORAGE_KEYS.apiKey, trimmed);
    pushToast("success", "API key saved", trimmed ? "Gemini is connected locally." : "Saved empty key.");
  };

  const handleSaveModel = (nextModel) => {
    setSelectedModel(nextModel);
    saveStorage(STORAGE_KEYS.selectedModel, nextModel);
    pushToast("success", "Model applied", `Now using ${nextModel}.`);
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    saveStorage(STORAGE_KEYS.theme, nextTheme);
    if (nextTheme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  const handleGenerateContent = async () => {
    if (!requireSetup()) {
      return;
    }

    if (!dailyPrompt.trim()) {
      pushToast("error", "Add a daily prompt", "Describe what you worked on today.");
      return;
    }

    setLoadingContent(true);

    try {
      const items = await generateContentIdeas(profile, dailyPrompt.trim());
      setContentIdeas(items);
      saveStorage(STORAGE_KEYS.contentIdeas, items);
      saveStorage(STORAGE_KEYS.dailyPrompt, dailyPrompt);
      pushToast("success", "Content generated", "Five post variations are ready.");
      setActiveView("generate");
    } catch (error) {
      pushToast("error", "Content generation failed", error.message);
    } finally {
      setLoadingContent(false);
    }
  };

  const handleGenerateCalendar = async () => {
    if (!requireSetup()) {
      return;
    }

    setLoadingCalendar(true);

    try {
      const days = await generateWeeklyCalendar(profile);
      setWeeklyCalendar(days);
      saveStorage(STORAGE_KEYS.weeklyCalendar, days);
      pushToast("success", "Weekly calendar generated", "Your 7-day plan is ready.");
      setActiveView("calendar");
    } catch (error) {
      pushToast("error", "Calendar generation failed", error.message);
    } finally {
      setLoadingCalendar(false);
    }
  };

  const handleRegenerateDay = async (dayLabel) => {
    if (!requireSetup()) {
      return;
    }

    setRegeneratingDay(dayLabel);

    try {
      const nextDay = await regenerateCalendarDay(profile, weeklyCalendar, dayLabel);
      const updated = weeklyCalendar.map((day) => (day.day === dayLabel ? nextDay : day));
      setWeeklyCalendar(updated);
      saveStorage(STORAGE_KEYS.weeklyCalendar, updated);
      pushToast("success", `${dayLabel} regenerated`, "That day now has a fresh post.");
    } catch (error) {
      pushToast("error", "Could not regenerate day", error.message);
    } finally {
      setRegeneratingDay("");
    }
  };

  const handleGenerateAngles = async () => {
    if (!requireSetup()) {
      return;
    }

    if (!anglesTopic.trim()) {
      pushToast("error", "Add a topic first", "Describe what you built, fixed, or learned.");
      return;
    }

    setLoadingAngles(true);

    try {
      const nextAngles = await generateAngles(profile, anglesTopic.trim());
      setAngles(nextAngles);
      saveStorage(STORAGE_KEYS.contentAngles, nextAngles);
      saveStorage(STORAGE_KEYS.anglesTopic, anglesTopic);
      pushToast("success", "Angles generated", "Ten fresh angles are ready.");
      setActiveView("angles");
    } catch (error) {
      pushToast("error", "Angle generation failed", error.message);
    } finally {
      setLoadingAngles(false);
    }
  };

  const handleCopy = async (text, title) => {
    try {
      await navigator.clipboard.writeText(text);
      pushToast("success", title, "Copied to clipboard.");
    } catch {
      pushToast("error", "Copy failed", "Your browser blocked clipboard access.");
    }
  };

  const handleExport = (format) => {
    if (!weeklyCalendar.length) {
      pushToast("error", "Nothing to export", "Generate a weekly calendar first.");
      return;
    }

    const markdown = `# Devale Weekly Calendar\n\n${weeklyCalendar
      .map(
        (day) =>
          `## ${day.day}\n- Platform: ${day.platform}\n- Content Type: ${day.contentType}\n- Theme: ${day.theme}\n\n${day.post}\n`
      )
      .join("\n")}`;

    const text = weeklyCalendar
      .map(
        (day) =>
          `${day.day}\nPlatform: ${day.platform}\nContent Type: ${day.contentType}\nTheme: ${day.theme}\n\n${day.post}`
      )
      .join("\n\n----------------------------------------\n\n");

    const content = format === "markdown" ? markdown : text;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `devale-weekly-calendar.${format === "markdown" ? "md" : "txt"}`;
    link.click();
    URL.revokeObjectURL(url);
    pushToast("success", "Export ready", `Downloaded as ${format === "markdown" ? "Markdown" : "text"}.`);
  };

  const handleResetProfile = () => {
    setProfile(emptyProfile);
    setApiKey("");
    setSelectedModel("gemini-2.5-flash");
    setTheme("light");
    setDailyPrompt("");
    setContentIdeas([]);
    setWeeklyCalendar([]);
    setAnglesTopic("");
    setAngles([]);
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    pushToast("success", "Workspace reset", "Profile, key, and generated content were cleared.");
    setActiveView("dashboard");
  };

  const handleClearContent = () => {
    setDailyPrompt("");
    setContentIdeas([]);
    setWeeklyCalendar([]);
    setAnglesTopic("");
    setAngles([]);
    saveStorage(STORAGE_KEYS.dailyPrompt, "");
    saveStorage(STORAGE_KEYS.contentIdeas, []);
    saveStorage(STORAGE_KEYS.weeklyCalendar, []);
    saveStorage(STORAGE_KEYS.anglesTopic, "");
    saveStorage(STORAGE_KEYS.contentAngles, []);
    pushToast("success", "Generated content cleared", "Your profile and API key were kept.");
  };

  return (
    <div className="min-h-screen bg-hero-grid">
      <div className="mx-auto max-w-[1600px] px-4 py-6 pb-36 lg:px-6 lg:py-8 xl:pb-8">
        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <Sidebar
            activeView={activeView}
            onNavigate={setActiveView}
            profile={profile}
            hasApiKey={hasApiKey}
          />

          <main className="space-y-6">
            {activeView === "dashboard" ? (
              <>
                <Dashboard
                  profile={profile}
                  contentIdeas={contentIdeas}
                  calendar={weeklyCalendar}
                  angles={angles}
                  onNavigate={setActiveView}
                  hasApiKey={hasApiKey}
                />
                <OnboardingForm profile={profile} onSave={handleSaveProfile} />
              </>
            ) : null}

            {activeView === "generate" ? (
              <ContentGenerator
                dailyPrompt={dailyPrompt}
                onPromptChange={(value) => {
                  setDailyPrompt(value);
                  saveStorage(STORAGE_KEYS.dailyPrompt, value);
                }}
                onGenerate={handleGenerateContent}
                contentIdeas={contentIdeas}
                isLoading={loadingContent}
                onCopy={handleCopy}
              />
            ) : null}

            {activeView === "calendar" ? (
              <WeeklyCalendar
                calendar={weeklyCalendar}
                isLoading={loadingCalendar}
                regeneratingDay={regeneratingDay}
                onGenerate={handleGenerateCalendar}
                onRegenerateDay={handleRegenerateDay}
                onCopy={handleCopy}
                onExport={handleExport}
              />
            ) : null}

            {activeView === "angles" ? (
              <ContentAngles
                topic={anglesTopic}
                onTopicChange={(value) => {
                  setAnglesTopic(value);
                  saveStorage(STORAGE_KEYS.anglesTopic, value);
                }}
                onGenerate={handleGenerateAngles}
                angles={angles}
                isLoading={loadingAngles}
                onCopy={handleCopy}
              />
            ) : null}

            {activeView === "settings" ? (
              <Settings
                apiKey={apiKey}
                selectedModel={selectedModel}
                theme={theme}
                onToggleTheme={handleToggleTheme}
                onSaveApiKey={handleSaveApiKey}
                onSaveModel={handleSaveModel}
                onResetProfile={handleResetProfile}
                onClearContent={handleClearContent}
              />
            ) : null}
          </main>
        </div>
      </div>

      <div className="fixed top-4 xl:top-6 right-4 z-50 flex w-full max-w-sm flex-col gap-3 px-4">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </div>
    </div>
  );
}
