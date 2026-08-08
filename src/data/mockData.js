// Central mock/local data store for the ABTalks prototype.
// No backend — everything here is read/written in-memory via React state.

export const TOTAL_DAYS = 60;

export const student = {
  name: "Rahul Singh",
  college: "ABES Engineering College",
  track: "Full Stack Development",
  currentDay: 12,
  completedDays: 11,
  currentStreak: 11,
  longestStreak: 11,
  overallCompletion: 20, // percent
  githubSubmissions: 11,
  linkedinSubmissions: 10,
  momentumScore: 82,
  nextMilestone: { label: "15-day streak", daysAway: 4 },
  github: "rahulsingh873",
  linkedin: "rahul-singh-dev",
  profileComplete: true, // toggle to false to preview the empty-profile prompt
  missedYesterday: false, // toggle to true to preview the missed-day recovery state
};

// Day 1–11 marked complete, 12 is "today" (current, in progress), rest locked/upcoming.
export const dayStatuses = Array.from({ length: TOTAL_DAYS }, (_, i) => {
  const day = i + 1;
  if (day <= student.completedDays) return "complete";
  if (day === student.currentDay) return "current";
  return "upcoming";
});

export const achievements = [
  { id: "streak-7", label: "7-Day Streak", icon: "flame", earned: true },
  { id: "first-proof", label: "First Proof Shipped", icon: "check", earned: true },
  { id: "github-10", label: "10 GitHub Proofs", icon: "github", earned: true },
  { id: "streak-15", label: "15-Day Streak", icon: "flame", earned: false },
  { id: "halfway", label: "Halfway Builder", icon: "flag", earned: false },
];

export const days = {
  12: {
    day: 12,
    title: "Build an Interactive Portfolio",
    description:
      "Design and ship a personal portfolio site that actually looks like you built it on purpose. This is the page recruiters land on first — make the first three seconds count.",
    expectedOutcome:
      "A live, responsive portfolio with a clear hero, a projects showcase, and a way to reach you — deployed and linkable.",
    difficulty: "Intermediate",
    estimatedTime: "2–3 hours",
    track: "Full Stack Development",
    requirements: [
      "Responsive layout that holds up from 320px to desktop",
      "Hero section with your name, role, and a one-line pitch",
      "Projects section featuring at least 2 real builds",
      "Skills section listing your current stack",
      "Mobile optimization — test it on your own phone before shipping",
    ],
    definitionOfDone: [
      { id: "dod-1", label: "Main page loads with no console errors" },
      { id: "dod-2", label: "Layout is responsive on mobile" },
      { id: "dod-3", label: "Projects are visible with links or screenshots" },
      { id: "dod-4", label: "Code is pushed to GitHub" },
    ],
    guidance: [
      "Start with content, not components — write your one-line pitch before you touch CSS.",
      "Reuse your Day 7 layout primitives if you built any — don't start from zero.",
      "Keep the hero to one screen. Everything else can scroll.",
    ],
  },
};

export function getDay(dayNumber) {
  return (
    days[dayNumber] || {
      day: dayNumber,
      title: `Day ${dayNumber} challenge`,
      description: "This day's brief hasn't been mocked in this prototype yet.",
      expectedOutcome: "—",
      difficulty: "—",
      estimatedTime: "—",
      track: student.track,
      requirements: [],
      definitionOfDone: [],
      guidance: [],
    }
  );
}
