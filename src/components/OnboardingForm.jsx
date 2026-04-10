import { useEffect, useMemo, useState } from "react";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Button from "./ui/Button";

const techOptions = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "JavaScript",
  "Python",
  "Django",
  "Flask",
  "FastAPI",
  "Laravel",
  "PHP",
  "Flutter",
  "React Native",
  "Go",
  "Rust",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Docker",
  "GraphQL"
];

const audienceOptions = [
  "Startups",
  "CTOs",
  "Fellow developers",
  "Non-tech founders"
];

const goalOptions = ["Get freelance gigs", "Build personal brand", "Teach others"];
const toneOptions = ["Professional", "Casual", "Funny", "Inspirational"];

export default function OnboardingForm({ profile, onSave, isBusy = false }) {
  const [form, setForm] = useState(profile);

  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const isValid = useMemo(() => {
    return (
      form.name.trim() &&
      form.currentProject.trim() &&
      form.targetAudience &&
      form.postingGoal &&
      form.tone &&
      form.techStack.length > 0
    );
  }, [form]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleTech = (tech) => {
    setForm((current) => {
      const exists = current.techStack.includes(tech);
      return {
        ...current,
        techStack: exists
          ? current.techStack.filter((item) => item !== tech)
          : [...current.techStack, tech]
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) {
      return;
    }

    onSave({
      ...form,
      name: form.name.trim(),
      currentProject: form.currentProject.trim()
    });
  };

  return (
    <Card className="p-6 lg:p-8">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.24em] text-sky-300">
          Creator Profile
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-white">
          Tell Devale how you work and what you want from your posts.
        </h2>
        <p className="mt-3 text-sm text-slate-400">
          This profile shapes every generated idea, thread, and weekly plan.
        </p>
      </div>

      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Name"
            placeholder="Ada Lovelace"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
          />
          <Input
            label="Current project or learning focus"
            placeholder="Building a SaaS billing dashboard in React + Node"
            value={form.currentProject}
            onChange={(event) => updateField("currentProject", event.target.value)}
          />
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-slate-100">Tech stack</p>
            <p className="mt-1 text-xs text-muted">
              Choose every technology you want Devale to reference naturally.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {techOptions.map((tech) => {
              const active = form.techStack.includes(tech);
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => toggleTech(tech)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    active
                      ? "border-sky-400/40 bg-sky-400/15 text-white"
                      : "border-line bg-panelAlt text-slate-300 hover:border-slate-500 hover:text-white"
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Input
            label="Target audience"
            as="select"
            value={form.targetAudience}
            onChange={(event) => updateField("targetAudience", event.target.value)}
          >
            <option value="">Choose audience</option>
            {audienceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Input>
          <Input
            label="Posting goal"
            as="select"
            value={form.postingGoal}
            onChange={(event) => updateField("postingGoal", event.target.value)}
          >
            <option value="">Choose goal</option>
            {goalOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Input>
          <Input
            label="Preferred tone"
            as="select"
            value={form.tone}
            onChange={(event) => updateField("tone", event.target.value)}
          >
            <option value="">Choose tone</option>
            {toneOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Input>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">
            {isValid
              ? "Profile is ready. Save it to power your content engine."
              : "Complete every field and select at least one stack item."}
          </p>
          <Button type="submit" disabled={!isValid || isBusy}>
            Save profile
          </Button>
        </div>
      </form>
    </Card>
  );
}
