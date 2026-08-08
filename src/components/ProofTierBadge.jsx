import { currentTier, nextTier, daysToNextTier } from "../lib/tiers";
import { FlagIcon } from "./Icons";

export default function ProofTierBadge({ student }) {
  const tier = currentTier(student.currentStreak);
  const upcoming = nextTier(student.currentStreak);
  const toGo = daysToNextTier(student.currentStreak);

  if (!tier) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-3 text-muted-2">
          <FlagIcon />
        </span>
        <div>
          <p className="text-sm font-semibold text-text">No Proof Tier yet</p>
          <p className="text-xs text-muted">
            {upcoming ? `${toGo} more consistent day${toGo === 1 ? "" : "s"} unlocks Bronze.` : "Keep building."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl border p-4" style={{ borderColor: `${tier.color}44`, background: tier.dim }}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-bold" style={{ background: `${tier.color}33`, color: tier.color }}>
        <FlagIcon />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-text">{tier.credibilityLabel}</p>
        <p className="truncate text-xs text-muted">
          {upcoming ? `${toGo} more day${toGo === 1 ? "" : "s"} to ${upcoming.label}` : "Highest tier reached — keep the streak alive."}
        </p>
      </div>
    </div>
  );
}