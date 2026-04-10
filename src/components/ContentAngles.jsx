import { Copy, Lightbulb, Sparkles } from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Skeleton from "./ui/Skeleton";

function LoadingAngles() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="p-5">
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="mt-4 h-20 w-full" />
          <Skeleton className="mt-3 h-4 w-2/3" />
        </Card>
      ))}
    </div>
  );
}

export default function ContentAngles({
  topic,
  onTopicChange,
  onGenerate,
  angles,
  isLoading,
  onCopy
}) {
  return (
    <div className="space-y-6">
      <Card className="p-6 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.24em] text-sky-300">
              Content Angles
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Find 10 better ways to talk about the work you already did.
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Feed in a project, feature, bug, or decision. Devale returns fresh angles you can develop into posts.
            </p>
          </div>
          <Button onClick={onGenerate} disabled={isLoading}>
            <Sparkles className="h-4 w-4" />
            Generate 10 angles
          </Button>
        </div>

        <div className="mt-6">
          <Input
            label="What are you working on?"
            as="textarea"
            rows={4}
            placeholder="I built a REST API with Node.js and MongoDB for a booking platform."
            value={topic}
            onChange={(event) => onTopicChange(event.target.value)}
          />
        </div>
      </Card>

      {isLoading ? (
        <LoadingAngles />
      ) : angles.length ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {angles.map((angle, index) => (
            <Card key={`${angle.title}-${index}`} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
                      {angle.format}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{angle.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {angle.description}
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-500">
                    Why this works
                  </p>
                  <p className="mt-2 text-sm text-slate-400">{angle.whyItWorks}</p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    onCopy(
                      `${angle.title}\n\n${angle.description}\n\nWhy it works: ${angle.whyItWorks}`,
                      "Angle copied"
                    )
                  }
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10">
            <Lightbulb className="h-6 w-6 text-amber-300" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-white">No angles yet</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
            Describe something you built, debugged, shipped, or learned and Devale will turn it into stronger posting angles.
          </p>
        </Card>
      )}
    </div>
  );
}
