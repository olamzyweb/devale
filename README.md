# Devale

Devale is a production-ready React + Vite web application that helps software developers turn daily work into social media content for X and LinkedIn. It uses Gemini client-side, stores everything in `localStorage`, and is designed to answer one practical question: what should I post today?

## Features

- Developer onboarding profile with name, tech stack, project focus, audience, goal, and tone
- Gemini-powered content generator that creates 5 ready-to-publish post formats
- Weekly 7-day content calendar with per-day regeneration
- Content Angles engine that surfaces 10 fresh story angles from technical work
- One-click copy actions for generated content
- Weekly calendar export as Markdown or plain text
- Local-only settings panel for Gemini API key storage
- Persistent profile and generated content using `localStorage`
- Responsive dark UI with loading skeletons, empty states, and toast notifications

## Tech Stack

- React
- Vite
- Tailwind CSS
- Google Gemini API via `@google/generative-ai`
- `localStorage` for persistence

## Project Structure

```text
devale/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── OnboardingForm.jsx
│   │   ├── ContentGenerator.jsx
│   │   ├── WeeklyCalendar.jsx
│   │   ├── ContentAngles.jsx
│   │   ├── Settings.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── Card.jsx
│   │       ├── Toast.jsx
│   │       └── Skeleton.jsx
│   ├── hooks/
│   │   └── useGemini.js
│   ├── utils/
│   │   └── prompts.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── PROMPTS.md
├── COMPONENTS.md
└── CONTRIBUTING.md
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local URL Vite prints in the terminal.

## Gemini API Key

Devale expects the user to provide their own Gemini API key through the Settings page.

1. Visit `https://makersuite.google.com/app/apikey`
2. Create or copy your Gemini API key
3. Open DevContent
4. Go to `Settings`
5. Paste the key and click `Save key`

The key is stored only in the browser using `localStorage`.

## How Content Generation Works

- The onboarding form captures who the developer is, what they work on, who they want to attract, and how they want to sound
- Prompt templates inject that profile context into every Gemini request
- Gemini is instructed to return strict JSON so the UI can safely render each post, calendar day, or angle separately
- The app validates that the expected number of ideas, days, or angles was returned before saving anything locally

## Run for Production

Create a production build:

```bash
npm run build
```

Preview the production output locally:

```bash
npm run preview
```

The production-ready assets are emitted into `dist/`.

## Error Handling

The app includes client-side handling for:

- Missing Gemini API key
- Invalid or unauthorized API key responses
- Network failures
- Empty Gemini responses
- Malformed JSON responses
- Clipboard copy failures
- Empty prompt/topic submissions

## Notes

- There is no backend and no database
- All user data is stored in the current browser only
- Clearing browser storage will remove the saved profile, API key, and generated content
