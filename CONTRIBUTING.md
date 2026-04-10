# Contributing

Thanks for contributing to Devale.

## Development Workflow

1. Fork the repository
2. Create a feature branch
3. Install dependencies with `npm install`
4. Run the app locally with `npm run dev`
5. Make focused changes
6. Validate that the app still builds with `npm run build`
7. Open a pull request with a concise summary of what changed and why

## Project Conventions

- Keep the app frontend-only unless there is a strong product reason to add a backend
- Preserve the existing `localStorage` persistence model unless a migration is intentionally designed
- Keep Gemini prompt changes centralized in `src/utils/prompts.js`
- Keep Gemini API logic inside `src/hooks/useGemini.js`
- Reuse the UI primitives in `src/components/ui/` instead of introducing duplicate patterns
- Maintain strict JSON output requirements whenever prompt schemas change

## What Good Contributions Look Like

- bug fixes with clear reproduction steps
- prompt improvements that increase output consistency
- UX improvements that reduce friction for content generation
- better mobile behavior
- accessibility improvements
- export and copy workflow improvements
- performance or state management improvements that do not complicate the app unnecessarily

## Pull Request Checklist

- The feature works end to end
- Existing flows still behave correctly
- Error states are handled
- The UI remains responsive on mobile and desktop
- Documentation is updated when behavior changes

## Reporting Issues

When opening an issue, include:

- what you expected to happen
- what actually happened
- browser and OS details
- screenshots if the issue is visual
- any Gemini response or error message shown in the UI
