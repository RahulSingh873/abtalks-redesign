import { Link } from "react-router-dom";
import { useDemoState } from "../lib/DemoStateContext";
import { getDay, achievements, TOTAL_DAYS } from "../data/mockData";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import DayRail from "../components/DayRail";
import MomentumCard from "../components/MomentumCard";
import MemoryCard from "../components/MemoryCard";
import ProofTierBadge from "../components/ProofTierBadge";
import BottomNav from "../components/BottomNav";
import ScenarioSwitcher from "../components/ScenarioSwitcher";
import {
  FlameIcon,
  ArrowRightIcon,
  GithubIcon,
  LinkedinIcon,
  CheckIcon,
  FlagIcon,
  ClockIcon,
  AlertIcon,
  UserIcon,
} from "../components/Icons";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function isLateNight() {
  const h = new Date().getHours();
  return h >= 21 || h < 3;
}

export default function Dashboard() {
  const { student } = useDemoState();
  const today = getDay(student.currentDay);
  const isFirstDay = student.currentDay === 1 && student.completedDays === 0;

  return (
    <div className="min-h-screen bg-ink pb-24">
      <ScenarioSwitcher />

      <header className="mx-auto flex max-w-[480px] items-center justify-between px-5 pt-6">
        <div>
          <p className="text-sm text-muted">
            {greeting()}, <span className="font-semibold text-text">{student.name.split(" ")[0]}</span> 👋
          </p>
          <h1 className="mt-0.5 font-[var(--font-display)] text-xl font-bold text-text">
            Day {student.currentDay} <span className="text-muted-2 font-medium">of {TOTAL_DAYS}</span>
          </h1>
        </div>
        <Link
          to="/profile"
          className="focus-ring flex h-11 w-11 items-center justify-center rounded-full bg-surface-2 border border-border text-ember-light font-mono text-sm font-bold"
          aria-label="View profile"
        >
          {student.name.split(" ").map((n) => n[0]).join("")}
        </Link>
      </header>

      <main id="main-content" className="mx-auto max-w-[480px] px-5">
        {!student.profileComplete && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-indigo/30 bg-indigo-dim px-4 py-3 animate-rise">
            <UserIcon className="mt-0.5 shrink-0 text-indigo" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-text">Finish setting up your profile</p>
              <p className="mt-0.5 text-xs text-muted">
                Add your college and GitHub handle so your proof links up correctly. You can still build today either way.
              </p>
            </div>
            <button className="focus-ring shrink-0 text-xs font-semibold text-indigo">Add</button>
          </div>
        )}

        {student.missedYesterday && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-ember/30 bg-ember-dim px-4 py-3 animate-rise">
            <AlertIcon className="mt-0.5 shrink-0 text-ember-light" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-text">You missed yesterday. That's okay.</p>
              <p className="mt-0.5 text-xs text-muted">
                Your streak has reset, but your {student.completedDays} completed days aren't going anywhere.
              </p>
            </div>
          </div>
        )}

        {!student.missedYesterday && isLateNight() && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-surface-2 px-4 py-3 animate-rise">
            <ClockIcon className="mt-0.5 shrink-0 text-ember-light" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-text">Still time tonight</p>
              <p className="mt-0.5 text-xs text-muted">
                Day {student.currentDay} takes about {today.estimatedTime}. Ship it before you sleep and
                the streak holds.
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center gap-3 animate-rise">
          <div className="flex items-center gap-1.5 rounded-full bg-surface-2 border border-border px-3 py-1.5">
            <FlameIcon className={`text-base ${student.currentStreak > 0 ? "text-ember" : "text-muted-2"}`} />
            <span className="font-mono text-sm font-bold text-text">{student.currentStreak}</span>
            <span className="text-xs text-muted-2">day streak</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <DayRail compact activeDay={student.currentDay} />
          </div>
        </div>

        <Link
          to={`/day/${student.currentDay}`}
          className="focus-ring mt-5 block animate-rise"
          style={{ animationDelay: "60ms" }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-ember/40 bg-gradient-to-br from-[#0B2415] via-surface to-surface p-5 shadow-[0_16px_40px_-16px_rgba(46,200,102,0.35)]">
            <div className="flex items-center justify-between">
              <Badge tone="ember">Day {student.currentDay} · Today</Badge>
              <span className="flex items-center gap-1 text-xs font-medium text-muted-2">
                <ClockIcon /> {today.estimatedTime}
              </span>
            </div>
            <h2 className="mt-3 font-[var(--font-display)] text-2xl font-bold leading-tight text-text">
              {isFirstDay ? "Your journey starts today." : today.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {isFirstDay
                ? "No pressure to be perfect — just ship something small and real. Day 1 is the whole point."
                : today.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-2">{today.difficulty} · {today.track}</span>
              <Button size="sm" className="pointer-events-none">
                {isFirstDay ? "Complete Day 1" : `Continue Day ${student.currentDay}`} <ArrowRightIcon className="text-xs" />
              </Button>
            </div>
          </div>
        </Link>

        <div className="mt-5 animate-rise" style={{ animationDelay: "100ms" }}>
          <MomentumCard student={student} />
        </div>

        <div className="mt-5 animate-rise" style={{ animationDelay: "110ms" }}>
          <ProofTierBadge student={student} />
        </div>

        <div className="mt-5 animate-rise" style={{ animationDelay: "120ms" }}>
          <MemoryCard student={student} />
        </div>

        <Card className="mt-5 animate-rise" style={{ animationDelay: "140ms" }}>
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-2">
              Challenge progress
            </p>
            <span className="font-mono text-sm font-bold text-ember-light">{student.overallCompletion}%</span>
          </div>
          <p className="mt-2 font-[var(--font-display)] text-lg font-bold text-text">
            {student.completedDays} / {TOTAL_DAYS} days
          </p>
          <div className="mt-3">
            <ProgressBar value={student.completedDays} max={TOTAL_DAYS} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-surface-2 px-3 py-2.5">
              <GithubIcon className="text-mint" />
              <div>
                <div className="font-mono text-sm font-semibold text-text">{student.githubSubmissions}</div>
                <div className="text-[10px] text-muted-2">GitHub proofs</div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-surface-2 px-3 py-2.5">
              <LinkedinIcon className="text-indigo" />
              <div>
                <div className="font-mono text-sm font-semibold text-text">{student.linkedinSubmissions}</div>
                <div className="text-[10px] text-muted-2">LinkedIn posts</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-5 animate-rise" style={{ animationDelay: "180ms" }}>
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-2">Achievements</p>
            <span className="flex items-center gap-1 text-xs font-semibold text-ember-light">
              <FlagIcon className="text-xs" /> Next: {student.nextMilestone.label}
            </span>
          </div>
          <div className="no-scrollbar mt-3 flex gap-2.5 overflow-x-auto pb-1">
            {achievements.map((a) => (
              <div
                key={a.id}
                className={`flex w-[104px] shrink-0 flex-col items-center gap-2 rounded-xl border px-3 py-3.5 text-center ${
                  a.earned ? "border-ember/30 bg-ember-dim" : "border-border bg-surface-2 opacity-60"
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    a.earned ? "bg-ember/20 text-ember-light" : "bg-surface-3 text-muted-2"
                  }`}
                >
                  {a.icon === "flame" && <FlameIcon />}
                  {a.icon === "check" && <CheckIcon />}
                  {a.icon === "github" && <GithubIcon />}
                  {a.icon === "flag" && <FlagIcon />}
                </span>
                <span className="text-[11px] font-medium leading-tight text-text">{a.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 mb-4 rounded-2xl border border-border bg-surface-2 p-4 animate-rise" style={{ animationDelay: "220ms" }}>
          <p className="text-sm text-muted">
            <span className="font-semibold text-text">What happens next: </span>
            finish Day {student.currentDay}, submit both proofs, and Day {student.currentDay + 1} unlocks automatically tomorrow.
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}