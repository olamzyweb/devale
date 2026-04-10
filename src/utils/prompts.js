const jsonInstruction = `
Return valid JSON only.
Do not wrap the JSON in markdown fences.
Do not add commentary before or after the JSON.
Ensure every string is properly escaped.
`;

const formatProfile = (profile) => `
Developer profile:
- Name: ${profile.name || "Unknown"}
- Tech stack: ${profile.techStack?.join(", ") || "Not provided"}
- Current project or learning focus: ${profile.currentProject || "Not provided"}
- Target audience: ${profile.targetAudience || "Not provided"}
- Posting goal: ${profile.postingGoal || "Not provided"}
- Preferred tone: ${profile.tone || "Not provided"}
`;

export function buildContentPrompt(profile, dailyPrompt) {
  return `
You are a senior social media strategist for software developers.
Your job is to turn developer work into posts that attract credibility, engagement, and freelance opportunities.

${formatProfile(profile)}

Today's raw input from the user:
"${dailyPrompt}"

Rules:
- Write in the user's preferred tone while still sounding natural and credible.
- Focus on ideas that make the developer look thoughtful, capable, and useful.
- Avoid cringe marketing language and avoid generic hustle platitudes.
- Make every post specific enough to feel real.
- Include concise hooks.
- The thread must include a numbered series of tweets/posts ready to publish.
- The LinkedIn post should be a polished long-form post with line breaks.
- Keep X/Twitter posts concise and punchy.

Output JSON schema:
{
  "items": [
    {
      "type": "hot_take | tip | behind_the_scenes | thread | linkedin_long_form",
      "title": "short internal label",
      "hook": "opening line",
      "platform": "X | LinkedIn | Both",
      "content": "ready-to-publish post text"
    }
  ]
}

Return exactly 5 items in this order:
1. hot_take
2. tip
3. behind_the_scenes
4. thread
5. linkedin_long_form

${jsonInstruction}
`;
}

export function buildWeeklyCalendarPrompt(profile) {
  return `
You are a social media content planner for software developers.
Create a 7-day posting plan that helps this developer stay consistent and attract relevant opportunities.

${formatProfile(profile)}

Rules:
- Balance platforms between X and LinkedIn.
- Mix opinions, lessons, storytelling, credibility-building, and educational content.
- Each day must contain a full post ready to publish.
- Adapt the content to the developer's audience and goal.
- Vary the angle from day to day so the week does not feel repetitive.

Output JSON schema:
{
  "days": [
    {
      "day": "Day 1",
      "platform": "X | LinkedIn",
      "contentType": "short label for the post format",
      "theme": "why this day matters",
      "post": "full ready-to-publish post"
    }
  ]
}

Return exactly 7 days.

${jsonInstruction}
`;
}

export function buildRegenerateDayPrompt(profile, existingCalendar, dayLabel) {
  return `
You are improving one day in an existing weekly social media plan for a software developer.

${formatProfile(profile)}

Existing 7-day plan for reference:
${JSON.stringify(existingCalendar, null, 2)}

Regenerate only this slot: ${dayLabel}

Rules:
- Keep the regenerated day distinct from the rest of the week.
- Maintain the user's tone and audience fit.
- Return one complete day object only.

Output JSON schema:
{
  "day": "${dayLabel}",
  "platform": "X | LinkedIn",
  "contentType": "short label for the post format",
  "theme": "why this day matters",
  "post": "full ready-to-publish post"
}

${jsonInstruction}
`;
}

export function buildAnglesPrompt(profile, topic) {
  return `
You are a content angles strategist for developers.
Generate fresh content angles from a single technical input.

${formatProfile(profile)}

Source topic:
"${topic}"

Rules:
- Focus on specific, differentiated angles instead of paraphrasing the same idea.
- Include a mix of storytelling, teaching, opinion, comparison, and authority-building ideas.
- Make angles that can lead to real posts about experience, decisions, mistakes, wins, and tradeoffs.

Output JSON schema:
{
  "angles": [
    {
      "title": "angle headline",
      "description": "what the post would focus on",
      "format": "opinion | story | thread | lesson | comparison | breakdown",
      "whyItWorks": "why this angle is compelling for the user's audience"
    }
  ]
}

Return exactly 10 angles.

${jsonInstruction}
`;
}
