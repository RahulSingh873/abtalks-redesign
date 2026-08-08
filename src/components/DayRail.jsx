import { dayStatuses, TOTAL_DAYS } from "../data/mockData";

export default function DayRail({ compact = false, activeDay, onDayClick }) {
  const dotSize = compact ? "h-2.5 w-2.5" : "h-3 w-3";

  return (
    <div className="flex items-center gap-2">
      {!compact && (
        <span className="shrink-0 font-mono text-[11px] font-semibold text-muted">Day 1</span>
      )}
      <div className="no-scrollbar -mx-1 flex flex-1 items-center gap-1.5 overflow-x-auto px-1 py-2">
        {dayStatuses.map((status, i) => {
          const day = i + 1;
          const isActive = activeDay === day;
          const milestone = day % 10 === 0 || day === 1;
          return (
            <button
              key={day}
              type="button"
              onClick={onDayClick ? () => onDayClick(day) : undefined}
              className={`focus-ring group relative flex shrink-0 flex-col items-center justify-center rounded-full transition-transform ${
                onDayClick ? "cursor-pointer active:scale-90" : "cursor-default"
              } ${compact ? "h-7 w-7" : "h-8 w-8"}`}
              aria-label={`Day ${day}: ${status}`}
              aria-current={status === "current" ? "step" : undefined}
            >
              {status === "current" && (
                <span className="absolute inset-0 animate-pulse-soft rounded-full bg-ember/25" />
              )}
              <span
                className={`relative rounded-full transition-colors ${dotSize} ${
                  status === "complete"
                    ? "bg-gradient-to-br from-ember to-ember-light"
                    : status === "current"
                      ? "ring-2 ring-ember bg-ember/90"
                      : "bg-surface-3 group-hover:bg-surface-3/80"
                } ${isActive ? "ring-2 ring-offset-2 ring-offset-ink ring-text" : ""}`}
              />
              {milestone && !compact && (
                <span className="mt-1 font-mono text-[10px] font-medium leading-none text-muted">{day}</span>
              )}
            </button>
          );
        })}
      </div>
      <span className="shrink-0 font-mono text-[11px] font-semibold text-muted">
        Day {TOTAL_DAYS}
      </span>
    </div>
  );
}