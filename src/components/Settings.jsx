import { ExternalLink, Eye, EyeOff, RefreshCcw, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Button from "./ui/Button";

export default function Settings({
  apiKey,
  selectedModel,
  theme,
  onToggleTheme,
  onSaveApiKey,
  onSaveModel,
  onResetProfile,
  onClearContent
}) {
  const [draftKey, setDraftKey] = useState(apiKey);
  const [draftModel, setDraftModel] = useState(selectedModel || "gemini-2.5-flash");
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    setDraftKey(apiKey);
  }, [apiKey]);

  useEffect(() => {
    if (selectedModel) {
      setDraftModel(selectedModel);
    }
  }, [selectedModel]);

  return (
    <div className="grid gap-6">
      <Card className="p-6 lg:p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-sky-300">
          Settings
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-white">
          Manage your Gemini key and local workspace.
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-400">
          Your API key stays in your browser via localStorage. No backend or database is used in this app.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-3xl border border-white/8 bg-slate-950/35 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Gemini API key</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Required for content generation using `gemini-1.5-flash`.
                </p>
              </div>
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-sm text-slate-200 transition hover:border-sky-400/30 hover:text-white"
              >
                Get key
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <Input
                  label="Saved API key"
                  type={showKey ? "text" : "password"}
                  placeholder="Paste your Gemini API key"
                  value={draftKey}
                  onChange={(event) => setDraftKey(event.target.value)}
                />
              </div>
              <div className="flex items-end gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowKey((current) => !current)}
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {showKey ? "Hide" : "Show"}
                </Button>
                <Button onClick={() => onSaveApiKey(draftKey)}>
                  <Save className="h-4 w-4" />
                  Save key
                </Button>
              </div>
            </div>

            <div className="mt-5 flex items-end gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-300">
                  Select Gemini Model
                </label>
                <div className="mt-1.5 focus-within:ring-2 focus-within:ring-sky-500/50 rounded-xl bg-slate-900 border border-line">
                  <select
                    className="w-full bg-transparent px-3 py-2 text-sm text-white appearance-none outline-none"
                    value={draftModel}
                    onChange={(e) => setDraftModel(e.target.value)}
                  >
                    <option className="bg-slate-900 text-slate-100" value="gemini-2.5-flash-lite">gemini-2.5-flash-lite</option>
                    <option className="bg-slate-900 text-slate-100" value="gemini-2.5-flash">gemini-2.5-flash</option>
                    <option className="bg-slate-900 text-slate-100" value="gemini-2.5-pro">gemini-2.5-pro</option>
                  </select>
                </div>
              </div>
              <Button onClick={() => onSaveModel(draftModel)}>
                <Save className="h-4 w-4" />
                Save model
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-white/8 bg-slate-950/35 p-5">
              <h3 className="text-lg font-semibold text-white">Appearance</h3>
              <p className="mt-2 text-sm text-slate-400">
                Toggle between Light and Dark mode.
              </p>

              <div className="mt-6 flex gap-3">
                <Button variant="secondary" onClick={onToggleTheme}>
                  {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/8 bg-slate-950/35 p-5">
              <h3 className="text-lg font-semibold text-white">Workspace reset</h3>
              <p className="mt-2 text-sm text-slate-400">
                Clear local profile data or wipe generated content if you want a fresh start.
              </p>

              <div className="mt-6 grid gap-3">
                <Button variant="secondary" onClick={onClearContent}>
                  <RefreshCcw className="h-4 w-4" />
                  Clear generated content
                </Button>
                <Button variant="danger" onClick={onResetProfile}>
                  <Trash2 className="h-4 w-4" />
                  Reset profile and key
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
