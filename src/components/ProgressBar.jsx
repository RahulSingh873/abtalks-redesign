export default function ProgressBar({ value, max = 100, tone = "ember", className = "", trackClassName = "h-2.5" }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const tones = {
    ember: "bg-gradient-to-r from-ember to-ember-light",
    mint: "bg-mint",
    indigo: "bg-indigo",
  };
  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-surface-3 ${trackClassName}`}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${tones[tone]} ${className}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
