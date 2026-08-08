import { Link } from "react-router-dom";
import Button from "../components/Button";
import Badge from "../components/Badge";
import DayRail from "../components/DayRail";
import { ArrowRightIcon, FlameIcon, GithubIcon, LinkedinIcon, CheckIcon, SparkIcon } from "../components/Icons";

const stats = [
  { value: "60", label: "Days" },
  { value: "60", label: "Daily builds" },
  { value: "2", label: "Proofs / day" },
];

const steps = [
  {
    n: "01",
    title: "Pick your track",
    body: "Full Stack, AI, or Data — choose the lane that matches where you want to be hired.",
    icon: SparkIcon,
  },
  {
    n: "02",
    title: "Build every day",
    body: "One focused brief a day. Ship something small and real instead of another tutorial.",
    icon: FlameIcon,
  },
  {
    n: "03",
    title: "Show your work",
    body: "Push the repo, post the build. Your streak is public proof recruiters can actually check.",
    icon: CheckIcon,
  },
];

const trust = [
  { icon: FlameIcon, label: "60-day streak system" },
  { icon: GithubIcon, label: "GitHub-verified proof" },
  { icon: LinkedinIcon, label: "LinkedIn visibility" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-ink">
      {/* Top bar */}
      <header className="mx-auto flex max-w-[480px] items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ember text-ink">
            <FlameIcon className="text-lg" />
          </span>
          <span className="font-[var(--font-display)] text-lg font-bold tracking-tight">ABTalks</span>
        </div>
        <Link to="/dashboard" className="focus-ring rounded-lg px-2 py-1 text-sm font-semibold text-muted hover:text-text">
          Sign in
        </Link>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-[480px] px-5 pt-6 pb-10">
        <div className="animate-rise">
          <Badge tone="ember">
            <FlameIcon /> Cohort opens this week
          </Badge>
          <h1 className="mt-4 font-[var(--font-display)] text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-text">
            60 days.
            <br />
            60 builds.
            <br />
            <span className="text-ember">One stronger you.</span>
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Build something every single day, prove it publicly on GitHub and LinkedIn, and
            turn showing up into a portfolio recruiters can't ignore.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 animate-rise" style={{ animationDelay: "80ms" }}>
          <Button as={Link} to="/dashboard" size="lg" className="w-full">
            Start the Challenge <ArrowRightIcon />
          </Button>
          <Button as="a" href="#how-it-works" variant="outline" size="lg" className="w-full">
            See how it works
          </Button>
        </div>

        {/* Stat strip */}
        <div className="mt-8 grid grid-cols-3 gap-3 animate-rise" style={{ animationDelay: "140ms" }}>
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-surface px-3 py-4 text-center">
              <div className="font-mono text-2xl font-bold text-ember-light">{s.value}</div>
              <div className="mt-1 text-[11px] font-medium text-muted-2">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-4 flex flex-wrap items-center gap-2 animate-rise" style={{ animationDelay: "180ms" }}>
          {trust.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted"
            >
              <Icon className="text-sm text-ember-light" /> {label}
            </span>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-[480px] px-5 py-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ember-light">How it works</p>
        <h2 className="mt-2 font-[var(--font-display)] text-2xl font-bold text-text">Three steps. Every day.</h2>

        <div className="mt-6 space-y-3">
          {steps.map((step) => (
            <div key={step.n} className="flex gap-4 rounded-2xl border border-border bg-surface p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-3 text-ember-light">
                <step.icon className="text-xl" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-2">{step.n}</span>
                  <h3 className="font-[var(--font-display)] text-base font-semibold text-text">{step.title}</h3>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 60-day journey visualization — signature element */}
      <section className="mx-auto max-w-[480px] px-5 py-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ember-light">The journey</p>
        <h2 className="mt-2 font-[var(--font-display)] text-2xl font-bold text-text">Day 1 to Day 60.</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Every dot is a day, every fill is a build you shipped. Watch the line light up as you go.
        </p>
        <div className="mt-5 rounded-2xl border border-border bg-surface p-4">
          <DayRail />
          <div className="mt-3 flex items-center justify-between text-[11px] text-muted-2">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-gradient-to-br from-ember to-ember-light" /> Shipped</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full ring-2 ring-ember bg-ember/90" /> Today</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-surface-3" /> Ahead</span>
          </div>
        </div>
      </section>

      {/* What you receive */}
      <section className="mx-auto max-w-[480px] px-5 py-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ember-light">What you get</p>
        <h2 className="mt-2 font-[var(--font-display)] text-2xl font-bold text-text">Proof, not promises.</h2>
        <ul className="mt-5 space-y-3">
          {[
            "60 real, shipped builds tied to your GitHub history",
            "A public LinkedIn trail recruiters can scroll through",
            "A streak and Momentum Score that show consistency, not just talent",
            "A portfolio-ready track record before your next internship cycle",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-muted">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-dim text-mint">
                <CheckIcon className="text-xs" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-[480px] px-5 pb-14 pt-4">
        <div className="rounded-2xl border border-ember/30 bg-gradient-to-br from-ember-dim to-surface p-6 text-center">
          <FlameIcon className="mx-auto text-3xl text-ember-light animate-flame" />
          <h2 className="mt-3 font-[var(--font-display)] text-xl font-bold text-text">
            Your streak starts the moment you say yes.
          </h2>
          <p className="mt-2 text-sm text-muted">
            No signup friction in this preview — jump straight into the dashboard.
          </p>
          <Button as={Link} to="/dashboard" size="lg" className="mt-5 w-full">
            Start the Challenge <ArrowRightIcon />
          </Button>
        </div>
      </section>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-2">
        Built for the #60DayClaudeChallenge · ABTalks
      </footer>
    </div>
  );
}
