import { CheckCircle2, AlertCircle, X } from "lucide-react";

const toastStyles = {
  success: {
    icon: CheckCircle2,
    accent: "border-emerald-400/20 bg-emerald-500/10 text-emerald-100",
    iconColor: "text-emerald-300"
  },
  error: {
    icon: AlertCircle,
    accent: "border-rose-400/20 bg-rose-500/10 text-rose-100",
    iconColor: "text-rose-300"
  },
  info: {
    icon: CheckCircle2,
    accent: "border-sky-400/20 bg-sky-500/10 text-sky-100",
    iconColor: "text-sky-300"
  }
};

export default function Toast({ toast, onDismiss }) {
  const style = toastStyles[toast.type] ?? toastStyles.info;
  const Icon = style.icon;

  return (
    <div
      className={`fade-in flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg ${style.accent}`}
    >
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${style.iconColor}`} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{toast.title}</p>
        {toast.message ? (
          <p className="mt-1 text-sm text-slate-200/85">{toast.message}</p>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="rounded-lg p-1 text-slate-300 transition hover:bg-white/10 hover:text-white"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
