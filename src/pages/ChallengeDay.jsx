import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getDay, TOTAL_DAYS } from "../data/mockData";
import { useDemoState } from "../lib/DemoStateContext";
import { writeEpisode, groupIdFor } from "../lib/breeth";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import BottomNav from "../components/BottomNav";
import ScenarioSwitcher from "../components/ScenarioSwitcher";
import {
  ChevronLeftIcon,
  ClockIcon,
  GithubIcon,
  LinkedinIcon,
  CheckIcon,
  ArrowRightIcon,
  SparkIcon,
} from "../components/Icons";

const GITHUB_RE = /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+(\/.*)?$/i;
const LINKEDIN_RE = /^https?:\/\/(www\.)?linkedin\.com\/.+/i;

function ProofField({ icon: Icon, label, placeholder, value, onChange, onSubmit, verified, checking, error, actionLabel, tone }) {
  const toneClasses = tone === "mint" ? "text-mint" : "text-indigo";
  return (
    <div className={`rounded-2xl border p-4 transition-colors ${verified ? "border-mint/40 bg-mint-dim" : "border-border bg-surface"}`}>
      <div className="flex items-center gap-2">
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2 ${toneClasses}`}>
          <Icon />
        </span>
        <p className="text-sm font-semibold text-text">{label}</p>
        {verified && (
          <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-mint">
            <CheckIcon className="text-xs" /> Verified
          </span>
        )}
      </div>

      {!verified ? (
        <form
          className="mt-3 flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <label className="sr-only" htmlFor={`${label}-input`}>{placeholder}</label>
          <input
            id={`${label}-input`}
            type="url"
            inputMode="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="focus-ring w-full rounded-xl border border-border bg-surface-2 px-3.5 py-3 text-sm text-text placeholder:text-muted-2"
          />
          {error && <p className="text-xs font-medium text-ember-light">{error}</p>}
          <Button type="submit" variant="secondary" size="sm" className="self-start" disabled={checking}>
            {checking ? "Checking…" : actionLabel}
          </Button>
        </form>
      ) : (
        <p className="mt-2 truncate font-mono text-xs text-muted">{value}</p>
      )}
    </div>
  );
}

export default function ChallengeDay() {
  const { dayNumber } = useParams();
  const navigate = useNavigate();
  const { student } = useDemoState();
  const day = getDay(Number(dayNumber));

  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubVerified, setGithubVerified] = useState(false);
  const [linkedinVerified, setLinkedinVerified] = useState(false);
  const [githubChecking, setGithubChecking] = useState(false);
  const [githubError, setGithubError] = useState("");
  const [linkedinError, setLinkedinError] = useState("");
  const [checkedDod, setCheckedDod] = useState({});
  const [memoryWritten, setMemoryWritten] = useState(false);

  const bothDone = githubVerified && linkedinVerified;

  async function submitGithub() {
    const trimmed = githubUrl.trim();
    if (!GITHUB_RE.test(trimmed)) {
      setGithubError("That doesn't look like a GitHub repo or commit URL.");
      return;
    }
    setGithubError("");
    setGithubChecking(true);
    try {
      const [, , , owner, repo] = trimmed.match(
        /^https?:\/\/(www\.)?github\.com\/([\w.-]+)\/([\w.-]+)/i
      ) || [];
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      if (res.ok) {
        setGithubVerified(true);
      } else if (res.status === 404) {
        setGithubError("Couldn't find that repository on GitHub — check the URL.");
      } else {
        setGithubVerified(true);
      }
    } catch {
      setGithubVerified(true);
    } finally {
      setGithubChecking(false);
    }
  }

  function submitLinkedin() {
    if (!LINKEDIN_RE.test(linkedinUrl.trim())) {
      setLinkedinError("That doesn't look like a LinkedIn post URL.");
      return;
    }
    setLinkedinError("");
    setLinkedinVerified(true);
  }

  useEffect(() => {
    if (!bothDone || memoryWritten) return;
    setMemoryWritten(true);
    writeEpisode(
      `${student.name} completed Day ${day.day} ("${day.title}") in the ${day.track} track. ` +
        `GitHub proof: ${githubUrl}. LinkedIn proof: ${linkedinUrl}. ` +
        `Streak is now ${student.currentStreak + 1} days.`,
      { groupId: groupIdFor(student), extractIntent: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bothDone, memoryWritten]);

  return (
    <div className="min-h-screen bg-ink pb-28">
      <ScenarioSwitcher />

      <header className="sticky top-0 z-30 border-b border-border bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-[480px] items-center gap-3 px-4 py-3.5">
          <Link
            to="/dashboard"
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 border border-border text-text"
            aria-label="Back to dashboard"
          >
            <ChevronLeftIcon />
          </Link>
          <div className="flex-1">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-2">
              Day {day.day} / {TOTAL_DAYS}
            </p>
            <div className="mt-1">
              <ProgressBar value={day.day} max={TOTAL_DAYS} trackClassName="h-1.5" />
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-[480px] px-5">
        {!bothDone ? (
          <>
            <div className="mt-5 animate-rise">
              <div className="flex items-center gap-2">
                <Badge tone="ember">{day.difficulty}</Badge>
                <span className="flex items-center gap-1 text-xs font-medium text-muted-2">
                  <ClockIcon /> {day.estimatedTime}
                </span>
              </div>
              <h1 className="mt-3 font-[var(--font-display)] text-[1.7rem] font-bold leading-tight text-text">
                {day.title}
              </h1>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{day.description}</p>
            </div>

            <Card className="mt-4 animate-rise" style={{ animationDelay: "40ms" }}>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-mint">Expected outcome</p>
              <p className="mt-2 text-sm leading-relaxed text-text">{day.expectedOutcome}</p>
            </Card>

            <div className="mt-4 animate-rise" style={{ animationDelay: "80ms" }}>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-2">Requirements</p>
              <ul className="mt-2.5 space-y-2">
                {day.requirements.map((req) => (
                  <li key={req} className="flex items-start gap-2.5 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <Card className="mt-4 animate-rise" style={{ animationDelay: "120ms" }}>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-2">Definition of done</p>
              <ul className="mt-3 space-y-2.5">
                {day.definitionOfDone.map((item) => {
                  const checked = !!checkedDod[item.id];
                  return (
                    <li key={item.id}>
                      <label className="flex cursor-pointer items-center gap-3 text-sm">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            setCheckedDod((s) => ({ ...s, [item.id]: !s[item.id] }))
                          }
                          className="peer sr-only"
                        />
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                            checked ? "border-mint bg-mint text-ink" : "border-border bg-surface-2"
                          }`}
                        >
                          {checked && <CheckIcon className="text-xs" />}
                        </span>
                        <span className={checked ? "text-muted line-through decoration-muted-2" : "text-text"}>
                          {item.label}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </Card>

            <div className="mt-4 rounded-2xl border border-indigo/25 bg-indigo-dim p-4 animate-rise" style={{ animationDelay: "160ms" }}>
              <p className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-indigo">
                <SparkIcon className="text-xs" /> Getting started
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {day.guidance.map((tip) => (
                  <li key={tip} className="text-sm leading-relaxed text-muted">
                    · {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 animate-rise" style={{ animationDelay: "200ms" }}>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-2">Submit your proof</p>
              <div className="mt-3 space-y-3">
                <ProofField
                  icon={GithubIcon}
                  label="GitHub proof"
                  placeholder="Paste repository or commit URL"
                  value={githubUrl}
                  onChange={setGithubUrl}
                  onSubmit={submitGithub}
                  verified={githubVerified}
                  checking={githubChecking}
                  error={githubError}
                  actionLabel="Verify GitHub"
                  tone="mint"
                />
                <ProofField
                  icon={LinkedinIcon}
                  label="LinkedIn proof"
                  placeholder="Paste your LinkedIn post URL"
                  value={linkedinUrl}
                  onChange={setLinkedinUrl}
                  onSubmit={submitLinkedin}
                  verified={linkedinVerified}
                  error={linkedinError}
                  actionLabel="Add LinkedIn post"
                  tone="indigo"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="mt-10 flex flex-col items-center text-center animate-rise">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-mint-dim text-4xl">
              🎉
            </div>
            <h1 className="mt-5 font-[var(--font-display)] text-2xl font-bold text-text">
              Day {day.day} complete!
            </h1>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
              Your work is officially part of your 60-day journey. That's {student.completedDays + 1} builds shipped and counting.
            </p>

            <div className="mt-6 w-full space-y-2.5">
              <div className="flex items-center gap-3 rounded-xl border border-mint/30 bg-mint-dim px-4 py-3 text-left">
                <GithubIcon className="text-mint" />
                <span className="truncate font-mono text-xs text-muted">{githubUrl}</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-mint/30 bg-mint-dim px-4 py-3 text-left">
                <LinkedinIcon className="text-mint" />
                <span className="truncate font-mono text-xs text-muted">{linkedinUrl}</span>
              </div>
            </div>

            <Card className="mt-6 w-full text-left">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-ember-light">Momentum</p>
              <p className="mt-1 text-sm text-muted">
                Streak now at <span className="font-semibold text-text">{student.currentStreak + 1} days</span>.
                Keep it up — {student.nextMilestone.label} is close.
              </p>
            </Card>

            <Button
              size="lg"
              className="mt-6 w-full"
              onClick={() => navigate(`/day/${day.day + 1}`)}
            >
              Continue to Day {day.day + 1} <ArrowRightIcon />
            </Button>
            <Link to="/dashboard" className="focus-ring mt-3 text-sm font-medium text-muted-2 hover:text-muted">
              Back to dashboard
            </Link>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}