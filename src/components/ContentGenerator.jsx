import { Sparkles, Copy, Wand2 } from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Skeleton from "./ui/Skeleton";

const labels = {
  hot_take: "Hot Take",
  tip: "Tip or Lesson",
  behind_the_scenes: "Behind the Scenes",
  thread: "Thread Idea",
  linkedin_long_form: "LinkedIn Long-form"
};

function LoadingState() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="p-5">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-4 h-6 w-4/5" />
          <Skeleton className="mt-3 h-24 w-full" />
        </Card>
      ))}
    </div>
  );
}

export default function ContentGenerator({
  dailyPrompt,
  onPromptChange,
  onGenerate,
  contentIdeas,
  isLoading,
  onCopy
}) {
  return (
    <div className="space-y-6">
      <Card className="p-6 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.24em] text-sky-300">
              Generate Content
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Turn a real dev moment into posts for X and LinkedIn.
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Give Devale a concrete event, bug, feature, or lesson from your day.
            </p>
          </div>
          <Button onClick={onGenerate} className="min-w-40" disabled={isLoading}>
            <Wand2 className="h-4 w-4" />
            Generate 5 ideas
          </Button>
        </div>

        <div className="mt-6">
          <Input
            label="What happened today?"
            as="textarea"
            rows={4}
            placeholder="Today I fixed a CORS bug between my React frontend and Express API, and the real issue was a missing credentials config."
            value={dailyPrompt}
            onChange={(event) => onPromptChange(event.target.value)}
          />
        </div>
      </Card>

      {isLoading ? (
        <LoadingState />
      ) : contentIdeas.length > 0 ? (
        <div className="grid gap-4">
          {contentIdeas.map((item, index) => (
            <Card key={`${item.type}-${index}`} className="p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">
                      {labels[item.type] || item.type}
                    </span>
                    <span className="text-xs uppercase tracking-[0.18em] text-muted">
                      {item.platform}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-sky-200">{item.hook}</p>
                  <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-7 text-slate-200">
                    {item.content}
                  </pre>
                </div>
                <div className="flex shrink-0 gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onCopy(item.content, `${labels[item.type] || item.type} copied`)}
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10">
            <Sparkles className="h-6 w-6 text-sky-300" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-white">No posts generated yet</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
            Start with something real: a bug you fixed, an architecture decision, a lesson, a refactor, or a technical tradeoff you ran into today.
          </p>
        </Card>
      )}
    </div>
  );
}
