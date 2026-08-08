import { useEffect, useState } from "react";
import { breethEnabled, searchMemory, groupIdFor } from "../lib/breeth";
import { SparkIcon } from "./Icons";

export default function MemoryCard({ student }) {
  const [state, setState] = useState("idle");
  const [facts, setFacts] = useState([]);

  useEffect(() => {
    if (!breethEnabled) {
      setState("disabled");
      return;
    }
    let cancelled = false;
    setState("loading");
    searchMemory(`What has ${student.name} recently completed in the ABTalks challenge?`, {
      groupId: groupIdFor(student),
      limit: 5,
    }).then((res) => {
      if (cancelled) return;
      if (!res?.ok && res?.edges === undefined) {
        setState(res?.disabled ? "disabled" : "error");
        return;
      }
      const edges = res.edges || [];
      setFacts(edges);
      setState(edges.length ? "ready" : "empty");
    });
    return () => {
      cancelled = true;
    };
  }, [student]);

  if (state === "disabled") {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface-2 p-4 text-xs text-muted-2">
        <p className="flex items-center gap-1.5 font-mono font-semibold uppercase tracking-widest text-muted-2">
          <SparkIcon className="text-xs" /> Memory (Breeth)
        </p>
        <p className="mt-1.5 leading-relaxed">
          Add <code className="rounded bg-surface-3 px-1 py-0.5">VITE_BREETH_API_KEY</code> to
          a local <code className="rounded bg-surface-3 px-1 py-0.5">.env</code> file to let
          this dashboard remember completed days across sessions.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-indigo/25 bg-indigo-dim p-4">
      <p className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-indigo">
        <SparkIcon className="text-xs" /> Remembered by Breeth
      </p>

      {state === "loading" && (
        <p className="mt-2 text-sm text-muted animate-pulse-soft">Recalling your recent activity…</p>
      )}

      {state === "empty" && (
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Nothing remembered yet — complete a day and this card will start
          recalling your history across visits.
        </p>
      )}

      {state === "error" && (
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Couldn't reach Breeth just now. Your progress is still tracked locally.
        </p>
      )}

      {state === "ready" && (
        <ul className="mt-2.5 space-y-2">
          {facts.map((edge) => (
            <li key={edge.edge_uuid} className="text-sm leading-relaxed text-text">
              {edge.fact}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}