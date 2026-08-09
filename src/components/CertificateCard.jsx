import { useState, useEffect } from "react";
import { TOTAL_DAYS } from "../data/mockData";
import { isCertificateClaimed, claimCertificate } from "../lib/certificate";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
import { CheckIcon } from "./Icons";

function Medallion({ locked }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <linearGradient id="medallion-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B6F5C8" />
          <stop offset="55%" stopColor="#2EC866" />
          <stop offset="100%" stopColor="#0E7A3C" />
        </linearGradient>
      </defs>
      <path
        d="M22 40 L14 60 L26 54 L32 62 L38 54 L50 60 L42 40 Z"
        fill={locked ? "var(--color-surface-3)" : "#0E7A3C"}
        opacity={locked ? 1 : 0.9}
      />
      <circle cx="32" cy="28" r="21" fill={locked ? "var(--color-surface-3)" : "url(#medallion-gold)"} />
      <circle
        cx="32"
        cy="28"
        r="21"
        fill="none"
        stroke={locked ? "var(--color-border)" : "#D9FBE4"}
        strokeWidth="1.5"
        strokeDasharray="2.5 3.5"
      />
      <circle
        cx="32"
        cy="28"
        r="14.5"
        fill="none"
        stroke={locked ? "var(--color-muted-2)" : "#EFFFF4"}
        strokeWidth="1.2"
      />
      {locked ? (
        <path
          d="M27 26v-3a5 5 0 0 1 10 0v3m-11.5 0h13v9h-13z"
          fill="none"
          stroke="var(--color-muted-2)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M24 28.5l5 5 11-11"
          fill="none"
          stroke="#062B14"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default function CertificateCard({ student }) {
  const [claimed, setClaimed] = useState(false);
  const [justClaimed, setJustClaimed] = useState(false);
  const [copied, setCopied] = useState(false);

  const eligible = student.completedDays >= TOTAL_DAYS;
  const pct = Math.min(100, Math.round((student.completedDays / TOTAL_DAYS) * 100));

  useEffect(() => {
    setClaimed(isCertificateClaimed());
  }, []);

  function handleClaim() {
    if (!eligible || claimed) return;
    claimCertificate();
    setClaimed(true);
    setJustClaimed(true);
  }

  const caption =
    `Just completed the ABTalks 60-Day Challenge — 60 days, 60 builds, all verified on ` +
    `GitHub and LinkedIn. 🎓\n\nTrack: ${student.track}\n\n#60DayChallenge #ABTalks #BuildInPublic`;

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {(eligible || claimed) && (
        <div
          className="pointer-events-none absolute -inset-8 opacity-40 blur-2xl"
          style={{ background: "radial-gradient(closest-side, #3FE58A, transparent)" }}
          aria-hidden="true"
        />
      )}

      <div
        className={`relative rounded-2xl border p-5 ${
          claimed
            ? "border-ember/50 bg-gradient-to-br from-[#0B2415] via-surface to-surface"
            : eligible
              ? "border-ember/40 bg-surface"
              : "border-border bg-surface"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`h-16 w-16 shrink-0 ${eligible || claimed ? "animate-pulse-soft" : ""}`}>
            <Medallion locked={!eligible && !claimed} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-ember-light">
              Credential
            </p>
            <p className="mt-0.5 font-[var(--font-display)] text-base font-bold leading-tight text-text">
              60-Day Challenge Certificate
            </p>
            <p className="mt-1 text-xs text-muted">
              {claimed
                ? "Claimed — proof your streak went the distance."
                : eligible
                  ? "All 60 days complete. Ready to claim."
                  : "Awarded once all 60 days are complete."}
            </p>
          </div>
        </div>

        {!claimed && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-muted-2">
              <span>{student.completedDays} / {TOTAL_DAYS} days</span>
              <span className="font-mono font-semibold text-ember-light">{pct}%</span>
            </div>
            <div className="mt-1.5">
              <ProgressBar value={student.completedDays} max={TOTAL_DAYS} />
            </div>
          </div>
        )}

        <div className="mt-4">
          {claimed ? (
            <>
              {justClaimed && (
                <p className="mb-3 flex items-center gap-1.5 text-sm font-medium text-mint">
                  <CheckIcon className="text-sm" /> Certificate claimed
                </p>
              )}

              <div className="relative rounded-xl border-2 border-double border-ember/50 bg-surface-2 px-4 py-5 text-center">
                {["top-1.5 left-1.5", "top-1.5 right-1.5 rotate-90", "bottom-1.5 left-1.5 -rotate-90", "bottom-1.5 right-1.5 rotate-180"].map(
                  (pos) => (
                    <svg
                      key={pos}
                      viewBox="0 0 20 20"
                      className={`absolute h-4 w-4 text-ember/60 ${pos}`}
                      aria-hidden="true"
                    >
                      <path d="M2 2 H14 M2 2 V14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )
                )}

                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-ember-light">
                  Certificate of Completion
                </p>
                <div className="mx-auto mt-3 h-px w-10 bg-ember/40" />
                <p className="mt-3 font-[var(--font-display)] text-xl font-bold text-text">{student.name}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  has successfully completed the
                  <br />
                  <span className="font-semibold text-text">ABTalks 60-Day Challenge</span>
                  <br />
                  in {student.track}
                </p>
                <div className="mx-auto mt-3 h-px w-10 bg-ember/40" />
                <p className="mt-3 font-mono text-[9px] text-muted-2">
                  {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>

              <Button
                variant="secondary"
                size="sm"
                className="mt-3 w-full"
                onClick={() => {
                  navigator.clipboard?.writeText(caption).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  });
                }}
              >
                {copied ? "Copied!" : "Copy caption to share"}
              </Button>
            </>
          ) : (
            <Button
              size="lg"
              className="w-full"
              disabled={!eligible}
              variant={eligible ? "primary" : "subtle"}
              onClick={handleClaim}
            >
              {eligible ? "Claim your certificate" : `${TOTAL_DAYS - student.completedDays} days to go`}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}