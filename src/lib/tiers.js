export const TIERS = [
  { id: "bronze", label: "Bronze", credibilityLabel: "Verified Consistency — Bronze", minStreak: 3, color: "#C97A4A", dim: "#3A2417" },
  { id: "silver", label: "Silver", credibilityLabel: "Verified Consistency — Silver", minStreak: 7, color: "#B7BCC9", dim: "#2A2D36" },
  { id: "gold", label: "Gold", credibilityLabel: "Verified Consistency — Gold", minStreak: 15, color: "#F2C94C", dim: "#3D3416" },
  { id: "platinum", label: "Platinum", credibilityLabel: "Verified Consistency — Platinum", minStreak: 30, color: "#7C7FFF", dim: "#262852" },
];

export function currentTier(streak) {
  let earned = null;
  for (const tier of TIERS) {
    if (streak >= tier.minStreak) earned = tier;
  }
  return earned;
}

export function nextTier(streak) {
  return TIERS.find((tier) => streak < tier.minStreak) || null;
}

export function daysToNextTier(streak) {
  const next = nextTier(streak);
  return next ? next.minStreak - streak : 0;
}

export function buildShareCaption({ student, tier, day }) {
  return (
    `Day ${day} of the ABTalks 60-Day Challenge — just hit ${tier.credibilityLabel} ` +
    `with a ${student.currentStreak + 1}-day build streak. 🔥\n\n` +
    `${student.githubSubmissions + 1} builds shipped to GitHub, ${student.linkedinSubmissions + 1} proof posts and counting.\n\n` +
    `#60DayChallenge #ABTalks #BuildInPublic #${student.track.replace(/\s+/g, "")}`
  );
}