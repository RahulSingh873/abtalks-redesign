export default function Badge({ children, tone = "default", className = "" }) {
  const tones = {
    default: "bg-surface-3 text-muted border-border",
    ember: "bg-ember-dim text-ember-light border-ember/30",
    mint: "bg-mint-dim text-mint border-mint/30",
    indigo: "bg-indigo-dim text-indigo border-indigo/30",
    outline: "bg-transparent text-muted border-border",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold font-mono tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
