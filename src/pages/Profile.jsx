import { useState } from "react";
import { Link } from "react-router-dom";
import { useDemoState } from "../lib/DemoStateContext";
import { achievements, TOTAL_DAYS } from "../data/mockData";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import DayRail from "../components/DayRail";
import CertificateCard from "../components/CertificateCard";
import BottomNav from "../components/BottomNav";
import {
  ChevronLeftIcon,
  GithubIcon,
  LinkedinIcon,
  FlameIcon,
  FlagIcon,
  CheckIcon,
  UserIcon,
} from "../components/Icons";

function Field({ label, value, icon: Icon, missing }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 px-3.5 py-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-3 text-muted">
        <Icon />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-muted-2">{label}</p>
        <p className={`truncate text-sm font-medium ${missing ? "text-muted-2 italic" : "text-text"}`}>
          {value || "Not added yet"}
        </p>
      </div>
      {missing && (
        <button className="focus-ring shrink-0 text-xs font-semibold text-ember-light">Add</button>
      )}
    </div>
  );
}

export default function Profile() {
  const { student, scenario } = useDemoState();
  const [editing, setEditing] = useState(false);
  const earnedCount = achievements.filter((a) => a.earned).length;

  return (
    <div className="min-h-screen bg-ink pb-28">
      <header className="sticky top-0 z-30 border-b border-border bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-[480px] items-center gap-3 px-4 py-3.5">
          <Link
            to="/dashboard"
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 border border-border text-text"
            aria-label="Back to dashboard"
          >
            <ChevronLeftIcon />
          </Link>
          <p className="font-[var(--font-display)] text-base font-bold text-text">Profile</p>
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-[480px] px-5">
        <div className="mt-5 flex items-center gap-4 animate-rise">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-surface-3 font-mono text-lg font-bold text-ember-light">
            {student.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="min-w-0">
            <h1 className="truncate font-[var(--font-display)] text-xl font-bold text-text">{student.name}</h1>
            <p className="mt-0.5 truncate text-sm text-muted">{student.college || "College not set"}</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              <Badge tone="ember">{student.track}</Badge>
            </div>
          </div>
        </div>

        {!student.profileComplete && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-indigo/30 bg-indigo-dim px-4 py-3 animate-rise">
            <UserIcon className="mt-0.5 shrink-0 text-indigo" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-text">A few things are still missing</p>
              <p className="mt-0.5 text-xs text-muted">
                Fill in your college and linked accounts below so your proof of work stays
                connected to the right identity. You're never blocked from building in the
                meantime — this is optional, not a gate.
              </p>
            </div>
          </div>
        )}

        <div className="mt-5 space-y-2.5 animate-rise" style={{ animationDelay: "40ms" }}>
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-2">
              Account details
            </p>
            <button
              onClick={() => setEditing((v) => !v)}
              className="focus-ring text-xs font-semibold text-ember-light"
            >
              {editing ? "Done" : "Edit"}
            </button>
          </div>
          <Field label="College" value={student.college} icon={UserIcon} missing={!student.college} />
          <Field
            label="GitHub"
            value={student.github ? `github.com/${student.github}` : ""}
            icon={GithubIcon}
            missing={!student.github}
          />
          <Field
            label="LinkedIn"
            value={student.linkedin ? `linkedin.com/in/${student.linkedin}` : ""}
            icon={LinkedinIcon}
            missing={!student.linkedin}
          />
          {editing && (
            <p className="rounded-xl border border-dashed border-border bg-surface-2 px-3.5 py-3 text-xs leading-relaxed text-muted-2">
              This prototype uses mocked data, so edits here aren't persisted — in a production
              build this form would save back to the student's account.
            </p>
          )}
        </div>

        <Card className="mt-5 animate-rise" style={{ animationDelay: "80ms" }}>
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
          <div className="mt-4">
            <DayRail compact activeDay={student.currentDay} />
          </div>
        </Card>

        <div className="mt-5 animate-rise" style={{ animationDelay: "100ms" }}>
          <CertificateCard student={student} />
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2.5 animate-rise" style={{ animationDelay: "120ms" }}>
          <div className="rounded-xl border border-border bg-surface p-3 text-center">
            <FlameIcon className={`mx-auto text-lg ${student.currentStreak > 0 ? "text-ember" : "text-muted-2"}`} />
            <p className="mt-1.5 font-mono text-base font-bold text-text">{student.currentStreak}</p>
            <p className="text-[10px] text-muted-2">Day streak</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-3 text-center">
            <CheckIcon className="mx-auto text-lg text-mint" />
            <p className="mt-1.5 font-mono text-base font-bold text-text">{earnedCount}</p>
            <p className="text-[10px] text-muted-2">Achievements</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-3 text-center">
            <FlagIcon className="mx-auto text-lg text-indigo" />
            <p className="mt-1.5 font-mono text-base font-bold text-text">{student.momentumScore}</p>
            <p className="text-[10px] text-muted-2">Momentum</p>
          </div>
        </div>

        {scenario !== "normal" && (
          <p className="mt-5 text-center text-xs text-muted-2 animate-rise" style={{ animationDelay: "160ms" }}>
            Previewing the <span className="font-semibold text-muted">{scenario.replace("-", " ")}</span> state —
            switch back from the spark button on the dashboard.
          </p>
        )}

        <Button as={Link} to="/dashboard" variant="secondary" size="lg" className="mt-6 w-full">
          Back to dashboard
        </Button>
      </main>

      <BottomNav />
    </div>
  );
}