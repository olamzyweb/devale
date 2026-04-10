import {
  LayoutDashboard,
  PenSquare,
  CalendarRange,
  Sparkles,
  Settings as SettingsIcon,
  ChevronRight
} from "lucide-react";
import Card from "./ui/Card";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "generate", label: "Generate Content", icon: PenSquare },
  { id: "calendar", label: "Weekly Calendar", icon: CalendarRange },
  { id: "angles", label: "Content Angles", icon: Sparkles },
  { id: "settings", label: "Settings", icon: SettingsIcon }
];

export default function Sidebar({
  activeView,
  onNavigate,
  profile,
  hasApiKey
}) {
  return (
    <>
      <Card className="soft-grid xl:sticky xl:top-6 overflow-hidden p-0 xl:p-4 border-transparent shadow-none bg-transparent xl:border-white/10 xl:shadow-glow xl:bg-panel">
        <div className="rounded-2xl border border-sky-400/15 bg-sky-400/8 p-3 xl:p-4">
          <p className="text-[10px] xl:text-xs uppercase tracking-[0.22em] text-sky-300">
            Devale
          </p>
          <h1 className="mt-1 xl:mt-3 text-[1.1rem] xl:text-2xl font-semibold text-white">
            Content engine for developers.
          </h1>
          <p className="mt-3 text-sm text-slate-300 hidden md:block">
            Turn the work you already do into posts that build trust and win attention.
          </p>
        </div>

        <nav className="mt-6 hidden xl:block space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeView === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                  active
                    ? "border-sky-400/30 bg-sky-400/10 text-white"
                    : "border-transparent bg-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </span>
                <ChevronRight className="h-4 w-4 text-slate-500" />
              </button>
            );
          })}
        </nav>

        <div className="mt-6 hidden xl:grid gap-3 text-sm">
          <div className="rounded-2xl border border-white/8 bg-slate-950/30 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              Profile
            </p>
            <p className="mt-2 font-medium text-white">
              {profile.name || "Set up your creator profile"}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {profile.techStack?.length
                ? profile.techStack.join(", ")
                : "No tech stack selected yet"}
            </p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-slate-950/30 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              Gemini
            </p>
            <p className={`mt-2 font-medium ${hasApiKey ? "text-emerald-300" : "text-amber-300"}`}>
              {hasApiKey ? "API key saved" : "API key missing"}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Add your key in Settings to start generating posts.
            </p>
          </div>
        </div>
      </Card>

      <nav className="fixed bottom-6 left-1/2 z-50 flex w-[94%] max-w-[420px] -translate-x-1/2 justify-between rounded-[24px] border border-white/10 bg-slate-900/90 px-3 py-3 shadow-[0_16px_40px_-5px_rgba(0,0,0,0.8)] backdrop-blur-xl xl:hidden sm:px-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activeView === item.id;
          
          let shortLabel = item.label;
          if (item.id === "dashboard") shortLabel = "Home";
          if (item.id === "generate") shortLabel = "Generate";
          if (item.id === "calendar") shortLabel = "Calendar";
          if (item.id === "angles") shortLabel = "Angles";

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-1 flex-col items-center justify-center gap-1.5 rounded-xl px-1 py-2 transition ${
                active ? "text-sky-400 bg-white/5" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-[10px] sm:text-xs max-w-[64px] truncate text-center">
                {shortLabel}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
