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
    <Card className="soft-grid sticky top-6 overflow-hidden p-4">
      <div className="rounded-2xl border border-sky-400/15 bg-sky-400/8 p-4">
        <p className="text-xs uppercase tracking-[0.22em] text-sky-300">
          Devale
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-white">
          Content engine for developers.
        </h1>
        <p className="mt-3 text-sm text-slate-300">
          Turn the work you already do into posts that build trust and win attention.
        </p>
      </div>

      <nav className="mt-6 space-y-2">
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

      <div className="mt-6 grid gap-3 text-sm">
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
  );
}
