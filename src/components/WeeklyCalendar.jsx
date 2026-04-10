import { CalendarDays, Copy, Download, RefreshCcw } from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Skeleton from "./ui/Skeleton";

function LoadingCalendar() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="p-5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-3 h-5 w-48" />
          <Skeleton className="mt-4 h-28 w-full" />
        </Card>
      ))}
    </div>
  );
}

export default function WeeklyCalendar({
  calendar,
  isLoading,
  regeneratingDay,
  onGenerate,
  onRegenerateDay,
  onCopy,
  onExport
}) {
  return (
    <div className="space-y-6">
      <Card className="p-6 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.24em] text-sky-300">
              Weekly Calendar
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Build a full week of developer content in one shot.
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Each day includes a platform, angle, and ready-to-post copy shaped by your profile.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={onGenerate} disabled={isLoading}>
              <CalendarDays className="h-4 w-4" />
              Generate 7-day plan
            </Button>
            <Button
              variant="secondary"
              onClick={() => onExport("markdown")}
              disabled={!calendar.length}
            >
              <Download className="h-4 w-4" />
              Export Markdown
            </Button>
            <Button
              variant="secondary"
              onClick={() => onExport("text")}
              disabled={!calendar.length}
            >
              <Download className="h-4 w-4" />
              Export Text
            </Button>
          </div>
        </div>
      </Card>

      {isLoading ? (
        <LoadingCalendar />
      ) : calendar.length ? (
        <div className="grid gap-4">
          {calendar.map((day) => (
            <Card key={day.day} className="p-5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-4xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                      {day.day}
                    </span>
                    <span className="text-xs uppercase tracking-[0.18em] text-muted">
                      {day.platform}
                    </span>
                    <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {day.contentType}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{day.theme}</h3>
                  <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-7 text-slate-200">
                    {day.post}
                  </pre>
                </div>
                <div className="flex shrink-0 flex-wrap gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onCopy(day.post, `${day.day} copied`)}
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onRegenerateDay(day.day)}
                    disabled={regeneratingDay === day.day}
                  >
                    <RefreshCcw className="h-4 w-4" />
                    {regeneratingDay === day.day ? "Regenerating..." : "Regenerate"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
            <CalendarDays className="h-6 w-6 text-emerald-300" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-white">No calendar yet</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
            Generate a week-long plan when you want consistency without deciding what to post every morning.
          </p>
        </Card>
      )}
    </div>
  );
}
