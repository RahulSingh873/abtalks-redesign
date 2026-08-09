import { useState, useEffect } from "react";
import { getPrompts, savePrompt, deletePrompt } from "../lib/prompts";
import Button from "./Button";
import { SparkIcon, CheckIcon } from "./Icons";

export default function PromptVault({ day }) {
  const [prompts, setPrompts] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    setPrompts(getPrompts());
  }, []);

  function handleSave() {
    if (!text.trim()) return;
    savePrompt({ title, text, day });
    setPrompts(getPrompts());
    setTitle("");
    setText("");
    setAdding(false);
  }

  function handleDelete(id) {
    deletePrompt(id);
    setPrompts(getPrompts());
  }

  function handleCopy(item) {
    navigator.clipboard?.writeText(item.text).then(() => {
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-ember-light">
          <SparkIcon className="text-xs" /> Prompt Vault
        </p>
        {!adding && (
          <button onClick={() => setAdding(true)} className="focus-ring text-xs font-semibold text-ember-light">
            + Add
          </button>
        )}
      </div>

      {prompts.length === 0 && !adding && (
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Save AI prompts that worked well while you build — reuse them on a later day
          instead of starting from scratch.
        </p>
      )}

      {adding && (
        <div className="mt-3 space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Title (e.g. "Responsive hero layout")'
            maxLength={60}
            className="focus-ring w-full rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-text placeholder:text-muted-2"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            maxLength={1000}
            placeholder="Paste the prompt you used…"
            className="focus-ring w-full resize-none rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-text placeholder:text-muted-2"
          />
          <div className="flex gap-2">
            <Button size="sm" disabled={!text.trim()} onClick={handleSave}>
              Save prompt
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setAdding(false);
                setTitle("");
                setText("");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {prompts.length > 0 && (
        <ul className="mt-3 space-y-2">
          {prompts.map((item) => (
            <li key={item.id} className="rounded-xl border border-border bg-surface-2 p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-text">{item.title}</p>
                  {item.day && (
                    <p className="text-[10px] font-medium text-muted-2">From Day {item.day}</p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => handleCopy(item)}
                    className="focus-ring flex items-center gap-1 text-xs font-semibold text-ember-light"
                  >
                    {copiedId === item.id ? (
                      <>
                        <CheckIcon className="text-xs" /> Copied
                      </>
                    ) : (
                      "Copy"
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="focus-ring text-xs font-medium text-muted-2 hover:text-ember-light"
                    aria-label={`Delete ${item.title}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-1.5 line-clamp-2 font-mono text-xs leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}