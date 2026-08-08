import { SparkIcon } from "./Icons";

function scoreTone(score) {
  if (score >= 75) return { ring: "#FF7A1A", label: "Strong momentum", text: "text-ember-light" };
  if (score >= 40) return { ring: "#FFA24D", label: "Building momentum", text: "text-ember-light" };
  return { ring: "#6A6D80", label: "Just getting started", text: "text-muted" };
}

export default function MomentumCard({ student }) {
  const score = student.momentumScore;
  const tone = scoreTone(score);
  const circumference = 2 * Math.PI * 30;
  const offset = circumference - (score / 100) * circumference;

  const daysToMilestone = student.nextMilestone?.daysAway;

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ember-light">
            Momentum
          </p>
          <p className={`mt-1 text-sm font-medium ${tone.text}`}>{tone.label}</p>
        </div>
        <div className="relative flex h-[72px] w-[72px] items-center justify-center">
          <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
            <circle cx="36" cy="36" r="30" fill="none" stroke="var(--color-surface-3)" strokeWidth="7" />
            <circle
              cx="36"
              cy="36"
              r="30"
              fill="none"
              stroke={tone.ring}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-mono text-lg font-bold text-text">{score}</span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">
        {score === 0
          ? "Your Momentum score builds from your very first day — consistency, GitHub proof, and LinkedIn posts all count."
          : daysToMilestone
            ? <>You're building strong momentum. <span className="font-semibold text-text">{daysToMilestone} more consistent {daysToMilestone === 1 ? "day" : "days"}</span> unlocks your next milestone.</>
            : "Keep shipping daily to hold your momentum steady."}
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4">
        {[
          { label: "Consistency", value: `${student.currentStreak}d streak` },
          { label: "GitHub", value: student.githubSubmissions },
          { label: "LinkedIn", value: student.linkedinSubmissions },
        ].map((row) => (
          <div key={row.label} className="text-center">
            <div className="font-mono text-sm font-semibold text-text">{row.value}</div>
            <div className="mt-0.5 text-[10px] font-medium text-muted-2">{row.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
